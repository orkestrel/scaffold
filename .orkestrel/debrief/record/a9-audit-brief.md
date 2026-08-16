# A9 audit — transcript disclosure (writer was Opus, auditor is Sol)

## Role and engine

`analyst`, engine **GPT-5.6 Sol** via the journaled codex CLI, read-only sandbox.
Correctness audit; you never implement, reconcile, or accept.

## Subject

Commit `654e487` in `/workspace/supervisor` (range `2d68a77..654e487`, 8 files, +296/-4
plus the new 123-line `tests/app/browser/parsers.test.ts`): a recognized transcript frame
renders as a labelled collapsed row disclosing its verbatim bytes; an unrecognized fragment
renders exactly as before.

Read the diff first: `git -C /workspace/supervisor diff 2d68a77..654e487`.
Gate evidence (Orchestrator-run): app:browser 494/494; parity 374/374; check green; scoped
format/lint clean. The captured fixture files are at `tmp/a9/frames-{agent,claude,codex,cursor}.jsonl`
— read them; they are the ground truth the parser claims to cover. Do not run browser
suites; read-only scoped commands only.

## Context

- `AGENTS.md` non-negotiables bind. The writer's measured ground: the ollama agent lane
  emits no transcript frames (register fed only by WorkspaceProviderExecutor); claude 8,
  codex 5, cursor 6 captured frames.
- Deliberate rulings, not findings: native `<details>` with `aria-expanded` mirrored onto
  `<summary>` from the UA toggle event (the portfolio tree describer reads the attribute);
  `describeValue` reused as the note's bound; no function-type alias for the parser; the
  one-rule design (record naming a non-empty `type`) instead of a vendor table.

## Claims to falsify (verdict each, with file:line evidence)

1. The parser's one rule covers every captured frame: for each line in the three CLI
   fixture files that is one JSON record naming a non-empty `type`, `parseTranscript`
   returns a summary whose `event` matches that frame's type (+subtype where stated) —
   check the actual fixture files against the code, not just the test's selection of them.
   If any captured recognizable frame falls to `undefined` or mislabels, REFUTE with the
   line.
2. No byte can be lost or altered on the disclosure path: the template interpolates
   `entry.text` exactly once, nothing re-serializes it, and the byte-equality test binds
   that (a re-encode, trim, or truncation anywhere between the entry and the `<details>`
   body would fail it).
3. The `undefined` arm is airtight: a non-JSON chunk, a half-written line, a JSON
   non-record, a record with a missing/empty/non-string `type` all return `undefined`, and
   such an entry's rendered output at 654e487 is identical to 2d68a77's (same element,
   same classes, same text) — the regression-pin test proves it rather than asserting a
   weaker property.
4. The note extraction cannot throw or mislabel on adversarial shapes: `result`/`text`/
   `item.text`/`message.content[].text` absent, null, non-string, arrays of mixed parts,
   nested traps — the parser narrows with the contract guards and never uses `as`, `!`, or
   an unchecked index.
5. The keyboard proof is real: the test reaches the `<summary>` by Tab alone, toggles with
   Enter, and asserts `details.open`, `aria-expanded`, and the tree states; and the
   `aria-expanded` mirror cannot disagree with the native open state (verify the toggle
   listener's wiring and its initial value).
6. The red/green pair binds: the two disclosure tests could not pass at 2d68a77 (no
   parseTranscript export, no details element), and the regression-pin test passes at BOTH
   ends by design — confirm that is stated and true.
7. The portfolio `disclosed` scenario drives real interactions through the registered
   journey drives, the registry audit still binds one frame per state and variant, and the
   captured tree shows collapsed and expanded rows as the report claims.
8. The four guide edits state only what the code does; every backticked name resolves; the
   amended `describeValue` row is true (it now bounds transcript words); and the claim
   "opens and closes on Enter, on Space, and on a pointer with no script behind it" is
   true of a native details/summary in the delivered markup (no script intercepts).
9. The diff introduces no `any`, `as`, non-null `!`, suppression, mock, fake clock, new
   dependency, or unrelated change; `parseTranscript` and `TranscriptSummary` are
   barrel-reachable and tested; `helpers.ts` is untouched; no hidden module helper.

## Execution

Perform the audit directly and spawn nothing. Journal under
`/workspace/supervisor/tmp/codex/` and return the journal path and session id with the
result.

## Output

Numbered verdicts 1-9, each `CONFIRMED` or `REFUTED` with `file:line` evidence and one line
of reasoning; findings outside the claims as `F<n>` with evidence and a proposed carrier;
then exactly one terminal line: `AUDIT: PASS` or `AUDIT: FAIL <claim numbers>`. No process
diary.

## Deviation contract

If the diff or the fixture files cannot be read, stop and report which and why. Grep depth
is yours.
