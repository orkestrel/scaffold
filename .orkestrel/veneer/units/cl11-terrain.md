# CL11 terrain — journeys and captures

The single home for CL11's measurements. Its brief states rulings and obligations and restates none
of this. Where the brief and this record disagree, this record and the tree win, and the unit stops
rather than resolving it.

Every reading was taken by the Orchestrator on 2026-09-22 against the **post-CL10 tree**, Veneer
`0e0b055`. That matters: CL10's fix round was granted `tests/setupBrowser.ts` narrowly and added one
export there, so a terrain measured before that landing would cite a file that has since changed.

Cite each site by its symbol. The line numbers move.

## The four carried findings, with their exact uncovered paths

Each is recorded in an earlier verdict. The statements here are re-measured against the current tree,
not copied forward.

### 1. The breakpoint visitor restores in a bare `finally`

`visitBreakpoint` in `tests/setupBrowser.ts` wraps its action in `try` and restores the starting
viewport in a bare `finally`. A rejection from the restore therefore replaces the action's failure,
and the real defect is lost.

**The tree already holds the correct pattern, in the same module.** `holdOraclePointer` catches,
attempts its release inside a nested `try`, and rethrows the original error with the release failure
attached as `cause`. CL1's round 1 closed exactly this class there; the visitor was left.

**No case reaches a rejecting viewport call.** The cases in `tests/setupBrowser.test.ts` drive the
visitor at several widths, nest it, and read the restored width, but none makes the restore reject.

Source: `cl1-audit-verdict.md` round 2, reviewer finding 6.

### 2. Two refusals of the pointer hold have no case

`holdOraclePointer` carries refusal paths that no case reaches:

- **The unreachable-after-scrolling refusal.** Swept `tests/` for its message text: no match outside
  the module that throws it.
- **The pressed-state miss where the release SUCCEEDS.** A case for the pressed-state miss exists in
  `tests/setupBrowser.test.ts`, but it drives the variant where the release *fails*: it asserts the
  rejection carries a protocol error as its `cause`. The successful-release path rethrows the original
  error with no cause, and nothing reads it.

Source: `cl1-audit-verdict.md` round 2, reviewer finding 7.

### 3. The button resolver carries a verb-prefix defect

CL1's fix round renamed the oracle resolver to a reading verb. The analyst noted at the time that the
plain `resolveButton` in the same module carries the same defect and left it for the unit that owns
its consumers.

`resolveButton` finds a button by accessible name among the elements carrying the shipped class and
judges nothing about reachability; `readOracleButton` calls it and adds the reachability refusal. So
the pair is find-then-check, and only the checking half currently reads as a reading verb.

`.claude/rules/names.md` § Fixed lifecycle vocabulary governs which verb is right. **Read that rule
before renaming** rather than assuming the sibling's verb transfers.

Source: `cl1-audit-verdict.md`, the analyst's note recorded as a bound for CL11.

### 4. The root-bounded reader takes the first match

The root-bounded reader returns the first element inside the root whose accessible name matches, so
two elements sharing a name inside one root are indistinguishable. CL1 recorded this as the residual
bound its duplicate-name control does not reach.

Source: `cl1-audit-verdict.md` round 2, reviewer finding 11.

## The capture registry is Button-only

`tests/setup.ts` declares `BUTTON_STATES` — five states, each named for the light mode its own frame
shows — and `PORTFOLIO_STATES`, which is `home`, `home-dark`, those five, and their dark twins.

**Nothing in that registry names a content or layout state.** The registry's own doc block says it
lists the Button states a journey photographs, and it has not grown since the Button family closed.

The doc block also records two measured placement rulings the content states must respect rather than
rediscover:

- **A page frame is used where the paint sits outside the specimen's border box**, because an element
  frame crops it — the focus ring is the measured case — **and where the specimen would be out of an
  element frame's horizontal reach**: a specimen beyond roughly 900 px in the tester came back blank
  white at the 1280-wide variants while the same specimen photographed correctly at 390.
- **An element frame is used for hover and active**, because staging the pane for a page frame moves
  the pointer off the specimen, and each of those journeys reads the state again after the shot.

A disabled frame and an outline frame are deliberately absent: every frame renders the whole section,
so each would duplicate the rest frame.

## The journey proof's current shape

`tests/app/browser/integration.test.ts` carries four groups: `journey` (arrival, mode switching by
control and by keyboard, delegated and native activation, the two refusal voices, focus rings in both
modes, composed contrast, pointer repaint, the reduced-motion hold, the resting and pressed render,
and two official-recording comparisons), `refusal`, `matrix` (settled background at every declared
mode and viewport, and the mounted class and style populations with their published controls), and
`portfolio` (filename expansion and state placement, the pressed reading at the moment of the shot,
and the declared-versus-proven family check).

**The inline-style assertion lives here.** `matrix` asserts the mounted host declares no inline style
anywhere, which is the assertion CL10's showcase specimens had to satisfy. CL11 owns this file, so it
owns that assertion.

## The distribution consumer page exists and drives the Button engine

`tests/distribution.test.ts` packs this workspace, installs it into a throwaway consumer, writes a
real page, bundles it with Vite, serves it over a loopback server, and reads what the page leaves on
a global plus the shipped stylesheet's own reading and its layer list.

- The page's body is empty. Every element is built by the drive script, and the current drive builds a
  delegated host and a plain host and exercises the Button engine.
- The packed stylesheet is resolved through the installed package's `styles` export and written beside
  the page, so the reading is against the published artifact rather than the source cascade.
- **The design criterion for CL11 is that this page carries a container, a row, a table, and a link** —
  the keys CL7, CL8, CL9, and CL6 shipped. None of those is on the page today.

## The gate this project does NOT run

`npm test` does **not** include the distribution project. `test:distribution` appears only in
`prepublishOnly`. So a change to the consumer page is invisible to the ordinary gate chain, and the
unit must run `npm run test:distribution` explicitly and report it.

## The four journey variant projects

The journey config builds one project per variant, each provided its own variant name, the full
variant list, and a capture flag. Each project fixes its own viewport.

**The flag is `CAPTURE=1` in the environment**, read in `vite.config.ts` as an exact comparison against
the string `1` and passed into each project's provided context. Any other value is off, so an ordinary
run proves placement without shooting frames, and a capture run sets that variable.

The two registered widths a layout state must be photographed at are the viewports the variant
projects fix: 1280 and 390.

## What CL11's design row requires

From `content-layout-design-verdict.md` § Acceptance criteria: every registered capture state is
placed by the journey that reaches it, with the placement, filename, and capture-run membership
proofs green; the refusal family carries the exact voice read from the installed module; the layout
states are photographed at both registered widths; a planted failing journey retains its journal and
tree artifacts while the run stays red; the journey suite is green on the four variant projects; the
distribution stage renders a packed-CSS consumer page carrying a container, a row, a table, and a
link; and the whole chain is green on both engines.
