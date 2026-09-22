# The setup-module findings and who carries them

The Orchestrator's own reconciliation, taken while CL10 was live. It exists because the carrier
statement three findings were assigned to went stale the moment CL10 was dispatched, and the dispatch
contract's rule is that a finding with no carrier is a dropped finding.

## What happened

CL9's verdict assigned its objective findings 9, 10, and 11 to "whichever unit next touches the freeze
assertions or the normalizer". Both live in `tests/setupStyles.ts` and its proof.

**CL10 owns both files.** Its brief grants them for extending the vocabulary comparison. So CL10 is
that unit — and its brief does not name the three findings, because they were written after the brief
and the carrier was phrased as a condition rather than as a name.

That is the shape the contract warns about: a carrier named by description rather than by unit reads
as assigned and is not.

## The three findings

- **A vacuous portion of the freeze loop.** Part of it iterates containers whose entries are strings,
  and every primitive reports frozen, so that portion cannot fail under any mutation. Vacuous rather
  than wrong; the same loop carries the object-bearing tables.
- **The even-child equivalence is exact-text at depth zero.** It would not equate an uppercase or
  spaced spelling, nor one nested inside a functional pseudo-class. Unreachable today, and the
  doc-block states exactly the narrow rule the code implements, so nothing drifts.
- **The normalizer regression case reads its rows from the guide's default path**, so unrelated guide
  state could redden it for a reason unconnected to the normalizer. It reds loudly rather than passing
  silently, and the case could supply its own row while still driving the real scanner.

None is forcing. All three are test-quality findings in one file.

## The ruling

**They are not added to CL10 mid-flight.** CL10 is dispatched against a brief that does not carry
them, and sending a decision into a live unit is the mid-campaign rule's business only where the
decision invalidates the brief. These do not: CL10's obligations stand unchanged whether or not these
three are fixed.

**They are assigned by name, in order of the first opportunity that actually opens:**

1. **CL10's fix round, if the audit gives it one.** A fix round's brief is written after the audit, so
   it can carry them without disturbing the dispatched work. This is the likeliest home.
2. **Otherwise the cross-cutting reconciliation unit** in `units/value-accounting-finding.md`, which
   already carries CL8's findings 7 and 10 — also about this same file's reading of the built artifact.
   Grouping them there puts every outstanding setup-module finding in one unit rather than scattering
   them across later families.

**They are not assigned to CL11, CL12, or CL13**, none of which owns this file: CL11 owns the journey
and setup-browser modules, CL12 the guide, CL13 the portfolio record. Assigning a finding to a unit
that cannot reach its file is how a carrier goes stale a second time.

## The rule this earns

Name a carrier by the unit, not by a condition. "Whichever unit next touches X" is a description that
stops being true as soon as the next unit is chosen, and nobody re-reads it at that moment. Where the
next unit is not yet known, say so and re-check at the next dispatch — which is what this record does.
