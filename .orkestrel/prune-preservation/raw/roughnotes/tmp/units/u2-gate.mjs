import { spawnSync } from 'node:child_process'
import { openSync, closeSync, writeFileSync } from 'node:fs'
const log = openSync('tmp/units/u2-gate.log.txt', 'w')
const start = performance.now()
const result = spawnSync(process.execPath, ['C:/Users/mikes/scoop/apps/nodejs-lts/current/bin/node_modules/npm/bin/npm-cli.js', 'test'], { stdio: ['ignore', log, log] })
const seconds = (performance.now() - start) / 1000
closeSync(log)
const reading = `npm test: exit ${result.status}; wall-clock ${seconds.toFixed(3)} seconds\n`
writeFileSync('tmp/units/u2-gate-duration.txt', reading)
console.log(reading, result.error ?? '')
