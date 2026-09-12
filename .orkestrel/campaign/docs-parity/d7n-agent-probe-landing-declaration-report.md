# Probe declaration landing successor

## Outcome

The native-entry commit successor admits `guides/probe.md` only for Probe. Every other byte matches
the retained prior instrument.

## Touched paths

- `tmp/pass/commit-agent-probe-native-entry.sh`
- `tmp/units/d7n-agent-probe-landing-declaration-report.md`

## Exact retained-instrument delta

```text
{.orkestrel/campaign/docs-parity/instruments/d7/foundation-native => tmp/pass}/commit-agent-probe-native-entry.sh | 2 +-
1 file changed, 1 insertion(+), 1 deletion(-)
```

The changed allowlist branch is:

```text
guides/probe.md|tests/setupServer.ts|tests/setupServer.test.ts) case "$package" in probe)
```

## Scoped validation

```text
& 'C:/Users/mikes/scoop/apps/git/current/usr/bin/bash.exe' -n tmp/pass/commit-agent-probe-native-entry.sh
exit 0
```

The retained-instrument comparison emitted no whitespace diagnostics from
`git diff --no-index --check`.

No landing carrier, install, build, gate, commit, push, or target-package command ran.
