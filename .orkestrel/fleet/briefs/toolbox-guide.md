# Unit toolbox-guide — guide parity for the form-flow adoption

Role and engine: `implementer` (Claude Opus 5, subjective lane — documentation voice).

## Objective

`guides/toolbox.md` documents the form flow the code now implements; the guides parity test
passes.

## Context

- Repo `/workspace/toolbox`, branch `claude/orkestrel-fleet-orchestration-b0t5cy`. The tree is
  dirty with the accepted form-adoption diff (src + tests) — build on it, do not revert anything.
- The code truth to document (from the landed unit): prompts accept `{ to, schema }` and construct
  live multi-field forms with `@orkestrel/form`; answers accept `{ id, values }` validated by
  `isFormValues` (imported from `@orkestrel/form`); pending records expose `{ id, from, schema }`;
  the HTTP bridge returns structured JSON results; expiry keeps toolbox's typed `EXPIRE` behavior;
  `coerceAnswer` no longer exists.
- The failing proof: `npm run test:guides` — 2 failures, both from `guides/toolbox.md` importing
  and documenting the removed `coerceAnswer`. Read the failures first; they name the exact drift.
- Read before writing: the changed `src/core/{factories,helpers,shapers,types,constants}.ts` and
  `src/server/routes/*.ts` in the working tree, and `.claude/rules/documentation.md`. Guide fences
  import through `@orkestrel/toolbox` published specifiers, never `@src/*`.
- Writing rules bind: plain prose, lead with the decision, one idea per sentence; parity means
  every backticked API resolves to a real export and every public export is documented.

## Scope

- Owned: `guides/toolbox.md` only.
- Off-limits: everything else — src, tests, package files, other guides.
- Validation: `npm run test:guides` (read-only).

## Execution

Perform the edit directly; spawn nothing.

## Output

1. What changed in the guide, three lines or fewer.
2. `npm run test:guides` exit code.
3. `git diff --stat guides/toolbox.md`.

## Deviation contract

Stop and report only if parity cannot pass without editing a file outside `guides/toolbox.md`.
Prose structure and section placement are yours to decide.

## Acceptance criteria

- `npm run test:guides` exit 0.
- No documented API that does not exist; no public export left undocumented; `coerceAnswer`
  absent from the guide.
