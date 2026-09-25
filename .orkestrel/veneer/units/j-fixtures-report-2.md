# Unit J-FIXTURES round 2 report

The round carried J1, J2, and J3. The message table for the `requireMatch` cases is now the exported `SAMPLE_MESSAGES`
constant in `tests/setupBrowser.ts`. A new case pins the check order. Each named mutation reads red, and each restore
is byte-identical. Every gate exits 0. No lookup and no caller changed.

## Changes

- **J3, `tests/setupBrowser.ts`.** It adds `export const SAMPLE_MESSAGES: MatchMessages = Object.freeze({ … })` right
  after `requireMatch`, with TSDoc. The TSDoc names the placeholder lookup the table words. It also states that the
  proofs assert each refusal as a literal and don't read it back from the table. The helper and the lookups are
  unchanged since round 1.
- **J3, `tests/setupBrowser.test.ts`.** The `requireMatch` describe block drops its local `messages` table and imports
  `SAMPLE_MESSAGES`. The registrations and the literal `Error` assertions stay in the test file. `SAMPLE_MESSAGES`
  is in the import list and the export-list case.
- **J2, `tests/setupBrowser.test.ts`.** The case "refuses several candidates as a duplicate before it checks the first
  as an HTML element" passes an SVG element followed by a `div`. It asserts
  `new Error('2 samples in the root are named "Placeholder"')`.
- **Name.** A constant takes `{QUALIFIER}_{NOUN}` (`names.md` § Value-level identifiers). `SAMPLE` names the placeholder
  lookup whose wording the table holds, and `MESSAGES` follows the `MatchMessages` type it satisfies. I didn't choose
  `MATCH_MESSAGES`, because that name reads as the helper's default wording, and the helper has none.
- **Messages.** The lookup message lines in `/home/user/scaffold/.orkestrel/veneer/units/jf.diff` and `/home/user/scaffold/.orkestrel/veneer/units/jf-2.diff` are identical (checked with
  `diff` over the `absent`, `duplicate`, and `foreign` lines and the removed `throw` lines).

## Mutations

Each mutation ran through
`npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts`. The
`/home/user/scaffold/.orkestrel/veneer/units/jf-instruments/jf-2-mutate.sh` script (with `/home/user/scaffold/.orkestrel/veneer/units/jf-instruments/jf-2-mutate.py`) does four things. It records the file's
SHA-256 digest, applies the mutation, and logs the mutation's `diff`. Then it runs the command, restores the baseline
copy, and records the digest and a `cmp` result. The retained scripts are byte copies of the scratchpad files that ran,
so they still name the `jf2-mutate.py` scratchpad path. Every log shows the digest
`5ad6fa3292155bd306a76ef466ddf86336ac8b1f8d9e418c00a9259714357c4a` before and after, and
`restore byte-identical: cmp exit=0`.

The following table lists each mutation with the cases that read red, the exit code, and its log.

| Mutation | Change to `requireMatch` | Red cases | Exit | Log |
| --- | --- | --- | --- | --- |
| J1 duplicate | Deletes the `matched.length > 1` refusal, so the helper returns the first match | `requireMatch` › refuses a lookup that matched several candidates, and names their count; `requireMatch` › refuses several candidates as a duplicate before it checks the first as an HTML element; browser setup › refuses a name two buttons in one root announce, and answers for each root on its own; browser setup › reads one labelled specimen, and refuses an absent label and a duplicated one; browser setup › resolves a capture subject through a specimen label, a region name, or a rendered host | 1 | `/home/user/scaffold/.orkestrel/veneer/units/jf-instruments/jf-2-mutation-duplicate.log.txt` |
| J1 foreign | Deletes the `instanceof HTMLElement` refusal, so the helper returns a lone non-HTML match | `requireMatch` › refuses a lone candidate that is not an HTML element with the foreign message | 1 | `/home/user/scaffold/.orkestrel/veneer/units/jf-instruments/jf-2-mutation-foreign.log.txt` |
| J2 order | Inserts the HTML check on `matched[0]` before the duplicate check | `requireMatch` › refuses several candidates as a duplicate before it checks the first as an HTML element | 1 | `/home/user/scaffold/.orkestrel/veneer/units/jf-instruments/jf-2-mutation-order.log.txt` |

The order mutation turns only the J2 case red. That shows the J2 case is the one that pins the check order.

## Gates

The `/home/user/scaffold/.orkestrel/veneer/units/jf-instruments/jf-2-gates.sh` script ran the following gates in order. Each log ends with `exit=$?`.

| Gate | Exit | Log |
| --- | --- | --- |
| `npx vitest run --config vite.config.ts --no-cache --project setup:browser` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/jf-instruments/jf-2-setup-browser.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --project app:browser` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/jf-instruments/jf-2-app-browser.log.txt` |
| `npm run format:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/jf-instruments/jf-2-format.log.txt` |
| `npm run lint:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/jf-instruments/jf-2-lint.log.txt` |
| `npm run check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/jf-instruments/jf-2-check.log.txt` |

## Diff and status

- `/home/user/scaffold/.orkestrel/veneer/units/jf-2.diff` holds the output of `git diff 6882751`.
- `git diff 6882751 --stat` lists only `tests/setupBrowser.test.ts` and `tests/setupBrowser.ts`.
- `/home/user/scaffold/.orkestrel/veneer/units/jf-2-status.txt` holds the output of `git status --short`: ` M tests/setupBrowser.test.ts` and
  ` M tests/setupBrowser.ts`.

## Deviation state

None. No caller changed, and no file outside the owned set changed. The `tests/setupBrowser.ts` edit is limited to the
new constant. Nothing was committed, installed, or built. Only the owned files were formatted, with
`./node_modules/.bin/oxfmt --config .oxfmtrc.json`.
