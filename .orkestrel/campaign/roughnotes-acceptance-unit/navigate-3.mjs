import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const successor = fs.existsSync(path.join(root, 'operational-3'));
const document = path.join(root, successor ? 'operational-3' : 'operational', 'recovery/tmp/units/r-b-report-11.md');
const text = fs.readFileSync(document, 'utf8');
const failures = [];
const checked = [];
const control = process.argv.includes('--control');
const inventory = new Set();
export function walkFiles(directory) {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const location = path.join(directory, item.name);
    if (item.isDirectory()) { inventory.add(location); walkFiles(location); }
    else inventory.add(location);
  }
}
walkFiles(root);
const red = path.join(root, 'recovery/tmp/units/async-capture-rejection-11-red.log.txt');
if (control) inventory.delete(red);
for (const match of text.matchAll(/`([^`]+)`/g)) {
  const token = match[1].split(/\s+/).at(-1);
  if (!/(?:async-capture-rejection-11-(?:red|green)\.log\.txt|setup-generated-11-(?:normal|reduced)\.log\.txt|r-b-(?:baseline-hashes-11\.json|frozen-hashes-11\.tsv|status-11\.txt|diffstat-11\.txt|actual-11\.diff|new-setup-proof-11\.diff|shared-11\.diff)|r-b-setup\/(?:vite.generated.reduced.config.ts|tsconfig.json))$/.test(token)) continue;
  const target = path.resolve(path.dirname(document), token);
  const record = { document: path.relative(root, document), token, target: path.relative(root, target) };
  checked.push(record);
  if (!inventory.has(target)) failures.push(record);
}
if (successor) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'navigation-manifest-3.json'), 'utf8'));
  for (const record of manifest.required) {
    const target = path.resolve(root, record.target);
    const rendered = path.resolve(path.dirname(path.join(root, record.document)), record.token);
    checked.push(record);
    if (rendered !== target) failures.push({ ...record, reason: 'Rendered reference differs from recorded target' });
    else if (!inventory.has(target) && (target.startsWith(root + path.sep) || !target.startsWith(path.resolve(root, '..') + path.sep) || !fs.existsSync(target))) failures.push(record);
  }
  for (const record of manifest.documents) {
    const location = path.join(root, record.operational);
    const content = fs.readFileSync(location, 'utf8');
    for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      if (/^(?:https?:|#)/.test(match[1])) continue;
      const target = path.resolve(path.dirname(location), match[1].split('#')[0]);
      const reading = { document: record.operational, token: match[1], target: path.relative(root, target) };
      checked.push(reading);
      if (!inventory.has(target) && (target.startsWith(root + path.sep) || !target.startsWith(path.resolve(root, '..') + path.sep) || !fs.existsSync(target))) failures.push(reading);
    }
  }
}
console.log(JSON.stringify({ command: 'node .orkestrel/campaign/roughnotes-acceptance-unit/navigate-3.mjs' + (control ? ' --control' : ''), coverage: 'Report11 explicit evidence tokens, every recorded prose rewrite target, and every successor Markdown link; retained inventory only, no launch reads.', passed: checked.length - failures.length, failed: failures.length, checked, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
