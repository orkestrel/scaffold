import sys
sys.path.insert(0, 'tmp/d7n-form-converge')
from edit import apply

old = """## Surface

### Open a form, answer it, and settle it
"""
new = """## Surface

Everything in this guide is exported from `@orkestrel/form` ([`src/core`](../src/core)). Nothing is
internal: every declaration in the module is reachable from the barrel, so a consumer holds exactly
the mechanisms the package uses on itself.

### Open a form, answer it, and settle it
"""

old2 = """```

Everything in this guide is exported from `@orkestrel/form` ([`src/core`](../src/core)). Nothing is internal:
every declaration in the module is reachable from the barrel, so a consumer holds exactly the
mechanisms the package uses on itself.

### Schema and fields"""
new2 = """```

### Schema and fields"""

apply('guides/form.md', [(old, new), (old2, new2)])
