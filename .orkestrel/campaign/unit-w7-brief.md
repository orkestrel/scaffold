# Unit W7 — replace a stale tally in scaffold's own distribution proof

## Role and engine

`implementer`, Opus 5, clean context.

## Objective

`npm run prepublishOnly` is **red**, so 0.0.50 cannot publish. Make it green by replacing one
assertion whose shape is wrong, not by updating the number it pins.

## The failure, reproduced

```text
FAIL |distribution| tests/distribution.test.ts > installed package consumer >
     answers every example its shipped declarations print exactly as printed
AssertionError: expected 188 to be 183
 ❯ tests/distribution.test.ts:455:19
```

`tests/distribution.test.ts:455` reads `expect(shaped).toBe(183)`. `shaped` is incremented at `:325`
once per claim-shaped line found across the shipped declarations and the injected controls. This
campaign added exported symbols whose TSDoc carries `@example` blocks, so the population grew from
183 to 188. The number is stale; nothing is broken.

## Why the fix is not `188`

`AGENTS.md` § Writing bans a count over a set anyone can add to, and this campaign already applied
that standard to the generated proof: the reconciliation refused export tallies on the ground that
name-set equality is strictly stronger, and a pre-publication ruling held that a cardinality
assertion is acceptable only where it pins a **structurally fixed** set — never one that moves as
the package's published surface moves. This tally moves exactly that way. Bumping it ships a release
whose own proof carries the shape its generated proof forbids, and it will go stale again on the
next documented export.

## What the assertion actually protects, and what already covers it

Read `tests/distribution.test.ts` from `:290` to `:470` before editing.

- `:454` — `expect(driven.length + undriven.length + glossed.length + elided.length).toBe(shaped)`
  proves the four lists **partition** the population. It is load-bearing, self-maintaining, and
  stays exactly as it is.
- The `mismatched` assertion at `:459` pins two exact control strings, so an extractor that stopped
  reaching the **injected controls** already fails there.
- The unique risk the tally covers is different from both: an extractor that silently narrows over
  the **shipped** declarations while still reaching the controls. Then `shaped` drops, the partition
  still holds vacuously, and the controls still fire.

## What to build

Replace `expect(shaped).toBe(183)` with an assertion that catches a narrowing extractor without
pinning a number that grows with the documented surface. The property to establish: **every shipped
declaration contributed at least one claim-shaped line.** A declaration that falls to zero is the
narrowing this guards against; a declaration that gains examples moves nothing.

Track the per-declaration figure where `shaped` is already incremented, and assert over the
declarations by name so a failure names which one went silent. Keep `shaped` and the partition
assertion.

Settle the exact shape yourself against `.claude/rules/tests.md`. The binding properties are that a
declaration reaching zero fails, and that adding a documented example to any declaration does not.

## Unknowns

Whether `DECLARATIONS` at `:45` is reachable at the assertion site with the names needed to report
which declaration went silent. Read it and say what you found.

## Scope

**Owned:** `tests/distribution.test.ts` in this repository, and nothing else.

**Off-limits:** everything under `src/`, `guides/`, `configs/`, `.claude/`, `.agents/`,
`.orkestrel/`, every other file under `tests/`, `host.json`, `vite.config.ts`, and `package.json`.

Note for the record: this file has been deliberately byte-untouched for the whole campaign, because
that is the evidence that presence ownership never rewrites a workspace's own proof. **A maintainer
editing it by hand does not falsify that** — the claim is about what the tool does, not about what
its author may do. Say so in your report so the evidence is not misread later.

Do not commit, push, install a dependency, or run any `git` command that discards a working-tree
change. You are the sole serial writer.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with the objective stops you and you report it. The assertion's exact form, its message,
and where the per-declaration figure is accumulated are yours to settle, record, and carry on from.

## Acceptance criteria

Ordered so a cheap gate cannot be skipped by an expensive one failing first.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `grep -n "toBe(183)\|toBe(188)" tests/distribution.test.ts` returns nothing.
5. The partition assertion at `:454` is unchanged.
6. **The new assertion carries a firing control.** Make it fail on purpose once — narrow the
   extraction so one declaration contributes nothing, record the red output naming that declaration,
   restore it, and record the same command green. Report both readings verbatim. An instrument that
   has never failed is not evidence.
7. `npm run test:distribution -- --mode release` exits 0. Report its counts and duration. This packs
   and installs against the live registry and takes roughly a minute.
8. `npm run prepublishOnly` exits 0. This is the gate that decides whether 0.0.50 can publish, and
   it runs every other gate ahead of the proof.

## Review evidence

Return the actual `git diff` of `tests/distribution.test.ts` and the actual `git status --short`.

## Output

Return, with no process diary: the diff and status; one line per criterion with its exit code or
evidence; the red and green readings from criterion 6 verbatim; the unknown answered; and anything
you could not close, named.
