<!-- U6 — builder (Sonnet, native), ollama adoption. Retained from the completion notification, 2026-09-15 (65 s, 12 tool uses). Stopped before editing; no files touched. -->

Deviation: the installed `node_modules/@orkestrel/tool/dist/src/core/index.d.ts` in ollama declares `execute(args, caller?)` and no `ToolContext` (`grep -c ToolContext` = 0), not the U0-landed contract the brief describes.

Evidence: `u0-receipt.md` shows the U0 tool tarball install into ollama at 2026-09-15T05:00:55Z with `ToolContext after: 8`; `u0b-receipt.md` shows the U0b agent tarball install at 05:31:57Z; the tool declaration's mtime is 05:32:07Z, one minute after U0b. `npm run check` in ollama now exits 0 (not the recorded 15-error baseline) because the installed declaration still permits the old shape.

Hypothesis (confirmed by the Orchestrator's reading of all three consumers: agent 8, mcp 0, ollama 0): the agent tarball's `npm install --no-save` re-resolved `@orkestrel/tool` from the lockfile and registry (`^0.0.14`) as a dependency-resolution side effect and clobbered the U0 tarball copy in every consumer it touched.

Done / not done: nothing adopted; working tree clean. Re-run the tool tarball install (both tarballs in one `npm install`) before re-dispatching.
