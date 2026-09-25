p='/home/user/veneer-lad/tests/setupServer.test.ts'
s=open(p).read()
def rep(old,new):
    global s
    assert s.count(old)==1,old
    s=s.replace(old,new)
rep("""		expect(matchShippedKey('btn-tertiary', ['btn', 'btn-close'])).toBe('btn')
		expect(matchShippedKey('container', ['btn'])).toBeUndefined()
	})
""","""		expect(matchShippedKey('btn-tertiary', ['btn', 'btn-close'])).toBe('btn')
		expect(matchShippedKey('container', ['btn'])).toBeUndefined()
	})

	it('reads the classes an :is() or a :where() argument writes as the selector\\'s own, and none a :not() or a :has() argument writes', () => {
		expect(collectSubjectClasses(':where(button.nav-link):not(.disabled)')).toEqual(['nav-link'])
		expect(collectSubjectClasses(':is(.alpha, .beta) > .gamma')).toEqual(['alpha', 'beta', 'gamma'])
		expect(collectSubjectClasses(':WHERE(.upper)')).toEqual(['upper'])
		expect(collectSubjectClasses(':where(:is(.nested))')).toEqual(['nested'])
		expect(collectSubjectClasses(':where(:not(.hidden)).shown')).toEqual(['shown'])
		expect(collectSubjectClasses(':not(:where(.hidden))')).toEqual([])
		expect(collectSubjectClasses('.card:has(.card-img)')).toEqual(['card'])
		expect(collectSubjectClasses('.item:nth-child(2 of .row)')).toEqual(['item'])
		expect(collectSubjectClasses(':where([title=".quoted"]) .plain')).toEqual(['plain'])
		// The selector's own classes read as the older reader reads them, which keeps its contract.
		expect(collectSubjectClasses('.btn-check[title=".x"] + .btn:not(.btn-lg)')).toEqual(
			collectSelectorClasses('.btn-check[title=".x"] + .btn:not(.btn-lg)'),
		)
		expect(collectSelectorClasses(':where(button.nav-link)')).toEqual([])
		// Attribution reads through the argument, so a zero-specificity rule places where its class does.
		const recording = indexRecordingKeys(LEDGER_INVENTORY)
		expect(
			attributeSelector(':where(button.btn-tertiary)', 'components', recording, LEDGER_SHIPPED),
		).toBe('btn')
		expect(
			attributeSelector(':not(.btn-tertiary)', 'components', recording, LEDGER_SHIPPED),
		).toBeUndefined()
	})
""")
rep("""				[{ ...owner, component: 'btn', name: '.caption-top' }],
			).unattributed,
		).toEqual(['components | .caption-top | —'])
	})""","""				[{ ...owner, component: 'btn', name: '.caption-top' }],
			).unattributed,
		).toEqual(['components | .caption-top | —'])
		// A layer that answers to a withheld component keeps its rule from every row: the row that
		// owns the rule in the components layer owns nothing in the elements layer while the element
		// component is withheld.
		const layered = '@layer elements { .audit-unrecorded { color: red } }'
		expect(
			collectLedger(layered.replace('elements', 'components'), LEDGER_INVENTORY, ['btn', 'table'], [
				owner,
			]).unattributed,
		).toEqual([])
		expect(
			collectLedger(layered, LEDGER_INVENTORY, ['btn', 'table'], [owner]).unattributed,
		).toEqual(['elements | .audit-unrecorded | —'])
	})""")
rep("""	it('reports an addition whose recorded value differs from the emitted one, both unrecorded and stale', () => {""","""	it('names one custom property declared at two selectors once at each selector', () => {
		expect(
			collectLedger(
				'@layer components { .btn { --vn-shared: 1px } .btn-tertiary { --vn-shared: 1px } }',
				LEDGER_INVENTORY,
				LEDGER_SHIPPED,
			).additions.map(describeAddition),
		).toEqual([
			'btn | .btn { --vn-shared } | — | property | 1px',
			'btn | .btn-tertiary | — | selector | —',
			'btn | .btn-tertiary { --vn-shared } | — | property | 1px',
		])
	})

	it('reports an addition whose recorded value differs from the emitted one, both unrecorded and stale', () => {""")
rep("""	collectSharedNames,
	collectShippedComponents,""","""	collectSharedNames,
	collectShippedComponents,
	collectSubjectClasses,""")
rep("""			'collectShippedComponents',
			'collectUnattributed',""","""			'collectShippedComponents',
			'collectSubjectClasses',
			'collectUnattributed',""")
open(p,'w').write(s)
