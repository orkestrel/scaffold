# Unit brief — D3-fix: close the audit round's findings on scaffold-policy

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent. Sole writer in `/home/user/scaffold`. Perform the assignment directly and spawn nothing.

## Objective

Every finding `d3-audit-verdict.md` round 1 carries closes as prescribed here: the vendored policy cases hold in a generated workspace exactly as they hold in scaffold, the tag-boundary RuleTester case discriminates, the rule id names what the rule refuses, the two rule sentences read as directives with the campaign's words, and the guide index entry names the laws while the mechanism prose sits in § Ownership and drift.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/tests.md` (the conditional-skip rule at line 39 and line 42), `.claude/rules/documentation.md`, `.claude/rules/writing.md`, `.claude/rules/workspace.md` § Policy instruments, `.claude/rules/quality.md` § Instruments.
2. `.orkestrel/campaign/docs-parity/d3-scaffold-policy-brief.md` (the unit this fixes), `d3-scaffold-policy-report.md`, `d3-audit-verdict.md`, `d3-audit-subjective.md`, `d3-audit-objective.md`, `d3-verify-report.md`, and `instruments/d3/d3-gates-probe.log.txt` (the consumer gate run with its output).
3. The files you own, at their uncommitted D3 state.

## Standing conditions

- The tree carries D3's nine modified files uncommitted (`.claude/rules/typescript.md`, `.claude/rules/writing.md`, `.oxlintrc.json`, `configs/policy.ts`, `guides/scaffold.md`, `host.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`); that state is what you edit. Never run a discard-class git command, never commit, never `npm install`.
- The host's command classifier refuses `npx scaffold …`; this unit needs no scaffold command.
- `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tests/config.test.ts`, `configs/policy.ts`, `.oxlintrc.json` (as `dotfiles/oxlintrc.json`), `guides/scaffold.md`, and the two rule files are vendored: `npm run build` regenerates `host.json` from them, and a target receives them through `repair`. A target and a generated workspace carry `.claude/agents/orkestrel.md` and `.claude/settings.json` and no `.claude/rules/` directory: `CANON_PATHS` (`src/core/constants.ts:186-200`) is the canon repository's, and a generated `AGENTS.md` sends its reader to the installed copy under `node_modules/@orkestrel/scaffold/dist/host/claude/rules/` (`src/core/templates.ts:2124-2132`). The generated `proof` workspace in the probe log holds `AGENTS.md`, `CLAUDE.md`, `README.md`, `guides/README.md`, `guides/guide.md`, `guides/scaffold.md`, and `.claude/agents/orkestrel.md`, its package name is `@orkestrel/proof`, and it has no own guide.
- Linux, bash, Node v22.22.2. `PATH=/opt/npm11/bin:$PATH` puts npm 11 first for the distribution run.

## Edits, exact

**E1. The rule id.** Replace `no-imperative-summary` with `no-malformed-summary` at `.oxlintrc.json:61`, `configs/policy.ts:1391`, `tests/setupPolicy.ts:162`, `tests/config.test.ts:1338` and `:1891`, `guides/scaffold.md:1817` (the site E12 rewrites), `.claude/rules/typescript.md:80` (the site E4 rewrites), and `PROPOSAL.md:986`. `VOICE_RULE` keeps its name; the message ids `voice` and `name` are unchanged.

**E2. The vendored policy cases hold in every workspace** (`tests/policy.test.ts`).

- Replace the body of `accounts for every top-level guide as this package, the index, or a catalog row` (`:375-388`) with:

```ts
		const root = process.cwd()
		const own = readPolicyPackage(root)
		if (own === undefined) throw new Error('The workspace manifest declares no name')
		const guides = readPolicyProse(root).filter((path) => POLICY_MIRROR_PATTERN.test(path))
		expect(guides.length).toBeGreaterThan(0)
		expect(guides.filter((path) => isPolicyStray(root, path))).toEqual([])
		const other = readPolicyCatalog(root).find((name) => name !== own)
		if (other === undefined) throw new Error('The catalog registers no other package')
		expect(isPolicyMirror(root, `guides/${other}.md`)).toBe(true)
		expect(isPolicyMirror(root, `guides/${own}.md`)).toBe(false)
		expect(isPolicyMirror(root, 'guides/README.md')).toBe(false)
		expect(isPolicyStray(root, `guides/${own}.md`)).toBe(false)
		expect(isPolicyStray(root, 'guides/README.md')).toBe(false)
		// The control: a name no catalog row registers is a stray whatever the directory holds.
		expect(isPolicyStray(root, 'guides/absent.md')).toBe(true)
```

- In `reads the authored Markdown population and excludes the directories it names` (`:390-399`), replace `expect(paths).toContain('guides/scaffold.md')` with `expect(paths).toContain('guides/README.md')` and `expect(paths).toContain(POLICY_TERM_FILE)` with `expect(paths).toContain(POLICY_CATALOG_FILE)`. The exclusion assertions stay.
- Make `registers every substitution-table term as either matched or judged` (`:408-416`) conditional on the table's presence, in the form `tests/config.test.ts:2247` uses: `it.skipIf(!isPolicyFile(process.cwd(), POLICY_TERM_FILE))('registers every substitution-table term as either matched or judged', () => { … })` with the body unchanged, and this comment above it in place of nothing (the existing block comment above the `describe` stays):

```ts
	// A target reads `.claude/rules/writing.md` from the installed scaffold copy rather than
	// authoring it (the canon paragraph `src/core/templates.ts` emits into a generated `AGENTS.md`),
	// so the table exists only where the workspace authors it. There the denylist and the table ship
	// from one release; here they can drift, so the comparison runs here.
```

- Add `isPolicyFile`, `POLICY_CATALOG_FILE`, `readPolicyGuide` (E9), and `readPolicyPackage` to the `./setupPolicy.js` import list, in the list's existing order.

**E3. A discriminating tag-boundary case** (`tests/config.test.ts`). Delete the invalid case `rejects a description read past its first block tag [membership: text before the first block tag]` (`:1428-1441`). Add this valid case directly after the case E11 relabels `accepts a word from the stop set after the opener`:

```ts
			{
				name: 'accepts a block tag naming the symbol after the description [membership: text before the first block tag]',
				code: [
					'/**',
					' * Creates a control.',
					' *',
					' * @param value - The value readControl reads.',
					' */',
					'export function readControl(value: number): number {',
					'\treturn value',
					'}',
				].join('\n'),
			},
```

Prove it discriminates: in `commentToPolicyParagraph` (`configs/policy.ts`, the loop that stops at the first `@`-opening line), disable the stop for one run, run `npm run test:config`, record the failing count and that this case reports `name`, restore the exact line, and run it green again. The plant is in a file you own and is removed by restoring the line; record the `git diff --stat -- configs/policy.ts` reading after the restore beside the counts. The helper case at `tests/config.test.ts:1682` stays.

**E4. The voice-rule sentence** (`.claude/rules/typescript.md:80-83`). Replace the bullet with:

```md
- `policy/no-malformed-summary` reads that first sentence over every doc block a top-level export
  declaration follows, and refuses an opening word that is not a third-person `-s` verb and a
  sentence naming the declared symbol. A word ending in `s` that the rule's stop set does not name
  passes whether or not it is a verb — a plural noun such as `Files` included — so read the sentence
  in review as well.
```

**E5. The term-rule sentence** (`.claude/rules/writing.md:110-113`). Replace the bullet with:

```md
- `policy/no-banned-term` reads every comment and the prose sweep in `tests/setupPolicy.ts` reads
  every authored Markdown file, and each matches the rows this table bans unconditionally. The rule
  and the sweep leave `now`, `new`, `latest`, `once`, `since`, and `master` unmatched because those
  rows carry a permitted sense, so rule a hit in one of those rows yourself.
```

**E6. One word for the axis.** `configs/policy.ts:333`: `whose ban holds in every sense` becomes `whose ban is unconditional`. `configs/policy.ts:1355`: `/** Bans a comment carrying a term the substitution table bans unconditionally. */`. `tests/setupPolicy.ts:1454`: `Inspects every authored Markdown file for a term the substitution table bans unconditionally.` `guides/scaffold.md:1814-1815`: the phrase `refuses in every sense` becomes `bans unconditionally` (E12 carries the sentence).

**E7. The comment types' doc lines** (`configs/policy.ts`). `:41`: `/** Describes one comment the comment rules read out of a linted file. */`. `:47`: `/** Lists the Oxlint source-text operations the comment rules read. */`.

**E8. The exclusion constant.** Rename `POLICY_PROSE_ROOTS` to `POLICY_PROSE_EXCLUSIONS` at `tests/setupPolicy.ts:238`, `:1346`, and `:1360`; the doc line stays.

**E9. One reader behind the two predicates** (`tests/setupPolicy.ts`). Insert before `isPolicyMirror`:

```ts
/**
 * Reads the guide name one prose path carries when that guide is another package's to account for.
 *
 * @remarks
 * A top-level `guides/<name>.md` path yields its name unless the name is the guide index or this
 * workspace's own package; every other path yields undefined. {@link isPolicyMirror} and
 * {@link isPolicyStray} split that name by catalog membership.
 *
 * @param root - The workspace root the path belongs to.
 * @param path - The workspace-relative prose path to read.
 * @returns The guide's name, or undefined where the path is not a top-level guide another package
 * could own.
 */
export function readPolicyGuide(root: string, path: string): string | undefined {
	const name = normalizePolicyPath(path).match(POLICY_MIRROR_PATTERN)?.[1]
	if (name === undefined || name === POLICY_GUIDE_MAP) return undefined
	return name === readPolicyPackage(root) ? undefined : name
}
```

Then `isPolicyMirror`'s body becomes `const name = readPolicyGuide(root, path)` and `return name !== undefined && readPolicyCatalog(root).includes(name)`; `isPolicyStray`'s body the same with `!readPolicyCatalog(root).includes(name)`. Their doc blocks stay. Add to `tests/policy.test.ts` `describe('prose policy')`, after the accounting case:

```ts
	it('reads the guide name a top-level path carries for another package to account for', () => {
		const root = process.cwd()
		const own = readPolicyPackage(root)
		if (own === undefined) throw new Error('The workspace manifest declares no name')
		expect(readPolicyGuide(root, 'guides/other.md')).toBe('other')
		expect(readPolicyGuide(root, `guides/${own}.md`)).toBeUndefined()
		expect(readPolicyGuide(root, 'guides/README.md')).toBeUndefined()
		expect(readPolicyGuide(root, 'guides/nested/other.md')).toBeUndefined()
		expect(readPolicyGuide(root, 'AGENTS.md')).toBeUndefined()
	})
```

**E10. The stray message.** `tests/setupPolicy.ts:1476` and the control's `message` at `:2313`: `guide is the package's own, the map, or a catalog row`.

**E11. The stop set's labels** (`tests/config.test.ts`). `:1383`: `accepts a word from the stop set after the opener`. `:1402`: `rejects an opener from the stop set [membership: opening words ending in s that name no verb]`.

**E12. The guide** (`guides/scaffold.md`). Replace the `tests/policy.test.ts` index entry (`:1812-1824`) with:

```md
- [`tests/policy.test.ts`](../tests/policy.test.ts) — the path- and text-shaped policy laws:
  mirrors, suppressions, the rule map, filenames, manifest scripts, skills, bridges, and the prose
  sweep over every authored Markdown file. The syntax-shaped laws are the rules of the vendored
  oxlint plugin `configs/policy.ts`, proven in `tests/config.test.ts`.
```

Insert this paragraph in § Ownership and drift, after the paragraph ending `restore those files when their bytes drift or the files are missing.` (`:1009-1011`) and before the `tests/distribution.test.ts` paragraph:

```md
`tests/policy.test.ts` proves the path- and text-shaped laws, and the vendored oxlint plugin
`configs/policy.ts` carries the syntax-shaped ones: `policy/no-malformed-summary` reads the doc
block preceding each export, and `policy/no-banned-term` reads every comment for a term
`.claude/rules/writing.md` § Substitutions bans unconditionally. The prose sweep in
`tests/setupPolicy.ts` reads every authored Markdown file for the same terms through the
`POLICY_BANNED_TERMS` denylist the rule and the sweep share, and `tests/policy.test.ts` proves that
denylist against the table wherever the workspace authors it. The sweep skips a top-level guide the
package catalog in `.claude/agents/orkestrel.md` registers to another package, because a mirror is
fetched bytes rather than prose this workspace wrote, and it reports a top-level guide that is
neither this package's own, nor `guides/README.md`, nor a catalog row, so an exclusion always
carries its evidence.
```

**E13. The report supersedes D3's tables.** Your report carries a symbol table for every symbol D3 and this unit added or moved, at the final tree (`configs/policy.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), the full `PROSE_POLICY_CONTROLS` row table including the stray control, and a line striking the D3 report's flagged claim "`programToPolicyDocs` … is therefore read twice" with the reason: `configs/policy.ts:796` rejects a pairing whose gap text is not whitespace, and the gap between one export's block and the next export holds that export's own source.

**E14. The inventory.** After every edit, run `npm run build` so `host.json` regenerates, then `npm run build:inventory` once more and record `sha256sum host.json` before and after that re-run.

## Scope

- Owned: the nine D3 files and `PROPOSAL.md` (E1's one token only).
- Off-limits: everything else, `src/**` included, `package.json`, `package-lock.json`, `.orkestrel/**`, and `tmp/**` apart from your report.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:config`, `npm run test:policy`, `npm run test:guides`, `npm run build`, `npm run build:inventory`, `npm test`, and one `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (an observation, not a criterion). Never `npm install`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -rn "no-imperative-summary" --include=*.ts --include=*.json --include=*.md . | grep -v "node_modules\|^./tmp\|^./dist\|^./.orkestrel"` prints nothing; `grep -rn "in every sense\|POLICY_PROSE_ROOTS\|vendored mirror\|stop list\|stop-set\|the voice rules" configs tests/*.ts .claude/rules guides/scaffold.md .oxlintrc.json` prints nothing; `grep -n "readPolicyGuide" tests/setupPolicy.ts tests/policy.test.ts` prints the declaration, the two predicate bodies, the import, and the case.
2. `npm run format:check` exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:config` exits 0 with the E3 case present, and the revert reading is recorded (the failing count with the E3 case reporting `name`, the restore, the green count).
4. `npm run test:policy` exits 0 with the E2 cases and the E9 case present.
5. `npm run build` exits 0; the `sha256sum host.json` reading is identical before and after the `npm run build:inventory` re-run.
6. `npm test` exits 0 and `npm run test:guides` exits 0 (observations, with exit codes and last lines).
7. Observation: `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit code and last lines; the Orchestrator takes the deciding run after you return.

## Output

Write `/home/user/scaffold/tmp/units/docs-d3-fix-report.md`: one line per edit E1 to E14 with `file:line` at the final tree; the E3 revert reading; the E13 tables and the strike; each criterion and observation with its exit code and last lines; `git status --short` and `git diff --stat`; flagged claims. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when an edit needs an off-limits file, when a gate fails outside the owned files, when the generated-workspace facts stated under Standing conditions contradict what a command shows you, or when the E2 shapes cannot hold in scaffold's own tree. The placement of the E12 paragraph inside the section, the label wording beyond what E3 and E11 fix, and the order of the report's tables are yours to decide and record.
