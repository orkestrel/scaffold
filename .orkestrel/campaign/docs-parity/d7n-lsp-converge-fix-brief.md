# Brief — `d7n-lsp-converge-fix` (lsp's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/lsp` from the committed tip `edca4bd` (clean; the guide head start `0.0.18` installed `--no-save`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-lsp-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 14, § Ruling 20, § Ruling 21, § Ruling 26, § Ruling 27; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-lsp-audit-verdict.md` (items L1 to L8) and the two reviewer lanes it names; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-lsp-converge-report.md`; `/home/user/fleet/process/guides/process.md` (about lines 169 and 187: a lead-in ending with a period, then the convention sentence, then the table); `/home/user/fleet/abort/guides/guide.md` (function rows carrying their signature in `Shape`, Ruling 26's form).

## Items

1. **The lead-ins (L1).** `guides/lsp.md` at about `:334`, `:347`, `:367`, `:390`, `:412`, `:440`, `:469`: each colon-ended lead-in ("The server surface provides these exports:") ends with a period, so the convention sentence that follows it introduces the table.
2. **The subsection names (L2).** `### Stdio transport` (about `:332`) becomes `### Stdio client transport`, the term `## Stdio client transport` uses; `### Client` (about `:345`) becomes `### Client and transport contracts`, because it holds `LSPTransportInterface`, `LSPTransportEventMap`, and `LSPPending`. Update every link naming either heading.
3. **The fixture description (L3).** `tests/src/server/fixtures/protocol.mjs:13` reads "Encodes a JSON-RPC message with its Content-Length header as one base-protocol buffer." — the unit the code returns (header plus body), the word `frame` kept out of the first sentence for the voice rule's name check, `@param` and `@returns` untouched.
4. **The fences without a lead-in (L4, Ruling 21).** One complete sentence between the heading and the fence at `guides/lsp.md:131` (under `## Stdio client transport`), `:196`, and `:213` (under `## Framing state`). Every other fence already has one; leave those.
5. **The titled pair's unread binding (L5, Ruling 14).** `guides/lsp.md:65` and `src/core/factories.ts` both bind `const diagnostics = await client.open(...)` and never read it. Prefer reading the value in one lint-clean line on both sides (a line the fence's comment convention can carry, such as binding the first diagnostic's message and using it in the `close` call's surrounding prose is not enough — the line must be a real read); where no lint-clean read exists, drop the binding to `await client.open(...)` and recast the lead-in at `:47-48` to promise only what the fence shows. Edit both sides in one change, then `npm run docs` reads zero without `--to`; record which path you took and why.
6. **`destroy`'s dropped fact (L6).** `src/core/types.ts` at `LSPClientInterface.destroy` (about `:425-433`) gains in `@remarks`: "Pending operations reject with an `LSPError` coded `closed` before the `shutdown` request is written." The description paragraph is unchanged.
7. **The wide comment lines (L7).** `tests/setupServer.ts:20` and `:53` rewrap at the configured print width (100), the one-line block at `:53` becoming a wrapped block.
8. **The function rows' `Shape` cells (L8, Rulings 20 and 26).** Every function row with an empty `Shape` cell in `guides/lsp.md` (`createStdioClientTransport` about `:341`, `createLSPClient` about `:354`, the helper rows about `:373-381`) holds its signature as a type literal read from its declaration; a guard row (`isLSPError` about `:383`) holds the type it narrows to. Each table carrying such rows gains the sentence "A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to." after its interface sentence. `grep -nE '^\| \`[^\`]+\` +\| function +\| +\| ' guides/lsp.md` then prints nothing.
9. **Propagation.** `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/lsp.md`, `README.md`, the doc blocks under `src/**` (no code token moves) and the fence line item 5 names in `src/core/factories.ts`, `tests/guides.test.ts`, `tests/setupServer.ts` (comment text only), `tests/src/server/fixtures/protocol.mjs` (its doc block only). Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only; `git diff -U0 -- src tests/setupServer.ts tests/src/server/fixtures/protocol.mjs | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'` prints only the item 5 fence line if that path was taken, else nothing.
2. `npx oxfmt --config .oxfmtrc.json --check guides/lsp.md README.md tests/guides.test.ts tests/setupServer.ts src`, `npx oxlint --config .oxlintrc.json --deny-warnings tests src`, `PATH=/opt/npm11/bin:$PATH npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -nE 'provides these [a-z, ]+:$' guides/lsp.md` prints nothing; `grep -c '^### Stdio client transport' guides/lsp.md` reads 1 and `grep -c '^### Client$' guides/lsp.md` reads 0; `grep -c 'base-protocol buffer' tests/src/server/fixtures/protocol.mjs` reads 1; the fence sweep `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/lsp.md` prints nothing; `grep -c 'coded \`closed\` before the \`shutdown\`' src/core/types.ts` reads 1; `awk 'length > 100' tests/setupServer.ts` prints nothing; the empty-`Shape` grep of item 8 prints nothing; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides`, `npm run test:policy`, and `npm run test:setup` exit 0 (record the summaries); `npm run test:src:server` as an observation.

## Output

`/home/user/scaffold/tmp/units/d7n-lsp-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the wall clock. No process diary. No count in prose.

## Deviation contract

Stop on a gate outside the owned files going red, a `Shape` cell Ruling 26 cannot express, or a residual disagreement `--to guide` does not clear. Decide ancillary matters (the exact lead-in wording, the item 5 path) and record them.
