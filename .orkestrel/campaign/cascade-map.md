# Cascade map — runtime dependents and published surfaces (measured 2026-08-24)

From the `orkestrel` evidence lane, verified against each local manifest.

1. `@orkestrel/mcp` runtime cascade: `@orkestrel/probe`
   (`/home/user/orkestrel/probe/package.json:97`), and nothing depends on probe at runtime. The
   cascade ends there. The catalog table in `.claude/agents/orkestrel.md` is stale for mcp
   (0.0.21 versus local 0.0.22); regenerate before sequencing.
2. `@orkestrel/brief`: zero runtime dependents. A brief bump obliges no downstream republish.
3. Direct runtime dependents: `@orkestrel/test` — none (every reference is a devDependency);
   `@orkestrel/process` — mcp and sea (mcp chains to probe; sea chains to nothing);
   `@orkestrel/html` — markdown and browser (markdown chains to guide, guide to nothing; browser
   to nothing); `@orkestrel/middleware` — none.
4. Published `files` arrays for test, mcp, brief, html, process, middleware: each is
   `["dist/src", "README.md"]` — no package ships `guides/` or `tests/`. A test-only or
   guide-only change moves no published surface and obliges no bump.
