# Disclosure landing (`dx`: DROPDOWN `a1b12ab`, NAV `77bb770`, COLLAPSE `041925c` over `e4e6a40`) — landing check

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only (Read, Grep, Glob). It writes nothing and runs nothing.

## Objective

Rule, claim by claim, whether the three-commit stack on the Veneer session branch carries the three units' owned files and shared patches with the exact integration edits and conflict resolutions the audit reconciliations ruled, and nothing else.

## Context

**Subject.** The Veneer checkout `/home/user/veneer` at `041925c` (`git log --format='%h %s' e4e6a40..041925c` is retained as `dx-landing-commits.txt`). Read the live files there; a verification chain runs in that checkout while you read, so treat `tmp/`, `dist/`, and `node_modules/` as off-limits and read only source, tests, and the guide.

**Evidence, all under `/home/user/scaffold/.orkestrel/veneer/units/`.**

- `dx-landing.diff` (`git diff e4e6a40 041925c`), `dx-landing-stat.txt`, `dx-landing-commits.txt`, `dx-landing-files.txt` (the files each commit touches).
- The units' returns: `dd-2.diff`, `dd-2-status.txt`, `dd-shared-2.patch`; `nv-2.diff`, `nv-2-status.txt`, `nv-shared-2.patch`; `co-2.diff`, `co-2-status.txt`, `co-shared-2.patch`.
- The landing instruments, each anchor-refusing: `dd-integration.py`, `nv-integration.py`, `nv-resolve.py`, `nv-seams.py`, `co-resolve.py`, `co-seams.py`.
- The rulings the instruments implement: `dd-audit-2-verdict.md` § Rulings, `nv-audit-2-verdict.md` § Rulings, `co-audit-verdict.md` § Rulings, and `co-brief-3.md` § Acceptance criteria (criterion 2 names the guide text COLLAPSE's patch carries).
- The commit messages: `dd-landing-message.txt`, `nv-landing-message.txt`, `co-landing-message.txt`.
- The fast gates over the stack: `dx-fast-gates.log.txt` (every `=== … exit=0`).

**Law.** `AGENTS.md` § Writing; `.claude/rules/writing.md`; `.claude/rules/documentation.md`. Skill: none. A test is named for what it proves rather than for the control that specified it.

**Standing conditions.** The barrel order for the disclosure keys is `validation`, `collapse`, `dropdown`, `button-group`, `nav`, `card` (`co-resolve.py` header). The `.nav-tabs .dropdown-menu` deferral row DROPDOWN carried is dropped at NAV's landing (D4, `nv-integration.py`). The family's R8 sentence is kept in NAV's wording, carried by DROPDOWN's patch, and COLLAPSE's variant is dropped (`co-resolve.py` header). `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and must be absent from the diff.

## Unknowns

None.

## Scope

Read-only over the evidence files and the Veneer source, tests, and guide. No edit, no command.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Claims

1. **Delta and scope.** The set of files `dx-landing.diff` touches equals the union of the owned files in `dd-2-status.txt`, `nv-2-status.txt`, and `co-2-status.txt` and the files `dd-shared-2.patch`, `nv-shared-2.patch`, and `co-shared-2.patch` touch; every removed line in `dx-landing.diff` is one a shared patch removes, one an integration instrument replaces, or one a three-way resolution reorders; and neither vendored file appears.
2. **The DROPDOWN integration edits are in the tree exactly** (`dd-integration.py`): the `DropdownSection.test.ts` comment reads "The journey photographs each specimen at 390 and at 1280 pixels, and the grid columns that seat each toggle reflow between those widths, so the room each menu keeps is read at each of them." (wrapped over two comment lines as the instrument writes it); `app/browser/constants.ts` and `guides/veneer.md` read "a dropdown engine writes when it" and no "placement engine"; the guide reads "records the behavior J-ENGINE owns."; the `tests/setupStyles.ts` comment reads "table, the button-group population, and the withheld population against the record together."; and in `tests/setup.ts` the gap rows precede the dropdown rows.
3. **The NAV integration edits and resolutions are in the tree exactly** (`nv-integration.py`, `nv-resolve.py`): the Tab plugin cell reads "writes `role`, `aria-selected`, `tabindex`, and `active`; `show` on the pane; in a dropdown, `active` on the toggle, `show` on the menu, and `aria-expanded` on the item. Owner: J-ENGINE."; the guide reads "does not paint over the tab's focus ring" and no "focus outline"; the `tests/setupStyles.test.ts` comment names "the link hover color slot and the tab hover border color slot"; the `tests/setupStyles.ts` comment opens "The `tests/setupStyles.test.ts` proof adds the navbar-bearing names back"; no `| \`.nav-tabs .dropdown-menu\`` row exists in the guide; and the `tests/conformance.test.ts` comment carries "and the nav partial joins the block at the release's position between the button group and the card".
4. **The COLLAPSE resolutions are in the tree exactly** (`co-resolve.py`, `co-seams.py`): `src/styles/index.scss` imports the disclosure keys in the order `validation`, `collapse`, `dropdown`, `button-group`, `nav`, `card`, and `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/app/browser/Showcase.test.ts`, and `tests/setupServer.test.ts` list Collapse before Dropdown at every site; the `tests/conformance.test.ts` comment carries "and it writes the collapse classes in its `transitions` partial, which Veneer writes as the `collapse` stem, so this case maps them"; the guide's plugin rows run Collapse, Dropdown, Tab, ScrollSpy, and the sentence "A `plugin` row records a behavior J-ENGINE owns, while the classes that behavior sets ship in the cascade and render in markup." appears exactly once, with COLLAPSE's variant (read it in `co-shared-2.patch`) absent; and every guide text `co-brief-3.md` criterion 2 names is present (§ Surface sentence, the § Tailwind sentences, `### Collapse classes` with its opening and closing sentences, the Files row, the selector rows, the plugin row ending "Owner: J-ENGINE.", the recipe fences, the § Tests link).
5. **The seams are joined** (`nv-seams.py`, `co-seams.py`): in `app/browser/constants.ts` the last Nav specimen entry closes and the array closes before the Collapse copy comment and the last Dropdown entry closes before the Nav copy comment; in `tests/setup.ts` the `collapse-shown` row and the `nav-base` row each open with `Object.freeze({` after the preceding row's `}),`; in `tests/setupStyles.test.ts` the `describe('nav case tables'` block follows a closed block; and in `tests/setupStyles.ts` the dropdown tables close with `])` before the nav doc comments. Cite each site.
6. **Prose law.** The integration texts named in claims 2 to 4 and the three commit messages carry no term the substitution table in `.claude/rules/writing.md` bans unconditionally, no count of a growable set (a run measurement with its command is permitted), and follow each code token with a noun where `.claude/rules/writing.md` requires one (a CSS token or Sass variable stands alone). List every hit with its ruling.
7. **The stack.** `dx-landing-commits.txt` shows exactly the three commits in the order DROPDOWN, NAV, COLLAPSE over `e4e6a40`, and each commit's subject line equals the first line of its retained landing message.

## Output

Return, as the final message, one verdict per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED`) with `file:line` evidence, findings outside the claims, and the single terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. No process diary; state no count of a growable set.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Where an evidence file is missing or a claim's site cannot be located, rule the claim `NOT-EVIDENCED` and name what is missing rather than stopping.

## Acceptance criteria

A verdict on every claim with evidence and the terminal line.

## Review evidence

The diff and status evidence named under Context.
