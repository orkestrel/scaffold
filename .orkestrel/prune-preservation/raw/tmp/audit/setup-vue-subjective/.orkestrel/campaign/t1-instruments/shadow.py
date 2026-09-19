import io

edits = {
	'src/browser/helpers.ts': [
		(""" * It measures geometry, which is what separates it from {@link isRendered}. A control clipped to a
 * zero-size rectangle is announced and is not clickable, so `isRendered` accepts it and this
 * refuses it. Nothing here asks about the viewport: `resolveAccessible` scrolls a wholly
 * off-viewport target into view and measures that separately with {@link isOutsideViewport}.""",
		 """ * It measures geometry, which is what separates it from {@link isRendered}. A control clipped to a
 * zero-size rectangle is announced and is not clickable, so `isRendered` accepts it and this
 * refuses it. Nothing here asks about the viewport: `resolveAccessible` scrolls a wholly
 * off-viewport target into view and measures that separately with {@link isOutsideViewport}.
 *
 * Inside a shadow tree it answers for the element's own facts, in an open root and a closed one
 * alike: the box, the focus order, `:disabled`, and `aria-disabled` are all the element's. The
 * `[inert]` ancestor is the one read that stops at the boundary, because `closest` never leaves the
 * element's own tree, so a host marked `[inert]` is invisible here. What the flat tree decides still
 * reaches the subject — a host the document does not lay out takes the element off the page and this
 * refuses it. Ask the host separately where an ancestor attribute is the subject.""" ),
		(""" * The last two are asked about the element's ancestors as well as itself, which reading a computed
 * `display` cannot do: the computed value of a child of a `display: none` container is the child's
 * own, so a control inside a closed drawer reports itself as laid out. `checkVisibility` answers
 * for the box tree, and `visibility` inherits, so between them an ancestor cannot hide a control
 * from a reader and leave it standing in a description.""",
		 """ * The last two are asked about the element's ancestors as well as itself, which reading a computed
 * `display` cannot do: the computed value of a child of a `display: none` container is the child's
 * own, so a control inside a closed drawer reports itself as laid out. `checkVisibility` answers
 * for the box tree, and `visibility` inherits, so between them an ancestor cannot hide a control
 * from a reader and leave it standing in a description.
 *
 * Inside a shadow tree it answers for the element's own facts, in an open root and a closed one
 * alike. The `aria-hidden` ancestor is the one read that stops at the boundary, because `closest`
 * never leaves the element's own tree, so a host marked `aria-hidden="true"` is invisible here and
 * this reports `true` for a subject a reader is never told about. `checkVisibility` and the computed
 * `visibility` read the flat tree, so a host the document does not lay out still takes the element
 * off the page. Ask the host separately where an ancestor attribute is the subject.""" ),
	],
	'guides/test.md': [
		("""| A painted-population predicate — `isPainted`""",
		 """| A stalled-read store                                                                             | Refused | A store whose reads hang is not expressible against the interface a consumer codes to: `Storage` is synchronous, so `getItem` either answers or throws and there is no point at which a caller awaits it. A test that needs a hanging read needs an asynchronous surface, which is a different subject from the Web Storage one `createStorage` stands in for.                                                                                                                                                                                                                                                                                                                                                                                                                       |\n"""
		 """| A painted-population predicate — `isPainted`"""),
	],
}

for path, pairs in edits.items():
	text = io.open(path, encoding='utf-8').read()
	for old, new in pairs:
		assert old in text, (path, old[:70])
		assert text.count(old) == 1, ('ambiguous', path, old[:70])
		text = text.replace(old, new, 1)
	io.open(path, 'w', encoding='utf-8', newline='\n').write(text)
print('shadow ok')
