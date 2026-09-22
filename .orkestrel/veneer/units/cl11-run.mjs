import { spawn } from 'node:child_process'
import { openSync, closeSync, readFileSync } from 'node:fs'
const [log, channel, capture, ...args] = process.argv.slice(2)
const descriptor = openSync(log, 'w')
const child = spawn(process.execPath, ['C:/Users/mikes/scoop/apps/nodejs-lts/current/node_modules/npm/bin/npm-cli.js', ...args], {
  env: { ...process.env, PLAYWRIGHT_CHANNEL: channel === '-' ? '' : channel, CAPTURE: capture === '-' ? '' : capture },
  stdio: ['ignore', descriptor, descriptor],
  windowsHide: true,
  timeout: 600000,
})
child.on('error', error => { console.error(error); process.exitCode = 1 })
child.on('close', code => {
  closeSync(descriptor)
  console.log(readFileSync(log, 'utf8').split(/\r?\n/).slice(-55).join('\n'))
  console.log('NATIVE_EXIT=' + code)
  process.exitCode = code ?? 1
})
