# Campaign-2 audit evidence (Orchestrator-verified at ba1168f)

## Verified directly by the Orchestrator
- Pre-repair drift: exactly four bridges (enterprise-bootstrap, orkestrel-align-packages, orkestrel-build-application, orkestrel-harden-package) differed from their twins; other four matched.
- Pre-repair orphan: the only application.md mention in orkestrel-build-application/SKILL.md was the rules file at line 13.
- Post-change gates: test:policy 80/80, format:check 0, lint:check 0, check 0 (Orchestrator's unconstrained environment).
- CU-sol red/green: three controls (missing trigger, unnamed reference, drifted bridge) failed before their checks landed, 80/80 after; folded-scalar-with-colon parses to exactly name+description.

## git status --porcelain

## Full diff 4035cb4..ba1168f (campaign-2 changes)
diff --git a/.agents/skills/orkestrel-build-application/SKILL.md b/.agents/skills/orkestrel-build-application/SKILL.md
index 80832cb..6e3c43f 100644
--- a/.agents/skills/orkestrel-build-application/SKILL.md
+++ b/.agents/skills/orkestrel-build-application/SKILL.md
@@ -69,11 +69,16 @@ includes app/core so the shared transport contracts have one host-independent ow
      template-literal specifiers, declaration placement, and the barrel law.
    - Scoped TypeScript projects — host-global isolation.
    - Vite's real builds and environment-boundary plugin — Vue, CSS, assets, workers,
-     runtime resolution, and physical workspace containment.
+     runtime resolution, and physical workspace containment. Its parsed HTML asset
+     callbacks reject forced inlining before any direct asset read, and non-inlined
+     output assets are audited by physical source path.
 
    Then hold these four limits:
    - Add no standalone boundary script, and no second parser or source-language analyzer
-     duplicating those layers.
+     duplicating those layers. Reach for the toolchain's own facilities instead: Vite's
+     Oxc/Rolldown AST for TypeScript and JavaScript asset references, the official Vue SFC
+     compiler for `.vue` blocks, Vite's HTML parser callbacks, its bundled Lightning CSS
+     dependency analyzer, and the TypeScript compiler API for the narrow coding-law pass.
    - Disable the browser application's public directory, so an unmanaged file copy cannot
      bypass the module graph.
    - Keep browser-only runtime tooling development-only.
diff --git a/.agents/skills/orkestrel-build-application/references/application.md b/.agents/skills/orkestrel-build-application/references/application.md
deleted file mode 100644
index de1c298..0000000
--- a/.agents/skills/orkestrel-build-application/references/application.md
+++ /dev/null
@@ -1,129 +0,0 @@
-# Application architecture reference
-
-## Environment selection
-
-Support application-only, source-only, and mixed workspaces.
-The CLI uses `--src core,browser,server` for published src environments and
-`--app core,browser,server` for private app environments. At least one selector
-is required in non-interactive creation; `--surfaces` is not part of the
-vocabulary.
-
-| Selection   | Contract                                               |
-| ----------- | ------------------------------------------------------ |
-| app/core    | Host-independent contracts and composition             |
-| app/browser | Vue browser runtime and real-browser tests             |
-| app/server  | Node runtime, executable CJS build, and loopback tests |
-
-Core-only, browser-only, and server-only are valid. A browser+server pair must
-include app/core so shared transport contracts have one host-independent owner.
-
-## Dependency direction
-
-- app/core imports no DOM, Node, app/browser, or app/server implementation.
-- app/browser may import app/core and published browser/core packages.
-- app/server may import app/core and published server/core packages.
-- Published src environments never import private app modules. Src core is
-  host-independent; src browser/server may import src core and remain
-  mutually disjoint.
-- Apply the same direction to cross-package `@orkestrel/<package>/browser` and
-  `/server` exports; a package's bare export is its core API.
-- Browser code reaches server behavior through app/core contracts and a
-  transport boundary, never by importing app/server.
-- Every environment barrel contains `export *` declarations only. A star-export
-  collision is a design failure to be renamed at its owner, never hidden behind
-  a selective barrel row.
-- Types, constants, helpers, validators, parsers, and factories live in their
-  centralized kind files; an implementation file holds one class plus imports.
-  `ApplicationServerRunner` lives alone in `ApplicationServerRunner.ts` and
-  `startApplicationServer` in `handlers.ts`, because `factories.ts` admits only
-  `create`-prefixed construction; `main.ts` owns no reusable declarations.
-- Enforcement is layered, and each layer owns exactly what it can express:
-  - `.oxlintrc.json` `no-restricted-imports` owns **literal-string** declared
-    package, alias, and conventional relative imports, in both directions.
-    `.oxfmtrc.json` owns formatting. Neither replaces the other, and neither
-    replaces typechecking.
-  - `tests/setupPolicy.ts` owns what Oxlint cannot represent: computed and
-    template-literal import specifiers, declaration placement, and the
-    export-star barrel law. It is a deliberately narrow TypeScript-compiler pass
-    over the repository's own coding laws — not a general-purpose analyzer, and
-    not a second linter.
-  - Scoped TypeScript projects remove Node/DOM globals from the wrong
-    environment.
-  - Vite's real browser/server builds resolve Vue, assets, CSS, workers, and
-    runtime module graphs, and its generated environment-boundary plugin checks
-    dependency direction and physical workspace containment on the actual graph.
-    Vite's parsed HTML asset callbacks reject forced inlining before any direct
-    asset read; non-inlined output assets are audited by physical source path.
-  - Generated-consumer lint, typecheck, build, and integration tests prove the
-    combined configuration.
-- Do not add a second general-purpose parser, source-language analyzer, or
-  boundary script that duplicates a layer above. Use the toolchain's own
-  facilities instead: Vite's Oxc/Rolldown AST for TypeScript and JavaScript
-  asset references, the official Vue SFC compiler for `.vue` blocks, Vite's
-  HTML parser callbacks, its bundled Lightning CSS dependency analyzer, and the
-  TypeScript compiler API for the narrow coding-law pass.
-- Include `.ts`, `.tsx`, `.mts`, and `.cts` in every scoped TypeScript check.
-  Vue SFCs belong only to app/browser. CSS is the generated browser style
-  format; SCSS requires an explicitly authorized Sass compiler dependency.
-
-## Entries and configuration
-
-- Every selected app environment has an `index.ts` barrel.
-- app/browser executes from `main.ts` through `index.html`.
-- app/server centralizes process signals in an explicitly stoppable runner,
-  returns that runner from convenience startup so cleanup is never hidden, and
-  executes it from a declaration-free `main.ts`; its bundle is
-  `dist/app/server/main.cjs`, with only `node:*` external.
-- app/core is check/test-only.
-- Root `tsconfig.json` owns `@app/*` aliases.
-- Root `vite.config.ts` owns shared config and Vitest projects.
-- `configs/app` contains thin target wrappers and scoped tsconfigs.
-- app/browser uses `vue-tsc`; other app environments use `tsc`.
-
-## Manifest policy
-
-- App-only: unscoped name, `private: true`, no package `main`, `module`,
-  `types`, `exports`, or public `publishConfig`.
-- Mixed: normal published source entries; package files include `dist/src` and
-  exclude `dist/app`.
-- Add Vue only to development tooling when app/browser is selected; mixed
-  publication must not expose an app-only Vue runtime dependency.
-- Add no product-specific dependencies or optional showcase tooling by default.
-
-## Boundaries and tests
-
-- Default server host is loopback.
-- Parse the options container and host/port leaves before mutation; reject
-  wrong-shaped containers, empty hosts, and non-integer, negative, or
-  out-of-range ports with a coded error and guard.
-- Lifecycle transitions serialize in call order, ephemeral restarts re-request
-  port zero, server stop closes hostile active connections deterministically,
-  and runner stop idempotently releases its SIGINT/SIGTERM listeners. Runner
-  generations isolate asynchronous failures so an older transition cannot
-  release a newer run's listeners.
-- Real child-process tests prove executable readiness, collision exit, signal
-  termination, and port release. On Windows, `ChildProcess.kill('SIGTERM')`
-  reports OS termination by signal; POSIX delivery exercises the runner's
-  graceful signal listener and exits zero.
-- Browser tests use Playwright-backed Vitest Browser Mode and real DOM. A
-  browser-capability check probes the installed executable directly with
-  `existsSync(chromium.executablePath())`; there is no channel or environment
-  guessing.
-- Server tests bind port zero on loopback and use real fetch requests.
-- Capability-dependent tests probe the actual capability and scope any skip.
-- The generated browser application disables the public directory so an
-  unmanaged file copy cannot bypass the module graph or its boundary checks.
-- Generated CI runs the gates on the declared minimum Node release and on the
-  current major.
-- Guide parity walks existing `src` and/or `app` roots and maps every selected
-  `@src/*` / `@app/*` alias.
-
-## Cleanup before gates
-
-- Source: no stray or misplaced declarations, non-exported centralized
-  declarations, nested function declarations, duplicate implementations,
-  superfluous wrappers, compatibility aliases, or stale imports and barrel rows.
-- Tests: no unused or duplicated helpers, empty setup files, placeholder suites,
-  current-scope `.todo` / `.skip`, or assertions that cannot fail.
-- Text: UTF-8 only; scan generated or migrated edits for replacement characters,
-  mojibake, and stray control characters.
diff --git a/.claude/rules/documentation.md b/.claude/rules/documentation.md
index 5759f54..3e44518 100644
--- a/.claude/rules/documentation.md
+++ b/.claude/rules/documentation.md
@@ -64,9 +64,12 @@ Never use in-repository `@src/*` aliases in public guide examples; reserve them
 - Skills prescribe reusable process; they do not copy naming, placement, syntax, lifecycle, or test laws from `AGENTS.md` and rules.
 - Keep `SKILL.md` concise and route conditional detail to one-level `references/`.
 - Frontmatter contains only `name` and a trigger-focused `description`.
+- Set `name` to the skill's own directory name.
+- Write `description` as a single-line scalar or a folded `>-` block, and no other shape. Include in it a sentence beginning `Use ` that names when to invoke the skill.
 - Do not put model routing or package version catalogs in a skill.
 - Validate every referenced resource; do not leave template TODOs or auxiliary README/changelog files.
 - Write `agents/openai.yaml` as one root `interface:` mapping over exactly `display_name`, `short_description`, and `default_prompt`, in that order, each on its own two-space-indented line.
 - Give every one of those keys a non-empty single-quoted scalar, and write an apostrophe inside it as `''`.
 - Name the skill's own `$<directory>` token in `default_prompt`.
 - Keep provider bridges minimal: they load one canonical workflow and add no competing instructions.
+- Give a provider bridge its canonical skill's `name` and `description` verbatim, name the `.agents/skills/<name>/SKILL.md` path it loads, and give it no references of its own.
diff --git a/.claude/skills/enterprise-bootstrap/SKILL.md b/.claude/skills/enterprise-bootstrap/SKILL.md
index b2d8e0d..adce253 100644
--- a/.claude/skills/enterprise-bootstrap/SKILL.md
+++ b/.claude/skills/enterprise-bootstrap/SKILL.md
@@ -1,6 +1,15 @@
 ---
 name: enterprise-bootstrap
-description: Design and build distinctive, production-grade user interfaces with Bootstrap 5.3 and intentional frontend craft. Use for ANY UI work — pages, screens, components, layouts, app shells, dashboards, data tables, filter bars, forms, wizards, navigation, modals, empty/loading/error states, dark mode, marketing surfaces — whenever the task touches HTML/CSS/visual design, mentions Bootstrap or its components, or must look professional and avoid templated defaults.
+description: >-
+  Design and build distinctive, production-grade user interfaces with Bootstrap
+  5.3 and intentional frontend craft. Use for ANY UI work — creating, restyling,
+  reviewing, or extending pages, screens, components, layouts, app shells,
+  dashboards, admin panels, SaaS tools, data tables, filter bars, forms,
+  wizards, navigation, modals, empty/loading/error states, dark mode, marketing
+  surfaces — whenever the task touches HTML/CSS/visual design, mentions
+  Bootstrap or its components, or must look professional and avoid templated
+  defaults. Covers aesthetics, typography, color modes, design tokens,
+  accessibility (WCAG 2.2 AA), responsive layout, and enterprise app patterns.
 ---
 
 # Load the canonical workflow
diff --git a/.claude/skills/orkestrel-align-packages/SKILL.md b/.claude/skills/orkestrel-align-packages/SKILL.md
index 0504df7..8aa5a2e 100644
--- a/.claude/skills/orkestrel-align-packages/SKILL.md
+++ b/.claude/skills/orkestrel-align-packages/SKILL.md
@@ -1,6 +1,6 @@
 ---
 name: orkestrel-align-packages
-description: Audit and improve how multiple Orkestrel packages or their core, server, browser, and app environments fit together. Use for coordinated extraction/refactoring, developer ergonomics, real round-trip integration, fleet alignment, dependency/guide readiness, and topological package campaigns.
+description: Audit and improve how two or more Orkestrel packages, or their core, server, browser, and app environments, fit together. Use for coordinated package-stack refactors, cross-package extraction, developer-ergonomics reviews, end-to-end or live integration testing, dependency and guide alignment, and fleet/package-manager campaigns. Preserve host-independent core boundaries, update dependents topologically, and use the package-hardening workflow for each implementation unit.
 ---
 
 # Load the canonical workflow
diff --git a/.claude/skills/orkestrel-build-application/SKILL.md b/.claude/skills/orkestrel-build-application/SKILL.md
index f9ea6e0..fbc6fc4 100644
--- a/.claude/skills/orkestrel-build-application/SKILL.md
+++ b/.claude/skills/orkestrel-build-application/SKILL.md
@@ -1,6 +1,6 @@
 ---
 name: orkestrel-build-application
-description: Design, scaffold, extend, or harden Orkestrel app environments and their isolation, builds, tests, and guide parity.
+description: Design, scaffold, extend, or harden Orkestrel `app/core`, `app/browser`, and `app/server` environments. Use for app-only or mixed src/app workspaces, app environment isolation, Vue browser entries, Node server entries, app aliases/configs/scripts/tests, cross-environment contracts, and application guide parity.
 ---
 
 # Load the canonical workflow
diff --git a/.claude/skills/orkestrel-harden-package/SKILL.md b/.claude/skills/orkestrel-harden-package/SKILL.md
index cbe2007..ff2d483 100644
--- a/.claude/skills/orkestrel-harden-package/SKILL.md
+++ b/.claude/skills/orkestrel-harden-package/SKILL.md
@@ -1,6 +1,6 @@
 ---
 name: orkestrel-harden-package
-description: Research, audit, refactor, implement, centralize, test, document, and locally verify an individual Orkestrel TypeScript package to enterprise-grade production readiness. Use for missing/deferred capabilities, upstream or legacy comparisons, centralization, wrapper cleanup, declared @orkestrel dependency adoption, and rigorous real/live tests.
+description: Research, audit, refactor, implement, centralize, test, document, and locally verify an individual Orkestrel TypeScript package to enterprise-grade production readiness under the repository's current AGENTS.md. Use when asked to fill missing or deferred capabilities, compare upstream or legacy implementations, salvage prior art, centralize source or test declarations, eliminate nested functions or superfluous wrappers, maximize declared @orkestrel dependencies—especially @orkestrel/contract—or add rigorous real-implementation and live-service tests. Select only the phases required by a narrow request; run the full workflow for production readiness or comprehensive hardening.
 ---
 
 # Load the canonical workflow
diff --git a/tests/policy.test.ts b/tests/policy.test.ts
index 48ff8c3..6f9e67d 100644
--- a/tests/policy.test.ts
+++ b/tests/policy.test.ts
@@ -1,5 +1,6 @@
 import { describe, expect, it } from 'vitest'
 import {
+	BRIDGE_POLICY_CONTROLS,
 	FUNCTION_SOURCE_FILES,
 	GENERIC_POLICY_SOURCES,
 	inspectPolicyControl,
@@ -7,12 +8,15 @@ import {
 	inspectPolicySources,
 	inspectPolicyWorkspace,
 	inspectSkillFamily,
+	inspectSkillBridges,
+	parseSkillFrontmatter,
 	POLICY_CONTROLS,
 	POLICY_SUPPRESSION_DIRECTIVE,
 	readSkillFamily,
 	SKILL_POLICY_APOSTROPHE,
 	SKILL_POLICY_CONTROLS,
 	SKILL_POLICY_EXCLUSION,
+	SKILL_POLICY_FOLDED,
 	stemToPolicyCandidates,
 	testToPolicyStem,
 } from './setupPolicy.js'
@@ -324,6 +328,14 @@ describe('skill family policy', () => {
 		expect(inspectSkillFamily(process.cwd())).toEqual([])
 	})
 
+	it('parses a folded description containing a colon as exactly two frontmatter keys', () => {
+		const skill = SKILL_POLICY_FOLDED.files.find((file) => file.path.endsWith('/SKILL.md'))
+		const frontmatter = parseSkillFrontmatter(skill?.content ?? '')
+		expect(frontmatter?.keys).toEqual(['name', 'description'])
+		expect(frontmatter?.name).toBe('sample')
+		expect(frontmatter?.description).toBe('Use this skill when a continuation contains: a colon.')
+	})
+
 	for (const control of SKILL_POLICY_CONTROLS) {
 		it(`${control.label} [membership: ${control.membership}]`, () => {
 			const violations = inspectPolicyControl(control)
@@ -336,11 +348,29 @@ describe('skill family policy', () => {
 		expect(inspectPolicyControl(SKILL_POLICY_APOSTROPHE)).toEqual([])
 	})
 
+	it(`${SKILL_POLICY_FOLDED.label} [membership: ${SKILL_POLICY_FOLDED.membership}]`, () => {
+		expect(inspectPolicyControl(SKILL_POLICY_FOLDED)).toEqual([])
+	})
+
 	it(`${SKILL_POLICY_EXCLUSION.label} [membership: ${SKILL_POLICY_EXCLUSION.membership}]`, () => {
 		expect(inspectPolicyControl(SKILL_POLICY_EXCLUSION)).toEqual([])
 	})
 })
 
+describe('skill bridge policy', () => {
+	it('matches every real provider bridge to its canonical skill', () => {
+		expect(inspectSkillBridges(process.cwd())).toEqual([])
+	})
+
+	for (const control of BRIDGE_POLICY_CONTROLS) {
+		it(`${control.label} [membership: ${control.membership}]`, () => {
+			const violations = inspectPolicyControl(control)
+			expect(violations).toHaveLength(1)
+			expect(violations[0]?.rule).toBe(control.rule)
+		})
+	}
+})
+
 describe('repository policy', () => {
 	it('enforces placement and mirrors over the real workspace', () => {
 		expect(inspectPolicyWorkspace(process.cwd())).toEqual([])
diff --git a/tests/setupPolicy.ts b/tests/setupPolicy.ts
index 824ebde..682018e 100644
--- a/tests/setupPolicy.ts
+++ b/tests/setupPolicy.ts
@@ -13,6 +13,7 @@ import * as ts from 'typescript'
 
 /** A rule the fleet placement instrument can decide from syntax and a file path. */
 export type PolicyRule =
+	| 'bridge'
 	| 'class'
 	| 'constant'
 	| 'data'
@@ -48,14 +49,32 @@ export interface PolicyControl {
 	readonly files: readonly PolicySource[]
 }
 
+/** Parsed skill frontmatter and the exact scalar source used for bridge comparison. */
+export interface SkillFrontmatter {
+	readonly keys: readonly string[]
+	readonly name: string | undefined
+	readonly description: string | undefined
+	readonly source: {
+		readonly name: string | undefined
+		readonly description: string | undefined
+	}
+}
+
 /** The directory whose immediate child directories form the complete skill family. */
 export const SKILL_FAMILY_ROOT = '.agents/skills'
 
+/** The directory whose immediate child directories form the Claude skill bridge family. */
+export const SKILL_BRIDGE_ROOT = '.claude/skills'
+
 /** Minimal valid skill text for physical family controls. */
-export const SKILL_POLICY_TEXT = '# Skill\n'
+export const SKILL_POLICY_TEXT =
+	'---\nname: sample\ndescription: Use this skill for a policy fixture.\n---\n\n# Skill\n'
 
 /** Skill text naming one reference for physical family controls. */
-export const SKILL_REFERENCE_TEXT = '# Skill\n\nRead references/example.md.\n'
+export const SKILL_REFERENCE_TEXT = `${SKILL_POLICY_TEXT}\nRead references/example.md.\n`
+
+/** Minimal valid provider bridge text for physical bridge controls. */
+export const SKILL_BRIDGE_TEXT = `${SKILL_POLICY_TEXT}\nRead \`.agents/skills/sample/SKILL.md\`.\n`
 
 /** Canonical skill metadata whose three values each carry YAML's escaped apostrophe. */
 export const SKILL_APOSTROPHE_METADATA =
@@ -899,6 +918,22 @@ export function isPolicyFile(root: string, path: string): boolean {
 	)
 }
 
+/**
+ * Read the immediate child directories beneath one workspace-relative path.
+ *
+ * @param root - The workspace root to inspect.
+ * @param path - The workspace-relative parent directory.
+ * @returns The sorted immediate child directory names.
+ */
+export function readPolicyDirectories(root: string, path: string): readonly string[] {
+	const directory = resolvePolicyDirectory(root, path)
+	if (directory === undefined) return []
+	return readdirSync(directory, { withFileTypes: true })
+		.filter((entry) => entry.isDirectory())
+		.map((entry) => entry.name)
+		.sort()
+}
+
 /**
  * Discover the skill family from immediate directories in the workspace tree.
  *
@@ -906,11 +941,99 @@ export function isPolicyFile(root: string, path: string): boolean {
  * @returns The sorted directory names that belong to the skill family.
  */
 export function readSkillFamily(root: string): readonly string[] {
-	const directory = resolvePolicyDirectory(root, SKILL_FAMILY_ROOT)
+	return readPolicyDirectories(root, SKILL_FAMILY_ROOT)
+}
+
+/**
+ * Parse one skill document's frontmatter without interpreting arbitrary body lines as keys.
+ *
+ * @param content - The raw SKILL.md text.
+ * @returns The parsed fields and exact scalar source, or `undefined` for an unsupported shape.
+ */
+export function parseSkillFrontmatter(content: string): SkillFrontmatter | undefined {
+	const lines = content.replaceAll('\r\n', '\n').split('\n')
+	const rawLines = content.split('\n')
+	if (lines[0] !== '---') return undefined
+	const boundary = lines.indexOf('---', 1)
+	if (boundary === -1) return undefined
+	const keys: string[] = []
+	let name: string | undefined
+	let description: string | undefined
+	let nameSource: string | undefined
+	let descriptionSource: string | undefined
+
+	for (let index = 1; index < boundary; index += 1) {
+		const line = lines[index]
+		if (line === undefined) return undefined
+		const match = line.match(/^([A-Za-z][A-Za-z0-9_-]*):(.*)$/u)
+		const key = match?.[1]
+		const scalar = match?.[2]
+		if (key === undefined || scalar === undefined) return undefined
+		if (scalar !== '' && !scalar.startsWith(' ')) return undefined
+		keys.push(key)
+		let value = scalar === '' ? '' : scalar.slice(1)
+		let source = rawLines[index]?.slice(line.indexOf(':') + 1)
+		if (source === undefined) return undefined
+		if (value === '>-') {
+			if (key !== 'description') return undefined
+			const folded: string[] = []
+			const sourceLines: string[] = [source]
+			for (index += 1; index < boundary; index += 1) {
+				const continuation = lines[index]
+				if (continuation === undefined || !continuation.startsWith('  ')) {
+					index -= 1
+					break
+				}
+				folded.push(continuation.slice(2))
+				const rawContinuation = rawLines[index]
+				if (rawContinuation === undefined) return undefined
+				sourceLines.push(rawContinuation)
+			}
+			value = folded.join(' ')
+			source = sourceLines.join('\n')
+		} else if (key === 'description' && /^[>|][+-]?$/u.test(value)) {
+			return undefined
+		}
+		if (key === 'name') {
+			name = value
+			nameSource = source
+		} else if (key === 'description') {
+			description = value
+			descriptionSource = source
+		}
+	}
+
+	return {
+		keys,
+		name,
+		description,
+		source: { name: nameSource, description: descriptionSource },
+	}
+}
+
+/**
+ * Test whether a description carries a sentence that begins with the case-sensitive word `Use`.
+ *
+ * @param description - The parsed skill description.
+ * @returns True when the description contains the canonical trigger sentence.
+ */
+export function matchesSkillTrigger(description: string): boolean {
+	return /(?:^|[.!?]\s+)Use \w/u.test(description)
+}
+
+/**
+ * Read the direct Markdown files owned by one skill's references directory.
+ *
+ * @param root - The workspace root to inspect.
+ * @param name - The discovered skill directory name.
+ * @returns Each direct references/name.md path in sorted order.
+ */
+export function readSkillReferences(root: string, name: string): readonly string[] {
+	const directory = resolvePolicyDirectory(root, `${SKILL_FAMILY_ROOT}/${name}/references`)
 	if (directory === undefined) return []
 	return readdirSync(directory, { withFileTypes: true })
-		.filter((entry) => entry.isDirectory())
-		.map((entry) => entry.name)
+		.filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
+		.map((entry) => `references/${entry.name}`)
 		.sort()
 }
 
@@ -999,10 +1122,51 @@ export function inspectSkill(root: string, name: string): readonly PolicyViolati
 	const skill = `${base}/SKILL.md`
 	const metadata = `${base}/agents/openai.yaml`
 	const violations: PolicyViolation[] = []
+	let content: string | undefined
 	if (!isPolicyFile(root, skill)) {
 		violations.push(
 			createPolicyViolation('skill', skill, 'skill requires an exact-case regular SKILL.md'),
 		)
+	} else {
+		content = readFileSync(join(root, skill), 'utf8')
+		const frontmatter = parseSkillFrontmatter(content)
+		if (frontmatter === undefined) {
+			violations.push(
+				createPolicyViolation('skill', skill, 'SKILL.md frontmatter exists and parses'),
+			)
+		} else {
+			const keys = new Set(frontmatter.keys)
+			if (
+				frontmatter.keys.length !== 2 ||
+				keys.size !== 2 ||
+				!keys.has('name') ||
+				!keys.has('description')
+			) {
+				violations.push(
+					createPolicyViolation(
+						'skill',
+						skill,
+						'SKILL.md frontmatter contains exactly name and description',
+					),
+				)
+			}
+			if (frontmatter.name !== name) {
+				violations.push(
+					createPolicyViolation('skill', skill, 'SKILL.md frontmatter name matches its directory'),
+				)
+			}
+			if (frontmatter.description === undefined || frontmatter.description.trim() === '') {
+				violations.push(createPolicyViolation('skill', skill, 'SKILL.md description is non-empty'))
+			} else if (!matchesSkillTrigger(frontmatter.description)) {
+				violations.push(
+					createPolicyViolation(
+						'skill',
+						skill,
+						'SKILL.md description names when to use the skill in a sentence beginning Use',
+					),
+				)
+			}
+		}
 	}
 	if (!isPolicyFile(root, metadata)) {
 		violations.push(
@@ -1032,8 +1196,9 @@ export function inspectSkill(root: string, name: string): readonly PolicyViolati
 			)
 		}
 	}
-	if (isPolicyFile(root, skill)) {
-		for (const reference of extractSkillReferences(readFileSync(join(root, skill), 'utf8'))) {
+	const named = content === undefined ? [] : extractSkillReferences(content)
+	if (content !== undefined) {
+		for (const reference of named) {
 			const path = `${base}/${reference}`
 			if (!isPolicyFile(root, path)) {
 				violations.push(
@@ -1046,6 +1211,46 @@ export function inspectSkill(root: string, name: string): readonly PolicyViolati
 			}
 		}
 	}
+	for (const reference of readSkillReferences(root, name)) {
+		if (!named.includes(reference)) {
+			violations.push(
+				createPolicyViolation(
+					'skill',
+					`${base}/${reference}`,
+					`references Markdown file is named by SKILL.md: ${reference}`,
+				),
+			)
+		}
+	}
+	const references = resolvePolicyDirectory(root, `${base}/references`)
+	if (references !== undefined) {
+		for (const entry of readdirSync(references, { withFileTypes: true })) {
+			if (entry.isDirectory()) {
+				violations.push(
+					createPolicyViolation(
+						'skill',
+						`${base}/references/${entry.name}`,
+						'skill references directory contains no subdirectories',
+					),
+				)
+			}
+		}
+	}
+	const directory = resolvePolicyDirectory(root, base)
+	if (directory !== undefined) {
+		for (const path of globSync('**/*', { cwd: directory }).map(normalizePolicyPath).sort()) {
+			const file = basename(path).toLowerCase()
+			if ((file === 'readme.md' || file === 'changelog.md') && isPolicyFile(directory, path)) {
+				violations.push(
+					createPolicyViolation(
+						'skill',
+						`${base}/${path}`,
+						'skill directory contains no README.md or CHANGELOG.md',
+					),
+				)
+			}
+		}
+	}
 	return violations
 }
 
@@ -1062,24 +1267,135 @@ export function inspectSkillFamily(root: string): readonly PolicyViolation[] {
 }
 
 /**
- * Inspect source placement and test mirrors across one workspace.
+ * Inspect one provider bridge against its canonical skill twin.
+ *
+ * @param root - The workspace root to inspect.
+ * @param name - The shared canonical and bridge directory name.
+ * @returns Every bridge violation in frontmatter, body, and directory order.
+ */
+export function inspectBridge(root: string, name: string): readonly PolicyViolation[] {
+	const canonicalPath = `${SKILL_FAMILY_ROOT}/${name}/SKILL.md`
+	const bridgeBase = `${SKILL_BRIDGE_ROOT}/${name}`
+	const bridgePath = `${bridgeBase}/SKILL.md`
+	if (!isPolicyFile(root, bridgePath)) {
+		return [
+			createPolicyViolation('bridge', bridgePath, 'bridge requires an exact-case regular SKILL.md'),
+		]
+	}
+	const content = readFileSync(join(root, bridgePath), 'utf8')
+	const bridge = parseSkillFrontmatter(content)
+	const canonical = isPolicyFile(root, canonicalPath)
+		? parseSkillFrontmatter(readFileSync(join(root, canonicalPath), 'utf8'))
+		: undefined
+	const violations: PolicyViolation[] = []
+	if (bridge === undefined) {
+		violations.push(
+			createPolicyViolation('bridge', bridgePath, 'bridge SKILL.md frontmatter parses'),
+		)
+	} else if (canonical !== undefined) {
+		if (bridge.source.name !== canonical.source.name) {
+			violations.push(
+				createPolicyViolation(
+					'bridge',
+					bridgePath,
+					'bridge frontmatter name matches its canonical twin',
+				),
+			)
+		}
+		if (bridge.source.description !== canonical.source.description) {
+			violations.push(
+				createPolicyViolation(
+					'bridge',
+					bridgePath,
+					'bridge frontmatter description matches its canonical twin',
+				),
+			)
+		}
+	}
+	const normalized = content.replaceAll('\r\n', '\n')
+	const boundary = normalized.indexOf('\n---', 3)
+	const body = boundary === -1 ? normalized : normalized.slice(boundary + '\n---'.length)
+	if (!body.includes(canonicalPath)) {
+		violations.push(
+			createPolicyViolation(
+				'bridge',
+				bridgePath,
+				`bridge body names its canonical workflow: ${canonicalPath}`,
+			),
+		)
+	}
+	if (resolvePolicyDirectory(root, `${bridgeBase}/references`) !== undefined) {
+		violations.push(
+			createPolicyViolation(
+				'bridge',
+				`${bridgeBase}/references`,
+				'bridge owns no references directory',
+			),
+		)
+	}
+	return violations
+}
+
+/**
+ * Inspect the provider bridge set and every bridge shared with the canonical skill family.
+ *
+ * @param root - The workspace root to inspect.
+ * @returns Every bridge-set and bridge-content violation in directory order.
+ */
+export function inspectSkillBridges(root: string): readonly PolicyViolation[] {
+	const canonical = readSkillFamily(root)
+	const bridges = readPolicyDirectories(root, SKILL_BRIDGE_ROOT)
+	const bridgeSet = new Set(bridges)
+	const canonicalSet = new Set(canonical)
+	const violations: PolicyViolation[] = []
+	for (const name of canonical) {
+		if (!bridgeSet.has(name)) {
+			violations.push(
+				createPolicyViolation(
+					'bridge',
+					`${SKILL_BRIDGE_ROOT}/${name}`,
+					'canonical skill has a matching provider bridge directory',
+				),
+			)
+		} else {
+			violations.push(...inspectBridge(root, name))
+		}
+	}
+	for (const name of bridges) {
+		if (!canonicalSet.has(name)) {
+			violations.push(
+				createPolicyViolation(
+					'bridge',
+					`${SKILL_BRIDGE_ROOT}/${name}`,
+					'provider bridge directory has a canonical skill twin',
+				),
+			)
+		}
+	}
+	return violations
+}
+
+/**
+ * Inspect every policy rule across one workspace.
  *
  * @param root - The workspace root to inspect.
- * @returns Every source-placement and mirror violation.
+ * @returns Every source, mirror, suppression, skill, and bridge violation.
  */
 export function inspectPolicyWorkspace(root: string): readonly PolicyViolation[] {
 	return [
 		...inspectPolicySources(readPolicySources(root)),
 		...inspectPolicyMirrors(root),
 		...inspectPolicySuppressions(root),
+		...inspectSkillFamily(root),
+		...inspectSkillBridges(root),
 	]
 }
 
 /**
  * Write a control to a real temporary workspace and run the production sweep over it.
  *
- * The control's rule selects the sweep: `skill` inspects the family, every other rule inspects
- * source placement and mirrors.
+ * The control's rule selects the sweep: `skill` inspects the canonical family, `bridge` inspects
+ * provider bridges, and every other rule inspects the whole workspace route.
  *
  * @param control - The physical fixture and expected rule boundary.
  * @returns Every violation reported through the production workspace route.
@@ -1092,7 +1408,9 @@ export function inspectPolicyControl(control: PolicyControl): readonly PolicyVio
 			mkdirSync(dirname(path), { recursive: true })
 			writeFileSync(path, file.content, 'utf8')
 		}
-		return control.rule === 'skill' ? inspectSkillFamily(root) : inspectPolicyWorkspace(root)
+		if (control.rule === 'skill') return inspectSkillFamily(root)
+		if (control.rule === 'bridge') return inspectSkillBridges(root)
+		return inspectPolicyWorkspace(root)
 	} finally {
 		rmSync(root, { recursive: true, force: true })
 	}
@@ -1348,6 +1666,109 @@ export const POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 
 /** Physical in-family controls for every skill-family assertion class. */
 export const SKILL_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
+	{
+		label: 'rejects a SKILL.md without frontmatter',
+		membership: 'exact-case regular SKILL.md files in discovered skill directories',
+		rule: 'skill',
+		files: [
+			{ path: '.agents/skills/sample/SKILL.md', content: '# Skill\n' },
+			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
+		],
+	},
+	{
+		label: 'rejects an unsupported description scalar shape',
+		membership: 'description scalars in discovered skill frontmatter',
+		rule: 'skill',
+		files: [
+			{
+				path: '.agents/skills/sample/SKILL.md',
+				content:
+					'---\nname: sample\ndescription: |\n  Use this skill for a policy fixture.\n---\n\n# Skill\n',
+			},
+			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
+		],
+	},
+	{
+		label: 'rejects extra frontmatter keys',
+		membership: 'parsed frontmatter keys in discovered skill documents',
+		rule: 'skill',
+		files: [
+			{
+				path: '.agents/skills/sample/SKILL.md',
+				content:
+					'---\nname: sample\ndescription: Use this skill for a policy fixture.\nlicense: MIT\n---\n\n# Skill\n',
+			},
+			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
+		],
+	},
+	{
+		label: 'rejects a frontmatter name that differs from its directory',
+		membership: 'parsed names in discovered skill frontmatter',
+		rule: 'skill',
+		files: [
+			{
+				path: '.agents/skills/sample/SKILL.md',
+				content:
+					'---\nname: other\ndescription: Use this skill for a policy fixture.\n---\n\n# Skill\n',
+			},
+			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
+		],
+	},
+	{
+		label: 'rejects an empty skill description',
+		membership: 'parsed descriptions in discovered skill frontmatter',
+		rule: 'skill',
+		files: [
+			{
+				path: '.agents/skills/sample/SKILL.md',
+				content: '---\nname: sample\ndescription: \n---\n\n# Skill\n',
+			},
+			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
+		],
+	},
+	{
+		label: 'rejects a description without a Use sentence',
+		membership: 'immediate directories beneath .agents/skills',
+		rule: 'skill',
+		files: [
+			{
+				path: '.agents/skills/sample/SKILL.md',
+				content:
+					'---\nname: sample\ndescription: Exercise the skill family policy.\n---\n\n# Skill\n',
+			},
+			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
+		],
+	},
+	{
+		label: 'rejects an unnamed Markdown reference file',
+		membership: 'Markdown files directly beneath a discovered skill references directory',
+		rule: 'skill',
+		files: [
+			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
+			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
+			{ path: '.agents/skills/sample/references/orphan.md', content: '# Orphan\n' },
+		],
+	},
+	{
+		label: 'rejects a nested references directory',
+		membership: 'directories directly beneath a discovered skill references directory',
+		rule: 'skill',
+		files: [
+			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
+			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
+			{ path: '.agents/skills/sample/references/nested/detail.md', content: '# Detail\n' },
+		],
+	},
+	{
+		label: 'rejects an auxiliary changelog in a skill directory',
+		membership: 'files at any depth inside a discovered skill directory',
+		rule: 'skill',
+		files: [
+			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
+			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
+			{ path: '.agents/skills/sample/docs/CHANGELOG.MD', content: '# Changes\n' },
+		],
+	},
 	{
 		label: 'rejects a missing exact-case SKILL.md',
 		membership: 'immediate directories beneath .agents/skills',
@@ -1407,12 +1828,104 @@ export const SKILL_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 	},
 	{
 		label: 'rejects a dangling exact-case SKILL.md reference',
-		membership: 'immediate directories beneath .agents/skills',
+		membership: 'references/name.md tokens extracted from canonical SKILL.md text',
 		rule: 'skill',
 		files: [
 			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_REFERENCE_TEXT },
 			{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
-			{ path: '.agents/skills/sample/references/Example.md', content: '# Example\n' },
+		],
+	},
+])
+
+/** Physical controls for provider-bridge assertions. */
+export const BRIDGE_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
+	{
+		label: 'rejects a canonical skill without a provider bridge',
+		membership: 'immediate directories beneath .agents/skills',
+		rule: 'bridge',
+		files: [{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT }],
+	},
+	{
+		label: 'rejects a provider bridge without a canonical skill',
+		membership: 'immediate directories beneath .claude/skills',
+		rule: 'bridge',
+		files: [
+			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
+			{ path: '.claude/skills/sample/SKILL.md', content: SKILL_BRIDGE_TEXT },
+			{
+				path: '.claude/skills/extra/SKILL.md',
+				content:
+					'---\nname: extra\ndescription: Use this skill for a policy fixture.\n---\n\nRead `.agents/skills/extra/SKILL.md`.\n',
+			},
+		],
+	},
+	{
+		label: 'rejects a bridge without an exact-case SKILL.md',
+		membership: 'provider bridge directories shared with the canonical family',
+		rule: 'bridge',
+		files: [
+			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
+			{ path: '.claude/skills/sample/skill.md', content: SKILL_BRIDGE_TEXT },
+		],
+	},
+	{
+		label: 'rejects malformed bridge frontmatter',
+		membership: 'exact-case regular SKILL.md files in shared provider bridge directories',
+		rule: 'bridge',
+		files: [
+			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
+			{
+				path: '.claude/skills/sample/SKILL.md',
+				content: '# Bridge\n\nRead `.agents/skills/sample/SKILL.md`.\n',
+			},
+		],
+	},
+	{
+		label: 'rejects a bridge name that drifts from its canonical twin',
+		membership: 'parsed frontmatter in shared provider bridge directories',
+		rule: 'bridge',
+		files: [
+			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
+			{
+				path: '.claude/skills/sample/SKILL.md',
+				content:
+					'---\nname: other\ndescription: Use this skill for a policy fixture.\n---\n\nRead `.agents/skills/sample/SKILL.md`.\n',
+			},
+		],
+	},
+	{
+		label: 'rejects a bridge description that drifts from its canonical twin',
+		membership: 'matching immediate directories beneath .agents/skills and .claude/skills',
+		rule: 'bridge',
+		files: [
+			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
+			{
+				path: '.claude/skills/sample/SKILL.md',
+				content:
+					'---\nname: sample\ndescription: >-\n  Use this skill for a policy fixture.\n---\n\nRead `.agents/skills/sample/SKILL.md`.\n',
+			},
+		],
+	},
+	{
+		label: 'rejects a bridge body without its canonical workflow path',
+		membership: 'bodies of exact-case regular bridge SKILL.md files',
+		rule: 'bridge',
+		files: [
+			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
+			{
+				path: '.claude/skills/sample/SKILL.md',
+				content: `${SKILL_POLICY_TEXT}\nRead the canonical workflow.\n`,
+			},
+		],
+	},
+	{
+		label: 'rejects a references directory owned by a provider bridge',
+		membership: 'shared provider bridge directories',
+		rule: 'bridge',
+		files: [
+			{ path: '.agents/skills/sample/SKILL.md', content: SKILL_POLICY_TEXT },
+			{ path: '.claude/skills/sample/SKILL.md', content: SKILL_BRIDGE_TEXT },
+			{ path: '.claude/skills/sample/references/detail.md', content: '# Detail\n' },
 		],
 	},
 ])
@@ -1428,6 +1941,21 @@ export const SKILL_POLICY_APOSTROPHE: PolicyControl = Object.freeze({
 	],
 })
 
+/** A folded description containing a colon, proving continuation lines do not become keys. */
+export const SKILL_POLICY_FOLDED: PolicyControl = Object.freeze({
+	label: 'accepts a folded description containing a colon',
+	membership: 'folded description scalars in discovered skill frontmatter',
+	rule: 'skill',
+	files: [
+		{
+			path: '.agents/skills/sample/SKILL.md',
+			content:
+				'---\nname: sample\ndescription: >-\n  Use this skill when a continuation contains: a colon.\n---\n\n# Skill\n',
+		},
+		{ path: '.agents/skills/sample/agents/openai.yaml', content: createSkillMetadata('sample') },
+	],
+})
+
 /** A bridge skill outside the discovered family, used to prove the membership boundary. */
 export const SKILL_POLICY_EXCLUSION: PolicyControl = Object.freeze({
 	label: 'excludes .claude/skills from the skill family',
