# Brief — `d7n-server-caps` (server: the all-caps emphasis residue the fix round recorded)

## Role and engine

`builder` on Claude Sonnet. Sole writer in `/home/user/fleet/server` from the committed tip `935b856` (clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-server-caps/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Voice and actor and § Substitutions; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-server-converge-fix-report.md` § Item 3 (the residue table and the permitted-hit list).

## The unit

The fix round lowered the all-caps emphasis at the sites its brief named and recorded the residue it was not scoped to write. This unit lowers that residue. At every site in the report's residue table — the doc blocks and `//` comments in `src/server/helpers.ts`, `src/server/errors.ts`, `src/server/Stream.ts`, `src/server/Negotiator.ts`, `src/server/constants.ts`, and `src/server/Server.ts` — lower each emphasized word to its ordinary case and keep the sentence's meaning: where lowering alone loses a contrast the sentence relies on, recast with `only`, `never`, `first`, or the plain fact, in the same comment, without adding a sentence. Change nothing but comment text: no code token, no code line, no assertion, no description paragraph's facts.

Keep every permitted hit as data, per the report's list: acronyms and format names (`HTTP`, `HTTPS`, `JSON`, `HMAC`, `SHA`, `SSE`, `TCP`, `TLS`, `URL`, `API`, `RFC`, `UTF`, `ASCII`, `XML`, `SVG`, `WASM`, `DOM`, `CORS`, `CSRF`, `TOCTOU`, `CRLF`, `OOM`), HTTP method and header vocabulary (`GET`, `OPTIONS`, `DENY`, `SAMEORIGIN`), error codes (`EADDRINUSE`, `EAFNOSUPPORT`), code literals the prose quotes (`'STATUS'`, `'NEXT'`), and the repository filenames and placeholders (`README`, `AGENTS`, `PORT`). Rule any other hit yourself by the same test: a token that names a thing stays, a word emphasized by its case is lowered.

Then `npm run docs` reads `rows read: 1, disagreements found: 0`, because a description paragraph the guide compares must not have moved; if a lowered word sits inside a description paragraph, run `npm run docs -- --to guide` so the guide cell follows, and record which row moved.

## Scope

Owned: the comment text in `src/server/helpers.ts`, `src/server/errors.ts`, `src/server/Stream.ts`, `src/server/Negotiator.ts`, `src/server/constants.ts`, `src/server/Server.ts`, and `guides/server.md` only where a `--to guide` write carries a lowered description. Off-limits: everything else, including every vendored file, `tests/**`, `package.json`, `package-lock.json`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only, and `git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'` prints nothing (comment lines only).
2. `grep -rnE '\b[A-Z]{3,}\b' src guides/server.md`, ruled hit by hit: every remaining hit is on the permitted list or is a token you rule as data, and the report names the pattern, the paths, and every permitted hit by file and line.
3. `npx oxfmt --config .oxfmtrc.json --check src guides/server.md` and `npx oxlint --config .oxlintrc.json --deny-warnings src` exit 0.
4. `PATH=/opt/npm11/bin:$PATH npm run docs` reads `rows read: 1, disagreements found: 0`; both write directions read `written: 0`.
5. `PATH=/opt/npm11/bin:$PATH npm run check` and `npm run test:guides` exit 0 (record the summaries).

## Output

`/home/user/scaffold/tmp/units/d7n-server-caps-report.md`: per file the hunks as a diff, the ruled grep with its permitted hits, per criterion the exact command and its last lines. No process diary. No count in prose.

## Deviation contract

Stop if a lowered word cannot keep its sentence's meaning without a new sentence, if a gate outside the owned files goes red, or if `npm run docs` reports a disagreement `--to guide` does not clear. Decide the recast wording yourself and record it.
