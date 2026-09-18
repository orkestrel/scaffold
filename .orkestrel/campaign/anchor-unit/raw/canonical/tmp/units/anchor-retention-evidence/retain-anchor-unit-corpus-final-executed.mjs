import { createHash } from 'node:crypto';
import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const canonical = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const candidate = join(canonical, 'tmp', 'release', 'scaffold-0.0.75');
const destination = '.orkestrel/campaign/anchor-unit';
const baseline = '2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb';
const manifestPath = join(canonical, 'tmp', 'units', 'anchor-retention-evidence', 'manifest-5.json');
const sources = ['guides/scaffold.md', 'host.json', 'src/server/helpers.ts', 'src/server/types.ts', 'tests/distribution.test.ts', 'tests/src/server/WriteTransaction.test.ts', 'tests/src/server/helpers.test.ts'];
const late = ['tmp/units/anchor-release-verifier-report-2.md', 'tmp/units/anchor-root-acceptance.md', 'tmp/units/anchor-retention-report-3.md', 'tmp/units/anchor-retention-evidence/additive-script-3.patch', 'tmp/units/anchor-retention-evidence/additive-stat-3.txt', 'tmp/units/anchor-retention-evidence/scoped-status-3.txt', 'tmp/audit/anchor-retention-claims-3.md', 'tmp/audit/anchor-retention-objective-brief-3.md', 'tmp/audit/anchor-retention-subjective-brief-3.md', 'tmp/audit/anchor-retention-objective-report-3.md', 'tmp/audit/anchor-retention-subjective-report-3.md', 'tmp/units/anchor-retention-root-acceptance.md'];
const records = ['directory-anchor-ruling.md', 'directory-anchor-failure-map.md', 'anchor-design-verdict.md', 'anchor-repair-audit-verdict.md', 'anchor-closing-verdict.md', 'anchor-release-registry.md'];
const instruments = ['run-anchor-gates.ps1', 'run-anchor-gates-2.ps1', 'run-anchor-gates.mjs', 'anchor-gate-control.mjs', 'launch-anchor-gates.ps1', 'retain-anchor-unit.mjs'];
const probes = ['anchor-identity.mjs', 'anchor-identity-result.json', 'anchor-expectation-reading.mjs', 'anchor-built-reading.mjs'];

export function hashBytes(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

export function resolveBounded(root, key, missing = false) {
  if (key.includes('\\') || isAbsolute(key) || key.split('/').some((part) => part === '..' || part === '.' || part.length === 0)) throw new Error(`invalid-key: ${key}`);
  const path = resolve(root, key);
  const parent = missing ? realpathSync(dirname(path)) : realpathSync(path);
  const distance = relative(realpathSync(root), parent);
  if (distance === '..' || distance.startsWith(`..${sep}`) || isAbsolute(distance)) throw new Error(`root-escape: ${path}`);
  if (!missing && !lstatSync(path).isFile()) throw new Error(`not-file: ${path}`);
  return path;
}

export function runGit(args, binary = false) {
  const result = spawnSync('git', args, { cwd: candidate, encoding: binary ? undefined : 'utf8', timeout: 30000, windowsHide: true });
  if (result.error || result.status !== 0) throw new Error(`git-refusal: ${args.join(' ')}\n${result.error?.message ?? result.stderr}`);
  return result.stdout;
}

export function walkFiles(root, key) {
  const path = resolve(root, key);
  const distance = relative(realpathSync(root), realpathSync(path));
  if (distance === '..' || distance.startsWith(`..${sep}`) || isAbsolute(distance) || lstatSync(path).isSymbolicLink()) throw new Error(`walk-escape: ${path}`);
  if (lstatSync(path).isFile()) return [key];
  return readdirSync(path).sort().flatMap((name) => walkFiles(root, `${key}/${name}`));
}

export function describeFile(origin, key) {
  if (origin !== 'canonical' && origin !== 'candidate') throw new Error(`invalid-origin: ${origin}`);
  if (/(^|\/)(\.env[^/]*|\.npmrc|auth\.json|[^/]*token[^/]*|[^/]*secret[^/]*)$/i.test(key) || /\.(png|tgz|zip|jsonl|err)$/i.test(key)) throw new Error(`excluded-evidence: ${key}`);
  const root = origin === 'canonical' ? canonical : candidate;
  const path = resolveBounded(root, key);
  return { origin, original: key, retained: `raw/${origin}/${key}`, sha256: hashBytes(readFileSync(path)) };
}

export function collectFiles() {
  const selected = [];
  for (const name of readdirSync(join(canonical, 'tmp', 'units')).sort()) {
    if (!name.startsWith('anchor-') || name.startsWith('anchor-pack') || late.includes(`tmp/units/${name}`) || name === 'anchor-retention-evidence') continue;
    const key = `tmp/units/${name}`;
    const stat = lstatSync(resolve(canonical, key));
    if (stat.isFile() && /(?:brief(?:-\d+)?|report(?:-\d+)?)\.md$/.test(name) || stat.isFile() && /^anchor-gates-root\.(log|err)\.txt$/.test(name) || stat.isDirectory() && /^anchor-(?:release-gates-control|gates-control-node)(?:-\d+)?$/.test(name)) selected.push(...walkFiles(canonical, key));
  }
  selected.push(...readdirSync(join(canonical, 'tmp', 'audit')).sort().filter((name) => name.startsWith('anchor-') && !late.includes(`tmp/audit/${name}`)).map((name) => `tmp/audit/${name}`));
  for (const prefix of ['anchor-repair-map', 'anchor-mechanical']) for (const suffix of ['-brief.md', '-report.md', '.ps1']) selected.push(`tmp/cursor/${prefix}${suffix}`);
  selected.push('tmp/units/anchor-gates-root-tool-receipt.json', ...records.map((name) => `.orkestrel/campaign/${name}`), ...instruments.map((name) => `tmp/release/${name}`), ...probes.map((name) => `tmp/probe/${name}`));
  if (existsSync(dirname(manifestPath))) selected.push(...walkFiles(canonical, 'tmp/units/anchor-retention-evidence').filter((key) => key !== relative(canonical, manifestPath).split(sep).join('/') && !late.includes(key)));
  const frozen = [...new Set(selected)].sort().map((key) => describeFile('canonical', key));
  for (const key of ['tmp/units/anchor-repair-report.md', 'tmp/units/anchor-repair-report-3.md', 'tmp/units/anchor-repair-evidence', 'tmp/units/anchor-repair-evidence-3', 'tmp/units/anchor-release-gates-node']) frozen.push(...walkFiles(candidate, key).map((path) => describeFile('candidate', path)));
  return frozen;
}

export function writeExclusive(root, key, bytes) {
  const path = resolve(root, key);
  mkdirSync(dirname(path), { recursive: true });
  resolveBounded(root, key, true);
  writeFileSync(path, bytes, { flag: 'wx' });
  if (hashBytes(readFileSync(path)) !== hashBytes(bytes)) throw new Error(`byte-identity: ${path}`);
}

export function rewriteRecord(entry, entries, unresolved) {
  const root = entry.origin === 'canonical' ? canonical : candidate;
  const text = readFileSync(resolveBounded(root, entry.original), 'utf8');
  const mappings = [];
  const aliases = new Map();
  for (const item of entries) {
    const home = item.origin === 'canonical' ? canonical : candidate;
    const target = relative(dirname(`operational/${entry.origin}/${entry.original}`), item.retained).split(sep).join('/');
    const absolute = resolve(home, item.original);
    const forms = new Set([absolute, absolute.split(sep).join('/'), item.original, relative(canonical, absolute).split(sep).join('/'), relative(dirname(resolve(root, entry.original)), absolute).split(sep).join('/')]);
    for (const alias of forms) {
      const targets = aliases.get(alias) ?? new Set();
      targets.add(target);
      aliases.set(alias, targets);
      for (const selector of [item.origin, item.origin === 'canonical' ? 'Canonical' : 'Candidate']) mappings.push([`${selector} ${alias}`, `${selector} ${target}`], [`${selector} \`${alias}\``, `${selector} \`${target}\``]);
    }
  }
  for (const [alias, targets] of aliases) if (targets.size === 1) for (const target of targets) mappings.push([alias, target]);
  const metadata = relative(dirname(`operational/${entry.origin}/${entry.original}`), 'authorship-manifest.json').split(sep).join('/');
  mappings.push([manifestPath, metadata], [manifestPath.split(sep).join('/'), metadata]);
  if (entry.origin === 'canonical') mappings.push([relative(canonical, manifestPath).split(sep).join('/'), metadata], [relative(dirname(resolve(root, entry.original)), manifestPath).split(sep).join('/'), metadata]);
  mappings.sort((left, right) => right[0].length - left[0].length);
  const replacements = new Map(mappings);
  const alternatives = [...replacements.keys()].map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const pattern = new RegExp(`(?<![A-Za-z0-9_./\\\\:%-])(?:${alternatives})(?![A-Za-z0-9_/\\\\%-]|\\.(?!\\s|$|[)\\]])|:(?!\\d+(?:\\b|$)))`, 'g');
  let fence = false;
  return text.split(/\r\n|\n/).map((line) => {
    if (/^\s*(```|~~~)/.test(line)) { fence = !fence; return line; }
    if (fence) { if (/tmp[\\/]/.test(line)) unresolved.push({ file: entry.original, origin: entry.origin, line, reason: 'Preserve fenced execution context and source literals.' }); return line; }
    const rewritten = line.replace(pattern, (key) => replacements.get(key) ?? key);
    if (/(?:^|[\s`(])(?:[A-Za-z]:[\\/][^\s`)]*?)?tmp[\\/]/.test(rewritten)) unresolved.push({ file: entry.original, origin: entry.origin, line, reason: [...aliases].some(([alias, targets]) => targets.size > 1 && rewritten.includes(alias)) ? 'The same relative path names different origins; require an explicit canonical/candidate selector or absolute path.' : 'Reference has no full known retained mapping; preserve the historical or external context.' });
    return rewritten;
  }).join('\n');
}

export function validateGate() {
  const gate = JSON.parse(readFileSync(resolveBounded(candidate, 'tmp/units/anchor-release-gates-node/summary.json'), 'utf8'));
  if (gate.result?.native !== 0 || gate.result?.exit !== 0 || gate.result?.signal !== null || gate.result?.expired !== false || gate.candidate?.before?.head !== baseline || gate.candidate?.after?.head !== baseline || JSON.stringify(gate.candidate?.before?.status) !== JSON.stringify(gate.candidate?.after?.status)) throw new Error('gate-refusal: native/host success and frozen before/after metadata required');
  return gate;
}

export function checkWhitespace(paths) {
  runGit(['-c', 'core.whitespace=blank-at-eol,blank-at-eof,space-before-tab,cr-at-eol', 'diff', '--cached', '--check', '--', ...paths]);
}

export function assertIndex(paths) {
  const staged = runGit(['diff', '--cached', '--name-only', '-z']).split('\0').filter((key) => key.length > 0).sort();
  if (JSON.stringify(staged) !== JSON.stringify([...paths].sort())) throw new Error(`unexpected-staged-path: ${JSON.stringify(staged)}`);
  for (const key of paths) {
    const blob = runGit(['show', `:${key}`], true);
    if (key.startsWith(`${destination}/`)) {
      if (!blob.equals(readFileSync(resolveBounded(candidate, key)))) throw new Error(`byte-identity: ${key}`);
    } else {
      const expected = runGit(['hash-object', `--path=${key}`, key]).trim();
      if (runGit(['rev-parse', `:${key}`]).trim() !== expected) throw new Error(`source-clean-filter-identity: ${key}`);
    }
  }
  return staged;
}

export function execute() {
  const [expected, mode] = process.argv.slice(2);
  if (!/^[a-f0-9]{40}$/.test(expected ?? '') || mode !== undefined && mode !== '--manifest') throw new Error('usage: node retain-anchor-unit.mjs EXPECTED_HEAD [--manifest]');
  const head = runGit(['rev-parse', 'HEAD']).trim();
  if (head !== expected || expected !== baseline) throw new Error(`wrong-head: expected ${expected}; found ${head}; baseline ${baseline}`);
  if (runGit(['diff', '--cached', '--name-only', '-z']).length > 0) throw new Error('dirty-index: staged index must be empty');
  const parent = realpathSync(join(candidate, '.orkestrel', 'campaign'));
  if (parent !== resolve(candidate, '.orkestrel', 'campaign')) throw new Error('destination-parent-escape');
  const output = join(parent, 'anchor-unit');
  if (existsSync(output)) throw new Error(`evidence-collision: ${output}`);
  if (mode === '--manifest') {
    const manifest = { authored: new Date().toISOString(), canonical, candidate, expected: baseline, destination, sources: sources.map((key) => ({ path: key, sha256: hashBytes(readFileSync(resolveBounded(candidate, key))) })), entries: collectFiles(), required: late.map((key) => ({ origin: 'canonical', original: key, retained: `raw/canonical/${key}` })), exclusions: ['anchor-pack artifacts (owned by post-commit pack retention)', 'Cursor journals and stderr streams', 'images and archives', 'unrelated campaign work and credentials'] };
    writeExclusive(canonical, 'tmp/units/anchor-retention-evidence/manifest-5.json', Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`));
    console.log('MANIFEST_AUTHORED; no destination creation or staging');
    return;
  }
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  if (manifest.expected !== baseline || manifest.canonical !== canonical || manifest.candidate !== candidate || manifest.destination !== destination || JSON.stringify(manifest.sources.map((item) => item.path)) !== JSON.stringify(sources) || JSON.stringify(manifest.required.map((item) => item.original)) !== JSON.stringify(late)) throw new Error('manifest-contract-drift');
  for (const source of manifest.sources) if (hashBytes(readFileSync(resolveBounded(candidate, source.path))) !== source.sha256) throw new Error(`source-drift: ${source.path}`);
  const entries = [...manifest.entries, ...late.map((key) => describeFile('canonical', key))];
  for (const entry of entries) {
    const actual = describeFile(entry.origin, entry.original);
    if (actual.sha256 !== entry.sha256 || actual.retained !== entry.retained) throw new Error(`evidence-drift: ${entry.original}`);
  }
  const gate = validateGate();
  for (const key of late) if (readFileSync(resolveBounded(canonical, key), 'utf8').trim().length === 0) throw new Error(`empty-required-input: ${key}`);
  const unresolved = [];
  const operational = entries.filter((entry) => entry.original.endsWith('.md')).map((entry) => ({ key: `operational/${entry.origin}/${entry.original}`, bytes: Buffer.from(rewriteRecord(entry, entries, unresolved)) }));
  const paths = entries.map((entry) => `${destination}/${entry.retained}`);
  paths.push(...operational.map((entry) => `${destination}/${entry.key}`), `${destination}/.gitattributes`, `${destination}/authorship-manifest.json`, `${destination}/manifest.json`, `${destination}/reference-limitations.json`, `${destination}/index.md`, `${destination}/acceptance.md`, `${destination}/staged-identity.json`);
  if (new Set(paths).size !== paths.length) throw new Error('manifest-destination-collision');
  const index = `# Navigate the anchor unit\n\nRetain raw originals byte-for-byte. Operational Markdown rewrites known evidence references outside fenced execution context. See [reference limitations](reference-limitations.json).\n\n${entries.map((entry) => `- See [${entry.origin}: ${entry.original}](${entry.retained}).${entry.original.endsWith('.md') ? ` See [operational record](operational/${entry.origin}/${entry.original}).` : ''}`).join('\n')}\n`;
  // Mutation begins only after the complete manifest, guards, and rendered records exist in memory.
  mkdirSync(output);
  writeExclusive(output, '.gitattributes', Buffer.from('* -text\n'));
  for (const entry of entries) writeExclusive(output, entry.retained, readFileSync(resolveBounded(entry.origin === 'canonical' ? canonical : candidate, entry.original)));
  for (const entry of operational) writeExclusive(output, entry.key, entry.bytes);
  writeExclusive(output, 'authorship-manifest.json', readFileSync(manifestPath));
  writeExclusive(output, 'manifest.json', Buffer.from(`${JSON.stringify({ ...manifest, executed: new Date().toISOString(), entries, gate: gate.result }, null, 2)}\n`));
  writeExclusive(output, 'reference-limitations.json', Buffer.from(`${JSON.stringify(unresolved, null, 2)}\n`));
  writeExclusive(output, 'index.md', Buffer.from(index));
  writeExclusive(output, 'acceptance.md', Buffer.from('# Record retention execution\n\nRoot invoked the retained instrument after the expected HEAD, empty index, frozen source, evidence hashes, nonexistent destination, required verifier/root records, and native gate success checks passed. This record reports copying and staging; root owns acceptance and commit.\n\nRaw originals use the unit-local `* -text` attribute. Source blobs are checked against Git clean-filter hashes. See [staged identity evidence](staged-identity.json), [manifest](manifest.json), and [navigation index](index.md). Preserve partial output after a refusal; use a separately briefed successor destination.\n'));
  const identities = paths.filter((key) => !key.endsWith('/staged-identity.json')).map((key) => ({ path: key, sha256: hashBytes(readFileSync(resolveBounded(candidate, key))) }));
  writeExclusive(output, 'staged-identity.json', Buffer.from(`${JSON.stringify({ method: 'Every evidence blob compared to disk bytes after staging, including this identity record. Source blobs compared with git hash-object --path clean-filter hashes.', identities }, null, 2)}\n`));
  runGit(['add', '--', ...sources, ...paths]);
  const staged = assertIndex([...sources, ...paths]);
  checkWhitespace([...sources, ...paths.filter((key) => !key.includes('/raw/'))]);
  console.log(JSON.stringify({ result: 'RETENTION_STAGED', expected: head, destination: output, staged, checks: ['evidence disk/blob byte identity', 'source clean-filter identity', 'CRLF-aware source/authored whitespace'], commit: false }, null, 2));
}

try { execute(); } catch (error) { console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1; }
