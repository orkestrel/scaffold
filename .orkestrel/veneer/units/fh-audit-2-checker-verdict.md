<!-- Retained from the checker on Sonnet (native subagent), FRAME-HELPERS audit round 2, claims 3, 5, and 6. Transcribed from its hand-back. -->

Audit round 2 (FRAME-HELPERS, `fh`) — checker verdict for claims 3, 5, 6.

## Claim 3 (N1 and N2) — CONFIRMED

Evidence, `fh-2.diff`:

- **Binding `focusReading`, no shadowing.** Every `FRAMES.focus(...)` return is bound as `const focusReading` at every call site sampled: lines 240, 467, 592, 742, 827, 919, 1016, 1084, 1187, 1455, 1678, 1833, 1948, 2107, 2188, 2336, 2558, 2642, 2733, 2813, 2923, 3018, 3163, 3281, 3414, 3504, 3688, 3785, 3907, 4041. No second `focusReading` declaration shadows an outer one in any of these blocks. `ringed` does not occur anywhere in the diff.
- **`focused` names only a paint read.** Every remaining `focused` binding (lines 602, 1795, 1911/1923, 2312, 3080, 3136, 3655) reads a CSS paint property under a driven focus state, never a `FocusReading`.
- **`FocusOptions.ring` renamed `worn`.** The type declares `readonly worn?: Element` (diff line 4865); the sole call site passing this option uses `worn: checked` (line 743); no remaining call site or declaration uses `ring:` as an option key. The private method's parameter and doc call it "the worn element".
- **Lift sites name the lifted element `specimen`**, except detached copies: Primary focus, hover, and active (lines 237, 348); role hovers destructure `{ name }` (lines 1279–1282); link button (line 1381); the nav case's one loop with its `pointed` flag (lines 3088–3193); the navbar case (lines 3683, 3713); the list-group case lifts `specimen` (line 1169), where `host` names a sub-element read out of it; the check-group and indeterminate cases keep `copied` for the detached clone (lines 638, 666, 2242).

## Claim 5 (Gates) — CONFIRMED

| Gate | Log | Exit line |
| --- | --- | --- |
| `oxfmt --check` (6 owned files) | `fh2-format-2.log.txt` | `All matched files use the correct format.` / `exit 0` |
| `npm run lint:check` | `fh2-lint-2.log.txt` | `exit 0` |
| `npm run check` | `fh2-check-2.log.txt` | `exit 0` |
| `npm run test:setup` | `fh2-test-setup-2.log.txt` | `Tests  313 passed (313)` / `exit 0` |
| `npm run test:setup:browser` | `fh2-setup-browser-2.log.txt` | `Tests  81 passed (81)` / `exit 0` |
| `npm run test:guides` | `fh2-test-guides-2.log.txt` | `Tests  20 passed (20)` / `exit 0` |
| `CAPTURE=1 journey:dark-1280` | `fh2-journey-dark-1280-2.log.txt` | `Tests  62 passed (62)` / `exit 0` |
| `CAPTURE=1 journey:light-390` | `fh2-journey-light-390-2.log.txt` | `Tests  62 passed (62)` / `exit 0` |

- **`fh-shared.patch` still applies — UNRESOLVED.** The claim rests only on the writer's report; the Orchestrator must run `git apply --check` itself.

## Claim 6 (W1) — CONFIRMED (sampled sites)

- "the `outline: 0` declaration": lines 86, 1980, 2132.
- "The row carrying every fault together decides the order": line 4275.
- The `lift` doc and the class remark say the wrapper is "padded unless the `padded` option is `false`" (lines 4931–4932, 4973).
- `FocusReading.entered` records "until the frame was shot" (line 4212).
- The `@throws` tags of `readElement` (4809), `lift` (4981), `focus` (5043), and `createOutlineCapture` (4896) use the "Thrown when" form.
- "the placement every pointer state takes" corrected in the press case (2407–2408) and the file-hover case (2486–2487).
- No banned-term row in any added line; `above` and `below` appear only in the spatial sense.

**Referral outside the claims:** diff line 559, "The strip's leading item is the previous-page arrow, so its second item is the first page," names a DOM child by ordinal position behind an `nth-child(2)` selector; referred rather than ruled.

## Counts the report states

- Diff stat: `6 files changed, 1736 insertions(+), 2218 deletions(-)`.
- Gates: `test:setup` 313, `test:setup:browser` 81, `test:guides` 20, `journey:dark-1280` 62 of 62, `journey:light-390` 62 of 62.
- P1 red `Tests  5 failed | 57 skipped (62)`; green `Tests  5 passed | 57 skipped (62)`.

VERDICT: claims 3, 5, and 6 CONFIRMED except the UNRESOLVED shared-patch apply sub-clause; outside the claims: the line-559 positional-naming referral.
