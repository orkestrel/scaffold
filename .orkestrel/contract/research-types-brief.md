# Unit research-types (R2) — TypeScript compile-time performance metrics and techniques

## Role and engine

Cursor Grok (`cursor-grok-4.6-high`), read-only research lane. You are the bench engine reading
this brief inside your own CLI: perform the assignment directly yourself and spawn nothing.

## Objective

Return distilled, primary-source-backed evidence on measuring and improving TypeScript
compile-time and editor-time performance for a published type-heavy library and its consumers.
Evidence only — no decisions, no edits.

## Context

- Subject: `@orkestrel/contract` at `/home/user/contract` (read-only), TypeScript 6.0.2, a shape
  DSL whose public types infer value types from shape declarations (`Infer<S>` over a
  `ContractShape` union). Its measured baseline on 2026-09-01: root project 69995 types /
  108922 instantiations / 8.43 s check; scoped core project 10632 / 12189 / 1.24 s. Neither is
  pathological; the open question is consumer-side cost when applications instantiate large
  shapes.
- Host: Linux, Node v22.22.2, network through a working proxy. You have web access; use it.
- Every technique you report will be probed by measurement before adoption; precision about the
  observable effect and its measurement beats breadth.

## Questions (bounded)

1. Measurement: the exact semantics of `tsc --extendedDiagnostics` rows (Types, Instantiations,
   Symbols, Check time, Memory used), what `--generateTrace` produces and how to read it without
   extra packages, what ts-perf and the TypeScript team use to gate compiler and library
   regressions, and any citable thresholds or heuristics for "too many instantiations" per
   library surface.
2. Library-authoring techniques with their mechanism and measurable effect, citing the
   TypeScript wiki Performance page, microsoft/TypeScript issues/PRs, or maintainer writing:
   `interface extends` vs intersection types; named type aliases as instantiation caches vs
   inline conditional types; distributive conditional type blowups and how to bound them;
   variance annotations (`in`/`out`) and when they cut work; large union costs (comparisons,
   excess property checks) and discriminated-union optimizations; recursion depth limits and
   tail-recursive conditional types; `const` type parameters; generic function instantiation
   caching; declaration (`.d.ts`) size effects on consumer check time; `skipLibCheck` semantics
   for consumers of a published library.
3. Editor-time: what dominates editor responsiveness for a library's consumers (project size,
   declaration complexity, auto-import surface), and how library authors measure it.
4. Prior art briefly: what Zod (v3 vs v4 type rewrite), ArkType, and ts-toolbelt learned about
   type-level performance — the documented techniques, not folklore.

## Scope and containment

Read-only everywhere. No writes, no installs, no credential reads, no raw dumps.

## Output (exact shape)

`Question` / `Evidence` (numbered, each with a primary-source pointer) / `Distillate` (grouped
by the numbered questions) / `Unknowns` / `Deviation`.
