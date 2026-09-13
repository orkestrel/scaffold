# Claims brief — U-fix-3, the third fix round for scaffold 0.0.65

## Subject

`@orkestrel/scaffold` on `claude/compassionate-knuth-5e0gyu` at tip `5e29646`, local
`0.0.65`, registry `0.0.64`. This is the **successor** to `u-fix-2-audit-brief.md`. That round
ruled `FAIL 2, 3, 4, 8, 13` (`u-fix-2-audit-verdict.md`): the guide, the README, and the published
doc block claimed that every npm beneath the floor refuses a generated workspace's install with
`EBADDEVENGINES`, and the host readings show npm 10.5.0 and 10.8.3 ignore the record and crash
while 10.9.0 is the first release that reads it; version tokens and two ROADMAP tokens broke the
letter of the code-token rule; the ROADMAP successor row did not carry R-4. Every carrier landed
in the U-fix-3 unit at `5e29646`, implemented by the native Opus 5 `implementer` from brief
`u-fix-3-brief.md`. The writer engine is Opus 5; the objective lane on Sol is the engine that did
not write it.

Review evidence by path, relative to `/home/user/scaffold`: `tmp/evidence/u-fix-3.diff.txt` (the
diff `981aa66..5e29646`, campaign records excluded), `tmp/evidence/u-fix-3.diffstat.txt`,
`tmp/evidence/u-fix-3.status.txt` (empty at dispatch), `.orkestrel/campaign/u-fix-3-report.md`
(the unit's structured return), `u-fix-3-integrate-brief.md` and `u-fix-3-integrate-report.md`
(the Orchestrator's integration pair, in the same commit as the code),
`evidence/linux-gate/final4.status.txt` and `final-verify4.log.txt` (the authoritative host run
after the fix), `evidence/linux-gate/devengines-floor.log.txt` and `npm-boundary-readings.log.txt`
(the npm readings every bounded sentence rests on), and the predecessor round's verdict and lane
reports under `lanes/u-fix-2-audit-*.md`.

## What the round decides

Whether `@orkestrel/scaffold@0.0.65` uploads. The predecessor ruled the upload waits on the bounded
prose and nothing else. This round decides whether the carriers state only what the readings show,
in the forms the rules fix, and introduced nothing. It does not reopen the test-side successor row
beyond asking whether R-4 is now in it, and it does not reopen the rest of `ROADMAP.md`, which the
brief excluded as unpublished and predating the campaign.

## Already established — verified by the Orchestrator on this host

- `evidence/linux-gate/devengines-floor.log.txt`, 2026-09-13, Linux, Node 22.22.2: against the
  emitted guard manifest npm 10.5.0 and 10.8.3 exit 1 with the arborist `edgesOut` crash and no
  `EBADDEVENGINES`; npm 10.9.0 and 10.9.3 exit 1 with `EBADDEVENGINES` and no crash; against the
  plain manifest all four crash.
- `npm-boundary-readings.log.txt`: npm 10.9.7 and 11.0.0 through 11.5.0 crash without the record
  and refuse with it; 11.6.0 installs.
- `https://nodejs.org/dist/index.json`, read 2026-09-13: Node 22.12.0 bundles npm 10.9.0, 22.18.0
  bundles 10.9.3, 22.22.2 bundles 10.9.7, 24.0.0 bundles 11.3.0, 24.4.0 bundles 11.4.2.
- The README-pin control (`readme-pin-control.log.txt`) and the dist comparison across the
  previous chain (`dist-chain-compare.log.txt`) stand from the predecessor.
- The unit's own criteria (`u-fix-3-report.md` § Criteria): format:check, lint:check, check, test:policy (91 passed), test:guides (23 passed) exit 0; EBADDEVENGINES once in the README and once in the guide; 10.9.0 named in all three shipped files; no backticked bare version in the README or in the toolchain paragraph; the R-4 clause once and the devengines-floor citation twice in ROADMAP.md; diffstat names only the four owned files.
- Integration: `build` regenerated `host.json`; `test:config` exit 0; `final4.status.txt`:
  every row exit 0, release-mode distribution `Tests  6 passed (6)` under ambient npm 10.9.7, the literal `prepublishOnly` exit 0. Code, unit report, and integration report landed in one commit.

## Numbered falsifiable claims — attack the predecessor's carriers

1. **Item A states only measured facts.** Every sentence of the guide's toolchain paragraph is true
   against `src/core/compilers.ts`, `src/core/constants.ts`, `devengines-floor.log.txt`,
   `npm-boundary-readings.log.txt`, and the Node release index: the refusal is claimed only of an
   npm that reads the record, 10.9.0 is named as the release the record is read from, an older
   npm's failure inside dependency resolution is named, and the bundled-npm fact is stated as
   measured. No sentence claims every host or every npm.
2. **Item A keeps its placement and its remedies.** The paragraph still sits after the artifact
   list's last bullet and before the declaration-rollup paragraph; the sentence ending "except the
   manifest." is still followed by the list's first bullet; the `npm --version` reading and the
   `npm install --global npm@11.6.0` command are still given.
3. **Version numbers are prose numerals and every backticked token is followed by a noun.** In the
   guide's toolchain paragraph, in README § Notes, in the ROADMAP rows item C edited, and in the
   `WORKSPACE_DEV_ENGINES` doc block, no bare version sits in backticks; each remaining backticked
   token is a declared value or field followed by its noun (`>=22.18.0` range, `>=11.6.0` range,
   `error` value, `EBADDEVENGINES` code, `engines.node` field, `devEngines.packageManager` record,
   `SetupPanel` component, `OllamaProvider.test.ts` file); and the possessive sweep is empty.
4. **Item B is true, in the README's voice, and does not capture the pin.** The § Notes paragraph
   makes the `scaffold new` command the subject, states the floor, the bounded refusal, the older
   npm's failure, and the remedy in short sentences, contains no `Node <version> or later` phrase,
   and `test:guides` still reads line 12 (`readme-pin-control.log.txt` stands).
5. **Item C landed exactly its four edits.** `SetupPanel` and `OllamaProvider.test.ts` carry their
   nouns; the successor row's silent-drop clause now carries R-4's `setsid`/`timeout` question; the
   crash row names npm 10.5.0, 10.8.3, 10.9.0, and 10.9.3 with the `devengines-floor.log.txt`
   citation; the proof row states that npm reads the record from 10.9.0 on, that 10.5.0 and 10.8.3
   ignore it and meet the crash, and that every npm a supported Node bundles reads it, with the
   citation and the date. No other line of `ROADMAP.md` changed.
6. **Item D bounded the published doc block without moving its summary.** The
   `WORKSPACE_DEV_ENGINES` description paragraph is byte-identical to `981aa66`; the `@remarks`
   block claims the refusal only of an npm that reads the record and names 10.9.0; the guide parity
   row at `guides/scaffold.md:168` is unchanged and `test:guides` is green.
7. **`host.json` follows the vendored guide edit.** Its `guides/scaffold.md` digest at the tip is
   the SHA-256 of the file at the tip, and the integration pair owning the regeneration is in the
   same commit as the code.
8. **Nothing outside the carriers moved.** The diff `981aa66..5e29646`, campaign records
   excluded, touches only `guides/scaffold.md`, `README.md`, `ROADMAP.md`, `src/core/constants.ts`,
   and `host.json`; `dist/bin` is unchanged and `dist/src` differs from the predecessor build only by
   the reworded doc block, per the material-content definition in `.agents/orchestration.md`
   § What a bump obliges (sourcemaps excluded).
9. **The authoritative host run is green.** `final4.status.txt` reads exit 0 on every row including
   release-mode `test:distribution` and the literal `prepublishOnly`.
10. **The package is coherent to ship.** The README, the guide, the published doc block, the emitted
    manifest, and the refusal a developer meets agree with each other and with every retained
    reading; no shipped sentence claims more than the readings carry; and the developer on a
    supported Node with its bundled npm meets exactly the refusal the documents describe.

## Unknowns

- Whether `EBADDEVENGINES` is the code on Windows and macOS. The readings are Linux only; the prose
  is required to name that bound or to claim nothing host-wide. Rule the prose against the readings.

## The threshold

`PASS` when every claim is CONFIRMED on evidence, or BROKEN only where the broken clause is a brief
defect and the subject is correct. Any BROKEN clause that names a shipped byte — `README.md`,
`guides/scaffold.md`, `dist/src` — holds the upload.

## Output

Per-claim verdicts numbered 1 through 10, each CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED with
the evidence path and the exact reading; findings outside the claims with file and line; attacked
and held; unknown observations; and one terminal line of the form
`VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <labels>`.
