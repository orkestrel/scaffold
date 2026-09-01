# Unit m2-audit — subjective lane return

# Verdict — unit m2-audit, subjective lane (design fit, comment prose, static-block placement, test vocabulary)

## 1. No write path reaches a shared sentinel — CONFIRMED

Attack: enumerate every writer from source and look for one that mutates a collection after `#release` swapped it for a sentinel.

Element-writers (the only writers that could mutate a sentinel), all in `/home/user/contract/src/core/ContractCompiler.ts`: `#discover` at `431`, `441`, `444`, `453`, `455`; `#schedule` at `465`, `469`, `475`, `482`, `490`; `#buildSchema:654`; `#buildGuard:812`; `#buildParser:985`; `#buildAuditor:1281`; `#buildReporter:1548`; `#buildGenerator:1809`. Field-assigners that never mutate: the constructor at `223-232` and `#release` at `381-390`.

Gate: `#discover` has exactly one caller, `#prepare:414`; `#schedule` has exactly one caller, `#discover:456`; each of the six family loops calls `#prepare()` first (`650`, `807`, `980`, `1276`, `1542`, `1804`). `#prepare:396` early-returns only on `#nodes.length > 0`, and `#release:382` sets `#nodes` to the empty sentinel, so the post-release path always falls to the `#source === undefined` refusal at `398`. `#release:380` clears `#source` in the same assignment run. No writer survives that.

Caveat on wording, not on substance: the claim's phrase "every writer … runs behind `#prepare`" is false as written — the constructor and `#release` are writers and neither runs behind `#prepare`. The claim's substance holds; the sentence needs "every writer that mutates a released collection's elements". This same imprecision shipped into a source comment; see claim 7.

## 2. A write that reached a sentinel fails loudly — CONFIRMED, with the silent-failure mechanism named

Attack: find a mechanism that lets an indexed write on a frozen sentinel fail silently.

One exists. `INTRINSICS.freeze` (`src/core/constants.ts:85`) captures `Object.freeze` while `constants.ts` evaluates. `constants.ts:26` states this limit and declines to defend it, and `ContractCompiler.ts:121-126` restates it for `#weakMap`: "before any caller code runs" is false for a consumer module ordered earlier. A consumer module evaluated before `constants.ts` that sets `Object.freeze = (value) => value` leaves all nine sentinels unfrozen, and a write that reached one would then succeed silently and cross-contaminate every compiler in the realm.

That mechanism does not falsify the claim's behavioural half, because claim 1 holds and the package's stated threat model (`guides/contract.md:265`) excludes this adversary explicitly. Within the file's own strict-mode ESM, every write path enumerated in claim 1 targets a frozen array and throws a `TypeError` that `#leave:343-352` wraps as a coded `ContractError`. Nothing uses `Reflect.set`, which is the other silent-write door.

The defect this mechanism produces is in the prose, not the code, and it lands on claim 7.

## 3. The `#index` absence design is sound — CONFIRMED

Dispatch sites on `#index`: `451` and `454` through `known` in `#discover`, `515` through `known` in `#locate`. Declaration `195`, constructor `225`, release `383`. No fourth site. Both refusals are narrowed ahead of every dispatch (`424-430`, `508-514`).

Reachability attacks tried, all failed to reach either refusal:

- Read the index after release through `contract` when the six getters were read individually. `#buildContract:2047` calls each `#build*`, and every one short-circuits on its `ready` check (`648`, `805`, `978`, `1274`, `1540`, `1802`), so no `*At` helper reaches `#locate`.
- Settle by failure, then read. `#fail:359-362` sets `failed` before `#release`, so every later getter throws at `#enter:324` before any build.
- Reenter through a hostile `pattern` accessor and swallow the poison so the outer walk continues past `#discover`. `#leave:342` still routes the interrupted frame to `#fail`, which releases and throws; nothing resumes after release.
- Force a release mid-build. `#collect:368` is called only from `#leave:355`, which runs after the build frame returns, and it requires all six roots.

The `#discover` refusal is dead on the same ground and the comment at `419-423` says so honestly.

## 4. Cross-compiler isolation holds under sharing, and the added case would catch the contamination it names — BROKEN

The first half holds. Every compiled plan closes over child artifacts and node data captured at build time, never over `this.#nodes` or `this.#index` — checked at `#guardOf` object (`871-902`), `#auditOf` array (`1357-1358`), `#parserOf` union (`1205-1213`), `#seedOf` union (`1987-1995`). Nothing reads a released collection, so one compiler's release cannot move another's answers.

The second half is false. `tests/src/core/ContractCompiler.test.ts:140-170` asserts only on artifacts that were fully built before either compiler released, and no assertion in it observes a released collection — because nothing in the class does.

Failing state: delete all nine `INTRINSICS.freeze` calls at `src/core/ContractCompiler.ts:165-173`, or delete any single assignment in `#release` at `381-390` (for example `this.#nodes = ContractCompiler.#emptyNodes`, leaving the graph retained). The added case passes unchanged under every one of those mutations. The writer's own report already supplies the negative-control reading — both added cases were run against the unedited source and passed there — which is exactly the signal that the case does not bind to the sharing mechanism.

Why it matters: the case's own comment (`141-146`) tells the next reader that this test guards sharing. It does not, and a later change that breaks sharing will land green with that comment still pointing at it.

What right looks like: strike the discrimination claim and record the case as what it is — a preservation pin over release-independent artifact behaviour. Name the heap baseline (`contract-baseline.mjs`, cold `new ContractCompiler` 1152 → 648 B/call) as the instrument that actually discriminates the m2 change, and state in the case comment that release mechanics are unobservable through the public surface because every member involved is a `#` private. Do not add machinery to make the sentinels observable; that would export internals to make a test possible.

## 5. Terminal replay is unmoved — CONFIRMED

`tests/src/core/ContractCompiler.test.ts:264-282` settles at `reporter` and pins identity replay from all seven getters including the settling one. The lifecycle path it exercises — `#fail:359` → `#release:379` → `#enter:324` — is unchanged by the diff except for `#release`'s right-hand sides. The case is a preservation pin and is correctly claimed as one; unlike claim 4 it makes no discrimination claim.

Attack on the test vocabulary: I checked whether "all seven getters" breaks the count ban in `AGENTS.md` § Writing. It does not, in this file: `44` ("exactly the seven ruled getters"), `92` ("those exact six values"), and `114` ("after all six exist") establish the six/seven vocabulary as this file's and this guide's settled term for a fixed published surface. Refuted as a finding.

Bounded note: the case overlaps `240-262`, which already pins identity replay across six getters after a settlement at `schema`. The genuinely new coverage is settlement at a non-first door and the settling door replaying to itself, which the name and comment both state. It earns its place.

## 6. Diff scope — CONFIRMED

The live source at `136-174`, `186-240`, `375-391`, `418-431`, and `499-523` matches the supplied diff line for line; nothing outside the field declarations, constructor, `#release`, `#discover`, `#locate`, the added static block, and their comments differs from what the diff shows. No `as`, no `!`, no suppression directive in any touched region of either file.

`#emptyIndex` exists nowhere in `src/` or `tests/` (pattern `emptyIndex|#empty` over `/home/user/contract` excluding `dist/`; the surviving `#empty*` hits are `ShapeCloner.ts:80-125,954-959` and `SchemaCloner.ts:59-84,253-254`, which the unit did not own).

"No existing assertion changed" is confirmed mechanically from the supplied evidence rather than from a run I could take: the test file's hunks are `@@ -137,6 +137,38 @@` (+32) and `@@ -229,6 +261,26 @@` (+20), summing to the diffstat's `52 +++++` with zero deletions in that file. A file with no deleted lines changed no existing assertion.

Bound of my check: I hold `Read`, `Grep`, and `Glob` only, so this rests on the diff plus the live tree agreeing at every line I read, not on my own `git diff`.

## 7. The changed and added comments state only what the code cannot show, and the freeze placement is consistent with the file's comment discipline — BROKEN

The placement half holds. A dedicated `static { }` at `161-174` beside the declarations, rather than the class-tail block at `2070-2076`, keeps one block on one subject: the tail block's comment is specific to prototype pinning and would have to grow a second unrelated paragraph. The block's own comment (`162-164`) explains the discarded return and the readonly-retype hazard, which is exactly what the code cannot show. That is the right call, well recorded.

The prose half breaks, at `src/core/ContractCompiler.ts:141-143`:

> The static block beneath freezes them, so a write that did reach one fails loudly at its own line rather than leaking a node of one compiler's graph into every other compiler's release.

What is wrong: the sentence promises a defense unconditionally, and the same class qualifies exactly that capture fifteen lines earlier. `121-126` says of `#weakMap` that "before any caller code runs" is false for a consumer module ordered earlier, "which is the limit `constants.ts` states and does not defend." `INTRINSICS.freeze` is captured the same way and inherits the same limit, so under the state named in claim 2 the freeze is a no-op and the write leaks silently — into every compiler in the realm, which is the precise outcome the sentence promises it prevents.

Why it matters: this is the file whose discipline is to state a defense's reachability and its limit every time — `499-507` labels the `#locate` guard "Defense in depth, not a live path", `563-571` labels the ledger's `memo === undefined` half "unreachable at runtime" and says why it stays, `433-438` says why the pop is indexed. A reader of this class calibrates on that discipline and will read an unqualified promise as a defended one. `.claude/rules/documentation.md` names the failure directly: prose rulings survive because nothing tries. Nothing can try this one — the sentinels are `#` statics, so no test can read their frozenness, and the writer flagged that himself.

Second defect in the same comment, `140-141`:

> Sharing them is safe because nothing writes to a released collection: every writer runs behind `#prepare`, which refuses after `#release` clears `#source`.

"Every writer" is false against the file: the constructor at `223-232` and `#release` at `381-390` are writers and neither runs behind `#prepare`. A reader checking the invariant finds two counterexamples in the first thirty seconds and has to reconstruct what was meant.

What right looks like — replace `140-143` with prose that carries the invariant precisely and the limit honestly:

> Sharing them is safe because nothing MUTATES a released collection: every element write — `#discover`, `#schedule`, and the six family loops — runs behind `#prepare`, which refuses after `#release` clears `#source`; the constructor and `#release` assign the field and never touch a sentinel's elements. The static block beneath freezes them, so a write that did reach one fails at its own line rather than leaking a node of one compiler's graph into every other compiler's release — under the same qualification `#weakMap` carries earlier: `INTRINSICS.freeze` is captured while this module evaluates, so a consumer module ordered before `constants.ts` defeats it, and that limit is stated there rather than defended.

Bounded: I am not asking for code. Claim 1 holds, claim 3 holds, and `guides/contract.md:265` already declines to claim completeness against this adversary. Adding a re-check or a second freeze would be over-correction. The comment is the only thing that must move.

Bounded observation, not a finding: `ShapeCloner.ts:80-125` and `SchemaCloner.ts:59-84` still build per-instance `#empty*` peers, the idiom `ContractCompiler` has now left. Three sibling engines in one directory carry the same member names for two different mechanisms. That was outside this unit's owned scope and closing it is a new unit, not a defect in this diff — but the campaign should rule on it rather than let it settle by default.

## 8. The writer's report-only guide finding is correctly scoped — CONFIRMED

The over-claim is real and is at `guides/contract.md:491`: "the owned graph, the node index, the order and every family plan are released through preconstructed peers." `#release:383` drops the index to `undefined`; it takes no peer.

Correctly scoped, checked rather than assumed: I searched the whole guide for `working[- ]state|released through|preconstructed|nonredirectable`. Every other hit belongs to `SchemaCloner` or `ShapeCloner` (`332-344`, `651`, `657`, `663`, `1035-1046`), and those classes still use per-instance preconstructed references, so their prose is unmoved. Line `491` is the only `ContractCompiler` release sentence in the guide. Parity: the sentence sits in a table cell under no fence and backticks no removed export, so `test:guides` exit 0 is consistent.

The replacement sentence is accurate against the changed source. I tested each clause: the peers are class-owned and frozen (`144-174`), the index is dropped for the stated reason (`189-193`), and what survives release is the six roots, the optional bundle, and terminal state (`176-213` minus `380-390`). The omission of `#stack` from the enumeration is inherited from the sentence being replaced, not introduced.

Carried to the documentation unit, not counted against this claim: the replacement writes "shared frozen empty peers" into a consumer-facing guide. `.claude/rules/writing.md` § Claims and time requires claiming only what the reader can check, and no consumer can check a `#` static's frozenness. It also carries the unqualified freeze promise from claim 7 out of a source comment and into published prose, where it reads as a guarantee. Whoever owns the documentation unit must either drop "frozen" from the guide sentence or carry the `INTRINSICS` qualification with it.

VERDICT: FAIL — 2 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims
