# Brief — `d7n-tool-converge-fix` (slice 4a's audit findings on tool)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/tool` from its branch tip (clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/AGENTS.md` § Writing, then `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice4a-audit-verdict.md`, `rulings.md` § Ruling 7 and § Ruling 12, the subjective lane's claim 20, F7, F8 and the objective lane's claim 15 and F4 in `d7n-slice4a-audit-{subjective,objective}.md`, and the pilot's examples loop at `/home/user/fleet/abort/tests/guides.test.ts:206-235`.

## Items

1. **The examples binding (claim 15).** `tests/guides.test.ts`: hoist the mapped `examples` ternary out of the `it` callback to sit beside `documented` at the loop's own scope, matching the pilot byte for byte outside this package's constants.
2. **The README's restatement (claim 20).** `README.md:10-11` region restates the tagline's isolation and correlation clauses; rewrite the onboarding paragraph to carry only what the tagline does not (how to register, advertise, and call), the way timeout's README does.
3. **`count` (F7).** `guides/tool.md:55` region: the sentence names what `count` reports ("the readonly `count` of `ToolManagerInterface` reports how many tools are registered and is a Surface member with no method row").
4. **Descriptions restating remarks (F8, objective F4).** `src/core/helpers.ts` `toolToDefinition` and `src/core/types.ts` `ToolManagerInterface`: keep the fact in the description and let the remark carry only what the description does not; `src/core/factories.ts` `createToolManager`'s `@returns` repeats its description — narrow it to what the factory returns (`A registry bound to no tools`). Then `npm run docs -- --to guide` carries any changed description.
5. `npm run docs` at zero, `--to guide` and `--to source` at `written: 0`, the suite green after the items.

## Scope

Owned: `guides/tool.md`, `README.md`, the doc blocks under `src/core/**` (whole; no code token moves), `tests/guides.test.ts`. Off-limits: everything else.

## Acceptance criteria

1. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned paths>`, `npm run check` exit 0.
2. `npm run docs` exit 0 at `rows read: 1, disagreements found: 0`; `--to guide` and `--to source` at `written: 0`; `npm run test:guides`, `npm run test:policy`, `npm run test:src:core` exit 0.
3. `git status --short` lists the owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-tool-converge-fix-report.md`: per item the hunk and the runs, per criterion the command and its last lines. No count in prose; describe the pin only in the words the file carries. No process diary.

## Deviation contract

Stop if a correction needs a file outside the owned set or if `docs` leaves zero.
