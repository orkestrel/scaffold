All gates pass. Final output below.

## Edits (file:line before → after)

- `tests/guides.test.ts:2` "The constants below and the flagship-fence" → "The constants following and the flagship-fence"
- `tests/guides.test.ts:176` "what the loop above proves" → "what the preceding loop proves"
- `tests/guides.test.ts:194` `render: (one) => \`<instruction>${one.content}</instruction>\`` → `render: (instruction) => \`<instruction>${instruction.content}</instruction>\``
- `guides/ollama.md:194` `render: (i) => \`<instruction>${i.content}</instruction>\`` → identical `(instruction)` form
- `guides/README.md:36` "the toolchain above" → "the toolchain earlier"
- `guides/ollama.md:116` "Assertions are structural (robust to a small model's nondeterminism), never brittle exact output." → "Assertions are structural — they hold whatever wording a small model produces — and never pin exact output."
- `guides/ollama.md:105` "the SPLITTER is the guarantee." → "the splitter keeps the assembled content clean."
- `README.md:34` `result.content // 'ok'` → `result.content // the assistant's answer text`
- `tests/setupServer.ts:170-183` added, exported `createRecordingTransport(calls)` typed with `RecorderInterface<readonly [string]>`, with TSDoc
- `tests/setupServer.test.ts:16-23,176-192` added `createRecorder`/`createRecordingTransport` imports and a `describe('createRecordingTransport')` case
- `tests/service/OllamaProvider.test.ts:8-14,483-499,508-519` replaced the two in-body `const transport` arrows with `fetch: createRecordingTransport(calls)`; import updated
- `tests/service/compaction.test.ts:83,96,135,149,222,235`; `tests/service/lifecycle.test.ts:23-24,94`; `tests/service/OllamaProvider.test.ts:82-83,242-243,408-409`; `tests/src/server/integration.test.ts:60,102,205,273` — every `directive #N` token and its attaching words deleted, comments rewrapped
- `tests/setup.ts:13,31,67,86,128` and `tests/setupServer.ts:123,146,186` — every imperative TSDoc opener rewritten to third-person `-s` form
- `tests/guides.test.ts:38` (ancillary, required by acceptance criterion 1, not in Sites) "the second assertion below fails" → "the second assertion following fails"

## Claim 4, obj-4 control

Planted `src/server/helpers.ts:220`: `parseJSONAs(value, isRecord)` → `parseJSONAs(value, isString)`.

- `/home/user/work/evidence/ollama-proofs/obj-4-mutant-red.txt`: 1 failed, 31 passed (32 total)
- `/home/user/work/evidence/ollama-proofs/obj-4-restored-green.txt`: 32 passed (32 total)
- `git diff -- src/server/helpers.ts` after restore is content-identical to the pre-round diff in `/home/user/work/evidence/conform-ollama.diff`

## Documentation sweeps (claim 4, subj-4/-5/-8/-9/-10/-13/-14)

Every deleted phrase's case-insensitive sweep over `src`, `tests` (minus the vendored set), `guides/ollama.md`, `guides/README.md`, and `README.md` returned empty — each row's repair had already landed:

- subj-4 (`create(s|d)? a`, bare imperative Surface openers): empty
- subj-5 (`{ model; messages; stream; keep_alive; think; options?; tools? }` missing `format?`): empty
- subj-8 (`app enables think: true`, `thinking collapsible`): empty
- subj-9 (`observability is a (later|separate) pass`, `no events yet`): empty
- subj-10 (`carries passthrough sampling options`): empty
- subj-13 (`internal wire-shape ...#fetch`, `internal .../api/chat... response shape #fetch`): empty
- subj-14 (`live-only src:server test suite`; lowercase sentence start): empty

## Rulings recorded (no edit)

R1 — `tests/service/**` needs a daemon this container does not have; the named rows are proved here by `npm run check`/`npm run lint:check` and execute live at the wave's `prepublishOnly` step. R2 — `OllamaHTTPError.status` reading `0` is a next-matrix row. R3 — `readonly name = 'ollama'` field ordering joins the fleet's public-data-field question in the next matrix.

## Gate evidence

```
git status --short
```
32 modified paths: the unit's prior set plus `tests/setupServer.test.ts`; nothing else new.

```
npm run format:check → 0
npm run lint:check → 0
npm run check → 0
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts → 0 (11 passed)
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/helpers.test.ts → 0 (32 passed)
```

Report appended at `/home/user/scaffold/tmp/units/conform/conform-ollama-report.md` § Fix round 1.
