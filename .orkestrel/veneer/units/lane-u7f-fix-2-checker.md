<!-- workflow wf_b34576fe-3ce, agent ae9d71eab0cf501ad, label unknown, retained 2026-09-21 -->

PORTFOLIO_STATES confirms 12 states, matching the twelve frame paths per variant file. All probe readings hold. Final verdict below.

## Verdict

**Claims table (mechanical claims only)**

| Claim | Verdict | Evidence |
|---|---|---|
| 6 `[mechanical]` Scope and law | CONFIRMED | `u7f-fix-diff.patch.txt` and `u7f-fix-diff-2.patch.txt` carry byte-identical hunks for `app/browser/styles/_shell.scss` (both diffs, lines 1-36); the round-2 diff's only other touched files are `tests/app/browser/Showcase.test.ts` and `tests/app/browser/integration.test.ts`. `tmp/audit/u7f-fix-status-2.txt` lists exactly ` M app/browser/styles/_shell.scss`, ` M tests/app/browser/Showcase.test.ts`, ` M tests/app/browser/integration.test.ts` (brief 1's three files). A regex sweep of the round-2 diff (`\bany\b|\bas\s|!\.|@ts-|eslint-disable|it\.skip|xit\(|PLANT`) hits only prose uses of the word "as" inside comments/a test title, at `u7f-fix-diff-2.patch.txt:26,73,100,160,185,304,310`, never a type assertion, non-null assertion, suppression comment, or `PLANT` token. `tests/app/browser/integration.test.ts:678` carries the sole `it.runIf(CAPTURE)`, no other skip. `tests/setup.ts:22-44` shows `BUTTON_STATES`/`PORTFOLIO_STATES` untouched by the diff (files not in the status list). `tests/app/browser/index.test.ts` and `tests/setup.test.ts` are absent from the status output, so the export-set assertions are untouched. `stagePane`/`releasePane` resolve at `node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2739` and `:2496`, and `requireValue` at `node_modules/@orkestrel/test/dist/src/core/index.d.ts:487`, so every new import in the diff resolves to a real declared export. `tmp/capture/light-390.txt`, `light-1280.txt`, `dark-390.txt`, and `dark-1280.txt` each end (lines 157-168, confirmed with an explicit `offset`/`limit` after an initial truncated read) with the twelve registered `PORTFOLIO_STATES` frame paths. |

**Probe readings**

- Surface: `git status` (`tmp/audit/u7f-fix-status-2.txt`) shows only the three files; no `package.json` or `src/**` entry — confirmed.
- Placement: `app/browser/styles/_shell.scss:19-27` adds the `header button` rule inside `@layer shell` and reads only `--vn-*` tokens (`--vn-border-width`, `--vn-border-style`, `--vn-border-color`); `app/browser/Showcase.ts:30,54` shows the control (`this.#button`) carries no class at all, and `app/browser/constants.ts` declares none for it — confirmed vacuously.
- Export set: `tests/app/browser/index.test.ts` and `tests/setup.test.ts` are untouched by the diff, so no export-set drift to list — confirmed.
- The proof: `tests/app/browser/Showcase.test.ts:108-143` reads the control's resolved affordance in both modes and asserts `dark` equals `light`; `tests/app/browser/integration.test.ts:416-505` stages/releases reduced motion around the hover and active placements (`stageMedia({motion:false})` … `releaseMedia()`), and `tests/app/browser/integration.test.ts:543-545` appends the pressed-moment tree to `ARTIFACT` and asserts it announces `button "Toggle" [pressed=true]`, confirmed present twice per capture artifact (`tmp/capture/light-390.txt:107,136`) — confirmed.
- Captures: `tests/setup.ts:22-44` shows `PORTFOLIO_STATES`/`BUTTON_STATES` unchanged; `tests/app/browser/integration.test.ts:678` keeps the unconditional filename assertion; the four `tmp/capture/<variant>.txt` files each end with twelve frame paths from the `CAPTURE=1` run — confirmed.

**Extra findings (implementation only)**

None found within scope (claim 6 and its probes).

Verdict: accept
