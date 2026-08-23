# FIX-K audit — rule on the prose, and on the Orchestrator's correction inside it

## Subject

`@orkestrel/scaffold` 0.0.50 at commit `e4af545` on `claude/new-session-hxonen`. The subject is that
commit's diff: the prose repair FIX-K made, plus one correction the Orchestrator made inside it.

Chain: design rounds, W1–W7, propagation, audit round 1 (FAIL), FIX-A–E, round 2 (FAIL), FIX-G/H/I,
round 3 (two lanes FAIL + nine refuters), FIX-J, FIX-J audit (two lanes FAIL), FIX-L, FIX-K.

## What this round decides

**Whether the guide that ships into every target tells the truth.** `guides/scaffold.md` is vendored:
every fleet workspace receives these bytes. A false sentence here is a false sentence in eleven
repositories. Nothing gates prose — `tests/guides.test.ts` proves that a name resolves and that a
fence imports real exports; it cannot prove a sentence.

## Who wrote what

**Opus wrote all of it**, so this is not your engine's work and you owe it no special suspicion — but
one part is the Orchestrator's own and gets the same treatment as any other: the correction to the
Vite condition sentence, described under B6.

## Already established — do not re-run

Verified by the Orchestrator directly:

- `npm run build && npm run build:inventory` staged 108 files; `format:check`, `lint:check`, `check`,
  and `test:guides` all exit 0 at `e4af545`.
- The `src:core` project reports 354 passed and `src:bin` 197 passed at the parent commit.
- **Node's condition set, measured**, with a control:
  ```text
  cond-probe               require -> node-addons   import -> node-addons
  cond-probe/no-addons     require -> node          import -> node
  cond-probe/no-node       require -> module-sync   import -> module-sync
  cond-probe/browserish    require -> default       import -> import
  ```
  `node-addons`, `node`, `module-sync` match under both formats; `module`, `browser`, `production`
  match nothing in Node.
- **Vite 8.2.2's real defaults**, read from the installed package:
  `defaultClientConditions: ["module","browser","development|production"]`.
- Node loads an extensionless file under **both** module systems, resolving format from the nearest
  `package.json` `type`. A round-3 claim to the contrary was refuted and withdrawn. **Do not revive
  it.**
- `tests/src/core/compilers.test.ts:628-629` bans the literals `playwright` and
  `configs/browsers.js` from the emitted proof's whole content. That is why the guard comment names
  imports by role. It is a known constraint, not a finding.

## Review evidence

- Diff: `/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/audit/fixk/diff.txt`
- Diffstat: `.../audit/fixk/diffstat.txt`  ·  Status: `.../audit/fixk/status.txt` (empty; tree clean)
- The unit's report and the Orchestrator's integration: `.orkestrel/campaign/fix-k-report.md`
- The repository at `/home/user/scaffold`.

## Claims

**B1 — every rewritten guide sentence is true of the code as it now stands.** Read
`src/core/templates.ts` for what is true and check each rewritten sentence against it, not against
this brief. The driven-subpath paragraph, the runtime-target rule, the fallback-list rule, and the
unreachable-entry sentence are the ones that moved.

**B2 — the fenced extensionless sentence survived unhedged.** The brief forbade touching it. Check it
was not softened, qualified, or quietly weakened while its neighbours were rewritten.

**B3 — every `bytes` left in place names real file content.** The unit listed each with its sense.
Attack the list: find one it left that actually describes the trimmed comparison, or one it changed
that actually described file content.

**B4 — no false universal was replaced by an unfalsifiable one.** This is the claim that matters
most. A sentence a reader cannot check reads as rigour and is worse than the false one it replaced.
The unit CUT an undated live-state claim rather than replacing it — check whether what remains
asserts anything unfalsifiable.

**B5 — the emitted guard states the settled reason of record faithfully by role.** Compare against
`src/core/compilers.ts:1302-1307` and the guide. Does naming by role lose anything a maintainer
needs? Is the `vite` correction intact in substance?

**B6 — the Orchestrator's Vite correction is accurate and checkable.** It now says
`defaultClientConditions` is `module`, `browser`, `development|production`, that a production build
resolves the last as `production`, and that `import` comes from the ES module resolution rather than
from Vite's defaults. Attack: is that true of Vite 8.2.2? Does `RUNTIME_CONDITIONS.browser` in the
code actually match what a Vite production client build resolves? Can a reader check every part of
the sentence?

**B7 — the vendored inventory and the guide agree.** `host.json` was regenerated. Verify the digest
matches the file.

**B8 — the writing rules are honoured.** `AGENTS.md` § Writing and `.claude/rules/writing.md`. The
counts ban (never a number answering "how many" about a growable set), no `should`, no `above` or
`below`, no banned substitutions. Sweep case-insensitively and across inflections, rule each hit by
sense, and name the pattern and paths you swept — including a clean result.

**B9 — coherent, and would you ship it?** Read the diff as one change. Does the guide now read as one
document, or as three rounds of patches?

## Unknowns, named as unknowns

- Whether any rewritten sentence is checkable only against code the reader cannot see is not known.
  B4 settles it.
- The unit reports two prose rulings it added that carry no executed assertion, which
  `.claude/rules/documentation.md` § Parity asks for. It could not add one — the file needed was
  outside its grant. Rule on whether that is acceptable for 0.0.50 or must land first.

## Where a probe may live

You may write and run probes, ONLY under `tmp/audit-fixk-sol/`. Never inside `tests/`. Delete them
before returning. Do not run a tree-wide gate. Scope every run to a named vitest project or an
explicit path.

Your sandbox denies a grandchild process, a nested install, and a loopback listener. Twice in this
campaign a unit reported such a denial as an observation instead of working around it, and the host
reading then found a real defect. Do the same: name the exact command and the Orchestrator runs it.

## The threshold

A finding is worth more than a clean pass. These bytes ship into eleven repositories and nothing
gates them. Return "no findings" only if you attacked and failed to break, and show what you tried.

## Verdict shape

Exactly the `orkestrel-falsify` shape: numbered verdicts in this brief's order, each
`CONFIRMED` / `BROKEN` / `UNRESOLVED` / `NOT-EVIDENCED` with the evidence that value requires; then
findings fitting no claim; then one terminal line and only one.
