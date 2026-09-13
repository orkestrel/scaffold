# Claims brief — U-fix-4, the whole-paragraph rewrite for scaffold 0.0.65

## Subject

`@orkestrel/scaffold` on `claude/compassionate-knuth-5e0gyu` at tip `5e72554`, local
`0.0.65`, registry `0.0.64`. This is the **successor** to `u-fix-3-audit-brief.md`. That round
ruled `FAIL 1, 3, 4, 10` with four findings (`u-fix-3-audit-verdict.md`) and called the strategy
switch: after three sentence-level rounds over one paragraph, U-fix-4 rewrote the generated-workspace
toolchain prose whole, from a closed set of sentences each with a named retained source
(`u-fix-4-brief.md` § Sentences), in the guide, the README, and the published doc block, and
corrected the ROADMAP tokens. Every carrier landed in the U-fix-4 unit at `5e72554`,
implemented by the native Opus 5 `implementer`. The writer engine is Opus 5; the objective lane on
Sol is the engine that did not write it.

Review evidence by path, relative to `/home/user/scaffold`: `tmp/evidence/u-fix-4.diff.txt` (the
diff `8de1c3a..5e72554`, campaign records excluded), `tmp/evidence/u-fix-4.diffstat.txt`,
`tmp/evidence/u-fix-4.status.txt` (empty at dispatch), `.orkestrel/campaign/u-fix-4-brief.md`
(§ Sentences is the closed set with its sources), `.orkestrel/campaign/u-fix-4-report.md` (the
unit's return, with each sentence annotated by the entry it carries), `u-fix-4-integrate-brief.md`
and `u-fix-4-integrate-report.md`, `evidence/linux-gate/final5.status.txt` and
`final-verify5.log.txt`, and the sources: `devengines-floor.log.txt`,
`npm-boundary-readings.log.txt`, `path-prepend.log.txt`, `node-index-floor.log.txt`,
`remedy-control.log.txt`, `src/core/constants.ts`, `src/core/compilers.ts`.

## What the round decides

Whether `@orkestrel/scaffold@0.0.65` uploads. The question is closed by construction: does each
shipped sentence rest on the source the set names, and does any shipped sentence sit outside the
set. A finding that a sentence could say more, or say it differently, is out of scope unless a
rule names the form; a finding that a sentence says more than its source carries holds the upload.

## Already established — verified by the Orchestrator on this host

- The sources, each retained under `evidence/linux-gate/` and each already reproduced in a prior
  verdict: `devengines-floor.log.txt` (10.5.0 and 10.8.3 ignore the record and crash; 10.9.0 and
  10.9.3 refuse with `EBADDEVENGINES`), `npm-boundary-readings.log.txt` (10.9.7 and 11.0.0 through
  11.5.0 refuse with the record and crash without it; 11.6.0 installs), `path-prepend.log.txt`
  (`npm run` under ambient 10.9.7 in a guarded workspace: `EBADDEVENGINES`, exit 1),
  `node-index-floor.log.txt` (lowest bundled npm across every Node release at or after 22.18.0 is
  10.9.0, at 23.3.0; read 2026-09-13), `remedy-control.log.txt` (ambient 10.9.7 runs
  `npm install --global npm@11.6.0`, exit 0, the installed npm reports 11.6.0).
- The README-pin control (`readme-pin-control.log.txt`) stands.
- The unit's own criteria (`u-fix-4-report.md` § Criteria): format:check, lint:check, check, test:policy (91 passed), test:guides (23 passed) exit 0; the README pin phrase once at line 12; no backticked bare version in the README or the toolchain paragraph; the npm run sentence names 10.9.7; the three ROADMAP token greps read 1, 1, and 0; every older-than or earlier-than hit names 10.5.0 and 10.8.3 or is the anchored README form; diffstat names only the four owned files.
- Integration: `build` regenerated `host.json`; `test:config` exit 0; `final5.status.txt`:
  every row exit 0, release-mode distribution `Tests  6 passed (6)` under ambient npm 10.9.7, the literal `prepublishOnly` exit 0. Code, unit report, and integration report landed in one commit.

## Numbered falsifiable claims

1. **Every sentence of the guide paragraph is carried by its source.** For each sentence of the
   toolchain paragraph in `guides/scaffold.md` § Generated workspace, the § Sentences entry the
   unit annotated it with names a retained source, and that source's reading carries the sentence
   as written — no wider range, no unmeasured release, no host the readings did not cover.
2. **No sentence of the guide paragraph sits outside the set.** Every sentence maps to an entry;
   no sentence states a fact § Sentences does not list.
3. **The README paragraph is the named subset, each sentence carried.** README § Notes states
   sentences 5, 7, 8 in its anchored form, 10, and 11 and nothing else; the `scaffold new` command
   is the opening subject; no sentence claims a failure of every release earlier than 10.9.0; no
   `Node <version> or later` phrase appears in the file beyond line 12, and `test:guides` reads
   line 12.
4. **The doc block states its subset and moved no summary.** The `WORKSPACE_DEV_ENGINES` `@remarks`
   block states sentences 3, 4, the refusal of 5 without the code, and 7 as "an npm that does not
   read the record fails inside dependency resolution instead"; the description paragraph is
   byte-identical to `8de1c3a`; the parity row at `guides/scaffold.md:168` is unchanged.
5. **The forms hold in every edited region.** In the guide paragraph, README § Notes, the doc
   block, and the ROADMAP rows item D edited: every version in running prose is a plain numeral;
   every backticked token is followed by its noun; `earlier` and `later` are the only direction
   words; no sentence-initial `It` has a competing referent; no count; no term from the
   substitution table in `.claude/rules/writing.md`.
6. **Placement is unchanged.** "except the manifest." is followed by the artifact list's first
   bullet; the paragraph sits after the list's last bullet and before the declaration-rollup
   paragraph.
7. **Item D landed exactly its token edits.** `the `@npmcli/arborist` package`, `the 0.0.65 fix
   audit`, `the `setsid` command or the `timeout` command`, `the `tests/src/server/helpers.test.ts`
   file`, `the `…devengines-floor.log.txt` file`, and `earlier than` in the proof row; no other
   line of `ROADMAP.md` changed.
8. **`host.json` follows the vendored guide edit and the landing is one commit.** The
   `guides/scaffold.md` digest at the tip is the SHA-256 of the file at the tip; `git show
   --name-only 5e72554` lists the code, `host.json`, `u-fix-4-report.md`, and
   `u-fix-4-integrate-report.md` together.
9. **Nothing outside the carriers moved.** The diff, campaign records excluded, touches only
   `guides/scaffold.md`, `README.md`, `src/core/constants.ts`, `ROADMAP.md`, and `host.json`;
   `dist/bin` is unchanged and `dist/src` differs from the `8de1c3a` build only by the reworded
   doc block, sourcemaps excluded per `.agents/orchestration.md` § What a bump obliges
   (`dist-chain-compare-3.log.txt`).
10. **The authoritative host run is green.** `final5.status.txt` reads exit 0 on every row.
11. **The package is coherent to ship.** The README, the guide, the doc block, the emitted record,
    and the refusal a developer meets agree with each other and with every retained reading, and no
    shipped sentence exceeds its source.

## Unknowns

- None the set leaves open: the Linux bound is sentence 11; the bundled-npm fact is sourced to the
  release index; the older-npm failure is claimed of the two measured releases. Rule any remaining
  overclaim as a finding against the sentence that carries it.

## The threshold

`PASS` when every claim is CONFIRMED on evidence, or BROKEN only where the broken clause is a brief
defect and the subject is correct. Any BROKEN clause that names a shipped byte — `README.md`,
`guides/scaffold.md`, `dist/src` — holds the upload.

## Output

Per-claim verdicts numbered 1 through 11, each CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED with
the evidence path and the exact reading — for claim 1 a per-sentence row; findings outside the
claims with file and line; attacked and held; unknown observations; and one terminal line of the
form `VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <labels>`.
