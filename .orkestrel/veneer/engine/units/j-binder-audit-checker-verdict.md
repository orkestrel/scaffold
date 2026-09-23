# J-BINDER audit round 1 — the checker's verdict (returned 2026-09-23 by checker on Sonnet, native subagent, 18 tool uses, 180 s; retained verbatim from the subagent's final message, HTML entities decoded)

---

**Role and lane:** `checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only.

## Numbered verdicts

**Claim 8 — Names live in constants (E9): CONFIRMED**
Evidence: `src/browser/constants.ts` (diff) defines `BUTTON_EVENTS`, `BUTTON_SELECTOR`, `BUTTON_ACTIVE`, `BUTTON_PRESSED`, `TARGET_ATTRIBUTE`, `LINK_ATTRIBUTE`, `CONFIG_ATTRIBUTE`, `OPTION_PREFIX`, `COLOR_MODE_ATTRIBUTE`, `COLOR_MODE_KEY`. Direct read of `C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/Button.ts`, `Delegate.ts`, `validators.ts`, and a grep of `helpers.ts` for `data-bs|aria-|toggle\.vn|active|href` show every hit is either the constant declaration in `constants.ts` (excluded file), a doc-block/comment reference, or the local variable name `href` — never a runtime literal in the four named files.

**Claim 9 — E6 and the fleet names: CONFIRMED**
Evidence: diff shows `isButtonHost`→`isHost` (no alias), `BUTTON_TOGGLE` replaced outright by `BUTTON_EVENTS` (grep for `BUTTON_TOGGLE` in the diff finds only the deletion line and a removed guide row), the next-click release path deleted (`Delegate.ts` diff: `#activate` no longer contains the pre-release loop), `#buttons`/`static #hosts` deleted (`Button.ts` `#hosts` line removed; `Delegate.ts` `#buttons` line removed), and the Button-shaped guide paragraph removed (`guides/veneer.md` diff hunk deleting the "mechanisms with one consumer" paragraph). The standing-deviation text matches `decisions.md` E10 verbatim (`HostSnapshot` in J-TYPES round 5, `isHost`→`isInstance` deletion in J-BINDER round 2). `j-binder-gates.log.txt` (independent, Orchestrator-run `test:policy`) reports exactly two `surface` violations (`Snapshot`, `isHost`), corroborating "no other export... collides."

**Claim 10 — Scope, parity, and proofs: UNRESOLVED**
Met on independent evidence: file count (`j-binder-status.txt` lists 14 modified + 4 new, all in the brief's Owned set); the `ButtonSection.test.ts` patch (exact diff present in the report); the guide's added rows/removed rows and `## Engine` with `### Events`, `### Delegation`, `### Ownership and restoration`, `### Motion` (`j-binder.diff`); `check:src:browser`, oxlint, oxfmt, `test:guides` (19/19), and the `build:src:browser` failure on `Sanitizer` — all independently confirmed in `j-binder-gates.log.txt`.
Not independently resolvable: the sub-claims "the rewritten Delegate proof ran red on the seed (4 failed of 16) and green after" and "every new assertion names a mutation it distinguishes" rest solely on the report's own quoted red-first record and mutation table (`j-binder-report.md` §§ Red-first records, Mutations). No Orchestrator-run log corroborates those specific numbers or the mutation instrument's output. Per the brief's own rule ("a claim whose only evidence is the report's quoted command is UNRESOLVED") and the skill's verdict shape, this sub-claim's weakness carries the whole compound claim to `UNRESOLVED`.

## Checklist of mechanical items

| item | status | evidence |
| --- | --- | --- |
| Diff touches only owned files; ColorMode only in the prose bound | met | `j-binder-status.txt` file list matches brief § Scope; `j-binder.diff` `ColorMode.ts` hunk changes only the one `@remarks` sentence |
| No `any`/`as `/`!`/`@ts-`/`eslint-disable`/sentinel `null`/`public`/`protected`/`private`/parameter property/default export | met | grep of `src/browser/*.ts` for the banned patterns returns only prose/doc hits and DOM-return `null` comparisons (`helpers.ts:156,158,236,248`) |
| One class plus imports (`Registry.ts`, `Snapshot.ts`, `Button.ts`, `Delegate.ts`) | met | direct read of each file: one `export class` plus import statements |
| No nested function declaration outside an anonymous callback argument | met | `Delegate.ts` `#activate`/`#mark`/`#acquire`/`#release` are class methods; `helpers.ts` callbacks are all passed directly as arguments (`addEventListener`, `.filter`, `.map`) |
| Doc block first sentence: third-person `-s` verb, never names the symbol | met | `Registry.ts:6` "Records which engine…"; `Snapshot.ts:5` "Records host state…"; `helpers.ts` `emitEvent`/`bindEventMap`/`settleAnimations`/`reflow`/`readTargets`/`readTarget`/`generateId`/`resolveOptions` doc openers; `validators.ts` `isHost`/`isButtonEvent` doc openers — none names its own symbol |
| Every added export has a § Surface row; removed export's row gone | met | `guides/veneer.md` diff adds rows for `BUTTON_EVENTS`, `BUTTON_PRESSED`, `TARGET_ATTRIBUTE`, `LINK_ATTRIBUTE`, `CONFIG_ATTRIBUTE`, `OPTION_PREFIX`, `Registry`, `Snapshot`, `isHost`, `generateId`, `readTarget`, `readTargets`, `reflow`, `resolveOptions`, `settleAnimations`; drops `BUTTON_TOGGLE` and `isButtonHost` rows |
| `RegistryInterface`/`SnapshotInterface` § Methods tables match members | met | `Registry.ts implements RegistryInterface<TEngine>` (`claim`/`find`/`release`), `Snapshot.ts implements SnapshotInterface` (`save`/`restore`); `check:src:browser exit=0` in `j-binder-gates.log.txt` type-checks the `implements` clause |
| No Bootstrap literal inline in `Button.ts`/`Delegate.ts`/`helpers.ts`/`validators.ts` | met (attacked and held) | grep for `data-bs\|aria-\|toggle\.vn\|active\|href` across `src/browser` finds one hit in `Delegate.ts:54`, a doc **comment** quoting the constant's value (`data-bs-toggle="button"`), never a functional literal; every runtime literal lives in `constants.ts` |
| Installed-primitive probe (no re-implemented `@orkestrel/test`/`@orkestrel/contract` export) | met | `Registry`, `Snapshot`, `settleAnimations`, `reflow`, `generateId`, `readTarget(s)`, `resolveOptions` are engine-specific logic with no matching export in `node_modules/@orkestrel/test/dist/src/{core,browser}/index.d.ts` or `@orkestrel/contract`'s core entry; `isHost`/`isInstance` is the already-named E10 deviation |
| No `writing.md` § Substitutions term unconditionally in added prose | met | grep of the diff for the banned-term list returns only the JS keyword `new` (`new Registry`, `new Snapshot`, etc.), never prose usage |
| No new file outside the brief's owned set; no moved file | met | new files `Registry.ts`, `Snapshot.ts`, `Registry.test.ts`, `Snapshot.test.ts` are named `(new)` in brief § Scope Owned |
| Report's "Rulings taken" names a bounding rule per ruling | met | E6, E10, Unknown 1, Unknown 2, R5, `architecture.md` § Kind purity are each cited against the ruling they bound (`j-binder-report.md` §Rulings taken) |

## Referrals

- Whether the sub-claim of claim 10 resting only on the report's mutation table and red-first record should be settled by an independent re-run of `mutate.mjs` (or a fresh red/green reproduction) rather than left `UNRESOLVED` is a judgment call for the objective/subjective lanes or the Orchestrator, not this checker.

## Attacked and held

- Claim 8's "no Bootstrap literal inline" was attacked with a grep for `data-bs` across the four named files; the sole hit (`Delegate.ts:54`) is a doc comment quoting the constant's value, not a functional literal, so the claim held.

VERDICT: FAIL 10; outside the claims: none
