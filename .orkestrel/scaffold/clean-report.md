# CLEAN-SCAFFOLD — report

Unit: `implementer`, Opus 5. Brief: `clean-brief.md`. The owner's ruling: no count in prose, anywhere.

76 files, 451 insertions, 442 deletions. This package is the vendored source, so `AGENTS.md`,
`CLAUDE.md`, `.agents/`, `.claude/`, `.codex/`, and `.cursor/` propagate to every target.

## The vendored mirrors are not this package's to sweep

Every file under `guides/` except `README.md` and `scaffold.md` is a byte-identical mirror of another
package's guide that `scaffold catalog` refetches. `.claude/rules/documentation.md` § Parity refuses
rewriting one: a rewritten copy is a translation, and no comparison against the fetched bytes can
check it.

Those mirrors hold most of the raw hits — the fence-aware sweep returned 921 lines across all of
`guides/` and 201 across the owned set. **Their counts belong to the upstream packages**, and reach
this repository only by being deleted there and refetched. That is a fleet-wide successor over the
upstream repositories, and it is what "in all of the packages" actually requires beyond propagating
the rule.

The verifier confirmed the boundary held: `git diff --name-only | grep '^guides/'` returns
`guides/README.md` and `guides/scaffold.md` and nothing else.

## Scope the unit extended, correctly

Past the brief's enumeration to `ROADMAP.md`, `.codex/`, `.cursor/`, and `.github/`. None is
off-limits, all are prose in this package, and `.codex/` and `.cursor/` are vendored paths that
propagate. `.github/workflows/ci.yml`, `.claude/settings.json`, `.mcp.json`, and every
`agents/openai.yaml` swept clean.

## The shape of what went

The instruction files lost their lane counts: "the two-lane adversarial pass" became "the adversarial
pass", "Two lanes is the FLOOR" became "The subjective and objective lanes are the FLOOR", and
"**Bench laws** rule 2" became "**Bench laws** rule \"Journal first\"". A pass whose lane count is in
its own name cannot grow a third lane without a rewrite, which is the drift the ban exists to stop.

The guide lost its verb and value counts. `ROADMAP.md` lost a table of measurements —
"createRecorder 32/43 packages, createScratch 40/43" — which was a census with a date nobody
recorded, so it became "the figures a fresh count produces".

Test titles were renamed where they carried a count: "reports three missing planned dependencies"
became "reports every missing planned dependency". The unit flagged the tension between the brief's
delete list, which names test names, and the standing condition against changing a literal. **The
Orchestrator ruled the renames stand**: the literal condition guards values the code computes with,
and a test title is prose that happens to sit in a string argument.

## Two the unit referred up, both closed

`orkestrel-falsify/references/brief.md` instructed a brief author to state "the count of prior rounds
and how many were provoked by a defect the previous round believed closed" — a rule's own reference
book directing a count into another document. It left it and flagged it. Now: "naming the prior
rounds and which of them a defect the previous round believed closed provoked."

`enterprise-bootstrap/SKILL.md` kept a checklist row reading "Five states per data surface: ideal /
empty / loading / partial / error". The verifier ruled it a fixed domain set. **Overruled**: a design
taxonomy is a set anyone can add to, and the members are named in the same line, so the number adds
nothing. It reads "Every state per data surface" now.

## What survives, and why

Durations, sizes, versions, dates, exit codes, and measurements reported with their run. Thresholds
and budgets that govern behaviour — "at most two real alternatives", "four to eight events", "Three
rounds at one seam is the budget". Format facts fixed by definition — "sixty-four lowercase
hexadecimal digits", "two digits per byte". Comparator arity — "Compare two versions".

Collision scenarios where the number *is* the scenario: "two vendored files claim one storage name",
"two transactions over one target". `both` where the two members are named in the same sentence.
`second` meaning *another* rather than a list index.

## Gate evidence

`verifier`, Sonnet: `format:check`, `lint:check`, `check`, `build`, `test`, and `node
dist/bin/main.js audit` all exit 0. The audit reports 0 of 126 planned paths drifted. `src:core` 315,
`src:server` 357, `src:bin` 168, `policy` 86, `config` 29, `guides` 7.

The rule survived its own sweep: `AGENTS.md:160` still carries "**NEVER state a count.**" and `:163`
still carries "Delete a count you find. Do not correct it."
