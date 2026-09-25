# Adds the motion-factor cases to the navbar and accordion style proofs.
anchor="\t\t// The offcanvas reset is a bare declaration the release gates on no condition.\n\t\texpect(collectMediaConditions(rules, '.navbar-expand .offcanvas')).toEqual([])\n\t})\n"
motion_after=("afterEach(async () => {\n\tawait releasePointer()\n\tawait releaseMedia()\n\tscene.clear()\n})","afterEach(async () => {\n\tawait releasePointer()\n\tawait releaseMedia()\n\tdocument.documentElement.style.removeProperty(TOKEN_NAMES.factor.motion)\n\tscene.clear()\n})")
p='tests/src/styles/components/navbar.test.ts'
s=open(p).read()
for a,b in [("\tcollectMediaConditions,\n\tscene,\n\tvisitBreakpoint,\n} from '../../../setupBrowser.js'","\tcollectMediaConditions,\n\tsampleTransition,\n\tscene,\n\tvisitBreakpoint,\n} from '../../../setupBrowser.js'"), motion_after]:
    assert a in s; s=s.replace(a,b,1)
case="""
	// The mutation this catches is the release's literal duration written where the motion factor
	// scales it: the reading is the ring transition the browser starts as the toggler takes focus,
	// at the resting, the doubled, and the zero factor. The doubled duration is read as a ratio to
	// the resting one, and a zero factor starts no transition, which a literal duration still would.
	it('runs the toggler ring over the release duration and curve at the resting motion factor, twice as long at a doubled factor, and not at all at a zero factor', () => {
		const samples = ['1', '2', '0'].map((factor) => {
			document.documentElement.style.setProperty(TOKEN_NAMES.factor.motion, factor)
			const host = scene.mount(
				'<nav class="navbar"><button class="navbar-toggler" type="button" aria-label="Show the harbor menu"><span class="navbar-toggler-icon"></span></button></nav>',
			)
			const toggler = requireValue(host.querySelector<HTMLElement>('.navbar-toggler'), 'No toggler')
			readStyle(toggler, 'box-shadow')
			toggler.focus()
			const sample = sampleTransition(toggler, 'box-shadow')
			scene.clear()
			return sample
		})
		const [resting, doubled, stopped] = samples
		const base = requireValue(resting, 'No transition at the resting factor')
		expect([base.duration, base.easing]).toEqual([150, 'ease-in-out'])
		const slowed = requireValue(doubled, 'No transition at the doubled factor')
		expect([slowed.duration / base.duration, slowed.easing]).toEqual([2, 'ease-in-out'])
		expect(stopped).toBeUndefined()
	})
"""
assert s.count(anchor)==1
s=s.replace(anchor,anchor+case,1)
open(p,'w').write(s)

p='tests/src/styles/components/accordion.test.ts'
s=open(p).read()
for a,b in [("import { collectLayer, collectMediaConditions, scene } from '../../../setupBrowser.js'","import {\n\tcollectLayer,\n\tcollectMediaConditions,\n\tsampleTransition,\n\tscene,\n} from '../../../setupBrowser.js'"), motion_after]:
    assert a in s; s=s.replace(a,b,1)
old="""		for (const selector of ['.accordion-button', '.accordion-button::after'])
			expect(collectMediaConditions(rules, selector)).toEqual([REDUCED_MOTION])
	})
"""
assert s.count(old)==1
case="""
	// The mutation this catches is the release's literal duration written where the motion factor
	// scales the button's own transition: the reading is each transition the browser starts as the
	// lone item's button takes the collapsed class, at the resting, the doubled, and the zero factor.
	// The lone item is the last one, so collapsing it rounds the button's bottom corners, and the
	// radius is read on one bottom corner, the longhand the browser runs on the release's `ease`
	// curve. The doubled durations are read as ratios to the resting ones, and a zero factor starts
	// no transition, which a literal duration still would.
	it('runs the button paint, line, and corner over the release durations and curves at the resting motion factor, twice as long at a doubled factor, and not at all at a zero factor', () => {
		const properties = ['color', 'background-color', 'box-shadow', 'border-bottom-left-radius']
		const readings = ['1', '2', '0'].map((factor) => {
			document.documentElement.style.setProperty(TOKEN_NAMES.factor.motion, factor)
			const host = scene.mount(
				'<div class="accordion"><div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button" type="button" aria-expanded="true" aria-controls="panel-customs">Customs</button></h2><div class="accordion-collapse collapse show" id="panel-customs"><div class="accordion-body">Declarations close at noon.</div></div></div></div>',
			)
			const button = requireValue(host.querySelector('.accordion-button'), 'No button')
			readStyle(button, 'color')
			button.classList.add('collapsed')
			const samples = properties.map((property) => sampleTransition(button, property))
			scene.clear()
			return samples
		})
		const [resting = [], doubled = [], stopped = []] = readings
		expect(resting.map((sample) => [sample?.duration, sample?.easing])).toEqual([
			[150, 'ease-in-out'],
			[150, 'ease-in-out'],
			[150, 'ease-in-out'],
			[150, 'ease'],
		])
		expect(
			doubled.map((sample, index) => [
				(sample?.duration ?? Number.NaN) / (resting[index]?.duration ?? Number.NaN),
				sample?.easing,
			]),
		).toEqual([
			[2, 'ease-in-out'],
			[2, 'ease-in-out'],
			[2, 'ease-in-out'],
			[2, 'ease'],
		])
		expect(stopped).toEqual(properties.map(() => undefined))
	})
"""
s=s.replace(old,old+case,1)
open(p,'w').write(s)
