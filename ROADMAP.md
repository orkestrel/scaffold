# ROADMAP

The plan of record after the ROADMAP-rows campaign of 2026-08-25. That campaign published
scaffold 0.0.52, registry-confirmed the same day, and closed its adoption wave the same day —
every fleet target re-pinned, repaired, gated green, and pushed. It closed the scaffold, fleet,
test, mcp, middleware, html, process, and brief rows the previous revision carried, through
implementation, cross-engine audit, the setup-proof wave over every published package, and the
mcp 0.0.23, brief 0.0.6, and probe 0.0.5 releases. This file owns everything still open. Campaign
detail is recoverable from git history by hash; no campaign folder is the plan of record.

## 1. Package work, scheduled by each package's next natural release

- **scaffold**: the blocked-`configs` `repair` message claims `test:setup is already declared`
  while the declared manifest carries no such script — the 2026-08-25 wave recorded the false
  clause across its visits, and the block and its recovery are correct. Correct the clause at the
  next release, and in the same release rule on `npm pkg set` appending `test:setup` after
  `prepack` rather than beside the other `test:*` keys, and on `repair --groups manifest`
  rewriting the `@orkestrel/scaffold` range as a side effect of writing a script, observed in the
  test repository that day.
- **fleet**: `isBrowserVuePath` repeats across packages, and the qualifier, markdown, and
  interpret visits record it with no `app/` tree to accept, recorded across the 2026-08-25 wave. The next cross-package alignment campaign owns the
  dedup-or-delete ruling.
- **agent**: `tests/setup.ts` registers the conversation-store battery with `describe`, `it`, and
  `expect`, which the shared-infrastructure rule forbids. Move the registration into the store
  twin suites at the next release.
- **database**: the same class — `conformDriver` in `tests/setup.ts` carries `describe`, `it`, and
  `expect`, so the battery registration moves into the consuming suites at the next release. In
  the same release, `createIntegrationDatabase` in `tests/setupBrowser.ts` is imported by no
  suite, so its opened half is proven nowhere: give it a consumer or remove it.
- **html**: the `src/core/constants.ts` TSDoc states counts of the entity set and carries a stale
  snapshot date, recorded 2026-08-25. Rewrite the comment under the writing rules at the next
  release.
- **interpret and reason**: the `TRICKY_KEYS` TSDoc in each package misdescribes its stored bytes,
  claiming a combining sequence and an NFC-labile form where the stored form is precomposed and
  NFC-stable, and the reason package's `INTEGER_KEY_SUBJECT` comment states a wrong `Object.keys`
  order, recorded 2026-08-25. Correct each comment at its package's next release.
- **mcp**: `buildElement` in `tests/setupBrowser.ts` has no consumer; give it a `src:browser`
  proof or remove it at the next release. The 2026-08-25 audit also referred the post-close `send`
  pin for the Node WebSocket client transport and the race-abandoned `writeLine` callback on a
  wedged stream; rule on each in the same release.
- **msg**: `patchBytes` documents a copy-only contract and mutates its `Buffer` source through a
  `.slice()` view. The defect is latent, because the wave's 2026-08-25 proof pinned the copying
  route; align the implementation with the contract at the next release.
- **ollama**: `tests/setupService.test.ts` declares its protocol-faithful daemon fixture locally,
  because the shared setup modules sat outside the 2026-08-25 unit's scope. Move the fixture into
  the shared module when a second consumer appears.
- **probe**: a boot whose control inspection expires rejects silently — no `arm` event, no `error`
  event, invisible until the next `prove` call retries the arming — which the 0.0.5 release
  diagnosed only after repeated runs on 2026-08-25; rule on surfacing boot rejection at the next
  release. Run `npm pkg fix` at the next manifest touch.
- **probe**: a mintty-backed TTY fixture where `/usr/bin/script` is absent stays Windows-host
  work; the trigger is the first Windows campaign that runs the bin suite there. The Linux
  acceptance recorded 2026-08-24: the `script`-guarded proofs execute rather than skip on this
  host — the bin suite passes complete with no skipped case.
- **qualifier**: `buildHostileRecord`'s `__proto__` literal is inert and its doc comment overstates
  the hostility, recorded 2026-08-25. Correct the comment or the fixture at the next release.
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
- **table**: `readTableError` reports a non-thrown case as `undefined`, which is indistinguishable
  from success, recorded 2026-08-25. Rule whether the helper names the non-throw, at the next
  release.
- **test**: `src/browser/helpers.ts` imports `vitest/browser` at module scope, so the published
  browser barrel cannot load outside Browser Mode, and the repository's own `tests/setupBrowser.ts`
  works around that with a DOM-guarded dynamic import, recorded 2026-08-25. Rule whether the
  published barrel owns a lazy import, and pin the ruling at the next release.

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
