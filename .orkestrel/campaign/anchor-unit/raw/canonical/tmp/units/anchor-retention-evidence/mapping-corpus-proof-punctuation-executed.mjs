import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

const root = process.cwd();
const instrument = resolve(root, 'tmp/release/retain-anchor-unit.mjs');
process.argv = [process.execPath, instrument, '0000000000000000000000000000000000000000'];
const { rewriteRecord } = await import(pathToFileURL(instrument).href);
process.exitCode = 0;
const manifest = JSON.parse(readFileSync(resolve(root, 'tmp/units/anchor-retention-evidence/manifest-4.json'), 'utf8'));
const entries = manifest.entries;
const fixture = { origin: 'canonical', original: 'tmp/units/anchor-retention-evidence/mapping-corpus-control-2.md' };
const fixturePath = resolve(root, fixture.original);
const fixtureDirectory = dirname(fixturePath);
const specifications = [];
for (const entry of entries) {
  const home = entry.origin === 'canonical' ? manifest.canonical : manifest.candidate;
  const absolute = resolve(home, entry.original);
  const forms = new Set([absolute, absolute.split(sep).join('/'), relative(manifest.canonical, absolute).split(sep).join('/'), relative(fixtureDirectory, absolute).split(sep).join('/')]);
  for (const form of forms) specifications.push({ claim: `Complete ${entry.origin} artifact representation`, input: form, target: entry.retained }, { claim: 'Sentence punctuation follows a complete artifact reference', input: `${form}.`, target: entry.retained, punctuation: true });
  specifications.push({ claim: 'Explicit origin-qualified reference', input: `${entry.origin} ${entry.original}`, target: entry.retained, selector: entry.origin });
  for (const form of forms) {
    specifications.push({ claim: 'Unknown longer suffix remains unchanged', input: `${form}.unretained`, unchanged: true });
    if (!/^[A-Za-z]:/.test(form)) specifications.push({ claim: 'Unknown longer prefix remains unchanged', input: `unretained/${form}`, unchanged: true });
  }
}
const collision = [{ origin: 'canonical', original: 'tmp/units/shared-corpus-proof.md', retained: 'raw/canonical/tmp/units/shared-corpus-proof.md' }, { origin: 'candidate', original: 'tmp/units/shared-corpus-proof.md', retained: 'raw/candidate/tmp/units/shared-corpus-proof.md' }];
for (const entry of collision) specifications.push({ claim: 'Explicit same-path collision selector', input: `${entry.origin} ${entry.original}`, target: entry.retained, selector: entry.origin });
specifications.push({ claim: 'Unqualified origin collision remains unresolved', input: 'tmp/units/shared-corpus-proof.md', unchanged: true });
const fixtureText = `${specifications.map((item, index) => `CASE_${index} \`${item.input}\``).join('\n')}\n\`\`\`text\n${specifications.slice(0, 5).map((item) => item.input).join('\n')}\n\`\`\`\n`;
if (!existsSync(fixturePath)) writeFileSync(fixturePath, fixtureText, { flag: 'wx' });
if (readFileSync(fixturePath, 'utf8') !== fixtureText) throw new Error('fixed-corpus-fixture-drift');
const inputs = [...entries, ...collision];
const limitations = [];
const rewritten = rewriteRecord(fixture, inputs, limitations);
const lines = rewritten.split(/\r\n|\n/);
const results = [];
for (const [index, specification] of specifications.entries()) {
  const line = lines.find((value) => value.startsWith(`CASE_${index} `));
  const reference = line?.match(/`([^`]*)`/)?.[1];
  const path = specification.selector && reference?.startsWith(`${specification.selector} `) ? reference.slice(specification.selector.length + 1) : reference;
  const actual = path === undefined ? undefined : resolve(dirname(resolve(root, `operational/${fixture.origin}/${fixture.original}`)), specification.punctuation ? path.slice(0, -1) : path);
  const expected = specification.target === undefined ? undefined : resolve(root, specification.target);
  results.push({ claim: specification.claim, input: specification.input, output: reference, passed: specification.unchanged ? reference === specification.input : actual === expected, expected, actual });
}
results.push({ claim: 'Entry-order independent complete corpus', passed: rewritten === rewriteRecord(fixture, [...inputs].reverse(), []) });
results.push({ claim: 'Fenced execution context preserved exactly', passed: rewritten.slice(rewritten.indexOf('```text')) === fixtureText.slice(fixtureText.indexOf('```text')) });
for (const [origin, original, targetOrigin, target, suffix] of [
  ['canonical', 'tmp/audit/anchor-closing-subjective-report.md', 'candidate', 'tmp/units/anchor-repair-evidence/red.log.txt', ':16'],
  ['canonical', 'tmp/audit/anchor-closing-subjective-report.md', 'candidate', 'tmp/units/anchor-repair-evidence-3/after.diff', ':1'],
  ['candidate', 'tmp/units/anchor-repair-report.md', 'canonical', 'tmp/units/anchor-repair-brief-2.md', ''],
  ['candidate', 'tmp/units/anchor-repair-report-3.md', 'canonical', 'tmp/units/anchor-repair-brief-3.md', ''],
  ['canonical', 'tmp/audit/anchor-repair-audit-claims-2.md', 'candidate', 'tmp/units/anchor-repair-report-3.md', ''],
]) {
  const entry = entries.find((item) => item.origin === origin && item.original === original);
  if (!entry) throw new Error(`missing-corpus-input: ${origin}: ${original}`);
  const output = rewriteRecord(entry, entries, []);
  const expected = relative(dirname(`operational/${origin}/${original}`), `raw/${targetOrigin}/${target}`).split(sep).join('/');
  const candidates = [...output.matchAll(/`([^`\r\n]+)`|((?:[A-Za-z]:[\\/]|(?:\.\.\/)*(?:tmp|raw)[\/])[^\s`<>()\[\]{},;]+)/g)].map((match) => match[1] ?? match[2]);
  const matching = candidates.filter((value) => value?.endsWith(`${target.split('/').at(-1)}${suffix}`));
  const actual = matching.map((value) => resolve(dirname(resolve(root, `operational/${origin}/${original}`)), value.replace(/:\d+(?::\d+)?$/, '')));
  results.push({ claim: `Actual complete evidence reference: ${origin}: ${original} -> ${targetOrigin}: ${target}`, expected: resolve(root, `raw/${targetOrigin}/${target}`), output: matching, actual, passed: actual.includes(resolve(root, `raw/${targetOrigin}/${target}`)) && output.includes(`${expected}${suffix}`) });
}
const residuals = [];
const malformed = [];
const requiredReferences = [];
const classifiedReferences = [];
for (const entry of entries.filter((item) => item.original.endsWith('.md'))) {
  const original = readFileSync(resolve(entry.origin === 'canonical' ? manifest.canonical : manifest.candidate, entry.original), 'utf8');
  const unresolved = [];
  const output = rewriteRecord(entry, entries, unresolved);
  residuals.push(...unresolved.map((item) => ({ ...item, category: item.reason.startsWith('Preserve fenced') ? 'preserved execution/source context' : item.reason.includes('different origins') ? 'explicit origin required' : 'unavailable original or historical context' })));
  for (const match of output.matchAll(/(?:tmp|\.orkestrel)\/[\w./-]*?(?:\.\.\/)+raw\/[\w./-]+/g)) if (!original.includes(match[0])) malformed.push({ origin: entry.origin, original: entry.original, introduced: match[0] });
  let fence = false;
  const outputLines = output.split(/\r\n|\n/);
  for (const [lineIndex, line] of original.split(/\r\n|\n/).entries()) {
    if (/^\s*(```|~~~)/.test(line)) { fence = !fence; continue; }
    for (const match of line.matchAll(/(?:[A-Za-z]:[\\/]|(?:\.{1,2}[\/])*(?:tmp|\.orkestrel)[\/])[^\s`<>()\[\]{},;]+/g)) {
      const reference = match[0].replace(/\.$/, '').replace(/:\d+(?:-\d+)?(?::\d+)?$/, '');
      const home = entry.origin === 'canonical' ? manifest.canonical : manifest.candidate;
      const selector = line.slice(0, match.index).match(/\b(canonical|candidate)\s+`?$/i)?.[1]?.toLowerCase();
      const selected = entries.filter((item) => {
        const absolute = resolve(item.origin === 'canonical' ? manifest.canonical : manifest.candidate, item.original);
        return (selector === undefined || item.origin === selector) && [resolve(home, reference), resolve(manifest.canonical, reference), resolve(dirname(resolve(home, entry.original)), reference)].includes(absolute);
      });
      const record = { origin: entry.origin, file: entry.original, line: lineIndex + 1, reference: match[0], output: outputLines[lineIndex] };
      if (fence) classifiedReferences.push({ ...record, category: 'preserved execution/source context' });
      else if (selected.length === 1) {
        const target = selected[0];
        const expected = relative(dirname(`operational/${entry.origin}/${entry.original}`), target.retained).split(sep).join('/');
        requiredReferences.push({ ...record, target: target.retained, passed: outputLines[lineIndex]?.includes(expected) === true });
      } else classifiedReferences.push({ ...record, category: selected.length > 1 ? 'explicit origin required' : /(?:src|tests|guides|host\.json)[\/.:]/.test(reference) ? 'source location outside raw-evidence manifest' : /(?:\.\.\/)+raw\//.test(reference) ? 'historical malformed reference vector' : 'unavailable artifact or directory/execution context outside fixed corpus' });
    }
  }
}
results.push({ claim: 'Fixed-manifest sweep introduces no prefix-plus-retained malformed paths', passed: malformed.length === 0, malformed });
results.push({ claim: 'Known required evidence references in the actual corpus are rewritten', passed: requiredReferences.every((item) => item.passed), failedReferences: requiredReferences.filter((item) => !item.passed) });
const record = { command: 'node tmp/units/anchor-retention-evidence/mapping-corpus-proof.mjs', date: new Date().toISOString(), coverage: 'Complete actual manifest-4 artifact representations and operational Markdown outputs; synthetic collision and unknown longer-path boundaries; actual reported evidence references; no destination copying or staging.', manifest: 'manifest-4.json', instrument: createHash('sha256').update(readFileSync(instrument)).digest('hex'), proof: createHash('sha256').update(readFileSync(resolve(root, 'tmp/units/anchor-retention-evidence/mapping-corpus-proof.mjs'))).digest('hex'), passed: results.filter((item) => item.passed).length, failed: results.filter((item) => !item.passed).length, results, residuals, requiredReferences, classifiedReferences };
const output = existsSync(resolve(root, 'tmp/units/anchor-retention-evidence/mapping-corpus-before-3.json')) ? 'mapping-corpus-after-3.json' : 'mapping-corpus-before-3.json';
writeFileSync(resolve(root, `tmp/units/anchor-retention-evidence/${output}`), `${JSON.stringify(record, null, 2)}\n`, { flag: 'wx' });
console.log(JSON.stringify({ command: record.command, passed: record.passed, failed: record.failed, output, introducedMalformed: malformed }, null, 2));
if (record.failed > 0) process.exitCode = 1;
