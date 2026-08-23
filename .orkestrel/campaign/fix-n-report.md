# FIX-N report — Orchestrator's integration

The unit's own report is in the campaign dispatch pair. This records the integration and two edits
the Orchestrator made on the unit's own flagged claims.

## What the unit closed

The false reason of record in all three copies, three writing-rule violations, the clause FIX-M
falsified, and two process rules landed in `.agents/orchestration.md` § Dispatch anatomy. `host.json`
regenerated; digests moved for `.agents/orchestration.md`, `guides/scaffold.md`, and the root.

## It verified the cause rather than taking the brief's word

The brief carried a measurement and told the unit to check it against the compiler before writing,
because the failure being corrected was exactly a fact taken on trust. It did, and added readings the
brief did not have:

```text
src core only           playwrightDep=false providerDep=false viteImportsProvider=false configsBrowsersTs=false browserDrive=false guard=true
src core + app browser  playwrightDep=true  providerDep=true  viteImportsProvider=true  configsBrowsersTs=true  browserDrive=false guard=true
src browser published   playwrightDep=true  providerDep=true  viteImportsProvider=true  configsBrowsersTs=true  browserDrive=true  guard=false
```

It then established the reason *for* the true cause rather than restating it: the branch selector
reads `blueprint.src.includes('browser')`, while the launcher imports and `configs/browsers.ts` are
gated on `src` **or** `app` — different axes. And a generated manifest publishes
`files: ["dist/src","README.md"]`, so an application browser face is not packed and the distribution
proof, which measures the packed artifact, is owed no drive for it.

## Two Orchestrator edits, on the unit's own flagged weak claims

Both were flagged by the unit and neither was in its grant to close.

**A count of the same shape it was told to remove.** `guides/scaffold.md` read "The generated
distribution proof carries one contract from the outside." That tallies a set anyone can add to,
which `AGENTS.md` § Writing bans. It now reads "takes its release contract from the outside" — the
contract is named by the sentences that follow, so the tally carried nothing.

**A property of scaffold's output stated as a law.** The guide read "because a private application
publishes nothing for a drive to measure." The unit flagged it: true of a scaffold-generated
workspace, whose manifest packs `dist/src`, and false as a general claim — a consumer hand-editing
`files` to pack `app/` falsifies the sentence without falsifying the selector, which stays keyed on
the `src` axis. It now reads "the selector reads the `src` axis, and a generated manifest packs
`dist/src`, so an application face is neither selected nor packed." That says what scaffold does and
what the selector reads, and a hand-edited `files` list no longer falsifies it.

Both edits are Orchestrator-written and are audited as such.

## Gates after the edits

```text
npm run build && npm run build:inventory   → staged 108 file(s) into host.json
npm run format:check = 0
npm run lint:check   = 0
npm run check        = 0
npm run test:guides  = 0
```

The unit's own readings, before these edits: `src:core` 354 passed, `src:core` scoped to
`compilers.test.ts` 91 passed, `src:bin` 197 passed, `test:policy` 93 passed, `test:config` 44
passed, `test:guides` 16 passed.

## Carried, not closed

The unit swept its owned files for the whole substitution table and reported its added lines clean.
It also reported hits in the banned sense that sit outside its grant, in `.agents/orchestration.md`,
`guides/scaffold.md`, and `src/core/templates.ts` — `latest`, `should`, `easiest`, temporal `once`,
and cross-referencing `above`/`below`. Those join the recorded directional-reference sweep on the
roadmap rather than being fixed where they were noticed.
