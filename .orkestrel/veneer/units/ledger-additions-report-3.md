# LEDGER-ADDITIONS round 3 — report

Unit `ledger-additions-brief-3.md`, executed by `opus` on Opus 5.5 in `/home/user/veneer-lad` over Veneer `2376710`.
Every Item landed, the plant fails the new assertion, and every acceptance gate exits 0. Deviation state: none.

## Name ruling

The reader is `collectMatchingClasses`.

- It keeps the `collect*` prefix, which `.claude/rules/names.md` § Standalone helpers fixes for a helper that gathers
  members into a collection, and follows `{verb}{Noun}`.
- It doesn't use `subject`, which in CSS names a selector's last compound.
- `Matching` names what the function returns: the classes of the selector the rule matches through, which is the reason
  Item 3 states. `:is()` was drafted in Selectors Level 4 as `:matches()`, so the word names the matches-any
  pseudo-classes whose arguments the reader reads through, and excludes `:not()` and `:has()`.
- It is told apart from `collectSelectorClasses`, which returns the classes at the selector's own level only. The TSDoc
  of both functions keeps that split.
- The reviewer's proposal `collectRequiredClasses` was rejected: `:is(.alpha, .beta)` matches an element carrying either
  class, so neither class is required.
- The search `grep -rl "collectMatchingClasses\|collectRequiredClasses" node_modules/@orkestrel guides tests src` over
  the worktree came back empty before the rename, and `npm run test:policy`, which runs the fleet `surface` rule, exits
  0 after it.

## Evidence readings

Each reading matched the brief before editing: `collectSubjectClasses` at `tests/setupServer.ts` around line 1875 with
the `/:(?:is|where)$/iu` test; `readIdentifier` imported from `tests/setupStyles.ts` and decoding escapes through
`readEscape`; the `attributeSelector` TSDoc and call around lines 2444 and 2464; `matchSelectorKey`'s `@param classes`
around line 1812 naming `collectSelectorClasses`; the import, export-list entry, and reading case in
`tests/setupServer.test.ts`; and the § Additions sentence in `guides/veneer.md`.

## Items

### Item 1 — Claim 1, the escaped function name

Before, in `collectSubjectClasses`:

```ts
	for (const step of steps) {
		if (step.literal) continue
		if (step.char === '(' || step.char === '[') {
			readable.push(
				readable.every(Boolean) &&
					step.char === '(' &&
					/:(?:is|where)$/iu.test(selector.slice(0, step.index)),
			)
			continue
		}
```

After, in `collectMatchingClasses`:

```ts
	let colon: number | undefined
	for (const step of steps) {
		if (step.literal) continue
		if (step.char === ':') colon = step.index
		if (step.char === '(' || step.char === '[') {
			const name = colon === undefined ? undefined : readIdentifier(steps, colon + 1)
			readable.push(
				readable.every(Boolean) &&
					step.char === '(' &&
					name?.end === step.index &&
					['is', 'where'].includes(name.text.toLowerCase()),
			)
			continue
		}
```

The reader records the latest syntax colon, decodes the identifier after it through `readIdentifier`, requires that
identifier to end at the parenthesis, and compares its lower-cased text with `is` and `where`. A colon written as an
escape is literal, so it opens no function name. `toLowerCase` folds `:iſ(` to `iſ`, not `is`, which keeps the ASCII
case-insensitive match CSS specifies; the `iu` regex flags would have folded `ſ` to `s`.

The assertion added to the reading case, whose source string carries the CSS escape `\77 `:

```ts
		expect(collectMatchingClasses(':\\77 here(.nav-link)')).toEqual(['nav-link'])
```

Failing first, before the fix, with the assertion in place under the old name:
`npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts` reported
`Tests  1 failed | 117 passed (118)`, `AssertionError: expected [] to deeply equal [ 'nav-link' ]`, exit 1
(`tmp/units/lad-3-red.log.txt`). The same command after the fix reported `Tests  118 passed (118)`, exit 0
(`tmp/units/lad-3-green-setup.log.txt`). The failing test is `server setup > reads the classes an :is() or a :where()
argument writes as the selector's own, and none a :not() or a :has() argument writes`.

### Item 2 — N1, the rename and TSDoc

The function is renamed at every site: its declaration and `@example`, the `attributeSelector` call and the TSDoc that
names it, `matchSelectorKey`'s `@param`, and, in `tests/setupServer.test.ts`, the import, the sorted export-list entry
(moved to sit after `collectMandatedRelatives`), and every call in the reading case. A tree search for
`collectSubjectClasses` outside `node_modules`, `tmp`, and `.git` returns nothing.

Before:

```ts
/**
 * Collects every class a selector writes for the elements it matches, reading through `:is()` and
 * `:where()`.
 * ...
 * @remarks
 * An `:is()` or a `:where()` argument matches the element the selector matches, so its classes
 * name that element as the selector's own classes do. `:where(button.nav-link)` writes
 * `.nav-link` at zero specificity, and the attribution this reading feeds places it where the
 * `.nav-link` selector sits. A `:not()` argument names an element the selector excludes, and a
 * `:has()` argument names a relative, so neither reaches this reading. The
 * {@link collectSelectorClasses} helper keeps its own contract for its other callers.
```

After:

```ts
/**
 * Collects every class a selector writes, reading through `:is()` and `:where()` arguments.
 * ...
 * @remarks
 * An `:is()` or `:where()` argument is part of the selector the rule matches through, while a
 * `:not()` argument names what the rule excludes and a `:has()` argument names a relative, so this
 * reading returns the classes an `:is()` or a `:where()` argument writes and none a `:not()` or a
 * `:has()` argument writes. `:where(button.nav-link)` writes `.nav-link` at zero specificity, and
 * the attribution this reading feeds places it where the `.nav-link` selector sits. A returned class
 * can sit in any compound of the selector, so `:is(.alpha, .beta) > .gamma` returns the parent's
 * classes beside the element's own.
 *
 * The reading recognizes a function by its name as the {@link readIdentifier} helper decodes it,
 * folded to lower case, so `:WHERE(` and `:\77 here(` each open a `:where()` argument. The
 * {@link collectSelectorClasses} helper keeps its own contract for its other callers.
 *
 * @example
 * collectMatchingClasses(':where(button.nav-link):not(.disabled)') // ['nav-link']
```

The `@param` and `@returns` text is unchanged. The added remark sentences state the any-compound reading that N1 found
missing and the decoded-name recognition that Item 1 adds.

### Item 3 — Claim 7, the § Additions reason

Before, in `guides/veneer.md` § Additions:

> Attribution reads a class written inside an `:is()` or a `:where()` argument as the rule's own, because that argument
> matches the element the rule matches. It reads no class inside a `:not()` or a `:has()` argument.

After:

> Attribution reads a class written inside an `:is()` or a `:where()` argument as the rule's own, because an `:is()` or
> `:where()` argument is part of the selector the rule matches through, while a `:not()` argument names what the rule
> excludes and a `:has()` argument names a relative. It reads no class inside a `:not()` or a `:has()` argument.

The rest of the paragraph keeps its words. Its lines from "`:has()` argument. So each button reboot rule" through
"no key opens its name. The" are rewrapped to the 100-column width, and the lines after them are unchanged. No other
guide sentence names the reader.

### Item 4 — N2, `matchSelectorKey`'s `@param`

Before: ` * @param classes - The selector's classes, as the {@link collectSelectorClasses} helper reads them.`

After: ` * @param classes - The selector's classes, as the {@link collectMatchingClasses} helper reads them.`

## Plant reading

`tmp/units/lad-3-plant.sh` restored the raw-spelling test (`/:(?:is|where)$/iu.test(selector.slice(0, step.index))`) in
place of the decoded comparison and ran the setup project. `tmp/units/lad-3-plant-escaped.log.txt` records
`AssertionError: expected [] to deeply equal [ 'nav-link' ]` at `tests/setupServer.test.ts:2918:59`, the new escaped
assertion, in the reading case alone, with `Tests  1 failed | 117 passed (118)` and exit 1. The script then restored the
backup: `cmp=identical`, and the `src diffstat:` line is empty.

## Gates

Each gate ran from `tmp/units/lad-3-gates.sh` under the scratchpad `npm11` `PATH`, logged to the named file with the load
average first and `exit=$?` last.

| Gate                                                                                                             | Log                                     | Result                                      |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------- |
| `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check guides/veneer.md tests/setupServer.ts tests/setupServer.test.ts` | `tmp/units/lad-3-oxfmt-owned.log.txt`   | exit=0                                      |
| `npm run check`                                                                                                  | `tmp/units/lad-3-check.log.txt`         | exit=0                                      |
| `npm run lint:check`                                                                                             | `tmp/units/lad-3-lint-check.log.txt`    | exit=0                                      |
| `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts`                    | `tmp/units/lad-3-setup.log.txt`         | `Tests  118 passed (118)`, exit=0           |
| `npm run test:conformance`                                                                                       | `tmp/units/lad-3-test-conformance.log.txt` | `Tests  29 passed (29)`, exit=0          |
| `npm run test:guides`                                                                                            | `tmp/units/lad-3-test-guides.log.txt`   | `Test Files  1 passed (1)`, exit=0          |
| `npm run test:policy`                                                                                            | `tmp/units/lad-3-test-policy.log.txt`   | `Tests  109 passed \| 1 skipped (110)`, exit=0 |

The conformance run reports the same pass line round 2 recorded, so decoding the name changed no attribution the gate
reads. The policy skip is present in round 2's `lad-2-test-policy.log.txt` too.

## Diff and status

- `tmp/units/lad-3.diff` holds `git diff 2376710`, the cumulative worktree diff over rounds 1 to 3.
- `tmp/units/lad-3-round.diff` holds this round's change alone, as a unified diff of each owned file against its backup
  in `tmp/units/lad-3-backups/`.
- `tmp/units/lad-3-status.txt` holds `git status --short`:

```text
 M guides/veneer.md
 M tests/conformance.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
```

`tests/conformance.test.ts` carries round 2's change and this round left it untouched. `git diff --stat -- src` is
empty.

## Instruments

`tmp/units/lad-3-plant.sh`, `tmp/units/lad-3-gates.sh`, and the pre-round backups in `tmp/units/lad-3-backups/`.
