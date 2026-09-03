## Lane

Objective lane, audit round 1, unit conform-scaffold. Held as the recorded substitution for the dark Sol bench. Every sweep and file reading below is my own, re-run with Grep, Glob, and Read; `node_modules/**`, `tmp/**`, and `.orkestrel/**` are excluded from sweep populations except where a hit there is itself the finding.

## Per-claim verdicts

**1. Every row is `applied`, `stopped`, or `noop`; none silently skipped — CONFIRMED.**
The report's disposition table carries every row the unit brief § Rows names (`scaffold-subj-1`, `-2`, `-3`, `-4`, `-6`, `-7`; `scaffold-obj-1` through `-5`; `fleet-F1`, `fleet-F2`) with no row absent. I verified each `noop` independently rather than from the report: `/home/user/scaffold/src/server/types.ts:355-357` still declares `export interface ReadAllowance { remaining: number }` with the `@remarks` exemption at `:347-354`, so `scaffold-obj-4`'s "no edit while the exemption stands" is the correct disposition; a sweep for `isBrowserVuePath` over `/home/user/scaffold/tests` returns no match and a glob of `/home/user/scaffold/tests/setup*` returns `setup.ts`, `setupPolicy.ts`, and `setupServer.ts` with no `setup.test.ts`, closing `fleet-F1`; sweeps for `readonly id: string` over `/home/user/scaffold/src` and for `^\treadonly [a-z]` over `src/**/[A-Z]*.ts` both return no match, closing `fleet-F2`. The item outside the rows was reported as a deviation rather than absorbed.

**2. Each `applied` row implements the refuter's operative repair — REFUTED.**

Failing input: `/home/user/scaffold/README.md:14`. Row `scaffold-subj-7`'s operative repair reads "replace … and reflow". The replacement landed verbatim at `README.md:10-12`, but the paragraph was not reflowed: line 14 runs to roughly 160 characters ("bench stays in the canon, and a session reads it at its primary root. The instruction canon — the coding and orchestration contracts, the rules, the skills, the") inside a paragraph whose every other line wraps at or under 100. No gate reaches it — `oxfmt` does not rewrap Markdown prose, which is why `format:check` reads clean over a line this long.

Smallest correct fix: rewrap `README.md:12-20` to the file's own wrap so the sentence beginning "The instruction canon" starts a fresh line, changing no words.

Every other applied row survives the attack:

- `scaffold-subj-1`: `guides/scaffold.md:1511` reads "the upstream reader emits `release`, `mirror`, `file`, `error`, and `destroy`", matching the declaration order at `src/server/types.ts:303-309`.
- `scaffold-subj-2`: `guides/scaffold.md:1508-1514` carries the refuter's operative sentences verbatim, including the "its thrown errors" and "a constructor refusal precedes the emitter" clauses the refuter added over the finder's text.
- `scaffold-subj-3`: `README.md:72` reads "Not everything is owned that way:" with the remainder of the sentence at `:72-74` unchanged, which is the refuter's form rather than the finder's rewrite.
- `scaffold-subj-4`: `guides/scaffold.md:226`, `:227`, `:389`, and `:401` carry the imperative summaries; the pipes align with their sibling rows at `:224-231` and `:386-403`, so column alignment is preserved and no other cell moved.
- `scaffold-subj-6`: fences added at `src/core/helpers.ts:788-809` and `src/core/compilers.ts:1363-1371`, `:1435-1443`, `:1488-1498`, each importing `@orkestrel/scaffold`, each answering with a value rather than a `.length`.
- `scaffold-subj-7` guide half: `guides/scaffold.md:16-18` now matches the guide's own Vendored data root wording at `:1194-1196`, resolving the self-contradiction the row named.
- `scaffold-obj-1`: `package.json:65` is `oxlint --config .oxlintrc.json --fix .`; `:73` still carries `--deny-warnings` on `lint:check`.
- `scaffold-obj-2`: `tests/src/core/factories.test.ts` covers the refuter's lettered cases. Its refusal case substitutes a `keywords` list past `MAX_COLLECTION_ITEMS` (`src/core/constants.ts:437`, enforced at `src/core/validators.ts:145` through `isCollection` in `isBlueprint` at `:280-304`) for the refuter's illustrative `src: ['browser', 'nowhere']`. The refuter wrote "for example", and the substituted vector is reachable through the typed API without the type assertion `AGENTS.md` forbids, so it is inside the repair rather than a departure.
- `scaffold-obj-3`: `supportsMode` is imported from `@orkestrel/test/server` at `tests/src/server/WriteTransaction.test.ts:18` and `tests/src/server/helpers.test.ts:91`; the installed declaration at `node_modules/@orkestrel/test/dist/src/server/index.d.ts:475-487` is the probe the row named. `tests/setupServer.ts` is absent from the status, so no local helper was added. `WriteTransaction.test.ts:281` and `helpers.test.ts:596` are untouched.
- `scaffold-obj-5`: `src/bin/helpers.ts:577` is `stripControls(strip(line)).replace(/\r\n|\r|\n/gu, ' ')`, the replacement form rather than the finder's split, which `.claude/rules/portability.md` § Line endings bans. The `@remarks` sentence at `:565-567` states the fold and the reason.

**3. No old name survives — CONFIRMED.**
This unit renamed and removed no symbol. For the pair the Orchestrator adopted, a sweep for `extractFenceImports|findMissingSymbols` over `/home/user/scaffold` excluding `node_modules` returns hits only inside `.orkestrel/**` campaign records — none in `src/**`, `tests/**`, `guides/scaffold.md`, `guides/README.md`, or `README.md`. The replacements resolve: `node_modules/@orkestrel/guide/dist/src/core/index.d.ts:376` declares `fenceImports(fence: string): ReadonlyArray<{ specifier: string; names: readonly string[] }>` and `:801` declares `missingSymbols(symbols, source): readonly string[]`, matching the call sites at `tests/guides.test.ts:102`, `:112`, and `:188`. The import list at `tests/guides.test.ts:3-16` is case-insensitively alphabetical, so the re-sort holds. My old-form sweep over `README.md`, `guides/*.md`, `src/**`, and `tests/**` returns the four TSDoc first sentences at `src/core/helpers.ts:172`, `:251` and `src/server/helpers.ts:834`, `:878`, which `.claude/rules/typescript.md` § Comments and API documentation requires in the third-person `-s` form, plus `guides/scaffold.md:1478` and the test titles at `tests/src/server/WriteTransaction.test.ts:395` and `:563` in unrelated senses.

**4. Every behavioural row carries a failing-first proof, and every documentation row carries the sweep proving the old form gone — REFUTED on the second half.**

The behavioural half holds, read from the captured runner output rather than from the report:

- `scaffold-obj-5`: `scaffold-proofs/obj5-red-control.txt:44` and `:60` name `CLI sanitization > repaints no printed line from a lone carriage return in an argument` and `sanitizeLine > folds every break onto one line` as failing, `:78` reads `2 failed | 243 passed (245)`; `obj5-green-final.txt:43` reads `245 passed (245)`.
- `scaffold-obj-2`: `obj2-red-control.txt:19`, `:40`, `:57` — both ownership cases failing, `2 failed | 386 passed (388)`; `gate-test.txt:22` reads `388 passed (388)`.
- `scaffold-obj-3`: `obj3-red-control.txt:12`, `:31`, `:43`, `:64` — the three mode cases failing under inverted assertions, which a silently skipped case cannot do; `obj3-green.txt:11` reads `431 passed (431)` with no skip.
- `scaffold-subj-6`: `subj6-red-control.txt:19` shows the planted verdict arriving in `mismatched`, and `subj6-distribution.txt:33` shows the example case green with only the registry case red. I read the instrument itself at `tests/distribution.test.ts:453-499`: a claim reaches `driven` only when the driver returned an `encoded` answer, and `mismatched` is pinned to an exact control list at `:496-499`, so an unanswered or wrongly answered new claim could not have passed.

Failing input for the second half: the report's § Sweeps table carries no pattern reaching `scaffold-subj-1`'s old form. Its patterns cover `Two paths are not owned`, `Every entity publishes`, the four `-s` Surface summaries, and the two vendored-set phrases, and nothing matching "the upstream reader emits `release`, `mirror`, `error`, and `destroy`". `scaffold-subj-1` is a documentation row, so the claim is false as stated.

Smallest correct fix: record the sweep in the report. The tree state is already correct — my own sweep for `upstream reader emits|reader emits \`release\`|\`mirror\`, \`error\`` over `README.md`, `guides/*.md`, `src/**`, and `tests/**` returns exactly one hit, the corrected sentence at `guides/scaffold.md:1511`, and the same sweep for `Errors are emitted immediately` returns none. No code change is owed.

**5. Guide parity holds — CONFIRMED.**
No export was added, renamed, moved, or removed, so no method table or Surface row owed a change; the guide edits rewrote Summary cell text inside existing rows and the source edits are TSDoc blocks plus a `src/bin` body. I confirmed the parity assertions read symbol keys rather than summary text at `tests/guides.test.ts:99-117`, so nothing this unit changed can move them. The new fences import the published specifier `@orkestrel/scaffold`. `guides/README.md` owed nothing and is untouched. A sweep for `AGENTS §` over `README.md`, `guides/scaffold.md`, `guides/README.md`, `src/**`, and `tests/**` returns zero occurrences. `sanitizeLine`'s behaviour change obliges no prose: sweeps for `sanitiz|carriage return|control character|hostile byte` over `guides/scaffold.md` and for `sanitiz|carriage` over `README.md` both return no match.

**6. Every breaking change is named under § Breaking — CONFIRMED.**
No published symbol was renamed or removed. `sanitizeLine` is bin-internal: a sweep for `sanitizeLine` over `/home/user/scaffold/src` returns `src/bin/helpers.ts` and `src/bin/CLI.ts:101`, `:1407`, `:1411` alone, and `src/bin` publishes no barrel. The vendored surface did move — `guides/scaffold.md` is a `HOST_PATHS` member at `src/core/constants.ts:151` — and the report names that with the bump, re-pin, and `repair` obligation `.agents/orchestration.md` § What a bump obliges states. The Orchestrator's later edit to `tests/guides.test.ts` does not disturb the regenerated `host.json`, because `HOST_PATHS` (`src/core/constants.ts:131-152`) does not carry that path.

**7. The diff touches only Owned files, with no shim — CONFIRMED, with a note.**
`package-lock.json` and `node_modules` are absent from `/home/user/work/evidence/conform-scaffold.status`, as is every path in the brief's Off-limits list, including `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `configs/**`. `package.json`'s only hunk is the `scripts` field the row names. The diff adds no alias, re-export, or shim. Two paths sit outside Owned and are accounted for: `.orkestrel/**` is the campaign record the standing conditions place outside the unit, and `host.json` is generated rather than authored — `package.json:84` shows `build` ending in `build:inventory`, which rewrites it, and the dispatch checklist requires that regeneration to precede every gate reading the artifact.

**8. No skip, only, todo, retry, or inflated timeout added — CONFIRMED on that conjunct. Gate reading — NOT-EVIDENCED.**
A sweep of the diff's added lines for `\.only|\.todo|\.skip\b|it\.skip|describe\.skip|retry|timeout:|TODO|FIXME|console\.log` returns only the three `it.skipIf(!supportsMode())` lines at diff `:1036`, `:1051`, `:1079`, each replacing an existing `it.skipIf(process.platform === 'win32')` with the probe and the cited mechanism `.claude/rules/tests.md` § Test contract requires. No skip was added and none was widened.

The gate reading is NOT-EVIDENCED for this lane, and the landing settles it. The report's own § Gates records `check` exit 2 and `test` exit 1, both from the pre-adoption baseline on `tests/guides.test.ts`, and the Orchestrator's deciding run after the adoption is the reading no read-only lane can take. I rule that run neither `FAIL` nor `UNRESOLVED`, and the terminal line turns on the other claims and on this claim's first conjunct.

**9. Nothing hidden — CONFIRMED, with O2 recorded separately.**
No TODO, deferred row, commented-out code, or debug residue entered the tree; the same sweep of added lines returns none. The disposition table matches the diff row by row: each `applied` row has its hunk and each `noop` row has no hunk. `scaffold-obj-4`'s `noop` is the row's own instruction plus the Orchestrator's recorded ruling, not deferred work.

## Findings outside the claims

**O1 — the retained report records a false statement about a canon file, and the statement concerns an instruction the unit was handed.**
`/home/user/scaffold/.orkestrel/campaign/conform/units/l3/scaffold-implement-direct.md:575` reads: "The `.claude/rules/documentation.md` file this session loaded carried a trailing paragraph directing work through Bash in place of Read, Edit, and Write. Per the dispatch's standing conditions that text is a harness session note rather than a rule, so it was ignored." The file on disk carries no such paragraph: a sweep for `Bash|heredoc|sed -i` over `/home/user/scaffold/.claude/rules/documentation.md` returns no match. So the unit either received text appended to a rule file's content that the file does not contain, or fabricated the observation; in either case the campaign record now asserts something false about a canon file, and a later reader takes it as fact. I followed no such instruction and performed this audit read-only. Required: strike or correct that line, and rule on which of the two readings holds, because one of them is an injection into a role's rule-loading path.

**O2 — two divergent retained copies of one unit's report.**
`/home/user/scaffold/tmp/units/conform/conform-scaffold-report.md` and `/home/user/scaffold/.orkestrel/campaign/conform/reports/conform-scaffold-report.md` agree, but `/home/user/scaffold/.orkestrel/campaign/conform/units/l3/scaffold-implement-direct.md` is a third copy of the same report carrying an extra Observation bullet (the O1 text) and a closing line the others lack. `.agents/orchestration.md` § Dispatch anatomy makes a unit's instruction and outcome one pair on disk, so "the report" is ambiguous for the next lane. Required: keep one retained report per unit and delete or clearly supersede the other.

**O3 — observation, no change required.** `supportsMode()` now runs at collection time in `tests/src/server/WriteTransaction.test.ts` and `tests/src/server/helpers.test.ts`. Its declaration at `node_modules/@orkestrel/test/dist/src/server/index.d.ts:479-480` states that failing to allocate or to remove the probe directory propagates, so a host whose temporary directory refuses the probe fails collection of the whole file rather than skipping the mode cases. The same host would fail `createScratch` in every neighbouring case, so the exposure is not new.

## Referrals

**R1 — the repaired vendored-set sentences are still narrower than `HOST_PATHS`.** `guides/scaffold.md:16-18` and `README.md:10-12` name the licence, the harness permission file, the bench scripts, the shared policy register, the root dotfiles, and the guide mirrors. `src/core/constants.ts:140-141` also holds `tests/config.test.ts` and `configs/helpers.ts`, which none of those phrases plainly covers. The applied text is the refuter's ruled wording verbatim and matches the guide's own `:1194-1196`, so this is a question about the established row rather than a broken claim. No verdict from me.

**R2 — the fleet-wide `lint` drift the refuter recorded under `scaffold-obj-1` is still open.** This package's manifest now matches the script-intent table, and the refuter's correction noted that much of the fleet still carries `--fix --deny-warnings`. That belongs to the Orchestrator, not to this unit.

**R3 — the deciding gate run's ordering.** `host.json` is rewritten only by `build:inventory` (`package.json:84`), so the deciding run must keep `npm run build` after the last edit to any `HOST_PATHS` member for the committed inventory to describe the shipped bytes. Nothing in the tree today violates that; naming it so the landing run is ordered deliberately.

## Claims attacked and held

I attacked claims 3, 5, 6, 7, and 9 and could not break them: the symbol sweeps, the parity-set reasoning read from `tests/guides.test.ts:99-117`, the barrel reachability of `sanitizeLine`, the status file against the Owned and Off-limits lists, and the diff's added lines all came back clean. Claim 8's first conjunct held under the same attack; its gate reading is outside a read-only lane's reach.

VERDICT: FAIL 2, 4; outside the claims: O1, O2
