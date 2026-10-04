# Review of `92a980af2` — discovery run 4, confirming pass

Lane: objective, Opus 5.5 reviewer, read-only over the commit against `8da606341` and the installed Vitest 4.1.11; it ran nothing.

VERDICT: FAIL 2, 5, 6. Claims 1 (no hand matcher, fold, or browser list), 3 (`--filesOnly` identities), 4 (F1 to F5, O2, X2 fixed), 7 (parity), 8 (rules), and 9 (cost: no duplicate listing) hold.

## 2. Selecting arguments and value arity: FAIL

The installed parser is `mri2` (`node_modules/vitest/dist/chunks/cac.uFydS1Z4.js:73-107`); the script's arity rule (`discovery.ts:184-190`) differs:

- `--no-X` where X takes a value: mri sets X false and never takes the next token (`cac:87-92`); the script takes it. `vitest run --no-api tests/a.test.ts` consumes the file filter as `--api`'s value, the listing has no filter, and `tests/b.test.ts` is counted gated though it never runs (unsafe direction).
- A boolean flag followed by `true` or `false`: mri absorbs the word (`cac:18`); the script leaves it as a file filter. `vitest run --isolate false` lists with filter `false`, selecting nothing, so every test is falsely flagged.
- Tokens after `--`: cac stores them in `options['--']` and never treats them as filters (`cac:560-575`); the script makes them filters (`:171-174`). `vitest run --project a -- --project b` over-gates `b`.
- A dropped option can break the listing: `vitest run --shard=3/3 --passWithNoTests` over two files passes, but the listing throws `--shard <count> must be a smaller than count` (`cli-api:3688`) and the census exits 2. `--allowOnly` and `--strictTags` are also dropped though they change what collection accepts.
- `vitest --merge-reports`, `--listTags`, and `--clearCache` run no tests (`cli-api:14617-14619`) but count as unfiltered gates.
- `--root` without `--config`: the listing pins the census config (`:296`, `:330-332`) while the real run loads the config inside the new root.
- Proof gap: no case puts a boolean flag before a file filter.

## 5. Identity matching with repeated names: FAIL

The gate side keeps identities in a `Set` (`discovery.ts:451-455`), and the lookup (`:478-482`) marks every universe entry sharing an identity. `tests/a.test.ts` with `it('same')` on lines 2 and 3 and the script `vitest run tests/a.test.ts:2`: both universe entries are marked gated and the census exits 0 though line 3 never runs. `--tagsFilter` with two same-named tests carrying different tags fails the same way.

## 6. Distribution scratch inside the checkout: FAIL

The letter holds (installing call sites use `createDistributionScratch`, no `TEMP`/`TMP`/`TMPDIR` override, the assertion at `distribution.test.ts:197` is red under the old allocator, the check-ignore proof is red without `createRepository`), but every fixture now sits below the checkout, so Node's bare-import resolution and TypeScript's default `@types` lookup walk up into the checkout's `node_modules`: a dependency missing from the packed manifest resolves from the checkout, and the release gate cannot catch it. The git boundary limits ignore rules only. The driver case at `distribution.test.ts:900` stays outside the checkout with a resolution control for exactly this reason. Why the system temporary directory failed is not stated (UNRESOLVED).

## Findings outside the claims

- F-a (UNRESOLVED): `tmp/codex/discovery-4-file.err:4-5` records the checkout census exiting 3 (`expected 3 to be +0`); the test was then changed to `expect.soft` and the cause was never established. The multi-listing design adds a race: a file added or removed between the universe listing and a gate listing is falsely flagged (a `prove` probe writing `tmp/probes/*.test.ts` during the census is one plausible trigger).
- F-b: the `tests/a.test.ts:2` case (`discovery.test.ts:53-59`) passes even with the line pattern removed from `full` (`:306`); nothing tests `--tagsFilter`.
- F-c: the empty-row check (`discovery.ts:531`) compares a filter string with Vitest-reported names; a browser project `web` empty under `--mode a` but collecting as `web (chromium)` in the base unit gets an empty row `web`.
- F-d: `discovery.ts:11` and `SKILL.md:14` name exit 2 only as "Vitest cannot list", while the script also exits 2 on an unclassifiable option (`:183`) and on `vitest related` (`:282`); the comment at `:566` says "no chain reaches" where the rule is "no chain containing ` > ` names it".
- Cost: a gate with no arguments selects exactly its unit's universe, so its file-only spawn adds nothing.

## Required changes

1. `discovery.ts:184-190`: match mri's arity.
2. `discovery.ts:171-174`: stop at `--`.
3. `discovery.ts:26-54`: keep `passWithNoTests`, `allowOnly`, and `strictTags`.
4. `discovery.ts:280`: skip `--mergeReports`, `--listTags`, and `--clearCache` invocations.
5. `discovery.ts:296`, `:330-332`: a gate with `--root` and no `--config` lists its universe and itself under that root without `--config`.
6. `discovery.ts:433`, `:451-455`, `:478-482`: `--includeTaskLocation` on the universe and every full gate listing; key full-gate identities on file, project, name, line, and column.
7. `setupServer.ts:854-866`, `setupServer.test.ts:113-139`: prove a package installed only in the checkout cannot be imported from a fixture's consumer, and state why the system temporary directory failed, or allocate outside every directory with a `node_modules` above it.
8. `discovery.test.ts:53-59`: a line-filter case selecting one of two tests in one file, a `--tagsFilter` case, a boolean flag before a file filter, and a duplicate-name case with a partial gate.
9. `discovery.test.ts:1134`: establish the exit-3 cause or remove the listing race.
10. `discovery.ts:11`, `:566`, `SKILL.md:14`: every exit-2 cause and the ` > ` workbench rule.
