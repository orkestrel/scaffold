import { spawnSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
for (const variant of ['dark-1280', 'light-390', 'dark-390']) {
 const result = spawnSync(process.execPath, ['node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=verbose', '--project', 'app:browser', 'tests/app/browser/integration.test.ts'], { env: { ...process.env, VITE_VARIANT: variant }, encoding: 'utf8' })
 const output = result.stdout + result.stderr
 writeFileSync(`tmp/units/u2-baseline-${variant}.log.txt`, output)
 console.log(variant, 'exit:', result.status, result.error ?? '')
 console.log(output.split(/\r?\n/).filter(line => /Tests |Test Files |Duration |×|313 repetitive/.test(line)).join('\n'))
}
