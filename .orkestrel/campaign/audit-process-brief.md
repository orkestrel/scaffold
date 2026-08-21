# Audit round: the process family's chain

## Subject

The uncommitted working tree of `C:/Users/mikes/WebstormProjects/process`:

| Round | Claimed to close |
| --- | --- |
| Campaign sweep | `prepack` manifest key; `--ignore-scripts` on the distribution pack |
| Unit P4-engine (+ its fix round, which hardened teardown ordering) | Host-reported stdin faults: one deduplicated channel-failure state, `send` false + one `protocol`-coded `error` event with the host cause; quiet package-initiated closure; `execute` capturing input faults into failed/strict; `ProcessOptions.delivery`; TSDoc corrections |
| Unit P4-proofs | The framing, delivery, fault, and quiet proofs; the flood proof's probe-against-control host adaptation; the guide's stdin and framing prose |

Engine authorship: P4-engine was written by Sol; P4-proofs by Opus. Each lane: attack YOUR OWN
engine's half the harder; a clean pass on your own engine's work is the least valuable result.

## What the round decides

Whether the process chain enters release preparation. process is 0.0.4 on the registry with
mcp, sea, and scaffold as direct runtime consumers and probe transitive — a wrong release here
cascades.

## Already established, by the Orchestrator directly — do not re-run

- Host framing measurements (readline lone-CR behaviour, chunk-split CRLF) — 2026-08-21,
  recorded in the campaign measurements; the proofs' expected values match them.
- The flood proof's red predates the engine (verified by a HEAD-content swap run); the
  adaptation is P4-proofs', not a cover for an engine regression.
- The authoritative host suite after both units: `src:server` exits 0 at
  `126 passed | 6 skipped`; every skip is pre-existing and platform-cited.
- The fd-0 and `ERR_STREAM_DESTROYED` measurements (2026-08-21).

## Review evidence

Run `git status --porcelain` and `git diff` yourself; the whole modified set is the subject.

## Numbered falsifiable claims

1. The channel-failure state deduplicates its two doors: a stdin `error` event AND a write-
   callback error for the same fault produce exactly one `error` emission and settle every
   pending `send` false — under BOTH orderings (callback first; event first). An interleaving
   falsifies this, not an input.
2. Package-initiated closure is quiet on every path: teardown, `end` after `input`, `destroy`,
   and `writable: false` produce no `error` event, and `send` answers false. Name the path you
   attacked.
3. `delivery` never fires an event, never affects a confirmed write, clears on settlement and
   teardown, and holds no event-loop handle after the process settles (a suite that would hang
   open falsifies this).
4. With `delivery` unset, `send`'s observable behaviour is byte-identical to HEAD's — the
   pre-existing pending-write proof passes for the same reason it did.
5. The child's termination experience is unchanged by settlement: the flood proof's
   retained-lines, truncation, and confirmation assertions hold, and the probe-against-control
   adaptation cannot pass on a host where a trapped child's ending differs from the untrapped
   control's without `SIGKILL` escalation.
6. `execute`'s input-fault capture terminates the child, marks the result failed with the host
   cause, rejects under `strict` with that cause, and changes nothing when no fault occurs.
7. The framing proofs pin the measured rule through the REAL `Process` (not a bare readline),
   and the guide's framing sentences match the measured behaviour exactly — including the
   empty line between consecutive CRs.
8. The guide's stdin prose is TRUE, not plausible: `true` means host acceptance; the fd-0
   limit is stated with its date; the pending-until-drain claim is gone; no sentence
   over-claims what a bound can detect. Ask specifically whether any false universal was
   replaced by an unfalsifiable one.
9. No `ProcessInterface` member was added or changed in signature; the published surface's
   diff is exactly the TSDoc and the `ProcessOptions.delivery` member.
10. The tree is coherent as a whole: guides parity and policy agree with the sources. Would
    you ship this as 0.0.5's content?

## Unknowns, named

- POSIX `EPIPE` behaviour is out of reach here: claims that turn on it are `UNRESOLVED` with
  the settling command named (the guide records it as residue — verify the recording, not the
  behaviour).

## Probes

The repository declares the `probe` Vitest project over `tmp/probe/**/*.test.ts`. Reviewer
lane: `tmp/probe/audit-reviewer-*.test.ts`; analyst lane: `tmp/probe/audit-analyst-*.test.ts`.
Delete probes before returning; no whole-project gates while probes exist.

## Verdict

Per the `orkestrel-falsify` skill (scaffold repo, `.agents/skills/orkestrel-falsify/SKILL.md`)
and `.claude/rules/quality.md` § Falsification in this checkout. CONFIRMED requires naming the
attack you tried that failed. A claim you cannot decide is UNRESOLVED, not CONFIRMED — say
what would settle it. Do not hedge toward an imagined consensus.
