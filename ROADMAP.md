# ROADMAP

The plan of record after the package-rows campaign of 2026-08-24 (which closed the scaffold,
probe, html, mcp, test, brief, agent, router, process, and middleware rows the previous revision
carried, on `main` in each repository). This file owns everything still open. Campaign detail is
recoverable from git history by hash; no campaign folder is the plan of record.

## 1. Package work, scheduled by each package's next natural release

- **scaffold**: publish the release that landed on `main` 2026-08-24 from the debrief of the
  package-rows campaign. `dist/src` carries the `HOST_PATHS` additions vendoring
  `.agents/templates` and `.agents/transports`; `dist/host` carries the shrunk orchestration
  contract with its skill pointers, the `orkestrel-publish` skill, the debrief retention
  reference, the dispatch-brief template, the transport contracts at `.agents/transports/`, the
  mirrored charter fixes, and the `orkestrel-prove-journey` rename. The 0.0.51 release published
  2026-08-24 with agent 0.0.18, brief 0.0.5, mcp 0.0.22, probe 0.0.4, ollama 0.0.12, and
  toolbox 0.0.9, and its adoption wave closed the same day: every fleet target re-pinned,
  repaired, gated green, and pushed. Publishing stays with the user.
- **scaffold**: the 0.0.51 plan writes `--no-cache` into the `test:guides` script and every
  fleet target declares the script without it, so each visit's `repair` names the same retained
  difference. Rule which side owns the value and pin the ruling at the next release.
- **fleet**: `scaffold audit` reports an uncovered root `tests/setup.ts` module in a package
  that carries the module with no `tests/setup.test.ts` proof, and the 2026-08-24 adoption wave
  surfaced that advisory across the fleet. The audit recomputes the set; each reported package
  lands the proof and the `setup` project at its next natural release, the way the html and
  middleware rows record their instances.
- **test**: transcribe the remaining guide fences under the placement rule that landed
  2026-08-24 (a carrier lives in the project that can run it; browser carriers live in
  `tests/src/browser/` with guide markers, and `tests/guides.test.ts` holds an executed presence
  guard). The `contrast`, `readRing`, journal, and wait-cleanup fences carried that day. The
  measured residue, by heading: the throw-capture fence's `SyntaxError` and thrown-`undefined`
  claims; "Copy a JSON value"; "Prove a guard is total"; "Prove a wire fixpoint"; "Read a source
  inventory"; the scratch-directory fences; "Give everything back in one hook"; "Answer a real
  request on a loopback port"; "Probe what the host supports"; "Refuse an escaping path in your
  own fixture"; the wait fence's `retryUntil` half; and the browser set — "Build and mount a
  fixture", "Drive an interface the way a person does", "Drive a field the component listens
  to", the theme-token fence, "Find a rule in the cascade", "Remove an IndexedDB database",
  "Place a capture portfolio". The guide also carries a directional `below` near the Threat
  model cross-reference; the writing rule replaces it with `later` in the same release.
- **mcp**: `StdioServerTransport.send` discards its write's outcome — `#output.write` with no
  return check, no callback, and no `error` subscription on the output stream. Rule on
  backpressure and error surfacing for caller-owned output streams, and pin the ruling. Both
  design lanes ruled it outside the delivery row's scope on 2026-08-24.
- **supervisor**: adopt `ProcessOptions.delivery` where each consumer meets stdin-delivery
  failure, and close the `CLIProvider` race between `ProcessOptions.on` registration and early
  child output; the timeout backstop retires only after that adoption. The mcp half closed
  2026-08-24: the stdio client transport carries a defaulted `delivery` bound with the
  send-failure voice split and executed pins.
- **supervisor**: rule on the first-unparseable-line policy — whether a stream's first
  non-JSON line fails fast or accumulates — and pin the ruling.
- **supervisor**: `tests/app/server/fixtures/claude.mjs` orphans itself on every run and never exits.
  It blocks on `for await (const chunk of process.stdin)`, so a spawn whose stdin is never closed
  parks it forever. Measured 2026-08-23: one instance had survived 7h46m holding 57MB, and a fresh
  run leaked another within seconds — its parent is already PID 1 at 17 seconds old. Each leak costs
  about 50MB and they accumulate across runs until the container is reclaimed. The fixture needs its
  stdin closed by whatever spawns it, or a guard that exits when stdin is not a pipe.
- **probe**: a mintty-backed TTY fixture where `/usr/bin/script` is absent stays Windows-host
  work; the trigger is the first Windows campaign that runs the bin suite there. The Linux
  acceptance recorded 2026-08-24: the `script`-guarded proofs execute rather than skip on this
  host — the bin suite passes complete with no skipped case.
- **middleware**: `tests/setupServer.ts` exports the request-tally and closed-handle helpers
  with no `tests/setup*.test.ts` proof and no registered `setup` project. The workspace rules
  move the proof with the family, so the registration, the `test:setup` script, and the proof
  land together at the next release — the shape probe and html closed 2026-08-24.
- **html**: `tests/setup.ts` exists with no `tests/setup.test.ts` proof — `scaffold audit`
  reports the uncovered module. The proof and the `setup` project land at the next release.
- **html**: `NAMED_ENTITIES` is asserted by size beside the entity audit and again in the
  exhaustive-decode test. The membership-strength question — whether size plus spot membership
  proves the reviewed set — stayed open in the 2026-08-24 design round; rule and pin at the
  next release.
- **process**: the `ProcessManager.test.ts` negative assertion is weak by its own admission — a
  change that stopped spawning also passes it. Strengthen it to assert the spawn happened, at
  the next release.
- **process**: a spawning proof sits in the shared `src:server` project. Place the expensive
  proof per the workspace project rules at the next release.
- **brief**: the published `Interpretation` member names live as an array literal inside a
  `BriefCompiler` method. The centralization law places that data in `src/core/constants.ts` as
  a frozen constant; move it with its consumers at the next release.

## 2. Design and research records

- **Guide mirrors track upstream `main`, not the catalog release.** `Upstream` fetches guides
  from `raw.githubusercontent.com` on `main` and versions from `registry.npmjs.org`, so the
  two are independent by construction: between publishes a mirror is the branch's content and
  nothing more, and mirror bytes are never evidence for the version the catalog names.
  Publish a dependency before publishing any package that refreshes and ships its guide.
  Revisit a release-pinned mirror only when the fleet publishes a stable per-release ref.
- **Sweeps with no honest mechanical form**: the model-routing and version-catalog sweep stays
  review-owned, because the version-catalog half has no membership rule separating a catalog table
  from a permitted version value and every mechanical form tried reds a healthy reference. The
  landed template-TODO instrument scans literal `TODO` occurrences outside inline backtick spans
  and fences indented no more than three spaces in canonical `SKILL.md` files, the
  `references/*.md` files they name, and matching provider-bridge `SKILL.md` files. The landed
  strict skill-directory inventory admits `SKILL.md`, `agents/openai.yaml`, the direct
  `references/*.md` files named by `SKILL.md`, and only the `agents/` and `references/`
  directories.
