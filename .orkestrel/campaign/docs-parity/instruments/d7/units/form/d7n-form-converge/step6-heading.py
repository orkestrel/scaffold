import sys
sys.path.insert(0, 'tmp/d7n-form-converge')
from edit import apply

pairs = [(
"""## Surface

Open a form, answer it, and settle it:

```ts
import { createForm } from '@orkestrel/form'""",
"""## Surface

### Open a form, answer it, and settle it

```ts
import { createForm } from '@orkestrel/form'"""),
(
"""- [`tests/guides.test.ts`](../tests/guides.test.ts) — the `## Surface` ↔ barrel bijection, the
  `FormInterface` ↔ `Form` method bijection, and the preceding flagship fences executed against the
  real source so a documented value that the code contradicts fails.""",
"""- [`tests/guides.test.ts`](../tests/guides.test.ts) — the `## Surface` ↔ barrel bijection, the
  `FormInterface` ↔ `Form` method bijection, and the equality gate: every `Summary` cell against its
  declaration's description paragraph, the titled `Open a form, answer it, and settle it` fence
  against the `@example` block of that title (pinned so the titled pair cannot be retired silently),
  and the README pitch against this guide's tagline. It also runs the preceding flagship fences
  against the real source, so a documented value that the code contradicts fails."""),
]

apply('guides/form.md', pairs)
