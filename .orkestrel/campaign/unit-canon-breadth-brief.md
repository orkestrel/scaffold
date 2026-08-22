# Unit canon-breadth: the round budget becomes a strategy switch

## Role and engine

Role `implementer`, engine **Claude Opus 5**, in the main checkout at
`C:/Users/mikes/WebstormProjects/scaffold`. You perform the assignment directly and spawn
nothing. These are instruction files executed by agents mid-task: before editing, read
`AGENTS.md` § Writing and § Instruction files, `.claude/rules/writing.md`, and the three
owned files in full. Every line you write is a directive with an observable trigger; no
persuasion clauses, no history of how the rule was found, no counts outside stated
limits, spaced em dashes, the file's own wrap width.

## The ruling this unit lands

The user's diagnosis, adopted as canon: the three-round seam budget was a patch for the
symptom of endless audits. The true diagnosis is that deep per-defect rounds cannot see
that a recurring defect runs along a stream, so the budget's expiry is a signal to switch
search strategy, never a bare stop. The campaign evidence: teardown defects recurred
across audit rounds in one package, a breadth sweep up the dependency chain found the
source upstream in another package, the source was fixed there, and the downstream work
then closed in bounded rounds. A second loop shape the switch also names: an audit whose
subject reprices itself on every edit — a count or census of prose — has no closing
condition and serves nothing; the closing move is asking what the audit is trying to
accomplish.

## The edits, one home per rule

### 1. `.claude/rules/quality.md` § Rounds and verdicts — the law

The current bullet, verbatim:

> **Three rounds at one seam is the budget.** Repeated rounds against one seam are
> evidence about the design, not evidence of diligence. At the third round the next unit
> is a ruling — on the threat model, the mechanism, or the boundary — taken with the same
> adversarial pass a design gets, not a fourth repair.

Replace it with the strategy-switch law carrying this substance, in the section's bullet
voice:

- The bold lead states that the budget holds and that its expiry is a strategy signal,
  not a stop.
- At the third round, name what the audit is trying to accomplish, then pick the
  successor strategy by what the recurrence shows.
- Recurrence with a direction — each fix relocates the class along one stream, or the
  evidence points up a dependency chain: stop deepening and run one breadth round that
  probes the stream's stations in parallel to locate the source; then plan downstream
  from the source, sized by the sweep's map. Point to
  `.agents/orchestration.md` § Context and decomposition for the breadth round's shape;
  do not restate it.
- Recurrence with no direction — the seam itself is the question: the next unit is the
  ruling the current text already prescribes (threat model, mechanism, or boundary,
  taken with a design's adversarial pass, not a fourth repair). Keep that substance.
- A subject that reprices itself on every edit — a count, a census, prose totals — has
  no closing condition and is not a seam: drop the claim, or recast it as the property
  the tally stood in for.

The two neighbouring bullets (writing the round count into the matrix row; stating the
ruling that ends a seam) stay, and must still read coherently against the replacement —
adjust a referring word only where the replacement forces it.

### 2. `.agents/orchestration.md` § Context and decomposition — the operational move

The current frame bullet at `:210-213`, verbatim:

> - Break a repeating frame deliberately. When several rounds against one subject keep
>   finding the same class of defect through a new door, the search is following the
>   frame rather than the defect. Bound the scope, then fan out independent lenses over
>   disjoint slices in one pass. Parallelism is worth more here for the framing it
>   breaks than for the wall-clock it saves.

Keep it, and add one sibling bullet directly after it carrying this substance:

- When the recurring class has a direction — each fix relocates it along one stream: a
  dependency chain, a data path, a call chain — the source is elsewhere on that stream,
  and deepening the current station cannot find it. Switch from depth to breadth: fan
  probes over the stream's stations in parallel, blind and clean-contexted, as far up
  and down as the stream runs, to locate the source. Then plan downstream from the
  source with the sweep's map of how far the defect reaches, so the remaining work has a
  measured bound instead of an open count of rounds. Name that the seam budget in
  `.claude/rules/quality.md` § Rounds and verdicts states when this fires.

### 3. `.agents/skills/orkestrel-falsify/SKILL.md` § When a round is warranted — the pointer

After the paragraph ending "there is no subject — closing is the correct action and the
next subject is the deliverable." add one short paragraph: when the same class has
recurred along one seam to the budget in `.claude/rules/quality.md` § Rounds and
verdicts, the next move is that law's strategy switch — the breadth sweep of the stream,
the ruling, or the dropped moving-target claim — not another successor round. One
sentence or two, in the skill's voice, restating nothing from the law.

## Scope

- Owned: `.claude/rules/quality.md`, `.agents/orchestration.md`,
  `.agents/skills/orkestrel-falsify/SKILL.md`.
- Off-limits: everything else — `AGENTS.md`, `CLAUDE.md`, every bridge
  (`.claude/skills/`, `.cursor/`, `.codex/`), the guide, and the manifest pair. The
  bridges are pointers and mirror nothing; verified by grep before this dispatch.
- No commits, no installs, no mutating git commands.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the owned files; report before and
   after.
2. `npx.cmd oxfmt --config .oxfmtrc.json --check` over the owned files exits 0.
3. A case-insensitive sweep of the owned files' changed regions finds no
   `.claude/rules/writing.md` § Substitutions hit in a banned sense (`should`, `just`,
   `easy`, temporal `once`, causal `since`, and the rest of the table); report the
   sweep's pattern and result.
4. `npm.cmd run test:policy` and `npm.cmd run test:config` exit 0 (the vendored-file and
   template instruments that could see these files); totals reported.
5. The complete diff.

## Output

The complete diff, per-criterion exit codes and results, and any deviation (expected,
found, exact evidence, done or not done, at most one short hypothesis). No process
diary.

## Deviation contract

Stop on: a criterion unreachable; an off-limits file needing an edit; a mirror of the
budget law you discover somewhere this brief says does not exist. Wording within the
stated substance is yours: decide, record, carry on.
