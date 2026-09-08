# Prepare a read-only heading reproduction

Act as a bounded builder. Read AGENTS.md, .agents/orchestration.md, the portability,
writing, quality, typescript, and tests rules, the campaign handoff, and the guide's
extractSurface declaration. Spawn nothing. No package source changes are authorized.

Own C:/Users/mikes/WebstormProjects/mcp/tmp/d7n-guide-heading/probe.mjs and
C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/probe-guide-heading.sh only.
Other writers own package source; preserve their work. Do not install, commit, push,
publish, read credentials, or run the script body. Syntax checks are allowed.

Write an mjs instrument importing extractSurface from @orkestrel/guide and createMarkdown
from @orkestrel/markdown, resolving through mcp's installed dependencies. Use Node's
strict assert and crypto/fs APIs to print the installed guide dist sha256 prefix.
Resolve its dist/src/core/index.js from the installed package; do not import a sibling
source checkout. Read no credential path.

Construct a minimal Markdown string with # Guide, ## Surface, a neutral demonstration
heading ### Bind a widget to a transport, and a subsequent ### Classes table whose
columns are API, Kind, Summary and whose row is `Widget`, class, Represents a widget.
Construct the same string changing only that demonstration heading to
### Bind a `Widget` to a transport. Run createMarkdown(text).document and extractSurface
for each. Print the actual records with labels neutral and embedded. Assert that neutral
equals [{ name: 'Widget', keyword: 'class', summary: 'Represents a widget.' }], then
assert embedded equals neutral. Do not catch assertion errors or replace them with green.
This is a runtime reproduction over string data, not a production TypeScript edit.

Write a Git Bash launcher with set -eu and the standard pass-env.sh source. Execute the
mjs with node, write stdout/stderr to tmp/pass/d7n-guide-heading.log.txt, and propagate
the process exit. Use forward-slash paths and no installs. Main runs this body alone.

Return a report at tmp/units/d7n-guide-heading-probe-instrument-report.md with only
node --check and bash -n readings and any deviation. Do not infer the runtime result.
