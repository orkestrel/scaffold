# Unit report U2 — guide

Role `implementer`, engine Opus 5 (native). Documentation-voice work is the Opus route by default,
so no engine substitution applies.

## What changed

`guides/process.md` only. 31 insertions, 42 deletions.

- `### Entities` — the `Retention` class row deleted. That section's preamble reads "The classes
  each factory constructs", and `Retention` was never factory-constructed, so the removal also made
  the sentence true.
- `### Retention helpers` — a `captureChunk` row added after the `trimHead` and `trimTail` pair and
  before `buildExecuteResult`, keeping the matched pair together and result assembly last.
- `### Server contracts` — the `RetentionInterface` row deleted and the table re-padded. Its
  preamble narrowed from "the Node child boundary and capture helper" to "the Node child boundary".
- `## Methods` — the whole `#### RetentionInterface` group deleted: heading, prose, method table,
  and fence.
- `### Output bounds` — a reconciliation paragraph and a runnable `captureChunk` fence, placed with
  the claim they prove.
- `## Tests` — the `Retention.test.ts` bullet and the three `execution/*.test.ts` bullets deleted,
  their coverage folded into the `helpers.test.ts` bullet.
- `## Vocabulary` — a `detach` row added after `execute`, `executeSync`, settling the bare-verb
  ruling so the next change does not re-litigate it.

## Evidence the unit took beyond its criteria

The unit ran the fence's exact calls against the real `src/server` barrel through a scratchpad ESM
loader rather than asserting the fence's presence, per `.claude/rules/documentation.md`. It
reported `bounded="hel" refused=undefined`. It also read the one-byte overshoot back out of the
source rather than from its brief, quoting `src/server/helpers.ts:984` and `:990`.

`README.md` names the three functions as APIs, names no `Retention`, and names no source path, so
it needed no edit. The unit verified this rather than assuming it.

## Brief inaccuracies the unit corrected

The brief placed the `RetentionInterface` row in `### Types` and the `#### RetentionInterface`
subsection under `### Server contracts`. In the tree the row sat in `### Server contracts` and the
subsection under `## Methods`. The line numbers were right and the removal set unambiguous, so the
work was unaffected. Recorded because the Orchestrator wrote those attributions from a section-map
read rather than from the lines themselves.

## Handoff the unit produced

Two obligations for the tests unit that its own work created: an `EXAMPLES` row for `captureChunk`
beside the existing `trimHead` and `trimTail` rows, and a flagship transcription for the new
`### Output bounds` fence asserting `'hel'` and `undefined` in place of the deleted `Retention`
transcription. Both were folded into the tests brief as a recorded amendment before that unit was
dispatched.

## Orchestrator's independent verification

- `npm run format:check` — exit 0
- `grep -c 'execution/' guides/process.md` — 0
- `grep -c 'Retention' guides/process.md` — 1, the surviving `### Retention helpers` heading
