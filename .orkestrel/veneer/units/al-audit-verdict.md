# Audit verdict — ALERT (`al`), round 1 (2026-09-23)

Subject: `al.diff` (the four untracked owned files in `/home/user/veneer-al` over `c3ac297`), `al-status.txt`, `al-shared.patch`, the report `b-modal-al-report.md`; claims `al-audit-claims.md`; brief `b-modal-al-brief.md`. Lanes: the objective lane on `reviewer` on Opus 5.5 (`al-audit-objective-verdict.md`), substituted for `analyst` on Astra (the Codex bench dark on quota at the 15:16 UTC dispatch; the bench came live at 15:18, so this is the last substituted round); the subjective lane on `reviewer` on Opus 5.5 (`al-audit-subjective-verdict.md`); `checker` on Sonnet (`al-audit-checker-verdict.md`); blind on one claims file. The writer was `opus` on the same engine family.

| Claim | Objective | Subjective | Checker | Reconciled |
| --- | --- | --- | --- | --- |
| 1 Delta and scope | BROKEN (wording) | CONFIRMED (wording noted) | BROKEN (wording) | CONFIRMED on scope; the claim's "removes nothing but" clause was a claims-file fault (the M6 sentence replacement and the `#### btn-close` realignment are brief-authorized) |
| 2 The partial and the cascade | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 3 The cascade proof | BROKEN (eight logs against another revision) | UNRESOLVED (same finding) | — | BROKEN: the eight base-copy mutation logs do not bind to the shipped proof |
| 4 The section and specimens | CONFIRMED | CONFIRMED (`role="alert"` kept) | — | CONFIRMED; `role="alert"` stays on every alert (the release's markup, the Elements and Mailbox references, the spinner precedent) |
| 5 The capture rows | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 The tables and the ledger | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 7 The guide content | BROKEN (R17 sentence; § Showcase wording) | BROKEN (7a R17; 7b physical direction) | — | BROKEN on 7a and 7b; the § Showcase clause was a claims-file fault (the showcase sentence lives in the class section, the Close precedent) |
| 8 Law and report | BROKEN (nouns) | BROKEN (8a nouns; 8b comment) | CONFIRMED | BROKEN on the nouns and the comment; the compatibility cells' bare paths keep the sibling rows' form (the CLOSE-GUIDE sweep ruling; carrier CLOSE-OUT) |

## Rulings

- **Claim 3.** Round 2 reruns the eight mutations (`role-alias`, `role-literal`, `loop-roles`, `close-left`, `close-plain-alert`, `link-dropped`, `heading-dropped`, `literal-padding`) on a fresh validation copy against the shipped `alert.test.ts`, retains one log per mutation, one unmutated control log, and the exact script that produced them, and corrects the R19 matrix where a row's log changes. No test change is owed for this claim.
- **7a (R17).** The sentence takes the objective lane's wording: "…and a dismissible alert whose close control is named through its `aria-label` attribute." The base `CLOSE_COPY` in `app/browser/constants.ts` carries the same "announces the dismissal it performs" wording outside this delta; round 2 carries the same correction there inside its shared patch, because the file and the defect are the same.
- **7b (physical direction).** The tree names physical direction wherever direction matters. Round 2 writes "right" at each site the subjective lane names, adds "The room and the control's placement are physical, so they sit at the right whatever the document's writing direction." to the dismissible paragraph, and renames the `ALERT_DISMISSIBLE_GEOMETRY` key `end` to `right` with its three readers.
- **8a (nouns).** "the `close` method removes the `show` class"; "The `right` field…", "The `block` and `inline` fields…", "the `lift` field…"; "one `light` scenario and one `dark` scenario"; "No specimen carries the `fade` class or the `show` class"; "carries the `fade` class" in the plugin row. The two compatibility cells ending on the proof's path keep the sibling rows' form.
- **8b.** The partial's inset comment reads "The control's block inset is the release's `1.25` multiple of its inline inset, and each is written over the density token the alert's own inset reads."
- **R2 (the dismissible case's name).** The case adds a hit reading at the close control's box center through the installed `readHit` reader, so the name "above the content" binds to a measurement; the case keeps its `z-index` reading.
- **The `h4` in `Linked alert` (referral).** The heading level inside a live region is the release's own example markup (`alert-heading` on an `h4`); it stands.
- **Claims-file faults.** Claim 1's removal clause and claim 7's § Showcase sentence are recorded against the claims file; round 2's claims name the authorized removals and the class-section showcase sentence.

## Carriers

Every finding is carried by `al-brief-2.md` (the fix round on `opus`, audited by `analyst` on Astra as the objective lane, `reviewer` as the subjective lane, and a checker): claim 3, 7a with the `CLOSE_COPY` correction, 7b, 8a, 8b, and R2. The compatibility cells' form is CLOSE-OUT's.

VERDICT: FAIL 3, 7, 8; outside the claims: R2, the `CLOSE_COPY` wording — carried by the fix round
