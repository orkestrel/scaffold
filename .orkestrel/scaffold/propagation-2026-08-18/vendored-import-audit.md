# Audit: the vendored-set self-hosting change (commit 83f47be)

## Role and engine

`reviewer` on **Opus 5**. GPT-5.6 Sol wrote this change, so the auditor is the engine that did not.

## Posture

Attempt refutation, not confirmation. A claim you cannot break is CONFIRMED with the evidence that
convinced you. A claim you break is BROKEN with the exact failing input, state, or interleaving, plus
the smallest correct fix. Rule NOT-EVIDENCED where the change asserts something no evidence in front
of you can settle, and UNRESOLVED where you need to execute and cannot.

You are read-only. You have no Bash. Every claim below is decidable by reading the diff, the files it
touches, and the rule files it cites — that is deliberate. Where a claim genuinely needs execution,
say so and rule UNRESOLVED rather than guessing.

## Evidence supplied

- `tmp/vendored-import.diff` — the complete diff with its stat.
- `tmp/vendored-import.status` — branch, HEAD, and gate exit status.
- The working tree at `/home/user/scaffold`, at that commit, clean apart from ignored `tmp/`.
- `tmp/vendored-import-unit.md` — the brief Sol executed.
- `tmp/codex/vendored-import-last.md` — Sol's report.

Gate results the Orchestrator ran itself, after Sol's sandbox blocked them: `npx vitest run --project
config` → 28 passed; `npx vitest run --project src:server` → 357 passed (6 files). Sol's own run of
those two reported 31 failures, all sandbox EPERM on loopback `listen`, `spawnSync git`, and
`spawnSync oxlint`. Treat the unsandboxed numbers as the real ones.

## The change, in one paragraph

The vendored `tests/config.test.ts` imported `createScratch` from `@orkestrel/test/server`. That
import fails in exactly one of its 44 propagation targets — the repository publishing
`@orkestrel/test`, which cannot declare itself and whose self-reference resolves to an unbuilt
`dist/`. Sol moved a scratch factory into the vendored `tests/setupPolicy.ts`, removed the import,
stated the general law in `.claude/rules/workspace.md`, recorded the exception it creates in
`.claude/rules/tests.md`, and added a guard over `HOST_PATHS` in `tests/src/server/helpers.test.ts`.

## Numbered claims

Rule on each with a verdict and the evidence that decided it.

**C1.** The guard test's population is the complete `HOST_PATHS` set, not a subset that happens to
contain the offending file. Check what it globs, filters, and skips. A guard that silently skips
directories, missing paths, or an extension the next vendored file will use is a guard with a blind
spot, and `.claude/rules/quality.md` calls an unstated coverage claim a defect in the instrument.

**C2.** The guard cannot pass vacuously. If `HOST_PATHS` filtered to eligible files were empty, the
test must fail rather than pass. `.claude/rules/tests.md` requires asserting the membership a
discovered set should have, not a total an empty population satisfies.

**C3.** The guard's matcher actually matches what it claims. It reports on the text form it was
written for and nothing else. Name at least one import spelling that would evade it — a bare
`import '@orkestrel/x'` side-effect import, a dynamic `import()`, a `require`, a type-only import, a
re-export `export * from '@orkestrel/x'` — and rule whether that evasion is a real gap in this
population or genuinely unreachable.

**C4.** The new `createScratch` in `tests/setupPolicy.ts` preserves the containment the one it
replaced provided: it refuses a target that escapes the scratch root. Read its path handling and try
to defeat it. Consider at minimum an absolute path, a `..` segment, a backslash separator, a
percent-encoded or dot-dot-slash variant, and an empty string.

**C5.** The law is stated once and has one home. `.claude/rules/workspace.md` carries the rule and
`.claude/rules/tests.md` carries a pointer, not a second copy. `AGENTS.md` forbids giving a rule two
homes that can drift.

**C6.** Both rule-file additions are written in the instruction-file voice `AGENTS.md` mandates:
every line a directive naming an observable trigger and a required action; no rationale written to
persuade a human; no record of how the defect was found, which session found it, or what a probe
proved. Quote any clause that fails and give the corrected line.

**C7.** Placing `createScratch` in `tests/setupPolicy.ts` obeys the setup-file law: a setup file owns
everything an assertion needs and nothing an assertion is, so no `describe`, `it`, or `expect`
appears there. It also obeys the export law: every reusable helper in a setup file is exported.

**C8.** The change is confined to what the brief owned. No `src/**` file changed. The artifact-count
pins in `tests/src/core/Compiler.test.ts` (47 total, 32 host-origin) did not need to move, and the
byte-stability digest in `tests/src/core/compilers.test.ts` did not need to move. Verify from the
diff's file list.

**C9.** The `testTimeout: 30_000` half of this commit is correct and complete. The generated template
in `src/core/templates.ts` and this repository's own materialized `vite.config.ts` must agree, or the
next `overwrite` of this repository against itself reintroduces the drift. Check both, and check
whether any other Vitest project in either file has the same "runs a real process" character and was
left on the five-second default.

**C10.** The rule now forbids a vendored file from importing any `@orkestrel/*` package. Read the
other 9 eligible vendored code files and rule whether any of them wants such an import badly enough
that the law creates a worse problem than it solves — in particular whether the duplicate
`createScratch` this creates (one in `@orkestrel/test/server`, one in every target's vendored
`tests/setupPolicy.ts`) is a defect under the consolidation rule in `.claude/rules/tests.md` that the
new exception clause does not adequately license.

## Governing law

`AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`, `.claude/rules/quality.md`,
`.claude/rules/architecture.md`, `.claude/rules/documentation.md`.

## Execution

Perform this audit directly. Spawn nothing. Edit nothing.

## Output

A per-claim table: claim number, verdict (CONFIRMED / BROKEN / UNRESOLVED / NOT-EVIDENCED), and the
evidence that decided it with `file:line` pointers. Then, for every BROKEN claim, the smallest
correct fix. Then a list of the claims you could not break either way, so the next round knows what
has already been attacked.

End with exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL`.

No process diary.
