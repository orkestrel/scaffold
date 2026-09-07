import pathlib

TAGLINE = """> The terminal side of a form: a key decoder, a presentation theme, the pure per-field reducers,
> the headless broker that parks a live form until somebody elsewhere answers it, the SSE bridge
> that carries a parked form to a machine with a keyboard, and the manager that routes parked
> forms between named endpoints."""

OPENING = """`@orkestrel/form` owns the document — the schema, the controls, the rules, the values, and the
settle-once `answer` promise — and this package declares none of it a second time. One contract
carries the rest: [`src/core`](../src/core) declares `TerminalInterface`, whose `ask(form)` returns
the settled `FormValues`, and the local TTY, the headless broker, and the SSE bridge each reach a
person over it. The server `Terminal` ([`src/server`](../src/server)) implements that contract
against a real TTY — raw-mode stdin, live in-place re-render, a `node:readline` fallback when
piped — and is the only impure part of the stack. `PromptFormInterface` and its per-control prompt
methods are gone: a form is one question however many fields it holds, so the contract needs `ask`
alone and this package holds no second form vocabulary."""

guide = pathlib.Path('guides/terminal.md')
text = guide.read_text()
start = text.index('> The terminal side of a form.')
end = text.index('\n\n## The blank line binds as absence')
text = text[:start] + TAGLINE + '\n\n' + OPENING + text[end:]
guide.write_text(text)

readme = pathlib.Path('README.md')
text = readme.read_text()
start = text.index('The terminal side of a form, for the `@orkestrel` line.')
end = text.index('\n\n## Install')
text = (
	text[:start]
	+ TAGLINE
	+ '\n\n'
	+ """`@orkestrel/form` owns the document — the schema, the controls, the rules,
the values, and the settle-once `answer` promise — and this package declares
none of it a second time. Part of the `@orkestrel` line, built beside
`@orkestrel/console` (the shared style engine), `@orkestrel/contract`,
`@orkestrel/emitter`, `@orkestrel/database`, and `@orkestrel/sse`."""
	+ text[end:]
)
readme.write_text(text)
print('tagline ok')
