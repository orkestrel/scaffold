# Audit A4c — close the U4f round (`@orkestrel/mcp` browser face: the A4b fixes and the bridge that follows the registry)

## Role and lane

One brief, two blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  OBJECTIVE and cross-engine lane (Opus 5 wrote the whole U4 chain, U4f included). Do not attempt a
  test run; name each unexecuted vector as `UNRESOLVED` with its exact command, and read the
  Orchestrator's logs under Review evidence. Every evidence file is staged beside this brief in
  `tmp/codex/` under the names given.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every U4f carrier closed at the
  `file:line` the report names; the red and green logs; scope; the probe. Read the evidence under
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` (the same names, `.txt` suffixed
  where noted) and the mcp tree at `C:/Users/mikes/WebstormProjects/mcp`.

Perform the audit directly and spawn nothing. Assume the round left one defect and go looking for it.

## Subject

The `mcp` checkout at checkpoint `b9ff0b9` plus the working tree after U4 → U4c → U4d → U4f. U4f's
brief is `U4f-mcp-browser-fix-brief.md`; its report is `U4f-mcp-browser-report.md`. The previous
round's verdicts are `A4b-audit-analyst.md` (`FAIL 1, 5, 6, 7, 11`) and `A4b-audit-checker.md`
(`FAIL 10, 11`); the Orchestrator's probe `P11-a4b-probe.md` reproduced A4b claims 1 and 6 in real
Chromium (instrument `P11-a4b-probe.test.ts.txt`). The installed `@orkestrel/tool` tarball carries
the registry emitter (`ToolManagerEventMap` with `add`, `remove`, `clear`; `emitter`; `destroy`);
the installed `@orkestrel/emitter` is 0.0.10 and its `on` returns `void` (the unit's reading —
verify it at `node_modules/@orkestrel/emitter/dist/src/core/index.d.ts`).

## Review evidence

- `A4c-u4f-only.patch` — the U4f delta alone: the working tree against the A4b baseline (the A4b
  diff applied to `b9ff0b9` in a scratch worktree); 12 files, 712 insertions, 144 deletions. This is
  the audit's primary text.
- `A4c-diff.patch` — the combined U4 → U4f chain against `b9ff0b9` (27 files), for context.
- `U4f-red.log.txt`, `U4f-green.log.txt` — the writer's red-first and green readings, retained
  verbatim from its report (the unit deleted its own copies).
- `U4f-mcp-gates-orchestrator.log.txt` — the Orchestrator's authoritative gates after U4f
  (`format:check`, `lint:check`, `check`, `build`, `test`, all exit 0) and
  `U4f-mcp-gates-test-full.log.txt`, the full `npm test` output (src projects 1451 passed, 2
  skipped; guides 201; policy 90/1; config 172/1; setup 86; conformance 47; integration 4).
- `collide3-mcp-after-u4f.txt` — the Orchestrator's export-name collision probe over `src/**` and
  `tests/**` against the installed `@orkestrel/test` 0.0.14 and `@orkestrel/contract` 0.0.17
  (469 names, 98 files): `collisions: none`.
- `G5-webmcp-distillate.md` — the WebMCP source distillate the `G5` parity row quotes (line 51).
- The `guides/tool.md` hunk in the chain diff is the Orchestrator's mirror refresh (ledger row U0g),
  not the unit's.

## Numbered falsifiable claims

1. **Every session-bound request refuses at once while disconnected.** `#refuse` is read at the
   shared entry `#request` and at the subscription generator's entry, so `call`, `tools`, the task
   client's requests, and a subscription opened after `stop` all reject with `-32600` and send
   nothing (`loopback.sent.length` unchanged); `server/discover` and connection negotiation stay
   exempt. A subscription refuses on its first `next()` — rule whether the contract makes that honest
   (the unit recorded that a generator body does not run before `next()`), or whether `listen` owes an
   earlier refusal. The browser red for `settles calls across page destruction` was re-taken with
   `stop` intact and only the refusal disabled, so the red binds to the hang (`U4f-red.log.txt`).
   Falsify with a request path that still parks after `stop`.
2. **The bridge follows the registry.** `publish(tools)` takes its call-time snapshot and subscribes
   to `tools.emitter` (`add` registers through the reconciliation, `remove` aborts that name, `clear`
   aborts the manager's registrations, a later `publish` of another manager replaces the
   subscription, `destroy` unsubscribes); the release is `emitter.off` with the retained handler
   references because the installed `on` returns `void`; `stops following the registry after
   destroy` reads `tools.emitter.count()`. The follow tests were red first. The guide's parity row
   says **implement** and the "re-publish after changing the registry" sentence is gone from source,
   types, and guide. Falsify with a registry change the bridge misses or double-applies (a `remove`
   followed by `add` of the same name within one turn; a `clear` during a suspended `publish`).
3. **Destroy during replacement unregistration registers nothing** — `#reconcile` re-reads the
   destroyed flag between the release and the replacement (`ModelContext.ts:274`); P11's vector is
   green (`registers nothing when destroy runs during replacement unregistration`).
4. **Ownership prose states per-name identity** everywhere it is stated — the interface remarks, the
   class remarks, `createModelContext`, the guide overview, the identity paragraph, the fence
   comment — and no sentence still promises that `destroy` touches no other handle's registration.
   The same-name test stays.
5. **The `G5` row preserves the source's uncertainty** (`guides/mcp.md` matrix; compare
   `G5-webmcp-distillate.md:51`).
6. **The mutation-proof tests bind.** `is inert on a repeat` suspends `registerTool` across a double
   `destroy` and reddens when `#reconcile`'s destroyed read is deleted; the adoption test registers
   two tools with complementary hint triples so every pairwise projection swap reddens; removing
   `#unfollow()` from `destroy` reddens `stops following the registry after destroy`. The recorded
   negative: deleting `destroy`'s own `if (this.#destroyed) return` leaves the file green. Rule on
   that guard: keep it as the idempotence entry the interface documents, or is it dead state under
   the design laws (derive state; no superfluous code) now that every operation it guards is
   idempotent?
7. **Nothing re-implements an installed export.** The probe is clean; `traceRegistrations`
   (`tests/setupBrowser.ts:387`), `describeWebMCPTool` (`src/browser/helpers.ts:172`), and the
   fixture's `suspend()`/`holding()` (`tests/fixtures/modelContext.ts:238-246`) do a job no
   `@orkestrel/test`, `@orkestrel/contract`, or `@orkestrel/emitter` export does; the fixture's
   `Promise.withResolvers` latch observes neither an abort nor an event (`.claude/rules/tests.md`
   § Condition). Name any installed export that already does one of those jobs.
8. **A followed `add` of a tool WebMCP cannot carry is skipped, documented, and detectable.** The
   unit skips it because a followed change has no caller a refusal could reach, documents the skip
   on `publish` and in the guide, and pins it. Rule whether a consumer can observe the skip (a
   `change` event, the registry contents, anything) or whether the guide must say it cannot.
9. **The restated snapshot tests still distinguish a call-time snapshot from a run-time one.** Both
   assert the `toolchange` trace `[['add'], []]` and the empty end state. Falsify with an
   implementation that reads the registry at run time and still passes them.
10. **Nothing else moved.** The U4f delta is the 12 files the report's table names; no manifest,
    version, lockfile, `scaffold repair` file, `src/server/**`, `configs/**`, or `dist/**` path;
    `src/core/**` beyond `MCPClient.ts` untouched.
11. **Would you ship it as mcp 0.0.31** for U4e (the server's `notifications/tools/list_changed`
    producer over the same emitter) and U5b (distribution proof) to build on? Name what must change
    first if not.

## Output

The `orkestrel-falsify` verdict shape: one line per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or
`NOT-EVIDENCED`) with the evidence (`file:line`, the log line, or the exact command an unexecuted
vector needs), findings outside the claims under `outside:`, and ONE terminal line
`VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Nothing else.
