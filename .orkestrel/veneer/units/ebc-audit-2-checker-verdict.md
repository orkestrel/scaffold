## Verdict — E-ID-BUTTON-CASCADE fix-round audit (claims 5, 6, 7)

**Claim 5 (Term).** `CONFIRMED`

A case-insensitive `\bbare\b` sweep across `src/`, `tests/`, `app/`, and `guides/` (`**/*.{ts,scss,md}`) returns no hit naming the button surface on the `button` tag. Every hit resolves to a different referent named in the claim itself or an equally distinct one: `.btn` with no role variant (`/home/user/veneer-ebc/tests/src/styles/components/button.test.ts:199`, `it('steps the bare class veil in a dark island...')`, using `.btn` alone with no `btn-primary`/etc.), a bare import (`guides/veneer.md:3218,3223,3264`; `tests/service/tailwind/{consumer,profiles}.test.ts`), a bare tag/element/attribute (`guides/veneer.md:5047`, `:3808`, `:4059`; `src/styles/_tokens.scss:368`), and a bare panel (`guides/veneer.md:5663,5707`; `tests/src/styles/components/offcanvas.test.ts:311-443`). No `BARE` constant exists anywhere in `src/`, `tests/`, `app/`, or `guides/`; the one `BARE-BUTTON` token is a historical work-unit code in `ROADMAP.md:297`, outside the claim's named directories.

**Claim 6 (Titles, comments, and names).** `CONFIRMED`

- Tag proof title (`ebc-4.diff` line ~1011, `tests/src/styles/elements/button.test.ts`): `'paints an empty-class, a utility-class, a consumer-class, and a target-attribute button with the surface a classless button wears, at rest and in every state, apart from the longhands a utility class writes over the surface'` — states the utility exception its assertions read.
- Reboot comment (`ebc-4.diff` line ~438-440, `src/styles/elements/_button.scss`): `// Every button keeps the release's margin, text transform, and button appearance, whatever class it carries.` — names exactly `margin`, `text-transform`, `appearance`, matching `BUTTON_KEPT_LONGHANDS` (`tests/setupStyles.ts:3216`).
- `BUTTON_KEPT_LONGHANDS` replaces `BUTTON_REBOOT_LONGHANDS` at every site: `tests/setupStyles.ts:3216`, `tests/src/styles/mixins.test.ts:22,207,208,219`, `tests/setupStyles.test.ts:373`; a repository-wide grep for `BUTTON_REBOOT_LONGHANDS` returns no hit.
- Badge comment (`ebc-4.diff` line ~508-511, `tests/app/browser/sections/BadgeSection.test.ts`): `// the 'btn' class alone paints its label in the page's body-text color, the '--vn-text-body-base' token, over the dark cell, with a transparent background.` — matches the reading in `/home/user/scaffold/.orkestrel/veneer/units/ebc-instruments/r3/logs/ebc-3-probe-badge.log.txt:2`: `"classes":"btn","buttonColor":"oklch(0.208 0.042 265.755)","bodyText":"oklch(0.208 0.042 265.755)","colorIsBodyText":true,"buttonBackground":"rgba(0, 0, 0, 0)"`.

**Claim 7 (Scope and law).** `UNRESOLVED` on one clause, otherwise held.

- File-level scope: `ebc-4-status.txt` and `ebc-3-status.txt` list the identical 26 files; round 4 touched no path outside round 3's. None of the touched paths fall in brief-3's off-limits set (`src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**`, `tests/setupServer.ts`, `tests/setupBrowser.ts`, or the vendored files). This confirms round 4 added no new file; it cannot independently confirm every round-3 file against "every file rounds 1 and 2 changed" without the round-1/2 diffs, which this brief does not supply — that sub-part is `UNRESOLVED`; the command that would settle it is a diff of `ebc-3.diff` against the round-2 report's own retained diff, neither of which is in the evidence set given to this lane.
- No non-null assertion, `@ts-*`, `eslint-disable`, nested function declaration, or hidden helper found in the added (`+`) lines of `ebc-4.diff` (checked by pattern sweep of the whole diff).
- Case titles: every added or changed title in the diff states what the case proves (e.g. `ebc-4.diff` lines ~994, 1011, 1145, 1176, 1279, `tests/src/styles/mixins.test.ts:195`, `tests/service/tailwind/consumer.test.ts:559`).
- `as`: the diff adds `] as const)` twice (`ebc-4.diff` lines 1214, 1271, inside `tests/src/styles/elements/button.test.ts`). This is the same idiom used 260 times elsewhere in the unmodified `tests/setupStyles.ts` (`grep -c "as const" tests/setupStyles.ts` → 260), so it is not a pattern round 3/4 introduces to the codebase, but it is textually a new `as` occurrence inside these rounds' own diff. Whether `as const` (literal-narrowing) falls inside `AGENTS.md`'s unconditional ban on "type assertions (`as`)" is a judgment call this checker cannot settle mechanically — referred to the subjective lane or the Orchestrator.

**Findings outside the claims:** none substantiated.

**Attacked and held:** claims 5 and 6, per the evidence above; claim 7's file-scope, syntax-ban (apart from the `as const` clause), and title clauses.

VERDICT: FAIL 7; outside the claims: none