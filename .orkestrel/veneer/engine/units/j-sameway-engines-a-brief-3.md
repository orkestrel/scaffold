# Unit J-SAMEWAY-ENGINES-A, round 3 — one shared leaf for the prior-value return

Successor of `j-sameway-engines-a-brief-2.md`. Its sections stand except where this brief replaces them. Round 2 is committed as `5805a28` on `unit/engines-a`, and the worktree is clean at it. Round 2's report is `units/j-sameway-engines-a-report-2.md`.

**Why.** Your round-2 deviation 1 found `Collapse`, `Tab`, and `Carousel` each carrying an almost identical `#record`, `#read`, and `#rewind` set, and `Toast` its own `#record`. `AGENTS.md` requires consolidation, meaning repeated behaviour routed through one shared implementation. It also requires reusable logic to be exported from its centralized file and tested, and a leaf to be pure where it can be. `#read` returns `null` for an absent value, where `AGENTS.md` makes absence `undefined` and `HostSnapshot` already records an absent target as `undefined`. J-SAMEWAY-ENGINES-B and later Modal and Offcanvas will adopt the same leaf, so it lands once, here.

## The obligation

- **L1: extract the leaf.** Move the prior-value record, read, and rewind into exported, tested leaves in `src/browser/helpers.ts`, named by `.claude/rules/names.md`'s module-helper rule. Route `Collapse`, `Tab`, `Carousel`, and `Toast` through them.
  - The classes keep their orchestration: the identity and lifetime reads before each write, and the phase stops.
  - No class keeps a private copy of the leaf.
  - No wrapper merely renames the leaf.
- **L2: absence is `undefined`.** A read of an absent attribute, token, or inline property yields `undefined`. Read `HostSnapshot`'s own target reading first. If a leaf `HostSnapshot` can share already exists, or if `HostSnapshot`'s reading can move into the same leaf, use one reading for both, and say which you chose.
- **L3: types.** Declare the entry shape once in `src/browser/types.ts`, beside `HostSnapshotTarget`, with its § Surface row in `guides/veneer.md` for parity.
- **Proofs.**
  - `tests/src/browser/helpers.test.ts` gains cases for each leaf: a write that changes nothing records nothing; a target is recorded once; the rewind runs in reverse order and skips a target at its recorded value; and absence reads `undefined`.
  - The four engines' round-2 cases stay green unchanged.
  - Rerun the round-2 instrument against the moved code, re-anchoring any row whose anchor moved, and add a row per leaf rule.

## Scope

- **Owned:** round 2's owned files, plus `src/browser/helpers.ts`, `tests/src/browser/helpers.test.ts`, `src/browser/types.ts` for the entry shape alone, and `guides/veneer.md` for the § Surface row alone.
- **Report-only:** the round-2 guide patch `tmp/j-engines-a/guide-2.patch`. Regenerate it against your final tip, and check it with `git apply --check`.
- **Off-limits:** as round 2, and `HostSnapshot.ts` unless L2's shared reading needs it. If it does, name the change and stop before making it.

## Output

Your final message holds:
- the files touched;
- the leaves' names and signatures;
- which reading L2 chose;
- the helper cases with their readings;
- the mutation table from the log;
- the regenerated patch's path;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it. Use no heredoc, no `python -`, and no `node -e`.
