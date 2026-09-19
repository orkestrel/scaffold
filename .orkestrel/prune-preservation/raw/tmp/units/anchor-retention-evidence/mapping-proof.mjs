import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

const root = process.cwd();
const path = resolve(root, 'tmp/release/retain-anchor-unit.mjs');
process.argv = [process.execPath, path, '0000000000000000000000000000000000000000'];
const { rewriteRecord } = await import(pathToFileURL(path).href);
// Import deliberately trips the unchanged wrong-HEAD guard; the proof reports its own assertions.
process.exitCode = 0;
const manifest = JSON.parse(readFileSync(resolve(root, 'tmp/units/anchor-retention-evidence/manifest-3.json'), 'utf8'));
const results = [];
for (const [origin, original, targetOrigin, target] of [
  ['candidate', 'tmp/units/anchor-repair-report.md', 'canonical', 'tmp/units/anchor-repair-brief-2.md'],
  ['candidate', 'tmp/units/anchor-repair-report-3.md', 'canonical', 'tmp/units/anchor-repair-brief-3.md'],
  ['canonical', 'tmp/audit/anchor-repair-audit-claims-2.md', 'candidate', 'tmp/units/anchor-repair-report-3.md'],
]) {
  const entry = manifest.entries.find((item) => item.origin === origin && item.original === original);
  if (!entry) throw new Error(`missing-proof-input: ${origin}: ${original}`);
  const expected = relative(dirname(`operational/${origin}/${original}`), `raw/${targetOrigin}/${target}`).split(sep).join('/');
  const rewritten = rewriteRecord(entry, manifest.entries, []);
  results.push({ claim: `${origin}: ${original} resolves ${targetOrigin}: ${target}`, passed: rewritten.includes(expected), expected, output: rewritten });
}
const fixture = { origin: 'canonical', original: 'tmp/units/anchor-retention-evidence/mapping-origin-control.md' };
const origins = [{ origin: 'canonical', original: 'tmp/units/shared-proof.md', retained: 'raw/canonical/tmp/units/shared-proof.md' }, { origin: 'candidate', original: 'tmp/units/shared-proof.md', retained: 'raw/candidate/tmp/units/shared-proof.md' }];
const rewritten = rewriteRecord(fixture, origins, []);
const canonicalTarget = relative(dirname(`operational/${fixture.origin}/${fixture.original}`), origins[0].retained).split(sep).join('/');
const candidateTarget = relative(dirname(`operational/${fixture.origin}/${fixture.original}`), origins[1].retained).split(sep).join('/');
results.push({ claim: 'Explicit canonical selector chooses the canonical target', passed: rewritten.includes(`canonical ${canonicalTarget}`), output: rewritten });
results.push({ claim: 'Explicit candidate selector chooses the candidate target', passed: rewritten.includes(`candidate ${candidateTarget}`), output: rewritten });
results.push({ claim: 'An unqualified same-path collision remains unresolved', passed: rewritten.includes('Unqualified tmp/units/shared-proof.md'), output: rewritten });
results.push({ claim: 'Fenced execution context remains unchanged', passed: rewritten.includes('```text\ncanonical tmp/units/shared-proof.md\ncandidate tmp/units/shared-proof.md\n```'), output: rewritten });
results.push({ claim: 'Origin selection does not depend on manifest entry order', passed: rewritten === rewriteRecord(fixture, [...origins].reverse(), []), output: rewritten });
const record = { command: 'node tmp/units/anchor-retention-evidence/mapping-proof.mjs', date: new Date().toISOString(), instrument: createHash('sha256').update(readFileSync(path)).digest('hex'), passed: results.filter((item) => item.passed).length, failed: results.filter((item) => !item.passed).length, results };
const output = existsSync(resolve(root, 'tmp/units/anchor-retention-evidence/mapping-before.json')) ? 'mapping-after.json' : 'mapping-before.json';
writeFileSync(resolve(root, `tmp/units/anchor-retention-evidence/${output}`), `${JSON.stringify(record, null, 2)}\n`, { flag: 'wx' });
console.log(JSON.stringify({ command: record.command, passed: record.passed, failed: record.failed, output }, null, 2));
if (record.failed > 0) process.exitCode = 1;
