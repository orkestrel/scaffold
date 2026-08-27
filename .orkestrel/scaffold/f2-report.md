# Unit F2 — report

Every A2 finding's carrier landed. No deviation: every location matched its quoted text in the
brief. One finding outside my owned scope is reported at the end.

## A — `#canon` extracted to `src/server/helpers.ts`

New export `listCanonPaths(target: string, groups: readonly Group[]): readonly string[]`, placed
after `listDirectories` in `src/server/helpers.ts`, body byte-identical to the removed method:

```ts
export function listCanonPaths(target: string, groups: readonly Group[]): readonly string[] {
	const held: string[] = []
	for (const member of CANON_PATHS) {
		const full = resolveContainedPath(target, member)
		if (full === undefined) continue
		if (isPhysicalFile(full)) held.push(member)
		else if (isPhysicalDirectory(full)) {
			for (const name of listFiles(full)) held.push(`${member}/${name}`)
		}
	}
	return held.filter((path) => groups.includes(inferGroup(path)))
}
```

- `src/server/Materializer.ts` `#derive`: `for (const path of this.#canon(plan, target))` →
  `for (const path of listCanonPaths(target, plan.groups))`. The `#canon` method and its comment
  are gone; the comment's substance moved into the helper's `@remarks`.
- Imports: `Materializer` drops `CANON_PATHS` (its only remaining mention is backticked prose in
  the `audit` TSDoc) and gains `listCanonPaths`; `helpers.ts` gains `inferGroup` and the `Group`
  type. `helpers.ts` still imports no implementation class, so the leaf stays a leaf.
- Barrel: `src/server/index.ts` already star-exports `./helpers.js`, so the export is public.
  `guides/scaffold.md` § Helpers gained the parity row.
- Name: `list*` in this module already means "enumerate names from the filesystem"
  (`listFiles`, `listDirectories`), which is exactly what this does.

TSDoc voice: the summary is third person (`Lists …`) per `.claude/rules/typescript.md`, matching
the recently added `isCanonPath` and `isDeferredPath` in `src/core/helpers.ts`. The older exports
around it are imperative. Observation for the Orchestrator, not a change I made: that file mixes
the two forms.

## B — the false canon-destination sentence, its count, and the residue line

`guides/scaffold.md` (the canon-destination paragraph):

- old: "A canon destination costs no request. The fetch list drops it and `filesToHost` takes the
  installed floor bytes for it: a target receives no copy of a staged contract, and the one canon
  path a plan does claim is deferred, so live bytes reach neither."
- new: "A canon destination costs no request. The fetch list drops every canon destination and
  `filesToHost` keeps the installed floor bytes for each one, claimed or not. The rule covers the
  destinations a plan does claim as well: the `AGENTS.md` and `CLAUDE.md` pointers are written from
  this package's own templates, and the catalog agent file is claimed by presence, so no byte a
  target holds is taken from a fetched canon path."

`src/server/helpers.ts` (`filesToHost` `@remarks`):

- old: "…and the one canon path a plan does claim is deferred, so the overlay never requests one and
  a fill that carries no row for it is complete rather than spoiled."
- new: "…so every canon destination keeps its floor bytes here, claimed or not, and a fill that
  carries no row for one is complete rather than spoiled."

`tests/setupServer.ts`, the two "one destination" phrasings:

- `STAGED_PATHS` remarks, old: "A plan claims one destination inside the canon and vendors none of
  the rest, which is why {@link buildFleetManifest} declares `HOST_PATHS` plus that one file…"
  new: "A plan claims the root pointers and {@link CATALOG_AGENT_PATH} inside the canon and vendors
  none of the rest; the pointers are written from templates, so the catalog file is the only canon
  destination a host declares. That is why {@link buildFleetManifest} declares `HOST_PATHS` plus
  that file…"
- `buildFleetManifest` remarks, old: "It is the one destination a plan claims inside the canon, and
  `HOST_PATHS` itself holds only files…" new: "It is the only canon destination a host declares,
  because the pointers a plan claims there carry their own content, and `HOST_PATHS` itself holds
  only files…"

`src/core/constants.ts` `CANON_PATHS` remarks: the residue line "These facts fix what a target holds
at one of these paths." is deleted, with its surrounding blank line.

## C — comment hits and exit-code assertions

`tests/src/bin/CLI.test.ts`:

- `:2461` old "The release stages those paths for reading now, so a copy of one" → new "The release
  stages those paths for reading, so a copy of one" (paragraph rewrapped).
- `:2548` old "at the one path where it is easy to lose" → new "at the one path where it is most
  often lost".
- The git-ignored-registration case (`leaves a git-ignored registration outside the dirty refusal
  and outside the deletion`) and the untracked-leftover case (`refuses an untracked canon leftover
  as uncommitted work and leaves it standing under the waiver`) now bind their `execute` return
  value and the pinned refusal that produces it:

```ts
expect(code).toBe(EXIT_DRIFT)
expect(result.note ?? '').toContain("USAGE: 'catalog' does not take --offline")
```

Neither assertion is vacuous: the observed `code` is `EXIT_DRIFT` rather than `EXIT_CLEAN`, and
`result.note` is a real string rather than the `?? ''` fallback, which `toContain` would fail on.

## D — the catalog agent's opening, true for both readers

`.claude/agents/orkestrel.md`:

- old: "Resolve it against scaffold rather than against this repository, the way this repository's
  `AGENTS.md` file directs: `../scaffold/.agents/orchestration.md` when a scaffold checkout sits
  beside this repository, and `node_modules/@orkestrel/scaffold/dist/host/agents/orchestration.md`
  otherwise."
- new: "Resolve it against scaffold. In the scaffold checkout it sits at
  `.agents/orchestration.md`. A repository that installs scaffold reads it at
  `node_modules/@orkestrel/scaffold/dist/host/agents/orchestration.md`, or in a scaffold checkout
  beside that repository, as that repository's own `AGENTS.md` pointer names."

No sentence asserts what this repository's `AGENTS.md` directs; the only `AGENTS.md` claim is about
the installing repository's own pointer, which is the pointer template scaffold writes there.

## E — the visit's migration steps

`.agents/skills/orkestrel-publish/references/wave.md`, under step 2.

New first sub-bullet, condition-first:

> Where the target's `.claude/agents/orkestrel.md` still opens with a repository-relative `.agents/`
> read instruction, delete the file and commit the deletion before the run. `repair` restores the
> floor body and `catalog` refills the table, so one visit leaves the current file and the committed
> deletion keeps the uncommitted-work refusal from firing. Presence ownership never replaces present
> bytes and the table rewrite touches only the marker-bounded region, which is why the deletion is
> the migration.

The deletion is ordered before the run and committed, because `repair` is what restores the floor
body and `overwrite` refuses a tree carrying uncommitted work.

The `--dirty` sub-bullet gained its gate consequence:

- old tail: "…before re-running: `--dirty` clears the refusal and leaves the copy standing."
- new tail: "…before re-running. `--dirty` clears the refusal and leaves the copy standing, and a
  kept `.claude/rules` copy then reddens the target's own policy sweep: the pointer `AGENTS.md`
  carries no rule map, so the copy has no row there and the sweep reports it. Delete the copy rather
  than waiving past it."

## F — the roles-law scope, the target's losses, and the README

**F(i)** `.agents/orchestration.md` § Roles, one directive, restated nowhere:

- old: "Give every role a file on both sides. The role file is where engine, effort, tools,
  permissions, and charter are pinned, and the tool allowlist is what makes the read-only floor
  real. A role with no file has nowhere to pin either."
- new: "Give every role a file in the scaffold checkout, under `.claude/agents/` and under
  `.codex/agents/`. The role file is where engine, effort, tools, permissions, and charter are
  pinned, and the tool allowlist is what makes the read-only floor real. A role with no file has
  nowhere to pin either. The requirement is the canon repository's alone: a fleet target holds the
  catalog agent and no other role, and a session that dispatches roles starts on scaffold and
  attaches the target."

The rewrite also removes the untallied `both`.

**F(ii)** `guides/scaffold.md` § Limits, new entry placed directly after the canon-path entry whose
registration seam it points back to:

> **A target holds no dispatchable role beyond the catalog agent.** The canon is staged for reading,
> so a target receives the `AGENTS.md` and `CLAUDE.md` pointers and `.claude/agents/orkestrel.md`,
> and nothing else a harness reads: no other agent role, no bench configuration, and no MCP
> registration. A harness running in a target loads none of those from `node_modules` either, so a
> role, a bench, or a server that target needs is defined in the harness's own local or user scope —
> the seam the preceding registration entry already names. Fleet targets are not orchestration
> hosts. A session that dispatches roles starts on scaffold, where `.agents/orchestration.md` and
> the role files sit, and attaches the target it is working on.

**F(iii)** `README.md`, the what-a-target-carries sentence, saying what is true of the scripts
rather than dropping them:

- old: "…its toolchain, its policy proofs, its bench scripts, its harness permission file — and the
  verbs write it and compare it."
- new: "…its toolchain, its policy proofs, its harness permission file, its bench probe scripts —
  and the verbs write it and compare it. A bench probe script is a session-start hook that reports
  whether a bench CLI resolves; what wires that bench stays in the canon, and a session reads it at
  its primary root."

Verified against the shipped scripts: `scripts/codex.sh` and `scripts/cursor.sh` are `SessionStart`
capability probes that exit early unless `CLAUDE_CODE_REMOTE` is `true` and report only whether the
CLI resolves.

## Validation

Scoped, read-only apart from my owned files.

| Command                      | Result                                     |
| ---------------------------- | ------------------------------------------ |
| `npm run check`              | exit 0                                     |
| `npm run test:src:core`      | 8 files, 373 passed                        |
| `npm run test:src:server`    | 5 files, 424 passed, 1 failed (floor)      |
| `npm run test:src:bin`       | 3 files, 204 passed, 5 failed (floor)      |
| `npm run test:policy`        | 1 file, 111 passed                         |
| `npm run test:guides`        | 1 file, 17 passed                          |
| `npx oxfmt --check` (owned)  | all 11 owned files correctly formatted     |
| `npx oxlint` (owned sources) | exit 0                                     |

### The six reds are the floor-digest drift, proved

Every red is `ScaffoldError: The vendored host cannot read the declared file at
.agents/orchestration.md`, raised by `readHostFloor()`, which under a `.ts` run reads the repository
root against `host.json`. A read-only digest sweep over every `host.json` entry names exactly the
files items B, D, E, and F edit, and no others:

```text
.agents/orchestration.md
.agents/skills/orkestrel-publish/references/wave.md
.claude/agents/orkestrel.md
guides/scaffold.md
```

Decisive control: with those four files temporarily set to their committed bytes — so the sweep
reported no drift — and every code and test edit still in place, both suites were fully green.

```text
test:src:server   5 files, 425 passed (425)
test:src:bin      3 files, 209 passed (209)
```

The four files were then restored from a byte-verified copy (`cmp` clean on each), and the sweep
again names exactly those four. `host.json` is untouched; the regeneration is the Orchestrator's.

### Failing-first evidence for the extraction's control

The new group filter's pin was proved able to fail. With `return held.filter(…)` replaced by
`return held` in `listCanonPaths` and nothing else changed:

```text
× listCanonPaths > lists only the held canon paths whose group the caller selects
  Tests  1 failed | 3 passed
```

The line was restored and the case re-ran green. `tests/src/server/helpers.test.ts` gains four cases:

- `lists a held canon file and expands a held canon directory by file` — its control is
  `.claude/settings.json`, a file inside the `.claude/` prefix and therefore inside the
  `orchestration` group the call selects, but outside canon membership. A filter reading the group
  alone would list it; its absence is what shows membership decided the answer, and
  `isCanonPath('.claude/settings.json')` is asserted `false` beside it.
- `lists only the held canon paths whose group the caller selects` — `AGENTS.md` under `docs`,
  `.agents/orchestration.md` under `orchestration`, neither under `tests`.
- `answers the empty list for a target holding no canon path and for an absent one`.
- `lists a canon path a target really holds and not one it redirects to` — a symlinked
  `.agents/orchestration.md` is not listed, with the same bytes written at the same real path as the
  control.

The Materializer cases are unchanged and green: `tests/src/server/Materializer.test.ts` was not
edited, and `test:src:server` reports 425 of 425 under the control run.

## Diffstat

```text
 .agents/orchestration.md                           |  9 ++-
 .../skills/orkestrel-publish/references/wave.md    | 11 +++-
 .claude/agents/orkestrel.md                        | 10 +--
 README.md                                          | 10 +--
 guides/scaffold.md                                 | 22 +++++--
 src/core/constants.ts                              |  2 -
 src/server/Materializer.ts                         | 27 +-------
 src/server/helpers.ts                              | 56 ++++++++++++++--
 tests/setupServer.ts                               | 15 +++--
 tests/src/bin/CLI.test.ts                          | 22 +++++--
 tests/src/server/helpers.test.ts                   | 75 ++++++++++++++++++++++
 11 files changed, 196 insertions(+), 63 deletions(-)
```

`git status --porcelain` lists those eleven files and nothing else. Every one is owned.

## Shared-file patches

None. No fix needed an off-limits or shared file.

## Finding outside my owned scope

`tests/src/core/helpers.test.ts:340-344` carries the same false claim item B repairs, in a comment
above `selects no canon member and retains the vendored paths beside them`:

```ts
// The selection reads `HOST_PATHS` alone, so no canon member reaches it: a
// target reads those files from the package it installs, and the one canon path
// the plan does claim is appended by the compiler instead. The retained paths
```

The plan claims `AGENTS.md`, `CLAUDE.md`, and `CATALOG_AGENT_PATH` inside the canon, so "the one
canon path the plan does claim" is false and carries a count. The true statement is that
`nameToHostArtifacts` appends the catalog file alone to the host selection, because the pointers are
content-owned. The file is not in my owned list, so I left it and report the exact hunk. Acceptance
criterion 4 is scoped to owned files and is met; this is the last hit of that phrase in the tree
outside `dist/`.

## Deviation state

No deviation. Every quoted location matched; the extraction changed no observed behavior; no fix
needed an off-limits file.
