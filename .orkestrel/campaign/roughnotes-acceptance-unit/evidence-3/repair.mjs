import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const canonical = path.resolve(root, '../../..');
const original = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8').replace(/^\uFEFF/, ''));
const previous = JSON.parse(fs.readFileSync(path.join(root, 'navigation-manifest.json'), 'utf8').replace(/^\uFEFF/, ''));
const records = [...original.records];
const supplements = [];
const rewrites = [];
const required = [];
const documents = [];
const exclusions = [];
const frozen = fs.existsSync(path.join(root, 'navigation-manifest-3.json')) ? JSON.parse(fs.readFileSync(path.join(root, 'navigation-manifest-3.json'), 'utf8')).frozen : [];

export function hashFile(location) {
  return crypto.createHash('sha256').update(fs.readFileSync(location)).digest('hex').toUpperCase();
}
export function slashPath(value) {
  return value.split(path.sep).join('/');
}
export function writeFile(relative, content) {
  const location = path.join(root, relative);
  if (fs.existsSync(location) && relative.startsWith('supplemental/')) {
    if (!fs.readFileSync(location).equals(content)) throw new Error(`Supplement changed: ${relative}`);
    return;
  }
  fs.mkdirSync(path.dirname(location), { recursive: true });
  fs.writeFileSync(location, content);
}
export function freezeFiles(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name);
    const relative = slashPath(path.relative(root, location));
    if (/^(?:evidence-3|operational-3|supplemental)(?:\/|$)/.test(relative) || /^(?:brief-3.md|navigate-3.mjs|\.gitattributes)$/.test(relative)) continue;
    if (entry.isDirectory()) freezeFiles(location);
    else frozen.push({ path: relative, sha256: hashFile(location) });
  }
}
if (!frozen.length) freezeFiles(root);
export function supplementFile(relative, host = 'canonical') {
  const source = path.resolve(original.roots[host], relative);
  if (records.some(record => path.resolve(record.source) === source)) return;
  if (!fs.existsSync(source)) throw new Error(`Required source absent: ${source}`);
  const retained = `supplemental/${host}/${relative}`;
  const bytes = fs.readFileSync(source);
  writeFile(retained, bytes);
  const sourceSha256 = hashFile(source);
  const record = { source, retained, sourceSha256, retainedSha256: hashFile(path.join(root, retained)), rewrite: false };
  records.push(record);
  supplements.push(record);
}
for (const relative of [
  'tmp/probe/run-r-b-final-controls.ps1', 'tmp/units/r-b-final-controls-brief-4.md', 'tmp/units/r-b-final-controls-report-4.md', 'tmp/units/r-b-final-controls-parent-3.log.txt',
  'tmp/probe/run-r-b-cold-host-2.ps1', 'tmp/units/r-b-cold-host-brief-4.md', 'tmp/units/r-b-cold-host-report-4.md', 'tmp/units/r-b-cold-host-parent-3.log.txt',
  'tmp/probe/r-b-variant-tool-5.json', '.orkestrel/campaign/r-b-cold-host-report.md', '.orkestrel/campaign/r-b-variant-probe-report.md',
  'tmp/units/roughnotes-registry-gates-brief.md', 'tmp/units/roughnotes-registry-gates-author-report.md',
  'tmp/audit/r-b-capture-theme-design.md', '.orkestrel/campaign/r-b-capture-theme-design-verdict.md',
  'tmp/probe/retain-r-b-capture.ps1', 'tmp/units/r-b-capture-retention-brief.md', 'tmp/units/r-b-capture-retention-report.md'
]) supplementFile(relative);
for (const relative of [
  'tmp/units/r-b-final-capture.log.txt', 'tmp/probe/r-b-setup/vite.generated.reduced.config.ts', 'tmp/probe/r-b-setup/tsconfig.json',
  'tmp/probe/r-b-final-host/cache-paths.ts', 'tmp/probe/r-b-final-host/journey-cold-2.config.ts', 'tmp/probe/r-b-final-host/app-browser-cold.config.ts', 'tmp/probe/r-b-final-host/setup-reduced.config.ts'
]) supplementFile(relative, 'recovery');
for (const directory of ['tmp/units/r-b-controls', 'tmp/units/r-b-cold-host']) {
  for (const name of fs.readdirSync(path.join(original.roots.recovery, directory))) {
    if (directory.endsWith('r-b-controls') ? /20260918-115\d+\.log\.txt$/.test(name) : /ad83c352edd440a8b906a46a6c1c6470\.log\.txt$/.test(name)) supplementFile(slashPath(path.join(directory, name)), 'recovery');
  }
}
const lookup = new Map(records.map(record => [path.resolve(record.source), record.retained]));
const prose = records.filter(record => record.retained.endsWith('.md') && !record.retained.includes('.before.') && !record.retained.startsWith('brief') && !record.retained.includes('capture-metadata'));
export function resolveTarget(source, token) {
  const cleaned = token.replace(/:\d+$/, '').replace(/\/$/, '');
  const candidates = [];
  if (path.isAbsolute(cleaned)) candidates.push(path.resolve(cleaned));
  else {
    candidates.push(path.resolve(path.dirname(source), cleaned));
    candidates.push(path.resolve(source.includes(`${path.sep}tmp${path.sep}recovery${path.sep}roughnotes${path.sep}`) ? original.roots.recovery : original.roots.canonical, cleaned));
    candidates.push(path.resolve(original.roots.canonical, cleaned));
  }
  for (const candidate of candidates) {
    if (candidate === path.resolve(original.roots.canonical) || candidate === path.resolve(original.roots.recovery)) continue;
    if (lookup.has(candidate)) return lookup.get(candidate);
    const children = records.filter(record => path.resolve(record.source).startsWith(candidate + path.sep));
    if (children.length) return slashPath(path.relative(root, path.resolve(root, children[0].retained, path.relative(children[0].source, candidate))));
    if (candidate.startsWith(path.join(canonical, '.orkestrel') + path.sep) && fs.existsSync(candidate)) return slashPath(path.relative(root, candidate));
  }
  if (cleaned === 'tmp/units/r-b-controls') return 'supplemental/recovery/tmp/units/r-b-controls';
  if (cleaned === 'tmp/units/r-b-cold-host') return 'supplemental/recovery/tmp/units/r-b-cold-host';
  if (cleaned === 'tmp/units/r-b-gates-evidence') return 'recovery/tmp/units/r-b-gates-evidence';
  if (cleaned === 'tmp/journeys') return 'canonical/capture-metadata/tmp/journeys';
  const basename = path.basename(cleaned);
  const matches = records.filter(record => path.basename(record.source) === basename);
  if (matches.length === 1) return matches[0].retained;
  if (matches.length) {
    const context = source.includes('registry') ? 'registry' : source.includes('r-b-') ? 'r-b-' : undefined;
    const narrowed = matches.filter(record => context && record.source.includes(context));
    if (narrowed.length === 1) return narrowed[0].retained;
  }
  return undefined;
}
for (const record of prose) {
  const operational = `operational-3/${record.retained}`;
  const directory = path.dirname(path.join(root, operational));
  const raw = fs.readFileSync(path.join(root, record.retained), 'utf8').replace(/^\uFEFF/, '');
  const replacements = new Map();
  const renderings = new Map();
  for (const mapped of records) {
    const source = path.resolve(mapped.source);
    const aliases = [source, slashPath(source), path.basename(source)];
    for (const host of Object.values(original.roots)) {
      const relative = path.relative(host, source);
      if (!relative.startsWith('..') && !path.isAbsolute(relative)) aliases.push(slashPath(relative));
    }
    for (const alias of aliases) {
      if (!raw.includes(alias)) continue;
      const target = resolveTarget(record.source, alias);
      if (target) replacements.set(alias, target);
    }
  }
  for (const match of raw.matchAll(/(?:C:[\\/][^\s`"<>|)]+|(?:tmp|\.orkestrel)[\\/][^\s`"<>|)]+)/g)) {
    const token = match[0].replace(/[.,;:'"]+$/, '');
    if (/\.png$/.test(token) || /tmp[\\/]capture[\\/]states/.test(token) || /tmp[\\/]capture-retained/.test(token)) {
      replacements.set(token, 'canonical/capture-metadata/inventory.json');
      exclusions.push({ document: operational, token, reason: 'Historical PNG portfolio or capture location; retained registry inventory and recipe carry reproduction, no image payload copied.' });
      continue;
    }
    const target = resolveTarget(record.source, token);
    if (target) replacements.set(token, target);
    else exclusions.push({ document: operational, token, reason: /\.jsonl$/.test(token) ? 'Excluded ephemeral bench journal; quota substitution provenance stays in raw audit.' : 'Original host, source, output-root, or predecessor context; raw record remains exact and is not an instruction to open retained acceptance evidence.' });
  }
  for (const match of raw.matchAll(/(?<![A-Za-z0-9_./\\-])[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)+\.(?:txt|json|tsv|diff|patch|ps1|mjs|md)(?::\d+)?/g)) {
    const target = resolveTarget(record.source, match[0]);
    if (target) replacements.set(match[0], target);
  }
  if (record.source.includes('r-b-gates-report')) {
    for (const name of ['preflight.log.txt','format-check.log.txt','lint-check.log.txt','check.log.txt','build.log.txt','test.log.txt','final-status.log.txt']) replacements.set(name, `recovery/tmp/units/r-b-gates-evidence/${name}`);
  }
  if (record.source.endsWith('r-b-report-11.md')) {
    const sentence = 'The actual green capture regenerated `tmp/capture/states/navigation--light-390.png`.';
    replacements.set(sentence, 'canonical/capture-metadata/inventory.json');
    renderings.set(sentence, 'The raw report describes the historical green capture image. Inspect its retained inventory carrier at');
  }
  for (const match of raw.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = resolveTarget(record.source, match[1]);
    if (target) replacements.set(match[1], target);
  }
  const pattern = new RegExp('(?<![A-Za-z0-9_./\\\\-])(?:' + [...replacements.keys()].sort((left, right) => right.length - left.length).map(value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(?![A-Za-z0-9_./\\\\-])', 'g');
  const translated = replacements.size ? raw.replace(pattern, token => {
    const target = replacements.get(token);
    const rendered = slashPath(path.relative(directory, path.resolve(root, target)));
    const output = renderings.has(token) ? `${renderings.get(token)} \`${rendered}\`.` : rendered;
    rewrites.push({ document: operational, from: token, to: output, target });
    required.push({ document: operational, token: rendered, target });
    return output;
  }) : raw;
  const companions = [];
  if (/r-b-final-(?:objective|subjective|audit)/.test(record.source)) companions.push('recovery/tmp/units/async-capture-rejection-11-green.log.txt', 'recovery/tmp/units/setup-generated-11-normal.log.txt', 'recovery/tmp/units/setup-generated-11-reduced.log.txt', 'recovery/tmp/units/r-b-gates-evidence/test.log.txt');
  if (/registry.*(?:verifier|acceptance)/.test(record.source)) companions.push('canonical/tmp/units/roughnotes-registry-adoption-evidence/registry-adoption-20260918/terminal.json', 'canonical/tmp/units/roughnotes-registry-adoption-evidence/registry-adoption-20260918/after.json', 'canonical/tmp/units/roughnotes-registry-gates-evidence/roughnotes-registry-gates-20260918/terminal.json', 'canonical/tmp/units/roughnotes-registry-gates-evidence/roughnotes-control-2-20260918/control-terminal.json', 'canonical/capture-metadata/inventory.json');
  const appendix = companions.map(target => {
    if (!fs.existsSync(path.join(root, target))) throw new Error(`Required companion is absent: ${target}`);
    const rendered = slashPath(path.relative(directory, path.join(root, target)));
    required.push({ document: operational, token: rendered, target });
    return `- [${target}](${rendered})`;
  });
  writeFile(operational, 'Read this operational translation from its document directory. Commands name retained inputs but keep the historical working-root requirements of the [raw execution record](' + slashPath(path.relative(directory, path.join(root, record.retained))) + '). Do not execute acceptance mutations from this retained folder. Historical image and portfolio tokens identify retained inventory carriers; image measurements and inspection statements describe the original PNGs.\n\n' + translated + (appendix.length ? '\n## Resolve the acceptance evidence\n\nUse these retained inputs for the abbreviated log and terminal references in the historical prose.\n\n' + appendix.join('\n') + '\n' : ''));
  documents.push({ raw: record.retained, operational, rawSha256: hashFile(path.join(root, record.retained)), operationalSha256: hashFile(path.join(root, operational)), source: record.source });
}
writeFile('operational-3/capture.md', '# Retained capture evidence\n\nSee [the registry inventory](../canonical/capture-metadata/inventory.json), [the journey records](../canonical/capture-metadata/tmp/journeys/), [the executed capture retention recipe](../canonical/tmp/probe/retain-roughnotes-registry-capture.ps1), and [the final accepted run](../canonical/tmp/units/roughnotes-registry-gates-evidence/roughnotes-registry-gates-20260918/). PNG paths in the raw records describe the historical portfolio. The inventory and recipe carry reproduction; the retained folder has no image payload.\n');
documents.push({ operational: 'operational-3/capture.md' });
documents.push({ operational: 'operational-3/reproduction.md' }, { operational: 'index-3.md' }, { operational: 'report-3.md' });
for (const record of frozen) if (hashFile(path.join(root, record.path)) !== record.sha256) throw new Error(`Prior artifact changed: ${record.path}`);
writeFile('navigation-manifest-3.json', JSON.stringify({ purpose: 'Bounded operational acceptance translation; exact source context, single-pass replacements, supplemental proof inputs.', roots: original.roots, supplements, documents, rewrites, required, exclusions, frozen, unresolved: [] }, null, 2) + '\n');
console.log(JSON.stringify({ supplements, exclusions }, null, 2));
