# Report — `d7n-msg-close`

## The predecessor's hunks

The predecessor left four hunks across `guides/msg.md` and `src/core/constants.ts` (status before this unit's own work: `M guides/msg.md`, `M src/core/constants.ts`).

1. **`### Types` convention sentence rewrite (guides/msg.md).** Replaced the off-canon sentence with Ruling 15's exact wording. Correct as written — kept.
2. **`MSGMutableFieldData`'s index-signature cell (guides/msg.md).** Changed `[key: string]` to `[key]`, dropping the index-signature's key type. Wrong: `mcp/guides/mcp.md`'s already-converged `MCPResult`/`MCPLegacyResult` rows keep `[key: string]` — the index type is part of the member's name notation, not a value-type annotation the ban on spelled types reaches. Corrected back to `[key: string]`.
3. **`MSGFieldData`'s empty `Shape` cell filled with every data member (guides/msg.md).** Verified the full member list against the `src/core/types.ts` declaration — an exact match, correctly ordered, every `?` placed. Correct — kept.
4. **`MSGSourceInterface`'s `Shape` cell (guides/msg.md).** Changed to `plus parse, attachment`, dropping the empty-braces prefix for an interface with no data members. Wrong: `browser/guides/browser.md`, `console/guides/console.md`, and `contract/guides/contract.md`'s converged method-only interfaces all read `{} plus …`. Corrected to `{} plus parse, attachment`.

Two hunks in `src/core/constants.ts` (`MSG_UNUSED_BLOCK`, `MSG_END_OF_CHAIN` doc blocks, each gaining its sentinel literal) were correct and kept as the seed for item 1's constants-table pass below.

## Items

1. **The `Shape` idiom.**
   - Fixed the two predecessor hunks above (`[key: string]`, `{} plus`).
   - Converted the `### Constants` table's `Value` header to `Shape` (declared type, never a literal type), added the sentence "A `Shape` cell holds the constant's declared type." between the section's prose and the table, and moved every constant's literal that was missing from its declaration's description paragraph into that paragraph (33 doc blocks in `src/core/constants.ts`: the two `MSG_*_BIG_BLOCK_MARK` values, every CFB header/directory-entry offset, `MSG_PROP_NO_INDEX`, `MSG_MAX_HIERARCHY_DEPTH`, the four `MSG_CATEGORY_*` bytes, the four `MSG_PREFIX_*` strings, the two `MSG_FIELD_*` tag strings, the three `MSG_MAPI_RECIPIENT_*` values, `FALLBACK_CHARSET`, and `FALLBACK_ATTACHMENT_NAME`). Constants whose description already carried the literal (`MSG_SECTOR_SIZE`, the burner geometry constants, the extension/MIME-type arrays, and so on) were left untouched.
   - Converted the `### Validators` guard table (`isRecord`, `isEmailFormat`, `isEmailAttachment`, `isEmailMessage`, `isEmailChain`) from a `Signature` column to `Shape`, holding only the narrowed type, under "In a guard table a `Shape` cell holds the type the guard narrows to." The mixed `### Errors` table (`MSGError` class beside `isMSGError`) keeps its `Signature` column per Ruling 20's mixed-table exception.
   - Ran `npm run docs -- --to guide` to resync every `Summary` cell to the edited source paragraphs, then `npx oxfmt --write` to re-align the tables.
2. **Member references.** No sites listed; no change.
3. **The drop-in's canon.** The body region (`const root = ` through the manifest loop's closing brace) already matched the pilot byte for byte. Fixed the two named deviations: replaced the three-line header comment with the pilot's canonical text (dropping the package's own extended header and the struck "only part a sibling package changes" clause), and corrected the `INTERNAL` block's sentence from "the second assertion below" to "the assertion that follows it" (Ruling 13's amendment). The package's own file-scope constants (`GUIDE_SPEC`, `MODULES`, `INTERNAL`, `ROOT_FILES`) and its own `describe('flagship fences')` section, appended after the pilot's cases, are unchanged.
4. **Fence lead-ins.** Added "Narrows the `createMSG` `Result` with `isSuccess` before reading the parsed `chain`'s format." between the "Parse an email file and read its format" heading and its fence. Swept the rest of the guide for a heading directly above a fence; none remain.
5. **Propagation.** Ran `npx oxfmt --write guides/msg.md tests/guides.test.ts`, then `npm run docs`, `npm run docs -- --to guide`, and `npm run docs -- --to source` to confirm convergence.

## Acceptance criteria

1. `git status --short` in `/home/user/fleet/msg`:
   ```
    M guides/msg.md
    M src/core/constants.ts
    M tests/guides.test.ts
   ```
   Owned files only.
2. `grep -n '| interface *| \`{[^\`]*:' guides/msg.md` prints the `Success<T>`/`Failure<E>` discriminant rows (`success: true`/`success: false`) and `MSGMutableFieldData`'s `[key: string]` row — the same shape the already-converged `abort/guides/test.md` and `mcp/guides/mcp.md` carry for a discriminant literal and an index signature, not a spelled member type. `grep -n '…' guides/msg.md` prints nothing. Every table carrying `Shape` (`### Types`, `### Constants`, `### Validators`) has its convention sentence between heading and table.
3. The item 3 region diff against `/home/user/fleet/abort/tests/guides.test.ts` lines 47–258 versus `/home/user/fleet/msg/tests/guides.test.ts` lines 87–298 is empty (`diff` produced no output); line 2 equals the pilot's ("this repo's own \`guides/README.md\` manifest. The constants that follow are this").
4. `npx oxfmt --check guides/msg.md tests/guides.test.ts` — "All matched files use the correct format." Exit 0.
   `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` — no output. Exit 0.
5. `npm run docs` — `rows read: 1, disagreements found: 0`. Exit 0.
   `npm run docs -- --to guide` — `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
   `npm run docs -- --to source` — `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
6. `npm run test:guides` — `Test Files 1 passed (1)`, `Tests 36 passed (36)`, duration 2.49s. Exit 0.
   `npm run test:policy` — `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, duration 660ms. Exit 0.

Wall clock for this unit's work: approximately 25 minutes.

## Files touched

- `/home/user/fleet/msg/guides/msg.md`
- `/home/user/fleet/msg/src/core/constants.ts`
- `/home/user/fleet/msg/tests/guides.test.ts`

---

Orchestrator's annotation (2026-09-08, closure): the checker ruled claim 2 FAIL on this report's prose alone (a count stated about a growable set); every citation was verified against the tree, and the tree is authoritative.
