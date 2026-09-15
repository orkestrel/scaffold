# Unit U5g — the landing text and the last shared composition (`@orkestrel/mcp`)

Successor of `U5f-mcp-walk-closure-brief.md`, which has already returned. It carries the findings
audit round A5c adopted that fall outside U5f's file (`A5c-audit-verdict.md`), and nothing else.
You are the only writer in this checkout.

**Do not edit `tests/distribution.test.ts`.** U5f owns every change that file needed, and this
unit's carriers do not reach it. If a carrier here seems to need a change there, stop and report
rather than making it.

## Role and engine

`builder` on Claude Sonnet (native; Read, Grep, Glob, Edit, Write, Bash). Perform the assignment
directly and spawn nothing.

## Objective

Remove the campaign identifiers a reader of this package cannot resolve, author the paint script's
composition once rather than once per side, and correct one guide sentence about which component
answers a refusal.

## Context

- Read first, in the mcp checkout: `AGENTS.md` and the rule files it names, which this package
  reads from `node_modules/@orkestrel/scaffold/dist/host/claude/rules/` — `tests.md` and
  `writing.md` bear on this unit. Skill: none.
- Checkout: `C:/Users/mikes/WebstormProjects/mcp`, `main`, HEAD `8d97dd0`. The working tree carries
  U5c through U5f uncommitted across five paths. `tmp/` holds unit logs; leave it.
- This repository formats with `oxfmt`, never `prettier`.
- The policy project carries ONE standing red from the published scaffold 0.0.68 vendored reader,
  closed by the 0.0.69 re-pin that follows. It is not yours, and it short-circuits `npm test`, so
  run the projects you need directly.
- `npm run test:distribution -- --mode release` needs the network and Chromium and takes about
  25 s. Run it once at the end; the Orchestrator takes the authoritative reading after you exit.

## Unknowns

None.

## Scope

- Owned: `tests/fixtures/distributionPage.mjs`, `tests/fixtures/distributionServer.mjs`,
  `tests/fixtures/distributionScript.mjs`, and `guides/mcp.md` `## Tests` only.
- Off-limits: `tests/distribution.test.ts` (a concurrent unit owns it), `src/**`, `package.json`,
  `package-lock.json`, `vite.config.ts`, every other guide section, `tmp/**`. No npm package added.
- Tools: Read, Grep, Glob, Edit, Write, Bash for the named commands. No install, no commit, and
  none of `git stash`, `git checkout`, `git restore`, `git reset`, `git clean`.

## Carriers

1. **The campaign identifiers.** The page fixture labels its run functions with tokens of the form
   `X5`, `X6`, `X7`, and `X8` in their leading comments. Those are this campaign's own
   exit-criterion identifiers; they appear nowhere else in this package, so a reader has nothing to
   resolve them against, and they are wrong as written — the same token labels two different
   scenarios while the refusal and control scenarios carry none. Delete the token from each
   comment and keep the sentence that follows, which already names what the scenario is. Sweep
   all three fixtures for any other token of that form and delete each the same way.
2. **The composition authored once.** The page fixture and the Node fixture each compose the paint
   script from the shared constants independently, including the argument key, and the relay
   receipt's comparison depends on both sides running the same script. Export the composed script
   from the shared script fixture and have each side import it, so the composition exists once.
   Leave the shared builder and constants exported as they are if another caller needs them; say
   in the report what each side now imports.
3. **The guide sentence.** The `## Tests` bullet for the refusal receipt says the relay's own
   `authorize` callback answers the refusal status. The callback rejects the credential; the
   installed relay is what answers the status. Rewrite the bullet so the actor is right, keeping
   it in the same form and voice as its neighbours, and keeping what it claims no wider than what
   the receipt pins: the relay refuses a credential its `authorize` callback rejects, answering
   that status, and the route records the request it refused.

## Execution

Perform the assignment directly; spawn nothing.

## Acceptance criteria (cheap first)

1. `npm run format:check` exit 0; `npm run lint:check` exit 0.
2. `npm run check` exit 0.
3. `npm run test:guides` exit 0.
4. A grep over all three fixtures for a token of the form `X` followed by a digit returns nothing.
5. `npm run test:distribution -- --mode release` exit 0 with every receipt green; record the
   duration and the counts the runner prints.
6. `git status --short` names only the five paths the tree already carried; you added no file and
   removed none, and `tests/distribution.test.ts` is untouched by you. Confirm by naming your own
   edits' paths.
7. No count of a growable set, no `above` or `below`, in prose you add.

## Output

Return, as your final message, a report with these sections and nothing else: **Carriers** (what
changed, `file:line`); **The identifier sweep** (the pattern, the paths covered, what it found);
**What each side imports** (after carrier 2); **Acceptance readings** (each criterion with its exit
code or reading); **Deviation state**. The Orchestrator captures it to
`tmp/units/U5g-mcp-landing-text-report.md`.

## Deviation contract

Stop and report (expected, found, exact evidence, done or not done, one hypothesis at most) when a
carrier needs a change in `tests/distribution.test.ts`, when carrier 2 cannot be done without one,
or when a criterion outside your owned files reddens. Decide and record an ancillary matter
yourself: the exported name for the composed script, where a comment sits, the exact wording of a
sentence this brief does not quote.
