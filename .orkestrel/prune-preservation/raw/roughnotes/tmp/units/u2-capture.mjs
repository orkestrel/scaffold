import { spawnSync } from 'node:child_process'
import { openSync, closeSync } from 'node:fs'
const log = openSync('tmp/units/u2-capture.log.txt', 'w')
const result = spawnSync(process.execPath, ['C:/Users/mikes/scoop/apps/nodejs-lts/current/bin/node_modules/npm/bin/npm-cli.js', 'run', 'test:variants'], { env: { ...process.env, VITE_CAPTURE: 'true' }, stdio: ['ignore', log, log] })
closeSync(log)
console.log('capture exit:', result.status, result.error ?? '')
