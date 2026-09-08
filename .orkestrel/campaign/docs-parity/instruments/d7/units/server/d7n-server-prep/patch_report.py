from pathlib import Path

path = Path('/home/user/scaffold/tmp/units/d7n-server-prep-report.md')
text = path.read_text()

old_tail = """`repair` was not re-run. `node <tip>/dist/bin/main.js audit --offline` reports
`0 of 36 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 7.`
(exit 0), which is the completeness reading that stands in for the interrupted run's `repair` summary
line; that summary line itself was lost with the terminated run and is not reproducible without a
second `repair`.
"""
new_tail = """`repair` was not re-run. The interrupted run left its own logs under `tmp/d7n-server-prep/`, so its
`repair` summary line and its pre-fix `oxlint` reading are both on disk and are quoted under items 1
and 3. A fresh read-only `node <tip>/dist/bin/main.js audit --offline` confirms the repair is complete
now: `0 of 36 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and
nothing at 7.` (exit 0).
"""
assert old_tail in text
text = text.replace(old_tail, new_tail)

old_item1 = """Not re-run, per the dispatch. `git status --short` is the P21 list exactly, plus the files items 2, 3,
and 4 own:
"""
new_item1 = """Not re-run, per the dispatch. The interrupted run captured its output at
`/home/user/fleet/server/tmp/d7n-server-prep/repair.log.txt`, whose last line is the summary and whose
write list matches P21's:

```text
0 of 36 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 7.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 28 unchanged, 0 removed in ..
```

`git status --short` is the P21 list exactly, plus the files items 2, 3, and 4 own:
"""
assert old_item1 in text
text = text.replace(old_item1, new_item1)

old_item3 = """Every site is a doc block or a comment. No code token moved, nothing was renamed, and no assertion's
value changed.
"""
new_item3 = """Every site is a doc block or a comment. No code token moved, nothing was renamed, and no assertion's
value changed. The interrupted run captured the pre-fix reading at
`/home/user/fleet/server/tmp/d7n-server-prep/lint1.log.txt`, which is the worklist the tables that
follow close, and its post-fix reading `lint2.log.txt` is empty:

```text
src/server/types.ts:260:2: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/types.ts:269:2: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/types.ts:287:2: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/types.ts:532:1: error policy(no-banned-term): Replace just in this comment: delete.
src/server/types.ts:532:1: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/types.ts:201:1: error policy(no-malformed-summary): State what the symbol does without naming Encoding in the first sentence.
tests/src/server/Server.test.ts:651:3: error policy(no-banned-term): Replace just in this comment: delete.
src/server/helpers.ts:123:1: error policy(no-banned-term): Replace just in this comment: delete.
src/server/helpers.ts:705:1: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/helpers.ts:758:1: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/helpers.ts:1492:1: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/Server.ts:31:1: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/Server.ts:273:2: error policy(no-banned-term): Replace e.g. in this comment: for example.
tests/setupServer.ts:13:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:16:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:22:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:55:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:67:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:112:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:170:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:180:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
src/server/errors.ts:103:1: error policy(no-banned-term): Replace e.g. in this comment: for example.
src/server/errors.ts:175:1: error policy(no-banned-term): Replace just in this comment: delete.
```

A diagnostic reports a doc block at the block's opening line; the tables that follow cite the edited
line in the tree this unit leaves, so the two positions differ by the block's leading lines.
"""
assert old_item3 in text
text = text.replace(old_item3, new_item3)

old_dev = """
The one item the resumed run cannot reproduce is `repair`'s own summary line, because the terminated
run consumed it and the dispatch bars a second `repair`. `audit --offline` stands in its place.
"""
assert old_dev in text
text = text.replace(old_dev, "")

path.write_text(text)
print('patched')
