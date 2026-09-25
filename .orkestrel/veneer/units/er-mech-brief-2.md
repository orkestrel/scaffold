# Unit ER-MECH round 2 — the audit's findings and the packed link case

Successor to `er-mech-brief.md`. What changed: the audit (`erm-audit-verdict.md`) confirmed the gates, the reader
proofs, the live runtime, and the scope, and carried claims 1, 5, 6, and 7, the packed link expectation, and the
subjective lane's F1, F2, R1 to R5. The release-mode reach is not this unit's: the RELEASE-MODE design
(`/home/user/scaffold/.orkestrel/veneer/release-mode-design-verdict.md`) fixes it in scaffold and brings it to Veneer
through a packed scaffold and `repair`. `vite.config.ts` and `tests/config.test.ts` stay off-limits.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in `/home/user/veneer-erm`, which holds round 1
uncommitted over `873f715`. Read `/home/user/scaffold/AGENTS.md`, the rule files round 1 read, both audit verdicts and
the lane verdicts beside them, and round 1's report `/home/user/scaffold/.orkestrel/veneer/units/er-mech-report.md`. The
harness environment block may name another worktree as the primary working directory; start every shell command with
`cd /home/user/veneer-erm &&` and give every file tool an absolute path under it. No skill applies.

## Items

1. **Readers refuse malformed cells (claim 1; both lanes).** `readReceipts` refuses command spans not separated by a
   comma. `readSupportedHosts` refuses a Platform cell that is neither `—` nor a value `process.platform` can take, with
   `Supported host row N: invalid Platform X`. Do not validate Channel against a fixed list. Each refusal gets a
   scratch-guide case and a planted control.
2. **Floors (claim 3; subjective R1).** Planted controls for an npm version under its floor and for a `package.json`
   floor not in the `>=x.y.z` form, each failing its gate with an assertion.
3. **Live runtime (claim 4; subjective).** The live case's comment states that the build comparison shares Playwright's
   `Browser.getVersion` read and that the user-agent major is the independent check. Retitle it so it names what it
   reads and what it compares against (claim 7).
4. **Release-host case (claim 5; both lanes; subjective R2).** Its message names every host value a receipt row needs
   (channel, build, platform, kernel, Node, npm) and says the date, revision, and commands come from the run that writes
   the row. Add a control where a matching passing receipt makes the case pass, so a matcher that always reads `false`
   is distinguished. Add a case that drives `readRuntime`'s invalid-build refusal (subjective R3).
5. **Titles (claim 7; subjective).** Split `BUILD_PATTERN`'s four-part assertions out of the refusal case into a case
   titled for the pattern; retitle the floor case to name its range-form refusal.
6. **The guide (claim 6; both lanes; F1; F2; R4; R5).** In `## Hosts`: a non-release run skips only when no receipt
   matches; the message names every host value; a receipt is what a sentence naming a build must rest on, stated as the
   requirement ER-PROSE's gate will enforce, not as a present fact; "the platform the maintainer chooses". Measure
   whether `npm run` refuses a script when `engines.node` is not met (a scratch package under the scratchpad with
   `engines.node` set to `>=99`), retain the reading, and word the sentence to it. Read `configs/browsers.ts` and make
   the resolver sentence name every channel it can pick. In § Tests, the release binding takes § Hosts's conditioned
   form. In `tests/setupServer.ts`, the temporal `once` becomes `after`.
7. **The packed link case (objective, outside the claims).** In `tests/distribution.test.ts`, the packed-CSS page case
   compares the link against an independently resolved swatch of `--vn-color-primary-emphasis` written with the same
   color expression the shipped rule uses, and keeps its danger comparison. Run `npm run build` and then
   `npm run test:distribution` (ordinary mode, which reaches the registry here) red before and green after, logging each.

## Context

- **Host.** Linux, bash; put `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin`
  first on `PATH`, set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, and run every suite through its npm script. The npm
  registry answers from this host (`npm ping` returned `PONG` through the pinned npm). Format only with
  `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`. Other worktrees run suites at the same time; a timing
  failure under load is an observation with its reading.
- **Scope.** Owned: round 1's files (`tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/guides.test.ts`,
  `tests/distribution.test.ts`, and `guides/veneer.md` § Hosts and its § Tests links). Off-limits: `src/**`, `app/**`,
  `configs/**`, `vite.config.ts`, `tests/src/**`, `tests/app/**`, the vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`), and `package.json`. No git command that writes, no install, no
  `npm run format`; `npm run build` is allowed.

## Execution

Perform the assignment directly and spawn nothing. Do the items in order, each planted control run and retained with
its restore check, a kill counting only when the failing message names an assertion failure or the reader's own
refusal. Then run `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:setup`,
`npm run test:guides`, `npm run test:policy`, `npm run test:conformance`, and `npm run test:distribution`, each logged to
`tmp/units/erm-2-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/erm-report-2.md` and return the same text: per item, the change and its evidence; the planted-control
table; the `engines.node` reading; the link case red and green with logs; the gate table; `tmp/units/erm-2.diff`
(`git diff 873f715`) and `tmp/units/erm-2-status.txt`. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This round settles the error messages, the case
names, the guide wording, and the swatch's markup. Stop and report if the link case needs a change to shipped CSS, or
if an item needs a file outside the owned set.

## Acceptance criteria

Every item's change is in place with its planted control red; the link case reads red before and green after; every
gate in Execution exits 0.
