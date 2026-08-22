# Audit reconciliation: the online-first fetch campaign

Lanes, both GPT-5.6 Sol under `routing-amendment-cost.md`, run separately and blind,
each told which perspective it held. Verdicts: `audit-fetch-correctness-verdict.md`
FAIL — 5 broken; `audit-fetch-designfit-verdict.md` FAIL — 3 broken. Reconciled by the
Orchestrator 2026-08-22. Every finding below was verified against source before ruling.

## The one defect that matters

**Correctness claim 5 — accepted, and it is a real integrity hole.** The response
reader decodes a body through a default `TextDecoder`, which strips a leading UTF-8
byte-order mark, and the digest comparison then hashes the decoded string
(`src/server/Upstream.ts:871-905`, `:539-551`). A body `EF BB BF 61` satisfies an
inventory digest declared for `61`. The mechanism the whole integrity posture rests on
can therefore accept bytes that differ from what the inventory declared, and the
decode-then-re-encode round trip would write the stripped form into the target.

The two lanes converge here. The design-fit lane independently ruled the row type's
name wrong; the correctness lane ruled its *payload* wrong. Both point at the same
boundary, so one change answers both: the vendored-file row carries raw bytes as
hexadecimal rather than decoded text, matching the `Snapshot` and `HostArtifact.hex`
vocabulary the rest of the host path already speaks, and every digest is computed over
raw bytes on both sides. No decode round trip remains to be lossy.

## Accepted, with rulings

- **Correctness 1 — the staged digest is read from the source before the copy**
  (`src/server/helpers.ts:1445-1462`, `:1473-1496`). Compute each digest from the
  staged destination after copying, so the manifest describes the bytes it published.
- **Correctness 2 — the staleness gate inherits that interleaving.** Fix 1 closes the
  staging half. For the gate itself there is no cheap mechanism that proves nobody
  edited the checkout mid-run, so state the quiescent-checkout requirement where a
  reader meets the gate rather than building snapshot machinery for it.
- **Correctness 3 — the claim's wording, not the code.** The lane confirmed the write
  invariant holds: deferred paths become presence-only artifacts and repair never
  writes their floor bytes. A `Host` value does carry live host-owned bytes beside
  floor bytes for deferred entries, deliberately. The invariant is **one baseline per
  surface**, never "no `Host` value mixes bytes"; the TSDoc and guide say so plainly.
- **Correctness 10 — the guide overstates in two places.** Authoritative absence is a
  `FETCH` refusal for the verbs that write, while `audit` turns release absence into
  questions and returns an audit result; narrow the sentence to the verbs it is true
  of. The request-count statement omits `UpstreamOptions.retries`, which can issue
  repeated requests; qualify it. The exact-byte integrity wording becomes true once
  the byte-order-mark defect is fixed.
- **Design-fit 2 — two term collisions, both verified.** `copy` names three things:
  `WriteTransaction.copy()` (a byte-copy write), `UpstreamEventMap.copy`, and the
  `Copy` type. `Repository` names two: the existing local git-state contract with
  `isRepository`, and the new `UpstreamOptions.repository` remote endpoint. This
  campaign introduced the second collision, so this campaign resolves it. Adopt the
  lane's remedy: the row type becomes `HostFile`, and the local contract becomes
  `Worktree` — a worktree is what that type actually holds, and `repository` is the
  right word for a base and a branch.
- **Design-fit 1 — the one-sentence test fails.** Add the compact corollaries before
  the verb table so each row follows from the stated rule rather than only from the
  table.
- **Design-fit 5 — the guide never says which single value `provenance.guides` takes
  when guide rows mix.** State it. Verify what the implementation actually does first
  and document that, rather than restating the reconciliation's intent.

## Ruled against, on the record

- **The lane's `vendor` → `read` rename.** The diagnosis is accepted — a contract
  documented as a reader that never writes must not carry a name whose ecosystem
  meaning is writing files into a tree. The remedy is not: `read` collides with the
  reader's own private `#read` in the same class, which the lane did not see. The
  method becomes `files`, which carries no write connotation and sits beside
  `catalog()` in the same noun-method pattern the interface already uses.
- **The lane's "baseline word" → "source tier" prose change.** Refused. `Baseline` is
  the type name; renaming only the prose would split one concept across two terms,
  which is the defect the rule exists to prevent.
- **Correctness 9's residue observations.** Recorded rather than fixed: a kill during a
  value-host mutation can leave a temporary root, and a kill between transaction
  promotions can leave a target mixed. The lane confirmed the guide already states the
  promotion limit, and neither is this campaign's to close.

## Carrier

Every accepted finding is carried by `unit-fetch-fix1-brief.md`. No finding is
retained without a carrier, and no finding is claimed by two documents.
