# J-SCROLLSPY round 3: rebuilds src/browser/Delegate.ts from main's side (the Alert and Tab
# landings) and folds this unit's construction scan into it as the private `#scan` method, so the
# delegate carries one path per member.
import subprocess

path = 'src/browser/Delegate.ts'
text = subprocess.run(['git', 'show', f'MERGE_HEAD:{path}'], capture_output=True, text=True,
                      encoding='utf-8', check=True).stdout


def rep(old, new):
    global text
    assert text.count(old) == 1, old
    text = text.replace(old, new)


rep("""	DelegateOptions,
	TabInterface,
	TabVocabulary,
} from './types.js'""", """	DelegateOptions,
	ScrollSpyInterface,
	TabInterface,
	TabVocabulary,
} from './types.js'""")
rep("""	COLLAPSE_SELECTORS,
	TAB_ATTRIBUTES,""", """	COLLAPSE_SELECTORS,
	SCROLL_SPY_ATTRIBUTES,
	SCROLL_SPY_CLASSES,
	SCROLL_SPY_SELECTORS,
	TAB_ATTRIBUTES,""")
rep("""} from './helpers.js'
import { Tab } from './Tab.js'""", """} from './helpers.js'
import { ScrollSpy } from './ScrollSpy.js'
import { Tab } from './Tab.js'""")
rep(""" * Activates data-attribute hosts through a root's delegated click and key listeners.""",
    """ * Activates data-attribute hosts through a root's delegated click and key listeners and a scan at construction.""")
rep(""" * Construction validates and copies each entity group, then installs its listeners. Importing the
 * browser barrel installs nothing.""", """ * Construction validates and copies each entity group, scans the root, then installs its listeners.
 * Importing the browser barrel installs nothing.""")
rep(""" * engine.
 *
 * Under nested roots,""", """ * engine.
 *
 * The scan runs once, before the listeners install: it acquires a scrollspy, constructed with the
 * scrollspy group, for every element inside the root the scrollspy group's `host` selector matches
 * and the `ScrollSpy.find` method returns no engine for, and it leaves a host inserted later alone.
 * A scanned host whose attributes its scrollspy refuses makes construction throw that refusal,
 * after the delegate destroys every engine the scan acquired.
 *
 * Under nested roots,""")
rep(""" * it destroys and releases every engine whose host the root no longer contains, in the reverse of
 * their acquisition.""", """ * it destroys and releases every engine whose host the root no longer contains, in the reverse of
 * their acquisition; a scanned host reinserted after that stays released.""")
rep("""	readonly #owned = new Set<ButtonInterface | CollapseInterface | AlertInterface | TabInterface>()""",
    """	readonly #owned = new Set<
		ButtonInterface | CollapseInterface | AlertInterface | TabInterface | ScrollSpyInterface
	>()""")
rep("""	 * @throws Thrown when a group value is not a class token, an attribute name, or a selector, as an `AppError` carrying the entity's `{ENTITY}_OPTION_INVALID` code.""",
    """	 * @throws Thrown when a group value is not a class token, an attribute name, or a selector, as an `AppError` carrying the entity's `{ENTITY}_OPTION_INVALID` code, or when a scrollspy the construction scan constructs refuses its host, as that scrollspy's `AppError`.""")
rep("""		this.#root = options?.root ?? document
		this.#root.addEventListener('click',""", """		this.#root = options?.root ?? document
		this.#scan(options?.scrollspy)
		this.#root.addEventListener('click',""")
rep("""	// Drops every engine destroyed directly, refuses a click""", """	// Acquires a scrollspy, constructed with the scrollspy group, for every element inside the root the
	// group's `host` selector matches and no scrollspy owns. Bootstrap constructs every scrollspy host
	// at the window's load event; the delegate scans its root once, at construction, and a refusal
	// destroys every engine the scan already acquired before it propagates.
	#scan(group: DelegateOptions['scrollspy']): void {
		const scrollspy = {
			classes: resolveVocabulary(
				'SCROLL_SPY_OPTION_INVALID',
				SCROLL_SPY_CLASSES,
				isClassToken,
				group?.classes,
			),
			attributes: resolveVocabulary(
				'SCROLL_SPY_OPTION_INVALID',
				SCROLL_SPY_ATTRIBUTES,
				isAttributeName,
				group?.attributes,
			),
			selectors: resolveVocabulary(
				'SCROLL_SPY_OPTION_INVALID',
				SCROLL_SPY_SELECTORS,
				isSelector,
				group?.selectors,
			),
		}
		try {
			for (const host of this.#root.querySelectorAll(scrollspy.selectors.host)) {
				if (!isInstance(host, HTMLElement)) continue
				if (ScrollSpy.find(host) === undefined) this.#acquire(new ScrollSpy(host, scrollspy))
			}
		} catch (error) {
			this.destroy()
			throw error
		}
	}

	// Drops every engine destroyed directly, refuses a click""")
rep("""	#acquire<TEngine extends ButtonInterface | CollapseInterface | AlertInterface | TabInterface>(
		engine: TEngine,
	): TEngine {""", """	#acquire<
		TEngine extends
			| ButtonInterface
			| CollapseInterface
			| AlertInterface
			| TabInterface
			| ScrollSpyInterface,
	>(engine: TEngine): TEngine {""")
rep("""				Alert.find(engine.host) !== engine &&
				Tab.find(engine.host) !== engine
			) {""", """				Alert.find(engine.host) !== engine &&
				Tab.find(engine.host) !== engine &&
				ScrollSpy.find(engine.host) !== engine
			) {""")
open(path, 'w', encoding='utf-8', newline='\n').write(text)
print(f'{path}: rebuilt')
