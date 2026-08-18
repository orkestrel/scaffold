Implemented all four fixes within the owned scope.

## Validation

| Command | Exit | Result |
| --- | ---: | --- |
| `npm run test:policy` | 0 | 1 file, 85 tests passed |
| `npm run check` | 0 | Root, core, server, and bin checks passed |
| `npm run lint:check` | 0 | No errors or warnings |
| `npm run format:check` | 0 | 198 files checked |

The real-tree skill-family, bridge, and workspace sweeps returned `[]`.

## Red/green evidence

Initial regression run: exit 1, 5 failed and 80 passed.

| Fix pin | Red evidence | Green evidence |
| --- | --- | --- |
| Backticked trigger | `Use \`--app\`` produced the trigger violation | Control passes |
| Folded paragraphs | Parser returned `undefined` | Parses exactly two keys and `First paragraph.\nUse \`--app\`…`; trigger passes |
| Quoted descriptions | Both quote forms produced the trigger violation | Both produce the frontmatter-shape violation |
| Extra bridge key | Produced zero violations | Produces exactly one `bridge` exact-key violation |

Final regression run: exit 0, 85 passed.

## Claim-8 mutation evidence

| Assertion class | Disabled branch | Control that reddened |
| --- | --- | --- |
| skill exact keys | frontmatter exact-key condition | rejects extra frontmatter keys |
| skill name equals directory | frontmatter name comparison | rejects a frontmatter name that differs from its directory |
| skill description non-empty | empty-description condition | rejects an empty skill description |
| skill trigger sentence | trigger matcher condition | rejects a description without a Use sentence |
| reverse reference | orphan-reference loop | rejects an unnamed Markdown reference file |
| references one level | references-subdirectory condition | rejects a nested references directory |
| no auxiliary README or CHANGELOG | auxiliary-file condition | rejects an auxiliary changelog in a skill directory |
| canonical has bridge | canonical-to-bridge set condition | rejects a canonical skill without a provider bridge |
| bridge has canonical | bridge-to-canonical set condition | rejects a provider bridge without a canonical skill |
| bridge exact-case file | bridge SKILL.md file guard | rejects a bridge without an exact-case SKILL.md |
| bridge frontmatter parses | bridge parse-failure report | rejects malformed bridge frontmatter |
| bridge exact keys | bridge frontmatter exact-key condition | rejects extra bridge frontmatter keys |
| bridge name parity | bridge name-source comparison | rejects a bridge name that drifts from its canonical twin |
| bridge description parity | bridge description-source comparison | rejects a bridge description that drifts from its canonical twin |
| bridge canonical path | bridge body path condition | rejects a bridge body without its canonical workflow path |
| bridge owns no references | bridge references-directory condition | rejects a references directory owned by a provider bridge |

Mutation script: [tmp/skills-fx-sol-mutations.sh](/home/user/scaffold/tmp/skills-fx-sol-mutations.sh)

Deviation findings: none.

## Git diff

```diff
diff --git a/tests/policy.test.ts b/tests/policy.test.ts
index 6f9e67d..a22ea6c 100644
--- a/tests/policy.test.ts
+++ b/tests/policy.test.ts
@@ -9,14 +9,17 @@ import {
 	inspectPolicyWorkspace,
 	inspectSkillFamily,
 	inspectSkillBridges,
+	matchesSkillTrigger,
 	parseSkillFrontmatter,
 	POLICY_CONTROLS,
 	POLICY_SUPPRESSION_DIRECTIVE,
 	readSkillFamily,
 	SKILL_POLICY_APOSTROPHE,
+	SKILL_POLICY_BACKTICKED,
 	SKILL_POLICY_CONTROLS,
 	SKILL_POLICY_EXCLUSION,
 	SKILL_POLICY_FOLDED,
+	SKILL_POLICY_PARAGRAPHS,
 	stemToPolicyCandidates,
 	testToPolicyStem,
 } from './setupPolicy.js'
@@ -341,6 +344,7 @@ describe('skill family policy', () => {
 			const violations = inspectPolicyControl(control)
 			expect(violations).toHaveLength(1)
 			expect(violations[0]?.rule).toBe(control.rule)
+			expect(control.message === undefined || violations[0]?.message === control.message).toBe(true)
 		})
 	}
 
@@ -352,6 +356,21 @@ describe('skill family policy', () => {
 		expect(inspectPolicyControl(SKILL_POLICY_FOLDED)).toEqual([])
 	})
 
+	it(`${SKILL_POLICY_BACKTICKED.label} [membership: ${SKILL_POLICY_BACKTICKED.membership}]`, () => {
+		expect(inspectPolicyControl(SKILL_POLICY_BACKTICKED)).toEqual([])
+	})
+
+	it('parses a folded description containing two paragraphs', () => {
+		const skill = SKILL_POLICY_PARAGRAPHS.files.find((file) => file.path.endsWith('/SKILL.md'))
+		const frontmatter = parseSkillFrontmatter(skill?.content ?? '')
+		expect(frontmatter?.keys).toEqual(['name', 'description'])
+		expect(frontmatter?.description).toBe(
+			'First paragraph.\nUse `--app` when a policy fixture needs it.',
+		)
+		expect(matchesSkillTrigger(frontmatter?.description ?? '')).toBe(true)
+		expect(inspectPolicyControl(SKILL_POLICY_PARAGRAPHS)).toEqual([])
+	})
+
 	it(`${SKILL_POLICY_EXCLUSION.label} [membership: ${SKILL_POLICY_EXCLUSION.membership}]`, () => {
 		expect(inspectPolicyControl(SKILL_POLICY_EXCLUSION)).toEqual([])
 	})
@@ -367,6 +386,7 @@ describe('skill bridge policy', () => {
 			const violations = inspectPolicyControl(control)
 			expect(violations).toHaveLength(1)
 			expect(violations[0]?.rule).toBe(control.rule)
+			expect(control.message === undefined || violations[0]?.message === control.message).toBe(true)
 		})
 	}
 })
diff --git a/tests/setupPolicy.ts b/tests/setupPolicy.ts
index 682018e..7bd1b1c 100644
--- a/tests/setupPolicy.ts
+++ b/tests/setupPolicy.ts
@@ -47,6 +47,7 @@ export interface PolicyControl {
 	readonly membership: string
 	readonly rule: PolicyRule
 	readonly files: readonly PolicySource[]
+	readonly message?: string
 }
 
 /** Parsed skill frontmatter and the exact scalar source used for bridge comparison. */
@@ -980,7 +981,15 @@ export function parseSkillFrontmatter(content: string): SkillFrontmatter | undef
 			const sourceLines: string[] = [source]
 			for (index += 1; index < boundary; index += 1) {
 				const continuation = lines[index]
-				if (continuation === undefined || !continuation.startsWith('  ')) {
+				if (continuation === undefined) return undefined
+				if (continuation.trim() === '') {
+					folded.push('')
+					const rawContinuation = rawLines[index]
+					if (rawContinuation === undefined) return undefined
+					sourceLines.push(rawContinuation)
+					continue
+				}
+				if (!continuation.startsWith('  ')) {
 					index -= 1
 					break
 				}
@@ -989,9 +998,19 @@ export function parseSkillFrontmatter(content: string): SkillFrontmatter | undef
 				if (rawContinuation === undefined) return undefined
 				sourceLines.push(rawContinuation)
 			}
-			value = folded.join(' ')
+			value = ''
+			let blanks = 0
+			for (const foldedLine of folded) {
+				if (foldedLine === '') {
+					blanks += 1
+					continue
+				}
+				if (value !== '') value += blanks === 0 ? ' ' : '\n'.repeat(blanks)
+				value += foldedLine
+				blanks = 0
+			}
 			source = sourceLines.join('\n')
-		} else if (key === 'description' && /^[>|][+-]?$/u.test(value)) {
+		} else if (key === 'description' && (/^['"]/u.test(value) || /^[>|][+-]?$/u.test(value))) {
 			return undefined
 		}
 		if (key === 'name') {
@@ -1018,7 +1037,7 @@ export function parseSkillFrontmatter(content: string): SkillFrontmatter | undef
  * @returns True when the description contains the canonical trigger sentence.
  */
 export function matchesSkillTrigger(description: string): boolean {
-	return /(?:^|[.!?]\s+)Use \w/u.test(description)
+	return /(?:^|[.!?]\s+)Use \S/u.test(description)
 }
 
 /**
@@ -1292,7 +1311,24 @@ export function inspectBridge(root: string, name: string): readonly PolicyViolat
 		violations.push(
 			createPolicyViolation('bridge', bridgePath, 'bridge SKILL.md frontmatter parses'),
 		)
-	} else if (canonical !== undefined) {
+	} else {
+		const keys = new Set(bridge.keys)
+		if (
+			bridge.keys.length !== 2 ||
+			keys.size !== 2 ||
+			!keys.has('name') ||
+			!keys.has('description')
+		) {
+			violations.push(
+				createPolicyViolation(
+					'bridge',
+					bridgePath,
+					'bridge SKILL.md frontmatter contains exactly name and description',
+				),
+			)
+		}
+	}
+	if (bridge !== undefined && canonical !== undefined) {
 		if (bridge.source.name !== canonical.source.name) {
 			violations.push(
 				createPolicyViolation(
@@ -1692,6 +1728,7 @@ export const SKILL_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 		label: 'rejects extra frontmatter keys',
 		membership: 'parsed frontmatter keys in discovered skill documents',
 		rule: 'skill',
+		message: 'SKILL.md frontmatter contains exactly name and description',
 		files: [
 			{
 				path: '.agents/skills/sample/SKILL.md',
@@ -1705,6 +1742,7 @@ export const SKILL_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 		label: 'rejects a frontmatter name that differs from its directory',
 		membership: 'parsed names in discovered skill frontmatter',
 		rule: 'skill',
+		message: 'SKILL.md frontmatter name matches its directory',
 		files: [
 			{
 				path: '.agents/skills/sample/SKILL.md',
@@ -1718,6 +1756,7 @@ export const SKILL_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 		label: 'rejects an empty skill description',
 		membership: 'parsed descriptions in discovered skill frontmatter',
 		rule: 'skill',
+		message: 'SKILL.md description is non-empty',
 		files: [
 			{
 				path: '.agents/skills/sample/SKILL.md',
@@ -1730,6 +1769,7 @@ export const SKILL_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 		label: 'rejects a description without a Use sentence',
 		membership: 'immediate directories beneath .agents/skills',
 		rule: 'skill',
+		message: 'SKILL.md description names when to use the skill in a sentence beginning Use',
 		files: [
 			{
 				path: '.agents/skills/sample/SKILL.md',
@@ -1739,10 +1779,39 @@ export const SKILL_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
 		],
 	},
+	{
+		label: 'rejects a single-quoted description scalar',
+		membership: 'description scalars in discovered skill frontmatter',
+		rule: 'skill',
+		message: 'SKILL.md frontmatter exists and parses',
+		files: [
+			{
+				path: '.agents/skills/sample/SKILL.md',
+				content:
+					"---\nname: sample\ndescription: 'Use this skill for a policy fixture.'\n---\n\n# Skill\n",
+			},
+			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
+		],
+	},
+	{
+		label: 'rejects a double-quoted description scalar',
+		membership: 'description scalars in discovered skill frontmatter',
+		rule: 'skill',
+		message: 'SKILL.md frontmatter exists and parses',
+		files: [
+			{
+				path: '.agents/skills/sample/SKILL.md',
+				content:
+					'---\nname: sample\ndescription: "Use this skill for a policy fixture."\n---\n\n# Skill\n',
+			},
+			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
+		],
+	},
 	{
 		label: 'rejects an unnamed Markdown reference file',
 		membership: 'Markdown files directly beneath a discovered skill references directory',
 		rule: 'skill',
+		message: 'references Markdown file is named by SKILL.md: references/orphan.md',
 		files: [
 			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
 			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
@@ -1753,6 +1822,7 @@ export const SKILL_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 		label: 'rejects a nested references directory',
 		membership: 'directories directly beneath a discovered skill references directory',
 		rule: 'skill',
+		message: 'skill references directory contains no subdirectories',
 		files: [
 			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
 			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
@@ -1763,6 +1833,7 @@ export const SKILL_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 		label: 'rejects an auxiliary changelog in a skill directory',
 		membership: 'files at any depth inside a discovered skill directory',
 		rule: 'skill',
+		message: 'skill directory contains no README.md or CHANGELOG.md',
 		files: [
 			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
 			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
@@ -1843,12 +1914,14 @@ export const BRIDGE_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 		label: 'rejects a canonical skill without a provider bridge',
 		membership: 'immediate directories beneath .agents/skills',
 		rule: 'bridge',
+		message: 'canonical skill has a matching provider bridge directory',
 		files: [{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT }],
 	},
 	{
 		label: 'rejects a provider bridge without a canonical skill',
 		membership: 'immediate directories beneath .claude/skills',
 		rule: 'bridge',
+		message: 'provider bridge directory has a canonical skill twin',
 		files: [
 			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
 			{ path: '.claude/skills/sample/SKILL.md', content: SKILL_BRIDGE_TEXT },
@@ -1863,6 +1936,7 @@ export const BRIDGE_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 		label: 'rejects a bridge without an exact-case SKILL.md',
 		membership: 'provider bridge directories shared with the canonical family',
 		rule: 'bridge',
+		message: 'bridge requires an exact-case regular SKILL.md',
 		files: [
 			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
 			{ path: '.claude/skills/sample/skill.md', content: SKILL_BRIDGE_TEXT },
@@ -1872,6 +1946,7 @@ export const BRIDGE_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 		label: 'rejects malformed bridge frontmatter',
 		membership: 'exact-case regular SKILL.md files in shared provider bridge directories',
 		rule: 'bridge',
+		message: 'bridge SKILL.md frontmatter parses',
 		files: [
 			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
 			{
@@ -1880,10 +1955,25 @@ export const BRIDGE_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 			},
 		],
 	},
+	{
+		label: 'rejects extra bridge frontmatter keys',
+		membership: 'parsed frontmatter keys in shared provider bridge directories',
+		rule: 'bridge',
+		message: 'bridge SKILL.md frontmatter contains exactly name and description',
+		files: [
+			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
+			{
+				path: '.claude/skills/sample/SKILL.md',
+				content:
+					'---\nname: sample\ndescription: Use this skill for a policy fixture.\nlicense: MIT\n---\n\nRead `.agents/skills/sample/SKILL.md`.\n',
+			},
+		],
+	},
 	{
 		label: 'rejects a bridge name that drifts from its canonical twin',
 		membership: 'parsed frontmatter in shared provider bridge directories',
 		rule: 'bridge',
+		message: 'bridge frontmatter name matches its canonical twin',
 		files: [
 			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
 			{
@@ -1897,6 +1987,7 @@ export const BRIDGE_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 		label: 'rejects a bridge description that drifts from its canonical twin',
 		membership: 'matching immediate directories beneath .agents/skills and .claude/skills',
 		rule: 'bridge',
+		message: 'bridge frontmatter description matches its canonical twin',
 		files: [
 			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
 			{
@@ -1910,6 +2001,7 @@ export const BRIDGE_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 		label: 'rejects a bridge body without its canonical workflow path',
 		membership: 'bodies of exact-case regular bridge SKILL.md files',
 		rule: 'bridge',
+		message: 'bridge body names its canonical workflow: .agents/skills/sample/SKILL.md',
 		files: [
 			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
 			{
@@ -1922,6 +2014,7 @@ export const BRIDGE_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 		label: 'rejects a references directory owned by a provider bridge',
 		membership: 'shared provider bridge directories',
 		rule: 'bridge',
+		message: 'bridge owns no references directory',
 		files: [
 			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_BRIDGE_TEXT },
 			{ path: '.claude/skills/sample/SKILL.md', content: SKILL_BRIDGE_TEXT },
@@ -1956,6 +2049,36 @@ export const SKILL_POLICY_FOLDED: PolicyControl = Object.freeze({
 	],
 })
 
+/** A trigger sentence whose first subject is a backticked command token. */
+export const SKILL_POLICY_BACKTICKED: PolicyControl = Object.freeze({
+	label: 'accepts a backticked token after Use',
+	membership: 'single-line descriptions in discovered skill frontmatter',
+	rule: 'skill',
+	files: [
+		{
+			path: '.agents/skills/sample/SKILL.md',
+			content:
+				'---\nname: sample\ndescription: Use `--app` when a policy fixture needs it.\n---\n\n# Skill\n',
+		},
+		{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
+	],
+})
+
+/** A folded description whose blank scalar line separates two paragraphs. */
+export const SKILL_POLICY_PARAGRAPHS: PolicyControl = Object.freeze({
+	label: 'accepts a folded description containing two paragraphs',
+	membership: 'folded description scalars in discovered skill frontmatter',
+	rule: 'skill',
+	files: [
+		{
+			path: '.agents/skills/sample/SKILL.md',
+			content:
+				'---\nname: sample\ndescription: >-\n  First paragraph.\n\n  Use `--app` when a policy fixture needs it.\n---\n\n# Skill\n',
+		},
+		{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
+	],
+})
+
 /** A bridge skill outside the discovered family, used to prove the membership boundary. */
 export const SKILL_POLICY_EXCLUSION: PolicyControl = Object.freeze({
 	label: 'excludes .claude/skills from the skill family',
```