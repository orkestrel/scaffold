# Grok lane RECON-SRC — the engine sources against the coding contract's mechanical rules (read-only)

You are the Cursor Grok lane in ask mode, holding a mechanical conformance job. Read only; edit nothing; make no decision or recommendation. Return evidence with `file:line` pointers and no raw file dumps.

**Workspace.** The working directory is `C:/Users/mikes/WebstormProjects`. The subject is `veneer/src/browser/**` and `veneer/src/core/**`. It is Veneer `origin/main` `0865c67` checked out in `veneer/`, which no unit writes. Never read `veneer/tmp/**`.

**Law.** Read these first:
- `scaffold/AGENTS.md` § Non-negotiable rules and § Design laws;
- `scaffold/.claude/rules/names.md`;
- `scaffold/.claude/rules/typescript.md`;
- `scaffold/.claude/rules/architecture.md`.

**Find and list, with `file:line`, every occurrence of the following.**
1. A type assertion `as T`, excluding `as const`. A non-null assertion `!`, meaning a postfix `!` on an expression, not `!==` or a negation.
2. `any`, `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`, or `eslint-disable`.
3. `public`, `protected`, or `private` on a class member, a parameter property, or a default export.
4. A function declared inside another function or method body, other than an anonymous callback passed directly as an argument or an anonymous function returned directly.
5. A type, interface, constant, helper, validator, or error declared in a file other than its centralized file (`types.ts`, `constants.ts`, `helpers.ts`, `validators.ts`, and the like, per `architecture.md`). Also any implementation file holding more than one class.
6. A sentinel for absence (`'none'`, `'unset'`, `'unknown'`, `''`, or `-1`) used as a value in a type, or a discriminant named `kind` or `type`.
7. An interface property, method, option key, or event name in `types.ts` that is not a single word. Exclude names an external format fixes, such as ARIA attribute strings and Bootstrap event names.

**Return exactly:**
- `Question`
- `Evidence`: per item 1 to 7, the occurrences with `file:line`, or "none found" with the search you used
- `Distillate`
- `Unknowns`: including any item you could not search exhaustively, and why
- `Journal`
- `Deviation`
