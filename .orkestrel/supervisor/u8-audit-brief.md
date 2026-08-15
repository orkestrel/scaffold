# U8-range audit — polish convergence + the application's first stylesheet

One brief, two blind lanes. Subject: the commit range `4d452ca..HEAD` in `/workspace/supervisor`
(three commits: the U8 restart checkpoint, U8 polish convergence, U8b focus-chrome stylesheet with
its guide parity patches). Writer for the whole range: the Opus `implementer` — so the Sol lane is
mandatory under the fix-round law.

## Lanes

- **Objective lane:** `analyst`, engine **GPT-5.6 Sol**, journaled `codex exec` read-only sandbox.
  Runs its own commands against the checkout. Standing condition: the sandbox denies loopback
  listeners, so browser/listener suites cannot run there — the acceptance chain evidence at
  `tmp/redesign/u8b-acceptance.log` (supplied) is the executed record for those; rule on source +
  supplied evidence and mark anything needing a live listener as evidence-supplied.
- **Subjective lane:** `reviewer`, engine **Opus 5**, native, read-only. Cannot execute; the
  evidence pack below is the executed record. The portfolio frames are the review input for every
  rendered-surface claim; source is corroboration.

Perform the assignment directly; spawn nothing. Read `AGENTS.md`, the applicable
`.claude/rules/*` (tests, browser, styles, documentation, quality), and the `orkestrel-falsify`
skill's verdict shape before ruling.

## Evidence pack

- Range diff: `tmp/redesign/u8-range-evidence.diff` (the actual `git diff 4d452ca..HEAD`).
- `git status --porcelain` after commit: appended at the diff's head.
- Acceptance chain log: `tmp/redesign/u8b-acceptance.log` (11 steps, exit codes inline).
- Contrast tables: `tmp/contrast/light.md`, `tmp/contrast/dark.md` (29 readings each).
- Portfolio: `tests/app/browser/__screenshots__/portfolio/` — 80 frames, 20 states × 2 themes ×
  2 viewports.
- Unit reports: `tmp/redesign/u8-report.md` (if present) and `tmp/redesign/u8b-report.md` —
  writer self-reports, not authoritative.

## Claims — attempt refutation, one verdict each

1. **Portfolio completeness.** Every state the campaign's registry names has all four variant
   frames on disk, each non-empty, and the registry/membership proofs in `portfolio.test.ts` bind
   them (a missing or extra file fails the suite, not just the capture run).
2. **Instrument integrity.** The contrast instrument in `tests/setupBrowser.ts` measures rendered
   colors through a Tab-driven `:focus-visible` reader; U8b's edit to that file adds only the
   stylesheet import (the readers are byte-identical). The instrument failed first: the
   pre-stylesheet run recorded drawer 1.59:1 / filter 2.24:1 red before the fix landed.
3. **The bar is paid.** All 29 readings per theme meet their bars (≥4.5:1 text, ≥3:1 marks and
   focus chrome); the three former failures now assert ≥3:1 in the suite, and no other reading
   regressed below its bar.
4. **The cascade claim.** The shipped build carries the app stylesheet last (after Halfmoon), the
   ring is an opaque outline colored from `--bs-emphasis-color`, no `@layer`, no `!important`, no
   inline style, no literal colour anywhere in `app/browser/styles/`.
5. **Reply/feed story.** Journeys park a run on a confirm prompt AND a choice prompt, answer each
   through the interface (role + accessible name, no state reach-ins), and the feed's arrival
   converges under a poll whose predicate can go false-to-true.
6. **H7 carriers landed.** The filter term is quoted in the status phrase; the filter-button
   column does not resize when Clear enters/leaves; "run ID" wears one casing across
   label/help/status.
7. **Guide parity.** `guides/src/supervisor.md` now says three stylesheets (and why the third
   exists), removes focus from the accent-outline argument, and keeps the no-inline-style claim
   scoped to templates AND the app's own stylesheet. No other guide sentence the diff falsifies
   survives unchanged.
8. **Scope honesty.** The range touches nothing off-limits: `vite.config.ts`, `configs/**`,
   `src/**` untouched; `app/core`/`app/server` only where U8's brief granted additive harness
   constants; vendored files untouched.
9. **Ancillary rulings sound.** Plain CSS (no sass dependency exists or was added), no `@layer`
   (Halfmoon declares none, an unlayered rule outranks layered), `demo/showcase.html` regenerated
   from owned source, `tests/setupBrowser.ts` touch limited to the load the brief's test-parity
   requirement forces.

## Verdict shape

Per claim: **CONFIRMED** (with the evidence that convinced you), **BROKEN** (exact failing input,
file:line, smallest correct fix), **UNRESOLVED**, or **NOT-EVIDENCED**. End with the single
terminal line the `orkestrel-falsify` skill fixes. No process diary.
