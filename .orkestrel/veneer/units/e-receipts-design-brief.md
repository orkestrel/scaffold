# E-RECEIPTS design round — brief

One brief for both lanes of the design round, run blind to each other: the subjective lane on `planner` (Opus 5.5) and
the objective lane on `analyst` (GPT-6 Astra). Each lane performs the assignment directly, spawns nothing, edits
nothing, and returns a proposal. The Orchestrator reconciles.

## Law

Read, in order: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{documentation,writing,quality,tests,portability,workspace}.md`;
Veneer's `ROADMAP.md` in `/home/user/veneer-read` (§ Tenets, the exit criteria, and the rows the terrain cites). No skill
applies.

## Question

Veneer's exit criterion 11 reads "Receipts: each recorded receipt names its browser build; the promised hosts are
recorded." Its carrier is E-RECEIPTS, which also owns two ROADMAP rows: the `Chrome receipt` row ("E-RECEIPTS records
the promised hosts (F4 HOST-OBSERVATIONS pinned them, `af673cb`); the install is the user's") and `Audit claim 14`
("Retired as mis-stated; E-RECEIPTS runs the distribution proof in release mode"). Propose the design that closes the
criterion and both rows, and the units that implement it.

Rule on each of these, with the reason from the law or the terrain:

1. **The promised hosts.** Which hosts Veneer promises, and where that list lives once, so no second copy can drift.
   The terrain finds host facts in `package.json` (`engines.node`, `devEngines`), the README's browser table, the
   guide's Tailwind sentence, and the ROADMAP's platform tenet and standing-condition rows.
2. **The receipt's shape and home.** What a receipt records (at least the browser build as its exact version string,
   the operating system, the Node and npm versions, the date, and the commands and their result), where it lives, and
   whether a mechanism writes or checks it rather than prose alone. `AGENTS.md` and the orchestration contract prefer a
   mechanism that recomputes a fact over a document that records it.
3. **The build in every receipt.** The guide's sentences that name "Chromium 141", "Chromium 153", or "the managed
   Chromium and Edge receipts" without an exact build, and the ROADMAP rows the terrain lists. Rule on whether each
   names the exact build, points at the one receipt record, or both.
4. **The hosts this machine cannot reach.** This host is Linux with Chromium `141.0.7390.37` at Playwright revision
   `1194`, Node `22.22.2`, and npm `11.19.1` through a pinned local install (the system npm is `10.9.7`); it has no
   Chrome, no Edge, and browser downloads are disabled. The engine session runs on the user's Windows host with
   Chromium `153.0.8010.12`. Rule on who takes the Chrome and Edge receipts, and what the record says until they exist.
5. **The release-mode distribution proof.** `npm run test:distribution -- --mode release` requires a reachable
   registry and a browser, and `describeBrowser` names no version. Rule on whether it runs here, what its receipt
   records, and whether the proof must name the build it ran on.

## Evidence

The terrain distillate, `/home/user/scaffold/.orkestrel/veneer/units/e-receipts-terrain-result.md` (Cursor Grok, with
`file:line` citations against `/home/user/veneer-read`, a read-only checkout of Veneer `main` at `4cd56a8`). Verify any
citation you rely on in `/home/user/veneer-read` itself. The files that matter most: `README.md` (the browser table),
`package.json`, `guides/veneer.md`, `ROADMAP.md`, `tests/distribution.test.ts`, `tests/setupServer.ts`
(`recordButtonOracle`, `scanOracleFixture`), `tests/fixtures/oracle/button.json`, and `configs/browsers.ts`.

## Constraints

- Mechanism, not product policy: the package records what it ran on; it does not choose a user's browser.
- No new npm package. No count in any sentence you propose. A receipt is a measurement with the run that produced it.
- Units: name each unit's owned files, its engine per `.agents/orchestration.md` § Engines (objective work to `sol` on
  Astra, subjective to `opus` on Opus 5.5; a unit that drives a browser runs natively, because a bench sandbox cannot),
  its acceptance criteria, and its dependencies. The styles session owns `guides/veneer.md` style rows and the README;
  the engine session owns `src/browser/**` and `tests/src/browser/**`. Name any file the other session owns.

## Output

A proposal: a ruling per question with its reason; the receipt's shape as a type or a table; the units; the risks; and
anything in the terrain you found false, with the command and output that shows it. State no count.
