## Lane

Subjective (design fit, API and vocabulary, architecture fit, simplification, guide voice). Held as assigned. I did not execute anything: every behavioural reading below comes from source or from the retained raw output the brief names, and each is labelled. Correctness, test sufficiency, and gate results are referred, not adjudicated.

## Claim verdicts

**1. `normalizePolicyFilename` translates `file:`-prefixed URL and native-path inputs into one root-relative comparison form using native modules; spaces, literal percent text, hash characters, and Unicode survive — CONFIRMED**

`tests/setupPolicy.ts:289-293` uses `node:url.fileURLToPath` and `node:path.resolve`/`relative`, with no hand-written scheme, escape, or drive handling. `tests/setupPolicy.test.ts:8-16` drives every hazard in `tests/setup.ts:868-875` through all three input languages, and `tmp/pass/scaffold-path/tmp/d7n-scaffold-path-fix-2/setup-policy.log` records that file passing on Windows on 2026-09-08. Attack that failed: I looked for a hazard the case data admits but never reaches the boundary — literal `%20` is present as native input (`src/literal%20name.ts`), so the encode/decode round trip is pinned in both directions rather than only through `pathToFileURL`. Host limit, per the brief's standing conditions: no Linux reading exists for this candidate.

**2. The helper remains comparison-only — CONFIRMED**

No `toLowerCase`, `basename`, `decodeURIComponent`, or `try`/`catch` appears in `tests/setupPolicy.ts:289-293`; `normalizePolicyPath` at `:277-279` is byte-unchanged and every other caller of it is untouched (`:68, :328, :341, :365, :389-392, :405, :455, :548, :569, :981, :1190, :1245, :1295, :1378, :1446`). Attacks that failed: I tried to collapse two roots into one expected fixture — `relative` from a nested base yields a leading `../`, which `tests/setupPolicy.test.ts:18-25` pins as distinct; and I tried to find an input pair mapping to one output under a fixed base, which `relative` does not admit.

**3. The real Oxlint fixture preserves its producer, cwd, shape guards, status checks, rule-code/path population, assertions, and clean result, with both operands through one helper and base — CONFIRMED**

`tests/config.test.ts:1818-1844` keeps the `createRequire` resolution of the real binary and `cwd: scratch.path`; `:1846-1867` keeps every JSON shape guard; `:1874, :1911-1912` keep the status and clean assertions; `:1875-1899` carries the same rule codes and paths, in order, that the pre-change literal list carried; `:1905-1910` keeps the positive `eslint(no-debugger)` assertion and the negative `no-host-line-endings` assertion. Both operands run through `normalizePolicyFilename(comparisonRoot, …)`. `red.log` records the pre-change failure at `tests/config.test.ts:1894`, and `green-config.log` the same command green.

**4. The permanent direct tests can expose the defective URL conversion and unintended logical-normalizer changes; they use native constructed paths and generated valid URLs, not a mocked producer; shared data follows test placement rules — UNRESOLVED**

The second sentence holds on source: `tests/setupPolicy.test.ts:1-2, 9-14` builds paths with `node:path.resolve` and URLs with `pathToFileURL`, stands up no producer at all, and `POLICY_FILENAMES` sits in the host-independent register with no `node:` import and no `describe`/`it` (`tests/setup.ts:867-875`), which is the placement `.claude/rules/tests.md` § Shared test infrastructure fixes; the sibling-module rule for a root `tests/setup*.test.ts` proof is met.

The first sentence I cannot settle from the evidence available. The recorded red run is `tests/config.test.ts` against the previous `normalizePolicyPath`-only call site, not `tests/setupPolicy.test.ts` against a `URL.pathname` implementation, so the direct proof has never been observed red for the defect it is written to guard. My source derivation says it would fail on either host — a `URL.pathname` reading leaves `%23` and `%20` encoded, and on Windows prefixes a drive path with `/` — but that is a derivation, not a run. What would settle it: mutate `tests/setupPolicy.ts:291` to `new URL(filename).pathname`, run `npm run test:setup -- tests/setupPolicy.test.ts`, record the red, restore, and record the green.

**5. The helper name, exported ownership, TSDoc, and call-site shape fit the policy register without a general path API, rename-only wrapper, host-specific literal algorithm, or source-public contract; no unrelated logical caller changed — CONFIRMED**

`normalize*` is a registered helper prefix in `.claude/rules/names.md` § Standalone helpers, and no prefix in that list describes relativization, so the shipped name is the best available form rather than a compromise. The helper composes conversion, relativization, and separator normalization, so it is not rename-only. It is exported from the register that already owns policy path comparison, beside `normalizePolicyPath`, and `src/` is untouched. No `process.platform` branch and no platform literal appears. The `relative as relativePath` alias at `tests/setupPolicy.ts:11` is earned: a local `const relative` already exists at `:1371`, and renaming that local would reach a function this unit does not own.

**6. The portability clarification has its canonical rule home, uses the platform API, adds no duplicate to `AGENTS.md` or `CLAUDE.md`, carries directives rather than campaign history, and the diff stays in scope — CONFIRMED**

`.claude/rules/portability.md:55-56` sits directly beneath its inverse at `:54`, in the section the rule map assigns paths to, and a sweep of authored Markdown finds the directive at that line alone — no second home. The line is imperative, names the API to use and the readings to refuse, and records nothing about how it was found. `status.txt` lists exactly the granted files.

## Findings outside the claims

**F1 — `tests/config.test.ts:1753`: the second comparison root is unexplained, and it departs from the file's own canonicalization form.**

The line introduces `realpathSync(scratch.path)` while the child at `:1838` keeps `cwd: scratch.path`, and nothing says why the two differ. Every other non-obvious choice in this fixture carries its reason: `:1787-1790` for the line-ending population and its arrival control, `:1812-1817` for the binary resolution. Separately, this file's established form for canonicalizing a host root is `realpathSync.native` (`:1995, :2040-2045`); the added line uses the plain form with no stated reason. Why it matters: the reason is the whole content of the fix — the child resolves diagnostics from the real path, so a later reader who collapses the two roots reintroduces a host-specific mismatch that `tests/setupPolicy.test.ts` cannot catch, because that proof never spawns Oxlint. What right looks like: a `//` comment above `:1753` naming why the comparison root is the resolved real path while the child's cwd stays the scratch path, and either `realpathSync.native` for consistency with `:1995` or a clause in that comment stating why the plain form is correct here. Bound against over-correction: do not change `cwd` at `:1838` — the child must run from the scratch path for the relative diagnostics the fixture reads.

**F2 — `tests/setupPolicy.ts:282, 285`: `file:` URL alternates with the workspace's fixed term `file:` URI.**

The rule governing this helper writes the concept as `` `file:` URI `` at `.claude/rules/portability.md:54` and again in the line this change adds at `:55`; `guides/lsp.md:36` uses the same term. The new TSDoc writes `` `file:` URL `` in its description and its `@param`. `AGENTS.md` § Design laws fixes one term per concept. What right looks like: write `` `file:` URI `` in both TSDoc mentions. The rule file already pairs that noun with the API names — "Build a `file:` URI with `pathToFileURL`" — so the API spelling in `fileURLToPath` raises no conflict. Bound against over-correction: leave `.claude/rules/portability.md:54` alone; the rule file is already consistent and the drift is in the code's doc block.

## Attacked and held

- **The expected filenames run through the helper, which looks like unearned ceremony and is correct.** For a relative literal the call is an identity, so plain strings would have matched, and the `{ code, filename }` pairs are longer to scan than the previous literal list. `.claude/rules/portability.md:44` requires each operand of a path comparison to be normalized with the same normalizer before comparing, and the shipped shape is exactly that. The readability cost is real and the rule pays for it.
- **`normalizePolicyFilename` canonicalizes `..` in a native input while `normalizePolicyPath` does not, which looks like the helper quietly reinterpreting logical keys and is correct.** The split is deliberate and pinned on both sides: `tests/setupPolicy.test.ts:34-39` asserts the logical normalizer leaves `../` and `%20` alone, and the register's glob keys never pass through the new helper.
- **`POLICY_FILENAMES` sits in `tests/setup.ts` while every other `POLICY_*` constant sits in `tests/setupPolicy.ts`, which looks like a split vocabulary family and is correct.** `BROWSER_RESOLVER_EXPORTS` at `tests/setup.ts:386` is the established precedent for a domain-prefixed constant living in the shared register and consumed elsewhere, and `tests/setupPolicy.ts` is content-owned (`host.json:730`), so declaring proof-only data there would widen the vendored surface every target receives. I attacked this and withdrew it.
- **The new proof carries no orienting subject comment** where `tests/setup.test.ts:35-38` carries one. The proof's `describe` names are the subject here, so the omission reads as brevity rather than drift.

## Referrals to the objective lane

- Whether `realpathSync` and `realpathSync.native` can disagree on Windows for a `mkdtemp` path — drive-letter case or a short-name form — such that `relative` returns a `../` chain and the fixture reddens on a host where it currently passes. Evidence: `tests/config.test.ts:1753` versus `:1995`.
- Whether `filename.startsWith('file:')` at `tests/setupPolicy.ts:291` can misread a native POSIX path whose first segment begins `file:`. Within this fixture's population the sweep's own reserved-character rule refuses `:` in an authored path, so I could not reach it; the branch's general contract is the objective lane's.
- Test sufficiency for claim 4, per the mutation run named there.

## Observations for the Orchestrator

- The directive at `.claude/rules/portability.md:55-56` ships with no instrument. The sweep proves the path- and text-shaped portability rules over authored paths, and this one is source-shaped, so the defect this campaign repaired can recur in any target without a gate reporting it. `configs/policy.ts` is off-limits to this candidate, so this is a successor unit, not a change here.
- The diff moves the vendored surface: `.claude/rules/portability.md`, `tests/setupPolicy.ts`, and `tests/config.test.ts` all appear in `host.json`, and `setup.log` records `tests/setupServer.test.ts` failing on the stale inventory for the rule file. That is the standing condition the brief names, and the bump and re-propagation belong to root's alignment work.

VERDICT: FAIL 4; outside the claims: F1, F2
