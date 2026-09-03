## Claims

1. **CONFIRMED** — The prescribed rows are present in the tree: renamed types at `src/core/types.ts:475`, guide repairs at `guides/README.md:3-16,51`, `guides/markdown.md:24-25,51-52,110-111`, `collapseSpace` calls at `src/core/helpers.ts:2357,2545`, named scan results at `src/core/types.ts:103-120`, the TSDoc repair at `src/core/helpers.ts:2170-2172`, `performance.now()` at `tests/src/core/parsers.test.ts:624,626`, and fence proofs at `tests/guides.test.ts:258-690`. The fleet rows are clean by their required sweeps.

2. **not held**

3. **CONFIRMED** — `\bMarkdownHandlers\b` and case-insensitive `\bMarkdownHandler(?:s|ed|ing)\b` each returned no matches across `/home/user/fleet/markdown`, excluding `node_modules/**`. The required `src`, `tests`, guide, and root README paths were covered. The writer recorded the package-wide sweep in `conform-markdown-report.md:216-223`.

4. **not held**

5. **CONFIRMED** — `src/core/index.ts:1-9` retains the public star exports. `MarkdownHandlerMap`, `LinkScan`, and `EmphasisScan` are documented at `guides/markdown.md:24-25,51-52`; scan signatures use them at `:110-111`; the method table matches `MarkdownInterface` call signatures at `:199-211` and `src/core/types.ts:607-636`. Every value-bearing TypeScript fence has an execution test and presence guard in `tests/guides.test.ts:258-690`. Touched-file `AGENTS §N` sweep: clean.

6. **not held**

7. **CONFIRMED** — `/home/user/work/evidence/conform-markdown.status:1-9` lists only owned files. The diff contains no off-limits path, `package-lock.json`, `node_modules/**`, compatibility alias, selective re-export, or shim. `src/core/index.ts:1-9` contains only star exports, and the compatibility-pattern sweep over touched files returned no matches.

8. **not held**

9. **CONFIRMED** — Touched-file sweeps for `TODO`, `FIXME`, `HACK`, `XXX`, `.skip`, `.only`, `.todo`, retries, and inflated timeouts returned no matches. The only `console.log` matches are pre-existing TSDoc examples at `src/core/Markdown.ts:174,180`, absent from the added diff hunks. The report disposition table matches the changed paths in `conform-markdown.diff`.

## Findings outside the claims

- **F-setup-agents** — `tests/setup.ts:54` retains `AGENTS-forbidden; §1 / §16`. Replace that clause with citation-free wording, then rerun the package-wide `AGENTS §N` sweep.
- **F-readme-count** — `guides/README.md:20` says “this package's two runtime dependencies.” Replace “one of this package's two runtime dependencies” with “a runtime dependency of this package.”
- **F-vendored-tsdoc** — `tests/setupPolicy.ts:583` uses the forbidden `@param ... Whether` form. Repair the canonical scaffold source, release it, and refresh the vendored target copy; do not edit this off-limits file.
- **F-sanitizer-fence** — `guides/markdown.md:428-438` makes sanitizer behavior claims without an executable TypeScript fence. Add hostile-subtree, refused-URL, and allowed-`src` assertions with matching transcriptions and presence guards; update the canonical HTML guide separately.

## Referrals

- **Orchestrator:** Which successor unit will carry `tests/setup.ts:54` before S6 acceptance?
- **Orchestrator:** Will the scaffold unit repair `tests/setupPolicy.ts:583` and refresh its vendored copy?
- **Orchestrator:** Will the sanitizer-fence prescription be carried for both the markdown guide and the canonical HTML guide?

## Claims attacked and held

- Claim 1 — matched every subject and fleet row against its prescribed tree evidence.
- Claim 3 — ran exact-name and inflection sweeps over the required package population.
- Claim 5 — compared barrel exports, guide rows, method signatures, fence imports, transcriptions, and touched-file citations.
- Claim 7 — compared status, diff paths, barrel form, and compatibility-pattern sweeps.
- Claim 9 — searched added surfaces for deferred, skipped, retry, TODO, and debug residue, then compared the disposition table with the diff.

VERDICT: FAIL none; outside the claims: F-setup-agents, F-readme-count, F-vendored-tsdoc, F-sanitizer-fence

## Journal

Leave for the driver.

## Deviation

None. No tree change was observed, and every required file was readable.