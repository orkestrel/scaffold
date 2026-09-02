# Audit verdict — unit voice-tool

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `04c0395`
(`units/voice-tool.diff`, `units/voice-tool.status`, `units/voice-tool-report.md`).
Rewritten per the writer: imperative 14, verbless 28, name 17, returns 2. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (FAIL 1, 2)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice) on Claude Opus 5, the writer's engine, as the brief records for the dark Sol bench.

1. Meaning kept in every rewritten first sentence — BROKEN. All 42 rewritten first sentences read against their originals in the supplied diff, not a sample. Forty preserve action, subject, and qualifiers. Two change meaning: (a) /home/user/fleet/tool/src/core/tools/ToolManager.ts:12, "An insertion-ordered tool registry with per-call error isolation." -> "Registers tools in insertion order with per-call error isolation." — the qualifier "with per-call error isolation" moved from the entity onto the verb phrase, asserting that registration is error-isolated; isolation lives only in the execution path (ToolManager.ts:87-114, reached from execute), never in add. The rewrite also drops the entity noun "registry" and narrows the class's stated job to registration. (b) /home/user/fleet/tool/src/core/types.ts:84 and :110, "A concise description to advertise in place of the full description." -> "Advertises a concise description in place of the full description." — the original makes the summary the thing advertised; the rewrite makes the data field the agent, contradicting the same block's @remarks at types.ts:80-81 ("`summary`, when present, is advertised in place of the full `description` by a {@link ToolManagerInterface}").

2. Third-person -s verb that fits the symbol and never repeats the symbol's name — BROKEN. Every one of the 42 openers is a third-person -s verb, so the form requirement holds without exception. The fit fails at the same three lines. ToolManager.ts:12: "Registers" misdescribes the symbol; the guide states the class keeps, advertises, and executes (guides/tool.md:7-9, :87-94), its interface keeps the noun (types.ts:122 "Represents a registry of executable tools with per-call error isolation."), and its factory keeps it too (factories.ts:27 "Creates an empty tool registry."). The class doc is now the only place in the package that does not call it a registry. types.ts:84 and :110: "Advertises" attributes an action to a readonly data field that guides/tool.md:154 assigns to definitions(). Considered and rejected as a break: "Executes one call with error isolation." (types.ts:171), "Finds one registered tool by name." (types.ts:148), "Lists the registered tools…" (types.ts:155), "Removes one registered tool." (types.ts:185) — the rule's own examples make a method's third-person verb form the model (Creates for createTool), so a verb matching the member identifier is not the banned repetition; the ban targets restating the identifier as the description's substance, which "Identifies the tool a caller selects." (types.ts:10, :106) correctly fixes.

3. Boolean @returns reads "True if …; false otherwise" with the original condition kept — CONFIRMED. types.ts:188 ("Whether the tool was present" -> "True if the tool was present; false otherwise") and validators.ts:13 ("`true` when the value has the complete tool-call shape" -> "True if the value has the complete tool-call shape; false otherwise"). Backtick drop is the form the wave brief prescribes. types.ts:195 already read the ruled form and was left alone. No other boolean return exists in src/.

4. No already-satisfying first sentence rewritten; diff touches no @example, @param, @remarks, @throws, or later sentence — CONFIRMED. Every removed line opens with an imperative (Create, Register, Find, List, Execute, Remove, Determine) or a bare noun phrase; none already carried a third-person -s verb. helpers.ts:4 ("Projects a tool onto the plain definition advertised to a caller.") already satisfied the rule and is untouched. All @param, @remarks, @throws, and @example lines appear as diff context; the only changed @returns lines are the two boolean ones; the later paragraph in the definitions() block (types.ts:163-165) is unchanged; {@link ToolCall} survives byte-identical. src/core/index.ts carries no doc block, so no src/ block was left behind.

Findings outside the claims:

Required changes:

1. /home/user/fleet/tool/src/core/tools/ToolManager.ts:12 — the first sentence misattributes per-call error isolation to registration and no longer names the class as a registry. It matters because a reader learns the wrong thing about where failures are contained, and the class contradicts its own interface (types.ts:122), its factory (factories.ts:27), and the guide (guides/tool.md:7-9, :87-94). Right: "Represents an insertion-ordered registry of executable tools with per-call error isolation." Or, if the verb form is preferred, name both actions: "Registers tools in insertion order and executes calls with per-call error isolation."

2. /home/user/fleet/tool/src/core/types.ts:84 and /home/user/fleet/tool/src/core/types.ts:110 — "Advertises …" makes a readonly data field the actor, contradicting the block's own @remarks two lines later (types.ts:80-81) and guides/tool.md:154. A reader is told the field does something the manager does. Right: the wave's prescribed property form — "Holds a concise description advertised in place of the full description."

Findings outside the claims:

- Vocabulary coherence holds where drift was plausible, and the concern is struck after testing it against the shipped artifact. ToolInterface.execute reads "Runs the tool's handler." (types.ts:87) while ToolManagerInterface.execute reads "Executes one call with error isolation." (types.ts:171). guides/tool.md:104 already says "Runs the handler with the supplied arguments…" and guides/tool.md:114 says "Executes one call or a readonly batch…", and .claude/rules/names.md:213 glosses execute itself as "Run primary work to completion", so its ban on run is a ban on the identifier rather than the gloss. The TSDoc mirrors the guide. Struck, not retained.
- Observation, no change required: the three name fields take three verbs — "Identifies the tool a caller selects." (types.ts:10, :106), "Selects the tool to execute." (types.ts:30), "Identifies the called tool." (types.ts:48, :64). The split is meaningful and reads deliberately.
- Observation, no change required: opener verbs vary by symbol kind (Describes for data shapes, Reports for outcomes, Represents for the type alias and abstract interfaces, Configures for the options bag, Holds for schema fields). Each fits its subject better than a uniform Represents would.

Referrals: none. The gate results in the writer's report (voice-tool-report.md:64-70) and the post-sweep voice-scan.mjs reading are outside this lane and belong to the Orchestrator's authoritative run; neither was relied on nor contradicted.

Paths read: /home/user/scaffold/tmp/units/voice/voice-tool-audit-subjective-brief.md, /home/user/scaffold/tmp/units/voice/voice-tool-brief.md, /home/user/scaffold/tmp/units/voice/voice-tool-report.md, /home/user/scaffold/tmp/units/voice/voice-tool.diff, /home/user/scaffold/tmp/units/voice/voice-tool.status, /home/user/scaffold/.orkestrel/campaign/fix/tsdoc-wave-brief.md, /home/user/scaffold/.claude/rules/typescript.md, /home/user/scaffold/.claude/rules/names.md, /home/user/fleet/tool/src/core/types.ts, /home/user/fleet/tool/src/core/factories.ts, /home/user/fleet/tool/src/core/validators.ts, /home/user/fleet/tool/src/core/helpers.ts, /home/user/fleet/tool/src/core/index.ts, /home/user/fleet/tool/src/core/tools/Tool.ts, /home/user/fleet/tool/src/core/tools/ToolManager.ts, /home/user/fleet/tool/guides/tool.md

## Checker lane (PASS)

Claims 1-5 evaluated against the actual diff, status, tree, and report for unit voice-tool in /home/user/fleet/tool.

Findings outside the claims:

1. CONFIRMED. Every hunk in /home/user/scaffold/tmp/units/voice/voice-tool.diff changes text inside a `/**...*/` block only. Every `-`/`+` pair sits between a `/**` open and a `*/` close (e.g. voice-tool.diff:9-10, 18-19, 31-32, 44-45, 57-58, 64-96, 100-284, 294-304); no hunk touches a code token, signature, or non-comment line.

2. CONFIRMED. Grepped every backtick token across the diff (voice-tool.diff:61,80,104-105,121,123,139,148,169,228,242,298,300,303,307): every backtick token and `{@link ToolCall}`/`{@link ToolResult}` occurrence is byte-identical between removed and added lines except the two boolean `@returns` rewrites, which drop backticked `true`/`false` under the ruled exception:
   - voice-tool.diff:268-269 `@returns Whether the tool was present` → `True if the tool was present; false otherwise`
   - voice-tool.diff:303-304 `@returns \`true\` when the value has the complete tool-call shape` → `True if the value has the complete tool-call shape; false otherwise`
   No other backtick token or URL changed; no name-drop-of-own-identifier case was found requiring the observation carve-out.

3. CONFIRMED. /home/user/scaffold/tmp/units/voice/voice-tool.status lists exactly five modified files, all under `src/core/`: `src/core/factories.ts`, `src/core/tools/Tool.ts`, `src/core/tools/ToolManager.ts`, `src/core/types.ts`, `src/core/validators.ts`. Nothing under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, `configs/`, `tests/setupPolicy.ts`, or `tests/policy.test.ts` appears.

4. CONFIRMED. Grep of `/home/user/fleet/tool/src` for the named imperative-verb list at doc-block first-line position, and for `@returns Whether|`true`|true ` returned no violating hit. The one grep hit (`/home/user/fleet/tool/src/core/validators.ts:10`, "Adversarial values return `false`.") sits inside an `@remarks` block body, not the first line of the doc block (the first line is `validators.ts:5`, "Determines whether an unknown value is structurally a {@link ToolCall}."), so it is not a rule violation. `/home/user/fleet/tool/app` does not exist, consistent with the report's statement that the package has no `app/` directory.

5. CONFIRMED on quoted evidence, per the claim's own rule. The report (voice-tool-report.md:64-74) quotes the exact command and exit code for every gate — `npm run format:check` (0), `npm run lint:check` (0), `npm run check` (0), `npm run build` (0), `npm test` (0) — with a brief result excerpt for each. Per the claim's instruction this is CONFIRMED on the quoted evidence, and the Orchestrator's own landing-chain run remains the authoritative gate result rather than this unit's self-reported exec.

Findings outside the claims: none material. The report's deviation section states no deviation and its search for guide/test sentences pinning a rewritten first sentence found only an unrelated comment in `tests/setup.ts` outside this unit's scope — consistent with the diff and status evidence reviewed here.

## Orchestrator

Subjective claims 1 and 2 broke on the `ToolManager` summary (`Registers …` moved the isolation qualifier onto registration and dropped the registry noun) and the two `summary` fields (`Advertises` made a data field the agent). Ruled: `Represents an insertion-ordered tool registry with per-call error isolation.` and `Holds a concise description to advertise in place of the full description.` (fix-up brief `voice-tool-fixup-brief.md`, builder on Sonnet). The method sentences whose verb matches the member identifier stand, as the lane ruled. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
