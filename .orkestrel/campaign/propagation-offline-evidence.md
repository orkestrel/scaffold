# Correction — the first propagation never carried the vendored bytes

An audit lane found that `.orkestrel/campaign/propagation-evidence.md` proves less than it claims,
and the Orchestrator reproduced the finding rather than taking it on report. This corrects the
record.

## What was wrong

`propagation/visit.sh` ran `overwrite` with no `--offline`, so the vendored floor came from the
**live upstream inventory** — the published 0.0.49 bytes — rather than from the release candidate's
own `dist/host`. Measured after that run: every target still carried `origin/main`'s vendored bytes.

```text
tests/config.test.ts      tip d8e0629e7aa3f3cb   abort c48dd9b1e4bdc03d   router c48dd9b1e4bdc03d
.agents/orchestration.md  tip d0ab324e6fc707ed   abort 02743f036396cd08   router 02743f036396cd08
```

So the earlier phase proved the **generated artifacts and the manifest write** across ten packages,
and proved nothing about the vendored half — which is the defining half of a vendored-byte release.
The finding is against the Orchestrator's evidence, not against the code.

## The visit that closes it

Against a pristine clone, `audit --offline` reports exactly the four paths the candidate's own floor
moves:

```text
stale   content  vite.config.ts
missing presence tests/distribution.test.ts
stale   content  tests/config.test.ts
stale   content  .agents/orchestration.md
```

Then `overwrite --offline` lands both vendored files at the tip's bytes, and every gate stays green:

```text
before: config=c48dd9b1e4bdc03d  orch=02743f036396cd08
after:  config=d8e0629e7aa3f3cb  orch=d0ab324e6fc707ed
tip:    config=d8e0629e7aa3f3cb  orch=d0ab324e6fc707ed
format:check=0  lint:check=0  check=0  build=0  test=0
```

The vendored propagation works, and a target taking it stays green. `propagation/offline-visit.sh`
is the instrument.

## Two conditions the operator meets, both pre-existing

**`overwrite --offline` exits 1 even when the write succeeds.** Its catalog step refuses the flag:
`USAGE: 'catalog' does not take --offline`. The published **0.0.49** does the same against a fresh
clone — it writes, then exits 1 on the same message. A release wave that pins distributed floors,
which is the documented reason to pass `--offline`, therefore reads as a failed verb. Pre-existing,
so recorded here for the change that owns it rather than reopening this scope. An operator scripting
the wave must read the write's own report rather than the verb's exit code, or drop `--offline` and
accept the live floor.

**A hard-linked checkout is refused as unreadable.** `readFileHex` refuses any file whose link count
is not 1, on the read path, and the CLI reports "carries no readable manifest" for a manifest Node
reads perfectly. That reaches `cp -al`, `rsync --link-dest`, and store-linked installs. Pre-existing
on `origin/main`, where the same rule appears in the same file.

An audit lane reported this against the propagated targets. Its demonstration was self-inflicted —
the link partner is that lane's own inspection copy under its scratch directory, which is what broke
the Orchestrator's re-run — but the behaviour it names is real and reproduces on any hard-linked
tree. Recorded for the change that owns it.
