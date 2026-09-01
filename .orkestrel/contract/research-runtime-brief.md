# Unit research-runtime (R1) — runtime performance metrics, methodology, and techniques

## Role and engine

Cursor Grok (`cursor-grok-4.6-high`), read-only research lane. You are the bench engine reading
this brief inside your own CLI: perform the assignment directly yourself and spawn nothing.

## Objective

Return distilled, primary-source-backed evidence on (a) trustworthy benchmark methodology for
Node 22 / V8, (b) the metric catalog for runtime performance of a JavaScript library, and
(c) the technique catalog relevant to a pure-TypeScript validation/contract library's hot paths.
Evidence only — no decisions, no recommendations ranked as decisions, no edits.

## Context

- The subject library is `@orkestrel/contract` 0.0.14 at `/home/user/contract` (read-only): a
  dependency-free TypeScript validation/contract package published as ESM+CJS, hot paths are
  shape validation, guard checks, parse/audit/explain walks, compiled through a
  `ContractCompiler` class that builds frozen method bundles with lazy per-artifact getters and
  `WeakMap` working sets. Do not read the whole tree; skim `/home/user/contract/src/core/` file
  names and `/home/user/contract/src/core/types.ts` top-of-file only if it sharpens the technique
  relevance. Your main work is external primary sources.
- Host: Linux container, Node v22.22.2, network through a pre-configured proxy (normal HTTPS
  fetches work). You have web access; use it.
- The consumer of this distillate designs a measured-performance campaign: every technique you
  report will be probed in isolation before adoption, so precision about the observable effect
  and how to measure it is worth more than breadth.

## Questions (bounded)

1. Microbenchmark methodology on V8/Node: what makes a result trustworthy — warmup and JIT tier
   effects (Ignition/Sparkplug/Maglev/TurboFan), on-stack replacement, dead-code elimination of
   benchmark bodies, GC interference, per-process isolation, median-of-rounds vs mean, coefficient
   of variation, steady-state detection. What methodology do mitata and tinybench implement, and
   what do the V8 team's own writings say about benchmarking pitfalls?
2. Metric catalog with the exact Node 22 instrument for each: CPU time per operation
   (`process.hrtime.bigint`, `perf_hooks`), allocation and retained bytes per operation
   (`process.memoryUsage`, `--expose-gc`, heap snapshots/statistics), GC activity
   (`PerformanceObserver` gc entries, `v8.getHeapStatistics`), inline-cache state and
   deoptimization (`--trace-ic`, `--trace-deopt`, `--allow-natives-syntax` intrinsics such as
   `%GetOptimizationStatus`), startup/import cost, and anything else with a citable source.
3. Technique catalog for hot paths, each with its mechanism and the condition under which it
   measurably matters on V8 (cite V8 blog/docs/design docs where possible): hidden-class (shape)
   stability and object literal initialization order; monomorphic vs polymorphic vs megamorphic
   property access and call sites; `delete` and dictionary mode; frozen objects (`Object.freeze`)
   and their interaction with inline caches and property access speed; closure allocation in hot
   paths; `Reflect.apply` vs direct calls vs `Function.prototype.call`; `WeakMap`/`Map` get/set
   costs vs plain-object lookup; array element kinds (packed/holey, SMI/double/element
   transitions); string concatenation and rope flattening; try/catch cost in hot functions on
   modern V8; spread/rest and arguments-object costs; getter/accessor cost vs data property;
   destructuring cost; for-of iterator protocol overhead vs indexed loops; class `#private` field
   access cost.
4. Prior art in the same domain, briefly: what Zod 4/4.5, Valibot, and ArkType each did for
   runtime performance (compilation, discriminated-union dispatch, code generation, allocation
   avoidance), with pointers.

## Scope and containment

- Read-only everywhere. No file writes, no edits, no state changes. Never run package installs.
- Never read credentials, `.env*`, `.npmrc`, auth files, or environment values beyond what a
  fetch needs.
- Do not dump raw pages or raw files; distill.

## Output (exact shape)

- `Question`: one line.
- `Evidence`: concise numbered facts, each with a primary-source pointer (URL or `file:line`).
- `Distillate`: the smallest context a designer needs, grouped by the numbered questions.
- `Unknowns`: unresolved facts, stated as unknowns.
- `Deviation`: only if a question could not be researched, with the exact failure.
