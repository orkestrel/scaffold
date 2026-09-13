# Unit report — U-fix-6 (`builder`, Sonnet, native, returned 2026-09-13)

**Changes**

- `ROADMAP.md`: applied the seven prescribed replacements across the named `**scaffold**` rows (node-floor numeral, `&&` row file nouns, `@types/node` row's `target` phrase and `templates.ts` line list, transitive-dependencies row's package/range/numeral phrasing, `supportsMappedLoopback` row's five predicate nouns, whole-row replacement of the `matchesEngines` row, and the 0.0.65 successor row's four phrasing fixes), re-wrapping each touched row to fit line width with each code span kept on one line.

**Scoped validation**

1. `npm run format:check` — exit 0: "All matched files use the correct format. Finished in 9368ms on 225 files using 4 threads."
2. `npm run test:policy` — exit 0: "Test Files 1 passed (1)", "Tests 91 passed (91)".
3. `grep -c 'node floor 22.18.0, where' ROADMAP.md` → `1`; `grep -c 'the \`supportsMode\` predicate' ROADMAP.md` → `1`; `grep -c '"earlier" and "later"' ROADMAP.md` → `1`; `grep -c 'the \`provisionNpm\` name or the \`resolveNpm\` name' ROADMAP.md` → `1`.
4. `grep -n '\`[0-9][0-9.x]*\`' ROADMAP.md | awk -F: '$1>371 && $1<463'` (the row range from "npm 10.9.7 and every npm" at line 371 to "**abort**" at line 463) prints one line: `409:  surface while the manifest declares a \`22.18.0\` floor; the emitted build`. This criterion does not read clean.
5. `git diff --stat` — no git repository is present in `/home/user/scaffold` (`git status` reports "not a git repository"), so this criterion cannot be read as specified; the working tree shows only `ROADMAP.md` touched, per every edit issued in this unit.

**Deviation report**

- **Expected**: criterion 4 reads no backticked version numeral between the named rows, given the seven items list every replacement needed to reach that state.
- **Found**: line 409, inside the `@types/node`-range row (item 3's row) but outside the two spans item 3 names, reads `declares a \`22.18.0\` floor` — a backticked version not listed in item 3's two replacements.
- **Evidence**: `grep -n '\`[0-9][0-9.x]*\`' ROADMAP.md | awk -F: '$1>371 && $1<463'` → `409:  surface while the manifest declares a \`22.18.0\` floor; the emitted build`.
- **Done / not done**: all seven items landed verbatim as specified (criteria 1 through 3 read clean); criterion 4 is not satisfied because of this unlisted occurrence, and I did not edit it, since the Items section states "Change nothing else" and this span is not one of the seven prescribed replacements.
- **Hypothesis**: the Grok check's mechanical table likely missed this occurrence when enumerating item 3's row.

**Item text landed (verbatim)**

1. "node floor 22.18.0, where"
2. "(the `scaffold/package.json` file, the `toolbox/package.json` file, and the `ollama/package.json` file)"
3. "pin the `target: 'node22'` setting for" … "(the `src/core/templates.ts` file at lines 169, 200, and 284)"
4. "through the `@orkestrel/queue` package and the `@orkestrel/database` package" … "declares the `^22.18.0 || >=24.4.0` range, so Node 24.0.0 through 24.3.x installs" … "names 24.4.0, and"
5. "the `supportsBytes` predicate, the `supportsCase` predicate, the `supportsDirectoryLinks` predicate, the `supportsFileLinks` predicate, and the `supportsMode` predicate"
6. Whole row replaced with the exact text specified in item 6 of the brief.
7. "names its endpoint parameter with the `host` name and uses the same word for the machine" … "reads \"host npm\" where the rest of that block reads \"ambient\"" … "whether the `provisionNpm` name or the `resolveNpm` name carries" … "in the `package.json` file to the `MINIMUM_NODE_VERSION` constant in the `src/core/constants.ts` file. Ruled"
# Successor return — U-fix-6b (same `builder`, resumed with `u-fix-6b-brief.md`)

All four criteria pass, with no remaining backticked numeral line printed between line 371 and line 463.

**Changes**

- `ROADMAP.md`: line 409, "declares a `22.18.0` floor" → "declares a 22.18.0 floor".

**Scoped validation**

1. `npm run format:check` — exit 0: "All matched files use the correct format. Finished in 8995ms on 225 files using 4 threads."
2. `npm run test:policy` — exit 0: "Test Files 1 passed (1)", "Tests 91 passed (91)".
3. `grep -c 'declares a 22.18.0 floor' ROADMAP.md` → `1`.
4. `grep -n '`[0-9][0-9.x]*`' ROADMAP.md | awk -F: '$1>371 && $1<463'` prints no line.

**Edited clause verbatim**

"the manifest declares a 22.18.0 floor"

**Deviation state**

None. The target was found verbatim and edited as specified.
