Changed only `tmp/pass/guide-artifact-stage/smoke.mjs` and `smoke.cjs`.

Exact changes:

```diff
-import { createSurfaceSymbolContract } from '@orkestrel/contract'
-import { createGuide, createSource, findDrift } from '@orkestrel/guide'
+import { deepEqual } from 'node:assert/strict'
+import { createGuide, createSource, createSurfaceSymbolContract, findDrift } from '@orkestrel/guide'

-if (JSON.stringify(drift) !== JSON.stringify(EXPECTED)) throw new Error(...)
+deepEqual(drift, EXPECTED, 'Guide did not report the documented findDrift disagreement.')

-throw new Error('Contract did not accept the Markdown surface symbol.')
+throw new Error('Guide surface-symbol contract did not accept the Markdown surface symbol.')
```

Each driver now also compares physical root-package identity for:

- Guide → Contract, Markdown, HTML
- Markdown → Contract, HTML
- HTML → Contract

The existing ESM/CJS artifact-entry hash checks remain unchanged.

`node --check tmp/pass/guide-artifact-stage/smoke.mjs` exited 0.  
`node --check tmp/pass/guide-artifact-stage/smoke.cjs` exited 0.
