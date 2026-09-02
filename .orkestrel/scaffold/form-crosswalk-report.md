# U3 form-crosswalk — report

## Outcome

Done. `guides/form.md` carries one control-to-category crosswalk and the concept inventory cites it.
Both gates are green. Nothing is committed.

## Touched files

- `guides/form.md` — added the `### Rendering` subsection at the end of `## Controls`, and added
  one sentence to the `Presentation hints` row of `## Concept inventory`.

## Section added

`### Rendering`, at `guides/form.md` lines 495–540, sitting after `### meta` and before `## Rules`,
which is the placement the brief ruled. The guide's own structure argues for nothing else: every
other `## Controls` subsection documents one control, so a subsection about drawing all of them
belongs after the last of them.

The section carries:

- Two opening paragraphs. The first names the `enterprise-bootstrap` skill, its
  `references/inputs.md` file, the `scaffold/.agents/skills/enterprise-bootstrap/references/inputs.md`
  path, and states that a category name is the join key. The second states the obligations every
  field owes whatever its category — `label`, `help`, the message for each `FieldError` keyed by
  `rule`, and the display policy over `touched` — and points at
  `[The three visibility switches](#the-three-visibility-switches)` for the switch obligations
  rather than repeating them.
- One table at lines 511–524, header plus one row per `FieldControl` member, columns
  `Control`, `Category`, `What moves it`, `What the renderer owes`.
- One bullet list at lines 528–540 naming the categories the document does not model.

Concept inventory change: the `Presentation hints` row now ends
`See [Rendering](#rendering) for the catalog category each control maps to.`

## Gate output

`npm run format:check`:

```text
npm notice run @orkestrel/form@0.0.3 format:check
npm notice run oxfmt --config .oxfmtrc.json --check .
Checking formatting...

All matched files use the correct format.
Finished in 1102ms on 48 files using 16 threads.
```

`npm run test:guides`:

```text
npm notice run @orkestrel/form@0.0.3 test:guides
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project guides

 RUN  v4.1.11 C:/Users/mikes/WebstormProjects/form

················································

 Test Files  1 passed (1)
      Tests  48 passed (48)
   Start at  15:31:13
   Duration  569ms (transform 118ms, setup 196ms, import 125ms, tests 95ms, environment 0ms)
```

## Review evidence

`git diff --stat`:

```text
 guides/form.md | 117 ++++++++++++++++++++++++++++++++++++++++-----------------
 1 file changed, 82 insertions(+), 35 deletions(-)
```

`git status --porcelain`:

```text
 M guides/form.md
```

`tmp/` is gitignored in this checkout, so this report and the captured gate output do not appear in
`git status`.

## Acceptance criteria

1. `npm run format:check` green — output above.
2. `npm run test:guides` green — output above, 48 tests passed.
3. Every `FieldControl` member has a row naming a category verbatim. Verified by matching
   `^| \`<member>\` ` against the table body at lines 513–524 for `text`, `editor`, `password`,
   `number`, `date`, `time`, `datetime`, `color`, `confirm`, `select`, `checkbox`, and `file` —
   each returned exactly one row. Every category string in the brief's fixed list was then matched
   as a literal against lines 495–540 and every one was found.
4. No HTML markup and no Bootstrap class name in the added text. Verified over lines 495–540 with
   the pattern `<[a-zA-Z/!]|class=|btn-|form-control|form-select|input-group|dropdown|badge|list-group|aria-|role=|spinner-|invalid-feedback|form-text|form-label` — 0 hits. The words `radio group`
   and `switch` appear as affordance names the guide's `## Controls` opening already uses; neither
   is markup nor a class name.

## Decisions recorded

- **The `What the renderer owes` column carries the control's own obligation, not the shared four.**
  The brief's parenthetical names `label`, `help`, the `rule`-keyed message, and the `touched`
  withholding. Those are identical for every control, so repeating them in twelve cells would be
  noise. They are stated once in the paragraph introducing the table, which closes with
  "The table states what a control owes on top of those." The column set the brief fixed is
  unchanged.
- **Row order follows `FIELD_CONTROLS`**, which is the order `## Controls` and the `## Surface`
  tables already use.
- **The subsection title is `Rendering`**, the brief's ruling, unchanged.
- **The catalog path is written as backticked text, never as a Markdown link.** A Markdown link to
  a path outside this repository fails the `resolves every relative link` assertion in
  `tests/guides.test.ts`. In-document anchors are safe: `isExternalLink` returns `true` for an
  `href` starting with `#`, so the two anchors added here are skipped by that assertion.
- **The formatter output was computed on a scratch copy.** `oxfmt` formats Markdown and re-pads
  table cells, and the brief allows only `format:check` and `test:guides` in this checkout. The
  edited file was copied to the session scratchpad, `oxfmt --write` was run on that copy, the
  result was diffed against the checkout (the only changes were cell padding in the two tables I
  touched), and the formatted copy was written back over `guides/form.md`. No mutating command ran
  inside the checkout.

## Claims I could not close

- **The catalog path is not resolvable from this repository.** The brief fixes
  `scaffold/.agents/skills/enterprise-bootstrap/references/inputs.md` and I wrote it verbatim. This
  repository's own `AGENTS.md` resolves scaffold-owned paths two other ways — `../scaffold/...` next
  to a sibling checkout, and
  `node_modules/@orkestrel/scaffold/dist/host/agents/skills/...` from the installed copy — and the
  released `dist/host` form drops the leading dot from each segment. A reader following the guide's
  path from an installed target will not find the file at that string. I confirmed the file exists
  at `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\enterprise-bootstrap\references\inputs.md`
  and that its headings are the fixed category list. Deciding which of the three path forms the
  guide must print is the Orchestrator's; the skill name in the sentence beside it is the part that
  survives every form.
- **The `touched` wording is the guide's existing policy, restated.** `## Concept inventory` parks
  validation timing on the host: "when to _show_ it is policy over `touched` and the host's own
  timers". I wrote "the display policy over `touched` that holds a message back until somebody has
  visited the field", which names the withholding the brief asked for while keeping the policy the
  host's. It is not a new obligation on the renderer, and no test asserts it.
- **`once` and `new` appear in the added text in permitted senses.** "A list longer than the
  renderer draws at once" is the simultaneity sense, not the temporal `after`. "the host building a
  new schema" names a distinct schema, not a recency claim, and repeats the phrase the concept
  inventory's `Async and live choices` row already uses.
- **No test asserts the crosswalk's content.** `tests/guides.test.ts` proves name resolution, link
  resolution, and the flagship fences; it cannot prove a mapping row is the right mapping. The
  section adds no fence, so it adds no executable claim. `tests/**` is off-limits to this unit.
