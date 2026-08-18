# Audit: the conditional `setup` project implementation (uncommitted, at HEAD da01121)

## Role and engine

`reviewer` lane on a **Claude engine**. GPT-5.6 Sol wrote this change and Opus 5 is dark, so the
Claude cheap tier holds the cross-engine lane. You are read-only; edit nothing, run nothing.

## Posture

Attempt refutation. CONFIRMED with evidence, BROKEN with the failing input and smallest fix,
NOT-EVIDENCED where nothing in front of you can settle it, UNRESOLVED where only an execution you
cannot run would settle it. Every claim below is decidable by reading.

## Evidence

- `tmp/setup-impl.diff` — the complete uncommitted diff (12 files).
- `tmp/setup-project-unit.md` + `tmp/setup-project-unit-2.md` — the brief and its amendment.
- `tmp/setup-project-reconciliation.md` — the two-lane ruling the brief implements.
- `tmp/codex/setup-impl2-last.md` — Sol's report.
- Executed evidence the Orchestrator produced after Sol returned (Sol's sandbox blocked some spawns):
  scaffold `src:core` 294/294, `format:check`/`lint:check`/`check`/`build`/full `npm test` all exit 0;
  the rebuilt CLI accepted `/workspace/ollama` (`overwrite` exit 0, 64 written), whose generated
  `vite.config.ts` registers the `setup` project and whose `test` chain runs `test:setup`; ollama's
  `install`, three static gates, and full `npm test` all exit 0 (2026-08-18).

## Numbered claims

**C1.** The derivation in `CLI.#derive()` selects `setup` from an exact-case root
`tests/setup*.test.ts` match only: a nested `tests/src/setup.test.ts`, a wrong-case
`tests/Setup.test.ts`, and a non-test `tests/setup.ts` all leave it false. Read the matching code,
not the report.

**C2.** The conditional cannot leak into the default path: with `setup: false`, the generated
manifest and root config are byte-identical to the pre-change output. The fixture
`tests/src/core/fixtures/setup-false-manifest.txt` pins the manifest — check the test that consumes
it fails on any byte drift and that the fixture is compared whole, not by membership. Check the
digest test still pins `99938e0f…`.

**C3.** The fail-closed case holds: a manifest naming `setup` with no matching root file is still
refused through `CLI.#projectQuestion()`, and the new CLI test at `tests/src/bin/CLI.test.ts` proves
both directions (accepted with the file, refused without). Read the test's fixtures and assertions.

**C4.** `Blueprint.setup` carries complete ecosystem parity: `types.ts` TSDoc matches the `bin`
field's voice; `isBlueprint` requires the boolean; factories default it; the compiler and CLI JSON
surfaces carry it; `guides/scaffold.md` documents it wherever `Blueprint`'s fields are documented,
and no guide table drifted.

**C5.** The generated `setup` project matches the cross-cutting shape: include
`['tests/setup*.test.ts']`, Node environment, browser disabled, `./tests/setup.ts` setup file, and
the `test` chain inserts `test:setup` in a stable position. Compare against the sibling factories in
`src/core/templates.ts`.

**C6.** The rule texts landed verbatim per the reconciliation, in instruction-file voice, one home
per rule: the mirror-rule replacement and proof-table row plus directive in
`.claude/rules/tests.md`, the matrix row plus registration directive and script-list addition in
`.claude/rules/workspace.md`. Quote any drift from the fixed wording.

**C7.** Nothing outside the unit's scope moved: the diff touches only the owned files, no vendored
test file, no `vite.config.ts`, no `package.json`, and the two new test files sit in mirrored
locations per `.claude/rules/tests.md`.

## Output

Per-claim table (claim, verdict, `file:line` evidence), smallest fix for any BROKEN, claims you
could not break, findings outside the claims, then exactly one terminal line: `VERDICT: PASS` or
`VERDICT: FAIL`.

No process diary.
