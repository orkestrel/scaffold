# J-COLLAPSE round 2, C2, C8, C9 on Delegate.ts: the collapse mark on each driven panel after the
# containment check, the CollapseVocabulary field, and the delegate-prose hunk's summary.
import pathlib

PATH = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/Delegate.ts')
text = PATH.read_text(encoding='utf-8')


def replace(old, new):
    global text
    if text.count(old) != 1:
        raise SystemExit(f'expected one match: {old[:90]!r} found {text.count(old)}')
    text = text.replace(old, new)


replace("""	ButtonVocabulary,
	CollapseAttributeMap,
	CollapseClassMap,
	CollapseInterface,
	CollapseSelectorMap,
""", """	ButtonVocabulary,
	CollapseInterface,
	CollapseVocabulary,
""")
replace("""	readonly #collapse: {
		readonly classes: CollapseClassMap
		readonly attributes: CollapseAttributeMap
		readonly selectors: CollapseSelectorMap
	}
""", """	readonly #collapse: CollapseVocabulary
""")
replace(" * Activates data-attribute button hosts through a root's delegated click listener.",
        " * Activates data-attribute hosts through a root's delegated click listener.")
replace(""" * outside the root alone; it prevents the click's default action only when the trigger or the
 * clicked element is an anchor. A host under nested roots is driven once per click for each entity
 * whose selector matches, and a listener that destroys the delegate during a click leaves every
 * panel the click has not reached alone. While""", """ * outside the root alone; it prevents the click's default action only when the trigger or the
 * clicked element is an anchor. Under nested roots, a button host is driven once per click, and so
 * is each panel, by whichever delegate whose root contains it hears the click first; a panel one
 * delegate leaves alone is left for another. A listener that destroys the delegate during a click
 * leaves every panel the click has not reached to the delegates still live. While""")
replace("""	// Routes a click inside a collapse trigger to the collapse engine of each panel it names inside
	// the root, preventing the default action of an anchor as Bootstrap's data API does. A panel
	// outside the root is left alone, because the delegate releases every engine whose host the root
	// does not contain.
	#routeCollapse(event: Event, target: Element): void {
		const trigger = target.closest(this.#collapse.selectors.trigger)
		if (!instanceOf(HTMLElement)(trigger) || !this.#root.contains(trigger)) return
		if (!this.#mark(event, Collapse, trigger)) return
		if (target instanceof HTMLAnchorElement || trigger instanceof HTMLAnchorElement) {
			event.preventDefault()
		}
		for (const panel of readTargets(trigger, this.#collapse.attributes)) {
			// A listener to the button's event or to one panel's event can destroy this delegate, which
			// then drives nothing more.
			if (this.#controller.signal.aborted) return
			if (!this.#root.contains(panel)) continue
			const engine""", """	// Routes a click inside a collapse trigger to the collapse engine of each panel it names inside
	// the root, preventing the default action of an anchor as Bootstrap's data API does. A panel
	// outside the root is left alone and unmarked, because the delegate releases every engine whose
	// host the root does not contain, so a delegate whose root contains it drives it.
	#routeCollapse(event: Event, target: Element): void {
		const trigger = target.closest(this.#collapse.selectors.trigger)
		if (!instanceOf(HTMLElement)(trigger) || !this.#root.contains(trigger)) return
		if (target instanceof HTMLAnchorElement || trigger instanceof HTMLAnchorElement) {
			event.preventDefault()
		}
		for (const panel of readTargets(trigger, this.#collapse.attributes)) {
			// A listener to the button's event or to one panel's event can destroy this delegate, which
			// then marks and drives nothing more.
			if (this.#controller.signal.aborted) return
			if (!this.#root.contains(panel)) continue
			if (!this.#mark(event, Collapse, panel)) continue
			const engine""")
PATH.write_text(text, encoding='utf-8', newline='\n')
print('ok')
