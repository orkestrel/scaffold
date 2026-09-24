# J-ISINSTANCE audit — the checker's verdict (returned 2026-09-24 by `checker` on Sonnet, native subagent, 21 tool uses, 53 s; retained verbatim from the subagent's return text; the Orchestrator's note follows)

VERDICT

Role and lane: `checker` on Sonnet, native Claude subagent, `Read`/`Grep`/`Glob` only, mechanical conformance.

**Checklist**

1. Met. `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-isinstance-status.txt:1-5` lists exactly ` M src/browser/Button.ts`, ` M src/browser/Collapse.ts`, ` M src/browser/Delegate.ts`, ` M src/browser/parsers.ts`, ` M src/browser/validators.ts`, all `M`, no other file.

2. Met. Grep `instanceOf\(HTMLElement\)\(` over `src/browser` returned no matches. Grep `isInstance\(` over `src/browser` returned exactly: `Button.ts:41`; `Collapse.ts:86`; `Delegate.ts:147,149,160,173` (four sites: `#conflicts` twice, `#routeButton`, `#routeCollapse`); `parsers.ts:25`; `validators.ts:107,138` — nine hits across the six named sites, matching the item's enumeration exactly.

3. Met. `Collapse.ts:324,340` both read `.filter(instanceOf(HTMLElement))` unchanged (predicate form retained); `parsers.ts:28` reads `.find(instanceOf(HTMLElement))` unchanged. `helpers.ts:164` reads `.filter(instanceOf(HTMLElement))` (the `readTargets` predicate site) unchanged, and `helpers.ts` is absent from the status list (item 1's evidence), confirming it is untouched.

4. Met. Every file importing `instanceOf` still uses it: `Collapse.ts:9` imports `{ instanceOf, isInstance }`, uses both (`isInstance` at `86`, `instanceOf` at `324,340`); `parsers.ts:1` imports `{ instanceOf, isInstance }`, uses both (`isInstance` at `25`, `instanceOf` at `28`). Every file using `isInstance` imports it from `@orkestrel/contract`: `Button.ts:3` `import { isInstance } from '@orkestrel/contract'`; `Delegate.ts:9` `import { isInstance } from '@orkestrel/contract'`; `validators.ts:3` `import { isInstance, literalOf } from '@orkestrel/contract'`. No stale unused import found in the grepped import lines for `Button.ts`, `Delegate.ts`, `validators.ts`, `Collapse.ts`, `parsers.ts`.

5. Met. `validators.ts:107` `if (!isInstance(value, CustomEvent)) return false` and `validators.ts:138` `return isInstance(value, CustomEvent) && value.detail === null`, both inside their existing `try` blocks (diff hunk context, `j-isinstance.diff:136-150`). The `isButtonEvent` remark's replaced sentence (`j-isinstance.diff:126-129`) reads "routes through `isInstance`, which narrows `CustomEvent`'s own generic constructor to `CustomEvent<unknown>`, so `detail` reads as `unknown` rather than as `any`" — no sentence naming `object` as the narrowing target remains (the removed lines naming `object` are the diff's `-` lines, not the shipped text). The installed declaration `node_modules/@orkestrel/contract/dist/src/core/index.d.ts:2888` reads `export declare function isInstance<C extends abstract new (...args: never) => object>(value: unknown, ctor: C): value is InstanceType<C>;`, which supports narrowing `CustomEvent` to `InstanceType<typeof CustomEvent>` (i.e. `CustomEvent<unknown>`), consistent with the remark's claim.

6. Met, on the diff read. `j-isinstance.diff` contains five file hunks, each hunk being one import swap or one call-site swap (item 2's set), one guard's class-half swap (`validators.ts:137,146` in the diff), or the remark's two replaced sentences (`validators.ts:122-129` in the diff). No test file appears in the diff's file list (`Button.ts`, `Collapse.ts`, `Delegate.ts`, `parsers.ts`, `validators.ts` only, matching item 1's status list).

7. Met on the diff's added (`+`) lines. Scanning every `+` line in `j-isinstance.diff` for `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a parameter property, a default export, or a nested function declaration: none appear. The remark's added prose (`j-isinstance.diff:126-129`) contains none of the terms `writing.md` § Substitutions bans unconditionally (`should`, `simply`/`easy`/`just`, `currently`/`now`, `new`/`latest`, `utilize`/`leverage`, `via`, `in order to`, `e.g.`/`i.e.`, `etc.`, `performant`/`robust`, `allows you to`, `and/or`, causal `since`, temporal `once`, `above`/`below`, `please`, `sanity check`, `dummy`, `blacklist`/`whitelist`, `master`/`slave`).

8. UNRESOLVED. No `j-isinstance-report.md` exists in `.orkestrel/veneer/engine/units/` (`Glob` of `j-isinstance-*` in that directory returned only `j-isinstance-brief.md`, `j-isinstance-status.txt`, and this checker's own brief — no report file). The brief's named `j-isinstance-gates.log.txt` is likewise absent, consistent with the brief's own note that the Orchestrator's run is written after the checker launches. Per the brief's instruction, this absence is not ruled not-met on its own; it is recorded `UNRESOLVED` pending the report and gate log.

**Referrals**

None. Every item resolved to met, or is UNRESOLVED strictly for the absent-artifact reason the brief pre-authorizes; no judgment call was required.

VERDICT: FAIL 8; outside the claims: none

---

The Orchestrator's note: item 8's artifacts were written in the same action as the checker's launch and landed after it read; `j-isinstance-report.md` records that no `prove` call was made and that the throwaway probe `tmp/probe-isinstance.ts` was removed, and `j-isinstance-status.txt` (item 1) lists no such file, so item 8 is met on the retained evidence. The gate log `j-isinstance-gates.log.txt` closes the unit's acceptance in `j-isinstance-audit-verdict.md`.
