import sys
sys.path.insert(0, 'tmp/d7n-form-converge')
from edit import apply

CONVENTION = (
    "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an\n"
    "optional member and `plus` introducing its call-signature members, and a type alias's own type\n"
    "literal with a union's arms escaped as `\\|`."
)

pairs = []

# 1. Schema and fields intro
pairs.append((
"""The document itself — what a form asks, in the order it asks it. All data, no behavior.

| API | Kind | Shape | Summary |""",
"""The document itself — what a form asks, in the order it asks it. All data, no behavior. Each
control's own interface adds its members to `FieldBase`, and the control values themselves are
worked through in [Controls](#controls).

""" + CONVENTION + """

| API | Kind | Shape | Summary |"""))

# 2. Answers and rules intro
pairs.append((
"""What a form holds, what its answers must satisfy, and how a failure reports itself.

| API | Kind | Shape | Summary |""",
"""What a form holds, what its answers must satisfy, and how a failure reports itself.

""" + CONVENTION + """

| API | Kind | Shape | Summary |"""))

# 3. The form intro
pairs.append((
"""The entity, its factory, its contract, and the error it raises.

| API | Kind | Shape | Summary |""",
"""The entity, its factory, its contract, and the error it raises.

""" + CONVENTION + """ A class row and a function row carry none.

| API | Kind | Shape | Summary |"""))

# 4. the readonly-member paragraph after the third table
pairs.append((
"""`FormInterface`'s readonly data members stay here rather than in `## Methods`: `emitter` (the typed
event surface), `schema` (the owned frozen copy), `values` (the answers the form holds), `baseline`
(the answers the form opened with, fixed for its whole life), `errors` (current after each completed
evaluation), `touched` (the fields somebody has visited), `disabled` (the fields out of the form),
`status`, `valid`, `dirty`, and `answer` (the promise that resolves on the first valid submit).""",
"""`FormInterface`'s readonly data members are the names in its `Shape` cell before `plus`, and they
stay here rather than in `## Methods`; the call-signature members after `plus` are documented under
[Methods](#methods)."""))

# 5. Constants intro
pairs.append((
"""The control and status registries, the permitted-member table each control is checked against, the
default rule copy, and the shipped patterns — every one of them frozen, so a shared `RegExp` cannot
be recompiled under a consumer. The budgets are numbers.""",
"""The control and status registries, the permitted-member table each control is checked against, the
default rule copy, and the shipped patterns — every one of them frozen, so a shared `RegExp` cannot
be recompiled under a consumer. `EMAIL_PATTERN`, `URL_PATTERN`, `ALPHANUMERIC_PATTERN`, and
`INTEGER_PATTERN` are the tests behind the rules they are named for, `INTEGER_PATTERN` on a text
control; `COLOR_PATTERN`, `DATE_PATTERN`, `TIME_PATTERN`, and `DATETIME_PATTERN` are the shapes a
`color`, `date`, `time`, and `datetime` value must have. The budgets are numbers, and
[Budgets](#budgets) carries each one's value beside the unit it counts."""))

# 6. Guards intro
pairs.append((
"""Total `is*` guards over unknown input. None throws, none coerces, and each returns `false` for
anything off-shape — including a hostile prototype, a symbol key, or a cyclic value.""",
"""Total `is*` guards over unknown input. None throws, none coerces, and each returns `false` for
anything off-shape — including a hostile prototype, a symbol key, or a cyclic value. `isFieldValue`
also refuses a number that is not finite, so `NaN` and `Infinity` are not field values, and
`isFormSchema` reads structure alone: domain soundness is `auditSchema`'s question."""))

# 7. Methods intro
pairs.append((
"""The public methods of `FormInterface`, which the `Form` class implements exactly and adds nothing
to. Its readonly data members — `emitter`, `schema`, `values`, `baseline`, `errors`, `touched`,
`disabled`, `status`, `valid`, `dirty`, and `answer` — stay in the preceding `## Surface` rows and
are not repeated here.""",
"""The public methods of `FormInterface`, which the `Form` class implements exactly and adds nothing
to. Its readonly data members stay in the preceding `## Surface` rows, in the `Shape` cell before
`plus`, and are not repeated here.

`fill` takes one name and one value, or a whole record. `disable` and `enable` each take no argument
for every field, one name for one field, or a list of names for those. A record and a list are
checked in full before anything moves, so a refused call changes nothing."""))

apply('guides/form.md', pairs)
