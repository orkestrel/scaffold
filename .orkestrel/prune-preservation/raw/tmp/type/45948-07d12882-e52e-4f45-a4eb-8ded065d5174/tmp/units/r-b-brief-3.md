# Clarify the inherited hide-gate comment

Act as sol in the existing R-B checkout. Keep `r-b-brief-2.md` and its predecessor effective. This successor adds an exact prose correction in App.vue, within the inherited R-A-2 closure. Do not expand runtime behavior.

The Orchestrator read installed Bootstrap offcanvas.js: show sets `_isShown = true` before `aria-modal`; hide sets `_isShown = false` at hide start, but removes `aria-modal` only on completion before `hidden.bs.offcanvas`. Therefore the inherited comment's claim that the attribute reads the instance's own shown state is inaccurate during closing. The attribute span stated by the preceding clause is correct.

Replace the comment above hideMenu with:

```ts
// The dialog carries `aria-modal` from the frame it starts showing to the frame it finishes hiding.
// Wait for `hidden` throughout that span before revealing the arriving screen. The painted `show`
// class arrives only when opening ends, so it cannot guard a navigation taken during opening.
```

Keep the gate and location watcher unchanged. Include this prose correction in your report. Existing independent opening/same-view browser replays are green; no new runtime claim or additional test is required for this comment correction. Preserve every other instruction, scope boundary and output requirement.
