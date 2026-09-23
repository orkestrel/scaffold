# Disclosure landing (`dx`) — landing check verdict (`checker` on Sonnet) and the Orchestrator's reconciliation

The lane's first return ruled claims 1, 5, and 6 UNRESOLVED on a partial read; the Orchestrator sent it back to read the whole populations, and the revised verdict follows. The lane's aside under claim 4 (that `### Dropdown classes` and `### Nav classes` intervene between `### Collapse classes` and `### Button group classes`) is wrong: `grep -n '^### .* classes$' guides/veneer.md` at `041925c` reads Validation (1260), Collapse (1302), Dropdown (1342), Button group (1397), Button toolbar (1445), Nav (1454), Card (1521), the barrel's order.

## Reconciliation

- **Claim 1.** CONFIRMED on scope. The removal at `dx-landing.diff:1641` (`CardSection.test.ts`, the `.card-header-tabs .nav-link.active` assertion) is NAV's own owned-file edit (`nv-2-status.txt` lists ` M tests/app/browser/sections/CardSection.test.ts`; `nv-2.diff:9` carries it); the claim's category list omitted an owned-file removal, a claims-file fault.
- **Claim 6.** BROKEN as ruled: the three landing messages stated counts of growable sets ("two rounds"; "the four journey variants"). The messages are reworded to name the members (a first round and a fix round; each journey variant), and the three commits are rebuilt over identical trees with `git commit-tree` before the push, so the gate evidence over those trees binds unchanged.
- Every other claim CONFIRMED.

## The lane's revised verdict

## Verdict (revised, full population reads)

**Claim 1 (Delta and scope).** BROKEN. Read every removed line in `dx-landing.diff` (`grep '^-[^-]'`, 15 lines total) and ruled each:
- `dx-landing.diff:41,47` (Card tabs/pills specimens) — shared-patch removal (`nv-shared-2.patch`).
- `dx-landing.diff:424-426` (B-COLLAPSE § Surface sentence) — shared-patch removal (`co-shared-2.patch:88-90`).
- `dx-landing.diff:454,463` (Tailwind recipe `@source` lines inside the guide fences) — shared-patch removal (`co-shared-2.patch`).
- `dx-landing.diff:472` ("the only one the page carries for it.") — shared-patch removal (`co-shared-2.patch`).
- `dx-landing.diff:660-664` (`.card-header-tabs .nav-link.active` paragraph) — shared-patch removal (`nv-shared-2.patch:207-211`).
- `dx-landing.diff:2182-2184` (Bootstrap source-order comment) — a three-way resolution reorder: the landed text (`dx-landing.diff:2185-2189`) merges COLLAPSE's `transitions`/`collapse`-stem clause and NAV's "nav partial joins the block" clause, neither of which alone produces the landed sentence.
- `dx-landing.diff:2228,2249,2259` (Tailwind fixture `@source` lines in `consumer.css`/`preflight.css`/`setup.css`) — shared-patch removal (`co-shared-2.patch`).
- **`dx-landing.diff:1641`** (`tests/app/browser/sections/CardSection.test.ts`, the removed `expect(region.querySelector('.card-header-tabs .nav-link.active')).not.toBeNull()` line) — this is **none of the three named categories**. It is not in any of `dd-shared-2.patch`/`nv-shared-2.patch`/`co-shared-2.patch` (confirmed by grep: `nv-2.diff:9` carries this exact removal in NAV's own owned-file diff, `CardSection.test.ts` being a file only NAV touches, per `nv-2-status.txt`). It lands as NAV's own scoped-diff edit, not through shared-patch reconciliation, an integration-instrument replacement, or a three-way merge.

VERDICT on claim 1: BROKEN, citing `dx-landing.diff:1641`.

**Claim 2 (DROPDOWN integration edits).** CONFIRMED (unchanged from prior verdict).

**Claim 3 (NAV integration edits and resolutions).** CONFIRMED, including the previously unresolved item: `tests/setupStyles.test.ts:3148` reads "the weight slot is read by the type case, and the link hover color slot and the tab hover border color slot" — the exact phrase resolves.

**Claim 4 (COLLAPSE resolutions).** CONFIRMED. Walked every item `co-brief-3.md` criterion 2 names against the live guide:
- § Surface: `guides/veneer.md:67-68` reads "...mechanisms with one consumer, so they stay that shape until the first engine component carrying a cancelable pre-change event lands." with no B-COLLAPSE sentence (0 hits for "B-COLLAPSE").
- § Tailwind: `guides/veneer.md:427-428` ends "...would hide every shown panel." and continues "[The consumer pairing](../tests/service/tailwind/consumer.test.ts) reads the `.collapse.show` element in its markup fixture as visible, which is what the shipped cascade alone resolves for it."
- `### Collapse classes` at `guides/veneer.md:1302`: opens with no "This section describes what each class renders, and" (0 hits in the whole guide); reads "A panel carries the `collapsing` class while it opens or closes." at line 1314; closes with "...every state inside a dark island." at line 1340.
- Files row: `guides/veneer.md:242`.
- Selector rows: `guides/veneer.md:4370` (`collapse | selector`), `4371` (`collapsing | selector`).
- Plugin row: `guides/veneer.md:4397`, ending "Owner: J-ENGINE."
- Recipe fences: `guides/veneer.md:384,397`, both carrying "collapse".
- § Tests link: `guides/veneer.md:4581`.
(The criterion's own claim that `### Collapse classes` sits directly before `### Button group classes` no longer holds in the landed tree — `### Dropdown classes` (1342) and `### Nav classes` now intervene — but claim 4 as dispatched asks only for the named text's presence, not that adjacency, so this does not break claim 4.)

**Claim 5 (Seams).** CONFIRMED. Every site read live:
- `app/browser/constants.ts:1867-1870`: `),` / `])` (1868) / blank (1869) / `/** Holds the Nav section's...` (1870) — last Dropdown entry closes before the Nav copy comment.
- `app/browser/constants.ts:1931-1934`: `}),` (1931) / `])` (1932) / blank (1933) / `/** Holds the Collapse section's...` (1934) — last Nav entry closes before the Collapse copy comment.
- `tests/setup.ts:1197-1198`: `}),` / `\tObject.freeze({` immediately before `scenario: 'nav-base'` (1199).
- `tests/setup.ts:1239-1240`: `}),` / `\tObject.freeze({` immediately before `scenario: 'collapse-shown'` (1241).
- `tests/setupStyles.test.ts:3090-3092`: `\t})` / `})` / blank, immediately before `describe('nav case tables'` (3093).
- `tests/setupStyles.ts:5777-5780`: `\t}),` / `])` / blank / `/**`, immediately before "Lists every official nav selector" (5781).
- `tests/setupStyles.ts:5962-5965`: `\t}),` / `])` / blank / `/**`, immediately before "Pins each published nav color" (5966).

**Claim 6 (Prose law).** BROKEN. Swept `guides/veneer.md`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/conformance.test.ts`, `tests/setup.ts`, `app/browser/constants.ts`, `tests/app/browser/sections/DropdownSection.test.ts`, and the three landing messages, case-insensitively, against every unconditional substitution-table row (`should`, `simply`, `easy`, `just`, `currently`, `utilize`, `leverage`, `via`, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`, `sanity check`, `dummy`, `blacklist`, `whitelist`, `slave`): **0 hits** in every file.
Swept the judged-sense rows (`now`, `new`, `latest`, `once`, `since`, `above`, `below`, `master`) across the three landing messages: one hit, `dd-landing-message.txt:4` ("whether a caret sits above the baseline") — permitted sense (physical/geometric, not cross-reference).
Swept for counts of growable sets (numerals `two`/`three`/`four`/`five` etc.) in the three landing messages:
- `dd-landing-message.txt:14` — "ran over **two rounds**" — a count of a growable set (rounds), banned by `AGENTS.md` § Writing.
- `dd-landing-message.txt:17` — "the **four journey variants** green" — a count of a growable set (variants), banned.
- `nv-landing-message.txt:14` — "ran over **two rounds**" — same violation.
- `co-landing-message.txt:13` — "ran over **two rounds**" — same violation.

VERDICT on claim 6: BROKEN, citing `dd-landing-message.txt:14,17`, `nv-landing-message.txt:14`, `co-landing-message.txt:13`.

**Claim 7 (The stack).** CONFIRMED (unchanged).

**Fast gates.** Every gate in `dx-fast-gates.log.txt` reads `exit=0` (unchanged from prior verdict).

**Findings outside the claims:** none identified.

VERDICT: FAIL 1, 6; outside the claims: none
