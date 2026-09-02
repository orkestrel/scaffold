# Unit voice-tool — report

Every TSDoc block under `src/` of `/home/user/fleet/tool` now opens with a third-person `-s` verb
sentence, and both boolean `@returns` read `True if …; false otherwise`. The gate chain exits 0 at
every step. No deviation.

The package has no `app/` directory, so the sweep covered `src/**` only.

## Counts by kind

A block can carry more than one kind, so the kinds sum past the distinct-block total. Blocks
rewritten: 42 of 43. The one untouched block is `toolToDefinition` in `src/core/helpers.ts`, whose
`Projects a tool onto the plain definition advertised to a caller.` already satisfies the rule.

| Kind                                             | Count |
| ------------------------------------------------ | ----- |
| First sentence from the imperative                | 14    |
| First sentence given a verb                       | 28    |
| First sentence reworded to drop the symbol's name | 17    |
| Boolean `@returns`                                | 2     |

Every one of the 17 name-drop rewrites overlaps another kind: 16 were also verbless, and
`ToolInterface.execute` (`Execute the tool.` → `Runs the tool's handler.`) was also imperative.

The launch scan reported `imperative=15`; reading each hit puts one of them —
`ToolCall.caller`, `Consumer-asserted caller context, forwarded without verification.` — in the
verbless bucket instead, exactly the over-approximation the brief named. `ToolOptions`
(`Options for creating an executable tool.`) sat in the scan's third-person bucket because
`Options` matches the `-s` pattern; it is a bare noun phrase, so it was rewritten to
`Configures an executable tool.`

## Acceptance instrument, re-run after the sweep

Running the brief's `voice-scan.mjs` classifier over `/home/user/fleet/tool` after the sweep:

```text
files=7 blocks=43 imperative=0 verbless=0 returnsBad=0
```

Launch reading was `files=7 blocks=43 imperative=15 verbless=26 returnsBad=2`. The block total is
unchanged, so no block was added, removed, or merged.

## Files touched

- `/home/user/fleet/tool/src/core/types.ts` — 37 doc blocks rewritten: interface and type-alias
  first sentences given a verb, member first sentences reworded off their own identifiers, the
  `ToolManagerInterface` method sentences moved from the imperative, and `remove(name)`'s boolean
  `@returns` moved to the ruled form.
- `/home/user/fleet/tool/src/core/factories.ts` — `Create` → `Creates` on `createTool` and
  `createToolManager`.
- `/home/user/fleet/tool/src/core/validators.ts` — `Determine whether` → `Determines whether` on
  `isToolCall`, and its boolean `@returns` moved to the ruled form.
- `/home/user/fleet/tool/src/core/tools/Tool.ts` — the class first sentence given a verb
  (`Binds an executable tool definition to a handler.`).
- `/home/user/fleet/tool/src/core/tools/ToolManager.ts` — the class first sentence given a verb
  (`Registers tools in insertion order with per-call error isolation.`).

`src/core/helpers.ts` and `src/core/index.ts` were not modified.

## Gates

Run from `/home/user/fleet/tool` on 2026-09-02, in the order the shared brief names.

| Command                | Exit | Result                                                     |
| ---------------------- | ---- | ---------------------------------------------------------- |
| `npm run format:check` | 0    | All matched files use the correct format (41 files)         |
| `npm run lint:check`   | 0    | No output                                                   |
| `npm run check`        | 0    | `tsconfig.json` and `configs/src/tsconfig.core.json` clean  |
| `npm run build`        | 0    | ESM and CJS bundles plus declarations emitted               |
| `npm test`             | 0    | `src`, `policy`, `config` (46), `setup` (4), `guides` (23)  |

No gate failed, so there is no failure excerpt. No mutating `lint` or `format` run was needed:
`format:check` passed on the first attempt. `npm test` timing is an observation from inside this
unit's own exec; the Orchestrator's landing chain is the authoritative run.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-tool.diff` — `git diff`, 307 lines.
- `/home/user/scaffold/tmp/units/voice/voice-tool.status` — `git status --short`, listing only the
  five modified files under `src/`.

Checks against the acceptance criteria:

- Every added and removed line in the diff begins with `*`, `/**`, or `//`. A filter that drops
  comment lines from the diff's changed lines returns nothing, so no code token moved.
- No changed line carries `@param`, `@remarks`, `@example`, `@throws`, or `@deprecated`. The only
  changed `@returns` lines are the two boolean ones. `{@link ToolCall}` survives byte-identical in
  every sentence that carried it.
- The tree is uncommitted and unstaged.

## Deviations

none. No guide or test pins a rewritten sentence: searching `guides/`, `tests/`, and `README.md`
for each rewritten first sentence returned one hit, `Determine whether a repository-relative Vue
path belongs to a browser application.` in `tests/setup.ts`, which is that file's own comment
rather than a quotation of a `src/` sentence and sits outside this unit's scope.
