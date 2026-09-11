# Supported toolchain updates during dependent preparation

Brief's online Scaffold overwrite and audit passed, then final registry installation
passed. The preparation carrier stopped because its external-range equality guard
refused the generated api-extractor update from ^7.59.0 to ^7.59.1. The same
supported overwrite updates the declared Node types, formatter, linter and Vite
ranges. This is an overly broad preparation guard, not a package gate failure.

The owner requested current tooling through supported Scaffold propagation. Admit
updates to existing Scaffold-owned development tools: api-extractor, Node types,
Oxfmt, Oxlint, TypeScript, Vite and Vitest, plus the browser runner and Playwright
where the target declares them. Verify their final ranges against fresh public
registry evidence and record before and after values. Preserve each section and
key; do not add a dependency or widen ownership to package-specific extras.

Preserve MCP's conformance range exactly. Preserve optional peer metadata and
every reviewed runtime/peer/development Orkestrel pin. The final registry install,
prepublish and actual-pack comparison must use the updated toolchain. A moved
distributable remains part of the already-pending release bump, not a reason to
pretend the tooling update had no effect.

Brief's preparation commit aeea7a504f9cff8342797bd26b35213536df73f1 is already pushed
to its campaign branch. The checkout contains supported overwrite changes and
retired scripts/docs.ts is deleted. Preserve that state and resume after the
stopped external comparison; never replay preparation from an assumed clean tree.
Final gates, pack and main closure have not run for this registry visit.
