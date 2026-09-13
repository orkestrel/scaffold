# Claims brief — U-fix-5, the prescribed landing for scaffold 0.0.65

## Subject

`@orkestrel/scaffold` on `claude/compassionate-knuth-5e0gyu` at tip `e158702`, local
`0.0.65`, registry `0.0.64`. This is the **successor** to `u-fix-4-audit-brief.md`. That round ran
three lanes and ruled `FAIL 1, 3, 4, 5, 11` (`u-fix-4-audit-verdict.md`); its range findings were
settled by measuring every npm release the registry serves inside the refusal interval
(`evidence/linux-gate/devengines-interval.log.txt`), and what survived was wording, every
replacement of which the verdict prescribed. U-fix-5 landed those replacements as a `builder` unit
on Sonnet from brief `u-fix-5-brief.md`, at `e158702`. Neither audit engine wrote it.

Review evidence by path, relative to `/home/user/scaffold`: `tmp/evidence/u-fix-5.diff.txt` (the
diff `0834f2a..e158702`, campaign records excluded), `tmp/evidence/u-fix-5.diffstat.txt`,
`tmp/evidence/u-fix-5.status.txt` (empty at dispatch), `.orkestrel/campaign/u-fix-5-brief.md` (the
prescribed replacements), `.orkestrel/campaign/u-fix-5-report.md`, `u-fix-5-integrate-brief.md`
and `u-fix-5-integrate-report.md`, `evidence/linux-gate/final6.status.txt` and
`final-verify6.log.txt`, `dist-chain-compare-4.log.txt`, the amended sentence set in
`u-fix-4-audit-verdict.md` § Amended sentence set, and the sources under `evidence/linux-gate/`:
`devengines-floor.log.txt`, `devengines-interval.log.txt`, `npm-boundary-readings.log.txt`,
`path-prepend.log.txt`, `node-index-floor.log.txt`, `remedy-control.log.txt`.

## What the round decides

Whether `@orkestrel/scaffold@0.0.65` uploads. Every replacement was prescribed by the previous
round; this round decides whether each landed exactly, whether the amended sentence set is now
carried at every sentence, and whether the landing introduced nothing. A finding that a sentence
could say more, or say it differently, is out of scope unless a rule names the form.

## Already established — verified by the Orchestrator on this host

- The sources, each already reproduced in a prior verdict, plus `devengines-interval.log.txt`:
  every release from 10.9.1 through 11.5.2 refuses under the emitted record (`refused=yes
  crash=no`), and 11.5.1 and 11.5.2 crash without it.
- The unit's own criteria (`u-fix-5-report.md`): format:check, lint:check, check, test:policy (91 passed), test:guides (23 passed) exit 0; the three guide sentences and the README sentence present and the dropped phrases absent; the doc-block universal absent and the description paragraph present; the README pin phrase once; the ROADMAP direction sweep clean inside the named rows; the matchesEngines row once; the successor return names the src:server project and the scripts/ollama.sh script; diffstat names only the four owned files.
- Integration: `build` regenerated `host.json`; `test:config` exit 0; `final6.status.txt`:
  every row exit 0, release-mode distribution `Tests  6 passed (6)` under ambient npm 10.9.7, the literal `prepublishOnly` exit 0. Code, unit report, and integration report in one commit.

## Numbered falsifiable claims

1. **Item A landed exactly.** The guide paragraph's three replacements read exactly as
   `u-fix-5-brief.md` item A prescribes, across their wraps; no other sentence of the paragraph
   changed.
2. **Every sentence of the guide paragraph is carried by its amended source.** One row per
   sentence: the bounded consequence rests on `node-index-floor.log.txt`; the interval and boundary
   sentences on `devengines-floor.log.txt`, `devengines-interval.log.txt`, and
   `npm-boundary-readings.log.txt`; the remedy on `remedy-control.log.txt` with no untested
   alternative; every other sentence as the previous round confirmed. No sentence claims wider than
   its source, and no sentence sits outside the set.
3. **Item B landed exactly and the pin holds.** README § Notes drops "or a later release" and
   changes nothing else; no `Node <version> or later` phrase beyond line 12; `test:guides` green.
4. **Item D landed exactly.** The doc block no longer carries the release-free universal; every
   other line of the block, the description paragraph, and the parity row at
   `guides/scaffold.md:168` are byte-identical to `0834f2a`.
5. **Item C landed the token rule across the named rows.** In the ROADMAP rows the brief names,
   every backticked token is followed by its noun, `earlier` and `later` are the only direction
   words, "from 10.9.0 on" and "beneath the floor" are gone, the `matchesEngines` row is present,
   and no line outside those rows changed.
6. **`host.json` follows the vendored guide edit and the landing is one commit.**
7. **Nothing outside the carriers moved.** The diff touches only `guides/scaffold.md`,
   `README.md`, `ROADMAP.md`, `src/core/constants.ts`, and `host.json`; `dist/bin` is unchanged and
   `dist/src` differs from the `0834f2a` build only by the shortened doc block
   (`dist-chain-compare-4.log.txt`, sourcemaps excluded per the contract).
8. **The authoritative host run is green.** `final6.status.txt` reads exit 0 on every row.
9. **The package is coherent to ship.** The README, the guide, the doc block, the emitted record,
   and the refusal a developer meets agree with each other and with every retained reading, and no
   shipped sentence exceeds its source.

## The threshold

`PASS` when every claim is CONFIRMED on evidence, or BROKEN only where the broken clause is a brief
defect and the subject is correct. Any BROKEN clause that names a shipped byte — `README.md`,
`guides/scaffold.md`, `dist/src` — holds the upload.

## Output

Per-claim verdicts numbered 1 through 9, each CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED with
the evidence path and the exact reading — for claim 2 a per-sentence row; findings outside the
claims with file and line; attacked and held; unknown observations; and one terminal line of the
form `VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <labels>`.
