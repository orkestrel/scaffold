# BARE-BUTTON (`cb`) round 2 report

Round 2 closes C-a to C-c from the `cb-audit-verdict.md` verdict with no stop. The list-group proof
reads the button action against its anchor action on type and on the keyboard ring, and it reddens
on the `font-size: inherit` mutation and on the unscoped focus-visible mutation. The elements, nav,
and list-group cases use a `19px/29px` wrapper, and the elements case reddens when the universal rule
writes the `--vn-size-5` and `--vn-line-body` tokens. The revised guide defines the bare button by
its attributes in the § Styles paragraph. The coverage matrix separates removed bare declarations
from values that move through inheritance. The `src/styles/elements/_button.scss` partial and the
emitted cascade are unchanged from round 1.

- Executor: `opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-cb`, branch `unit/cb`
  from `a9dff19`. Nothing is committed.
- Governing briefs: `b-cross-cb-brief-2.md` for C-a to C-c, and `b-cross-cb-brief.md` for scope,
  host facts, and limits.
- Records, retained under `/home/user/scaffold/.orkestrel/veneer/units/` (the diff, the status, the shared patch, and this report) and its `cb-instruments/` folder (every other record):
  - the `cb-2.diff` file and the `cb-2-status.txt` file;
  - the `cb-shared-2.patch` file, which supersedes the `cb-shared.patch` file whole;
  - the `cb-interdiff-2.diff` file (owned files, round 1 to round 2) and the
    `cb-shared-interdiff-2.diff` file (shared files, round-1 patch applied to round-2 patch applied);
  - the `cb-mutations-2.log.txt` mutation log, the `cb-mutate-2.sh` script that wrote it, and the
    `cb-mutation-2-token-run.log.txt` run log for the token mutation;
  - the `cb-guide-2.py` script, which rewrites a round-1-patched guide into the round-2 guide;
  - the `cb-scratch-2-*.log.txt` scratch-copy logs and the `cb-gate-2-*.log.txt` worktree gate logs.

## Changes against round 1

The `cb-interdiff-2.diff` file carries every owned change. The `git diff` command confirms that the
`_button.scss` partial, the `_shell.scss` stylesheet, and the `dropdown.test.ts`, `carousel.test.ts`,
and `close.test.ts` files are byte-equal to round 1.

| File | Round-2 change |
| --- | --- |
| `tests/src/styles/components/list-group.test.ts` file | Adds the case "paints each button action as its anchor action, disabled on type and focused on outline and shadow" in the list-group actions block, after the case "widens an action and returns its text to the container alignment". Removes the state-case comment that credited the elements layer's color transition to a button host; the `waitForAnimations` call stays. |
| `tests/src/styles/elements/button.test.ts` file | The wrapper of the case "leaves a classed, an empty-class, and a slide-target button to the reboot alone" reads `19px/29px`, the expected `size` and `line` values read `19` and `29`, and the comment states which tokens the metrics avoid. |
| `tests/src/styles/components/nav.test.ts` file | The same wrapper, expectation, and comment change in the case "paints the disabled button link as it paints the disabled anchor link, at full opacity and in the parent type". |

The replacement metrics avoid every token. The size tokens resolve to 12, 14, 16, 18, 20, 24, 30, and
36 pixels at the 16px root, so 19px matches none. The `--vn-line-body`, `--vn-line-heading`, and
`--vn-line-code` tokens (1.5, 1.2, and 1.6) resolve to no 29px line height at any of those sizes.

## C-a: the list-group proof and the metrics

### The failing-first reading

The `cb-mutate-2.sh` script ran every added or changed case against the partial as committed at
`a9dff19`. The run exits 1 with `Tests  7 failed | 153 passed (160)`. The round-2 case fails on the
line `AssertionError: expected { property: 'font-family', …(1) } to deeply equal { property:
'font-family', …(1) }`: the disabled button takes the calibrated sans stack while the anchor inherits
the wrapper's serif family.

### Named mutations

The following table lists each named mutation. Every run exits 0 on the build and 1 on the tests, and
each summary line is quoted from the `cb-mutations-2.log.txt` log.

| Mutation | Summary line | Failing cases | Assertion line for the round-2 subject |
| --- | --- | --- | --- |
| `font-size: inherit` declaration dropped from the universal rule | `Tests  4 failed \| 156 passed (160)` | close "resolves the recorded content box, inset, and mark"; dropdown button-item case; list-group button-action case; elements reboot case | list-group: `AssertionError: expected { property: 'font-size', …(1) } to deeply equal { property: 'font-size', …(1) }` |
| Focus-visible branch left unscoped (`@at-root button:focus-visible`) | `Tests  4 failed \| 156 passed (160)` | carousel pip case; dropdown button-item case; list-group button-action case; elements reboot case | list-group: `AssertionError: expected { outline: 'none', …(1) } to deeply equal { outline: 'auto', shadow: 'none' }` |
| Universal rule writes `font-size: var(--vn-size-5)` and `line-height: var(--vn-line-body)` in place of the `inherit` value | `Tests  4 failed \| 156 passed (160)` | dropdown button-item case; list-group button-action case; nav disabled-link case; elements reboot case | elements: the expected `line` value `29` received `30`, and the expected `size` value `19` received `20` |

The elements reading under the token mutation comes from the `cb-mutation-2-token-run.log.txt` log
and is appended to the mutation log. With the round-1 `20px/30px` wrapper, that mutation reads 20px
and 30px, which equals the inherited reading; this round did not run that control.

The script restores the fixed partial and rebuilds. The log records `restored partial equals the
fixed copy (cmp exit 0)`, `restored dist/src/styles/index.css equals .orkestrel/veneer/units/cb-instruments/cb-after-index.css
(cmp exit 0)`, and the SHA-256 digest
`f349fac5ba515e8e0394a00914b5154ef034a7fe0ead11c897bb69b8ca13288a` for both files.

## C-b: the guide

The `cb-shared-2.patch` file changes only the `guides/veneer.md` hunks relative to round 1. The other
shared files carry the round-1 changes unaltered. The `cb-shared-interdiff-2.diff` file shows these
changes:

- The § Files row reads "The release's reboot on every button, and the calibrated surface and its
  states on the bare button, a button with no `class` attribute and no `data-bs-target` attribute, in
  the elements layer."
- The § Styles paragraph opens "A bare button is a `button` element that carries no `class`
  attribute and no `data-bs-target` attribute, and the calibrated button surface and its states reach
  a bare button alone."
- The § Styles reboot list names the pointer cursor while enabled, and no outline on a focus the
  browser does not mark as visible.
- The `data-bs-target` sentence is split as the brief gives it.
- Each Additions Reason reads "a bare button" or "a disabled bare button" in place of "a button no
  class claims". The Name, Condition, and Category cells are unchanged.
- The § Tailwind paragraph says a utility-classed button "is no bare button", and it wraps at 100
  columns.
- The § Showcase paragraph says the control "stays a bare button", and it wraps at 100 columns.

The C-b bullets name the Files row by its attributes and by the "bare button" term. The row carries
the term and the attributes, and the § Styles paragraph holds the definition. The unit settled this
wording under the deviation contract.

The reboot list is complete for a classed button. A scan of every elements-layer selector in the
built `cb-after-index.css` stylesheet that can reach a `button` element finds only these rules:
- the universal `button` rule;
- the `button:focus:not(:focus-visible)` rule;
- the `[type=button]` appearance rule;
- the `button:not(:disabled)` cursor rule;
- the bare rule and its states.

The `[role=button]` rule reaches a button only through that role.

## C-c: coverage matrix

The following table uses the round-1 probe readings: the `cb-forms-before.log.txt` log, the
`cb-forms-after.log.txt` log, and the `cb-matrix.txt` file derived from them. The probe mounted each
form inside a `font: 20px/30px serif` wrapper. The "removed bare declarations" column names the bare
rule's declarations and state branches that no longer reach the form, with the computed reading
before and after. The "moved through inheritance" column names a computed value whose own
declaration is unchanged and which moves because an inherited property changed. Hover moved on no
form.

| Form | Removed bare declarations (reading before → after) | Moved through inheritance |
| --- | --- | --- |
| `.btn-close` control | `font-family` property (sans stack → serif), `font-size` property (14px → 20px), `line-height` property (21px → 30px), `transition` property (bare list → `all` at `0s`) | `padding-top` and `padding-left` properties (3.5px → 5px): the release's `.25em` padding follows the inherited size. The release's `1em` width, height, and background size follow the same size; the close geometry case reads them against the control's own size, and the probe did not read them. |
| `.navbar-toggler` control | `font-family` property; disabled branch: `opacity` property (0.65 → 1), `pointer-events` property (`none` → `auto`) | none |
| `.accordion-button` control, expanded and collapsed | `font-family` property; `line-height` property (24px → 19.2px, the heading's 1.2 ratio over the button's 16px); disabled branch: `opacity` property (0.65 → 1), `pointer-events` property (`none` → `auto`) | none |
| `.carousel-control-prev` control | `font-family`, `font-size` (14px → 20px), and `line-height` (21px → 30px) properties; `border-radius` property (6px → 0); focus-visible branch: `box-shadow` property (ring → `none`); disabled branch: `pointer-events` property (`none` → `auto`) | none |
| Carousel indicator, current and resting | `font-family`, `font-size` (14px → 20px), and `line-height` (21px → 30px) properties; `color` property (body text token → inherited `rgb(0, 0, 0)`); `border-radius` property (6px → 0); focus-visible branch: `box-shadow` property (ring → `none`) and `outline-style` property (`none` → `auto`); disabled branch: `pointer-events` property (`none` → `auto`) | none |
| `button.dropdown-item` element | `font-family` property; `font-size` property (14px → the menu's 16px); `line-height` property (21px → 30px); `transition` property (bare list → `all` at `0s`); focus-visible branch: `box-shadow` property (ring → `none`) and `outline-style` property (`none` → `auto`); disabled branch: `opacity` property (0.65 → 1) | none |
| `button.list-group-item-action` element | `font-family`, `font-size` (14px → 20px), and `line-height` (21px → 30px) properties; `border-radius` property on a middle item (6px → 0); `transition` property (bare list → `all` at `0s`); focus-visible branch: `box-shadow` property (ring → `none`) and `outline-style` property (`none` → `auto`); disabled branch: `opacity` property (0.65 → 1) | none |
| `button.nav-link` element | `font-family` property; `border-radius` property (6px → 0); disabled branch: `opacity` property (0.65 → 1) | none |
| `button.page-link` element (not in the showcase) | `font-family` property; `line-height` property (24px → 30px); `border-radius` property (6px → 0); disabled branch: `opacity` property (0.65 → 1), `pointer-events` property (`none` → `auto`) | none |
| `.btn` family and the classless Reboot button | none | none |

The following table names the proof case and the mutations each owned form's proof distinguishes.

| Form | Proof case | Mutations it distinguishes |
| --- | --- | --- |
| `button.nav-link` element | nav disabled-link case | bare selector widened; disabled branch unscoped; universal rule writing tokens |
| `button.dropdown-item` element | dropdown button-item case | bare selector widened; `font-size: inherit` declaration dropped; focus-visible and disabled branches unscoped; universal rule writing tokens |
| `button.list-group-item-action` element | list-group button-action case and the extended list-group disabled case | bare selector widened; `font-size: inherit` declaration dropped; focus-visible and disabled branches unscoped; universal rule writing tokens |
| Carousel indicator | carousel pip case | bare selector widened; `[data-bs-target]` exclusion dropped; focus-visible branch unscoped |
| `.btn-close` control | close no-transition case and close geometry case | bare selector widened; `font-size: inherit` declaration dropped |
| Carousel controls, `.navbar-toggler` control, `.accordion-button` control, `button.page-link` element | elements reboot case, which holds the same class boundary | bare selector widened; `[data-bs-target]` exclusion dropped; each state branch unscoped; `font-size: inherit` declaration dropped; universal rule writing tokens |

No form loses a declaration its release rule writes. Each value in the "removed bare declarations"
column comes from a bare-rule declaration. Only the close control's padding moves through a release
declaration, and that declaration is intact.

## Gates

The worktree gates ran in `/home/user/veneer-cb` with the npm 11 `PATH` entry and
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

| Command | Exit | Result line quoted from its log |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` (`cb-gate-2-format.log.txt`) |
| `npm run lint:check` | 0 | The log's last line is the script echo `> oxlint --config .oxlintrc.json --deny-warnings .`, and the `oxlint` command printed no diagnostic (`cb-gate-2-lint.log.txt`). |
| `npm run check` | 0 | The log's last line is the script echo `> vue-tsc --noEmit -p configs/app/tsconfig.browser.json`, and no step printed a diagnostic (`cb-gate-2-check.log.txt`). |
| `npm run build:src` | 0 | `✓ built in 1.35s` (`cb-gate-2-build.log.txt`) |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/elements/button.test.ts tests/src/styles/components/nav.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/list-group.test.ts tests/src/styles/components/carousel.test.ts tests/src/styles/components/close.test.ts` | 0 | `Tests  160 passed (160)` (`cb-green-2.log.txt`) |

The `cmp` command reports the built `dist/src/styles/index.css` stylesheet equal to the
`cb-after-index.css` copy.

The scratch copy sat at `tmp/probe/cb-copy-2`. It held a `git archive a9dff19` extract, the round-1
shared patch applied through the `git apply` command, the owned files, the `cb-guide-2.py` script's
edits, and a copied `node_modules` directory. `GIT_CEILING_DIRECTORIES=/home/user/veneer-cb/tmp/probe`
keeps the `git apply` command from resolving the enclosing worktree repository. Without it, the
`git apply` command inside `tmp/probe/` reports success and changes no file. The copy is removed.

| Command | Exit | Result line quoted from its log |
| --- | --- | --- |
| `npm run build:src` | 0 | `✓ built in 1.63s` (`cb-scratch-2-build.log.txt`) |
| `npm run test:conformance` | 0 | `Tests  22 passed (22)` (`cb-scratch-2-conformance.log.txt`) |
| `npm run test:guides` | 0 | `Tests  19 passed (19)` (`cb-scratch-2-guides.log.txt`) |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/Showcase.test.ts` | 0 | `Tests  4 passed (4)` (`cb-scratch-2-showcase.log.txt`) |
| `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` (`cb-scratch-2-policy.log.txt`) |
| `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md` | 0 | `All matched files use the correct format.` (`cb-scratch-2-format.log.txt`) |

The `git apply --check .orkestrel/veneer/units/cb-shared-2.patch` command exits 0 in the worktree. The same check
exits 0 on a fresh `git archive a9dff19` extract under the same `GIT_CEILING_DIRECTORIES` value. The
`cb-guide-2.py` script, run over a fresh guide with the round-1 guide hunks applied, reproduces the
scratch copy's guide byte for byte under the `cmp` command.

## Deviation state

No stop. The unit settled these choices under the deviation contract:

- the `19px/29px` replacement metrics, for the token arithmetic in § Changes against round 1;
- the title "paints each button action as its anchor action, disabled on type and focused on outline
  and shadow";
- the case's place in the list-group actions block, beside the case that reads a button action's
  width;
- the § Files row wording that carries both the attribute definition and the "bare button" term.

## Observations for the Orchestrator

- Land the `cb-shared-2.patch` file with the owned change. It replaces the `cb-shared.patch` file.
- The whole suite, the `npm run test:service` command, the journey, and `CAPTURE=1` capture runs were
  not run in this round; they remain the Orchestrator's runs at landing.
- Every instrument, extract, and log sits under `tmp/units/` with the `cb` prefix. The unit created
  the `tmp/probe/` directory and removed it. Nothing is written to the session scratchpad or the
  system temporary directory.
