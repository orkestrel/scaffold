# J-MODAL round 6 (the landing round's prose-and-record pass) — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, resumed in the modal worktree, briefed by `j-modal-brief-6.md`; 4 tool uses, 61 s; retained verbatim from the subagent's return)

The numeric rule in the Modal departure bullet now states Bootstrap's exact comparison, all four commands exit 0, and the guide is staged. Nothing was committed or installed, no discarding git command was run, and I made no `prove` MCP call (the server is not reachable from a subagent).

## A. The sentence
Before:
> Bootstrap first normalizes the value: `true` and `false` become booleans, a numeric string becomes a number, an empty value or `null` becomes `null`, and any other value becomes `JSON.parse(decodeURIComponent(value))`, or stays the original string when either step throws.

After:
> Bootstrap first normalizes the value: `true` and `false` become booleans; a string becomes a number only when it equals that number's own string form (`value === Number(value).toString()`), so `0` and `1` do and fail the check that follows, while `01`, `00`, and `0x10` stay strings, pass it, and read as a backdrop that hides on a press; an empty value or `null` becomes `null`; and any other value becomes `JSON.parse(decodeURIComponent(value))`, or stays the original string when either step throws.

The rest of the paragraph is unchanged, including the `JSON.parse` fallback and every other example. I checked the new examples against the installed normalizer before writing (`tmp/j-modal/normalize-probe-6.log.txt`):
- `0` and `1` become numbers and fail the check.
- `01`, `00`, and `0x10` stay strings and pass.
- `1e3` and `1.0` also become numbers and fail, but through the `JSON.parse` step, which the paragraph's existing JSON clause already covers.

## Commands (`tmp/j-modal/gates-6.log.txt`)
| Command | Exit |
|---|---|
| `npx oxfmt --config .oxfmtrc.json --write guides/veneer.md` | 0 |
| `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md` | 0 ("All matched files use the correct format.") |
| `npm run test:guides` | 0 (19 passed) |
| `npm run test:policy` | 0 (109 passed, 1 skipped) |

## B. The first-run history, corrected
My round-4 report said two rows missed in the first full run of `mutations-5.py`; only one did. The retained first run (`tmp/j-modal/mutations-5-first.log.txt`) shows:
- **Missed:** "the route runs after a listener destroys the delegate" was the only `MISSED` row.
- **Already exact:** "the dismiss route reads no lifetime" was already `EXACT` there, on the extended case "acquires and hides nothing through the dismiss route after a listener to the button route destroys the delegate".

That dismiss row had missed only in the targeted pre-run check before the full run. I extended its case at that point, so it entered the full run already bound.

The row I retargeted after the full run was "the route runs after a listener destroys the delegate": the delegate's `#construct` guard masked its original proof. I added the case "leaves the modal a click names to a live outer delegate when a listener to the hide event the inner route sends destroys the inner one" and named it. The retained final run (`tmp/j-modal/mutations-5.log.txt`) reads that row `EXACT`, with every other row `EXACT` or `JOINED`.

## `git status --short -- guides/veneer.md`
```
M  guides/veneer.md
```
The guide is staged, with no unstaged changes.
