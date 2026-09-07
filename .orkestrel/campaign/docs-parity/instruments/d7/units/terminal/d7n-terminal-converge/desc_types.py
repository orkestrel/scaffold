import sys
sys.path.insert(0, '/home/user/fleet/terminal/tmp/d7n-terminal-converge')
from setdesc import set_description as sd

F = 'src/core/types.ts'

sd(F, 'PromptRole', "Names one styling slot a rendered field paints through — the semantic axis of a {@link PromptTheme}. A role says what a fragment means; the theme decides what that meaning looks like, so a consumer re-maps styled output by naming roles rather than reimplementing a renderer.")
sd(F, 'PromptTheme', "Represents a resolved presentation — the glyph for every {@link PromptIcon} and the console {@link Style} for every {@link PromptRole}. Plain JSON data with no functions, so it crosses the wire with the form it decorates. Built by {@link import('./helpers.js').createPromptTheme}.")
sd(F, 'PromptThemeOptions', "Represents the partial {@link PromptTheme} an option bag carries — every icon and every role is optional, and {@link import('./helpers.js').createPromptTheme} merges what is supplied over {@link import('./constants.js').DEFAULT_PROMPT_THEME} leaf by leaf. Supplying one icon or one role leaves every other slot at its default.")
sd(F, 'SelectState', "Represents the immutable state a select field's reducer carries — the choices the list offers and the index the cursor sits on.")
sd(F, 'PromptStep', "Represents the result of one reducer step — the next `state`, the rendered `view`, the `status`, and, on `submit` alone, the candidate `value`. The whole contract between a pure reducer and the impure driver: the driver applies the next `state`, writes the `view`, and reads `value` on `submit`.")
sd(F, 'TerminalInterface', "Declares the contract for asking a form of a human at a keyboard — `ask` and nothing beside it, because a form is one question however many fields it holds. The server `Terminal` implements it against a real TTY; a {@link PromptClientInterface} holds one to answer forms parked elsewhere.")
sd(F, 'PendingFormStatus', "Names the lifecycle status of a parked {@link PendingForm} — where the ticket stands, which is not where the form stands. A ticket is `pending` until somebody answers it; the form it carries has its own status, and the two are separate facts about separate entities.")
sd(F, 'PendingForm', "Represents one form parked by the broker — an id-keyed, wire-safe record of a live form awaiting a remote answer. The value a `pending` listener receives and the broker serializes over SSE to a {@link PromptClientInterface}.")
sd(F, 'AnswerError', "Explains why {@link PromptInterface.answer} refused — `unknown` for an id no form is parked under, `rejected` for values the authoritative form itself refused, carrying the `FieldError` list it reported. Names its axis with `reason`.")
sd(F, 'PromptInterface', "Declares the headless form broker — parks a live form until somebody elsewhere answers it. The headless arm of the local-TTY, headless, and remote trio: there is no terminal here, so a transport forwards each `pending` record to whoever can answer, and {@link answer} drives the parked form to settlement.")
sd(F, 'PromptClientInterface', "Declares the SSE form bridge — the client-side counterpart to {@link PromptInterface}. It receives serialized {@link PendingForm} records from a remote broker, rebuilds each schema locally, drives it through a {@link TerminalInterface}, and POSTs the answer back, so a human at this machine answers forms a broker parked elsewhere.")
sd(F, 'TerminalManagerEventMap', "Declares the manager's event map — the name-attributed re-emission of every mounted broker's events, so a caller subscribes once for every endpoint instead of once per broker.")
sd(F, 'TerminalManagerInterface', "Declares a registry of named {@link PromptInterface} brokers, one per endpoint, so several parties (agents, tools, humans) can ask forms of each other by name, attributed with a `from` → `to` edge on every parked record.")
sd(F, 'TerminalSnapshot', "Represents one endpoint's persisted config snapshot — `id` is the endpoint name and `timeout` its configured default. Parked forms are process-bound and are never resurrected, so `open` always restores an empty broker.")
print('types ok')
