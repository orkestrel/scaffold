# Audit fetch-design-fit: shape, naming, and predictability

## Role and engine

Role `reviewer`, engine **GPT-5.6 Sol**, sandbox `read-only`, rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. You perform this review directly and edit
nothing.

**You hold the SUBJECTIVE lane.** Judge shape, taste, naming, ergonomics, and design
fit — what the API should feel like to a developer who meets it for the first time. The
objective lane runs separately on correctness, constraints, and failure semantics; you
do not duplicate it, and you do not settle a question by proving the code behaves as
written. Where you believe something is incorrect rather than ill-shaped, say so as a
finding outside the claims and let the other lane rule. Engine substitution recorded in
`routing-amendment-cost.md`: both lanes run on one engine under a budget constraint,
separately and blind, which makes holding your assigned perspective the thing that
keeps this lane real.

## Subject and evidence

The committed campaign implementing the online-first fetch strategy, at `HEAD` with a
clean tree — the diff `git diff da523af..HEAD`, the ruling record
`.orkestrel/campaign/design-fetch-reconciliation.md`, and the unit reports
`unit-fetch-u1-report.md` through `unit-fetch-u5-report.md`. Read
`AGENTS.md`, `.claude/rules/names.md`, `patterns.md`, `architecture.md`,
`documentation.md`, and `writing.md` before ruling; they are the standard.

## Claims, each falsifiable

1. **The one-sentence test passes.** A developer who reads the guide's Baselines
   section can state the strategy in one sentence and predict each verb's live,
   forced-floor, and `--offline` behaviour from it plus the stated corollaries,
   without consulting the table. Test this by trying it: derive each row from the
   sentence and name every row that does not follow.
2. **The names carry their meanings.** `Baseline`, `Provenance`, `Copy`, `Host`,
   `vendor`, `repository`, `copiesToHost`, `stageBytes`, `--offline`, and every option
   key added satisfy the single-word entity rule, the one-concept-one-term rule, and
   the named-discriminant rule. Rule on each: does the word name what the thing is, and
   does the repository already use that word for something else?
3. **`Copy` earns its existence beside `Mirror`.** The two row types are structurally
   near-identical. Rule on whether the conceptual distinction — a mirror is another
   package's guide, a vendored file is the canonical file itself — justifies the
   duplication, or whether the design should have widened one type. The subjective
   design lane argued it does; you are free to overturn that.
4. **The option groups fit.** `UpstreamOptions.repository` replacing `guides`, the
   `MaterializerOptions.host: string | Host` union branching on representation rather
   than behaviour, and the environment-variable symmetry read as one coherent surface
   rather than accreted keys.
5. **The guide is in voice and complete.** The added narrative matches
   `guides/scaffold.md`'s established voice; it leads with decisions; it states limits
   where a reader meets them; no section reads like a different author or like a
   campaign artifact; the vocabulary is consistent after the `repository host` pass.
6. **Nothing speculative shipped.** Every added public symbol has a real consumer in
   this change; no capability was added against a future need; no wrapper exists that
   adds no boundary, invariant, or translation.

## Output

Per-claim verdicts — CONFIRMED, BROKEN, or UNRESOLVED — with `file:line` evidence and,
for each BROKEN, the concrete alternative you would ship instead. Then findings
outside the claims. Write the final answer as the last message. End with exactly one
line:
`VERDICT: PASS|FAIL — <n> broken, <n> unresolved, <n> not-evidenced, <n> findings outside the claims`.
No process diary.
