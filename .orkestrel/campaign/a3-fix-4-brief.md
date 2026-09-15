# Unit A3-fix-4 — the last four precision items on the agent guide

## Role and engine

`builder`, native Claude (Sonnet), with Read, Grep, Glob, Edit, Write, and Bash. A fully
specified unit. Perform the assignment directly and spawn nothing. You are the sole writer in
`C:\Users\mikes\WebstormProjects\agent` for the life of this unit.

## Objective

Close claims 1, 7, 8, and 9 of `a3-fix-2-audit-objective.md` exactly as specified, keeping every
titled source example byte-equal to its guide fence and the guide gate green.

## Context

- Record: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\a3-fix-2-audit-objective.md`
  (claims 1, 7, 8, 9; each names its site at `610a567`).
- Law: `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md`;
  `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\documentation.md` (a titled `@example`
  equals the guide fence under its heading), `writing.md` (a code token followed by a noun),
  `typescript.md`.
- Host: Windows 11, Git Bash. HEAD is the commit after A3-fix-3 (read `git log -1 --oneline`),
  tree clean apart from `node_modules`. Never `npm install`, `git add`, `commit`, `stash`,
  `checkout`, `restore`, `reset`, `clean`, or `git mv`.
- The installed `@orkestrel/server` declaration is at
  `node_modules/@orkestrel/server/dist/src/server/index.d.ts`; read `createServer`'s options and
  the `start` and `stop` methods before writing item 4's lines.

## Items

1. **The excerpt bound (claim 1).** In the engine clause's bounded-error-read sentence
   (`guides/agent.md`, the sentence A3-fix-2 wrote about the decoded excerpt never exceeding
   `MAX_ERROR_BODY_LENGTH` bytes), say instead that the excerpt is decoded from at most
   `MAX_ERROR_BODY_LENGTH` source bytes, that the read may pull one whole source chunk from the
   network, and that a multibyte character cut at the bound decodes to a replacement character,
   so the excerpt's own encoded length can exceed the bound by that character. Where the same
   promise appears in `src/core/helpers.ts`'s `readText` TSDoc or in `AgentProvider`'s, state it
   the same way (description paragraphs must still equal their Summary cells).

2. **The bounding fence's input (claim 7).** In the "Bounding any provider call" pattern fence,
   declare `messages` the way the guide's other fences do (a `const messages = [...] as const`
   line or a `declare const messages: …` line matching the fence's own style). If that fence
   mirrors a titled source `@example`, change the source identically.

3. **Two callback tokens (claim 8).** `src/core/constants.ts`: "when `authorize` returns" → "when
   the `authorize` callback returns"; `guides/agent.md`: "`serve` is the entry" → "The `serve`
   function is the entry". Keep the constant's description paragraph equal to its Summary cell.

4. **The server hookup (claim 9).** In the server half of the relay pattern ("Mounting the relay on
   your server"), after the dispatcher and the exported `serve` function, add the lines that
   start it with `@orkestrel/server`: the import, `createServer({ … })` with the dispatcher and
   the state the declaration requires, `await server.start()`, and the `stop` call in the place a
   consumer would put it — matching the installed declaration exactly. Mirror the change on
   `createRelay`'s titled `@example` byte for byte. The transcription in `tests/guides.test.ts`
   keeps driving the handler directly; extend its substitution comment and the guide's
   substitution sentence to say the server start-up is not executed there, and keep every
   presence guard's quoted lines unchanged or update the guard to the new line text.

## Scope

**Owned.** `guides/agent.md`, `src/core/constants.ts` (the one description paragraph),
`src/core/helpers.ts` and `src/core/AgentProvider.ts` (the excerpt sentences in doc blocks only),
`src/core/factories.ts` (the titled `@example` fences only), `tests/guides.test.ts` (the
substitution comment and presence guards only).

**Off-limits.** Everything else.

**Tools and limits.** `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run test:guides`, `npm run test:src:core` (read-only); never `lint`, `format`, `build`,
`test`, or a mutating command; never install, commit, or read a credential.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write the report to `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\a3-fix-4-report.md` and
return the same text: per item the exact change; the gate commands with counts; `Deviation`;
`Status` (`git status --porcelain` verbatim).

## Deviation contract

Stop and report when the installed `createServer` declaration cannot be satisfied in a fence a
consumer copies, when a Summary cell cannot equal its paragraph, or when a file outside Owned must
change. Decide, record, and carry on from wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:guides` exits 0 at its prior count and `npm run test:src:core` at 753.
3. `grep -n "never exceeds" guides/agent.md src/core` returns nothing; the server half names
   `createServer` and `start`; the bounding fence declares `messages`.
