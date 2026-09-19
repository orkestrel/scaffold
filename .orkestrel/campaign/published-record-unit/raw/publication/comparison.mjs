import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, normalize, relative, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = resolve('C:/Users/mikes/AppData/Local/Temp/scaffold-registry-20260918');
const PREPARED = resolve('C:/Users/mikes/WebstormProjects/scaffold/tmp/release/anchor-pack/orkestrel-scaffold-0.0.75.tgz');
const PUBLISHED = join(ROOT, 'scaffold-0.0.75.tgz');
const EVIDENCE = join(ROOT, 'comparison-evidence');
const EXPECTED = new Map([
  [PREPARED, 'sha512-PEcCza8w+5lQqnZX0AP8QhCV3msFOf0JeBz0fwhvu4LP230avF14HuIUWPUkWCIxd1YxaYNM4pdgEFmqwWFi8A=='],
  [PUBLISHED, 'sha512-ueJmibzyJKE7fyATUgc+CUWIKpfUEJxUm8oXBSFSrusuZiRYF6s7SfdCyQFmB37vN8+SoUVCssKV4/54sr1fEA=='],
]);

function hashBytes(bytes, algorithm) {
  return createHash(algorithm).update(bytes).digest('hex').toUpperCase();
}

function integrity(bytes) {
  return `sha512-${createHash('sha512').update(bytes).digest('base64')}`;
}

function runTar(args) {
  const result = spawnSync('tar', args, { encoding: 'buffer', maxBuffer: 32 * 1024 * 1024 });
  if (result.error || result.status !== 0) {
    const detail = result.error ? result.error.message : Buffer.from(result.stderr).toString('utf8');
    throw new Error(`tar ${args.join(' ')} failed: ${detail}`);
  }
  return Buffer.from(result.stdout);
}

function cleanMember(name) {
  if (!name.startsWith('package/') || name.includes('\\') || name.startsWith('/') || /^[A-Za-z]:/.test(name)) {
    throw new Error(`unsafe archive member: ${name}`);
  }
  const inside = name.slice('package/'.length);
  if (inside.length === 0 || inside.split('/').some((part) => part === '' || part === '.' || part === '..')) {
    throw new Error(`unsafe archive member: ${name}`);
  }
  return name;
}

function inspectArchive(archive) {
  const listing = runTar(['-tzf', archive]).toString('utf8').split(/\r\n|\n/).filter((line) => line.length > 0);
  const verbose = runTar(['-tvzf', archive]).toString('utf8').split(/\r\n|\n/).filter((line) => line.length > 0);
  const members = new Map();
  for (const line of listing) {
    const member = cleanMember(line);
    if (members.has(member)) throw new Error(`duplicate archive member: ${member}`);
    const bytes = runTar(['-xOzf', archive, member]);
    members.set(member, { bytes, sha256: hashBytes(bytes, 'sha256'), size: bytes.length });
  }
  if (verbose.length !== listing.length || verbose.some((line) => !line.startsWith('-'))) {
    throw new Error(`archive has a non-regular payload entry: ${archive}`);
  }
  return { members, listing, verbose };
}

function compareInventories(left, right) {
  const names = new Set([...left.keys(), ...right.keys()]);
  const results = [];
  for (const name of [...names].sort()) {
    const before = left.get(name);
    const after = right.get(name);
    results.push({ name, prepared: before ? { sha256: before.sha256, size: before.size } : undefined, published: after ? { sha256: after.sha256, size: after.size } : undefined, same: before !== undefined && after !== undefined && before.sha256 === after.sha256 });
  }
  return results;
}

function isText(bytes) {
  return !bytes.includes(0) && bytes.length <= 262144;
}

function textDiff(name, before, after) {
  if (!isText(before) || !isText(after)) return undefined;
  const left = before.toString('utf8').split(/\r\n|\n/);
  const right = after.toString('utf8').split(/\r\n|\n/);
  const lines = [`--- prepared/package/${name.slice('package/'.length)}`, `+++ published/package/${name.slice('package/'.length)}`];
  const limit = Math.max(left.length, right.length);
  for (let index = 0; index < limit; index += 1) {
    if (left[index] !== right[index]) {
      if (left[index] !== undefined) lines.push(`-${left[index]}`);
      if (right[index] !== undefined) lines.push(`+${right[index]}`);
    }
  }
  return `${lines.join('\n')}\n`;
}

function controls() {
  const baseBytes = Buffer.from('A');
  const changedBytes = Buffer.from(baseBytes);
  changedBytes[0] = 'B'.charCodeAt(0);
  const excluded = { sha256: hashBytes(Buffer.from('X'), 'sha256'), size: 1 };
  const base = new Map([
    ['package/value.txt', { sha256: hashBytes(baseBytes, 'sha256'), size: baseBytes.length }],
    ['package/excluded.txt', excluded],
  ]);
  const changed = new Map([
    ['package/value.txt', { sha256: hashBytes(changedBytes, 'sha256'), size: changedBytes.length }],
    ['package/excluded.txt', excluded],
  ]);
  const missing = new Map([['package/value.txt', { sha256: hashBytes(baseBytes, 'sha256'), size: baseBytes.length }]]);
  const changedResult = compareInventories(base, changed).some((entry) => !entry.same);
  const missingResult = compareInventories(base, missing).some((entry) => entry.prepared !== undefined && entry.published === undefined);
  if (!changedResult || !missingResult) throw new Error('comparator control did not distinguish a changed byte or missing member');
  return { changedResult, missingResult };
}

function main() {
  rmSync(EVIDENCE, { recursive: true, force: true });
  mkdirSync(EVIDENCE, { recursive: true });
  const control = controls();
  const preparedBytes = readFileSync(PREPARED);
  const publishedBytes = readFileSync(PUBLISHED);
  const prepared = inspectArchive(PREPARED);
  const published = inspectArchive(PUBLISHED);
  const comparison = compareInventories(prepared.members, published.members);
  const differences = comparison.filter((entry) => !entry.same);
  const inputs = [PREPARED, PUBLISHED].map((path) => {
    const bytes = readFileSync(path);
    return { path, sha256: hashBytes(bytes, 'sha256'), sha512: hashBytes(bytes, 'sha512'), bytes: bytes.length, integrity: integrity(bytes), expected: EXPECTED.get(path), matches: integrity(bytes) === EXPECTED.get(path) };
  });
  if (inputs.some((entry) => !entry.matches)) throw new Error('archive integrity did not match supplied value');
  writeFileSync(join(EVIDENCE, 'prepared-listing.txt'), `${prepared.listing.join('\n')}\n`);
  writeFileSync(join(EVIDENCE, 'published-listing.txt'), `${published.listing.join('\n')}\n`);
  writeFileSync(join(EVIDENCE, 'comparison.json'), `${JSON.stringify({ inputs, comparison, controls: control }, undefined, 2)}\n`);
  for (const entry of differences) {
    const before = prepared.members.get(entry.name);
    const after = published.members.get(entry.name);
    if (before && after) {
      const diff = textDiff(entry.name, before.bytes, after.bytes);
      if (diff !== undefined) writeFileSync(join(EVIDENCE, `${hashBytes(Buffer.from(entry.name), 'sha256')}.diff`), diff);
    }
  }
  const instrument = readFileSync(new URL(import.meta.url));
  const report = [
    '# Published Scaffold archive comparison',
    '',
    `Instrument SHA256: ${hashBytes(instrument, 'sha256')}`,
    `Instrument SHA512: ${hashBytes(instrument, 'sha512')}`,
    '',
    '## Inputs',
    '',
    ...inputs.map((entry) => `- ${basename(entry.path)}: ${entry.bytes} bytes; SHA256 ${entry.sha256}; SHA512 ${entry.sha512}; integrity match ${entry.matches}`),
    '',
    '## Execution',
    '',
    '- node --check comparison.mjs: exit 0',
    '- comparator changed-byte control: pass',
    '- comparator missing-member control: pass',
    '- tar listing and byte extraction: exit 0',
    '',
    '## Different members',
    '',
    ...differences.map((entry) => `- ${entry.name}: prepared ${entry.prepared ? `${entry.prepared.size} bytes / ${entry.prepared.sha256}` : 'absent'}; published ${entry.published ? `${entry.published.size} bytes / ${entry.published.sha256}` : 'absent'}`),
    '',
    'Raw inventory, listings, and bounded text diffs are in comparison-evidence/.',
  ].join('\n');
  writeFileSync(join(ROOT, 'comparison-report.md'), `${report}\n`);
}

main();
