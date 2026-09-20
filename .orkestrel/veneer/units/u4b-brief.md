# Unit U4b — conformance and the oracle

## Role and engine

`sol` on Astra through `codex exec --sandbox workspace-write -C C:/Users/mikes/WebstormProjects/veneer`.
You are the bench engine reading this brief inside your own CLI: perform the assignment directly
and spawn nothing. Sole writer in the Veneer checkout; commit nothing; install nothing; run no
`scaffold repair`, no tree-wide `format`, no lint `--fix`, no `npm run build`; never run
`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git add`.

## Objective

Make `tests/conformance.test.ts` the place where Veneer is held to Bootstrap 5.3.8: an oracle that
drives the official component markup under the official CSS and bundle in a real browser and
records what the component does, a fixture per component that the recording must match, a
cross-check of that fixture against the rows `guides/veneer.md` § Compatibility carries, and a
presence check of every shipped component's official selector set and custom-property set in the
built cascade. Record Button's fixture in this unit; Button itself ships in U7.

## Law

Read from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`; `.claude/rules/tests.md`,
`architecture.md`, `names.md`, `typescript.md`, `documentation.md`, `writing.md`, `portability.md`.
Veneer's own `AGENTS.md` says its law resolves against that checkout. The plan section this unit
implements is `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/plan.md` § U4b.

## Context

**The tree.** `HEAD` is the U-styles-guide landing commit (named in the dispatch message); the
working tree is clean except `tmp/`. `node_modules` carries `@orkestrel/scaffold` 0.0.76 from the
registry and the `@orkestrel/test` 0.0.18 tarball installed `--no-save`; `playwright` `^1.63.0`
and `bootstrap` `5.3.8` are installed; `dist/` may be absent at start (`npm.cmd run
build:src:styles` builds the cascade the presence check reads).

**Measured facts.**

- `tests/conformance.test.ts` runs in the Node `conformance` project (`vite.config.ts` factory
  `conformance()`: `environment: 'node'`, `browser.enabled: false`, `setupFiles: ['./tests/setup.ts']`,
  include `tests/conformance.test.ts`; the root is content-owned and is not edited). It carries
  `Bootstrap reference identity` (the pinned release and the three artifact digests) and
  `runtime boundaries` (forbidden dependencies, forbidden source imports, escaping imports, entry
  closures). `tests/setupConformance.ts` (package-owned; `repair` restores no `setupConformance`
  module) exports `BOOTSTRAP_VERSION`, the three digests, `FORBIDDEN_RUNTIME`, `WORKSPACE_ROOT`,
  `BOOTSTRAP_MANIFEST_PATH`, `readManifestMember`, `scanForbiddenDependency`,
  `extractStringArgument`, `extractSpecifiers`, `scanForbiddenSource`, `scanEscapingImport`,
  `collectImportClosure`, `readBootstrapCascade`, `computeArtifactDigest`;
  `tests/setupConformance.test.ts` asserts its export set and cases each export.
- The official artifacts: `node_modules/bootstrap/dist/css/bootstrap.css` and
  `node_modules/bootstrap/dist/js/bootstrap.bundle.js`, digest-pinned by the identity cases.
- The inventory `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/inventory.json`
  (U4a) maps `components.<key>` to `selectors` (a list whose members carry `selector`,
  `declarations`, `classes`, `elements`, `attributes`, `pseudoClasses`, `pseudoElements`),
  `declarations`, `properties` (an object keyed by custom-property name), `keyframes`, `media`, and
  `rtl`; `components.btn` has 103 selectors and 34 custom properties. The ledger
  `research/ledger.md` § CSS rows and § Obligation rows assign `btn` and the cross-cutting engine
  rows to `U7 Button` with status `accepted scope`; `research/obligations.md` § Button lists
  Button's obligations with their kind (identity, attribute, method, initialization,
  accessibility) and their source lines in `button.js`. Copy neither file into the tree: the test
  reads the accepted list from the guide, and the fixture is recorded live.
- The guide reader: `tests/guides.test.ts` imports `GuideCommand` from `@orkestrel/guide/server`;
  `@orkestrel/guide` (core) exports `createGuide`, `selectSectionBlocks(document, heading)`,
  `findColumnIndex(table, header)`, `extractCellText`, and `extractCellLinks` — read
  `node_modules/@orkestrel/guide/dist/src/core/index.d.ts` for the exact signatures and use them
  to read § Compatibility; never scan the Markdown with a local regex.
- The browser resolver: `configs/browsers.ts` (vendored, read-only) exports `resolvePinnedBrowser`,
  `resolveBrowser(executable, platform, env)`, and the managed-Chromium resolution the Vitest
  browser projects use; the recorder launches Playwright's `chromium` with the executable that
  resolves, so Edge runs through `PLAYWRIGHT_CHANNEL=msedge` reach it the same way.
- `guides/veneer.md` carries `## Surface`, `## Methods`, `## Examples`, `## Styles`, `## Tokens`
  (with subsections), `## Showcase`, `## Tests`; it has no `## Compatibility`. The package has one
  guide; add no other.
- The fixture form this checkout uses for data a proof loads is a `fixtures/` folder holding
  data files only (`tests/src/styles/fixtures/mixins.scss`); a `fixtures/` folder never holds
  TypeScript.
- The `conformance` project's timeouts are Vitest's defaults; a recorder case sets its own
  timeout as the third argument of `it` (the root config is not edited), sized from a contended
  run: measure a recorder case's duration while `npm.cmd run test:src` runs beside it, and set the
  timeout to twice that measure plus 5 seconds, recorded in the report.

**Host.** Windows. Your exec shell is PowerShell with script execution disabled: run scripts as
`npm.cmd run <name>`; a `.ps1` file is refused. Playwright Chromium launches inside this sandbox
on this host (a Vitest browser project ran here on 2026-09-20); a recorder launching Playwright
from a Node Vitest worker is one level deeper than a browser project's launch, so if `chromium.launch`
fails `EPERM` inside the sandbox, stop, report the exact error, and leave the recorder written:
the Orchestrator takes that proof on the host. The `prove` tool is blocked here. Write instruments
under `tmp/u4b/`. `git status` warns about a missing global ignore file; the exit code is 0.

**Controls.** `PLANT-ACCEPTED`: add a `shipped` row for a component the cascade does not carry
(the guide's own table, a component key from the inventory such as `alert`); `test:conformance`
must red on the presence check; remove. `PLANT-MISSING`: rename `tests/fixtures/oracle/button.json`
aside; `test:conformance` must red on the missing fixture; restore. `PLANT-DIFFER`: change one
recorded value in the fixture; `test:conformance` must red on the difference and name the step;
restore from a copy with a byte comparison. `PLANT-ROW`: add a § Compatibility row for Button that
the recording contradicts (an event the plugin never dispatches); the cross-check must red naming
the row; remove. Name no test for a control.

## Unknowns

- Whether `chromium.launch` from a Node Vitest worker succeeds inside the sandbox (see Host).
- Whether Playwright's `emulateMedia({ reducedMotion: 'reduce' })` and `mouse.down`/`mouse.up`
  produce a deterministic recording for Button on repeated runs; report any nondeterminism with the
  step that varies, and exclude a step only by naming it as excluded in the fixture's `excluded`
  list with the reason.

## Scope

**Owned.** `tests/conformance.test.ts`, `tests/setupConformance.ts`, `tests/setupConformance.test.ts`,
`tests/fixtures/oracle/**`, `guides/veneer.md` (a new `## Compatibility` section between
`## Tokens` and `## Showcase`, and the `## Tests` links for the conformance proof), `guides/README.md`
(the concept-index row for compatibility, if the index carries one per section). **Off-limits.**
Everything else: the root `tsconfig.json` and `vite.config.ts`, every `configs/**` file, `src/**`,
`app/**`, `tests/src/**`, `tests/app/**`, `tests/setup.ts`, `tests/setupBrowser*.ts`,
`tests/setupStyles*.ts`, `tests/setupListeners.ts`, `tests/guides.test.ts`, `tests/distribution.test.ts`,
`package.json`.

## Execution

Perform the assignment directly and spawn nothing. Types first in `tests/setupConformance.ts`
(the fixture's shape, the step and reading shapes, the compatibility row shape), then the readers
and the recorder, then the proofs, then the guide. Run `npm.cmd run test:setup` and
`npm.cmd run test:conformance` after each item.

1. **The section.** Add `## Compatibility` to `guides/veneer.md` between `## Tokens` and
   `## Showcase`: one paragraph stating that the section is the ledger of what Veneer accepts from
   Bootstrap 5.3.8 and that `tests/conformance.test.ts` reads it; a table `Component | Kind |
   Obligation | Proof | Status` with Button's rows from `research/obligations.md` § Button and
   the cross-cutting engine rows the ledger assigns to `U7 Button`, where `Kind` is the
   obligation's kind, `Proof` names the fixture step that proves the row (`button.click.toggle`,
   `button.keyboard.space`, and so on) or `—` for a row no recording can drive (the jQuery
   interface, the plugin registration), and `Status` is `accepted` for every Button row (U7 flips
   the rows it ships to `shipped`); a paragraph naming the exclusions the ledger records
   (`research/ledger.md` § Exclusions) as prose; and a sentence stating the two statuses and what
   each obliges. Write the rows so a later component unit adds its own without changing the shape.
2. **The compatibility reader.** In `tests/setupConformance.ts`, export a reader that loads
   `guides/veneer.md` through `@orkestrel/guide`, selects `## Compatibility`, and returns the rows
   as a readonly list of the row shape (component key, kind, obligation, proof step or
   `undefined`, status as a union of the two statuses); refuse a table with a missing column or a
   status outside the union with an `Error` naming the row. Case it in
   `tests/setupConformance.test.ts` over a written Markdown document and a control missing a
   column.
3. **The presence check.** In `tests/conformance.test.ts`, for every component key whose rows are
   all `shipped`, read the inventory's selector set and custom-property set for that key and
   assert each member appears in the built `dist/src/styles/index.css` (read through
   `readBootstrapCascade`'s sibling for the built cascade, added to `tests/setupConformance.ts`);
   assert that the set of `shipped` keys equals the set of keys the test lists, so a key the guide
   ships and the test omits fails and a key the test lists and the guide does not ship fails.
   With no `shipped` row today, the check asserts an empty set both ways and the `PLANT-ACCEPTED`
   control proves it reads the section. The inventory is read from
   `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/inventory.json` only by
   the Orchestrator's probes; the test reads a copy this unit places at
   `tests/fixtures/oracle/inventory.json` (data), and `tests/setupConformance.test.ts` asserts that
   copy's `version` and `digests` equal the pinned release and digests.
4. **The recorder.** In `tests/setupConformance.ts`, export the recorder: it launches Playwright
   `chromium` (executable from `configs/browsers.ts`, headless), opens a page whose document
   carries only the official `bootstrap.css` and `bootstrap.bundle.js` from `node_modules` (a
   fixture page written into a scratch directory from `@orkestrel/test/server`'s `createScratch`,
   or served from a data URL; choose and record), sets the official component markup for Button
   (`<button type="button" class="btn btn-primary" data-bs-toggle="button">Toggle</button>` and the
   `aria-pressed="true"` variant, plus a disabled `<a>` variant), installs listeners for every
   `*.bs.button` event and a `MutationObserver` for class and attribute changes on the component,
   and drives it by role and name: click, `Space` and `Enter` from the keyboard, hover, pointer
   hold and release, and the same under `emulateMedia({ reducedMotion: 'reduce' })`. It records,
   per step, the ordered event types, the class list after, the changed attributes after, the
   focused element's accessible name, and any refusal (an action Playwright reports as not
   actionable), as the fixture shape. The recorder writes `tests/fixtures/oracle/button.json`
   only under `ORACLE_REFRESH=1`; every ordinary run records live and compares with the committed
   file, failing when the file is missing or differs and naming the first differing step.
5. **The cross-check.** For each § Compatibility row whose `Proof` names a step, assert the
   recording carries that step and that the step's readings agree with the row's obligation
   (`toggle()` flips `active` and `aria-pressed`; the data-api click calls `preventDefault`; the
   accessibility rows read the accessible role and pressed state); a row the recording
   contradicts or a row whose step the recording lacks fails naming the row.
6. **Controls.** Run the four controls red and restore each, with the byte comparison for
   `PLANT-DIFFER`.
7. **The guide's `## Tests`.** Link the conformance proof's new cases beside the existing ones.
8. **Gates**, each with its final lines: `npm.cmd run format:check`; `npm.cmd run lint:check`;
   `npm.cmd run check`; `npm.cmd run test:setup`; `npm.cmd run test:conformance` (with the
   contended-run timeout measure from Context); `npm.cmd run test:guides`; `npm.cmd run test:policy`;
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:conformance`. `npm test`, `test:distribution`, and
   `scaffold audit` are the Orchestrator's verifier's.

## Output

Write `u4b-report.md` and return its content: the diff summary per file; the fixture's
shape and Button's recorded steps; the timeout measure and the value set; each control's red
reading and its restore proof; the unknowns' readings; each gate's final lines; deviations with
expected, found, exact evidence, done or not done, and at most one hypothesis.

## Deviation contract

Stop and report on: `chromium.launch` refused inside the sandbox; a recording that differs between
two consecutive runs on a step you cannot name as excluded; a need to edit an off-limits file; a
gate red after your own fix inside owned files. Decide, record, and carry on from: the fixture
page's transport (scratch file or data URL), the step names, the row wording, the reader's names
within the helper-prefix table.

## Acceptance criteria

1. `guides/veneer.md` carries `## Compatibility` in the stated place and shape with Button's rows
   `accepted`; `test:guides` green.
2. The compatibility reader and the built-cascade reader are exported, typed in the module, and
   cased; the presence check reads the section through `@orkestrel/guide` and reads the inventory
   copy whose version and digests are pinned.
3. `tests/fixtures/oracle/button.json` exists; an ordinary `test:conformance` records live and
   matches it on managed Chromium and on Edge; the four controls reddened and are removed.
4. `format:check`, `lint:check`, `check`, `test:setup`, `test:conformance`, `test:guides`, and
   `test:policy` exit 0; official JavaScript executes nowhere outside the recorder's page.
5. `git status --porcelain` shows only the owned files, the fixtures, and the report.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the fixture file.
