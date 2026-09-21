# u7-setup-tidy audit claims

Subject: unit u7-setup-tidy in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`),
written by `opus` on Opus 5 under `units/u7-setup-tidy-brief.md` (retained as
`.orkestrel/veneer/units/u7-setup-tidy-brief.md`; report `units/u7-setup-tidy-report.md`) over
the U7a landing `12e1bd6`. Evidence rendered by the Orchestrator: `units/u7-setup-tidy-diff.patch.txt`
(`git diff 12e1bd6 -- . ':(exclude)tmp'`) and `tmp/audit/u7-setup-tidy-status.txt`. Rule on the
diff and the live files, never on the report's word alone. Scope: implementation only, by the
user's ruling — no wording, comment, doc-block, or guide-prose findings. Claims marked
`[mechanical]` are the checker's; every other lane rules on every claim. An extra finding is an
implementation defect with a site and a one-line failure scenario, numbered from 11.

1. `readPaintedColor` and `matchesPaintedColor` no longer exist under `tests/`; every former call
   site in `tests/src/styles/**` compares through the installed `matchesColor` from
   `@orkestrel/test/browser`; U7a's Button proofs are untouched; the five wrapper cases and the
   two export-set names are gone from `tests/setupBrowser.test.ts`; `test:setup:browser` reads
   15 passed and `test:src:styles` 104 passed on Chromium and Edge.
2. The one styles case the swap reddened on byte quantization (`tokens.test.ts`, the triplet
   case: the dark `--vn-surface-tertiary-base` blue channel 0.50009 from the authored triplet) is
   widened to the true relationship (each channel within one whole step, alphas equal), and a
   discrimination control (each triplet's first channel shifted by 2) reddens it naming every
   pair; the control was restored.
3. The forced-colours case in `mixins.test.ts` reddened because the installed `parseCSSColor`
   mounts its probe inside the forced-colours emulation and reports every pair equal; the case
   now compares the two computed `color` strings directly (`not.toBe(resting)` under emulation,
   `toBe(resting)` after release), which is exact and needs no colour reader; the unit's probe
   readings (`rgb(0, 0, 159)` under emulation against `rgb(0, 0, 0)` at rest) support it. The
   Orchestrator rules this resolution accepted; the reader's limit under forced colours is a
   Test-side bound.
4. `vite.config.ts` pins `pool: 'forks'` on the `setup` project; `PLANT-POOL` (`pool: 'threads'`)
   reddened the working-directory case with `TypeError: process.chdir() is not supported in
   workers` — the measured failure, which the case's comment now names — and was restored;
   `test:config` passes (its proof reads a `pool` key for the `probe` project alone).
5. One release pin and one CSS digest remain, in `tests/setupConformance.ts`
   (`BOOTSTRAP_VERSION`, `BOOTSTRAP_CSS_DIGEST`), because the styles setup module loads in the
   browser project and the conformance module imports Node modules, so the import edge runs from
   conformance to styles only; `BOOTSTRAP_VERSION`, `BOOTSTRAP_DIGEST`, and `BOOTSTRAP_CASCADE_PATH`
   are deleted from `tests/setupStyles.ts` with their only consumer case (its subject was the
   agreement of two pins that no longer both exist), and each half stays proven where the
   constant lives (the manifest version case, the working-directory digest case,
   `tests/conformance.test.ts`'s digest).
6. `describeIncompleteRow(subject, index, cells)` is exported from `tests/setupConformance.ts`
   and proven; `readCompatibility` labels an incomplete row by its one-based position and the
   first filled column (`Compatibility row 1 (Component: btn): missing required cell`), the
   invalid-status path keeps its component-and-obligation label so the pinned wording
   (`Compatibility row btn: Toggle active: invalid status pending`) is unchanged and green;
   `readDeferrals` takes the same column-named form (`Deferral row 2 (Owner: Passive)`), with the
   all-empty row `Deferral row 1: missing required cell`; cases cover a missing obligation, a
   missing component, an all-empty row, and the helper directly.
7. The binding-table case asserts every `ORACLE_BINDINGS` entry, named or fallback, answers at
   least one `readCompatibility()` row of its component and category; it ran red on the
   `btn | event` fallback (the ledger carries no `btn | event` row) and green after that entry's
   deletion; `PLANT-REACH` (an `alert | event` fallback) reddened it naming the entry and was
   restored (no `alert` remains in the file).
8. `scanOracleObligation` takes a third `bindings` parameter defaulting to `ORACLE_BINDINGS` and
   refuses an `event` entry with an empty `events` list with `binding btn | event names no
   events` before reaching the predicate; the two cases that drove the deleted fallback pass a
   one-entry table of their own and assert the new refusal and the `recording contradicts
   obligation` refusal with `events: ['keydown']`; `matchesOracleEvents` stays exported and
   driven; the one assertion that moved from `recording contradicts obligation` to `obligation
   has no oracle predicate` is a true reading of a category with no entry.
9. `[mechanical]` Scope and law: `git status --porcelain --untracked-files=all` shows only the
   twelve owned files (`tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
   `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupConformance.ts`,
   `tests/setupConformance.test.ts`, five `tests/src/styles/**` files, `vite.config.ts`);
   `src/**`, `app/**`, `guides/**`, `package.json`, `configs/**`, `tests/conformance.test.ts`,
   `tests/fixtures/**` absent from the diff; no `any`, no assertion outside `as const`, no
   non-null assertion, no suppression, no skip; every added module-scope function exported and
   tested; no case named for a control; no `PLANT` residue; no `zzprobe` file remains; the
   export-set cases in `tests/setupBrowser.test.ts`, `tests/setupStyles.test.ts`, and
   `tests/setupConformance.test.ts` list exactly the live exports.
10. The gates the report records exit 0 (`format:check`, `lint:check`, `check`, `test:setup` 110
    passed, `test:setup:browser` 15 passed on Chromium and Edge, `test:src:styles` 104 passed on
    Chromium and Edge, `test:conformance` 8 passed, `test:config` 173 passed); the verifier lane
    re-runs the whole chain on the host and its reading rules this claim.
