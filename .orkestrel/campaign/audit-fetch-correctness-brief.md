# Audit fetch-correctness: the online-first strategy as implemented

## Role and engine

Role `analyst`, engine **GPT-5.6 Sol**, sandbox `read-only`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. You perform this audit directly and spawn
nothing. Cross-engine: units U2 through U5 were written by Claude Opus 5 and U1 by a
Sol implementer under a different brief; you wrote none of the code under audit in this
session's units, and you rule on all of them.

## Subject and evidence

The committed campaign implementing the online-first fetch strategy, at `HEAD` with a
clean tree. Evidence:

- The diff: `git diff da523af..HEAD` — the campaign is committed; `git show` any commit in that range for its message and content.
- The ruling record: `.orkestrel/campaign/design-fetch-reconciliation.md`.
- The unit reports: `unit-fetch-u1-report.md`, `unit-fetch-u2-report.md`,
  `unit-fetch-u3-report.md`, `unit-fetch-u4-report.md`, `unit-fetch-u5-report.md`,
  each carrying its own measured evidence and recorded decisions.
- Read-only `git diff` and `git status` are yours; never a mutating git command.

The suites spawn loopback servers, which your sandbox denies. Rule on row logic and
name those runs host-owned; the reports carry their recorded totals.

## Claims, each falsifiable

1. **The digest chain is sound.** Each staged entry's `digest` is the digest of that
   file's bytes; the membership digest covers the entries including their digests, so
   a moved byte in any vendored file changes it; `stageInventory` produces an
   inventory that reads back through the same validators and verifies against itself;
   the committed `host.json` matches the checkout as of this tree.
2. **The staleness gate binds.** The gate fails when a vendored file's bytes move
   without regeneration and passes after — verify the gate's own logic proves that,
   rather than asserting something weaker (a file's existence, a shape, a count).
3. **The baseline is all-or-nothing and cannot mix.** `copiesToHost` answers
   `undefined` on any non-`found` row and on a path the release manifest does not
   declare; no reachable path assembles a host from live and distributed bytes
   together; no verb writes a target from a mixed baseline. Attempt to construct a
   counterexample from source.
4. **Containment holds: a live read can neither introduce nor delete a path.**
   Membership comes from the installed release manifest; a path present upstream and
   absent from the installed manifest is ignored; a path the installed manifest
   declares and the live inventory omits demotes the surface rather than deleting the
   target's file. Verify against `vendor`, `copiesToHost`, and the verb that consumes
   them.
5. **Every accepted live byte is verified.** A fetched body is checked against the
   inventory's declared digest for its path; a mismatch fails the row; a value host's
   bytes are verified again at materializer construction; no path reaches a target's
   filesystem unverified. Name any gap.
6. **Authoritative absence never falls back.** A registry `404` and a readable
   packument with no admitted version keep their existing refusals for the verbs the
   design names, while a transport-class failure takes the floor. Verify the
   discrimination is real in the landed code — that the verb can actually tell the two
   causes apart from what `Upstream` reports — rather than nominal.
7. **The exit rule is total and correct.** A floor baseline the network forced raises
   the exit code for every verb the table says it does, `new` excepted; `--offline`
   takes the floor without raising it; `catalog --offline` is the usage error; no verb
   exits zero after writing bytes from a baseline it did not intend.
8. **The guide softening is bounded.** A failed mirror row never empties a target's
   existing mirror, never overwrites a differing mirror with an older floor, and never
   lets a partial organization answer rewrite the package table; the skip is named in
   the report.
9. **The executable bit survives.** A value host produces the same modes a staged root
   produces for every materialized path, including the vendored scripts — verify the
   fill lifecycle and its `finally` from source, and name any window where a killed
   process leaves a target inconsistent rather than merely leaving a temporary root.
10. **The documentation claims no more than the code does.** Every behavioural
    sentence U5 added to `guides/scaffold.md` is true of the landed implementation,
    including the request-count claims, the membership rule, the integrity posture,
    and each stated limit.

## Output

Per-claim verdicts — CONFIRMED, BROKEN, or UNRESOLVED — with `file:line` evidence,
then findings outside the claims in their own section. Write the final answer as the
last message. End with exactly one line:
`VERDICT: PASS|FAIL — <n> broken, <n> unresolved, <n> not-evidenced, <n> findings outside the claims`.
No process diary.
