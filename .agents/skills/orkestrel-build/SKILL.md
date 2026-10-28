---
name: orkestrel-build
description: Wire, extend, or harden Orkestrel `app/core`, `app/browser`, and `app/server` environments — the environment's contracts, boundaries, entries, and host proofs, never the product designed inside one. Use for app-only or mixed src/app workspaces, app environment isolation, Vue browser entries, Node server entries, app aliases, configs, scripts, and tests, cross-environment contracts, and application guide parity. Do not use it to redesign an application's routes, screens, or domain behavior; take that to a design round and return here to wire what it decides.
---

# Build an Orkestrel application

## Read

`AGENTS.md` § Authority and loading names the files every unit reads. This skill adds the
authoritative `*/types.ts` of each selected environment, the root `tsconfig.json` and
`vite.config.ts`, the manifest, and `configs/app`. Where a step names a law, read the law rather
than this summary of it.

## Select the environments

`scaffold new` takes the independent selections `--src` and `--app`; `guides/scaffold.md` § Command line
and § Select at creation own the options and the combinations they refuse. The table names what each
app environment owns.

| Selection   | What it owns                                                                               |
| ----------- | ------------------------------------------------------------------------------------------ |
| app/core    | Host-independent contracts and composition; check and test only                            |
| app/browser | Framework-independent DOM runtime behind an `index.html` entry, `tsc`, real Chromium tests |
| app/vue     | Vue runtime with `App.vue` behind an `index.html` entry, `vue-tsc`, real Chromium tests    |
| app/server  | Node runtime, `dist/app/server/main.cjs` with only `node:*` external                       |

## Execute the workflow

1. **Inventory** existing `src`, `app`, `configs`, tests, manifest scripts, aliases, and
   guide rows. Treat current code as evidence, not policy.
2. **Contract first.** Define or refine each environment's `types.ts` before
   implementation, and inspect the exact installed `@orkestrel/*` capabilities before
   writing any boundary code.
3. **Wire configuration.** Root `tsconfig.json` owns the `@app/*` aliases and root
   `vite.config.ts` derives from them and owns the Vitest projects; `configs/app` holds
   thin target wrappers and scoped tsconfigs.
4. **Implement completely** — entries, barrels, centralized declarations, one-class
   implementation files, environment parsing, lifecycle, builds, and scripts — under the
   placement and manifest laws in `.claude/rules/application.md`.
5. **Own the shutdown contract** of the runner `.claude/rules/application.md` requires:
   - Serialize lifecycle transitions in call order.
   - Re-request port zero on an ephemeral restart.
   - Close lingering active connections deterministically on stop.
   - Release the runner's signal listeners idempotently on stop.
6. **Keep boundary enforcement inside the configured toolchain**, per
   `.claude/rules/workspace.md` § Typechecking and environment isolation and § Tooling.
   - Add no standalone boundary script and no second parser or source-language analyzer.
   - Disable the browser application's public directory, so an unmanaged file copy cannot
     ship outside the module graph.
   - Keep browser-only runtime tooling development-only.
   - Require explicit authorization before adding a Sass compiler.
7. **Prove it on real hosts.**
   - Run app/browser tests on Playwright-backed Vitest Browser Mode against real DOM.
     Probe the installed executable directly with `existsSync(chromium.executablePath())`
     rather than guessing a channel or reading an environment flag.
   - Bind port zero on loopback in app/server tests and use real fetch.
   - Prove executable readiness, collision exit, signal termination, and port release with
     real child-process tests.
   - Probe the actual capability in a capability-dependent test, and scope any skip
     narrowly.
8. **Document and prove parity** for every app export and behavioral method: guide,
   examples, manifest index, and the parity specifiers walking the existing `src` and
   `app` roots and every selected alias.
9. **Verify.** Run the rules' cleanup sweeps over source and tests. Then run the review
   `.agents/orchestration.md` § Size gate names for the change and the repository gates in
   their required order.

## Accept the result

Completion requires:

- every selected environment's `types.ts` implemented and mirrored in tests;
- every boundary-enforcement layer in step 6 reporting clean over the selected environments;
- the step 7 real-host proofs run and recorded with their counts — real DOM under
  Playwright-backed Vitest Browser Mode, loopback port zero under real fetch, and
  executable readiness, collision exit, signal termination, and port release under real
  child processes — each selected environment carrying the proofs its host owns;
- guide parity green over every app export and behavioral method;
- the repository gates green in their required order from an independent `verifier`.

Report what each environment owns, the exact proof and gate evidence, and any residual risk.
