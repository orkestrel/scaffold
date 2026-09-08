# Brief — `d7n-ollama-converge-fix` (ollama's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/ollama` from the committed tip `98e9c34` (clean; the guide head start `0.0.18` installed `--no-save`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-ollama-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Substitutions and § Code tokens, references, and links; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 13, § Ruling 18, § Ruling 20, § Ruling 21, § Ruling 26, § Ruling 28; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-ollama-audit-verdict.md` (items O1 to O10) and the two reviewer lanes it names; `/home/user/scaffold/tmp/units/d7n-ollama-close-brief.md`; `/home/user/fleet/abort/guides/guide.md` (function rows carrying their signature) and `/home/user/fleet/abort/guides/probe.md` (class rows carrying the interface implemented); the pilot `/home/user/fleet/abort/tests/guides.test.ts`.

## Items

1. **The mixed table's `Shape` cells (O1, Rulings 20, 26, 28).** In `guides/ollama.md`'s `### Surface` table (about `:64-86`): every function row holds its signature as a type literal read from its declaration; a guard row (`isOllamaHTTPError`) holds the type it narrows to; every class row (`OllamaProvider`, `OllamaHTTPError`) holds the interface it implements as a code token or its constructor signature where it implements none; every `const` row holds its declared or widened type, never a literal type, with the literal in its description. The convention text at about `:62` gains, after the interface sentence: "A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to. A class row's `Shape` cell holds the interface it implements, or its constructor signature where it implements none. A `Shape` cell holds the constant's declared type."
2. **The sentence start (O2).** `guides/ollama.md:112` "either way" reads "Either way"; where the sentence sits in a compared cell, edit the block and `--to guide`.
3. **The all-caps emphasis (O3).** `src/server/OllamaProvider.ts:41-59`, `src/server/types.ts:64-141`, `src/server/factories.ts:65`, and every other hit `grep -rnE '\b[A-Z]{3,}\b' src guides/ollama.md README.md` finds outside a code token, lowered keeping the contrast; then `--to guide` where a description moved; the grep ruled hit by hit in the report.
4. **The test prose (O4).** `tests/service/budget.test.ts:176`'s causal `since` reads `because`; `above` at `tests/setup.test.ts:140`, `tests/service/tools.test.ts:356`, `tests/service/lifecycle.test.ts:179`, `tests/service/compaction.test.ts:226`, `tests/service/OllamaProvider.test.ts:156` reads `preceding` or `earlier` (comment text only; no assertion moves).
5. **The opening sentence (O5).** `guides/ollama.md:8` reads "This provider lets an Agent run against a real model on `localhost` — one small local model, no cloud dependency, and no API key." (or a sentence that names what the provider is before what an Agent does).
6. **The stranded literals (O6, Ruling 18).** `src/server/constants.ts:3-4`, `:7-8`, `:20-21`, `:26-27`: the literal sits beside the noun it values ("Names the local Ollama daemon base URL, `'http://localhost:11434'`, assumed when `OllamaOptions.url` is omitted."); then `--to guide`.
7. **The header (O7, Ruling 21).** `tests/guides.test.ts` lines 1 to 3 equal the pilot's byte for byte; the region from `const root = ` through the manifest loop's closing brace equals the pilot's.
8. **The package name (O8).** `guides/ollama.md:119` backticks `@orkestrel/agent`.
9. **The dead link (O9).** `src/server/OllamaProvider.ts:63`'s `{@link NDJSONParser}` names the symbol the file imports (`createNDJSONParser`) as a code token or drops the tag.
10. **The closing items (O10).** Every item `d7n-ollama-close-brief.md` lists beyond the preceding: `#` links; a lead-in sentence before every fence directly under a heading.
11. **Propagation.** `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/ollama.md`, `README.md`, the doc blocks under `src/**` (no code token moves), `tests/guides.test.ts`, and the comment text of `tests/setup.test.ts`, `tests/service/budget.test.ts`, `tests/service/tools.test.ts`, `tests/service/lifecycle.test.ts`, `tests/service/compaction.test.ts`, `tests/service/OllamaProvider.test.ts` at the lines item 4 names. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/policy.test.ts`, `tests/config.test.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only; `git diff -U0 -- src tests | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check guides/ollama.md README.md tests src`, `npx oxlint --config .oxlintrc.json --deny-warnings tests src`, `PATH=/opt/npm11/bin:$PATH npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ' guides/ollama.md` prints nothing; `grep -c "A function row's \`Shape\` cell holds its signature" guides/ollama.md` reads 1; `grep -c '\. either way' guides/ollama.md` reads 0; `grep -rnE '\b(CONFIGURABLE|NATIVELY|EITHER|CLEAN|WITHOUT|DISPLAY|OPTIONAL|CONTEXT)\b' src` prints nothing; `grep -c ', since the source' tests/service/budget.test.ts` reads 0; `grep -nw 'above' tests/setup.test.ts tests/service/tools.test.ts tests/service/lifecycle.test.ts tests/service/compaction.test.ts tests/service/OllamaProvider.test.ts` prints nothing; `grep -c 'from @orkestrel/agent)' guides/ollama.md` reads 0; `grep -c '{@link NDJSONParser}' src/server/OllamaProvider.ts` reads 0; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; the fence sweep `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/ollama.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:server` as an observation (the service suites need the daemon; record them as not run if the daemon is absent).

## Output

`/home/user/scaffold/tmp/units/d7n-ollama-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the ruled grep, the wall clock. No process diary. No count in prose.

## Deviation contract

Stop on a gate outside the owned files going red, a residual disagreement `--to guide` does not clear, or a `Shape` cell Rulings 26 and 28 cannot express. Decide ancillary matters (exact wording, the constructor signature's form) and record them.
