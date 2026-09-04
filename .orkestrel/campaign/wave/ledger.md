# Publish wave — ledger (2026-09-04)

The release runs from `report.md` under the `orkestrel-publish` skill. Rows record what landed and what the registry confirmed; the order is derived per round from the catalog and the peer edges, never written ahead.

| When (UTC) | Package | Version | Round | Registry confirmation | Notes |
| --- | --- | --- | --- | --- | --- |
| 19:33 | `@orkestrel/scaffold` | `0.0.61` | own account, before L0 | `npm view @orkestrel/scaffold@0.0.61 version` served `0.0.61` at 19:33 | Uploaded with a one-time code under `instruments/publish-one.sh` (`publish-scaffold.log.txt`). Preparation commit `fafab919`: the generated-manifest fixtures moved with the bump. |

## The login

The registry answered the web login's polls inconsistently through this host's proxy: the proxy leaves from several addresses, and a poll from an address other than the one that minted the session answers `403 {"message":"forbidden"}`, which npm 10 and npm 11 read as web login unsupported and drop to the legacy prompt. On one kept-alive connection the polls answer `202` every 3 seconds (`instruments/login-diag.sh`). `instruments/login-retry.sh` mints attempts until one survives its first poll and relays that URL; the owner's click landed on the third relayed link at 19:32, and `npm whoami` answered.
