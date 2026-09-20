<!-- codex exec, gpt-6-astra, workspace-write -C test; journal test-paint.jsonl (ephemeral); thread 01a0c0dd-50be-7fc3-b009-39cbcbeb5166; exit 0; the unit stopped on a brief defect (readRing returns a contrast ratio, not a width); retained 2026-09-20 -->

# Test-paint report

Stopped before implementation because the brief requires a ring width while its governing guide requires a contrast ratio. HEAD is `ed9b102`. No agents were spawned, dependencies installed, or commits made.

## Deviation

**Expected:** The brief's “The calibrated readings” requirement says that `readRing` over an `oklch()` box-shadow “returns its width.”

**Found:** The governing guide and the existing API define the returned number as contrast. Width and contrast are different measurements; implementing either leaves the other requirement unmet.

**Exact evidence:**

- `guides/test.md:344` describes `readRing` as measuring the contrast of focus chrome against its backdrop.
- `guides/test.md:3041` identifies its result as the ratio reached by the painted outline or box-shadow.
- `src/browser/helpers.ts:2018` implements that contract by measuring each painted color against the backdrop and returning the strongest ratio.
- `tests/src/browser/helpers.test.ts:2722` declares a `3px` black box-shadow over white; its assertion at line 2731 expects `21`, not `3`.
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, under “Authority and loading,” states: “When they conflict, stop and surface the conflict.” This instruction applies to rules and governing guides or specs.
- `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`, under “Deviation protocol,” requires a stopped writer to report expected, found, exact evidence, and done or not done without altering the plan.

**Done:** Read the brief and inspected the relevant scaffold instructions, guide, implementation, and existing ring proof. Confirmed HEAD and the clean tracked working tree. Wrote this report.

**Not done:** No source, test, type, or guide edits. No browser measurements, red-then-green runs, or acceptance gates. The assignment remains incomplete.

**Hypothesis:** “Returns its width” was intended to say “returns its contrast ratio.” The dispatch needs that correction, or an explicit decision to replace the ring API's contrast contract with a width contract.

## Diff per file

- `test-paint-report.md`: added this deviation report under the ignored `tmp/` directory.
- All owned source, test, type, and guide files: unchanged.

The actual `git diff` output is empty.

## Chromium computed strings

Not measured: execution stopped at the contract conflict. No computed serialization is claimed for any color space.

## Red-then-green evidence

Not run. No regression proof or implementation was added.

## Gate evidence

The following commands were not run and have no final output lines:

- `npm.cmd run format:check`
- `npm.cmd run lint:check`
- `npm.cmd run check`
- `npm.cmd run test:src:browser`
- `npm.cmd run test:guides`
- `npm.cmd run test:policy`

## Working tree

`git status --porcelain` exits `0` with empty standard output. Git warns that it cannot access `C:\Users\mikes/.config/git/ignore` because permission is denied. The report is under ignored `tmp/`, so ordinary porcelain output does not list it.
