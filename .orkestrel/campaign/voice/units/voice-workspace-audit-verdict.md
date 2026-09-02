# Audit verdict — unit voice-workspace

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `555706b`
(`units/voice-workspace.diff`, `units/voice-workspace.status`, `units/voice-workspace-report.md`).
Rewritten per the writer: imperative 28, verbless 26, name 7, returns 5. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 1)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), on Claude Opus 5 — the writer's engine, as the brief records because the Sol bench is dark.

**Claim 1 — every rewritten first sentence keeps the meaning of the sentence it replaced: BROKEN (1 hunk of 54).**

I read every hunk in `/home/user/scaffold/tmp/units/voice/voice-workspace.diff` against the tree, not a sample. Fifty-three first-sentence rewrites are pure voice changes that keep the subject, the action, and every qualifier — the inflections (`Create` → `Creates`, `Infer` → `Infers`, `Resolve` → `Resolves`), and the verbless-to-verb rewrites that only prepend a verb (`Search and replacement behavior.` → `Configures search and replacement behavior.` at `/home/user/fleet/workspace/src/core/types.ts:52`; `Workspace construction options.` → `Configures a workspace at construction.` at `types.ts:88`; `A process-local workspace snapshot store.` → `Holds workspace snapshots in the current process.` at `/home/user/fleet/workspace/src/core/workspaces/stores/MemoryWorkspaceStore.ts:4`). The re-substitution of `registry` for `manager` at `types.ts:172` is not drift: `registry` is the module's established word for that entity (`WorkspaceManager.ts:14`, `factories.ts:138`).

One hunk fails the test. `/home/user/fleet/workspace/src/core/types.ts:101`, diff line 329:

- was: `/** A JSON-serializable workspace snapshot. */`
- is: `/** Represents one workspace's files and identifier in JSON-serializable form. */`

Three changes beyond voice. It **adds** an enumeration of the interface's members (`files and identifier`) that the original did not carry and that the type body two lines down already shows — `.claude/rules/typescript.md` § Comments and API documentation opens with "Comments explain why, never restate what self-explanatory code does". It **adds** the quantifier `one`, which the pilot lesson quoted in the brief (`voice-workspace-brief.md:46`) bans for exactly this reason. It **drops** the domain noun `snapshot`, the module's core concept word, from the doc of the type that *is* the snapshot; every neighbour still uses it (`types.ts:107`, `types.ts:110`, `DatabaseWorkspaceStore.ts:10`) and so does the guide (`/home/user/fleet/workspace/guides/workspace.md:50`, "the JSON-serializable form a store persists").

What right looks like: a rewrite that supplies the verb and keeps the sentence's content, for example `/** Represents a workspace's stored state in JSON-serializable form. */`. The name-avoidance the writer invoked forces dropping the word pair `workspace snapshot`, and nothing forces the field list or `one`.

**Claim 2 — third-person `-s` verb that fits the symbol, never repeating the symbol's name: CONFIRMED.**

Every rewritten opener carries a third-person `-s` verb, and the verb choice tracks the symbol's role: `Creates` for the six factories (`factories.ts:23,46,82,100,116,138`), `Persists` for the store contract and the database store (`types.ts:107`, `DatabaseWorkspaceStore.ts:10`), `Configures` for the two options records (`types.ts:52,88,172`), `Names` for the literal unions and the event map (`types.ts:3,14,79,138`), `Carries` for the input and result records (`types.ts:17,45,73`), `Represents` and `Provides` for the interfaces and their classes (`types.ts:24,39,132,141,183`, `Workspace.ts:29`, `WorkspaceManager.ts:14`). No rewritten sentence restates its identifier as the doc's subject. I found no sentence whose verb misdescribes its symbol; `Locates` at `types.ts:33` is the weakest fit and I record it as a finding rather than a break, because a coordinate type does locate a caret.

**Claim 3 — every rewritten boolean `@returns` reads `True if …; false otherwise` with the original condition kept: CONFIRMED.**

All five, each keeping its condition verbatim: `errors.ts:31` (`Whether the value is a workspace error` → `True if the value is a workspace error; false otherwise`), `helpers.ts:26` and `helpers.ts:113`, `validators.ts:8` and `validators.ts:33`. The form matches the rule text at `node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md:77-78`. No boolean-returning exported symbol was left in another wording: `isBinary` already read the target form (`helpers.ts:43`) and is untouched.

**Claim 4 — nothing already conforming was rewritten, and no `@example`, `@param`, `@remarks`, `@throws`, or later sentence was touched: CONFIRMED.**

Three already-conforming blocks survive byte-identical and appear only as diff context: `createBinaryContent` (`factories.ts:64`), `isBinary` (`helpers.ts:40`), `computeDecodedSize` (`helpers.ts:92`). No removed line in the diff was already third-person. Every changed line in the diff is comment text; each is a first sentence or one of the five boolean `@returns` lines. Second paragraphs and tag blocks are untouched throughout — `constants.ts:4-5`, `Workspace.ts:31-33`, `WorkspaceManager.ts:16-17`, `DatabaseWorkspaceStore.ts:12`, the `@remarks` at `types.ts:54-56` and `types.ts:90-92`, and every `@example`. The two re-wraps (`types.ts:6-9`, `types.ts:182-185`) move only the first sentence across the 100-column width.

Findings outside the claims:

Findings outside the claims, each with why it matters and what right looks like.

**1. The name-avoidance standard is applied unevenly, and the one symbol that got it lost the concept word.** `/home/user/fleet/workspace/src/core/types.ts:101` was reworded to purge `snapshot`, while `types.ts:132` keeps `Represents the database row used to persist one opaque workspace snapshot.` (row + workspace + snapshot = the whole of `WorkspaceSnapshotRow`) and `types.ts:7` keeps `Holds a file's immutable content` (file + content = `FileContent`). By the writer's own stated test — a first sentence that restates its identifier's words in sequence — those two qualify and were left alone. Why it matters: a reader moving down `types.ts` cannot tell what the standard is, and the module's vocabulary now has a hole exactly where its central noun should be. What right looks like: keep the domain nouns in all three, read "never repeats the symbol's name" as banning a doc that restates the identifier *instead of* describing the symbol, and fix `types.ts:101` per claim 1.

**2. Sibling guards now describe the same operation with different verbs, side by side.** `/home/user/fleet/workspace/src/core/helpers.ts:23` reads `Determines whether content is the text arm.` and `helpers.ts:40`, its untouched twin, reads `Checks whether content is the binary arm.`; `helpers.ts:110` also reads `Determines whether`. The rule names `Checks whether` as the query form (`node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md:75-76`), and the brief left wording inside the rule to the writer. Why it matters: `isText` and `isBinary` are a matched pair, seventeen lines apart, and the guide presents them as one row family (`guides/workspace.md:82-83`). What right looks like: `Checks whether content is the text arm.` and `Checks whether a 1-based range is structurally valid.`, so the guard family reads one way.

**3. `Position` takes an agentive verb where its sibling `Range` takes a descriptive one.** `types.ts:33` reads `Locates a 1-based caret inside text.` while `types.ts:39` reads `Represents a half-open text span whose start is inclusive and end is exclusive.` Both are coordinate data interfaces with no behaviour. Why it matters: `Locates` reads as an operation on a type that performs none, and the two lines sit adjacent. What right looks like: `Represents a 1-based caret inside text.` — it drops `position` the same way and matches its sibling.

**4. The unit report misstates its own tally and states counts throughout.** `/home/user/scaffold/tmp/units/voice/voice-workspace-report.md:32-33` says helpers took "fourteen imperative openers plus two boolean `@returns`"; the diff shows twelve first-sentence rewrites in that file (diff lines 110, 119, 132, 141, 150, 163, 172, 181, 190, 199, 208, 217) plus the two `@returns`. The file-level total of 54 first sentences does reconcile with the diff. Separately, `AGENTS.md` § Writing bans a count of a set anyone can add to, and the report is built on a count table. Why it matters: the report is the retained record an auditor rules on, so a number in it that the diff does not support costs a later reader a re-derivation. What right looks like: name the members or drop the number.

**5. Pre-existing guide-to-TSDoc verb divergence, outside this unit's scope.** `guides/workspace.md:91` describes `sliceRange` as `Reads a clamped half-open span.` while the TSDoc at `helpers.ts:186` says `Slices a clamped half-open text range.`; `guides/workspace.md:87` describes `isValidRange` with the bare `Whether …` form this wave removed from the code. Neither was created by this unit, and `guides/**` is off-limits to it. Recorded for the campaign, not as a required change here.

**Referral to the Orchestrator (I hold only the subjective lane; the Sol bench is dark).** The gate exit codes and the post-sweep `voice-scan.mjs` reading at `voice-workspace-report.md:46-68` come from inside the writer's own exec and I cannot verify them from a read-only lane. Take the authoritative chain and the acceptance-instrument re-run yourself after the unit exits, per the writer's own acceptance note.

Files cited: `/home/user/fleet/workspace/src/core/types.ts`, `/home/user/fleet/workspace/src/core/helpers.ts`, `/home/user/fleet/workspace/src/core/factories.ts`, `/home/user/fleet/workspace/src/core/errors.ts`, `/home/user/fleet/workspace/src/core/validators.ts`, `/home/user/fleet/workspace/src/core/constants.ts`, `/home/user/fleet/workspace/src/core/workspaces/Workspace.ts`, `/home/user/fleet/workspace/src/core/workspaces/WorkspaceManager.ts`, `/home/user/fleet/workspace/src/core/workspaces/stores/DatabaseWorkspaceStore.ts`, `/home/user/fleet/workspace/src/core/workspaces/stores/MemoryWorkspaceStore.ts`, `/home/user/fleet/workspace/guides/workspace.md`, `/home/user/scaffold/tmp/units/voice/voice-workspace.diff`, `/home/user/scaffold/tmp/units/voice/voice-workspace.status`, `/home/user/scaffold/tmp/units/voice/voice-workspace-report.md`.

## Checker lane (PASS)

Per-claim verdicts below.

Findings outside the claims:

Claim 1 — CONFIRMED. Every `-`/`+` pair in `/home/user/scaffold/tmp/units/voice/voice-workspace.diff` sits inside a `/** … */` block (each changed line begins with `/**` or ` * `). No hunk touches a non-comment token; verified line-by-line across all ten files (constants.ts:6-8, errors.ts:19-40, factories.ts:52-98, helpers.ts:110-221, types.ts:229-397, validators.ts:408-427, Workspace.ts:439-449, WorkspaceManager.ts:461-471, DatabaseWorkspaceStore.ts:483-493, MemoryWorkspaceStore.ts:505).

Claim 2 — CONFIRMED. Every backtick token, `{@link …}`, and URL is byte-identical between removed and added lines, except the mandated boolean `@returns` rewrites (errors.ts:39-40 `Whether the value is a workspace error` → `True if the value is a workspace error; false otherwise`; helpers.ts:123-124, 154-155; validators.ts:413-414, 426-427 — all follow the required `True if …; false otherwise` form) and the plain-English name-drops the brief treats as an observation rather than a break: `BinaryMIME` at types.ts:229-230 (drops "binary" before "MIME labels", keeps `{@link FileContent}` intact), `Position` at types.ts:263-264 (drops "position"), `WorkspaceOptions` at types.ts:318-320 (drops "options"), `WorkspaceSnapshot` at types.ts:328-329 (drops "snapshot"), `WorkspaceManagerOptions` at types.ts:383-385 (drops "options"), `DatabaseWorkspaceStore` at DatabaseWorkspaceStore.ts:483-484 (drops "store"), `MemoryWorkspaceStore` at MemoryWorkspaceStore.ts:505-506 (drops "store"). None of these seven touches a backticked token, `{@link …}`, or URL — they are plain-word rewordings, so they fall outside claim 2's constraint entirely and are also correctly reported as observations in the report (report lines 20-24, 91-93). No other token differs.

Claim 3 — CONFIRMED. `/home/user/scaffold/tmp/units/voice/voice-workspace.status` lists exactly the ten files under `src/core/` (status:1-10); nothing under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, `configs/`, `tests/setupPolicy.ts`, or `tests/policy.test.ts` appears.

Claim 4 — CONFIRMED. A case-insensitive grep for the listed imperative openers followed by a space or backtick, scoped to `/home/user/fleet/workspace/src`, returns no hit; a grep for `@returns Whether|@returns \`true\`|@returns true ` also returns no hit. `/home/user/fleet/workspace/app` does not exist in this tree (`Glob` for `app/**/*` found nothing), so `src/` is the tree's full applicable scope for this sweep and the claim's "no hit" condition holds over it.

Claim 5 — CONFIRMED on the quoted evidence. `/home/user/scaffold/tmp/units/voice/voice-workspace-report.md:48-58` quotes the exact command and exit code for each of `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, and `npm test` (all exit 0), with `npm test` broken down by sub-suite pass counts. Per the brief, this is the qualifying quoted-evidence case, so CONFIRMED rather than UNRESOLVED; the Orchestrator's own landing-chain run remains the authoritative gate run per the brief's own caveat.

Findings outside the claims:
- The report's block-count table (report lines 8-24) and the acceptance-instrument scan output (report lines 60-68, `imperative=0 verbless=0 returnsBad=0`) are self-reported by the writer and were not independently re-executed by this checker (no execution tools available). This is flagged as an observation, not a break, because claim 4's independent grep sweep corroborates the "no imperative opener, no bad boolean returns" outcome directly against the tree.
- No file outside the ten listed in the status was touched; `git status --short` in the report (line 75) agrees with the supplied `.status` file.

## Orchestrator

Subjective claim 1 broke on the `WorkspaceSnapshot` sentence, which gained a member list and `one` and lost `snapshot`. Ruled with the lane: `Represents a workspace's stored state in JSON-serializable form.` (fix-up brief `voice-workspace-fixup-brief.md`, builder on Sonnet). The lane's unevenness finding (`WorkspaceSnapshotRow` and `FileContent` keep their nouns) stands as permitted: each names the value, not merely the identifier. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
