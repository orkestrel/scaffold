import { spawnSync } from 'node:child_process'
import { openSync, closeSync } from 'node:fs'
const log = openSync('tmp/units/u2-payment.log.txt', 'w')
const result = spawnSync(process.execPath, ['node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=verbose', '--project', 'app:browser', 'tests/app/browser/integration.test.ts', '-t', 'keeps invoice review'], { env: { ...process.env, VITE_VARIANT: 'dark-390' }, stdio: ['ignore', log, log] })
closeSync(log)
console.log('payment exit:', result.status, result.error ?? '')
