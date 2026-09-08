import re, pathlib

p = pathlib.Path('guides/interpret.md')
t = p.read_text(encoding='utf-8')

def sub(old, new):
    global t
    if t.count(old) != 1:
        raise SystemExit(f'count {t.count(old)} for:\n{old[:200]}')
    t = t.replace(old, new, 1)

TAGLINE = """> A synchronous, deterministic bidirectional bridge between natural language and the
> `@orkestrel/reason` engine: a forward pipeline that normalizes raw text, classifies its
> intent, matches an added `Template`, clarifies the fields extraction left open, and
> generates a `Subject` and `Definition` pair ready for `Reason.reason`, plus a reverse
> direction that renders a `Definition`, a `Subject`, or a `ReasonResult` to
> display-neutral prose through a lexicon-driven `Narrator`."""

head_old = t[: t.index('## Surface')]
head_new = f"""# Interpret

{TAGLINE}

Nothing here is an LLM, a provider, or an agent: the `prompt` a result carries is written for
an external model and is never consumed internally, and the reverse direction complements the
raters' `describe*` family rather than duplicating it. `normalize` applies contraction,
abbreviation, and correction substitutions; `extract` classifies intent without ever seeing a
template and mines the raw numbers; `clarify` resolves same-domain carry-over, template
defaults, and dependency-ordered computed fields. Every discriminant names its axis rather
than `kind` or `type`: `stage` splits the pipeline phases, `category` splits provenance, and
`code` splits coded errors. Source: [`src/core`](../src/core). Surfaced through the
`@src/core` barrel.

"""
sub(head_old, head_new)

sub("""Add a template, interpret text through the normalize/extract/clarify/format/generate
pipeline, then render the result back to prose:

```ts""",
"""Add a template, interpret text through the normalize, extract, clarify, format, and generate
pipeline, then render the result back to prose:

### Interpret text against an added template

```ts""")

sub("""`interpret()` is genuinely SYNCHRONOUS and runs the fixed pipeline
`[normalize, extract, clarify, format, generate]`; a `NO_TEMPLATE` /
`LOW_CONFIDENCE` non-match, or a thrown stage, both yield a visible
INCOMPLETE `Interpretation` (never an arbitrary fallback template) rather
than throwing. An interpretation is complete when `ambiguities` and
`failures` are both empty; no stored flag repeats that fact.""",
"""`interpret()` is genuinely synchronous and runs the fixed pipeline
`[normalize, extract, clarify, format, generate]`. A `NO_TEMPLATE` or `LOW_CONFIDENCE`
non-match, and a thrown stage, each yield a visible incomplete `Interpretation` rather than
throwing, and never an arbitrary fallback template. An interpretation is complete when
`ambiguities` and `failures` are both empty; no stored flag repeats that fact.""")

SHAPE_SENTENCE = (
    "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an "
    "optional member and `plus` introducing its call-signature members, and a type alias's own "
    "type literal with a union's arms escaped as `\\|`."
)

TYPES = [
    ('ProvenanceCategory', 'type', "`'extracted' \\| 'carried' \\| 'default' \\| 'computed' \\| 'subject'`"),
    ('InterpretStage', 'type', "`'normalize' \\| 'extract' \\| 'clarify' \\| 'format' \\| 'generate'`"),
    ('InterpretErrorCode', 'type', "`'NORMALIZE_FAILED' \\| 'EXTRACT_FAILED' \\| 'CLARIFY_FAILED' \\| 'FORMAT_FAILED' \\| 'GENERATE_FAILED' \\| 'NO_TEMPLATE' \\| 'LOW_CONFIDENCE' \\| 'DESTROYED'`"),
    ('EntityMapping', 'interface', '`{ entity, aliases, field, required? }`'),
    ('FieldDefault', 'interface', '`{ field, value }`'),
    ('ComputedField', 'interface', '`{ field, expression }`'),
    ('Template', 'interface', '`{ id, name, domain, intents, mappings, defaults, computations, definition }`'),
    ('Provenance', 'interface', '`{ category, detail? }`'),
    ('Intent', 'interface', '`{ action?, domain?, confidence }`'),
    ('Entity', 'interface', '`{ name, value, provenance, confidence }`'),
    ('Ambiguity', 'interface', '`{ field, question, candidates, required }`'),
    ('FieldMapping', 'interface', '`{ field, entity?, value, provenance, confidence }`'),
    ('TextChange', 'interface', '`{ from, to }`'),
    ('StageRecord', 'interface', '`{ stage, input, output, failed, error? }`'),
    ('StageFailure', 'interface', '`{ stage, code, message }`'),
    ('NormalizeResult', 'interface', '`{ text, changes }`'),
    ('ExtractResult', 'interface', '`{ intent, numbers }`'),
    ('ClarifyResult', 'interface', '`{ entities, ambiguities }`'),
    ('FormatResult', 'interface', '`{ prompt }`'),
    ('GenerateResult', 'interface', '`{ subject, definition, mappings, confidence }`'),
    ('Interpretation', 'interface', '`{ text, normalized, intent, entities, subject?, definition?, mappings, ambiguities, prompt, stages, failures, confidence, digest }`'),
    ('TemplateRecord', 'interface', '`{ id, template, version, hash }`'),
    ('SubjectRecord', 'interface', '`{ id, subject, version, hash }`'),
    ('DefinitionRecord', 'interface', '`{ id, definition, version, hash }`'),
    ('InterpretEventMap', 'type', '`{ interpret, add, error, destroy }`'),
    ('RecordEventMap', 'type', '`{ add, remove, destroy }`'),
    ('TemplateManagerEventMap', 'type', '`RecordEventMap`'),
    ('SubjectManagerEventMap', 'type', '`RecordEventMap`'),
    ('DefinitionManagerEventMap', 'type', '`RecordEventMap`'),
    ('InterpretContextEventMap', 'type', '`{ add, clear, destroy }`'),
    ('NarratorFormatter', 'type', '`(value: unknown) => string`'),
    ('Lexicon', 'interface', '`{ phrases?, labels?, templates? }`'),
    ('NarratorOptions', 'interface', '`{ lexicon?, formatters? }`'),
    ('NormalizerOptions', 'interface', '`{ contractions?, abbreviations?, corrections? }`'),
    ('ExtractorOptions', 'interface', '`{ actions?, domains? }`'),
    ('ClarifierOptions', 'interface', '`{ floor?, narrator? }`'),
    ('FormatterOptions', 'interface', '`{ verbs?, narrator? }`'),
    ('TemplateManagerOptions', 'interface', '`{ templates?, on?, error? }`'),
    ('SubjectManagerOptions', 'interface', '`{ subjects?, on?, error? }`'),
    ('DefinitionManagerOptions', 'interface', '`{ definitions?, on?, error? }`'),
    ('RecordStamp', 'interface', '`{ id, version, hash }`'),
    ('RecordFunction', 'type', '`(stamp: RecordStamp, value: TValue) => TRecord`'),
    ('RecordManagerOptions', 'interface', '`{ entity, on?, error? }`'),
    ('RecordManagerInterface', 'interface', '`{ emitter, count } plus has, record, records, add, remove, destroy`'),
    ('RecordOptions', 'interface', '`{ id? }`'),
    ('InterpretContextOptions', 'interface', '`{ session?, history?, on?, error? }`'),
    ('InterpretOptions', 'interface', '`{ templates?, context?, normalizer?, extractor?, clarifier?, formatter?, generator?, similarity?, floor?, history?, narrator?, on?, error? }`'),
    ('NormalizerInterface', 'interface', '`normalize`'),
    ('ExtractorInterface', 'interface', '`extract`'),
    ('ClarifierInterface', 'interface', '`clarify`'),
    ('FormatterInterface', 'interface', '`format`'),
    ('GeneratorInterface', 'interface', '`generate`'),
    ('NarratorInterface', 'interface', '`phrase, label, line, value, describe, narrate`'),
    ('TemplateManagerInterface', 'interface', '`{ emitter, count } plus has, template, templates, add, remove, destroy`'),
    ('SubjectManagerInterface', 'interface', '`{ emitter, count } plus has, subject, subjects, add, remove, destroy`'),
    ('DefinitionManagerInterface', 'interface', '`{ emitter, count } plus has, definition, definitions, add, remove, destroy`'),
    ('InterpretContextInterface', 'interface', '`{ emitter, session, subjects, definitions } plus previous, entities, add, clear, destroy`'),
    ('InterpretInterface', 'interface', '`{ emitter } plus interpret, add, remove, template, templates, describe, narrate, destroy`'),
]

types_table = ['| Type | Kind | Shape | Summary |', '| --- | --- | --- | --- |']
for name, kind, shape in TYPES:
    types_table.append(f'| `{name}` | {kind} | {shape} |  |')

start = t.index('### Types\n')
end = t.index('### Constants\n')
sub(t[start:end], '### Types\n\n' + SHAPE_SENTENCE + '\n\n' + '\n'.join(types_table) + '\n\n')

CONSTANTS = [
    ('DEFAULT_INTERPRET_SIMILARITY', '`number`'),
    ('DEFAULT_INTERPRET_FLOOR', '`number`'),
    ('DEFAULT_INTERPRET_HISTORY', '`number`'),
    ('PROVENANCE_CATEGORIES', '`readonly ProvenanceCategory[]`'),
    ('INTERPRET_STAGES', '`readonly InterpretStage[]`'),
    ('INTERPRET_ERROR_CODES', '`readonly InterpretErrorCode[]`'),
    ('CONFIDENCE_EXACT', '`number`'),
    ('CONFIDENCE_ALIAS', '`number`'),
    ('CONFIDENCE_COLLECT', '`number`'),
    ('CONFIDENCE_POSITIONAL', '`number`'),
    ('CONFIDENCE_CARRIED', '`number`'),
    ('CONFIDENCE_DEFAULT', '`number`'),
    ('CONFIDENCE_COMPUTED', '`number`'),
    ('NUMBER_PATTERN', '`RegExp`'),
    ('UNSAFE_FIELD_SEGMENTS', '`readonly string[]`'),
    ('DEFAULT_CONTRACTIONS', '`Readonly<Record<string, string>>`'),
    ('DEFAULT_LEXICON', '`Lexicon`'),
]
const_table = ['| API | Kind | Shape | Summary |', '| --- | --- | --- | --- |']
for name, shape in CONSTANTS:
    const_table.append(f'| `{name}` | const | {shape} |  |')

start = t.index('### Constants\n')
end = t.index('```ts\nimport {\n\tCONFIDENCE_ALIAS,')
sub(t[start:end],
    '### Constants\n\n'
    "A `Shape` cell holds the constant's declared type.\n\n"
    + '\n'.join(const_table) + '\n\n')

sub("""| API                | Kind     | Summary                                               |
| ------------------ | -------- | ----------------------------------------------------- |
| `InterpretError`   | class    | Carries an `InterpretErrorCode` + optional `context`. |
| `isInterpretError` | function | Narrow a caught value to an `InterpretError`.         |""",
"""| API | Kind | Summary |
| --- | --- | --- |
| `InterpretError` | class |  |
| `isInterpretError` | function |  |""")

GUARDS = [
    ('isEntityMapping', '`EntityMapping`'),
    ('isFieldDefault', '`FieldDefault`'),
    ('isComputedField', '`ComputedField`'),
    ('isTemplate', '`Template`'),
    ('isProvenance', '`Provenance`'),
    ('isIntent', '`Intent`'),
    ('isEntity', '`Entity`'),
    ('isFieldMapping', '`FieldMapping`'),
    ('isAmbiguity', '`Ambiguity`'),
    ('isStageRecord', '`StageRecord`'),
    ('isStageFailure', '`StageFailure`'),
    ('isInterpretation', '`Interpretation`'),
]
guard_table = ['| API | Kind | Shape | Summary |', '| --- | --- | --- | --- |']
for name, shape in GUARDS:
    guard_table.append(f'| `{name}` | function | {shape} |  |')

start = t.index('Total guards composed from')
end = t.index('```ts\nimport {\n\tcreateInterpret,')
sub(t[start:end],
"""Total guards composed from `@orkestrel/contract` combinators and `@orkestrel/reason` guards —
adversarial input (junk, cycles, hostile prototypes) returns `false`, never throws.

Two postures, split by who produces the value. An input-record guard is exact: an extra key
fails, because an input this package owns that drifted from its declared shape is rejected
loudly. A result guard is open: an unknown member and a class instance pass when every
published member conforms, because a foreign engine's return is not this package's to narrow.
`InterpretInterface` is borrowable, so a consumer holding a borrowed engine guards its
`interpret` return with `isInterpretation` before dereferencing `intent`, `entities`, or
`ambiguities`. Each row's `Summary` names the posture its guard takes.

"""
 + SHAPE_SENTENCE + ' In a guard table a `Shape` cell holds the type the guard narrows to.\n\n'
 + '\n'.join(guard_table) + '\n\n')

HELPERS = ['escapeRegExp', 'setField', 'applyReplacements', 'collapseWhitespace', 'tokenize',
           'extractNumbers', 'assignEntities', 'classifyIntent', 'scoreSimilarity', 'matchAlias',
           'canonicalize', 'canonicalizeNode', 'digestValue', 'scoreTemplate', 'matchTemplate',
           'variablesOf', 'resolveExpression', 'renderSubject']
helper_table = ['| API | Kind | Summary |', '| --- | --- | --- |']
for name in HELPERS:
    helper_table.append(f'| `{name}` | function |  |')

start = t.index('| API                  | Kind     | Summary')
end = t.index('```ts\nimport {\n\tapplyReplacements,')
sub(t[start:end], '\n'.join(helper_table) + '\n\n')

sub("""| API             | Kind     | Summary                                                                                                   |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `parseTemplate` | function | Parse a JSON string into a `Template`, or `undefined` on invalid JSON or a shape that fails `isTemplate`. |""",
"""| API | Kind | Summary |
| --- | --- | --- |
| `parseTemplate` | function |  |""")

FACTORIES = ['createInterpret', 'createNormalizer', 'createExtractor', 'createClarifier',
             'createFormatter', 'createGenerator', 'createTemplateManager', 'createSubjectManager',
             'createDefinitionManager', 'createInterpretContext', 'createNarrator']
factory_table = ['| API | Kind | Summary |', '| --- | --- | --- |']
for name in FACTORIES:
    factory_table.append(f'| `{name}` | function |  |')

start = t.index('| API                       | Kind     | Builds…')
end = t.index('```ts\nimport {\n\tcreateClarifier,')
sub(t[start:end], '\n'.join(factory_table) + '\n\n')

CLASSES = ['Interpret', 'Narrator', 'Normalizer', 'Extractor', 'Clarifier', 'Formatter',
           'Generator', 'RecordManager', 'TemplateManager', 'SubjectManager', 'DefinitionManager',
           'InterpretContext']
class_table = ['| API | Kind | Summary |', '| --- | --- | --- |']
for name in CLASSES:
    class_table.append(f'| `{name}` | class |  |')

start = t.index('### Entities\n')
end = t.index('## Methods\n')
sub(t[start:end], '### Classes\n\n' + '\n'.join(class_table) + '\n\n')

# Methods tables: rename Behavior to Summary and blank every Summary cell.
CELL = re.compile(r'(?<!\\)\|')
lines = t.split('\n')
methods_at = lines.index('## Methods')
out = lines[:methods_at]
for line in lines[methods_at:]:
    if line.startswith('| '):
        cells = [c.strip() for c in CELL.split(line)[1:-1]]
        if cells and cells[-1] == 'Behavior':
            cells[-1] = 'Summary'
        elif set(''.join(cells)) <= {'-'}:
            cells = ['---'] * len(cells)
        else:
            cells[-1] = ''
        out.append('| ' + ' | '.join(cells) + ' |')
    else:
        out.append(line)
t = '\n'.join(out)

t = t.rstrip('\n') + """

## Tests

- [`tests/guides.test.ts`](../tests/guides.test.ts) — the `## Surface` ↔ `src/core` bijection (value and type exports), each behavioral interface ↔ its implementing class method bijection, and the equality gate: every `Summary` cell against its declaration's description paragraph, the titled `Interpret text against an added template` fence against the `@example` block of that title (pinned so the titled pair cannot be retired silently), and the README pitch against this guide's tagline. It also runs the flagship fences and asserts the values their comments claim.
- [`tests/src/core/Interpret.test.ts`](../tests/src/core/Interpret.test.ts) — the orchestrator: the fixed pipeline and its per-stage records, the `NO_TEMPLATE` and `LOW_CONFIDENCE` incomplete results, a thrown stage marked on its record and on `failures`, the replay digest, the emitter surface, and teardown.
- [`tests/src/core/InterpretContext.test.ts`](../tests/src/core/InterpretContext.test.ts) — the capped ring buffer, the flattened entity read carry-over consults, `clear` against `destroy`, and the emitted events.
- [`tests/src/core/Narrator.test.ts`](../tests/src/core/Narrator.test.ts) — every lookup total against an adversarial key, the documented fallback of each primitive, and the composed `describe` and `narrate` renderings.
- [`tests/src/core/factories.test.ts`](../tests/src/core/factories.test.ts) — each factory returns a working entity, and honors the options it declares.
- [`tests/src/core/helpers.test.ts`](../tests/src/core/helpers.test.ts) — the pure leaves: escaping, copy-on-write field writes and their prototype-pollution refusal, replacement and whitespace collapse, tokenizing, numeric mining, entity assignment, intent classification, similarity and alias matching, canonicalization and digesting, template scoring and matching, expression variables and resolution, and subject rendering.
- [`tests/src/core/parsers.test.ts`](../tests/src/core/parsers.test.ts) — `parseTemplate` returns a template, or `undefined` on invalid JSON and on a shape that fails `isTemplate`.
- [`tests/src/core/validators.test.ts`](../tests/src/core/validators.test.ts) — every guard stays total against junk, cycles, and hostile prototypes, with the exact posture for an input record and the open posture for a result record.
- [`tests/src/core/stages/Normalizer.test.ts`](../tests/src/core/stages/Normalizer.test.ts) — the substitution order, the recorded changes, and the final whitespace collapse.
- [`tests/src/core/stages/Extractor.test.ts`](../tests/src/core/stages/Extractor.test.ts) — intent classification against caller vocabularies, and numeric mining, with no template in sight.
- [`tests/src/core/stages/Clarifier.test.ts`](../tests/src/core/stages/Clarifier.test.ts) — resolution order across fresh entities, same-domain carry-over, defaults, and dependency-ordered computed fields, plus the ambiguity every unresolved required mapping raises.
- [`tests/src/core/stages/Formatter.test.ts`](../tests/src/core/stages/Formatter.test.ts) — the clause assembly through the narrator's `prompt.*` lines, and the verb fallback.
- [`tests/src/core/stages/Generator.test.ts`](../tests/src/core/stages/Generator.test.ts) — the entity-to-field rule, the single-element unwrap, the mean confidence, and the field audit.
- [`tests/src/core/managers/RecordManager.test.ts`](../tests/src/core/managers/RecordManager.test.ts) — the content hash and version rule, the all-or-nothing batch `remove`, the emitted events, and idempotent teardown.
- [`tests/src/core/managers/TemplateManager.test.ts`](../tests/src/core/managers/TemplateManager.test.ts) — the template accessors, the record id defaulting to `template.id`, and re-add versioning.
- [`tests/src/core/managers/SubjectManager.test.ts`](../tests/src/core/managers/SubjectManager.test.ts) — the minted record identity, the caller override, and the subject accessors.
- [`tests/src/core/managers/DefinitionManager.test.ts`](../tests/src/core/managers/DefinitionManager.test.ts) — the definition accessors and the record id defaulting to the definition's own `id`.
- [`tests/src/core/integration.test.ts`](../tests/src/core/integration.test.ts) — the forward and reverse directions driven together over a real corpus, through the public API.
"""

p.write_text(t, encoding='utf-8')
print('ok guide')
