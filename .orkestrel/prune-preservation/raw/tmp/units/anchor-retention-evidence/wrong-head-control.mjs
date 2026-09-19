import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const canonical = process.cwd();
const candidate = resolve(canonical, 'tmp/release/scaffold-0.0.75');
const instrument = resolve(canonical, 'tmp/release/retain-anchor-unit.mjs');
const destination = resolve(candidate, '.orkestrel/campaign/anchor-unit');
const before = spawnSync('git', ['diff', '--cached', '--name-only', '-z'], { cwd: candidate });
const reading = spawnSync(process.execPath, [instrument, '0000000000000000000000000000000000000000'], { cwd: canonical });
const after = spawnSync('git', ['diff', '--cached', '--name-only', '-z'], { cwd: candidate });
writeFileSync(resolve(canonical, 'tmp/units/anchor-retention-evidence/wrong-head.stdout.txt'), reading.stdout, { flag: 'wx' });
writeFileSync(resolve(canonical, 'tmp/units/anchor-retention-evidence/wrong-head.stderr.txt'), reading.stderr, { flag: 'wx' });
const result = { date: new Date().toISOString(), host: process.platform, node: process.version, command: { file: process.execPath, argv: [instrument, '0000000000000000000000000000000000000000'], cwd: canonical }, instrument: createHash('sha256').update(readFileSync(instrument)).digest('hex'), exit: reading.status, signal: reading.signal, destinationExists: existsSync(destination), indexUnchanged: before.status === 0 && after.status === 0 && before.stdout.equals(after.stdout), stagedBefore: before.stdout.toString('utf8'), stagedAfter: after.stdout.toString('utf8') };
writeFileSync(resolve(canonical, 'tmp/units/anchor-retention-evidence/wrong-head.json'), `${JSON.stringify(result, null, 2)}\n`, { flag: 'wx' });
console.log(JSON.stringify(result, null, 2));
if (reading.status !== 1 || !reading.stderr.toString('utf8').includes('wrong-head:') || result.destinationExists || !result.indexUnchanged) process.exitCode = 1;
