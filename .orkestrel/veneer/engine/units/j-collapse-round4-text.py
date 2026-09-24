# J-COLLAPSE round 4 text edits: F3 (§ Delegation's refusal and restoration sentences, the #activate
# comment), F4 (the parseElement sentence), and F6 (the two wraps, words unchanged).
import pathlib, textwrap

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse')


def edit(path, pairs):
    file = ROOT / path
    text = file.read_text(encoding='utf-8')
    for old, new in pairs:
        if text.count(old) != 1:
            raise SystemExit(f'{path}: expected one match: {old[:90]!r} found {text.count(old)}')
        text = text.replace(old, new)
    file.write_text(text, encoding='utf-8', newline='\n')


def rewrap_paragraph(path, first_words):
    file = ROOT / path
    text = file.read_text(encoding='utf-8')
    start = text.index(first_words)
    end = text.index('\n\n', start)
    words = ' '.join(line.strip() for line in text[start:end].split('\n'))
    wrapped = textwrap.wrap(words, width=100, break_long_words=False, break_on_hyphens=False)
    file.write_text(text[:start] + '\n'.join(wrapped) + text[end:], encoding='utf-8', newline='\n')


GUIDE = 'guides/veneer.md'
edit(GUIDE, [
    ("""default action, as Bootstrap's data API does. The `collapse` option carries the collapse's groups
the same way, and § Components states its route under Collapse. A host under nested delegate""",
     """default action, as Bootstrap's data API does. The `collapse` option carries the collapse's groups
the same way, and § Components states its route under Collapse. A click whose button host is one of
the panels its collapse trigger names inside the root is refused when neither engine exists there,
as § Components states under Collapse. A host under nested delegate"""),
    ("""reaction sends, finds no owner and acquires a fresh engine at once, in the first delegate to hear
it, and that engine's snapshot takes""",
     """reaction sends, finds no owner, and the first live delegate whose root contains the host to reach
it acquires a fresh engine at once; that engine's snapshot takes"""),
])
rewrap_paragraph(GUIDE, 'The `Delegate` class is the engine\'s only data API.')
rewrap_paragraph(GUIDE, 'While the delegate owns an engine it observes its root, and at the observer delivery')
rewrap_paragraph(GUIDE, 'A call reads the panel at each of its doors for the phase it is in.')

edit('src/browser/Delegate.ts', [
    ("""	// Drops every engine destroyed directly, then routes a click through the button route and the
	// collapse route, each of which drives its engines only when its trigger selector matches.""",
     """	// Drops every engine destroyed directly, refuses a click that would have the button route and the
	// collapse route each construct an engine on one element, and otherwise routes it through both,
	// each of which drives its engines only when its trigger selector matches."""),
])

edit('src/browser/parsers.ts', [
    (""" * caller. An invalid selector returns undefined, where `getElement` throws.""",
     """ * caller. Where the selector as written is invalid, this reader returns undefined; `getElement`
 * returns null for an empty string and throws for any other selector its escaping leaves invalid."""),
])

edit('src/browser/Collapse.ts', [
    (""" * removes it, and at completion the panel must carry the state the call completes to. A
 * call that finds the collapse destroyed, a later call started, or the panel otherwise stops,
 * writing and dispatching nothing more, and resolves `false`. An aborted `signal` destroys the
 * collapse.""",
     """ * removes it, and at completion the panel must carry the state the call completes to. A call that
 * finds the collapse destroyed, a later call started, or the panel otherwise stops, writing and
 * dispatching nothing more, and resolves `false`. An aborted `signal` destroys the collapse."""),
])
print('ok')
