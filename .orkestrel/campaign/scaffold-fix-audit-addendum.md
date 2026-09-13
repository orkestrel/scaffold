# Addendum — objective lane assignment (append to the brief, do not replace it)

This round decides whether `@orkestrel/scaffold@0.0.65` uploads to the public npm registry, where
the version is spent. It is the tooling package every fleet package consumes and vendors files
into every target.

You hold the **objective lane**: correctness, constraints, and what the code and contracts
actually permit. A subjective lane runs concurrently on Opus 5. You are not shown its answer and
must not ask for it.

- U-floor was implemented by you (Sol): the constants, the emit, `scaffold`'s `engines`. U-dist and
  U-probe were implemented by Opus 5; the emit-order integration and every brief, by the
  Orchestrator. Attack your own half — claims 1, 2, 11, 12 — harder than the rest. You are the
  round's independent check on the Opus-authored claims 3 through 8.
- You have a shell in a `read-only` sandbox. Run what settles a claim: read the cited source
  lines; call `matchesEngines` and `blueprintToManifest` in-process through `node -e` against
  `dist/`; run `npx oxfmt --check` over an emitted manifest written to the system temporary
  directory to prove the fixed point; compare `host.json` against what `dist/host` digests; grep
  `ROADMAP.md` for the removed phrase; read `git log` and `git diff` (reading commands work;
  anything taking the index lock does not).
- The sandbox denies network and denies a process spawned from inside a test, so
  `npm run test:distribution`, `npm run test:setup`, and `npm run test:src:server` cannot be
  re-run inside this exec. Claims 3, 4, 5, 6, 8, 10, 13 rest on the retained host logs the brief
  names — rule on them by reading those logs against the source rather than by re-running.
  Return `UNRESOLVED` with the exact settling command only where the log cannot settle it.
- The sandbox writes nothing into the tree. Any probe goes to the system temporary directory. Your
  report is your final message; the Orchestrator reads it from the `--output-last-message` file.
- Claim 12's Node 24 admission and Unknown U3's Windows behaviour are unmeasurable on this host.
  Rule from the code and name what would settle each.

Note: the brief's Output section calls for verdicts 1 through 15, but the Numbered falsifiable
claims section lists only claims 1 through 14. Verdict on claims 1 through 14 as numbered, and
flag this mismatch explicitly rather than inventing a claim 15.
