import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'navigation-manifest-3.json'), 'utf8'));
const original = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8').replace(/^\uFEFF/, ''));
const preserved = [];
const supplements = [];
const failures = [];
const additions = [];

export function hashFile(location) {
  return crypto.createHash('sha256').update(fs.readFileSync(location)).digest('hex').toUpperCase();
}
for (const record of manifest.frozen) {
  const sha256 = hashFile(path.join(root, record.path));
  preserved.push({ path: record.path, before: record.sha256, after: sha256 });
  if (sha256 !== record.sha256) failures.push(record);
}
for (const record of original.records) if (hashFile(path.join(root, record.retained)) !== record.retainedSha256) failures.push(record);
for (const record of manifest.supplements) {
  const sourceSha256 = hashFile(record.source);
  const retainedSha256 = hashFile(path.join(root, record.retained));
  supplements.push({ ...record, measuredSourceSha256: sourceSha256, measuredRetainedSha256: retainedSha256 });
  if (sourceSha256 !== record.sourceSha256 || retainedSha256 !== record.retainedSha256) failures.push(record);
}
for (const record of manifest.documents) if (record.operationalSha256 && hashFile(path.join(root, record.operational)) !== record.operationalSha256) failures.push(record);
export function inspectAdditions(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) inspectAdditions(location);
    else {
      const relative = path.relative(root, location).split(path.sep).join('/');
      if (relative === 'evidence-3/validation.json' || relative === 'evidence-3/diffstat.txt') continue;
      additions.push({ path: relative, bytes: fs.statSync(location).size, sha256: hashFile(location) });
      if (/\.(?:png|tgz|zip|tar|gz)$/i.test(relative) || /(?:^|\/)node_modules(?:\/|$)/.test(relative)) failures.push({ path: relative, reason: 'Excluded payload' });
    }
  }
}
for (const directory of ['supplemental', 'operational-3', 'evidence-3']) inspectAdditions(path.join(root, directory));
for (const name of ['brief-3.md', 'navigate-3.mjs', 'navigation-manifest-3.json', 'index-3.md', 'report-3.md']) additions.push({ path: name, bytes: fs.statSync(path.join(root, name)).size, sha256: hashFile(path.join(root, name)) });
const result = { coverage: 'Prior raw/operational artifacts captured before repair, original retained manifest hashes, source/copy supplement hashes, operational translation hashes, and owned addition payload exclusions.', preserved, supplements, additions, failures };
fs.writeFileSync(path.join(root, 'evidence-3/validation.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ failed: failures.length, receipt: 'evidence-3/validation.json' }));
process.exitCode = failures.length ? 1 : 0;
