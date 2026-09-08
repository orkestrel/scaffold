"""Pin the titled fence's commented claims in the package's own executed section."""

import pathlib

CASE = """
	it('returns what the titled factory fence claims', () => {
		const gates = createLogicalDefinition('gates', 'Eligibility gates', [
			createRule(
				'licensed',
				[createAtom('licensed', 'equals', false)],
				createAtom('blocked', 'equals', true),
			),
		])
		const bare = createRuling('license', 'gates', 'licensed', 'restriction')
		const messaged = createRuling('license', 'gates', 'licensed', 'restriction', {
			message: 'A license is required',
		})
		const passes = [gates]
		const definition = createQualificationDefinition('standard', 'Standard eligibility', passes, {
			rulings: [messaged],
		})

		expect('message' in bare).toBe(false)
		expect(messaged.message).toBe('A license is required')
		expect('description' in definition).toBe(false)
		expect(definition.passes).not.toBe(passes)
		expect(guideText).toContain(
			"'message' in bare // false — an absent optional key is omitted, never written as undefined",
		)
		expect(guideText).toContain("messaged.message // 'A license is required'")
		expect(guideText).toContain("'description' in definition // false")
		expect(guideText).toContain(
			'definition.passes === passes // false — the factory copies what it is handed',
		)
	})
"""

path = pathlib.Path("tests/guides.test.ts")
text = path.read_text(encoding="utf8")
anchor = "\t\tqualifier.destroy()\n\t})\n})\n"
assert text.count(anchor) == 1, text.count(anchor)
path.write_text(text.replace(anchor, "\t\tqualifier.destroy()\n\t})\n" + CASE + "})\n"), encoding="utf8")
print("tests/guides.test.ts: fence case appended")
