# J-COLLAPSE round 3 fixes in Collapse.ts: D1 (the hide doors after the removal read the shown token
# absent, the trigger door takes both halves), D3 (the nesting scope), and D7 (the post-await read
# spelled with `during`, the prune comment read forward).
import pathlib

PATH = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/Collapse.ts')
text = PATH.read_text(encoding='utf-8')


def replace(old, new, count=1):
    global text
    if text.count(old) != count:
        raise SystemExit(f'expected {count}: {old[:90]!r} found {text.count(old)}')
    text = text.replace(old, new)


replace('\t\tif (!this.#writeTriggers(change, during, triggers, true)) return false\n',
        '\t\tif (!this.#writeTriggers(change, during, [], triggers, true)) return false\n')
replace('\t\tif (!this.#holds(change, [transition], [])) return false\n\t\tif (\n\t\t\t!this.#apply(change, [...completed, transition], [], () =>',
        '\t\tif (!this.#holds(change, during, [])) return false\n\t\tif (\n\t\t\t!this.#apply(change, [...completed, transition], [], () =>')
# hide: from the host-and-shown removal through the post-await read, the shown token must stay absent.
replace('\t\tif (!this.#apply(change, during, [], () => host.classList.remove(this.#classes.host, shown))) {',
        '\t\tif (\n\t\t\t!this.#apply(change, during, [shown], () => host.classList.remove(this.#classes.host, shown))\n\t\t) {')
replace('\t\tif (!this.#writeTriggers(change, during, collapsed, false)) return false\n'
        '\t\tif (!this.#apply(change, during, [], () => host.style.removeProperty(dimension))) return false\n'
        '\t\tawait settleAnimations(host, this.#controller.signal)\n'
        '\t\tif (!this.#holds(change, [transition], [])) return false\n',
        '\t\tif (!this.#writeTriggers(change, during, [shown], collapsed, false)) return false\n'
        '\t\tif (!this.#apply(change, during, [shown], () => host.style.removeProperty(dimension))) {\n'
        '\t\t\treturn false\n'
        '\t\t}\n'
        '\t\tawait settleAnimations(host, this.#controller.signal)\n'
        '\t\tif (!this.#holds(change, during, [shown])) return false\n')
replace("""		// Each write door reads the panel for its phase: the shown token before the transition token
		// is written, the transition token while the transition runs, and the completed token without""",
        """		// Each write door reads the panel for its phase: the shown token before the transition token
		// is written, the transition token without the shown token from the removal until the
		// transition settles, and the completed token without""")
replace("""	// Writes each trigger's `collapsed` token and `aria-expanded` value for the state the panel moves
	// to, reading after every write whether the call still holds its change with the panel carrying
	// the tokens of its phase.
	#writeTriggers(
		change: object,
		during: readonly string[],
		triggers: readonly HTMLElement[],
		expanded: boolean,
	): boolean {
		const { collapsed } = this.#classes
		for (const trigger of triggers) {
			if (!this.#apply(change, during, [], () => trigger.classList.toggle(collapsed, !expanded))) {
				return false
			}
			if (
				!this.#apply(change, during, [], () =>
					trigger.setAttribute('aria-expanded', String(expanded)),
				)
			) {""", """	// Writes each trigger's `collapsed` token and `aria-expanded` value for the state the panel moves
	// to, reading after every write whether the call still holds its change with the panel carrying
	// every token in `present` and none in `absent`.
	#writeTriggers(
		change: object,
		present: readonly string[],
		absent: readonly string[],
		triggers: readonly HTMLElement[],
		expanded: boolean,
	): boolean {
		const { collapsed } = this.#classes
		for (const trigger of triggers) {
			if (
				!this.#apply(change, present, absent, () => trigger.classList.toggle(collapsed, !expanded))
			) {
				return false
			}
			if (
				!this.#apply(change, present, absent, () =>
					trigger.setAttribute('aria-expanded', String(expanded)),
				)
			) {""")
replace("""	// Lists the open first-level siblings inside the parent: each carries the `host` and `shown`
	// tokens or the `transition` token, and sits inside no other panel carrying the `host` or
	// `transition` token.""", """	// Lists the open first-level siblings inside the parent: each carries the `host` and `shown`
	// tokens or the `transition` token, and sits inside no other panel within the parent carrying the
	// `host` or `transition` token.""")
replace("""	// Drops each owned collapse that was destroyed directly, and destroys and drops each one whose
	// panel left the document, so no owned collapse outlives its panel until this one is destroyed.""",
        """	// Keeps no owned collapse past its panel: each one whose panel left the document is destroyed and
	// dropped, and each one already destroyed directly is dropped.""")
PATH.write_text(text, encoding='utf-8', newline='\n')
print('ok')
