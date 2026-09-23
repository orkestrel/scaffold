# Unit CLOSE-ID report

## git diff

```diff
diff --git a/app/browser/constants.ts b/app/browser/constants.ts
index 3e25e0f..60a6d40 100644
--- a/app/browser/constants.ts
+++ b/app/browser/constants.ts
@@ -1039,9 +1039,10 @@ export const FORM_CHECK_COPY = Object.freeze({
  *
  * @remarks
  * Each control carries a label of its own, so every one announces a name the journey can reach it
- * by, and each `id` is unique to the showcase so a label names one control. The checked, disabled,
- * and switch states are declared in the markup, so each renders at rest and needs no drive; the
- * mixed state has no attribute, so the resting checkbox is the one a journey marks mixed.
+ * by, and each `id` attribute is unique to the showcase so a label names one control. The checked,
+ * disabled, and switch states are declared in the markup, so each renders at rest and needs no
+ * drive; the mixed state has no attribute, so the resting checkbox is the one a journey marks
+ * mixed.
  *
  * The radio pair sits in a form of its own. A radio's group spans its form, so a copy of the
  * specimen lifted beside it for a frame forms a group of its own rather than unchecking the pair the
```

## git status --short

```text
 M app/browser/constants.ts
```

## Acceptance criteria

1. The paragraph reads "each `id` attribute is unique to the showcase so a label names one
   control" in place of "each `id` is unique to the showcase so a label names one control", with
   every other word unchanged and the paragraph rewrapped at 100 columns inside its ` * ` frame.
   `git diff --stat` shows `app/browser/constants.ts` alone:
   ```text
    app/browser/constants.ts | 7 ++++---
    1 file changed, 4 insertions(+), 3 deletions(-)
   ```
   Result: pass.
2. `npx oxfmt --check app/browser/constants.ts`, `npm run format:check`, `npm run lint:check`, and
   `npm run check` each exit 0.
   - `npx oxfmt --check app/browser/constants.ts`: `All matched files use the correct format.` exit 0.
   - `npm run format:check`: `All matched files use the correct format.` exit 0.
   - `npm run lint:check`: no output, exit 0.
   - `npm run check`: `tsc`, `check:src:core`, `check:src:browser`, `check:src:styles`, and
     `check:app:browser` (`vue-tsc`) each complete with no diagnostics, exit 0.
   Result: pass.

## Deviation

None. The quoted paragraph matched the brief's evidence exactly at `7398772`.
