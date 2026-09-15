# Probe P1 — agent runtime closure, root entries, Node-only imports (2026-09-15)

Instrument: `scratchpad/probe-closure.sh` (retained below), run by the Orchestrator over
`C:/Users/mikes/WebstormProjects/agent/node_modules/@orkestrel/*/dist/src/core/index.js`.
Membership rule: a root entry that contains `from 'node:'`, `from "node:"`, `require('node:')`, or a
read of `process.env|platform|versions|cwd|argv`.

Reading (root entries of the agent's runtime closure):

| Package   | node imports | process reads |
| --------- | ------------ | ------------- |
| abort     | 0            | 0             |
| budget    | 0            | 0             |
| contract  | 0            | 0             |
| database  | 0            | 0             |
| emitter   | 0            | 0             |
| queue     | 0            | 0             |
| timeout   | 0            | 0             |
| tool      | 0            | 0             |
| workflow  | 0            | 0             |
| workspace | 0            | 0             |

Also read: html 0/0, markdown 0/0, mcp core 0/0, router core 0/0, sse 0/0, codec 0/0.

Controls (drawn from outside the population — entries that must show a hit): `lsp` core 4 node
imports, `scaffold` core 15 node imports and 13 process reads, `database/dist/src/server/index.js`
2 node imports. The instrument sees the class it is built to see. `workflow/dist/src/server/index.js`
showed 0, so the workflow server entry reaches Node another way; that entry is outside the agent's
core graph and is not a campaign subject.

What this established: no root entry the agent's core graph imports carries a static Node-only
import or a `process` read. What it did not establish: that each entry evaluates in a real browser
page (a dynamic `import()`, a global read the pattern does not name, or a top-level side effect is
outside this instrument). A Chromium receipt over the built closure settles that, and the design
round decides which unit takes it.

Instrument text:

```bash
cd agent/node_modules/@orkestrel
for p in */; do f="$p/dist/src/core/index.js"; [ -f "$f" ] && echo "$p $(grep -c -E "from ['\"]node:|require\(['\"]node:" "$f") $(grep -c -E "\bprocess\.(env|platform|versions|cwd|argv)\b" "$f")"; done
```
