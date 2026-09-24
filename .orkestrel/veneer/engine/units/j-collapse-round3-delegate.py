# J-COLLAPSE round 3, D2 in Delegate.ts: the same-host click refused before either route runs, and
# the class remark stating the refusal and the hand-off, rewrapped to 100 columns.
import pathlib, textwrap

PATH = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/Delegate.ts')
text = PATH.read_text(encoding='utf-8')


def replace(old, new):
    global text
    if text.count(old) != 1:
        raise SystemExit(f'expected one match: {old[:90]!r} found {text.count(old)}')
    text = text.replace(old, new)


start = text.index(' * @remarks\n') + len(' * @remarks\n')
end = text.index(' *\n * @example\n * ```ts\n * const delegate')
remark = (
    'Construction validates and copies each entity group, then installs the listener. Importing the '
    'browser barrel installs nothing. A click inside a host the button group\'s `trigger` selector '
    'matches drives the engine the `Button.find` method returns for that host, whoever constructed '
    'it, and acquires a fresh one, constructed with the button group, only when the host has none. A '
    'click inside a trigger the collapse group\'s `trigger` selector matches toggles each panel the '
    'trigger\'s target attribute or `href` fragment names, through the engine the `Collapse.find` '
    'method returns or one it acquires, constructed with the collapse group, and it leaves a panel '
    'outside the root alone; it prevents the click\'s default action only when the trigger or the '
    'clicked element is an anchor. A click whose button host is one of the panels its collapse '
    'trigger names inside the root, with no button and no collapse engine on that element, is '
    'refused before either route runs: nothing is marked, driven, constructed, or prevented. Under '
    'nested roots, a button host is driven once per click, and so is each panel, by the first live '
    'delegate whose root contains it to reach it. A listener that destroys a delegate during a click '
    'leaves every panel the click has not reached to the delegates still live. While the delegate '
    'owns an engine it observes its root, and at each observer delivery it destroys and releases '
    'every engine whose host the root no longer contains. A click that arrives while an engine\'s '
    'host is being restored finds no owner, because the engine releases its claim first, and '
    'acquires a fresh engine whose snapshot takes the values not yet written back. At each click and '
    'each delivery it also drops every engine that was destroyed directly. Destruction releases the '
    'listener and the observer and restores every host this delegate acquired.'
)
lines = textwrap.wrap(remark, width=100, initial_indent=' * ', subsequent_indent=' * ',
                      break_long_words=False, break_on_hyphens=False)
text = text[:start] + '\n'.join(lines) + '\n' + text[end:]

replace("""		if (!(event.target instanceof Element)) return
		this.#routeButton(event, event.target)
		this.#routeCollapse(event, event.target)
	}
""", """		if (!(event.target instanceof Element)) return
		if (this.#conflicts(event.target)) return
		this.#routeButton(event, event.target)
		this.#routeCollapse(event, event.target)
	}

	// Reports whether both routes would construct an engine on one element: the click's button host
	// is one of the panels its collapse trigger names inside the root, and neither the button nor the
	// collapse registry holds an engine for it.
	#conflicts(target: Element): boolean {
		const host = target.closest(this.#button.selectors.trigger)
		if (!instanceOf(HTMLElement)(host) || !this.#root.contains(host)) return false
		const trigger = target.closest(this.#collapse.selectors.trigger)
		if (!instanceOf(HTMLElement)(trigger) || !this.#root.contains(trigger)) return false
		return (
			readTargets(trigger, this.#collapse.attributes).includes(host) &&
			Button.find(host) === undefined &&
			Collapse.find(host) === undefined
		)
	}
""")
PATH.write_text(text, encoding='utf-8', newline='\n')
print('ok')
