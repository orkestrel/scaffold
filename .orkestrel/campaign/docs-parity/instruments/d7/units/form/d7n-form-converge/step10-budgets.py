import sys
sys.path.insert(0, 'tmp/d7n-form-converge')
from edit import apply
apply('guides/form.md', [(
"""`color`, `date`, `time`, and `datetime` value must have. The budgets are numbers, and
[Budgets](#budgets) carries each one's value beside the unit it counts.""",
"""`color`, `date`, `time`, and `datetime` value must have. The budgets are numbers, and each one's
value is stated where its section works it through: the ceilings in [Budgets](#budgets) beside the
unit each counts, and `PATTERN_LIMIT` in
[Patterns and where trust lives](#patterns-and-where-trust-lives).""")])
