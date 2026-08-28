# Fix dossier: workspace

Verified fix-producing findings for the `workspace` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s17-29 — DRIFT

29. package=`workspace` file=`workspace/src/core/helpers.ts:75,100` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Guards → `*/validators.ts`) verdict=CONFIRMED
    wrong: `isFile(value: unknown): value is FileInterface` and `isWorkspaceSnapshot(value: unknown): value is WorkspaceSnapshot` are total `Guard<T>`s over `unknown` sitting in `helpers.ts`; the package has no `validators.ts`. `isText`, `isBinary`, and `isValidRange` are correctly placed — they narrow a typed argument, so they are predicates rather than guards — which makes the two misplaced ones stand out rather than blend in.
    repair: Create `workspace/src/core/validators.ts`, move `isFile` and `isWorkspaceSnapshot` there together (the second calls the first), add `export * from './validators.js'` to `index.ts`, and update the import in `workspaces/stores/DatabaseWorkspaceStore.ts:7`.

## s17-31 — DRIFT

31. package=`workspace` file=`workspace/src/core/types.ts:11`, `workspace/src/core/factories.ts:77`, `workspace/src/core/helpers.ts:60,117`, `workspace/src/core/types.ts:3` rule=`.claude/rules/names.md` § Rejected naming ("Generic words: `data`, `info`, `item`, `thing`, `obj`") verdict=CONFIRMED
    wrong: The binary arm of `FileContent` names its member `data`, an explicitly rejected generic word, while the text arm names its member `text` for exactly what it holds. The member holds base64, and the sibling helper `decodedSize(base64: string)` already knows that.
    repair: Rename the member to `base64` in `types.ts:11`, `factories.ts:77-78`, `helpers.ts:60,61,117`, `isFile`'s check at `helpers.ts:83`, the guide's `FileContent` row and its `{ data, mime }` prose at `guides/workspace.md:200`, and the `@example` fences that spell the literal.

## s17-32 — DRIFT

32. package=`workspace` file=`workspace/src/core/helpers.ts:150` rule=`.claude/rules/names.md` § Standalone helpers (`{verb}{Noun}`) verdict=CONFIRMED
    wrong: `decodedSize` is adjective-noun, not `{verb}{Noun}`, and it is the only helper in the file that breaks the form — its neighbours are `inferLanguage`, `computeSize`, `countLines`, `clampPosition`, `clampRange`, `offsetAt`, `sliceRange`, `spliceRange`, and `escapeRegExp`.
    repair: Rename to `computeDecodedSize`, matching the `compute*` prefix the rule fixes for a deterministic calculation and the sibling `computeSize` it feeds. Update `helpers.ts:117` and the guide row at `guides/workspace.md:88`.

## s17-34 — DRIFT-RESHAPE

34. package=`workspace` file=`workspace/src/core/Workspace.ts:221` rule=`AGENTS.md` § Design laws ("Absence is `undefined`. Never invent sentinels such as … `''`") verdict=CONFIRMED
    wrong: `move(from, to?)` falls back to `this.#move(from, to ?? '')`, so a missing destination silently becomes a move to the path `''` rather than a refusal. The same `?? ''` sentinel appears at `Workspace.ts:183,198,208` for absent `content`, where it silently writes an empty file.
    repair: In `#move`, refuse an absent destination — the overload set already requires it when `from` is a string, so `if (to === undefined) return false` is the honest branch. For `write` / `prepend` / `append`, take the same decision explicitly rather than through a sentinel.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The `''` filler is real and is the shape the sentinel law names, and an untyped consumer of the published package still reaches it. The finding's repair is right for `move` and explicitly unspecified for `write` / `prepend` / `append` ('take the same decision explicitly'), and the obvious silent ear

**Lane DRIFT/medium:** amend: refuse explicitly in the implementation signature — `if (to === undefined) return false` for `move`, and an early return for `write` / `prepend` / `append` — and state the defect as unreachable filler rather than as a silent runtime defect.

**Lane DRIFT-RESHAPE/medium:** amend: in `#move` refuse an absent destination with `if (to === undefined) return false`, and in write / prepend / append throw the package's existing `WorkspaceError` for the absent-content case rather than defaulting to `''` — .claude/rules/typescript.md fixes an invalid argument as a thrown coded error, and a silent empty write is the outcome the finding objects to. Leave the array default at Workspace.ts:130 alone.

## s17-37 — DRIFT

37. package=`workspace` file=`workspace/src/core/Workspace.ts:116,218,231`, `workspace/src/core/WorkspaceManager.ts:112` rule=`.claude/rules/patterns.md` § Managers § Batch operations ("An id list applies to those items and returns true only when all succeed") verdict=EXEMPT
    wrong: `has(paths)` returns true when **any** path is present, and `move(mapping)` / `remove(paths)` / `WorkspaceManager.remove(ids)` return true when **any** one succeeded — the inverse of the rule's all-succeed contract. `template`'s `remove(ids)` implements the all-or-nothing form, so the two packages ship opposite batch semantics under the same signature.
    repair: None inside this unit — `guides/workspace.md:298,337,348,411` states the exception and its reason ("any present", "any one removal counts", "`remove` mirrors that leniency, reporting whether anything was actually dropped"). This is a rule-versus-guide conflict, referred below.

### Verification

**Judge (DRIFT/medium):** The rule text is unambiguous and the code is its inverse at the two sites the bullet reaches. The guide documents the behaviour but cannot grant an exemption, so the original EXEMPT does not survive. The split is fleet-wide rather than workspace's, which makes the resolution a canon decision rather

**Lane DRIFT/high:** amend: keep it out of this unit and surface it as a rule-versus-guide conflict for the user to rule on — either change workspace to all-succeed and rewrite guides/workspace.md:298,337,348,411, or amend patterns.md § Batch operations — recording that template already implements the rule's semantics.

**Lane EXCEPTION/medium:** amend: keep the documented behaviour and surface the conflict for a canon ruling, per AGENTS.md § Authority ('When they conflict, stop and surface the conflict'). If the ruling goes to the rule, the same change must conform has(paths), move(mapping), remove(paths) and WorkspaceManager.remove(ids) together and rewrite guides/workspace.md:298,337,348,411.

