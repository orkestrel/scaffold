# Unit V2: registry-aware verbs

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. Ruling record:
`.orkestrel/campaign/design-versions-reconciliation.md` § Q4 and the analyst detail in
`design-versions-objective-report.md` § Registry routing — read both first. V1 landed the
core layer (derived tables, the range-to-major helper, the pure `replacePlanRanges`
compiler with plan re-hash); build on it. This unit adopts the ruled design; a departure
stops the unit. You perform the assignment directly and spawn nothing beyond probes under
`tmp/` that you delete after reading.

## The work

1. **`Upstream` selection.** `lookup` answers the newest published version the declared
   range admits, selecting from the `versions` map of the abbreviated packument it already
   fetches — no new request, no new endpoint, `'*'` unbounded. Select before applying any
   collection bound (`MAX_COLLECTION_ITEMS` is 1000 and typescript publishes more versions
   than that — the newest must not fall off). Where the map is pruned or absent, fall back
   to `dist-tags.latest` clamped by the declared range: an honest no-answer when the latest
   crosses the major.
2. **`Materializer.declare`** routes through V1's shared range replacement instead of its
   own text rewrite; behavior across dependencies, devDependencies, and peerDependencies
   is proven by the existing suite plus a case per section if missing.
3. **The verbs**, per the reconciliation's table, with the CLI JSON results gaining
   `releases` evidence for `audit`, `repair`, and `catalog`:
   - `new`: resolve every planned `@orkestrel` row across all three sections, apply
     through `replacePlanRanges` before materialization; offline or partial → coded
     `FETCH`, exit 1, nothing written.
   - `audit`: async; every declared fleet row gets a release verdict; drift = the declared
     string differs from `^${latest}` exactly; foreign rows compare extracted major only
     (V1's helper), reported as a non-blocking question when behind a served major; a
     failed lookup is a failed verdict, reported, exit 1, nothing written.
   - `repair`: async; resolve the complete set before any write; call `declare` with it;
     offline → `FETCH`, exit 1, nothing written.
   - `catalog`: derive release verdicts for the target's declared set from the packuments
     it already fetches; declare the resolved set with its write; offline → `FETCH`,
     exit 1, nothing written.
   - `overwrite`: require a complete release set before `declare` — never a partial pin
     set; a partial failure preserves completed offline work, writes no ranges, sets
     `note`, exits 1.
4. **The reversed comment** at the `#dependencyQuestion` site ("Ranges are deliberately out
   of scope…") is rewritten to the new policy.
5. **Tests**: `tests/src/server/Upstream.test.ts` and `Materializer.test.ts` cases for the
   selection rule (newest-under-range, `'*'`, pruned-map fallback, the never-cross-major
   control), and `tests/src/bin/CLI.test.ts` / `helpers.test.ts` coverage per the
   reconciliation's test table — loopback fixture registries in the file's existing idiom,
   never a live registry in tests. Report the count of `CLI.test.ts` call sites the async
   change moved, with the command that produced it.

## Scope

- Owned: `src/server/Upstream.ts`, `src/server/Materializer.ts`, `src/server/types.ts`,
  `src/bin/CLI.ts`, `src/bin/types.ts`, `src/bin/helpers.ts`,
  `tests/src/server/Upstream.test.ts`, `tests/src/server/Materializer.test.ts`,
  `tests/src/bin/CLI.test.ts`, `tests/src/bin/helpers.test.ts`.
- Off-limits: everything V3 owns (`tests/src/core/**` fixtures and mirror cases,
  `tests/distribution.test.ts`, `guides/scaffold.md`); V1's files except where a type the
  verbs need lives in `src/core/types.ts` — a needed core type change is a deviation to
  report, not an edit.
- Standing entries: everything `git status --porcelain` lists at your start (V1's diff is
  standing).
- The `npm` PowerShell shim is blocked on this host — use `npm.cmd` / `npx.cmd`. The
  sandbox denies network for live registry reads; every test drives a loopback fixture.
- No commits, installs, or `git checkout`/`restore`/`stash`/`reset`/`clean`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus your owned
   files; report before/after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first: the never-cross-major control red against a probe weakening the
   selection; the overwrite complete-set rule red against a probe restoring the partial
   write; each green after with the plant's removal shown.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server`
   exits 0; `--project src:bin` exits 0; totals reported.

## Output

The complete unelided diff; raw output and exit code per criterion including the
failing-first pairs and the async call-site count; any deviation. No process diary.

## Deviation contract

Stop on: a core type change the verbs need; a criterion unreachable; any V3-owned file
needing an edit. Result-shape field naming within the rules is yours: decide, record,
carry on.
