import io, re, sys

PATH = 'guides/form.md'
SPLIT = re.compile(r'(?<!\\)\|')

def split_row(line):
    parts = SPLIT.split(line.rstrip('\n'))
    # a table row starts and ends with a pipe, so the outer parts are empty
    assert parts[0].strip() == '' and parts[-1].strip() == '', parts
    return [p.strip() for p in parts[1:-1]]

def build_row(cells):
    return '| ' + ' | '.join(cells) + ' |'

def name_of(cell):
    m = re.search(r'`([^`]+)`', cell)
    return m.group(1) if m else cell

with io.open(PATH, encoding='utf-8', newline='') as fh:
    lines = fh.read().split('\n')

def rewrite(header_index, headers, shapes):
    """header_index is 0-based index of the header row; shapes maps row name to Shape cell."""
    out = []
    i = header_index
    assert lines[i].startswith('|'), lines[i]
    assert set(lines[i + 1].replace('|', '').replace(' ', '')) == {'-'}, lines[i + 1]
    out.append(build_row(headers))
    out.append(build_row(['---'] * len(headers)))
    j = i + 2
    rows = []
    while j < len(lines) and lines[j].startswith('|'):
        cells = split_row(lines[j])
        assert len(cells) == 3, cells
        key = name_of(cells[0])
        assert key in shapes, 'no shape for %s' % key
        rows.append(build_row([cells[0], cells[1], shapes[key], cells[2]]))
        j += 1
    assert len(rows) == len(shapes), (len(rows), len(shapes))
    out.extend(rows)
    lines[i:j] = out
    return len(out) - (j - i)

CONVENTION = (
    "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an "
    "optional member and `plus` introducing its call-signature members, and a type alias's own "
    "type literal with a union's arms escaped as `\\|`."
)

schema_shapes = {
    'FormSchema': '`{ name?, label?, help?, groups?, fields }`',
    'FormGroup': '`{ name, label, help? }`',
    'FormField': '`TextField \\| EditorField \\| PasswordField \\| NumberField \\| DateField \\| TimeField \\| DatetimeField \\| ColorField \\| ConfirmField \\| SelectField \\| CheckboxField \\| FileField`',
    'FieldBase': '`{ name, label?, help?, group?, hidden?, disabled?, locked?, rule?, meta? }`',
    'FieldControl': "`'text' \\| 'editor' \\| 'password' \\| 'number' \\| 'date' \\| 'time' \\| 'datetime' \\| 'color' \\| 'confirm' \\| 'select' \\| 'checkbox' \\| 'file'`",
    'FieldChoice': '`{ value, label, help?, disabled? }`',
    'TextField': '`{ control, default?, placeholder? }`',
    'EditorField': '`{ control, default?, placeholder? }`',
    'PasswordField': '`{ control, mask? }`',
    'NumberField': '`{ control, default?, placeholder? }`',
    'DateField': '`{ control, default? }`',
    'TimeField': '`{ control, default? }`',
    'DatetimeField': '`{ control, default? }`',
    'ColorField': '`{ control, default? }`',
    'ConfirmField': '`{ control, default? }`',
    'SelectField': '`{ control, choices, default?, open? }`',
    'CheckboxField': '`{ control, choices, default? }`',
    'FileField': '`{ control, accept?, multiple? }`',
}

answers_shapes = {
    'FieldValue': '`string \\| number \\| boolean \\| readonly string[]`',
    'FormValues': '`Readonly<Record<string, FieldValue>>`',
    'FieldRule': '`{ required?, minimum?, maximum?, step?, pattern?, email?, url?, integer?, alphanumeric?, custom? }`',
    'FieldRuleName': "`Exclude<keyof FieldRule, 'custom'>`",
    'FieldValidator': '`(value: FieldValue \\| undefined, values: FormValues) => true \\| string`',
    'FieldError': '`{ field, message, rule? }`',
    'EvaluationOptions': '`{ messages?, disabled? }`',
}

form_shapes = {
    'Form': '',
    'FormInterface': '`{ emitter, schema, values, baseline, errors, touched, disabled, status, valid, dirty, answer } plus field, fill, touch, invalidate, disable, enable, submit, clear, destroy`',
    'createForm': '',
    'FormOptions': '`{ on?, error?, values?, messages? }`',
    'FormStatus': "`'editing' \\| 'settled' \\| 'abandoned'`",
    'FormResult': '`Result<FormValues, readonly FieldError[]>`',
    'FormEventMap': '`{ fill, validate, disable, enable, submit, clear, abandon }`',
    'FormError': '',
    'FormErrorCode': "`'SCHEMA' \\| 'FIELD' \\| 'CONTROL' \\| 'SETTLED' \\| 'ABANDONED'`",
    'isFormError': '',
}

# rewrite from the last table upward so earlier indices stay valid
rewrite(87, ['API', 'Kind', 'Shape', 'Summary'], form_shapes)
rewrite(73, ['API', 'Kind', 'Shape', 'Summary'], answers_shapes)
rewrite(48, ['API', 'Kind', 'Shape', 'Summary'], schema_shapes)

text = '\n'.join(lines)
text = text.replace('| Method       | Returns                    | Behavior ',
                    '| Method       | Returns                    | Summary ')

with io.open(PATH, 'w', encoding='utf-8', newline='') as fh:
    fh.write(text)
print('tables rewritten')
