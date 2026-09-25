# Unit J-FIXTURES report

`readButton`, `readSpecimen`, and `readSubject` in `tests/setupBrowser.ts` now end in one exported helper,
`requireMatch`. Each lookup keeps its name, signature, selection policy, and exact messages, and no caller
changed. `readOracleButton` still composes `readButton` and is untouched. Every gate exits 0.

## Helper

```ts
export interface MatchMessages {
	readonly absent: string
	readonly duplicate: string
	readonly foreign: string
}

export function requireMatch(matched: readonly Element[], messages: MatchMessages): HTMLElement
```

- **Name.** A module helper takes `{verb}{Noun}`. The `require` verb carries the meaning the installed
  `requireValue` export gives it: narrow a value or throw. `requireMatch` narrows a lookup's match list
  to its one match, and it composes `requireValue` for the absent case. The `read*` prefix doesn't fit,
  because the input is a list the lookup already built, not a live host object. `readElement` stays
  separate, because it takes the first selector match and doesn't refuse duplicates.
- **Parameters.** Each lookup keeps its selection, so the helper takes the matched candidates rather
  than a root and a predicate. The messages are data in a `MatchMessages` object with single-word keys:
  `absent` for no match, `duplicate` for several matches, and `foreign` for a lone match that isn't an
  HTML element.
- **Count.** The `duplicate` key holds the text after the count. The helper prefixes
  `${String(matched.length)} `, so the helper owns the "refusal names the count" policy. Each lookup's
  resulting message is byte-identical to its earlier message.
- **Check order.** The helper keeps the earlier order: several matches, then none, then non-HTML.
- **TSDoc.** The helper and the interface carry full TSDoc. The `readButton` remark now points its
  duplicate policy at `requireMatch`. The `readSpecimen` remark "The duplicate refusal is …'s" now
  links `requireMatch` instead of `readButton`.

## Failing-first proof

The command was `npx vitest run --config vite.config.ts --no-cache --project setup:browser`. It ran
with the interface and the tests in place and before the helper existed. The run exited 1 because
`tests/setupBrowser.test.ts` failed to import: "does not provide an export named 'requireMatch'". The
log is `tmp/units/jf-red.log.txt`. The same command then exited 0 after the helper landed (see the
gate table).

The helper's cases are in the `requireMatch` describe block of `tests/setupBrowser.test.ts`. Each case
asserts the exact `Error`:

- returns the one candidate a lookup matched;
- refuses a lookup that matched nothing with the absent message;
- refuses a lookup that matched several candidates, and names their count;
- refuses a lone candidate that is not an HTML element with the foreign message.

`requireMatch` is added to the export-list case and to the test file's import.

## Gates

The following table lists each gate with its exit code and log.

| Gate                                                                                 | Exit | Log                                  |
| ------------------------------------------------------------------------------------ | ---- | ------------------------------------ |
| `npx vitest run --config vite.config.ts --no-cache --project setup:browser` (before) | 1    | `tmp/units/jf-red.log.txt`           |
| `npx vitest run --config vite.config.ts --no-cache --project setup:browser`          | 0    | `tmp/units/jf-setup-browser.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --project app:browser`            | 0    | `tmp/units/jf-app-browser.log.txt`   |
| `npm run format:check`                                                               | 0    | `tmp/units/jf-format.log.txt`        |
| `npm run lint:check`                                                                 | 0    | `tmp/units/jf-lint.log.txt`          |
| `npm run check`                                                                      | 0    | `tmp/units/jf-check.log.txt`         |

`npm run lint:check` includes the policy rules. It reported no name collision for `requireMatch` or
`MatchMessages`.

## Diff and status

- `/home/user/veneer-jf/tmp/units/jf.diff` holds the output of `git diff 6882751`.
- `git diff 6882751 --stat` lists only `tests/setupBrowser.test.ts` and `tests/setupBrowser.ts`.
- `/home/user/veneer-jf/tmp/units/jf-status.txt` holds the output of `git status --short`: ` M tests/setupBrowser.test.ts` and
  ` M tests/setupBrowser.ts`.

## Deviation state

None. No caller changed and no file outside the owned set changed. Nothing was committed, installed,
built, or formatted tree-wide. Only the owned files were formatted, with
`./node_modules/.bin/oxfmt --config .oxfmtrc.json`.
