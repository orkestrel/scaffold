# MCP source-first red evidence recovery

## Result

The exact source-first Summary-red stdout and stderr are unavailable in the
remaining task context and retained receipts. No recovered tool transcript can be
provided without reconstructing output that was not preserved.

## Available provenance

The original command was run from
`C:/Users/mikes/WebstormProjects/mcp` through the environment-preserving unit
script:

```text
C:/Users/mikes/scoop/apps/git/current/bin/bash.exe tmp/d7n-mcp-dependent-fix/run-native.sh
```

At execution, native `GuideCommand` migration was complete, source descriptions
had been changed, and the corresponding guide cells had not been reconciled.

The returned implementation report records exit `1` and its Vitest summary, but
does not contain the diagnostic body. That report is a later summary, not a raw
receipt, so it is not relabeled here as recovered transcript evidence.

## Recovery limit

Searches of the retained Scaffold unit and pass receipts found final and later
MCP gate output, diff snapshots, and the returned summary. They did not find the
historic source-first diagnostic. No MCP command was rerun and no MCP checkout
file was read or changed during this recovery.
