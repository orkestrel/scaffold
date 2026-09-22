# F5d PHYSICAL — checker lane verdict (`checker` on Sonnet, 2026-09-22)

Lane held: mechanical (`checker`, Sonnet). Ruled claims 5, 8, 9, 10, 11; claims 1 to 4, 6, 7, and 12 referred UNRESOLVED to the subjective and objective lanes.

- Claim 5 CONFIRMED. Grep over `tests`, `src`, `guides` for the machinery names finds nothing; `normalizeValueToken` is gone with no consumer; `splitTopLevelValues` survives with its consumer at `tests/setupStyles.ts:215` (`extractShadowLayers`) plus its own cases at `tests/setupStyles.test.ts:378-396`; the styles-setup inventory case (`tests/setupStyles.test.ts:163-171`) lists the surviving set exactly. Mutation named: reintroducing any name or dropping the consumer would make the grep hit.
- Claim 8 CONFIRMED. No `logical propert|direction.neutral|direction neutrality` hit in `guides/veneer.md`; the `img` row (`guides/veneer.md:846`) and the `.img-fluid`/`.img-thumbnail` compatibility row (`:976`) read physical; `test:guides exit=0` at `tmp/audit/f5d-gates.log.txt:4401`.
- Claim 9 UNRESOLVED at read time: the gate log ended mid `test:setup:browser` with no `=== gates done` line. (Orchestrator: the log completed at 17:57:26 with every gate `exit=0`; the completed log is the executed evidence.)
- Claim 10 BROKEN as written: `tmp/audit/f5d-status.txt:1` lists ` M configs/src/vite.styles.config.ts`, which the claim's text excludes; the change is the two-line comment rewrite the evidence index discloses as the Orchestrator's integration of the unit's returned patch (`tmp/audit/f5d.diff:1-16`). No other off-limits path, untracked path, or `tmp/probe/` entry appears. Prose, not code: a landing-time correction of the claim's text, not scope creep.
- Claim 11 CONFIRMED. The banned-term pattern and a growable-set numeral pattern over the diff's added lines return nothing.

VERDICT: FAIL 9, 10; outside the claims: none
