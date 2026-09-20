# Unit U3-policy — report 10

## Diff

```diff
diff --git a/tests/policy.test.ts b/tests/policy.test.ts
index 320c19de..18e95bb9 100644
--- a/tests/policy.test.ts
+++ b/tests/policy.test.ts
@@ -25,9 +25,13 @@ import {
 	matchesSkillTrigger,
 	parseSkillFrontmatter,
 	POLICY_CATALOG_FILE,
+	POLICY_MANIFEST_FILE,
 	POLICY_SURFACE_HOST,
 	POLICY_SURFACE_CATALOG,
 	POLICY_CONTROLS,
+	POLICY_INDEX_LINK,
+	POLICY_INDEX_ROW,
+	POLICY_MAP_FILE,
 	POLICY_MIRROR_PATTERN,
 	POLICY_SUPPRESSION_DIRECTIVE,
 	POLICY_TERM_FILE,
@@ -37,6 +41,7 @@ import {
 	PROSE_POLICY_MANIFEST,
 	readPolicyCatalog,
 	readPolicyGuide,
+	readPolicyIndex,
 	readPolicyPackage,
 	readPolicyPaths,
 	readPolicyProse,
@@ -647,7 +652,20 @@ describe('portability policy', () => {
 })
 
 describe('prose policy', () => {
-	for (const control of PROSE_POLICY_CONTROLS) {
+	for (const control of PROSE_POLICY_CONTROLS.filter(
+		(candidate) => candidate.violations !== undefined,
+	)) {
+		it(`${control.label} [membership: ${control.membership}]`, () => {
+			const violations = inspectPolicyControl(control).filter(
+				(violation) => violation.rule === 'prose',
+			)
+			expect(violations).toEqual(control.violations)
+		})
+	}
+
+	for (const control of PROSE_POLICY_CONTROLS.filter(
+		(candidate) => candidate.violations === undefined,
+	)) {
 		it(`${control.label} [membership: ${control.membership}]`, () => {
 			const violations = inspectPolicyControl(control).filter(
 				(violation) => violation.rule === 'prose',
@@ -659,10 +677,10 @@ describe('prose policy', () => {
 	}
 
 	// A mirror is excluded from the term sweep, so the exclusion needs evidence rather than
-	// silence. The catalog table is that evidence, and it is a second mechanism: it is regenerated
-	// from the registry and names the fleet, while the guides directory names what this checkout
-	// holds. A guide neither side accounts for reports.
-	it('accounts for every top-level guide as this package, the index, or a catalog row', () => {
+	// silence. The catalog table, regenerated from the registry, names the fleet; the map's
+	// directory index, authored here, maps what this checkout documents. A guide neither
+	// mechanism accounts for reports.
+	it('accounts for every top-level guide as this package, the map, a directory-index row, or a catalog row', () => {
 		const root = process.cwd()
 		const own = readPolicyPackage(root)
 		if (own === undefined) throw new Error('The workspace manifest declares no name')
@@ -676,19 +694,197 @@ describe('prose policy', () => {
 		expect(isPolicyMirror(root, 'guides/README.md')).toBe(false)
 		expect(isPolicyStray(root, `guides/${own}.md`)).toBe(false)
 		expect(isPolicyStray(root, 'guides/README.md')).toBe(false)
-		// The control: a name no catalog row registers is a stray whatever the directory holds.
-		expect(isPolicyStray(root, 'guides/absent.md')).toBe(true)
+	})
+
+	it('reports a top-level guide neither the catalog nor a directory-index row accounts for as a stray', () => {
+		const scratch = createPolicyScratch({ prefix: 'orkestrel-policy-stray-' })
+		try {
+			scratch.write(POLICY_MANIFEST_FILE, '{"name":"@orkestrel/sample"}\n')
+			scratch.write(POLICY_CATALOG_FILE, createPolicyCatalog(['sample', 'other']))
+			scratch.write(
+				'guides/README.md',
+				'# Map\n\n| Directory | Guide |\n| --- | --- |\n| `src/other` | [`other.md`](other.md) |\n',
+			)
+			// The control: a name neither the catalog registers nor a directory-index row maps is
+			// a stray whatever the directory holds.
+			expect(isPolicyStray(scratch.path, 'guides/absent.md')).toBe(true)
+		} finally {
+			scratch.destroy()
+		}
+	})
+
+	it('reads the ordinary link forms a directory-index row link cell writes', () => {
+		expect(POLICY_MAP_FILE).toBe('guides/README.md')
+		expect('see [`sample.md`](sample.md) here'.match(POLICY_INDEX_LINK)?.[0]).toBe('](sample.md)')
+		expect('see [`sample.md`](./sample.md) here'.match(POLICY_INDEX_LINK)?.groups?.bare).toBe(
+			'sample',
+		)
+		expect(
+			'see [`sample.md`](sample.md "Sample") here'.match(POLICY_INDEX_LINK)?.groups?.bare,
+		).toBe('sample')
+		expect(
+			"see [`sample.md`](sample.md 'Sample') here".match(POLICY_INDEX_LINK)?.groups?.bare,
+		).toBe('sample')
+		expect(
+			'see [`sample.md`](sample.md (Sample)) here'.match(POLICY_INDEX_LINK)?.groups?.bare,
+		).toBe('sample')
+		expect('see [`sample.md`](<sample.md>) here'.match(POLICY_INDEX_LINK)?.groups?.angled).toBe(
+			'sample',
+		)
+		expect(
+			'see [`sample.md`](sample.md#fragment) here'.match(POLICY_INDEX_LINK)?.groups?.bare,
+		).toBe('sample')
+		expect('see [`tokens.md`](nested/tokens.md) here'.match(POLICY_INDEX_LINK)).toBeNull()
+		expect('see [`y.md`](https://x/y.md) here'.match(POLICY_INDEX_LINK)).toBeNull()
+		expect('see [`README.md`](../README.md) here'.match(POLICY_INDEX_LINK)).toBeNull()
+		expect('see [`tokens.md`](<tokens.md) here'.match(POLICY_INDEX_LINK)).toBeNull()
+		expect('see [`tokens.md`](tokens.md>) here'.match(POLICY_INDEX_LINK)).toBeNull()
+		expect('see [`y.md`](https:sample.md) here'.match(POLICY_INDEX_LINK)).toBeNull()
+	})
+
+	it('admits a fragment in either branch and a space only inside the angle-bracket form', () => {
+		expect(
+			'see [`blueprint`](<sample.md#blueprint>) here'.match(POLICY_INDEX_LINK)?.groups?.angled,
+		).toBe('sample')
+		expect('see [`my guide.md`](my guide.md) here'.match(POLICY_INDEX_LINK)).toBeNull()
+		expect('see [`my guide.md`](<my guide.md>) here'.match(POLICY_INDEX_LINK)?.groups?.angled).toBe(
+			'my guide',
+		)
+		expect(
+			'see [`sample.md`](sample.md#topic.md) here'.match(POLICY_INDEX_LINK)?.groups?.bare,
+		).toBe('sample')
+		expect('see [`sample.md`](<./sample.md>) here'.match(POLICY_INDEX_LINK)?.groups?.angled).toBe(
+			'sample',
+		)
+		expect('see [`sample.md`](sample.md#bad fragment) here'.match(POLICY_INDEX_LINK)).toBeNull()
+		expect('see [`sample.md`](sample.md#bad>) here'.match(POLICY_INDEX_LINK)).toBeNull()
+		expect('see [`sample.md`](<sample.md>#fragment) here'.match(POLICY_INDEX_LINK)).toBeNull()
+		expect('see [`sample.md`](<sample.md#first>#second) here'.match(POLICY_INDEX_LINK)).toBeNull()
+	})
+
+	it('reads a directory-index row and captures its path and link cells', () => {
+		const match = '| `src/styles` | [`tokens.md`](tokens.md) |'.match(POLICY_INDEX_ROW)
+		expect(match?.groups?.path).toBe('src/styles')
+		expect(match?.groups?.link).toBe('[`tokens.md`](tokens.md)')
+		expect('not a row'.match(POLICY_INDEX_ROW)).toBeNull()
+	})
+
+	it('confines a row path to a relative cell and its link to the second cell', () => {
+		const scratch = createPolicyScratch({ prefix: 'orkestrel-policy-index-cells-' })
+		try {
+			scratch.write('src/styles/index.ts', '')
+			scratch.write(
+				'guides/README.md',
+				[
+					'# Map',
+					'',
+					'| `/outside` | [outside](outside.md) |',
+					'| `src/styles` | no guide | [later](later.md) |',
+					'| `src/styles` | [`tokens.md`](tokens.md) |',
+					'',
+				].join('\n'),
+			)
+			// Admitting either invalid row would add 'outside' or 'later' to the result: the
+			// leading-`/` row refuses the whole row before {@link POLICY_INDEX_ROW} ever captures
+			// a link, and the three-cell row's link group stops at the first unescaped `|`, so its
+			// captured link is 'no guide' rather than the third cell's [later](later.md), which
+			// {@link POLICY_INDEX_LINK} never matches. Both pre-fix failure modes redden this
+			// assertion because each invalid row names a guide the valid row does not.
+			expect(readPolicyIndex(scratch.path)).toEqual(['tokens'])
+		} finally {
+			scratch.destroy()
+		}
+	})
+
+	it('counts a row only when its path resolves to an existing directory', () => {
+		const scratch = createPolicyScratch({ prefix: 'orkestrel-policy-index-directory-' })
+		try {
+			scratch.write(
+				'guides/README.md',
+				[
+					'# Map',
+					'',
+					'| `src/absent` | [`absent.md`](absent.md) |',
+					'| `src/styles` | [`tokens.md`](tokens.md) |',
+					'',
+				].join('\n'),
+			)
+			scratch.write('src/styles/index.ts', '')
+			expect(readPolicyIndex(scratch.path)).toEqual(['tokens'])
+		} finally {
+			scratch.destroy()
+		}
+	})
+
+	it('reads every link in a row link cell, not the first alone', () => {
+		const scratch = createPolicyScratch({ prefix: 'orkestrel-policy-index-multi-link-' })
+		try {
+			scratch.write('src/styles/index.ts', '')
+			scratch.write(
+				'guides/README.md',
+				[
+					'# Map',
+					'',
+					'| `src/styles` | [`tokens.md`](tokens.md), [`theme.md`](theme.md) |',
+					'',
+				].join('\n'),
+			)
+			expect(readPolicyIndex(scratch.path)).toEqual(['tokens', 'theme'])
+		} finally {
+			scratch.destroy()
+		}
+	})
+
+	it('reads first-row order and drops a repeated row', () => {
+		const scratch = createPolicyScratch({ prefix: 'orkestrel-policy-index-' })
+		try {
+			scratch.write('src/beta/index.ts', '')
+			scratch.write('src/alpha/index.ts', '')
+			scratch.write('src/beta2/index.ts', '')
+			scratch.write(
+				'guides/README.md',
+				[
+					'# Map',
+					'',
+					'| Directory | Guide |',
+					'| --- | --- |',
+					'| `src/beta` | [`beta.md`](beta.md) |',
+					'| `src/alpha` | [`alpha.md`](alpha.md) |',
+					'| `src/beta2` | [`beta.md`](beta.md) |',
+					'',
+				].join('\n'),
+			)
+			expect(readPolicyIndex(scratch.path)).toEqual(['beta', 'alpha'])
+		} finally {
+			scratch.destroy()
+		}
+	})
+
+	it('reads no name from a link written outside a directory-index row', () => {
+		const scratch = createPolicyScratch({ prefix: 'orkestrel-policy-index-outside-' })
+		try {
+			scratch.write(
+				'guides/README.md',
+				['# Map', '', 'See [`beta.md`](beta.md) in prose.', ''].join('\n'),
+			)
+			expect(readPolicyIndex(scratch.path)).toEqual([])
+		} finally {
+			scratch.destroy()
+		}
 	})
 
 	it('reads the guide name a top-level path carries for another package to account for', () => {
-		const root = process.cwd()
-		const own = readPolicyPackage(root)
-		if (own === undefined) throw new Error('The workspace manifest declares no name')
-		expect(readPolicyGuide(root, 'guides/other.md')).toBe('other')
-		expect(readPolicyGuide(root, `guides/${own}.md`)).toBeUndefined()
-		expect(readPolicyGuide(root, 'guides/README.md')).toBeUndefined()
-		expect(readPolicyGuide(root, 'guides/nested/other.md')).toBeUndefined()
-		expect(readPolicyGuide(root, 'AGENTS.md')).toBeUndefined()
+		const scratch = createPolicyScratch({ prefix: 'orkestrel-policy-guide-' })
+		try {
+			scratch.write(POLICY_MANIFEST_FILE, '{"name":"@orkestrel/sample"}\n')
+			expect(readPolicyGuide(scratch.path, 'guides/other.md')).toBe('other')
+			expect(readPolicyGuide(scratch.path, 'guides/sample.md')).toBeUndefined()
+			expect(readPolicyGuide(scratch.path, 'guides/README.md')).toBeUndefined()
+			expect(readPolicyGuide(scratch.path, 'guides/nested/other.md')).toBeUndefined()
+			expect(readPolicyGuide(scratch.path, 'AGENTS.md')).toBeUndefined()
+		} finally {
+			scratch.destroy()
+		}
 	})
 
 	it('reads the authored Markdown population and excludes the directories it names', () => {
diff --git a/tests/setupPolicy.ts b/tests/setupPolicy.ts
index 1d713f27..d882f854 100644
--- a/tests/setupPolicy.ts
+++ b/tests/setupPolicy.ts
@@ -19,7 +19,12 @@ import { tmpdir } from 'node:os'
 import { basename, dirname, join, matchesGlob, relative as relativePath, resolve } from 'node:path'
 import { fileURLToPath } from 'node:url'
 import { parseSync } from 'vite'
-import { stripPolicyCode, textToPolicyHits } from '../configs/policy.js'
+import {
+	blankPolicyText,
+	POLICY_FENCE_PATTERN,
+	stripPolicyCode,
+	textToPolicyHits,
+} from '../configs/policy.js'
 
 /** Names a rule the fleet sweep decides from workspace text and paths. */
 export type PolicyRule =
@@ -366,7 +371,35 @@ export const POLICY_PROSE_EXCLUSIONS: readonly string[] = Object.freeze([
 /** Matches a top-level guide path and captures the package short name it is written for. */
 export const POLICY_MIRROR_PATTERN = /^guides\/([^/]+)\.md$/u
 
-/** Names the guide a workspace holds as its own index rather than as a mirror. */
+/**
+ * Matches a Markdown link whose target is a sibling `<name>.md` file.
+ *
+ * @remarks
+ * Admits an optional `./` prefix in either branch, a target wrapped in a balanced pair of angle
+ * brackets, an optional `#fragment`, and an optional title in any of the three CommonMark forms
+ * (double-quoted, single-quoted, or parenthesized), because a directory-index row written with any
+ * of those ordinary Markdown forms names the same sibling guide. The angle-bracket branch captures
+ * into `angled`; the bare branch captures into `bare`. The capture names differ because a
+ * duplicate named capture group across alternation branches is a `SyntaxError` before Node 23 and
+ * is permitted from Node 23 onward, and this pattern runs on the package's declared floor,
+ * `>=22.18.0`. Only one branch matches a given input, so a reader takes whichever of
+ * `groups.angled` or `groups.bare` is defined. Both name classes exclude `#` and `:`, so a fragment
+ * or a colon-bearing scheme or drive letter can never be captured as part of the name; both
+ * fragment classes exclude whitespace and angle brackets, so a fragment carrying a space or a stray
+ * `>` refuses the whole match. Each branch owns its own optional fragment group: the angle-bracket
+ * branch's fragment sits inside the brackets, before the closing `>`, and the bare branch's fragment
+ * sits after its name, before the optional title and the closing `)`. Neither branch admits a
+ * second fragment written after its own closing token, so `](<sample.md>#fragment)` and
+ * `](<sample.md#first>#second)` both refuse. The angle-bracket branch alone admits a space in its
+ * target, matching CommonMark's rule that a destination may carry a space only when wrapped in
+ * `<>`; the bare branch's class excludes a space for the same reason. Refuses a target carrying only
+ * one angle bracket, a nested path, an absolute address, or a parent-relative path, because none of
+ * those are a sibling `.md` file.
+ */
+export const POLICY_INDEX_LINK =
+	/\]\((?:<(?:\.\/)?(?<angled>[^/)\n<>":#]+)\.md(?:#[^)\n<>"\s]*)?>|(?:\.\/)?(?<bare>[^/)\n<>":#\s]+)\.md(?:#[^)\n<>"\s]*)?)(?:\s+(?:"[^"\n]*"|'[^'\n]*'|\([^()\n]*\)))?\)/u
+
+/** Names the guide a workspace holds as its own, rather than as a mirror. */
 export const POLICY_GUIDE_MAP = 'README'
 
 /** Names the rule file whose substitution table is the denylist's source. */
@@ -387,6 +420,25 @@ export const POLICY_CATALOG_FILE = '.claude/agents/orkestrel.md'
 /** Names the heading that opens the package catalog. */
 export const POLICY_CATALOG_HEADING = '## Package catalog'
 
+/** Names the map file a workspace authors to index its guides. */
+export const POLICY_MAP_FILE = `guides/${POLICY_GUIDE_MAP}.md`
+
+/**
+ * Matches a directory-index table row mapping a workspace directory to its guide.
+ *
+ * @remarks
+ * Captures the row's first cell, a backticked relative path, into `path`, and confines `link` to
+ * that row's own second cell: the cell ends at the next unescaped `|`, so a third cell never reaches
+ * {@link POLICY_INDEX_LINK}. The path excludes a leading `/`, a `..` segment, and `:`, so an
+ * absolute path, a parent-relative path, and a drive letter each refuse the whole row rather than
+ * being captured as a directory this workspace claims. A row is the workspace's own statement that
+ * the guide in its second cell documents the directory in its first cell, so a link found outside
+ * this row shape is navigation, not authorship. Anchored with `^` and without the `m` flag, so a
+ * caller applies it to one line at a time rather than to a whole multi-line text.
+ */
+export const POLICY_INDEX_ROW =
+	/^\|\s*`(?<path>(?!\/)(?!(?:[^`]*\/)?\.\.(?:\/|`))[^`:]+)`\s*\|\s*(?<link>(?:\\.|[^|\\])*?)\s*\|/u
+
 /**
  * Normalizes platform separators for stable matching and diagnostics.
  *
@@ -1964,13 +2016,62 @@ export function readPolicyCatalog(
 	return names
 }
 
+/**
+ * Reads every distinct guide name a directory-index row in the workspace's own map maps.
+ *
+ * @remarks
+ * The reader scans every line of the map after fence blanking and reads every row
+ * {@link POLICY_INDEX_ROW} matches, wherever that row sits: a first cell holding a backticked
+ * relative path, and a second cell holding a link confined to that row's own cell. That row is the
+ * workspace's own statement that the guide in its second cell documents the directory in its first,
+ * so a link found outside a row — in prose, in a heading — accounts for nothing. The reader reads
+ * every row of that shape, under any heading, whatever the first cell's text names; this
+ * repository's and Veneer's concept tables write an unbackticked concept name in the first cell, so
+ * neither matches today, and a workspace whose concept table names a backticked relative path in
+ * that same cell would match a row that names no directory this workspace holds. A row only counts
+ * when its first cell resolves to an existing directory of the workspace, checked with
+ * {@link resolvePolicyDirectory}; a row naming a directory that does not exist accounts for
+ * nothing.
+ *
+ * Only a fenced code block is blanked before the line scan, the same fence limit
+ * {@link stripPolicyCode} carries: an unclosed fence, and a fence indented four or more spaces, are
+ * not blanked, so a row-shaped line inside either still matches. Neither an inline code span nor an
+ * unpaired backtick is blanked before the row and link patterns read a line's own text, so a span or
+ * a stray backtick elsewhere on the line does not change what {@link POLICY_INDEX_ROW} and
+ * {@link POLICY_INDEX_LINK} read from it. The reader applies {@link POLICY_INDEX_ROW} to one line at
+ * a time, so a row never spans two lines. It reads every {@link POLICY_INDEX_LINK} match in a row's
+ * link cell, not the first alone, so a cell carrying two guide links accounts for both.
+ *
+ * @param root - The workspace root to read.
+ * @returns Each row's guide name, in first-row order and distinct; an absent map, or a map with no
+ * row, yields an empty list.
+ */
+export function readPolicyIndex(root: string): readonly string[] {
+	if (!isPolicyFile(root, POLICY_MAP_FILE)) return []
+	const text = readFileSync(join(root, POLICY_MAP_FILE), 'utf8')
+		.replaceAll('\r\n', '\n')
+		.replace(POLICY_FENCE_PATTERN, blankPolicyText)
+	const link = new RegExp(POLICY_INDEX_LINK, `${POLICY_INDEX_LINK.flags}g`)
+	const names: string[] = []
+	for (const line of text.split('\n')) {
+		const row = line.match(POLICY_INDEX_ROW)?.groups
+		if (row === undefined) continue
+		if (resolvePolicyDirectory(root, row.path ?? '') === undefined) continue
+		for (const match of (row.link ?? '').matchAll(link)) {
+			const name = match.groups?.angled ?? match.groups?.bare
+			if (name !== undefined && !names.includes(name)) names.push(name)
+		}
+	}
+	return names
+}
+
 /**
  * Reads the guide name one prose path carries when that guide is another package's to account for.
  *
  * @remarks
- * A top-level `guides/<name>.md` path yields its name unless the name is the guide index or this
- * workspace's own package; every other path yields undefined. {@link isPolicyMirror} and
- * {@link isPolicyStray} split that name by catalog membership.
+ * A top-level `guides/<name>.md` path yields its name unless the name is the map or this
+ * workspace's own package; every other path yields undefined. {@link isPolicyMirror} decides by
+ * catalog membership; {@link isPolicyStray} decides by catalog membership and directory-index rows.
  *
  * @param root - The workspace root the path belongs to.
  * @param path - The workspace-relative prose path to read.
@@ -1988,9 +2089,10 @@ export function readPolicyGuide(root: string, path: string): string | undefined
  *
  * @remarks
  * A mirror is fetched bytes rather than authored prose, so the term sweep leaves it to the package
- * that wrote it. The catalog table is the evidence, and it is the only evidence: the workspace's own
- * guide and the guide index are authored here, and a top-level guide the catalog does not register
- * is a finding rather than a silent exclusion.
+ * that wrote it. This decision reads the catalog table alone; {@link isPolicyStray} reads both the
+ * catalog and the map's directory index. A catalog row wins over a directory-index row carrying the
+ * same name, because `catalog` overwrites such a file with the mirror, leaving no authored guide at
+ * that path for the directory-index row to have mapped.
  *
  * @param root - The workspace root the path belongs to.
  * @param path - The workspace-relative prose path to judge.
@@ -2005,14 +2107,27 @@ export function isPolicyMirror(root: string, path: string): boolean {
 /**
  * Reports whether one prose path is a top-level guide no evidence accounts for.
  *
+ * @remarks
+ * A guide is accounted for as this package's own, as the map, as a guide a directory-index row of
+ * the map maps, or as a catalog row. The catalog table, regenerated from the registry, names the
+ * fleet. A directory-index row, authored here, is this workspace's own statement that the guide in
+ * its second cell documents the directory in its first; an ordinary link written in prose is
+ * navigation, not that statement. So a mirror the catalog stops registering while a directory-index
+ * row still maps it is swept — the recovery differs by cause, and neither cause is a defect in the
+ * reported guide's own prose. For an unaccounted authored guide, add its directory-index row. For a
+ * fetched mirror, restore its catalog evidence; never rewrite the mirror to clear the finding. A
+ * guide a directory-index row maps still receives the same term sweep every authored guide gets, and
+ * that sweep's terms diagnose nothing about the catalog's accuracy.
+ *
  * @param root - The workspace root the path belongs to.
  * @param path - The workspace-relative prose path to judge.
- * @returns True if the path is a top-level guide that is neither this package's own, nor the index,
- * nor a catalog row; false otherwise.
+ * @returns True if the path is a top-level guide that is neither this package's own, nor the map,
+ * nor a guide the map's directory index maps, nor a catalog row; false otherwise.
  */
 export function isPolicyStray(root: string, path: string): boolean {
 	const name = readPolicyGuide(root, path)
-	return name !== undefined && !readPolicyCatalog(root).includes(name)
+	if (name === undefined) return false
+	return !readPolicyCatalog(root).includes(name) && !readPolicyIndex(root).includes(name)
 }
 
 /**
@@ -2038,7 +2153,7 @@ export function inspectPolicyProse(root: string): readonly PolicyViolation[] {
 				createPolicyViolation(
 					'prose',
 					path,
-					"guide is the package's own, the map, or a catalog row",
+					"guide is the package's own, the map, a guide the directory index maps, or a catalog row",
 				),
 			)
 		}
@@ -3378,15 +3493,168 @@ export const PROSE_POLICY_CONTROLS: readonly PolicyControl[] = Object.freeze([
 		],
 	},
 	{
-		label: 'rejects a top-level guide the catalog does not register',
-		membership: 'top-level guides that are neither this package, nor the index, nor a catalog row',
+		label: 'rejects a top-level guide with no catalog row and no directory-index row',
+		membership:
+			'top-level guides that are neither this package, nor the map, nor a guide a directory-index row maps, nor a catalog row',
 		rule: 'prose',
-		message: "guide is the package's own, the map, or a catalog row",
 		files: [
 			{ path: POLICY_MANIFEST_FILE, content: PROSE_POLICY_MANIFEST },
 			{ path: POLICY_CATALOG_FILE, content: createPolicyCatalog(['other', 'sample']) },
 			{ path: 'guides/stray.md', content: '# Stray\n\nA reader reads this guide.\n' },
 		],
+		violations: [
+			{
+				rule: 'prose',
+				path: 'guides/stray.md',
+				message:
+					"guide is the package's own, the map, a guide the directory index maps, or a catalog row",
+			},
+		],
+	},
+	{
+		label: 'accepts a top-level guide a directory-index row maps',
+		membership: 'top-level guides a directory-index row of the workspace map maps',
+		rule: 'prose',
+		files: [
+			{ path: POLICY_MANIFEST_FILE, content: PROSE_POLICY_MANIFEST },
+			{ path: POLICY_CATALOG_FILE, content: createPolicyCatalog(['other', 'sample']) },
+			{ path: 'README.md', content: '# Front page\n\nA reader arrives via this term.\n' },
+			{
+				path: 'guides/README.md',
+				content:
+					'# Map\n\n| Directory | Guide |\n| --- | --- |\n| `src/styles` | [`tokens.md`](tokens.md) |\n',
+			},
+			{ path: 'guides/tokens.md', content: '# Tokens\n\nA reader reads this guide.\n' },
+		],
+		directories: ['src/styles'],
+		violations: [
+			{
+				rule: 'prose',
+				path: 'README.md',
+				line: 3,
+				message: 'prose carries no banned term: via (through, by using)',
+			},
+		],
+	},
+	{
+		label:
+			'sweeps a guide linked in prose but mapped by no row, while a row-mapped guide is accounted for',
+		membership:
+			"top-level guides the map's prose links without a directory-index row, and top-level guides a directory-index row maps",
+		rule: 'prose',
+		files: [
+			{ path: POLICY_MANIFEST_FILE, content: PROSE_POLICY_MANIFEST },
+			{ path: 'README.md', content: '# Front page\n\nA reader arrives here.\n' },
+			{
+				path: 'guides/README.md',
+				content:
+					'# Map\n\n[`console.md`](console.md)\n\n| Directory | Guide |\n| --- | --- |\n| `src/styles` | [`tokens.md`](tokens.md) |\n',
+			},
+			{ path: 'guides/console.md', content: '# Console\n\nA reader reads this guide.\n' },
+			{ path: 'guides/tokens.md', content: '# Tokens\n\nA reader reads this guide.\n' },
+		],
+		directories: ['src/styles'],
+		violations: [
+			{
+				rule: 'prose',
+				path: 'guides/console.md',
+				message:
+					"guide is the package's own, the map, a guide the directory index maps, or a catalog row",
+			},
+		],
+	},
+	{
+		label: 'ignores a directory-index row written inside a fence',
+		membership: 'directory-index rows inside fenced blocks, which account for nothing',
+		rule: 'prose',
+		files: [
+			{ path: POLICY_MANIFEST_FILE, content: PROSE_POLICY_MANIFEST },
+			{ path: 'README.md', content: '# Front page\n\nA reader arrives here.\n' },
+			{
+				path: 'guides/README.md',
+				content: '# Map\n\n```md\n| `src/styles` | [`console.md`](console.md) |\n```\n',
+			},
+			{ path: 'guides/console.md', content: '# Console\n\nA reader reads this guide.\n' },
+		],
+		violations: [
+			{
+				rule: 'prose',
+				path: 'guides/console.md',
+				message:
+					"guide is the package's own, the map, a guide the directory index maps, or a catalog row",
+			},
+		],
+	},
+	{
+		label: 'accounts for a directory-index row inside an unclosed fence',
+		membership:
+			'directory-index rows inside an unclosed fence, which the fence pattern does not blank',
+		rule: 'prose',
+		files: [
+			{ path: POLICY_MANIFEST_FILE, content: PROSE_POLICY_MANIFEST },
+			{ path: 'README.md', content: '# Front page\n\nA reader arrives via this term.\n' },
+			{
+				path: 'guides/README.md',
+				content: '# Map\n\n```md\n| `src/styles` | [`console.md`](console.md) |\n',
+			},
+			{ path: 'guides/console.md', content: '# Console\n\nA reader reads this guide.\n' },
+		],
+		directories: ['src/styles'],
+		violations: [
+			{
+				rule: 'prose',
+				path: 'README.md',
+				line: 3,
+				message: 'prose carries no banned term: via (through, by using)',
+			},
+		],
+	},
+	{
+		label: 'accounts for a directory-index row inside a fence indented four or more spaces',
+		membership:
+			'directory-index rows inside a fence whose delimiter is indented four or more spaces, which the fence pattern does not blank',
+		rule: 'prose',
+		files: [
+			{ path: POLICY_MANIFEST_FILE, content: PROSE_POLICY_MANIFEST },
+			{ path: 'README.md', content: '# Front page\n\nA reader arrives via this term.\n' },
+			{
+				path: 'guides/README.md',
+				content: '# Map\n\n    ```md\n| `src/styles` | [`console.md`](console.md) |\n    ```\n',
+			},
+			{ path: 'guides/console.md', content: '# Console\n\nA reader reads this guide.\n' },
+		],
+		directories: ['src/styles'],
+		violations: [
+			{
+				rule: 'prose',
+				path: 'README.md',
+				line: 3,
+				message: 'prose carries no banned term: via (through, by using)',
+			},
+		],
+	},
+	{
+		label: 'reads a directory-index row whose link cell wraps its link text in a code span',
+		membership: 'directory-index rows whose link cell is not blanked by span stripping',
+		rule: 'prose',
+		files: [
+			{ path: POLICY_MANIFEST_FILE, content: PROSE_POLICY_MANIFEST },
+			{ path: 'README.md', content: '# Front page\n\nA reader arrives via this term.\n' },
+			{
+				path: 'guides/README.md',
+				content: '# Map\n\n| `src/styles` | [`console.md`](console.md) |\n',
+			},
+			{ path: 'guides/console.md', content: '# Console\n\nA reader reads this guide.\n' },
+		],
+		directories: ['src/styles'],
+		violations: [
+			{
+				rule: 'prose',
+				path: 'README.md',
+				line: 3,
+				message: 'prose carries no banned term: via (through, by using)',
+			},
+		],
 	},
 	{
 		label: 'accepts a banned term inside an installed package',
```

## New case reading and why it would have caught the earlier pattern

Item 3's test, `confines a row path to a relative cell and its link to the second cell`
(`tests/policy.test.ts`), previously wrote three rows that all linked `tokens.md`, so
`readPolicyIndex(scratch.path)` returning `['tokens']` was consistent with the reader correctly
refusing the two invalid rows AND with a defect that leaked either invalid row's link, because
every row named the same guide. It rewrites the fixture so each row names a distinct guide: the
leading-`/` row links `outside.md`, the three-cell row's unreachable third cell links `later.md`,
and only the valid `src/styles` row links `tokens.md`. The assertion stays `['tokens']`.

Reasoning against the pre-fix pattern (the function before this round's item 6 and item 8 changes,
which matched `POLICY_INDEX_ROW` once per line and read `link.match(POLICY_INDEX_LINK)` once): the
leading-`/` row still refuses the whole row at `POLICY_INDEX_ROW` (the path class excludes a
leading `/`), so it contributes nothing under either version. The three-cell row's captured `link`
group stops at the first unescaped `|`, so it captures the literal text `no guide`, which
`POLICY_INDEX_LINK` never matches, under either version — a genuine leak of that row would require
a change to the row-capture width, not this round's changes. The rewrite's actual value is
structural: it disambiguates the assertion so a future regression in either capture boundary is
visible immediately (`outside` or `later` would appear in the result) rather than being masked by
every row naming the same guide. The comment added beside the assertion states this explicitly.

Item 6 added a second, real new case, `counts a row only when its path resolves to an existing
directory`: a row naming `src/absent` (never created in the scratch) sits beside a row naming
`src/styles` (created via `scratch.write('src/styles/index.ts', '')`), and the assertion is exactly
`['tokens']`. Before item 6's implementation change (`resolvePolicyDirectory` gate in
`readPolicyIndex`), this case would have returned `['absent', 'tokens']` and failed.

Item 8 added `reads every link in a row link cell, not the first alone`: a single row's link cell
carries two links, `[\`tokens.md\`](tokens.md), [\`theme.md\`](theme.md)`, and the assertion is
`['tokens', 'theme']`. Before item 8's `matchAll` change, `readPolicyIndex` took only the first
`POLICY_INDEX_LINK` match per row and this case would have returned `['tokens']`, missing `theme`.

## Gate results

- `format:check` (after formatting owned files with `oxfmt`): exit 0, "All matched files use the
  correct format." on 228 files.
- `lint:check`: exit 0, no output.
- `check`: exit 0 (`tsc --noEmit --project tsconfig.json` then `check:src:core`,
  `check:src:server`, `check:src:bin`, no diagnostics).
- `test:policy`: exit 0, 125 passed (1 test file).
- `test:setup`: exit 0, 164 passed, 3 skipped (3 test files).
- `test:guides`: exit 0, 23 passed (1 test file).
- `test:config`: exit 0 process for the run, but 1 of 174 tests failed as the brief predicted:
  `root configuration > keeps the committed host inventory aligned with the vendored checkout
  bytes` reports "The committed host inventory is stale at tests/policy.test.ts,
  tests/setupPolicy.ts". `host.json` is off-limits to this unit; the Orchestrator rebuilds it.

## Deviations

None beyond the brief's own named deviation (the `test:config` host-inventory staleness, expected
because `host.json` is off-limits and the Orchestrator rebuilds it).

Six `PROSE_POLICY_CONTROLS` fixtures use a `| \`src/styles\` | ... |` directory-index row and none
previously created a real `src/styles` directory in their scratch workspace. Item 6's directory-
existence gate in `readPolicyIndex` would have made every one of those controls stop counting that
row, breaking the "accounted for" expectations several of them assert (no stray violation for the
row-mapped guide). This was not separately named in the brief's execution steps, so treated it as
in-scope mechanical follow-through of item 6's own acceptance criterion (no gate red after own fix):
added `directories: ['src/styles']` to the five controls whose expected outcome depends on the row
counting (`accepts a top-level guide a directory-index row maps`; the `sweeps a guide linked in
prose...` control; both fence-limit controls; the code-span link-cell control). The sixth
(`ignores a directory-index row written inside a fence`) needs no directory because its row is
blanked by the fence pattern regardless and was left unchanged. Also added real directories
(`src/beta`, `src/alpha`, `src/beta2`, `src/styles`) to the pre-existing direct `readPolicyIndex`
unit tests in `tests/policy.test.ts` for the same reason.

## Review evidence

`git diff -- tests/setupPolicy.ts tests/policy.test.ts` is reproduced above in full.
`git status --porcelain` at return:

```
 M .claude/rules/styles.md
 M guides/scaffold.md
 M host.json
 M tests/policy.test.ts
 M tests/setupPolicy.ts
```

This matches acceptance criterion 5 exactly.
