# Probe source-landing path amendment

## Outcome

The Probe-specific source allowlist now admits the RuntimeStage source and Probe bin test. The
Agent branch still refuses those paths. Every other carrier byte remains unchanged.

## Touched paths

- `tmp/pass/commit-agent-probe-native-entry.sh`
- `tmp/units/d7n-probe-source-landing-paths-report.md`

## Exact carrier delta

```diff
-guides/probe.md|tests/setupServer.ts|tests/setupServer.test.ts
+guides/probe.md|src/server/stages/RuntimeStage.ts|tests/setupServer.ts|tests/setupServer.test.ts|tests/src/bin/main.test.ts
```

## Syntax validation

```text
& 'C:/Users/mikes/scoop/apps/git/current/usr/bin/bash.exe' -n tmp/pass/commit-agent-probe-native-entry.sh
exit 0
```

No landing carrier, product command, release command, install, build, commit, push, or publish ran.

## Shared-file patches

None.
