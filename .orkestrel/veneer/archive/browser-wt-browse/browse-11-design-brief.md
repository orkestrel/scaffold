# Unit browse-11-design — item 11's rendered text inside the floor's elements

## Role and engine

`analyst` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Design lane with probes, in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse` (branch `ccr-d15a48b1-yyyll6` at `73c608f`, with item 11's stopped partial edits uncommitted: leave them as they are). Write only under `tmp/probes/` and `tmp/codex/`; change no tracked file, commit nothing, and spawn nothing.

## The question

`read` returns the Markdown that `@orkestrel/html` and `@orkestrel/markdown` project from the capture (`src/core/BrowserToolset.ts:766`, `src/core/BrowserReading.ts:68`, `:86`). Their floor `UNSAFE_ELEMENTS` (`node_modules/@orkestrel/html/dist/src/core/index.js`; `guides/markdown.md:544`, `:561`) removes whole subtrees, text included: `applet`, `base`, `button`, `dialog`, `embed`, `form`, `frame`, `frameset`, `iframe`, `input`, `link`, `math`, `meta`, `noscript`, `object`, `option`, `script`, `select`, `style`, `svg`, `template`, `textarea`. So `read` omits a form's prose, an open dialog's content, button labels, a select's shown option, field values, and icon names that a person sees. The user's goal: `read` carries exactly what a person sees, and the floor in `@orkestrel/html` stays unchanged.

Design how item 11's inert capture copy (`tmp/browse-item-11-design.md` § Corrected design, rulings 2 and 3; the stopped run's patch `tmp/codex/browse-11-stopped.patch` and report `tmp/codex/browse-11-report.md`) lowers each text-bearing floor element into inert markup the projection keeps, in both placements (CDP `compileReadFunction`, DOM `readBrowserCapture`), before projection.

## Probe first

In `tmp/probes/`, through `npm run test:probe`, on this host's Edge 154 and in both the main and an isolated world, record for each element below what a person sees, what `innerText` holds, what the accessibility tree reports (name, value, role), and its computed `display` and `visibility`: a `form` holding prose and fields; an open and a closed `<dialog>` (modal and non-modal); `button` with text, with an icon and `aria-label`, and disabled; `select` (single, `multiple`, `size` above 1, with `optgroup`); `input` of types text, email, number, search, password, checkbox, radio, range, date, color, file, hidden, submit, reset, button, and image; `textarea` with a default and a typed value; inline `svg` with `<title>`, with `aria-label`, and decorative (`aria-hidden`); `math`. Record a typed value against a default value where they differ.

## Rule

For each element: lower to what (text, label, value, or nothing), from which reading, and why. Password values and hidden inputs never appear. Keep `script`, `style`, `template`, frames, `object`, `embed`, `applet`, `noscript`, `meta`, `link`, and `base` dropped. Rule how the lowered markup survives the floor and the safe-element unwrapping, the oracle that replaces `markdown.includes(X) === innerText.includes(X)` (a person-sees reading per element, with each case where `innerText` and the person differ named), placement parity, the guide's `read` row, and the tests that fail when the lowering is removed. Name every public contract or TSDoc summary the change touches.

## Output

Write `tmp/codex/browse-11-design.md` and return it as your final message: the probe readings with the browser versions, the per-element table and rulings, the oracle, the file edits (`path:line`), the tests, the guide and roadmap edits, and the risks. No process diary.

## Deviation contract

Stop if a reading shows the goal needs a change to `@orkestrel/html` or `@orkestrel/markdown`, and report: expected, found, evidence, and one hypothesis.
