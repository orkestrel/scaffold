# Agent 0.0.30 publication

Agent 0.0.30 is published and registry-confirmed on 2026-10-11. The primary agent checkout remains clean on verified main ee734c3; no source or package bytes changed. Desk published-package pins and checks remain pending.

The fresh user-authorized OTP upload succeeded. The publish runner reported acceptance and registry confirmation, exit 0 uncapped in 77708 ms under PID19112. A separate `npm view @orkestrel/agent@0.0.30 version dist.shasum dist.integrity --json` call returned version 0.0.30, SHA-1 `1bb0bb123e4a2414a9a99b5dc73ad41e5566b2ca`, and integrity `sha512-HQkhs+rq9iLoPiXQ4/Bw1TeLvwQChPECVBMzMTC23o9aUW3BNpBCVeCZFMcQTjeSjiJobVrTSpA+1W2uhDaFhw==`. Both archive identifiers match the independently verified release archive. An initial E404 during npm processing resolved without another upload.

The successful runner journals remain local to agent at `tmp/units/agent-0030-publish-otp-2.stdout.log` and `tmp/units/agent-0030-publish-otp-2.stderr.log`.

The user explicitly requested that Codex run the login and OTP upload. A direct `npm whoami` call succeeded before upload. The publish skill's built window runner submitted the package from the primary clone through the dispatch launcher under a 300-second cap. The runner exited 3 uncapped in 2690 ms and reported `refused EOTP`; its process PID58944 is gone. No retry reused that code. The following registry read returned E404 for 0.0.30.

Local agent evidence is retained at `tmp/units/agent-0030-publish-otp.stdout.log`, `tmp/units/agent-0030-publish-otp.stderr.log`, and `tmp/units/publish--orkestrel-agent.log`. These local journals are not committed. Authentication files and user codes are not part of the release record.

See [package verification](publication-readiness.md) for complete identity to the verified archive. Complete the published-package consumer checks after resolving each consumer's required registry dependencies.
