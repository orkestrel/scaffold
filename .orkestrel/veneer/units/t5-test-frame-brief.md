# Unit T5 — TEST-FRAME: an element frame stages only the height its element needs, and a decode refusal names the frame's size

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent. You open this brief yourself and perform
the assignment directly. You spawn nothing.

## Objective

In `@orkestrel/test`, make `captureFrame` stage an element frame's pane to the element's own bottom
edge rather than to the whole document's content height, and make the `readFrame` decode refusal
name the frame's size in device pixels.

## Context

**Evidence.** The checkout is `/home/user/test-tf` on the `unit/tf` branch, cut from Test `main`
`80c419e` (`Release 0.0.23`); `npm run check` exits 0 there.

- `src/browser/types.ts` › `FrameOptions`: `path`, `width`, `height`, and `element?: Element | undefined`
  ("Holds the element to shoot. Omit it to shoot the whole page.").
- `src/browser/helpers.ts` › `captureFrame`: stages the pane at the declared size, then loops
  `covered = Math.max(measureContent(), options.height)` with the growth carry, bounded by
  `CAPTURE_STAGINGS` (`src/browser/constants.ts`, value 4), whether or not `options.element` is set.
  It shoots `page.screenshot({ element, path, base64: true })` for an element frame.
- `src/browser/helpers.ts` › `readFrame`: on a decode failure it throws
  `Capture frame at ${path} is not an image this browser decodes` with the cause; it never reads the
  frame's declared size.
- `tests/src/browser/helpers.test.ts` › `describe('captureFrame')` and the `measureContent` cases hold
  the existing proofs. `guides/test.md` § the capture paragraphs (the ones opening "`captureFrame`
  stages, shoots, and proves the file", "The frame covers the whole document", and "`readFrame` reads
  a written frame back") and the Surface table rows for `captureFrame` and `readFrame` describe them.

**The defect, measured in Veneer.** A bottom offcanvas panel at `light-390` and `dark-390` (a fixed
panel `30vh` tall in an 844-pixel pane) was recorded at `y` 130.8 and height 253.2, and its element
frame showed the panel 392 pixels tall: `captureFrame` restaged the pane to the document's content
height before the element shot, and the panel's `vh` height resolved against that taller pane.
Veneer works around it today by bounding the document around the specimen and reading the region at
the capture's staged height. An element frame needs the pane to reach only the element's own bottom
edge, because rows below the element are outside the shot.

**Law.** `/home/user/test-tf/AGENTS.md` points at scaffold: read `/home/user/scaffold/AGENTS.md`
and every applicable file in `/home/user/scaffold/.claude/rules/` (names, typescript, architecture,
patterns, tests, browser, documentation, quality). No skill. The governing guide is
`/home/user/test-tf/guides/test.md`.

**Installed primitives.** This is the `@orkestrel/test` package itself. `@orkestrel/contract` is
installed; read `node_modules/@orkestrel/contract/dist` declarations before writing a guard or
parser. A helper whose job an installed export does is a defect.

**Host.** Linux, bash, Node 22 at `/opt/node22/bin`, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`
(Chromium; never run `playwright install`). Network goes through a proxy; install nothing.

**Measurements.** None beyond the evidence. Take the baseline runs under § Execution before editing.

**Control identifiers.** `T5-STAGE` (the element-frame staging) and `T5-SIZE` (the refusal's size).
Keep them inside this brief. Name every test for what it proves, never for these labels.

**Standing conditions.** `node_modules` is a hard-linked copy of `/home/user/test/node_modules`;
never run `npm install`, `npm ci`, or anything that writes into `node_modules`. The other checkouts
under `/home/user/` belong to other units and sessions; never touch them.

## Unknowns

- Whether the provider's element screenshot shoots rows below the pane when the element ends below
  it. Settle it with a real run before choosing the staging: an element placed below a declared
  844-pixel pane, shot with no restaging, read back with `readFrame`. Report the reading.
- Whether a fixed element's edge reads as the pane's height at scroll 0. Settle it the same way.

## Scope

- **Owned:** `src/browser/helpers.ts`, `src/browser/types.ts` (only if the contract needs a change),
  `src/browser/constants.ts` (only if a constant is needed), `tests/src/browser/helpers.test.ts`,
  `guides/test.md`.
- **Off-limits:** `package.json`, `package-lock.json`, every vendored file (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`), and every file not
  listed as owned.
- **Tools:** read, edit, write, and bash for scoped checks and scoped tests. No commit, push, stash,
  checkout, restore, reset, or clean. No tree-wide `format` or `lint --fix`; run `oxfmt --check` and
  `oxlint` on your owned files.

## Execution

Perform the assignment directly and spawn nothing.

1. Run the baseline: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project
   src:browser tests/src/browser/helpers.test.ts -t "captureFrame|readFrame"` and record the count.
2. Settle both unknowns with real runs.
3. `T5-STAGE`: for an element frame, read the element's bottom edge in document coordinates, rounded
   up, floored at the declared height, through the same growth-carrying loop and the same
   `CAPTURE_STAGINGS` refusal; keep `measureContent` for a page frame. Fold one-use logic into its
   caller; export and test anything reusable, per `AGENTS.md` § Design laws.
4. `T5-SIZE`: in the decode refusal, name the frame's width and height in device pixels read from the
   PNG header the bytes carry; when the bytes carry no PNG header, the refusal keeps its present text.
5. Insert each failing proof before its fix, and record the command with its red count, then green:
   - An element frame of a fixed, `30vh`-tall panel in a document taller than the declared pane reads
     back at the declared pane's geometry (the panel's height is 30% of the declared height, in device
     pixels). It must fail on the unfixed `captureFrame`.
   - An element that ends below the declared pane still reads back whole, with the document's own
     floor rather than the runner's canvas.
   - A page frame keeps its present behavior (the existing cases stay green).
   - A decode refusal over PNG bytes declaring a size the browser cannot decode names that size. It
     must fail on the unfixed `readFrame`.
6. Update the TSDoc of each changed function and the guide's capture paragraphs in plain sentences.
   Keep prose short; the user's instruction is implementation first.
7. Run the gates in § Acceptance criteria.

## Output

Write `tmp/units/t5-report.md` in the checkout and return the same text as your final message:

- The unknowns' readings, with commands and results.
- Each change, one line each, with the site named by symbol.
- Each proof: the red command and count, then the green command and count.
- For each proof, the mutation that makes it fail and whether its assertions distinguish that
  mutation from the passing case.
- The gate table: command, exit, result line.
- `tmp/units/t5.diff` (`git diff`) and `tmp/units/t5-status.txt` (`git status --short`).

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol in `/home/user/scaffold`. Settle these
yourself: the name and placement of any helper under the naming rules, the wording and placement of
the guide sentences, and the fixture markup. Stop and report when the change needs a file outside
the owned set, or when the element screenshot cannot shoot a region below the pane under any staging.

## Acceptance criteria

1. `npx oxfmt --config .oxfmtrc.json --check` over the owned files exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
   tests/src/browser/helpers.test.ts` exits 0.
5. `npm run test:guides` exits 0.
6. `npm run test:src:browser` exits 0; report it as an observation with its own reading if it runs
   longer than 10 minutes.
7. Each new proof ran red on the unfixed code, with the red run recorded.

## Review evidence

The Orchestrator supplies `tmp/units/t5.diff`, `tmp/units/t5-status.txt`, and this report to the
audit lanes.
