import sys
sys.path.insert(0, 'tmp/d7n-form-converge')
from edit import apply

TAGLINE = """> The environment-agnostic form document: a `FormSchema` stating what is asked, a `Form` holding
> the answers given against it, declarative `FieldRule` data stating what those answers must
> satisfy, and one submit that settles the form exactly once."""

guide_old = """> The environment-agnostic form document. A `FormSchema` states what is asked, a `Form` holds the
> answers given against it, declarative `FieldRule` data states what those answers must satisfy, and
> one submit settles the form exactly once. Nothing here renders, reads a keyboard, or opens a
> socket.
>
> **A terminal prompt and a browser form are the same abstraction.** Both ask a person a set of
> questions, hold partial answers, check them against rules, and finish once. What differs is the
> host, and each host contributes the one part it owns. Parking is the server environment's
> contribution: `answer` is a form whose result nobody has resolved yet, so a server can hand the
> document out, wait, and receive the answers back through the same promise a local caller awaits.
> Rendering is the browser's contribution, and it lives in the browser, not here. This package ships
> the document both hosts share.
>
> The core is pure and total. Every guard returns `false` off-shape rather than throwing, every
> parser returns `undefined` on refusal, and every value the form hands back is a frozen owned copy.
> Form-owned refusals raise `FormError`, and each one names a caller mistake. A custom validator's
> own throw escapes the mutation call unchanged."""

guide_new = TAGLINE + """

Nothing here renders, reads a keyboard, or opens a socket. **A terminal prompt and a browser form
are the same abstraction.** Both ask a person a set of questions, hold partial answers, check them
against rules, and finish once. What differs is the host, and each host contributes the one part it
owns. Parking is the server environment's contribution: `answer` is a form whose result nobody has
resolved yet, so a server can hand the document out, wait, and receive the answers back through the
same promise a local caller awaits. Rendering is the browser's contribution, and it lives in the
browser, not here. This package ships the document both hosts share.

The core is pure and total. Every guard returns `false` off-shape rather than throwing, every parser
returns `undefined` on refusal, and every value the form hands back is a frozen owned copy.
Form-owned refusals raise `FormError`, and each one names a caller mistake. A custom validator's own
throw escapes the mutation call unchanged."""

apply('guides/form.md', [(guide_old, guide_new)])

readme_old = """The environment-agnostic form document for the `@orkestrel` line — a schema of field controls, the
answers given against it, declarative validation carried as data, and a submit that settles exactly
once. A terminal prompt and a browser form ask the same thing in different places, so this package
ships what they share and neither renders nor reads input itself. Its `answer` promise is the
parking seam a server needs: hand the document out, wait, receive the answers back. A live form can
take a field out and put it back with `disable` and `enable`, and exported budgets bound what one
schema and its answers may retain, so a document that arrives from a wire costs a known maximum
before anything decides to trust it.
Built on `@orkestrel/contract` and `@orkestrel/emitter`."""

readme_new = TAGLINE + """

A terminal prompt and a browser form ask the same thing in different places, so this package ships
what they share and neither renders nor reads input itself. Its `answer` promise is the parking seam
a server needs: hand the document out, wait, receive the answers back. A live form can take a field
out and put it back with `disable` and `enable`, and exported budgets bound what one schema and its
answers may retain, so a document that arrives from a wire costs a known maximum before anything
decides to trust it. Built on `@orkestrel/contract` and `@orkestrel/emitter`, and part of the
`@orkestrel` line."""

apply('README.md', [(readme_old, readme_new)])
