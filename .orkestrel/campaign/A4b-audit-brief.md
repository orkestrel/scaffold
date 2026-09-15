# Audit A4b — close the U4d fix round (`@orkestrel/mcp` browser face)

## Role and lane

One brief, two blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  OBJECTIVE and cross-engine lane (Opus 5 wrote U4, U4c, U4d). Do not attempt a test run; name each
  unexecuted vector as `UNRESOLVED` with its exact command, and read the Orchestrator's logs named
  under Already established for the readings that exist.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every U4d carrier closed at the
  `file:line` the report names; the captured red and green logs; the `## WebMCP parity` rows
  citing `G5` checked against `.orkestrel/campaign/G5-webmcp-distillate.md` and those citing
  `G5c` against `G5c-webmcp-idl.md`; scope; the export-name probe (`P5b3`).

## Subject

The `mcp` checkout at checkpoint `b9ff0b9` plus the working tree after U4 → U4c → U4d (report
`.orkestrel/campaign/U4d-mcp-browser-report.md`; brief `U4d-mcp-browser-fix-brief.md`). Previous
verdicts: `A4-audit-reviewer.md`, `A4-audit-analyst.md`, `A4-audit-checker.md`; the Orchestrator's
`P9-a4-probe.md`. Assume the fix round left one defect.

**Review evidence:** `tmp/units/A4b-diff.patch` (`git diff HEAD`, untracked files' full text,
`git status --porcelain`); the Orchestrator's gates with build `U4d-mcp-gates-orchestrator.log.txt`
and the full test output `U4d-mcp-gates-test-full.log.txt`; the probe `P5b3-collide-after-u4d.log.txt`;
the writer's red/green logs retained as `U4d-red.log.txt` and `U4d-green.log.txt`. The
`tests/setupBrowser.test.ts` header hunk is the Orchestrator's integration of U4c's report-only
patch (ledger row U4c) — not an undisclosed edit; the `guides/tool.md` hunk is the Orchestrator's mirror refresh after the tool emitter landed (ledger row U0g) — not the unit's.

## Numbered falsifiable claims

1. **A request on a disconnected client rejects at once** (carrier 1): core `#request` refuses with
   a coded MCP error when not connected and no connect is in flight; `rejects a request on a client
   that is not connected` and `settles calls across page destruction` exist and were red first; the
   guide states it. Falsify with a path that still parks.
2. **`PageServerInterface.stop`** replaces `destroy` everywhere (type, TSDoc, factory, guide row and
   fence, tests); `ModelContextInterface.destroy` untouched.
3. **`publish` reconciles** (carrier 3): a changed descriptor re-registers; an equal one is untouched
   (no spurious `toolchange`); a second manager rebinds; the three tests exist; the guide's
   remove-then-add workaround is gone.
4. **Call-time snapshot and rejection shape** (carriers 4, 5) pinned and documented.
5. **The guide is true**: the `inputSchema` row names the direction; `adopt`'s ruling is on its
   TSDoc and in the guide; the browser Helpers introduction is a complete sentence; the
   `WebMCPRegistryInterface` Methods table exists and the parity assertion catches its removal;
   every `G5`/`G5c`-cited matrix row matches its source; the chromestatus date phrasing is correct at
   every site.
6. **Native-host gating, interleavings, adoption assertions, listener removal, `ontoolchange`**
   (carriers 8–12) each pinned by the named test; the absence case stays an ordinary assertion.
7. **Weak tests strengthened** (carrier 13) so each named mutation goes red; no local test data
   table; no anonymous function assigned inside a test callback.
8. **Reuse gaps closed** (carrier 14): `recordFrame` on `createRecorder`; `isString` in the
   WebSocket transport; the probe clean.
9. **`client` option group** is `Omit<MCPClientOptions, 'transport'>`; the resource-timing buffer
   hardening is in `recordRequests`.
10. **Nothing else moved**; only owned files; no manifest, version, lockfile, vendored file;
    `guides/tool.md` untouched (the mirror refresh is the Orchestrator's).
11. **Would you ship it as mcp 0.0.31 for U5 and U4e to build on?**

## Output

The `orkestrel-falsify` verdict shape and nothing else, ending in one terminal line.
