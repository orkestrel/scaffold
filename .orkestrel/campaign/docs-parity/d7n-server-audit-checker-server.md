Confirmed: the convention sentence for the Constants table matches the report's claim ("above the `### Constants` table in that wording plus 'A `Shape` cell holds the constant's declared type.'"). This closes out my verification pass. Final verdict below.

Lane held: checker server

**Claim 1 — PASS.** `git status --short` for `543ba65` (captured post-lockfile-install per prep-brief line 23) lists exactly: `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `guides/server.md`, `package.json`, `src/server/{Server,errors,helpers,types}.ts`, `tests/{config,guides,policy}.test.ts`, `tests/setupPolicy.ts`, `tests/setupServer.ts`, `tests/src/server/Server.test.ts`, `tsconfig.json`, plus untracked `scripts/docs.ts` (`d7n-server-prep.status.txt`). `package.json`'s only dependency-block change is `"version"`; no `@orkestrel/*` range moved (diff.txt:1631-1648). `package-lock.json` moved only its two `"version"` fields plus a dropped `vite-plugin-dts` subtree (diff.txt:1096-1165), matching "the root version and any dropped extraneous subtree."

**Claim 2 — PASS.** `tests/guides.test.ts` diff (`d7n-server-prep.diff.txt:2309+`) shows exactly the brief's adaptation: `members`/`documented` name-mapping, the `findMissing` and `findUnexampled` argument swaps, `documented`/`examples` bound at the examples loop's own scope. `group.methods.length` assertion and the two string-argument `findMissing` calls are untouched (prep-report.md:170-172). `npm run test:guides` reported `Tests 33 passed (33)` (prep-report.md:334-339), quoted from a run.

**Claim 3 — PASS.** Every voice/prose-sweep hunk in `d7n-server-prep.diff.txt` (types.ts:1738-1796, helpers.ts, errors.ts, Server.ts) is a doc-block or comment edit that keeps its facts, applies exactly the named substitution-table row, and moves no code token. The `Encoding` split (types.ts:1741-1746) removes the symbol-name match from the first sentence while preserving both facts, satisfying `policy/no-malformed-summary`.

**Claim 4 — PASS.** `guides/server.md:131` shows `### Classes` (verified live tree, lines 131-140); `### Types` and `### Constants` each carry the fleet `Shape` convention sentence immediately above their tables (lines 69, 144), matching Ruling 12/18 wording and the router pilot per the report.

**Claim 5 — PASS.** `npm run docs` reads `rows read: 1, disagreements found: 0` (converge-report.md:181); the hand-rebuild check against baseline reports `missing [], added [], key/kind changes []` over 100 keyed rows (converge-report.md:57-60); rows whose literal stayed in `Shape` are named (`DEFAULT_DRAIN_MS`, etc., converge-report.md:68-70); blocks rewritten by hand are named per file (converge-report.md:80-96).

**Claim 6 — PASS.** Exactly one titled `@example` in the package (`grep '@example \S' src` → one hit, `factories.ts:18`). Fence body at `guides/server.md:606-647` is byte-identical to the doc block body at `factories.ts:19-60`. `### Substrate direct use — tokens, cookies, negotiation` occurs once in the document (single grep hit at line 604).

**Claim 7 — PASS.** `guides/server.md:3-7` and `README.md:3-7` carry the identical blockquote, same line breaks, no link, no bold. The opening prose after the guide's blockquote (`guides/server.md:9-14`) carries the displaced router/upgrade/connection-fact/`discoverPort` sentences without restating tagline clauses. `README.md:9-13` keeps its own onboarding sentence.

**Claim 8 — PASS.** `diff <(sed -n '62,258p' abort/tests/guides.test.ts) <(sed -n '71,267p' server/tests/guides.test.ts)` reported no difference per the report; independent read of `abort/tests/guides.test.ts:62-189` against `server`'s converge diff (`d7n-server-converge.diff.txt:1516-1644`) confirms byte-identical shape (guard-and-continue loop, no local type predicate, both-sides failure line, two `not.toBeUndefined()` guards). `README.md` is in `ROOT_FILES` (converge diff:1557). `GUIDE_SPEC` constant present (line 1540). Each test is named for what it proves.

**Claim 9 — PASS.** Every `src/**` hunk in the converge diff sits inside a doc block. `grep` over the live guide for `NOT`/`ALWAYS`/`TOTAL` found no matches — all-caps emphasis is gone. `## Tests` section (`guides/server.md:674-683`) names the equality gate descriptively with no SQ/MQ/EQ/RQ identifier. The `{@link ContentTooLargeError}` and other link tags remain unflattened in errors.ts (diff:1679-834).

**Claim 10 — PASS.** `grep '^diff --git' d7n-server-converge.diff.txt` lists exactly `README.md`, `guides/server.md`, `src/server/{Negotiator,Server,constants,errors,factories,helpers,types}.ts`, `tests/guides.test.ts` — matching `d7n-server-converge.status.txt` exactly.

**Claim 11 — PASS.** Converge report criterion 6 quotes `npm run docs` (`rows read: 1, disagreements found: 0`, exit 0), `-- --to guide`/`-- --to source` at `written: 0` (converge-report.md:181-183); criterion 7 quotes `oxfmt --check`, scoped `oxlint`, `npm run check`, `test:guides`, `test:policy`, all exit 0 (converge-report.md:190-196).

**Claim 12 — FAIL.** Both reports state counts in prose, violating `AGENTS.md` § Writing's unconditional ban (the rule names `cases`, `tests`, and `files` explicitly as banned countable sets). Converge report: "**The three cases** and their first lines" (converge-report.md:10), "A later pass over **three constants**" (:66), "**The three** numeric literals moved" (:77), "the **three** of the 36 that now pass" (:202). Prep report: "the **two** swept lines" (:27) and "the [merge-managed] **three** carry exactly the expected rows" (:17) count a set of files. File:line citations independently spot-checked (voice-site tables, drop-in diff regions, guide row cells) match the tree.

**Claim 13 — CANNOT RULE (moot).** Neither report names a reader or seed defect ("None," converge-report.md:242-246; the prep report's lone observation at :466-474 is explicitly framed as not a defect — a `{@link}` rendering difference the converge unit's comparator resolves, confirmed live: `ServerErrorCode`'s guide row reads "a `ServerError` carries" per the P16 link-flattening comparator rule). With no defect asserted, there is nothing to rule blocking or non-blocking; the claim's premise ("or the reports name none") is the branch that applies, and that branch requires no further ruling.

## Findings outside the claims

- None found beyond claim 12's count-in-prose violations. Right looks like: state the failing test names without a leading cardinal ("The failing cases, verbatim:" or naming them directly), and state the rewritten-constant list without "three" ("Rewrote `DEFAULT_DRAIN_MS`, `DEFAULT_BODY_LIMIT`, and `HTTP_ERROR_BRAND` a second time...").

VERDICT: FAIL 12
