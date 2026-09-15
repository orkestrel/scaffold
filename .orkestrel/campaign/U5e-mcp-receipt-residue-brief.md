# Unit U5e — what audit round A5b found in the composition receipts (`@orkestrel/mcp`)

Successor of `U5d-mcp-distribution-brief.md`. U5c and U5d are on the tree uncommitted; this unit
carries the A5b findings the Orchestrator adopted (`A5b-audit-verdict.md`). Nothing U5c or U5d
landed is undone: every carrier of those briefs stands, and this unit touches only what the round
found. The round ran the three contract lanes plus one lens per seam, so the findings are many and
each is small; take them in order.

## Role and engine

`implementer` on Claude Opus 5 (native; Read, Grep, Glob, Edit, Write, Bash). Perform the
assignment directly and spawn nothing. You are the only writer in this checkout.

## Objective

Close every required finding of A5b: the formatter residue the gate cannot see, the header that
describes a file it no longer matches, a field name whose literal reading is the opposite of what
it reports, the teardown that leaks a scratch tree on a failure path, the dead field, the counts,
and the duplication the consolidation left behind. Then make the relay's authorization able to
redden, and check the flat-install assumption the derivation rests on.

## Context

- Read first, in the mcp checkout: `AGENTS.md` (§ Design laws, § TTTDD, § Writing) and the rule
  files it names, which this package reads from
  `node_modules/@orkestrel/scaffold/dist/host/claude/rules/` — `tests.md`, `architecture.md`,
  `writing.md`, `typescript.md`. Skill: none.
- Checkout: `C:/Users/mikes/WebstormProjects/mcp`, `main`, HEAD `8d97dd0`. The working tree carries
  U5c and U5d uncommitted: `tests/distribution.test.ts` (M), `guides/mcp.md` (M), and the new
  `tests/fixtures/distributionPage.mjs`, `distributionServer.mjs`, `distributionScript.mjs`.
  `tmp/` holds unit logs and bench journals; leave it. `git status` names nothing else.
- This repository formats with `oxfmt`, never `prettier`. Use `npx oxfmt --write <file>` or
  `npm run format`; never run `prettier`. `oxfmt` preserves an author's line break inside an object
  literal, so `format:check` cannot see an unforced expansion — which is why carrier 1 exists and
  why the gate did not catch it.
- The policy project carries ONE standing red (`surface population incomplete …
  src/core/helpers.ts:837: TSDeclareFunction`). It is the published scaffold 0.0.68 vendored reader
  refusing an exported function overload, closed by the scaffold 0.0.69 re-pin that follows this
  unit. It is not yours, and it short-circuits `npm test` before the later projects run, so run the
  projects you need directly rather than through `npm test`.
- Host facts: Windows; `npm.cmd`; Chromium through the declared `playwright`;
  `npm run test:distribution -- --mode release` is the receipt gate (18 passed and 4 skipped,
  about 22 s). It installs from the registry, so it needs the network.

## Unknowns

- Whether the consumer's installed tree is in fact flat, which carrier 9 asks you to assert rather
  than assume. If a nested `node_modules` exists under the consumer's top level today, stop and
  report what nests what, because the receipt would then describe a resolution the consumer's own
  Node never performs.

## Scope

- Owned: `tests/distribution.test.ts`, `tests/fixtures/distributionPage.mjs`,
  `tests/fixtures/distributionServer.mjs`, `tests/fixtures/distributionScript.mjs`,
  `guides/mcp.md` `## Tests` only.
- Off-limits: `src/**`, `package.json`, `package-lock.json`, `vite.config.ts`, `.oxfmtrc.json`,
  `.oxlintrc.json`, every other guide section, `tmp/**`. No npm package added anywhere.
- Tools: Read, Grep, Glob, Edit, Write, Bash for the named commands. No install into this
  checkout, no commit, and none of `git stash`, `git checkout`, `git restore`, `git reset`,
  `git clean`. To compare against the last commit use `git diff` and `git show HEAD:<path>`, which
  only read.

## Carriers

1. **The formatter residue.** Restore each of these to the single-line form
   `git show HEAD:tests/distribution.test.ts` carries, content identical:
   - `runNode`'s call: `return spawnSync(process.execPath, [...args], { cwd, encoding: 'utf8', windowsHide: true })`
   - the bundle drive's navigation: `await page.goto(\`http://127.0.0.1:${String(address.port)}/\`, { waitUntil: 'load' })`
   - the module surface check: `checkSurface(stage, { entry, extension: 'ts', published, driver }),`
   - the CommonJS surface check: `checkSurface(stage, { entry, extension: 'cts', published, driver }),`

   Leave the `buildStage` return expanded: the added `packed` field pushes that line past the
   formatter's width, so its expansion is forced rather than residue. Then sweep the whole file for
   any other hunk whose removed and added lines are the same text differently wrapped, and restore
   each the same way. Report the sweep's method, the paths it covered, and what it found.
2. **The teardown.** The `afterAll` that closes the composition stage and removes the scratch tree
   awaits `closeReceipts()` first, and `closeReceipts` awaits the stage promise unguarded, so a
   stage that rejected — the `modules.outside` guard, `readClosure`, the fixture copy, the child's
   creation, or `readOrigin` — leaves the scratch tree holding the npm cache, the packed archive,
   and both installed consumers in the temporary directory. The delta introduced this: the hook was
   an unconditional synchronous removal before, and the module-load path still keeps that
   discipline. Make the removal unconditional while keeping the authored order, so the tree goes
   whether or not the stage opened or closed cleanly, and say in the comment what the ordering
   guarantees and what the removal guarantees.
3. **The backwards field.** The in-page pair receipt reports `stopped: pair.client.connected`, so
   the pinned reading is `stopped: false` for a client stopped a line earlier. The literal reading
   is the opposite of what it proves, and the next reader repairs it by flipping the expected
   value. Rename the field to `connected` on the fixture and in the assertion, leaving the value
   and what it proves unchanged.
4. **The header.** Two of its sentences are false of the file as it stands. The opening paragraph
   says every following claim is read off the one installed tree and enumerates what is read; the
   composition receipts build their own consumer and read a document's text, a conversation's
   roles, a JSON-RPC code, an abort reason, and the fixture's own accounting. The later sentence
   says the composition receipts name this package and its exports, and in this file they name
   neither — the naming happens in the page fixture, which imports this package by its published
   specifier. Rewrite the header so the first paragraph's enumeration is scoped to the surface
   drives, and so the composition sentence says what those receipts actually name: the packages
   they pin, and the page fixture that imports this package by its published specifier.
5. **The counts.** `AGENTS.md` § Writing bans a number answering "how many" about a set anyone can
   add to; the remedy is to name the members or to drop the number. Delete these, keeping each
   sentence's named subjects: the fixture-copy comment's "rather than two that can drift"; the
   teardown comment's "Two hooks would leave the order to the runner"; and the recorder comment's
   "read with two independent recorders armed", whose own sentence already names the browser's
   request log and the transport counter. Then sweep every line this campaign added across the
   owned files for the same shape and report the pattern, the paths covered, and the result,
   including a clean one. Leave a number that is a value rather than a count: a tool's
   `title: 'Add two numbers'` and the arity it describes, and a `both` whose own sentence names its
   members.
6. **The dead field.** `Modules.files` is declared, populated, and documented as part of the page's
   own module resolution, and nothing reads it. Make it evidence: in the closure receipt assert
   that every entry of `receipts.modules.files` is a path inside an installed `@orkestrel/` package
   under the consumer's `node_modules`, and that the served target of every entry in
   `receipts.modules.imports` appears among them. If that cannot be written truthfully against what
   the walk collects, drop the field from the interface and keep the reached set internal to the
   walk; say which you did and why.
7. **The duplication the consolidation left.** The shared script file holds the provider and the
   turn builder, and two duplications survive it. First, the page's own `runPage` and `runRelay`
   are the same statements apart from the provider each supplies and the credential the relay one
   sets, and the test pins their results with identical expected objects. Extract the shared body
   so each supplies only what differs. Second, the scripted turns are authored twice across two
   fixtures: the Node fixture writes the tool name, the note, and the answer as bare literals,
   while the page fixture writes the same turns over its own constants, and nothing keeps them in
   step. Move the tool name, the note, and the answer text into the shared script file as exported
   constants both sides import. Fold in the turn literal the bridge receipt restates by hand: give
   the shared file a leaf that builds one turn, and have the script builder and the bridge receipt
   both compose it.
8. **The authorization that cannot redden.** The Node fixture wires an `authorize` callback on the
   relay route and no receipt drives a refused credential, so a relay that stopped enforcing it
   would leave every assertion green. Add one receipt beside the relay receipt that dials the relay
   path with a wrong authorization header and asserts the refusal the relay returns, taking the
   status from what the installed relay actually answers rather than from an assumption. Name it
   for what it proves. Add its bullet to the guide's `## Tests` list in the same form as its
   neighbours.
9. **The flat-install assumption.** The derivation resolves every bare specifier against the
   consumer's top-level `node_modules` whatever module named it. Where two installed packages
   require different releases of a shared dependency, npm nests the second copy, an import map
   cannot express the duplicate, and the receipt would describe a resolution the consumer's own
   Node never performs. Assert the assumption instead of resting on it: in the closure receipt, or
   beside it, assert that no `node_modules` directory exists beneath the consumer's top-level
   `node_modules`. If one exists today, stop and report it per the Unknowns section.
10. **The route table.** The Node fixture writes most of its route handlers as function expressions
    inside the `dispatcher.add` argument while referencing one by name, and the sibling fixture in
    the same directory references every handler by name. Declare each handler as a module-scope
    function beside the ones already there and reference each by name, so the served surface reads
    as a table and each handler carries a name a failure can print.
11. **The prose.** Correct each of these, changing no assertion:
    - the closure assertion's comment says every specifier the page's graph names is served from
      the consumer's `node_modules` through the import map; the page's own modules are served from
      the page directory and relative specifiers inside packages never enter the map. Restate it as
      the bare specifiers the walk reached, which is what the assertion pins.
    - the guide's receipt bullet "each root entry the installed agent's own module names publishes
      its exports in the page" garden-paths on `names` then `publishes`, and the assertion beneath
      it rejects only an entry with no names or an undefined first binding. Replace it with: "the
      page evaluates each root entry the installed agent's own module names, and every one of them
      publishes a defined export."
    - the guide's recorder sentence writes a comma before `and` in a two-item list; the repository
      adopts the serial comma for three or more items and the test's parallel sentence writes the
      pair without it. Drop the comma.
    - the cancellation receipt explains its generic reason as the browser's own abort wording. The
      wording is generic because this package does not forward the cancellation notification's
      `reason` into the per-request abort, which is a recorded carry-forward against `src/**` and
      off-limits to you. Rewrite the comment to name that limit as the reason the receipt pins the
      error's class rather than its sentence.

## Execution

Perform the assignment directly; spawn nothing. Take the release-mode distribution run before
editing (this unit's baseline), after carrier 7, and at the end.

## Acceptance criteria (cheap first)

1. `npm run format:check` exit 0; `npm run lint:check` exit 0.
2. `npm run check` exit 0.
3. `git diff HEAD -- tests/distribution.test.ts` contains no hunk whose only change is a line
   break, apart from the `buildStage` return that carrier 1 names as forced.
4. `npm run test:distribution -- --mode release` exit 0, with every receipt including the new
   refusal receipt green and the pre-existing cases unchanged; record the duration and the counts
   the runner prints.
5. `npm run test:guides` exit 0.
6. `git status --short` names only the five owned paths.
7. No `any`, assertion, nested function, or default export in the hunks; no count of a growable
   set, no `above` or `below`, in prose you add or leave.

## Output

Return, as your final message, a report with these sections and nothing else: **Carriers** (what
changed per carrier, `file:line`, in the brief's order); **The residue sweep** and **The count
sweep** (each with its method, the paths covered, and what it found, including a clean result);
**The dead field** (which form you took and why, with the assertion's text if you wrote one); **The
flat-install reading** (what the assertion checks and what the tree holds today); **The refusal
receipt** (its title, what the relay answered, and what it pins); **Distribution runs** (the three
release-mode readings with durations); **Acceptance readings** (each criterion with its exit code
or reading); **Deviation state**. The Orchestrator captures it to
`tmp/units/U5e-mcp-receipt-residue-report.md`.

## Deviation contract

Stop and report (expected, found, exact evidence, done or not done, one hypothesis at most) when a
carrier cannot be done as written, when carrier 6's assertion cannot be written truthfully and
dropping the field would lose a reading the report claims, when carrier 9 finds a nested install,
or when a criterion outside your owned files reddens. Decide and record an ancillary matter
yourself: a helper's name, where a comment sits, the exact wording of a sentence this brief does
not quote, and the refusal receipt's own shape.
