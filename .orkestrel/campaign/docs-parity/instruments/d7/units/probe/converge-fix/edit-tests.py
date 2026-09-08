import pathlib, sys

p = pathlib.Path('tests/guides.test.ts')
t = p.read_text()

def sub(old, new):
	global t
	if t.count(old) != 1:
		sys.exit(f'found {t.count(old)}\n---\n{old}\n---')
	t = t.replace(old, new)

# --- P7: each row names the contract the class declares first, then the ones it inherits ---
sub("""	['TypeStage', ['StageInterface', 'TypeStageInterface']],
	['LintStage', ['StageInterface']],
""",
"""	['TypeStage', ['TypeStageInterface', 'StageInterface']],
	['LintStage', ['LintStageInterface', 'StageInterface']],
""")

# --- P6: the README's copy of the flagship claim joins the comparison ---
sub("""	it('states the same claim in the guide, the contract, and this proof', () => {
		const transcribed = extractLiteral(
			readWorkspaceText('tests/guides.test.ts'),
			`${OPENING.replace('claim', 'CLAIM')}`,
		)
		expect(transcribed).not.toBe('')
		const documented = extractLiteral(GUIDE, OPENING)
		const contract = extractLiteral(extractComment(CORE_TYPES, 'Claim'), OPENING)
		expect(documented).toBe(contract)
		expect(documented).toBe(transcribed.replace('const CLAIM: Claim = {', OPENING))
	})
""",
"""	it('states the same claim in the guide, the contract, the README, and this proof', () => {
		const transcribed = extractLiteral(
			readWorkspaceText('tests/guides.test.ts'),
			`${OPENING.replace('claim', 'CLAIM')}`,
		)
		expect(transcribed).not.toBe('')
		const documented = extractLiteral(GUIDE, OPENING)
		const contract = extractLiteral(extractComment(CORE_TYPES, 'Claim'), OPENING)
		const pitched = extractLiteral(readWorkspaceText('README.md'), OPENING)
		expect(documented).toBe(contract)
		expect(documented).toBe(pitched)
		expect(documented).toBe(transcribed.replace('const CLAIM: Claim = {', OPENING))
	})
""")

p.write_text(t)
print('tests/guides.test.ts: edited')
