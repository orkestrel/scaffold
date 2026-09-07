import sys
sys.path.insert(0, 'tmp/d7n-form-converge')
from edit import apply

pairs = [(
"""### Errors

`FormError` carries a machine-readable `code` and an optional structured `context`.""",
"""## Errors

`FormError` carries a machine-readable `code` and an optional structured `context`.""")]

apply('guides/form.md', pairs)
