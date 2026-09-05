// Drives the built LintStage against the probe checkout root, outside vitest, and times the warm
// (the Oxlint language server's initialize under LINT_DEADLINE) plus one inspection.
import { LintStage } from '/home/user/fleet/probe/dist/src/server/index.js'
const workspace = '/home/user/fleet/probe'
const rounds = Number(process.argv[2] ?? '3')
for (let round = 0; round < rounds; round += 1) {
  const started = performance.now()
  const stage = new LintStage(workspace)
  try {
    const check = await stage.inspect(
      { files: [], test: { path: 'tests/src/server/lint-probe-scratch.test.ts', text: 'export const VALUE = 1\n' } },
      { signal: new AbortController().signal },
    )
    console.log(`round ${round + 1}: ok after ${Math.round(performance.now() - started)} ms; issues ${check.issues.length}; elapsed ${check.elapsed}`)
  } catch (error) {
    console.log(`round ${round + 1}: FAILED after ${Math.round(performance.now() - started)} ms: ${error instanceof Error ? error.message : String(error)}${error?.cause ? ' | cause: ' + (error.cause.message ?? error.cause) : ''}`)
  } finally {
    await stage.destroy?.()
  }
}
