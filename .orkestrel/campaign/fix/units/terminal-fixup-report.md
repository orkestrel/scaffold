# Report — unit terminal-fixup (implementer, Opus 5; Sol dark)

Finding 1 closed: `guides/terminal.md:467` Methods cell reads "List every mounted broker, in
insertion order."; `src/core/types.ts:649-652` remark states that `terminals()` returns brokers,
not keys, and that a name is an argument the `terminal`, `add`, `ask`, `pending`, `answer`, `open`,
`save`, and `remove` methods take (verified against `TerminalManagerInterface` at
`src/core/types.ts:687-703`). Finding 2 closed: `guides/terminal.md:957` reads
`// the 'agent' and 'user' brokers, in insertion order`. Finding 3 closed: assertions at
`tests/src/core/helpers.test.ts:304-306` (`editLine` refuses an undecoded key) and `:153-158`
(input reducer returns the same state). Finding 4 closed: `guides/terminal.md:161` drops the
number; the test title at `tests/src/core/helpers.test.ts:323` names the shapes.

Red-then-green (`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts`):
with `key.name !== undefined &&` removed at `src/core/helpers.ts:811`, exit 1, 2 failed | 36
passed, both new tests failing with `TypeError: key.name is not iterable` at `helpers.ts:811`;
guard restored by editing the exact text back, exit 0, 38 passed. `git diff --stat src` after
restoration: `src/core/types.ts` only.

Sweeps over `src`, `tests`, `guides/terminal.md`, `README.md`: `already holds` — six hits outside
the named sites: those about the form ("the answer the form already holds"), the true claims about
the caller holding the form's own `answer` promise (`guides/terminal.md:444,518`,
`src/core/types.ts:468`), and the test comment at `tests/src/core/TerminalManager.test.ts:19`
(off-limits to the unit; the Orchestrator rewrote it to "not their names" before landing).
`both` — every remaining hit names its members or a closed pair; `guides/terminal.md:66` "Two
standing conditions" is a count outside the named sites, recorded. `four shared` — no hit;
`src/core/constants.ts:48` "the four arrows" names the closed arrow set, recorded.

Gates: format:check 0, lint:check 0, check 0, build 0, test 0 (src 127, policy 111, config 46,
setup 24, guides 48, integration 2). `git status --short`: `guides/terminal.md`,
`src/core/types.ts`, `tests/src/core/helpers.test.ts`.

Deviation reported as data, not a stop: acceptance criterion 1's `rg 'already holds'` clause
reaches sites outside finding 1; the Orchestrator rules the six residual hits permitted (three
about the form, three true by construction) and the criterion satisfied at the named sites.
