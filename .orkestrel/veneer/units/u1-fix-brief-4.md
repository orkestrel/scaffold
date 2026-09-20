# Unit U1-fix — successor brief 4

## What this supersedes

This brief supersedes `tmp/units/u1-fix-brief-3.md`; briefs 1 to 3 stand as landed in `a0447d2`.
Same role and engine: `builder` on native Sonnet, sole writer in
`C:/Users/mikes/WebstormProjects/veneer` (clean at `a0447d2`), performing the assignment directly
and spawning nothing. No `git` command that writes.

## Why a successor

Audit round 3 (`u1-fix-audit-verdict.md` § Round 3 under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`) confirmed successor 3 except the
RTL guard: a regex over stylesheet text misses `calc()` values with spaces, `!important`,
uppercase properties, and reports declarations inside comments or quoted content; its return
value carries the preceding delimiter; its property sets sit as hidden module constants; and its
`read*` prefix names the wrong operation (`names.md` § helper prefixes: `scan*` walks a structure
and returns its findings). Two of these trace to the Orchestrator's brief 3 (the name, the
text-based approach). The fix uses the CSS tooling the workspace declares: `postcss` (installed,
`package.json` devDependencies) parses the cascade; no regex over raw text remains.

## Scope ruling on direction sensitivity

A declaration is direction-sensitive when, after lowercasing the property:

- it is a physical inline-axis longhand: `margin-left`, `margin-right`, `padding-left`,
  `padding-right`, `left`, `right`, `float`, `clear`, `border-left`, `border-right`,
  `border-left-width`, `border-right-width`, `border-left-style`, `border-right-style`,
  `border-left-color`, `border-right-color`, `border-top-left-radius`,
  `border-top-right-radius`, `border-bottom-left-radius`, `border-bottom-right-radius`,
  `background-position-x`;
- it is `text-align` or `background-position` whose value (lowercased) contains the keyword
  `left` or `right` as a whole word;
- it is `margin`, `padding`, `inset`, `border-width`, `border-style`, or `border-color` with
  four top-level values whose second and fourth differ;
- it is `border-radius` with two top-level values that differ, three whose first and second
  differ, or four whose first and second or third and fourth differ.

Top-level values are the value split on whitespace outside parentheses (so `calc(1px + 2px)` is
one value); `!important` is not part of the value (postcss exposes it as `decl.important`).
Comments and strings are not declarations (postcss never yields them as `Declaration` nodes).

## Fixes

1. **`scanPhysicalDeclaration`** replaces `readPhysicalDeclaration` in `tests/setupStyles.ts`:
   `scanPhysicalDeclaration(css: string): string | undefined` parses `css` with
   `postcss.parse`, walks every `Declaration` node in document order, and returns the first
   direction-sensitive declaration as `prop: value` (the node's `prop` and `value`, without
   delimiters or `!important`), or `undefined`. The property sets and the keyword set are
   exported frozen constants in the same module (`PHYSICAL_LONGHANDS`, `EDGE_SHORTHANDS`,
   `RADIUS_SHORTHAND`, `SIDE_KEYWORDS`, or names you choose that say what they hold), and the
   top-level value splitter is an exported helper (`splitTopLevelValues(value): readonly string[]`);
   nothing hidden remains. TSDoc on each export opens with a third-person verb and states the
   return exactly.
2. **Proof** in `tests/setupStyles.test.ts`: the export set (now the helper, the splitter, and
   the constants); the splitter on `0 calc(1px + var(--gap)) 0 2px` → four values; the scanner
   on each of these, flagged with the exact returned string: `padding-left:1px` →
   `padding-left: 1px`; `:root{margin:0 1px 0 2px}` → `margin: 0 1px 0 2px`;
   `margin:0 calc(1px + var(--gap)) 0 2px` → that declaration; `MARGIN-LEFT:1px` →
   `margin-left: 1px`; `margin:0 1px 0 2px !important` → `margin: 0 1px 0 2px`;
   `text-align:right`; `border-radius:1px 2px`; `border-radius:1px 1px 2px 3px`;
   `background-position:left center`; and permitted (returns `undefined`): `margin:0 1px`,
   `margin:0 1px 0 1px`, `border-radius:1px 1px 2px 2px`, `padding-inline-start:1px`,
   `inset-inline:0`, `:root{content:" left:1px"}`, `/* margin-left:1px */`, the layer
   statement alone; and the cascade case calling it on the built `index.css` with the RTL
   byte-identity assertion, as before.
3. **Report prose** (finding 20): in `tmp/units/u1-fix-report.md`, replace "the three" and
   "the four owned files" with the members named, and append `## Successor 4` per § Output.
4. **Gates.** `npm run format:check`, `lint:check`, `check`, `test:setup`, `test:src:styles`
   (which builds first), `test:conformance`. Record each command's final lines.

## Scope

**Owned.** `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tmp/units/u1-fix-report.md`.
**Off-limits.** Everything else. Add no dependency; `postcss` is already declared.

## Output

Append `## Successor 4` to `tmp/units/u1-fix-report.md`: each fixture with the scanner's return,
the gate readings, and `git status --porcelain`; return that section.

## Acceptance criteria

1. The gates in step 4 exit 0.
2. Every fixture above reads as specified.
3. `git status --porcelain` lists only the two owned test files.
