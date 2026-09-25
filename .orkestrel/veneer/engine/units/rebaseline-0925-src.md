<!-- Grok lane recon-src, session 65d58d2f-7b61-434f-87ca-2a4c30634123 -->

I'll read the brief and follow its instructions exactly.The brief is a read-only conformance check. I'll read the law files first, then search the Veneer engine sources for each mechanical rule.Law is loaded. Next I’ll inventory the engine sources and search each mechanical rule.The first pass mixed English “as” with assertions. I’ll scan the sources with a stricter pattern and pull declarations the keyword search cut off.The keyword search is too noisy. I’ll run a code-token scan so comments and `as const` stay out of the evidence.Question
Mechanical conformance of `veneer/src/browser/**` and `veneer/src/core/**` to the coding contract's assertion, suppression, access, nesting, placement, sentinel, and single-word rules.

Evidence
1. none found. Search: `\bas\b` in `veneer/src/browser/**/*.ts` and `veneer/src/core/**/*.ts`, then code lines `^\t.*\bas\b`. Every code hit is `as const`: `veneer/src/browser/Modal.ts:311`, `veneer/src/browser/Modal.ts:386`, `veneer/src/browser/Modal.ts:402`, `veneer/src/browser/Offcanvas.ts:302`, `veneer/src/browser/Offcanvas.ts:313`, `veneer/src/browser/Offcanvas.ts:389`, `veneer/src/browser/Offcanvas.ts:398`, and `} as const` through `veneer/src/core/constants.ts:22`–`veneer/src/core/constants.ts:306`. Import and export aliases: `\bimport\b.*\bas\b` and `\bexport\b.*\bas\b` returned no matches. Postfix `!`: `\w!`, `\)!`, and `\]!` returned no matches.

2. none found. Search: `\bany\b|@ts-ignore|@ts-expect-error|@ts-nocheck|eslint-disable`. Core returned no matches. Browser hits are the word `any` in comments, `AbortSignal.any` at `veneer/src/browser/Offcanvas.ts:278`, `veneer/src/browser/Delegate.ts:890`, and `veneer/src/browser/Delegate.ts:960`, and the comment phrase `` `any` `` at `veneer/src/browser/validators.ts:119`. No directive hit.

3. none found. Search: `\b(public|protected|private)\b|export default` in both trees.

4. none found. Search: `\bfunction\b` and `=>` in both trees. `function` declarations sit at module scope in `veneer/src/browser/helpers.ts`, `veneer/src/browser/validators.ts`, `veneer/src/browser/parsers.ts`, and `isAppError` at `veneer/src/core/errors.ts:52`. Every `=>` in a body is an anonymous callback passed directly as an argument (`addEventListener`, `filter`, `map`, `flatMap`, `find`, `some`, `every`, `reduce`, `forEach`, `Promise`, `setTimeout`, `MutationObserver`, `ResizeObserver`, `IntersectionObserver`, `.then`, and the `write` argument of `#apply`), or it sits in a type position or a comment example.

5. none found. Search: `^(export )?(type |interface |function |class |enum |const )` plus per-file `^(export |class |type |interface |function |const )` on `Popover.ts`, `Delegate.ts`, `Swipe.ts`, and `Registry.ts`. Named types and interfaces are only in `veneer/src/browser/types.ts` and `veneer/src/core/types.ts`. Constants are only in the two `constants.ts` files. Guards are in `veneer/src/browser/validators.ts` (`isColorModeState` at `veneer/src/browser/validators.ts:40` and the `is*` functions). Parsers are the `parse*` functions in `veneer/src/browser/parsers.ts`. The error class and `isAppError` are in `veneer/src/core/errors.ts`. Each implementation file has one `export class`.

6. none found. Search: `'(none|unset|unknown)'`, `: ''`, `| ''`, `| -1`, `-1 |`, and `\b(kind|type)\??:`. Runtime strings and indexes appear at `veneer/src/browser/Placement.ts:118`, `veneer/src/browser/Modal.ts:377`, `veneer/src/browser/Tooltip.ts:535`, `veneer/src/browser/helpers.ts:338`, and `veneer/src/browser/Carousel.ts:293`. The only `type` binding is the parameter at `veneer/src/browser/helpers.ts:34`. No `kind` member.

7. none found after the external-format exclusion. Search: `readonly [a-z]+[A-Z]` and `^\t+[a-z]+[A-Z][A-Za-z]*\(` in both `types.ts` files, plus quoted keys `^\t+['\"]`. CamelCase members, all named by an external format in the adjacent comment: `relatedTarget` at `veneer/src/browser/types.ts:252`, `veneer/src/browser/types.ts:1247`, and `veneer/src/browser/types.ts:2270` (Bootstrap's `relatedTarget` field); `dataAttributes` at `veneer/src/browser/types.ts:804` (the HTML sanitizer dictionary field); `setHTML` at `veneer/src/browser/types.ts:839` (the platform method). `veneer/src/core/types.ts` has no interface members.

Distillate
The engine sources under `veneer/src/browser` and `veneer/src/core` show `as const` only, no suppression directives, no access modifiers or default exports, no nested function outside a direct callback, one class per implementation file with kinds in their centralized files, no absence sentinel in a type and no `kind` or `type` discriminant, and no single-word violation left after the external-format names are set aside.

Unknowns
Anonymous type arguments at `veneer/src/browser/Modal.ts:162` and `veneer/src/browser/Offcanvas.ts:167` are generic arguments inside constructors, not `type` or `interface` declarations, so item 5 does not list them. Postfix `!` was searched on identifiers, `)`, and `]`; a `!` after a string or template was not a separate pattern. Item 4 was classified by reading every `function` and `=>` hit, without a TypeScript parser. A shell tokenizer was rejected, so the scan is ripgrep plus those reads.

Journal
Read `scaffold/AGENTS.md`, `scaffold/.claude/rules/names.md`, `scaffold/.claude/rules/typescript.md`, and `scaffold/.claude/rules/architecture.md`, then the declaration and member sites in `veneer/src/browser` and `veneer/src/core`. Did not read `veneer/tmp/**`.

Deviation
none
