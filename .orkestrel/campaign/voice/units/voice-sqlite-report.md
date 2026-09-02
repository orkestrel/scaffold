# Unit voice-sqlite — report

Every TSDoc block under `src/` of `/home/user/fleet/sqlite` opens with a third-person `-s` verb
sentence, and the one boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0
at every step. The package has no `app/` directory.

## Counts by kind

| Kind                                        | Blocks |
| ------------------------------------------- | ------ |
| First sentence from the imperative           | 7      |
| First sentence given a verb (was verbless)   | 14     |
| First sentence reworded to drop the symbol's name | 2 |
| Boolean `@returns` rewritten                 | 1      |

Distinct blocks rewritten: 21 of 22. The `name` and `returns` rows overlap the `verbless` row —
the two `constants.ts` blocks were both verbless and name-repeating, and `isSQLiteError` was both
verbless and the boolean `@returns`. The untouched block is `createSQLiteDatabase` in
`src/server/factories.ts`, which already read `Creates a synchronous SQLite database …`.

The launch scan reported `imperative=7 verbless=13`. The `verbless` count here is 14 because the
classifier scored `Options for \`createSQLiteDatabase\`.` (`src/server/types.ts:62`) as third
person — `Options` matches its `[A-Z][a-z]+s` pattern — while the sentence is a bare noun phrase
the rule bans. It was rewritten to `Represents the options for \`createSQLiteDatabase\`.`, which the
classifier still scores third person, so the acceptance instrument stays at zero.

## Files touched

- `/home/user/fleet/sqlite/src/server/types.ts` — 12 first sentences moved to `Represents …`,
  `Opens`, `Commits`, `Rolls back`.
- `/home/user/fleet/sqlite/src/server/SQLiteDatabase.ts` — class summary to `Represents …`;
  `[Symbol.dispose]` to `Closes the connection`.
- `/home/user/fleet/sqlite/src/server/errors.ts` — class summary to `Represents …`;
  `isSQLiteError` to `Checks whether …` and its `@returns` to `True if \`value\` is a
  \`SQLiteError\`; false otherwise`.
- `/home/user/fleet/sqlite/src/server/helpers.ts` — `Convert` to `Converts`, `Normalize` to
  `Normalizes`.
- `/home/user/fleet/sqlite/src/server/constants.ts` — both result-code constants to
  `Names the SQLite result code for …`, dropping the trailing parenthetical that repeated the
  declaration's own name.
- `/home/user/fleet/sqlite/src/server/SQLiteStatement.ts` — class summary to `Represents …`.

## Gates

| Command                | Exit | Note                                                       |
| ---------------------- | ---- | ---------------------------------------------------------- |
| `npm run format:check` | 0    | 43 files, correct format                                    |
| `npm run lint:check`   | 0    | no output                                                   |
| `npm run check`        | 0    | root, then `configs/src/tsconfig.server.json`               |
| `npm run build`        | 0    | esm + cjs + declarations emitted                            |
| `npm test`             | 0    | src 51, policy 111, config 46, setup 4, guides 23 — passed |

No mutating `lint` or `format` run was needed; `format:check` passed on the first attempt.

Acceptance instrument after landing: `voice-scan.mjs` reports
`sqlite files=8 blocks=22 imperative=0 verbless=0 returnsBad=0`.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-sqlite.diff`
- `/home/user/scaffold/tmp/units/voice/voice-sqlite.status`

`git status --short` lists only the six `src/server/*.ts` files. Every diff hunk line begins with
` * ` or `/** `, so no non-comment token changed, and every `@param`, `@remarks`, `@throws`,
`@example`, and later sentence is byte-identical to the launch tree apart from the single
`@returns` line the rule requires.

## Decisions taken inside the rule

- `Represents …` is the form used for every type alias, interface, and class summary, and
  `Names …` for the two constants, following the wave brief's forms.
- The `constants.ts` first sentences ended in `` (`SQLITE_CONSTRAINT`) `` and `` (`SQLITE_BUSY`) ``,
  which repeat the name of the declaration each block sits on. The rule's "never repeats the
  symbol's name" clause governs there over "keep every code token", because the parenthetical
  restates the identifier immediately beneath it and carries nothing the declaration does not.
  The `@remarks` in both blocks are untouched and still name the native extended-code behaviour.
- Prose words that merely resemble a symbol name — `SQLite database` beside `SQLiteDatabase`,
  `prepared statement` beside `SQLiteStatement` — were kept. They are the domain nouns, not the
  identifier, and replacing them would lose accuracy.

## Observations

- `guides/sqlite.md` surface tables echo several of the old first sentences (`wrapError` — "Convert
  a thrown native …", `isSQLiteError` — "Whether a value is a `SQLiteError`.", `SQLiteRunResult`,
  `SQLiteDatabaseOptions`, `SQLiteStatement`). The guide is off-limits to this unit and no test
  compares those strings — `tests/guides.test.ts` checks symbol, method, fence, and link parity
  only, and it passes. The guide's description column now differs in voice from the TSDoc it
  paraphrases. Route it to a guide unit if the wave wants that voice too.
- The shared session scratchpad is contended: a sibling lane overwrote a file this unit had written
  under a generic name (`scan-one.mjs`) mid-unit. The acceptance re-run used a uniquely named copy
  of the canonical `voice-scan.mjs` instead, and its result stands.
- `npm test` timing is reported as an observation; the authoritative run is the Orchestrator's
  landing chain.

## Deviations

none
