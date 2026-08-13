# Fix round 3 — integration record

Sol wrote the source and tests. The Orchestrator found two defects in that work by measurement and
closed both before the prose unit was dispatched.

## What Sol closed

| Finding | Repair | Red-then-green |
| --- | --- | --- |
| F1 `roundTripJSON` spread ceiling | both spreads become one-child-at-a-time loops | pre-fix core run: 1 failed, 22 passed |
| F3-source `read` throws raw `EISDIR` on a directory | package-authored `Scratch path is a directory: <target>` | pre-fix server run: 2 failed, 24 passed |
| F2 `resolveContained` refuses contained paths | `isAbsolute(target)` disjunct deleted, `readInventory`'s normalization deleted, TSDoc corrected | n/a — contract change, re-proved below |
| F7 six missing regression proofs | permanent tests added, each with the one-line mutation that reddens it | coverage, no red-first required |

The containment surface was re-proved after the F2 change, because that change touches what round 3
had already confirmed:

```text
POSIX absolute-root: /workspace/root
POSIX normalized-inside: /workspace/root/inside
POSIX absolute-lexical-escape: undefined
POSIX prefix-control: undefined
POSIX_REALPATH_ESCAPE Directory outside root: .../root/link/nested
WIN32 drive-relative: C:\root\inside
WIN32 cross-drive: undefined
WIN32 same-share-UNC: \\server\share\root\inside
WIN32 cross-share-UNC: undefined
WIN32 prefix-control: undefined
```

An absolute escape is still refused, and no longer because it is absolute: `relative(root, target)`
yields a parent-escaping path the existing disjunct catches.

## Orchestrator findings against the fix

**The strengthened timer assertion was a flake.** Sol raised `elapsed >= delay / 2` to
`elapsed >= delay`, which is past what the runtime guarantees. Measured across 1,600 samples:

```text
worst_elapsed 19.2578  undershoots_of_400 4      # idle
worst_elapsed 19.1824  undershoots_of_400 6      # 4x concurrent
worst_elapsed 19.2576  undershoots_of_400 3
worst_elapsed 19.1844  undershoots_of_400 5
worst_elapsed 19.1860  undershoots_of_400 8
```

`setTimeout(20)` undershoots 20ms in roughly 1–2% of runs with a floor near 19.18ms, and the floor
does not move under load — it is clock-source slop between `performance.now()` and the timer loop,
not scheduling delay. At 41 repositories that is a recurring red CI.

The floor is now `delay * 0.9`. It fails the half-delay mutant at 10ms and clears the measured
minimum by 1.18ms. Proved both directions: 25 consecutive runs green, and the mutant
`setTimeout(resolve, ms / 2)` red then green on restore.

The general rule this instance follows: a regression proof must fail the mutation it names **and**
pass the real implementation on every host it will run on. Tightening an assertion to the exact
requested value is not strictness when the runtime does not promise that value.

**The package had no CI.** All 41 published packages run `.github/workflows/ci.yml`; this one had
none. Scaffold does not vendor the file — `.github/` appears only in `ORCHESTRATION_PATH_PREFIXES`,
which classifies rather than vendors — so each repository owns its own. Added as a byte-identical
copy of the 30-package majority variant, the plain gate chain on Node 22.12.0 and 26. The other four
variants add Playwright browsers or a live service, and this package has neither.

## A prediction that was wrong, and what it changes

Sol's brief named a standing condition: the `guides` project would go red once F2 made two fence
lines false. **It did not.** The parity test checks that a fence *imports* real exports and that
documented names resolve; it never executes a fence. So the guide carried a false `// undefined`
beside a call that returns a path, and every gate stayed green.

The substance of the condition held — the guide was made false — and only the mechanism was wrong.
Recorded because the failure mode is the one `.claude/rules/documentation.md` already names, and
because it is why the prose unit's acceptance criteria put fence execution above the suite: its
criterion 3 passes whether or not criterion 4 holds, and the brief says so in those words.

Building a fence-executing gate is a fleet-wide capability belonging to `@orkestrel/guide` and
scaffold's vendored parity test, not to `@orkestrel/test`. Recorded there, not built here.
