# Unit voice-ndjson — report

The TSDoc voice sweep of `@orkestrel/ndjson` is complete and the whole gate chain exits 0. The
package holds five doc blocks under `src/`; four needed a rewrite and one already satisfied the
rule. There is no `app/` directory and no boolean `@returns` anywhere in the package.

## Counts by kind

| Kind                                     | Count |
| ---------------------------------------- | ----- |
| First sentence from the imperative        | 2     |
| First sentence given a verb (verbless)    | 2     |
| First sentence reworded to drop the name  | 0     |
| Boolean `@returns`                        | 0     |

The counts match the launch measurement (`imperative=2, verbless=2, boolean=0`).

## Files touched

- `/home/user/fleet/ndjson/src/core/types.ts` — the `NDJSONParserInterface` block opens
  `Represents a stateful NDJSON …` (was the bare noun phrase `A stateful NDJSON …`); the `parse`
  member opens `Appends \`chunk\`, then returns …` (was the imperative `Append …, then return …`).
- `/home/user/fleet/ndjson/src/core/NDJSONParser.ts` — the class block opens
  `Decodes an NDJSON (newline-delimited JSON) stream statefully — feed it string …` (was the bare
  noun phrase `A stateful NDJSON (newline-delimited JSON) stream parser — …`).
- `/home/user/fleet/ndjson/src/core/factories.ts` — `createNDJSONParser` opens `Creates an NDJSON …`
  (was the imperative `Create an NDJSON …`).

The `clear` member's block in `src/core/types.ts` already read `Drops any buffered partial line, …`
and stays untouched. `src/core/index.ts` carries no doc block.

## Correction to the partial sweep

The container restart left three files rewritten. Three of those four rewrites stand as written. One
did not follow the shared brief's named form for a type or an interface, so this run edited it: the
`NDJSONParserInterface` block read `Defines a stateful NDJSON …` and now reads
`Represents a stateful NDJSON …`. No discarding `git` command ran.

## Gates

Run from `/home/user/fleet/ndjson`, in the brief's order, each as its own command.

| Command                | Exit | Note                                                      |
| ---------------------- | ---- | --------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` (35 files)     |
| `npm run lint:check`   | 0    | No diagnostics.                                            |
| `npm run check`        | 0    | Root project and `configs/src/tsconfig.core.json` clean.   |
| `npm run build`        | 0    | 5 modules transformed; `dist/src/core/index.d.cts` copied. |
| `npm test`             | 0    | `test:src`, `test:policy`, `test:config`, `test:setup`, `test:guides` all passed. |

No gate failed, so there is no failure excerpt. No mutating `lint` or `format` run was needed. The
`npm test` result is an observation taken inside this unit's own exec; the Orchestrator's landing
chain is the authoritative run.

`npm run build` rewrote `dist/`, which is ignored, so `git status --short` still lists only the
three `src/core` files.

## Acceptance criteria

1. `git diff` changes comment text only — every hunk line begins ` * ` or `\t * `.
2. No block under `src/` opens with an imperative verb or a bare noun phrase; the openers are
   `Represents`, `Appends`, `Drops`, `Decodes`, and `Creates`. No boolean `@returns` exists.
3. Every `@example`, `@param`, `@remarks`, `@throws`, and later sentence is byte-identical to
   commit `73a203b`; the diff touches four lines, each a first-sentence line.
4. The gate chain exits 0 at every step.
5. `git status --short` lists only `src/core/NDJSONParser.ts`, `src/core/factories.ts`, and
   `src/core/types.ts`.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-ndjson.diff`
- `/home/user/scaffold/tmp/units/voice/voice-ndjson.status`

## Deviations

none.

One reported observation, not a deviation: the repository has no `.claude/rules/` directory of its
own. Its `AGENTS.md` file routes every rule path to scaffold, and no scaffold checkout sits beside
`/home/user/fleet/ndjson`, so the authoritative vendored copy read for this unit was
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md`. Its § Comments and API
documentation section matches the rule the shared brief quotes.

No guide parity test pins a TSDoc first sentence. `tests/guides.test.ts` compares symbol names,
fence languages, fence imports, method tables, and links; it reads no doc-block prose. The
`guides/ndjson.md` file paraphrases the `parse` sentence in a table row, and nothing asserts that
the paraphrase matches the source, so no guide edit was needed or made.
