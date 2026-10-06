# Unit journey-cost-mutations-selection: the selection reader admits name-filtered siblings

Route: astra (implementation). You are the sole writer of `/home/user/veneer/tmp/units/journey-cost/mutations.ts` and its proof material under `/home/user/veneer/tmp/units/journey-cost/` (`fixtures/`, `proofs.json`, `README.md` § Mutations). No other process writes those files; `/home/user/veneer/AGENTS.md`'s non-negotiables bind the code.

## Objective

`mutations.ts` runs the runner with `--testNamePattern ^TITLE$ --project PROJECT` and then refuses the run when the JSON report has any skipped assertion ("Selected run must have 0 skipped tests", `readSelection`). Vitest reports every case the name filter excludes as `skipped` (`numPendingTests`), so a target whose file holds more than one case can never pass: the first real gate run (`/home/user/veneer/tmp/units/journey-cost/runs/lane0-gate-mutations/mutations.json`) selected exactly the target case (1 failed, 158 skipped; `mutations.json.0.runner.json`) and was refused. The Orchestrator rules: a selection is valid when exactly one assertion is `passed` or `failed`, its normalized full name equals the target title, its status is the expected one, and every other assertion is `skipped` or `pending` because of the name filter; `numTotalTests` equals passed + failed + pending. The text-summary fallback (no JSON report) applies the same rule to the `Tests` line: exactly one `passed` or `failed`, any number `skipped`.

## Governing texts (read first)

- `mutations.ts` (`readSelection`, the spawn arguments near 212-232, exit codes 0, 64, 66 in the usage comment).
- `README.md` § Mutations (the sentences on selection and refusal; rewrite them to the ruling).
- The real run: `runs/lane0-gate-mutations/mutations.json` and its `mutations.json.N.runner.json` files (read-only).
- The proof material: `fixtures/`, `proofs.json`, `report-tools-2.md` (how the proofs run), and the compare amendment's shape at `lane-compare/report.md` for a precedent.
- Rules: `/home/user/scaffold/.claude/rules/typescript.md`, `architecture.md` (no nested functions), `names.md`, `writing.md`.

## The change

1. `readSelection` admits `skipped`/`pending` siblings as described; it still refuses zero selected cases, two or more, a different title, the wrong status, and count disagreement (`numTotalTests !== passed + failed + pending`).
2. The text fallback admits `N skipped` beside `1 passed` or `1 failed`.
3. The usage comment and the README state the rule.

## Proof

- Fixture reports: a filtered run (1 failed + 158 skipped) passes as red; its green twin (1 passed + 158 skipped) passes; two selected cases refused; zero selected refused; a selected case with a different title refused; counts disagreeing refused. Build the fixtures from the existing fixture shape; you may copy the two real runner JSON files into a fixture folder as the filtered examples.
- The retained mutation proofs keep their exits.
- Run each proof twice with byte-identical reports (`cmp`).
- Do not run the real mutation gate (the Orchestrator runs it); do not launch Vitest or Chromium.

## Host

Node only; the proofs run directly. Launch nothing else.

## Forbidden

Installs, commits, pushes, destructive commands, edits outside the owned files, changes to the spawn arguments or exit codes, a second writer.

## Return shape

Report file `/home/user/veneer/tmp/units/journey-cost/lane-mutations/report.md` with the diff summarized by function, the proof commands with exits and `cmp` results, and deviations. Your final message is a short summary naming the report path.
