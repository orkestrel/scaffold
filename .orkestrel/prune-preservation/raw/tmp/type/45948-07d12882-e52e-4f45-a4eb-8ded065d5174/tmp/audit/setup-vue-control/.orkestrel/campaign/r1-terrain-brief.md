# Unit R1-terrain — what roughnotes hand-rolled that `@orkestrel/test` 0.0.17 now publishes

Read-only. Return evidence with `file:line` pointers; no raw file dumps, no decisions, no design,
no edits. Run `git -C C:/Users/mikes/WebstormProjects/roughnotes status --porcelain` before and
after and report both.

## Question

Which exports of the roughnotes browser test setup module duplicate a published `@orkestrel/test`
0.0.17 export, and where does its journey suite reach past the interface?

## Evidence sought

Read exactly these files and nothing else:

- `C:/Users/mikes/WebstormProjects/roughnotes/tests/app/browser/setup.ts`
- `C:/Users/mikes/WebstormProjects/roughnotes/tests/setupBrowser.ts`
- `C:/Users/mikes/WebstormProjects/roughnotes/tests/app/browser/integration.test.ts`
- `C:/Users/mikes/WebstormProjects/roughnotes/tests/app/browser/App.test.ts`
- `C:/Users/mikes/WebstormProjects/roughnotes/tests/app/browser/helpers.test.ts`
- `C:/Users/mikes/WebstormProjects/roughnotes/tests/app/browser/setup.test.ts`
- `C:/Users/mikes/WebstormProjects/roughnotes/vite.config.ts`
- `C:/Users/mikes/WebstormProjects/scaffold/node_modules/@orkestrel/test/dist/src/browser/index.d.ts`
- `C:/Users/mikes/WebstormProjects/scaffold/node_modules/@orkestrel/test/dist/src/core/index.d.ts`

1. **The setup module's exports.** For every `export` in `tests/app/browser/setup.ts` and
   `tests/setupBrowser.ts`: its name, `file:line`, a one-line statement of what it does, and the
   published export whose semantics match — name and `file:line` in the browser or core `.d.ts` —
   or `none`. Where the match is partial, state the difference in one line (a parameter the local
   one takes, a behaviour the published one refuses).
2. **Reach-past sites in the journey suite.** In `integration.test.ts`, every `file:line` that:
   calls `userEvent.keyboard` or imports from `vitest/browser` or `@vitest/browser`; calls
   `.focus()` on an element; calls `elementFromPoint`; reads `classList` or `className`; calls a
   router (`push`, `replace`, `router.`); reads or calls a store or session object directly;
   touches `localStorage` or `sessionStorage` directly; uses `document.querySelector`,
   `querySelectorAll`, or `getElementById`; or polls with `setTimeout`, `setInterval`, or a hand
   loop. Quote the line.
3. **The variant channel.** In `vite.config.ts`: the line range of the `JourneyVariant` type, the
   `VARIANTS` declaration, and the `journey` factory; the `provide` keys it sets; and every place
   in the test files that reads a variant (`inject(`, `import.meta.env.VITE_VARIANT`,
   `VITE_VARIANTS`), with `file:line`.
4. **What proves the setup exports.** In `App.test.ts`, `helpers.test.ts`, and `setup.test.ts`:
   which setup-module exports each test file imports (`file:line` of the import), so the proofs
   that fall with a deleted export are known.
5. **The capture wiring.** Every `file:line` in the test files naming `CAPTURE`, `capture`,
   `createPortfolio`, `captureFrame`, or `expandCaptures`.

## Output

Return only the role's shape: `Question`, `Evidence`, `Distillate`, `Unknowns`, `Journal`,
`Deviation`. Under `Distillate`, give one table for item 1 (export, line, matching published
export or `none`, difference) and one list for item 2.
