# U6 audit — checker report (native Sonnet, 2026-09-20, 84 s)

## A. Types and constant

`MediaOptions` in `src/browser/types.ts:192-198`: exactly `print?` and `motion?`, both
`readonly boolean`, each with a TSDoc description. `POINTER_HOLD` in `src/browser/constants.ts:204`
equals `'data-pointer-hold'` and sits immediately after `IMPLICIT_ROLES` (`:161`, closing at `:196`)
with nothing after it. `src/browser/index.ts:25-26` star-exports `./types.js` and `./constants.js`,
which carry both names. **PASS**

## B. Guide parity

`Surface` rows present for `MediaOptions`, `POINTER_HOLD`, `sendProtocol`, `hoverAccessible`,
`holdAccessible`, `releasePointer`, `stageMedia`, `releaseMedia`; each `Summary` cell equals the
first TSDoc description sentence in `types.ts:192`, `constants.ts:199`, `helpers.ts:249`, `:279`,
`:310`, `:370`, `:465`, `:513`. The `readStyle` and `readPixels` signature cells carry
`pseudo?: string`. Every added `Voices` row matches its `throw new Error(...)` template
(`helpers.ts:507`, `:510`, `:583`, `:602`, `:2325`, `:2328`, `:2599`, `:2622`). The candidate-ruling
table carries `A hover verb`, `A pointer hold`, `A pseudo-element style read`, `A medium
emulation`, `A DevTools command door`, `A general media-feature map`, `A scoped hold taking a
callback`; the bounds bullets cover the painted scale, the top-level origin, the provider-page
override, the refused pseudo argument, and the Chromium-family reach. Patterns headings route
through `tests/setup.ts:561-563` to `tests/src/browser/helpers.test.ts:662` (`holds the pressed
paint and restores it on release`), `:838` (`distinguishes pseudo-element paint from its
originating element`), `:887` (`pins the base, stages motion and print, and restores the host
medium`). **PASS** (`test:guides` green is a gate reading, not reproduced here)

## C. Controls

Red assertions: `u6-plant-scale-red.log.txt:19` `AssertionError: expected 16 to be 32`;
`u6-plant-pseudo-red.log:19` `expected '0px' to be '7px'`; `u6-plant-release-red.log:21`
`expected 32 to be 16`. `grep -n "PLANT-" tests/src/browser/helpers.test.ts src/browser/helpers.ts`
returns nothing in the live tree. **PASS**

## D. Names

Each of the new public names has 0 hits across
`veneer/node_modules/@orkestrel/scaffold/dist/host/guides/*.md`. **PASS**

## E. Scope and forbidden syntax

The diff changes exactly `guides/test.md`, `src/browser/constants.ts`, `src/browser/helpers.ts`,
`src/browser/types.ts`, `tests/setup.ts`, `tests/src/browser/helpers.test.ts`. The `tests/setup.ts`
hunk adds the three `ROUTED_FENCES` entries and nothing else. Added lines carry no type assertion
(the two ` as ` hits are prose), no `!.`/`!)`, no `: any`, no `@ts-`, no `eslint-disable`.
**PASS** (untracked new files were not cross-checked against `git status`; the verifier's status
reading covers that)

## F. Writing sweep

No hit for the unconditionally banned terms in the added guide prose or TSDoc. The only `new`
hits are the `throw new Error(...)` keyword in code. No hit for `now`, `once`, `since`, `above`,
`below`. **PASS**

## Referrals

None.
