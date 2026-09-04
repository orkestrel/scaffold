# Lane brief — draft the publish-wave preparation report

Role and engine: `grok` (Cursor Grok 4.6), read-only absorption and distillation. Never create, edit, or delete a file; never run a command that changes a tree. Perform the reading directly and spawn nothing.

Objective: draft the report the Orchestrator hands the owner before the release decision: the round, the order, each package's bump ruling with its evidence row, every re-pin, the wave's obligations, the peer edges, and the per-layer procedure that runs outside the approval window. The owner decides and holds the credential; nothing in the draft publishes or assumes a publish.

Sources, read in this order:
- `/home/user/scaffold/.agents/orchestration.md` § Publishing the fleet: what a bump obliges, the layer order from the catalog, scaffold's two published surfaces, the rule never to edit a vendored file inside a target.
- `/home/user/scaffold/.agents/skills/orkestrel-publish/SKILL.md`, `/home/user/scaffold/.agents/skills/orkestrel-publish/references/wave.md`, and `/home/user/scaffold/.agents/skills/orkestrel-publish/references/window.md`: the visit, the bump triggers, the preparation order, the login approval, the window.
- `/home/user/scaffold/.orkestrel/campaign/conform/inventory-4.md`: every package's dist and README movement against its declared published version, its tip, its layer.
- `/home/user/scaffold/.claude/agents/orkestrel.md` catalog table: versions, layers, and runtime dependencies as published (the Orchestrator regenerates it before sequencing).
- `/home/user/scaffold/ROADMAP.md:112-121` (the fleet publish wave chunk) and `/home/user/scaffold/ROADMAP.md:280-326` (§ 4, "The publish wave's obligations").
- Peer ranges: mcp peers `@orkestrel/router ^0.0.12` and `@orkestrel/server ^0.0.17`; middleware peers `@orkestrel/database ^0.0.12` and `@orkestrel/server ^0.0.17`; probe and test peer on toolchain packages alone. Read them from `/home/user/fleet/<pkg>/package.json`. `/home/user/scaffold/.orkestrel/campaign/visit-taverna-report.md:40-80` and `/home/user/scaffold/.orkestrel/campaign/conform/ledgers/session-2026-09-03.md:29-31` carry the peer history.
- `/home/user/scaffold/.orkestrel/campaign/conform/HANDOFF.md:190-222`: the close-out steps and the merge of `main` before packing (done for scaffold, test, and form on 2026-09-03).
- Every `package.json` under `/home/user/fleet/<pkg>/` and `/home/user/scaffold/`: `version`, `dependencies`, `devDependencies`, `peerDependencies`, `scripts.prepublishOnly`, `files`.

Questions the draft answers:
1. The round: which packages publish, in which layer, with the bump each takes (a `0.0.x` patch: state the exact next version per package from its declared version) and its evidence row from `inventory-4.md`.
2. The order: the catalog's layer order, then where a `peerDependencies` edge reorders it. A package whose peer publishes in a later layer must publish after that peer with the peer range re-pinned to the released version; name each such package and the layer it moves to.
3. Every re-pin: for each package, the `@orkestrel/*` ranges in `dependencies`, `devDependencies`, and `peerDependencies` that change when their targets release, and the `@orkestrel/scaffold` devDependency re-pin in every target with `scaffold repair` after scaffold's release.
4. The obligations from `ROADMAP.md` § 4 that close at the wave, each with the step of the procedure it attaches to (before packing, at the visit, after a layer closes, on a daemon host, on the publishing host).
5. What runs outside the window per layer (bump, re-pin, install, the self-pin sweep, `prepublishOnly`, commit, push) and what the owner does at the window per `window.md`.
6. What the owner decides: the go, the login approval per window, and every ruling the sources leave open.

Output shape, exactly: `## Draft` with the report in Markdown (tables for the per-package rows; sections in the question order; present tense; no `should`, `via`, `e.g.`, `i.e.`, `currently`; no count of a growable set stated as a number; a code token in backticks followed by a noun; every number a version, a date, or a value the sources state, cited by `file:line`); then `## Unknowns` naming every fact the sources do not settle. Nothing else; no verdicts.
