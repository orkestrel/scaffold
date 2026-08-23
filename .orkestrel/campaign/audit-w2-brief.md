# Audit brief — unit W2, the generated distribution proof

## Objective

Break these claims. Do not confirm them. Each is stated so it can be falsified by reading the
committed diff and running commands; a claim you cannot falsify with evidence survives, and a claim
you can falsify is a finding.

The subject is commit `4f3aa61` in `/home/user/scaffold`. Read the actual diff:
`git show 4f3aa61 --stat` and `git show 4f3aa61 -- <path>` for each file. The unit's own report at
`.orkestrel/campaign/unit-w2-report.md` is the subject of the audit, not evidence for it — a report
is what the writer says happened.

## The design the unit implements, which is settled and not yours to reopen

`.orkestrel/campaign/distribution-design-reconciliation.md` and
`.orkestrel/campaign/design-v50b-reconciliation.md`. A finding that the design should be different
is out of scope. A finding that the implementation does not match the design is in scope.

## Numbered claims

1. `Blueprint.distribution` no longer exists in the contract, and no code path reads it or a
   substitute for it. The predicate that replaced it is `blueprint.src.length > 0`.
2. A compiled plan for a blueprint with a non-empty `src` contains exactly one artifact at
   `tests/distribution.test.ts` with `ownership: 'presence'`, `origin: 'template'`, and
   `group: 'tests'`. A plan for a blueprint with an empty `src` contains none.
3. This repository's own `tests/distribution.test.ts` is byte-identical to its state before
   `4f3aa61`, and still passes.
4. The generated proof classifies an entry as a browser entry by testing its resolved export
   **target** against the built browser output directory. No rule anywhere in the generated text
   keys the browser branch on a subpath's name.
5. The generated proof's declaration locator resolves a `types` target from a **flat** export entry
   whose `types` sits at the top level, and from a condition-nested one, through the same code path.
6. The generated proof attempts a browser launch and classifies the rejection. It never asks whether
   a browser exists before deciding, and it handles the `connectOptions`, `executablePath`,
   `channel`, and empty shapes that `resolveBrowser` can return.
7. Under `import.meta.env.MODE === 'release'`, an unreachable registry fails and an unlaunchable
   browser fails. Outside release mode each skips and cites its mechanism.
8. The generated proof emits no package name, no export name, and no count of any set — its
   assertions are name-set equality, both directions.
9. The generated proof passes `format:check`, `lint:check`, and `check` inside a workspace scaffold
   generates, not merely inside this repository.
10. The change introduces no stub, no TODO, no skipped test, and no deferred logic, as `AGENTS.md`
    requires.
11. Each of the three edits outside the brief's owned list — `src/core/validators.ts`,
    `src/core/factories.ts`, `tests/setup.ts` — is a deletion of the removed member and nothing
    else.
12. The generated proof imports nothing from any `@orkestrel/*` package, so the `test` package needs
    no branch.

## Evidence you may produce

You have Bash where your role allows it. Three scratch workspaces the unit built remain at
`/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/{c8core/coreonly,c8/tinter,c8full/fullface}`
and can be re-run. `.orkestrel/campaign/rehearsal/` holds the independently proven reference
instruments. Playwright's pinned path does not exist on this container; the ladder in a generated
`configs/browsers.ts` finds `chromium-1194`.

Do not modify anything under `/home/user/scaffold`. Put any instrument you write under
`/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/audit/` and
nowhere else.

## Output

For each claim, in order: the number, a verdict of **SURVIVES** or **FALSIFIED**, and the evidence —
the exact command and its output, or the exact file and lines. A verdict with no evidence does not
count and you must mark it **UNTESTED** instead, naming what would settle it.

Then one section of findings outside the claim set, if you have any, each with the file, the line,
and why it is wrong.

Then exactly one terminal line: `VERDICT: PASS` if every claim survives, or `VERDICT: FAIL` naming
the falsified claim numbers.

No process diary. Do not restate this brief.
