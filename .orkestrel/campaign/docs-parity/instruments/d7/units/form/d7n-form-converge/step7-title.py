import sys
sys.path.insert(0, 'tmp/d7n-form-converge')
from edit import apply

pairs = [(
""" *   is one its field's control cannot hold.
 * @example
 * ```ts
 * const form = createForm({""",
""" *   is one its field's control cannot hold.
 * @example Open a form, answer it, and settle it
 * ```ts
 * const form = createForm({"""),
]

apply('src/core/factories.ts', pairs)
