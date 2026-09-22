# Unit CL13-harness — the Bootstrap side of the portfolio

## Role and engine

`builder` on the native cheap tier, the sole writer in the Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer`. Perform the assignment directly and spawn nothing.

Do not commit, push, install a dependency, or run a destructive command. Do not run `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`.

**Write nothing into the tracked tree.** Your entire output is one script and its artifacts under
`tmp/`, which is git-ignored. If you believe a tracked file must change, stop and report.

## Objective

Write one self-contained script that captures Bootstrap 5.3.8's own rendering of four specimens, at
two viewports and two themes, so a verdict round can compare Veneer's rendering against it.

## Why this exists

Veneer's side of the portfolio already exists: 32 frames under `tmp/capture/states/` produced by the
journey suite's capture run, each already proven non-blank by the suite's own pixel guard.

Bootstrap has no such suite here. `.agents/skills/orkestrel-polish-surface/references/capture-harness.md`
says to build a spawned harness only for a surface no Vitest browser project can host, and Bootstrap's
distribution is exactly that. **Read that reference before writing anything.**

## The one rule that decides whether this harness is usable

**Mirror Veneer's markup exactly and swap only the stylesheet.** A difference in the captured frames
must be attributable to the cascade, never to different markup.

Read the four specimens out of `app/browser/constants.ts` and reproduce each one's markup byte for
byte:

- the capped container specimen,
- the numbered columns specimen,
- the base table specimen,
- the role links specimen.

Take the table specimen's full markup from whatever the showcase builds around its class, not from
the class name alone.

**Where Veneer's markup names a class Bootstrap does not ship, keep it and record it.** That is a
finding for the verdict round, not something for you to adjust.

## The stylesheet

Load `node_modules/bootstrap/dist/css/bootstrap.css` — the unminified distribution, pinned at 5.3.8
in `package.json`. Load nothing else. Do not load Veneer's cascade, and do not load Bootstrap's
JavaScript; these are static specimens.

## The variants

Capture every combination of:

- widths **1280** and **390**, which are the widths Veneer's journey projects fix;
- themes **light** and **dark**. Bootstrap 5.3 switches theme through the `data-bs-theme` attribute on
  the root element; read its distribution to confirm the exact mechanism rather than assuming.

That is four frames per specimen, sixteen in all. Name each frame so its specimen, its theme, and its
width are readable from the filename alone, and say in your report what naming you chose.

## The other artifacts

The harness reference names what a portfolio must carry beyond frames. Produce, for each variant:

- an accessibility snapshot of the rendered roles, names, and states;
- a log of what the harness did, in order, with what it observed after each step.

A frame alone is not a portfolio.

## The lifecycle rules, which the reference states and this brief restates because they decide success

- One self-contained script that spawns its own children, waits for readiness, captures, and kills
  them before returning. Nothing may outlive the call.
- Pin every child's working directory.
- Wait on an **observable readiness signal** — a served response or a printed line — never a fixed
  sleep.
- Pipe child standard error somewhere readable and print it on failure.
- Tear down on every exit path, including assertion and setup failure, so no server, browser, or port
  is orphaned.

## Prove the frames are not blank

Veneer's side is guarded: its capture run asserts every written frame has pixel variation. Your side
must carry the same assurance, and you must not assume it.

**Assert it, and prove the assertion can fail.** `tests/setupBrowser.ts` exports a frame-variation
reader CL11 added; read it and either reuse its approach or state why you did not. Prove your check
against a deliberately blank image, and record the red and the green.

## Unknowns

Settle each and report what you found.

- **How Bootstrap 5.3.8 switches theme**, read from its own distribution.
- **Whether every class Veneer's markup carries exists in Bootstrap's cascade.** Report any that does
  not, with the specimen it appears in. Do not adjust the markup.
- **What browser the harness can drive here.** The checkout already resolves a browser for its test
  suite; read `configs/browsers.ts` before choosing.

## Scope

**Owned:** `tmp/cl13/` and nothing else. The script, its artifacts, and its logs all live there.

**Off-limits:** every tracked file, `tmp/capture/**` which holds Veneer's side of the portfolio, and
every path `scaffold repair` restores.

## Execution

On this host, heredocs, `node -e`, `node -p`, `&&` chaining, and any argument carrying `${...}` trip
the approval classifier: write a program to a file and invoke the file, one plain command per call.

## Output

1. The script's path, and how it is invoked.
2. The naming you chose for the frames, and the full list of what it produced.
3. Each Unknown, with what you found.
4. The blank-frame check: its red and its green, with commands and output.
5. Any class in Veneer's markup that Bootstrap does not ship, named with its specimen.
6. `git status --porcelain --untracked-files=all`, actual output, proving nothing tracked changed.
7. Anything you could not close.

No process diary.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle within your own scope: the script's structure,
the frame naming, and how the snapshot and log are formatted. Stop and report if a tracked file would
have to change, if the browser cannot be driven here, or if mirroring Veneer's markup is impossible
for a specimen.

## Acceptance criteria

1. The script runs to completion in one invocation and leaves no orphaned process or port.
2. Sixteen frames exist, four per specimen, covering both widths and both themes.
3. Every frame passes the blank check, and that check is proven able to fail.
4. An accessibility snapshot and a step log exist for each variant.
5. `git status --porcelain --untracked-files=all` shows no tracked file changed.
