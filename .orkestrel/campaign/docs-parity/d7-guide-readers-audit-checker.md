Lane held: checker

## Per-claim rulings

**U0:**

1. **PASS.** Commit `cfa1f73`'s file list (`instruments/d7/u0/u0b-headstart.log.txt:32-43`) is exactly the nine P15 paths (`.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json`, `scripts/docs.ts`) plus the three site files (`tests/fixtures/broken/missing-example/module/helpers.ts`, `tests/fixtures/good/tests/widget.test.ts`, `tests/setup.ts`) — 12 files, matching the diffstat's `12 files changed`. The script's `package.json` diff line (`u0-headstart.sh:25`, `git diff -- package.json tsconfig.json tests/fixtures tests/setup.ts`) is a full, unfiltered `+`/`-` diff of that file, and its output (`u0-headstart.log.txt:52-63`) shows only the version bump, the `docs` script addition, and the tsconfig paths entry — no `dependencies`/`devDependencies` line. No `@orkestrel/*` range moved.

2. **PASS.** `/home/user/fleet/guide/tests/fixtures/broken/missing-example/module/helpers.ts:6` reads `Greets \`name\`.` above `greet`, which alone carries `@example`; `farewell` (`:17`) carries none. Matches the brief's fixture description.

3. **FAIL.** `package.json:3` reads `"version": "0.0.18"` — correct. But `package-lock.json:3` and `package-lock.json:9` both still read `"version": "0.0.17"`, and `package-lock.json` is tracked (not in `.gitignore`). `package.json:3` was not "the only tracked site of `0.0.17`"; the lockfile was left unbumped.

4. **PASS.** `instruments/d7/u0/u0-headstart.log.txt:65-114` shows `format:check` exit 0, `lint:check` exit 1 (single `tests/setup.ts:13:1` diagnostic), `check` exit 0, `test:policy` `90 passed | 1 skipped`, `test:config` `172 passed | 1 skipped`, `build` exit 0 — matching the report. `u0b-headstart.log.txt:9-26` shows the successor rerunning only `format:check`/`lint:check`/`check`, all exit 0. `tests/policy.test.ts:1338` and `tests/config.test.ts` drive `no-malformed-summary` against synthetic `VOICE_RULE` fixtures, not against `tests/setup.ts`'s real JSDoc text, and `tests/setupPolicy.ts`'s prose sweep (`readPolicyProse`) reads authored Markdown, not TypeScript JSDoc comments — a one-line JSDoc-comment fix in `tests/setup.ts` cannot move either test or `build`. The narrower rerun was sound.

**U1:**

5. **PASS** (mechanical parts). `src/core/helpers.ts:2109-2117` implements the described membership test exactly: `keys.get(comment.line)`, skip when `undefined` or `key.includes('.')`, name via `key.slice(key.indexOf(' ') + 1)` — matches `collectKeys`'s `${keyword} ${name}` / `Owner.member` key shapes (`src/core/helpers.ts:2015-2027`). The named controls exist verbatim in the diff: `collects an untitled class-head block…` (title absent), `skips a member block…` (absent from `extractExamples`, present in `extractExampleMethods`), `collects a titled block above a type head and above an interface head` (both collected).

6. **PASS.** Report (`d7-guide-readers-report.md:9-34`): red-first `npm run test:src:core` → `Test Files 2 failed | 6 passed (8)`, `Tests 7 failed | 591 passed (598)`, with `collects a titled block above a class head, named for the class` listed first among the 7 named failures; after the fix, same command → `Test Files 8 passed (8)`, `Tests 598 passed (598)`.

7. **PASS.** Diff (`d7-guide-readers.diff.txt:283-339`) shows both `findDrift` cases built from inline `HEAD_GUIDE`/`headSource`: agreement returns `[]`, and a differing body returns `[{ key: 'Build a widget', guide: 'ts\nnew Widget(1)', source: 'ts\nnew Widget()' }]`.

8. **PASS.** `scripts/docs.ts:249-250`'s `findExample` matches a key with `key.endsWith(\` ${name}\`)`, which is exactly the `class Widget`-shaped key `collectKeys` produces for a class head, then calls `locateComment(text, key)` — the same call the added test (`d7-guide-readers.diff.txt:350-389`) exercises directly.

9. **FAIL.** The `#scanExamples` comment (`src/core/sources/Source.ts:128-130`) opens `// The union of exported declaration heads' \`@example\` blocks…` — a noun phrase, not verb-first. The no-argument `examples()` overload's description paragraph (`src/core/types.ts:358-364`, one continuous paragraph with no blank line before `A member's block belongs to the \`name\` overload instead.`) literally names "the `name` overload," contradicting "describes the widened population without naming the `name` overload."

10. **PASS** (mechanical parts). `guides/guide.md:107` and `:270` read as the report states; the dedupe sentence sits at `:426-427`, inside `## The extraction model` (`:300-502`); the EQ row (`:555-562`) states the head-or-member reach; the EX row (`:537-539`) and every table header are absent from the diff, hence unchanged.

11. **PASS.** `d7-guide-readers.status.txt` and `.diff.txt` list exactly `guides/guide.md`, `src/core/helpers.ts`, `src/core/sources/Source.ts`, `src/core/types.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/sources/Source.test.ts` — all owned. No vendored file, `README.md`, `tests/guides.test.ts`, `tests/setup.ts`, `package.json`, or `tests/fixtures/**` appears.

12. **CANNOT RULE.** The brief's evidence list for U1 names only the brief, report, `.diff.txt`, and `.status.txt` — no execution log. The quoted gate readings (`d7-guide-readers-report.md:131-148`) rest solely on the writer's own report; no lane-independent run corroborates them.

13. **PASS.** Every checked `file:line` citation resolves to matching tree content (`guides/guide.md:107`, `:270`, `:425`; `package.json:3`; fixture sites; `tests/setup.ts:13`/`:14`). No prose count violates AGENTS.md § Writing — every digit found (`81 files`, `598 passed`, `12 files changed, 1954 insertions, 171 deletions`, line numbers `130, 175, 210, 254`) is either a run-reported measurement or a location, never a stated count of a growable set.

## Findings outside the claims

- **`guide.md:466` citation is loose.** The sentence the report attributes to `:466` ("names the `name` overload's asymmetry with `methods`") actually begins at `:467-468` ("`Source.examples(name)` is deliberately asymmetric with it…"). What right looks like: cite the line the referenced sentence starts on, not a neighboring line in the same paragraph.
- **`helpers.ts:5` citation points at the block delimiter, not the added text.** The report cites `:5` for "gained `Greets \`name\`.`", but that text is at `:6`; `:5` is the opening `/**`. What right looks like: cite the line the quoted text sits on.
- **Lockfile drift (see claim 3) is a real, uncorrected defect**, not just a citation gap: `package-lock.json` still declares `0.0.17` while `package.json` declares `0.0.18`. What right looks like: bump `package.json` and `package-lock.json` together in the same commit, or run the package manager's lockfile-refresh step before committing a version bump.

VERDICT: FAIL 3 9