**Carrier source review: PASS.**

[commit-next-operator.sh](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/commit-next-operator.sh) matches the bounded specification:

- Requires canonical Scaffold on main, an empty index and existing operator files.
- Fetches origin, checks ancestry and rejects whitespace errors.
- Stages only the campaign record, `publish.txt` and `prompt.txt`.
- Uses the required commit identity and trailers.
- Pushes non-forcing to the specified refs, then requires clean Scaffold status and prints refs.

It performs no package mutation, authentication or upload. Root remains responsible for completed package closures and preserving `publish.txt` before execution.

The actual `prompt.txt` review remains pending root’s readiness notice. No carrier body was executed.

**VERDICT: PASS — carrier source only.**
