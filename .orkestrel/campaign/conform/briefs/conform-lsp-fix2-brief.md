# Unit conform-lsp fix round 2 — the `unknown` binding, the fix-round captures, the stale report sentences

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/lsp`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's findings F-1 to F-3 (`units/l3/lsp-objective-r1.md`): `tests/setup.test.ts` binds the parsed manifest as `unknown`; the setup proof's planted-red and green runs and the gate chain are captured under `/home/user/work/evidence/lsp-proofs/`; the report's fleet-F1 evidence and Deviation 1 state the tree as fix round 1 left it.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Non-negotiable rules (never `any`; accept `unknown` and narrow with guards); `/home/user/scaffold/.claude/rules/typescript.md`; `/home/user/scaffold/.claude/rules/writing.md`.

**Sites, as the lane read them at 20:1x UTC.** Line numbers can have moved; read each site before changing it.

- F-1: `tests/setup.test.ts:11` reads `const contents = JSON.parse(readFileSync(manifestPath, 'utf8'))`, which binds `any`. Change it to `const contents: unknown = JSON.parse(readFileSync(manifestPath, 'utf8'))`; the guard chain at `:12-17` narrows `unknown` unchanged. Run `npm --prefix /home/user/fleet/lsp run check` and `npm --prefix /home/user/fleet/lsp run test:setup` after the edit.
- F-3: fix round 1 transcribed its `test:setup` readings and the gate table with no capture file, and the round-1 captures `gate-test.txt` and `scaffold-audit.txt` now read false against the tree. Plant the checkout-name assertion wrong once more (`@orkestrel/wrong-name-plant`), run `npm --prefix /home/user/fleet/lsp run test:setup > /home/user/work/evidence/lsp-proofs/fix1-setup-red.txt 2>&1`, restore the assertion by editing, and capture the green run to `fix1-setup-green.txt`; then capture each gate of the Method to `gate-format-check.txt`, `gate-lint-check.txt`, `gate-check.txt`, `gate-build.txt`, `gate-test.txt`, and the audit to `scaffold-audit.txt`, overwriting the round-1 files.
- F-2: `report.md:29` reads "no `tests/setup.test.ts` exists in the tree", and `:180-181` (Deviation 1) repeats it and states the `vite.config.ts` drift stands unrepaired. Amend `:29` to say the helper is absent and that fix round 1 added `tests/setup.test.ts` as the setup-module proof; add one sentence at the head of Deviation 1 stating that its two readings are superseded by `## Fix round 1`.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/lsp run <script>` and `npm --prefix /home/user/fleet/lsp test` (each optionally followed by `> /home/user/work/evidence/lsp-proofs/<name>.txt 2>&1`), `cd /home/user/fleet/lsp && npx scaffold audit --offline > /home/user/work/evidence/lsp-proofs/scaffold-audit.txt 2>&1`, `git -C /home/user/fleet/lsp status --short`, `git -C /home/user/fleet/lsp diff -- tests/setup.test.ts`, and `node /home/user/scaffold/tmp/work/evidence.mjs lsp`, one command per call, no other chain, no `;`, no `for`, no heredoc.

**Standing condition.** The tree carries the conform-lsp unit's uncommitted edits and fix round 1's; leave every edit outside the Sites as it is.

## Scope

**Owned.** `tests/setup.test.ts` (the one binding), `/home/user/work/evidence/lsp-proofs/*.txt`, `/home/user/scaffold/tmp/units/conform/conform-lsp-report.md`.

**Off-limits.** Everything else. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, delete a file, or run a discarding git command.

## Rows

1. F-1: the binding; `check` and `test:setup` green.
2. F-3: the planted red and the green captured; every gate and the audit captured.
3. F-2: the two report sites.
4. Append a `## Fix round 2` section: the edit, the capture files with their readings, each gate with its exit code, the audit line.

## Method

Rows in order; the gates of row 2 are `format:check`, `lint:check`, `check`, `build`, `test`, then the offline audit, then `node /home/user/scaffold/tmp/work/evidence.mjs lsp`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence — when the binding is not found within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. `git -C /home/user/fleet/lsp diff -- tests/setup.test.ts` shows the `unknown` annotation and no other change to that file beyond the unit's own; `check` exits 0.
2. `fix1-setup-red.txt` reads one failure on the planted name and `fix1-setup-green.txt` reads every case passing; the gate captures match the exit codes the report states.
3. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only the unit's paths.
