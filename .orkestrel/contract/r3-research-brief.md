# Unit R3 — research the techniques the contract performance campaign has not applied

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached through the `agent` CLI in ask mode. Read-only research. Spawn nothing, edit nothing, install nothing.

## Objective

Return distilled, source-pointed evidence on five bounded questions so a design round can pick candidate mechanisms for `@orkestrel/contract` 0.0.15 (a closure-compiled TypeScript validation library: `is`, `parse`, `audit`, `explain`, `generate` families compiled per shape) and can prove each by a probe before writing code. Every claim carries one of three labels: `[local]` read from a file under `/home/user/contract`, `[fetched]` read live from a URL in this run (name the URL and the HTTP status), or `[memory]` recalled with its canonical URL. Never present a `[memory]` claim as `[fetched]`.

## What is already applied (do not re-propose)

Order-aware array snapshot (sort only on out-of-order own keys); compile-time presence bitmask for objects up to 31 keys; single-slot cycle ledger promoted to `WeakMap` on the second object; refinement gate so unrefined leaves build no fault helper; `anyOf` first-clean-variant return in diagnostics. Refused on measurement: replacing `attempt` (try/catch Result helper) with inline try/catch; dropping internal `Object.freeze` calls (47 ns per call, documented frozen returns); replacing `Reflect.apply` with direct calls (measured tie). Excluded on doctrine: lazy diagnostics in `readValue`; type-level work (consumer instantiation fixtures are linear and small).

## Measured today on the 0.0.15 tree (node v22.22.2, Maglev off by default, ns/op)

medium `is` 2100, `parse` 2204, `audit` 4802, `explain` 3262, `generate` 5813; deep `is` 6383, `audit` 13731, `explain` 8897, `generate` 16870. CPU profile of deep `audit`: the `readValue` diagnostics arrow 12.9%, the audit object-plan closure 12.1%, the array-entries reader 10.7%, garbage collector 10.6%, `attempt` 7.4%, per-call `get pattern` + `readPatternFlags` 4.8%. Compile heap: medium full contract 13681 B, deep 59257 B.

## Questions (answer each, in order; bound each to the strongest three sources)

1. **Clean-walk diagnostics without allocation.** How do Zod 4 (and 4.5 if you can name the changelog entry), Valibot, and ArkType avoid allocating issue objects, path arrays, and result containers on a walk that finds nothing wrong? Name the mechanism (lazy issue array, path computed on push, boolean pre-pass before the traversing pass, error object built on demand, abort-early flags) and the source file or doc that shows it. State which of those mechanisms keep a documented "the report is a fresh frozen array" contract intact and which change observable output.
2. **V8 mechanism costs on Node 22 (TurboFan, Maglev off).** For each, give the documented or measured direction and a primary source: `Object.freeze` on a fresh small array and whether a later frozen-array read stays on the fast path; `Object.keys` plus a `Set` versus a precomputed declared-key list checked with `Object.hasOwn` plus a length comparison to detect extras on a closed object; `Reflect.getPrototypeOf` per call versus a cached-brand check; `String(index)` per array slot versus a precomputed index-string table; per-call path arrays copied with `pathOf` versus a parent-pointer linked path materialized only on a fault; `try/catch` around a non-throwing body; `new WeakMap()` construction versus a slot write; getter re-reads of a shape option (`get pattern`) per call versus a compile-time captured constant.
3. **Tightening a paired A/B microbenchmark harness.** The current harness loads two dist copies in one process, alternates order across 49 rounds, and reports the median of per-round B/A ratios; its identity control read 0.96–1.03 idle and 0.81–0.99 under load. What do mitata, tinybench, Google Benchmark, and the V8 team recommend for: CPU pinning (`taskset`), GC noise (`--max-semi-space-size`, `--single-threaded-gc`, `--predictable`, forcing GC between rounds), steady-state detection (coefficient-of-variation windows), and a paired statistical test (bootstrap confidence interval on the ratio, Mann–Whitney U, Wilcoxon signed-rank) that yields a defensible admission threshold below 4%? Give the concrete recipe with sources.
4. **Compile-tier heap.** For a closure-compiled validator that eagerly builds guard, parser, auditor, reporter, and generator closures per node, which techniques cut retained bytes per compiled contract without adding per-call work: lazy family compilation behind a getter (compile `audit` on first read), sharing per-node plan tables across families, replacing per-node closures with a shared interpreter over a compact plan record, or interning repeated leaf plans by shape identity? Name any library that does each and where.
5. **Zod 4.5 performance delta.** What did Zod 4.x releases after 4.0 change for runtime performance (parse path, issue construction, memoization of compiled schemas)? Fetch `https://registry.npmjs.org/zod/latest` and the GitHub releases page if reachable; otherwise label `[memory]`.

## Scope

Read-only. You may read `/home/user/contract/src/core/*.ts`, `/home/user/contract/guides/contract.md`, and `/home/user/contract/package.json`, and fetch public web pages. Do not read `node_modules`, credentials, or environment values. Run `git -C /home/user/contract status --porcelain` before and after; any change is a deviation.

## Output

Return exactly: `Question` (one line), `Evidence` (numbered facts, each with its label and pointer), `Distillate` (one section per question: the candidate mechanisms as evidence, with the probe that would settle each and the documented contract it must not break), `Unknowns`, `Deviation`. No design decisions, no verdicts, no raw dumps.
