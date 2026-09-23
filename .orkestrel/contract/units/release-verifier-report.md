# CONTRACT-ISINSTANCE release — the verifier's report (returned 2026-09-23 by `verifier` on Sonnet, native subagent, 10 tool uses, 115 s; retained verbatim from the subagent's return text)

## Gate Report — `@orkestrel/contract` at `014c2d2`

Commit confirmed: `014c2d2 Narrow isInstance to the constructor's instance type and release 0.0.18`, `main`, checkout `C:/Users/mikes/WebstormProjects/contract`. All commands run in the foreground from that checkout.

- `npm run format:check` — exit 0. 70 files, correct format.
- `npm run lint:check` — exit 0. No output, no warnings.
- `npm run check` — exit 0. `tsc --noEmit` clean plus `check:src:core`.
- `npm run build` — exit 0. `dist/src/core/index.js`, `index.cjs`, and `.d.ts`/`.d.cts` built. API Extractor logged a non-failing notice: the target project uses TypeScript `6.0.3`, newer than the bundled compiler engine (`5.9.3`).
- `npm test` — exit 0. `test:src` 1362 passed (19 files), `test:policy` 101 passed / 1 skipped, `test:config` 172 passed / 1 skipped (same API Extractor version notice, non-failing), `test:setup` 62 passed, `test:guides` 48 passed.
- `npm run test:distribution -- --mode release` — exit 0. 1 test file, 9 tests passed in 10.19s.

No red test in any gate.

**`test:distribution` reading.** Under `--mode release`, `tests/distribution.test.ts` first pings the npm registry (`npm ping`) and requires it reachable — the release gate has no offline fallback. It then runs `npm pack` on the workspace into a temporary scratch directory (`mkdtemp` under the OS temp directory), locates the single resulting archive, and installs that packed tarball into an isolated consumer tree scaffolded under the same scratch directory (never linked). From the installed tree it reads the published `package.json` exports map and proves: every relative target the exports map names ships in the installed tree; every published module declares types; a subpath absent from the exports map is refused by Node's resolution; a generated consumer compiles under every module-resolution mode; and no browser face exists that this proof cannot drive. A `[DEP0190]` deprecation warning from `child_process` shell-argument handling printed to stderr but did not fail any test.

**Overall verdict: GREEN.** Every gate passed; `git status --short` is empty (clean tracked tree, matching the standing condition that the release commit's tree is clean).

**Anomalies:**
- API Extractor's TypeScript-version mismatch notice (`5.9.3` bundled vs. `6.0.3` project) printed during `npm run build` and again during `npm run test:config`; non-failing, informational only.
- `[DEP0190]` deprecation warning printed once during `test:distribution`, originating from a `child_process` call with `shell: true` and unescaped args somewhere in the distribution test's process-spawn path; non-failing.
