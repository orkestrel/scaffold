<!-- checker on the native cheap tier, native subagent, clean context, read-only. The MECHANICAL
INVENTORY lane of the CL13 portfolio verdict, one of three blind lanes on one portfolio. Brief:
cl13-verdict-brief.md. Terminal line: ANOTHER ROUND(3, 4), converted to carriers by the verdict.
Transcribed by the Orchestrator from the agent's returned result, because a native read-only lane
holds no write tool and produces no report file.

RETAINED LATE, at the campaign's own review, with the sibling design-fit lane, after the Orchestrator
found it had retained only one of this round's three lanes. -->

# CL13 portfolio verdict — mechanical inventory lane

**Toolset limit stated up front by the lane.** It held read, grep, and glob only — no hashing tool and
no PNG-header reader. Any claim requiring a byte-level digest or an exact pixel dimension it did not
read from a written manifest is corroborated visually at best, never proven at the byte level. Where the
only source for such a number was the Orchestrator's own observations file, it ruled UNRESOLVED, per the
standing rule that a claim resting only on a report is never confirmed.

## Candidate rulings

**1. The container cap matches Bootstrap exactly — CONFIRMED, width only.** Bootstrap's side read from
the harness manifest: 1140 wide at 1280 and 390 at 390. Veneer's widths match per the Orchestrator's
PNG-header reading and are corroborated visually — both frames render the caption on one unwrapped line.
The height figures belong to candidate 3, not this one.

**2. The row stacks at the same breakpoint on both sides — CONFIRMED.** Bootstrap's manifest gives an
exact doubling at 390. Veneer doubles too, and visually the 390 frame shows two stacked lines where the
1280 frame shows one row.

**3. Systematically shorter, uniform font-size departure — PARTIALLY REFUTED.** Container and row hold a
constant 0.875 ratio, matching the recorded departure. The table figure does not fit that ratio —
149/163 is 0.914 — and the lane found no independent source for the 149 figure: absent from the
observations file, absent from the pinned inventory, unreadable by its own tools from the PNG. **The
uniform claim is refuted for the table leg; the container and row leg stands.**

**4. 32 frames carry 14 distinct images — UNRESOLVED.** A digest claim whose only source was the
Orchestrator's own report. Sampled visual comparison is consistent with it — the same state at the same
width across two projects renders pixel-identical to the eye — but visual sampling cannot confirm a
digest claim and this lane had no hashing tool. **Routed to a lane that can run a digest.** (The
objective lane subsequently ran SHA-256 and confirmed it.)

**5. The link key's frames are width-invariant on both sides — CONFIRMED.** Bootstrap's manifest gives
identical dimensions at every one of the four role-link entries; Veneer's two frames are visually
identical.

**6. The link element frame shows one anchor of nine — CONFIRMED.** Bootstrap's accessibility snapshot
lists nine link roles, and its manifest records the element selector with a match count of one for every
role-link entry. Both Veneer element frames show only the primary link. Confirmed as stated: a gap in
what the portfolio can show, not a cascade defect.

## Findings

**7. Veneer's side of the portfolio carries no accessibility snapshot.** Searched the frame directory for
any snapshot file; no match — it holds only frames. Only the harness side has role and name data, so the
brief's question of whether the two sides show the same roles cannot be answered. **Cost:** a reviewer
cannot use this portfolio to check role or accessible-name parity for any of the four keys; that check is
unproven, not passed.

*Orchestrator's correction, recorded at retention:* the lane searched the frame directory alone. Veneer's
variant artifacts beside it do carry a full accessibility tree and a 22-entry interaction log. The
conclusion survives in narrowed form — that data is per-variant, not per-specimen, while the harness's is
per-specimen — so the comparison the brief asked for is still not possible, for a different reason than
the lane gave.

**8. The registry-to-frame mapping is exact.** The registry declares four states and derives their dark
twins for eight in all. Cross-checked against the 32 filenames: every declared state appears at exactly
four variants, and no frame carries an undeclared state. Every declared state has a frame; every frame has
a declared state. No cost — this leg of the coverage claim holds.

**9. The link key's dark twin does not visually differ from its light twin, on either side**, because the
element crop captures only the inline anchor with no surrounding background. Checked the harness side for
the same reason it might have been Veneer-only: also white-background. By contrast the container, row, and
table dark twins clearly differ from their light counterparts. **Cost:** the link key's dark-mode
registration adds no distinguishing information to this portfolio on either side.

**ANOTHER ROUND(3, 4)**
