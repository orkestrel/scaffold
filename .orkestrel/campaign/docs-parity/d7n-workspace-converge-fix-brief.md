# Brief — `d7n-workspace-converge-fix` (workspace's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/workspace` from the committed tip `98fc334` (clean; the guide head start `0.0.18` installed `--no-save`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-workspace-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Voice and actor and § Substitutions; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 11, § Ruling 13, § Ruling 20, § Ruling 21, § Ruling 27; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-workspace-audit-verdict.md` (items W1 to W7) and the two reviewer lanes it names; `/home/user/fleet/abort/guides/abort.md:58` (a class row opening with the interface it implements and the state it owns); `/home/user/fleet/abort/tests/guides.test.ts:1-3`.

## Items

1. **The class blocks' openers (W1).** `src/core/workspaces/Workspace.ts` (about `:29`) and `src/core/workspaces/WorkspaceManager.ts` (about `:14`): each class description opens by naming the interface it implements and the state the instance owns, the pilot's form ("Implements `WorkspaceInterface` over one insertion-ordered path map the instance owns, projecting fresh arrays on every read." — take the facts from the guide's H3 prose at about `:147-153` and `:157-162`), keeping the sentences that follow; then `--to guide` carries the `### Classes` rows.
2. **The guard table's sentence (W2, Ruling 27).** At about `guides/workspace.md:108` the interface sentence in front of the guard sentence is struck; "In a guard table a `Shape` cell holds the type the guard narrows to." stands alone.
3. **`must` (W3).** `guides/workspace.md:431` "add the workspaces that caller must reach" reads "add the workspaces that caller needs to reach".
4. **The no-data-member row (W4, Ruling 27).** `WorkspaceStoreInterface`'s cell (about `:56`) reads `{} plus get, set, delete`.
5. **The doubled preposition (W5).** `tests/src/core/workspaces/Workspace.test.ts:23` reads "Built by using the public `createFile` / `createBinaryContent`, placed through the …" (keep the rest of the sentence; write the pair with `or` if the sentence reads as an alternative).
6. **The drop-in's header (W6, Ruling 21).** `tests/guides.test.ts` lines 1 to 3 equal the pilot's byte for byte; confirm the region from `const root = ` through the manifest loop's closing brace equals the pilot's.
7. **The arm guards' signatures (W7, Ruling 27).** `guides/workspace.md:89-90`: `isText` and `isBinary` read `(content: FileContent) => content is TextContent` and `(content: FileContent) => content is BinaryContent`, matching `src/core/helpers.ts:33` and `:48`.
8. **Propagation.** `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/workspace.md`, `README.md`, the doc blocks under `src/**` (no code token moves), `tests/guides.test.ts`, `tests/src/core/workspaces/Workspace.test.ts` (its comment text only). Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/setup*.ts`, `tests/policy.test.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only; `git diff -U0 -- src tests/src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check guides/workspace.md README.md tests/guides.test.ts src tests/src/core/workspaces/Workspace.test.ts`, `npx oxlint --config .oxlintrc.json --deny-warnings tests src`, `PATH=/opt/npm11/bin:$PATH npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -c '^| \`Workspace\` *| class *| Implements' guides/workspace.md` and `grep -c '^| \`WorkspaceManager\` *| class *| Implements' guides/workspace.md` each read 1; `grep -c 'In a guard table' guides/workspace.md` reads 1 and the line before the guard table's sentence is blank or a heading; `grep -c 'caller must reach' guides/workspace.md` reads 0; `grep -c '{} plus get, set, delete' guides/workspace.md` reads 1; `grep -c 'Built through the public' tests/src/core/workspaces/Workspace.test.ts` reads 0; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; `grep -c 'content is TextContent' guides/workspace.md` reads 1.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:core` as an observation.

## Output

`/home/user/scaffold/tmp/units/d7n-workspace-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the wall clock. No process diary. No count in prose.

## Deviation contract

Stop on a gate outside the owned files going red or a residual disagreement `--to guide` does not clear. Decide ancillary matters (the openers' exact wording) and record them.
