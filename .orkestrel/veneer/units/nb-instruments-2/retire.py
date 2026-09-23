# Builds the retirement state in a copy. With `simulate` it removes the rows ACCORDION's own patch
# deletes and adds the accordion variables to the component asset list (the simulated landing, the
# retirement patch's base). With `retire` it retires the emptied map, its walk, and the undeclared-key
# case, and writes the theme proof's final asset case. Carried from round 1 unchanged in its edits.
import sys, os
root = sys.argv[1]
step = sys.argv[2]
simulate = step == 'simulate'
def edit(path, old, new):
	full = os.path.join(root, path)
	s = open(full).read()
	assert s.count(old) == 1, (path, old[:80], s.count(old))
	open(full, 'w').write(s.replace(old, new))
if simulate:
	edit('src/styles/_tokens.scss', "\t'accordion-icon': '--bs-accordion-btn-icon',\n\t'accordion-active-icon': '--bs-accordion-btn-active-icon',\n", '')
	edit('tests/setupStyles.ts', "\t'--bs-navbar-toggler-icon-bg',\n])", "\t'--bs-navbar-toggler-icon-bg',\n\t'--bs-accordion-btn-icon',\n\t'--bs-accordion-btn-active-icon',\n])")
if simulate:
	sys.exit(0)
assert step == 'retire', step
tokens = os.path.join(root, 'src/styles/_tokens.scss')
s = open(tokens).read()
start = s.index("// The Bootstrap variable each image-valued dark entry is declared as, for the components that have")
end = s.index(") !default;\n", start) + len(") !default;\n\n")
open(tokens, 'w').write(s[:start] + s[end:])
edit('src/styles/_theme.scss', "@use 'sass:map';\n", '')
edit('src/styles/_theme.scss', """		@include theme-tokens(tokens.$roles, tokens.$aliased, tokens.$dark);
		// Bootstrap declares each of these image-valued variables on its own component rules in dark
		// alone, so the light scope declares none of them and `tokens.$assets` names where each dark
		// value lands.
		@each $key, $name in tokens.$assets {
			@if not map.has-key(tokens.$dark, $key) {
				@error 'tokens.$assets names #{$key}, which tokens.$dark does not declare.';
			}
			#{$name}: #{map.get(tokens.$dark, $key)};
		}
	}""", """		@include theme-tokens(tokens.$roles, tokens.$aliased, tokens.$dark);
	}""")
edit('tests/setupStyles.test.ts', """	it('refuses an asset key the dark map does not declare, and declares the alias for one it does', () => {
		const absent = "@use 'tokens' with ($assets: ('probe-absent': '--vn-probe'));\\n@use 'theme';\\n"
		const present =
			"@use 'tokens' with ($assets: ('select-indicator': '--vn-probe'));\\n@use 'theme';\\n"
		expect(() => compileString(absent, { loadPaths: ['src/styles'] })).toThrow(/probe-absent/u)
		expect(compileString(present, { loadPaths: ['src/styles'] }).css).toContain(
			'--vn-probe: url("data:image/svg+xml,',
		)
	})
""", '')
theme = os.path.join(root, 'tests/src/styles/theme.test.ts')
s = open(theme).read()
start = s.index("\tit(`carries the unlanded accordion's dark icons")
end = s.index("\t})\n", start) + len("\t})\n")
new = """	it("declares no component's image in the dark scope and leaves each one to its component's own dark rule", () => {
		const specimen = requireValue(scene.mount('<div></div>').firstElementChild, 'No asset specimen')
		// Every component whose image Bootstrap retunes in dark alone has landed its own dark rule, so
		// a plain element reads none of those images in either mode.
		expect(COMPONENT_DARK_ASSETS).toEqual(
			expect.arrayContaining([
				'--bs-navbar-toggler-icon-bg',
				'--bs-accordion-btn-icon',
				'--bs-accordion-btn-active-icon',
			]),
		)
		for (const name of COMPONENT_DARK_ASSETS) expect(readStyle(specimen, name)).toBe('')
		document.documentElement.setAttribute('data-bs-theme', 'dark')
		for (const name of COMPONENT_DARK_ASSETS) expect(readStyle(specimen, name)).toBe('')
	})
"""
open(theme, 'w').write(s[:start] + new + s[end:])
