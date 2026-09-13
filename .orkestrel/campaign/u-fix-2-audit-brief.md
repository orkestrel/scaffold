# Claims brief — U-fix-2, the second fix round for scaffold 0.0.65

## Subject

`@orkestrel/scaffold` on `claude/compassionate-knuth-5e0gyu` at tip `9a250bb`, local
`0.0.65`, registry `0.0.64`. This is the **successor** to `u-fix-audit-brief.md`. That round ruled
`FAIL 1, 5, 7, 9, 12, 13` (`u-fix-audit-verdict.md`) and named the bounded set the upload waits
on: the guide's toolchain paragraph (placement, the refusal code, the remedy, bare code tokens),
the README's npm floor, the stale `resolveNpm` comment, the ROADMAP rows (counts, possessives, the
evidence citation, a successor row for the test-side findings), and one published TSDoc token.
Every carrier landed in the U-fix-2 unit at `9a250bb`, implemented by the native Opus 5
`implementer` from brief `u-fix-2-brief.md`. The writer engine is Opus 5; the objective lane on Sol
is the engine that did not write it.

Review evidence by path, relative to `/home/user/scaffold`: `tmp/evidence/u-fix-2.diff.txt` (the
diff `9e21cd7..9a250bb`, campaign records excluded), `tmp/evidence/u-fix-2.diffstat.txt`,
`tmp/evidence/u-fix-2.status.txt` (empty at dispatch), `.orkestrel/campaign/u-fix-2-report.md`
(the unit's structured return), `.orkestrel/campaign/u-fix-2-integrate-brief.md` and
`u-fix-2-integrate-report.md` (the Orchestrator's integration pair, owning the `host.json`
regeneration), `.orkestrel/campaign/evidence/linux-gate/final3.status.txt` and
`final-verify3.log.txt` (the authoritative host run after the fix), `u2-probe.log.txt` (the
provisioning case with npm `11.6.0` staged on `PATH`), and the predecessor round's verdict and
lane reports under `lanes/u-fix-audit-*.md`.

## What the round decides

Whether `@orkestrel/scaffold@0.0.65` uploads. The predecessor ruled the upload waits on the set
named in § Subject and on nothing else; everything else it found went to a ROADMAP successor row.
This round decides whether those carriers closed what they were briefed to close and introduced
nothing. It does not reopen the successor row's findings: a claim here about that row asks only
whether the row names them.

## Already established — verified by the Orchestrator on this host

- The README-pin control: `evidence/linux-gate/readme-pin-control.log.txt` — README at `22.12`
  fails `test:guides` with `expected undefined to be '22.18.0'`; restored, `23 passed`.
- The devEngines refusal: `evidence/linux-gate/npm-boundary-readings.log.txt` and
  `devengines-control.sh` — under the emitted `devEngines` record npm `10.9.7` and `11.5.0` refuse
  the install with `EBADDEVENGINES` before the arborist crash; npm `11.6.0` installs.
- The unit's own criteria, every one read after its last edit (`u-fix-2-report.md` § Criteria):
  `format:check`, `lint:check`, `check`, `test:policy` (`91 passed`), `test:guides` (`23 passed`)
  exit 0; `EBADDEVENGINES` present once in the guide and once in the README; `resolveNpm` absent
  from `tests/distribution.test.ts`; no possessivized code token in the four Markdown and source
  files it owned; no `one failing project` or `one red case` in `ROADMAP.md`; the evidence path
  cited once; the introducing sentence followed by its list.
- The unit corrected the brief on evidence: the case that went red on 2026-09-13 under `src:server`
  was `refuses redirected version readiness without starting a local daemon` in
  `tests/src/server/helpers.test.ts` (`evidence/linux-gate/scaffold-gates.log.txt:168-179`), now
  named `refuses an unready loopback endpoint rather than starting a host daemon` at line 225 of
  that file; the brief had called it the mapped-loopback case, which is a different case in
  `tests/setupServer.test.ts`. The unit wrote the true name.
- Integration: `build` regenerated `host.json`; `test:config` exit 0 after it. The authoritative
  chain `final3.status.txt`: every row exit 0, release-mode distribution `6 passed (6)` under ambient npm `10.9.7`, the literal `prepublishOnly` exit 0. The U-2 probe: with npm `11.6.0` first on `PATH`, release-mode distribution `5 passed | 1 skipped (6)`, exit 0; the one `skipIf` in that file that reads the npm version is the provisioning case at line 982.

## Numbered falsifiable claims — attack the predecessor's carriers

1. **Item A placed the paragraph correctly.** In `guides/scaffold.md` § Generated workspace the
   sentence ending "except the manifest." is followed, after one blank line, by the artifact list's
   first bullet, and the toolchain paragraph sits after that list's last bullet and before the
   declaration-rollup paragraph. No bullet's content changed.
2. **Item A's paragraph is true and actionable.** Every sentence of the relocated paragraph is true
   against `src/core/compilers.ts`, `src/core/constants.ts`, and the retained npm readings; it names
   `EBADDEVENGINES` as the refusal an npm beneath `11.6.0` reports for a generated workspace's
   `npm install`; and `npm install --global npm@11.6.0` is a command that satisfies the floor.
3. **Every code token in the edited prose is followed by a noun and none is possessivized.** The
   relocated paragraph, the recast line near `guides/scaffold.md:908`, the README § Notes sentence,
   every edited ROADMAP row, and the `WORKSPACE_DEV_ENGINES` `@remarks` block conform to
   `.claude/rules/writing.md` § Code tokens. The sweep `` grep -n "\`'s" `` over the four prose
   files and `src/core/constants.ts` is empty.
4. **Item C is true, placed, and does not capture the README pin.** The README § Notes sentence
   states the floor `11.6.0`, the `devEngines` record, the `EBADDEVENGINES` refusal on
   `npm install`, and the remedy, each true against the emitted manifest; it sits in § Notes; and it
   contains no `Node <floor> or later` phrase, so the pin in `tests/guides.test.ts` still reads line
   12 (`test:guides` `23 passed`).
5. **Item B is the only change in `tests/distribution.test.ts`.** The diff for that file is one line:
   `resolveNpm` → `provisionNpm` in the comment; nothing executable moved.
6. **Item D's `&&` row is true prose.** No count remains in it; the case it names is the one the
   retained gate log records as red on 2026-09-13, under the name the file carries at the tip;
   every other clause of the row is unchanged.
7. **Item D's citation and possessives.** The npm-range row names
   `.orkestrel/campaign/evidence/linux-gate/npm-boundary-readings.log.txt` and states that the
   campaign folder is pruned at acceptance and the readings live in git history; that file exists at
   the tip and records every version from `10.9.7` through `11.6.0`. The `SetupPanel` and
   `OllamaProvider.test.ts` rows no longer possessivize a code token, and their substance is
   unchanged.
8. **Item D's successor row carries every finding the predecessor carried.** The row names, each
   with its file: the hard-coded `EAFNOSUPPORT` (F-1 of the verdict's claim 1, with R-1); the
   `resolveTool` execute bit (F-1); the inline, unexported, unasserted shadow directory and the
   silent drop (F-2); `OLLAMA_TOOLS` with no disagreeing mechanism (Sol U1); the `host` collision
   in the `executeOllamaSetup` doc block (F-3); `host npm` in the `provisionNpm` doc block (F-4);
   the `provisionNpm`/`resolveNpm` prefix as an open design question (F-5); the guide's unasserted
   behavioural claims (F-7); the README pin's in-body imports and unanchored regex (F-8, F-9); the
   missing `engines.node`-to-`MINIMUM_NODE_VERSION` pin (F-11). Nothing in the row states a count,
   and nothing in it reopens a closed item. R-4 (a host lacking `setsid` or `timeout`) is the one
   carried finding the brief did not list; rule whether the row's shadow-directory clause covers it
   or it is dropped.
9. **Item E moved no summary line.** In `src/core/constants.ts` the `WORKSPACE_DEV_ENGINES` doc
   block's description paragraph is byte-identical to `9e21cd7`, only the `@remarks` block changed,
   and the guide's parity row at `guides/scaffold.md:168` is unchanged (`test:guides` green).
10. **`host.json` follows the vendored guide edit.** The `guides/scaffold.md` entry in `host.json`
    at the tip is the SHA-256 of the file at the tip, and the Orchestrator's integration pair
    (`u-fix-2-integrate-brief.md`, `u-fix-2-integrate-report.md`) owns that regeneration.
11. **Nothing outside the carriers moved.** The diff `9e21cd7..9a250bb`, campaign records
    excluded, touches only `guides/scaffold.md`, `tests/distribution.test.ts`, `README.md`,
    `ROADMAP.md`, `src/core/constants.ts`, and `host.json`; and `dist/src` differs from the
    predecessor tip only by item E's declaration comment.
12. **The authoritative host run is green and the provisioning case skips at the floor.**
    `final3.status.txt` reads exit 0 on every row including release-mode `test:distribution` and the
    literal `prepublishOnly`; `u2-probe.log.txt` shows the case `provisions the floor and resolves
    that copy when the ambient npm is beneath it` reported skipped with npm `11.6.0` first on
    `PATH` and every other case passed.
13. **The package is coherent to ship.** Read the tree at the tip as a consumer would: the README,
    the guide, the emitted manifest, and the refusal a developer meets on the wrong npm agree with
    each other and with the code, and the document a reader meets first now carries the npm floor.

## Unknowns

- Whether `EBADDEVENGINES` is the code npm prints on every host beneath the floor, or only on the
  Linux host measured. The retained readings are Linux only. Rule the prose claim against what the
  readings show and name the bound.
- Whether a reader of the README § Notes sentence needs the `npm --version` reading the guide gives
  and the README omits. Rule it as a finding outside the claims if you hold it is required.

## The threshold

`PASS` when every claim is CONFIRMED on evidence, or BROKEN only where the broken clause is a brief
defect and the subject is correct. Any BROKEN clause that names a shipped byte — `README.md`,
`guides/scaffold.md`, `dist/src` — holds the upload.

## Output

Per-claim verdicts numbered 1 through 13, each CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED with
the evidence path and the exact reading; findings outside the claims with file and line; attacked
and held; unknown observations; and one terminal line of the form
`VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <labels>`.
