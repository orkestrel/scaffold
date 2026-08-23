# Unit W6 — rewrite the guide for a scaffold that generates the distribution proof

## Role and engine

`implementer`, Opus 5. Documentation voice is the subjective work class.

## Objective

Bring `guides/scaffold.md` back into agreement with what this package now does. Two adversarial
audit lanes found the drift and both reported it is a rewrite of a described model, not a set of
stale rows.

## What changed under the guide

Read these first-hand; they are the settled design and the shipped behaviour:

- `.orkestrel/campaign/distribution-design-reconciliation.md` and
  `.orkestrel/campaign/design-v50b-reconciliation.md` — the rulings.
- `.orkestrel/campaign/audit-w2-verdict.md` — the audit that found this drift.
- `.orkestrel/campaign/unit-w4-report.md` and `.orkestrel/campaign/unit-w5-report.md` — the manifest
  writer and the setup question.

In one paragraph: `Blueprint.distribution` no longer exists. Scaffold now **generates**
`tests/distribution.test.ts` into every publishing workspace as a presence-owned artifact, so a
target lacking it reports drift and `repair` writes it, while a target that replaced it keeps its
own bytes untouched. `repair` and `overwrite` now also write the manifest's script region when the
chain is the recognized scaffold-generated shape, and refuse without mutating when it was
customized. `audit` now raises a non-blocking `setup` question naming filled setup modules that no
proof covers. Scaffold still writes no setup, guide, conformance, or service proof.

## The passages that are now false

Verified by the Orchestrator at these lines. Treat them as a starting set, not the whole of it.

- `:108` — the `DISTRIBUTION_TEST_PATH` row still reads "whose presence makes a workspace
  `distribution`". Presence no longer makes anything; the path is where the proof is planned.
- `:532` — instructs the reader to add `tests/distribution.test.ts` to select the project.
- `:720` — "the declared flag alone adds no project, no `test:distribution` script, and no gate
  entry". There is no flag.
- `:861` — lists `tests/distribution.test.ts` among proof files "that you add to select their
  projects". It is now presence-owned and generated.
- `:866` — lists `distribution` among proofs "selected by their defining paths".
- `:1345` — "Scaffold emits no proof into any registered project, because each names something only
  the package knows… so the file a consumer writes is the file that selects the project." This is
  the passage both lanes called the real problem.

## The line the rewrite must draw

That last passage states the policy that also decided, in this same campaign, that scaffold must
**not** generate a setup proof. The policy is still right; it just has an exception now, and the
guide has to say what separates them.

A distribution proof's assertions are derivable from the installed artifact — the `exports` map,
the built declarations, and what the package publishes to a Node import, a CommonJS require, and a
real browser. A guide, conformance, service, or setup proof's assertions are not: each names
behaviour or an external artifact only the package knows. Scaffold generates the first and refuses
the rest, and that is the whole rule.

Write that distinction once, where the reader meets it, and let the other passages point at it
rather than restating it.

## What else the guide now owes the reader

- Presence ownership at that path, and what it means for a workspace that replaced the proof.
- The manifest script-region write: what a recognized chain gets, and that a customized chain is
  refused without mutation and left with the advisory naming the exact line to paste.
- The `setup` question: what raises it, that it is non-blocking, that `audit` alone raises it, and
  that scaffold does not write the proof it asks for.

## Unknowns

Whether `guides/README.md` or any other guide states a fact this change falsifies. Check and report;
fix it only if it is in `guides/` and states something now false.

## Scope

**Owned:** `guides/scaffold.md`, `guides/README.md` if it states something now false, and
`host.json` only through regenerating it with the project's scripts.

**Off-limits:** everything under `src/`, `tests/`, `configs/`, `.claude/`, `.agents/`,
`vite.config.ts`, `package.json`, and `.orkestrel/`. This unit changes prose and tables, not code.
If you find a code defect, record it against its file and line and leave it.

## A trap that has already cost this campaign one red gate

`guides/scaffold.md` is a **vendored host file** — `host.json` declares it and `dist/host/guides`
ships it. Editing it restales the inventory, and `readHostFloor` then refuses to hydrate, turning
the whole `src:server` suite red. After your edits, run:

```text
npm run build && npm run build:inventory
```

`npm run build` already invokes `build:host`; a second invocation fails on a non-vacant staging
root, which is expected rather than a defect.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with the objective stops you and you report it. Where a paragraph sits, which heading a
section takes, and how a sentence is worded are yours to settle, record, and carry on from.

## Acceptance criteria

Ordered so a cheap gate cannot be skipped by an expensive one failing first.

1. `npm run format:check` exits 0.
2. `npm run test:guides` exits 0. No symbol row is removed; parity checks symbol coverage, so a
   deleted row fails it.
3. `grep -n "declared flag\|makes a workspace \`distribution\`\|add to select their projects" guides/`
   returns nothing.
4. The guide states, in one place, what separates a proof scaffold generates from one it refuses,
   and every other passage points at it rather than restating it.
5. The guide documents presence ownership at the proof's path, the manifest script-region write and
   its refusal, and the `setup` question.
6. `npm run build && npm run build:inventory` exit 0, and `host.json` shows the guide's digest and
   the inventory digest moved.
7. `npm run lint:check` and `npm run check` exit 0.
8. `npm test` exits 0. If it fails, run each link of its `&&` chain separately and report every
   one, because the chain short-circuits and hides every project after the first failure.

## Review evidence

Return the actual `git diff --stat` and `git status --short`.

## Output

Return, with no process diary: the diffstat and status; one line per criterion with its exit code or
evidence; the passage where you drew the generate-or-refuse line, quoted; the unknown answered; and
anything you could not close, named.
