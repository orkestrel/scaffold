ER-MECH fix-round audit 3: subjective lane verdict (`reviewer` on Opus 5.5, clean context)

I held the subjective lane: whether each proof is named for what it proves, whether each sentence is true against the shipped code, naming, and design fit. I read the source and did not run anything. Every mutation outcome below comes from reading the code, not from a run.

## Per-claim verdicts

**1. The Receipts Platform check: CONFIRMED.**
- **The check.** `readReceipts` refuses the cell at /home/user/veneer-erm/tests/setupServer.ts:1337-1338, with the message `${label}: invalid Platform ${platform}`. `label` is `Receipt row N` (:1334). `—` is refused twice over: by the explicit `ABSENT_CELL` test, and because `—` is not in `NODE_PLATFORMS` (:475-487).
- **The TSDoc.** :1282-1284 states the rule ("must name a member of {@link NODE_PLATFORMS}") and why it differs ("unlike a Supported host row, a receipt records the platform its run read, so the cell can never read `—`"). The wording is true against :1260, where the Supported hosts reader admits `—`. The voice follows the rules (`must`, no `should`).
- **The test rows.** /home/user/veneer-erm/tests/setupServer.test.ts:1315-1316 add a `` `Linux` `` row and a `—` row, each expecting the named refusal. The message strips the code-span backticks, the same way the Supported hosts refusal does at :1273.
- **Mutation: delete the whole `if`/`throw`.** The same base row reads green at :1304. Every later check (Date, Revision, Build, Node, npm, Result, Commands) passes it. So the `Linux` row reaches `receipts.push`, `readReceipts` returns, and the `toThrow` at :1344 fails with Vitest's assertion failure "expected [Function] to throw an error". The assertions distinguish this mutation. The writer's quoted location, `tests/setupServer.test.ts:1344:38`, points to that `toThrow` line in the shipped file, which supports the report. The run itself is still unretained: see referral R1.
- **Mutation: rewrite to the Supported hosts form, `platform !== ABSENT_CELL && …`.** The `—` row kills it. That row is the one that pins the difference between the two readers.
- **Mutation: compare the platform case-insensitively.** The `Linux` row kills it.
- **The real guide.** Its Receipts table has a header and no rows (/home/user/veneer-erm/guides/veneer.md:10592-10593), so the check refuses nothing there. `erm-3-test-guides.log.txt` reads exit=0.

**2. The title: CONFIRMED.**
- **Placement and body.** The case sits alone in `describe('NODE_PLATFORMS', …)` at /home/user/veneer-erm/tests/setupServer.test.ts:2980-2985, with the verbatim title. The body is byte-identical to round 2's (erm-3-delta.diff:9-12 removed, :31-34 added).
- **Naming.** The block name follows the file's one-describe-per-export convention (`BUILD_PATTERN` at :3409, `readRuntime` at :3335).
- **Title against body.** "holds the platform this process runs on" maps to `toContain(process.platform)`. "each platform once" maps to the Set-size check, in the ordinary sense of "a set holds each value once".
- **Mutations.** Removing `'linux'` on a Linux host breaks the first assertion. Adding a second `'linux'` breaks the second. Both are distinguished.
- **Not promised.** Removing `'aix'` passes. The title, read as uniqueness, does not promise completeness.

**3. The engine-strict reading: CONFIRMED.**
- **The logs match.** /home/user/scaffold/.orkestrel/veneer/units/erm-instruments/r3/logs/erm-3-engines.log.txt and .../r2/logs/erm-2-engines.log.txt differ only in the header (`engine-strict=true` against `false`, read back through `npm config get`) and the debug-log timestamp. In both, the excluded `engines.node` probe prints "script ran" with exit=0 (:4-8), and the excluded `devEngines.packageManager` probe refuses with `EBADDEVENGINES` and exit=1 (:10-19).
- **The instrument has a control.** The refusing `devEngines` probe shows the instrument can report a refusal. The header shows the strict setting reached npm (erm-3-engines.sh:7-8).
- **Coverage.** The probes cover `npm run` only. That matches the guide sentence, which is about running a script.
- **The guide sentence.** /home/user/veneer-erm/guides/veneer.md:10545-10547 is true in both configurations. Leaving it without an `engine-strict` qualifier is correct.

**4. Scope and law: CONFIRMED.**
- **Scope.** The delta touches only `tests/setupServer.test.ts` and `tests/setupServer.ts` (erm-3-delta.diff:1, :40).
- **Law.** The added lines contain no `any`, `as`, `!`, or suppression, and no new helper. The only new function is `(value) => value === platform`, an anonymous callback passed directly as an argument, which the rules allow. The `as const` at setupServer.test.ts:1342 was already there before this round.
- **Inventory.** Every new value export in the whole change (`BUILD_PATTERN`, `NODE_PLATFORMS`, `matchesReceipt`, `readReceipts`, `readRuntime`, `readSupportedHosts`) is listed in the export inventory (erm-3.diff:365-391). The interfaces `Runtime`, `Receipt`, and `SupportedHost` export no runtime value.

## Findings outside the claims

**F1. The guide describes one Platform rule for both tables; the shipped readers have two.**
- **Where.** /home/user/veneer-erm/guides/veneer.md:10567-10568: "The readers of both tables refuse a malformed cell and name its row, including a Platform cell that is neither `—` nor a value Node reports as its platform".
- **What is wrong.** The clause presents `—` as an allowed Platform value in both tables. Round 3's Receipts reader refuses `—` (setupServer.ts:1337-1338, test :1316). The TSDoc this round added says the rules differ ("unlike a Supported host row … can never read `—`", :1283-1284). The guide and the code now state different rules for the same cell.
- **Failing input.** A Receipts row whose Platform cell is `—`. The guide's only statement of the Receipts Platform rule implies it is allowed, as it is for the `chrome` row at :10588. The reader throws `Receipt row 1: invalid Platform —`.
- **Why it matters.** The sentence was written when only the Supported hosts reader checked Platform. The guide is the document a developer writing a receipt reads.
- **Fix.** Reword :10567-10568 so the Receipts rule stands on its own. For example: "The readers of both tables refuse a malformed cell and name its row, including a Platform cell that holds no value Node reports as its platform (a Supported hosts row may write `—` for a platform the guide doesn't name yet) and a Commands cell whose code spans are not separated by commas."
- **Carrier gap.** `er-mech-brief-3.md` item 3 gave the builder the guide only for the engine sentence. The unit that changed this mechanism did not own the prose that describes it, so the fix needs a named carrier.

## Referrals

**R1 (to the objective lane).** The plant for claim 1 has no retained log. The kill rests on the writer's quoted output plus my reading of the source. Execute the deletion of setupServer.ts:1335-1338. Then run `npx vitest run tests/setupServer.test.ts -t "reads receipts only within their Hosts subsection and refuses each malformed cell"`, confirm the failure names an assertion, and restore the file byte for byte.

## Attacked and held

- **Redundant `—` test.** `platform === ABSENT_CELL ||` at :1337 is logically redundant, and deleting it survives every test. This is not a gap: the mutant behaves identically. The explicit disjunct states the contrast with :1260 at the point where it applies.
- **Title reading.** "each platform once" could be misread as a completeness promise. I read it as the usual uniqueness idiom and it holds under that reading. An exhaustiveness pin on `NODE_PLATFORMS` stays outside this round, as audit 2 ruled on R2.
- **Duplicated rationale.** The inline comment at :1335-1336 repeats the TSDoc's reason. That repetition is within the norm for code comments and is not drift.

VERDICT: FAIL none; outside the claims: F1
