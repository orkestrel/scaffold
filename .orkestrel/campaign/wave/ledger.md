# Publish wave — ledger (2026-09-04)

The release runs from `report.md` under the `orkestrel-publish` skill. Rows record what landed and what the registry confirmed; the order is derived per round from the catalog and the peer edges, never written ahead.

| When (UTC) | Package | Version | Round | Registry confirmation | Notes |
| --- | --- | --- | --- | --- | --- |
| 19:33 | `@orkestrel/scaffold` | `0.0.61` | own account, before L0 | `npm view @orkestrel/scaffold@0.0.61 version` served `0.0.61` at 19:33 | Uploaded with a one-time code under `instruments/publish-one.sh` (`publish-scaffold.log.txt`). Preparation commit `fafab919`: the generated-manifest fixtures moved with the bump. |

| 19:44 | `@orkestrel/guide` | `0.0.16` | own account, before L0 (re-baseline) | `npm view @orkestrel/guide@0.0.16 version` served `0.0.16` at 19:44 | Uploaded with a one-time code (`publish-guide.log.txt`). Release commits `3c05022` and `f5b19f7` (the lockfile regenerated for the vendored toolchain ranges). Publishes again at L3 after its runtime ranges move. |

## The login

The registry answered the web login's polls inconsistently through this host's proxy: the proxy leaves from several addresses, and a poll from an address other than the one that minted the session answers `403 {"message":"forbidden"}`, which npm 10 and npm 11 read as web login unsupported and drop to the legacy prompt. On one kept-alive connection the polls answer `202` every 3 seconds (`instruments/login-diag.sh`). `instruments/login-retry.sh` mints attempts until one survives its first poll and relays that URL; the owner's click landed on the third relayed link at 19:32, and `npm whoami` answered.

## Re-baseline at L0: guide publishes early on its own account

The first L0 visits reddened at `check`: `npm install` restored the registry's `@orkestrel/guide` 0.0.15 over the staged tip, and every consumer's `tests/guides.test.ts` reads the tip's renamed API (`extractFenceImports`, `findMissingSymbols`, `computeSymbolKey`, `symbol.keyword`), which the catalog would publish only at L3. Guide's tip typechecks against the registry's contract 0.0.15 and markdown 0.0.12 (`npm ci` then `npm run check`, exit 0 at 19:39 UTC), so guide takes the same shape as scaffold: it publishes on its own account as 0.0.16 ahead of L0, every consumer's visit re-pins it from the registry, and guide publishes again at its L3 slot after its runtime ranges move. Probe has no such consumer: only probe's own tests import `@orkestrel/probe`. The visits' `scaffold overwrite` output (the refreshed catalog table and guide mirrors, test's `configs/browsers.ts`) is committed per target as "Adopt the vendored host of @orkestrel/scaffold 0.0.61" so the re-run starts from a committed baseline. The visit script's successor (`instruments/prep-one-2.sh`) commits the re-pin and bump before the overwrite, which refuses a tree carrying uncommitted changes.
