# A9 — transcript disclosure: a labelled row that opens to its verbatim bytes

## Role and engine

`implementer`, engine **Opus 5**, native, high effort. Sole serial writer in
`/workspace/supervisor` from the clean committed baseline current when you start (read
`git -C /workspace/supervisor log --oneline -1` and record it). Perform directly, spawn
nothing, no commits/pushes/installs. Read `AGENTS.md`, `.claude/rules/browser.md`,
`.claude/rules/patterns.md`, `.claude/rules/tests.md`, and `guides/src/supervisor.md`
before editing. An audit follows; your self-report is not acceptance.

## The defect (E1 finding 4, filmed)

A transcript frame renders as one raw monospace line
(`app/browser/components/FeedItem.vue:161-168`, `{{ entry.text }}`): a structured provider
event becomes a JSON wall on the feed, and a long stream of them buries the register's
signal. The bytes are the evidence and must survive untouched — what changes is how a
reader meets them.

## The mechanism (ruled by the reconciled design round — build exactly this)

1. **Types first.** `TranscriptSummary` in `app/browser/types.ts`: the readable label a
   recognized frame renders collapsed. Shape yours within the naming laws (single-word
   members; named discriminants if it carries one).
2. `parseTranscript(text: string): TranscriptSummary | undefined` — a pure exported leaf in
   `app/browser/parsers.ts`, declared in types first. It returns `undefined` for anything
   it cannot read, and such a line renders exactly as it does today. No second
   source-language analyzer: this reads JSON with `JSON.parse` and narrows with the
   existing contract guards, nothing more.
3. **FeedItem**: a recognized transcript frame renders as one collapsed row carrying the
   label, disclosed on demand to the verbatim text. No transcript byte is discarded,
   reordered, or rewritten; the disclosure holds `entry.text` exactly. An unrecognized
   frame renders as today.
4. **A11y is a criterion, not a garnish**: the disclosure is a real control — reachable and
   operable by keyboard alone, its expanded state exposed as state (`aria-expanded` on the
   control or a native `<details>`), and the collapsed label readable by the same
   accessibility tree the portfolio records. Prefer the native element if it satisfies the
   voice; record the choice.
5. **Presentation stays in the browser.** `src/**` and every provider are off-limits;
   labelling a wire frame for a reader is presentation.

## Unknowns

- The real frame shapes. Capture genuine transcript lines rather than inventing them: the
  ollama daemon is running warm (qwen3.5:2b answers in under a second), and the built
  server at `dist/` can drive one real `run:'agent'` workflow the way
  `tmp/a8-probe/probe.mjs` does (copy the pattern into your own scratch under `tmp/`, do
  not reuse its workspace). Read what the transcript register actually carries for at
  least the ollama lane, and state in your report which shapes `parseTranscript`
  recognizes, which provider lanes those cover, and what falls to `undefined`. If a lane's
  frames cannot be captured in this environment, say so and cover it with `undefined`
  behavior rather than a guessed parser.
- Whether the feed's existing collapse vocabulary (stack rows fold) has a term the
  disclosure should reuse. Read the register vocabulary in the guide before naming
  anything.

## Scope

**Owned:** `app/browser/parsers.ts`, `app/browser/types.ts`,
`app/browser/components/FeedItem.vue`, `tests/app/browser/parsers.test.ts` (create),
`tests/app/browser/components/FeedItem.test.ts`, `tests/app/browser/portfolio.ts`,
`tests/app/browser/portfolio.test.ts`, a scratch capture script under `tmp/a9/`.
**Off-limits:** `src/**`, `app/server/**`, `app/core/**`, `app/browser/controllers/**`,
`tests/setupBrowser.ts`, configs, manifests, `guides/**` (report-only patch with measured
parity evidence, as A7 and A8 did).

## Acceptance criteria

1. Red first for the collapsed-row render and the disclosure, commands and counts pasted.
2. `parseTranscript` tested against the real captured frames (fixtures pasted into the
   test as inert data — recorded evidence, not mocks) plus the `undefined` arm.
3. Keyboard-only proof: the disclosure opens and closes without a pointer in the component
   test, and the expanded state is readable from the accessibility tree.
4. Registered portfolio state (or an extension of an existing one) showing a labelled
   collapsed transcript row and one disclosed row, generated in the capture run.
5. `npx vitest run --config vite.config.ts --project app:browser` green; `npm run check`
   green; scoped `npx oxfmt --check` + `npx oxlint --deny-warnings` on owned files clean.
6. No `as`, no suppressions, no new npm package; every new export barrel-reachable and
   tested; no transcript byte lost (prove it: the disclosed text equals `entry.text` for a
   recognized frame).

## Output

Touched files + diffstat; the recognized shapes and their lanes; per-criterion proofs with
commands and tails (red first); `git status --porcelain`; report-only guide patch with
measured parity evidence; deviations or none. No diary.

## Deviation contract

If the transcript register turns out to carry something other than provider text lines —
a shape the browser cannot label without server change — stop and report with the captured
evidence. Ancillary calls (label wording, native `<details>` vs custom control, where the
scratch capture script lives under tmp/) are yours to decide and record.
