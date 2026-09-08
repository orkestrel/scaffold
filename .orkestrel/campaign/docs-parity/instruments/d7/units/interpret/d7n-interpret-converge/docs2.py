import pathlib

def edit(path, subs):
    p = pathlib.Path(path)
    t = p.read_text(encoding='utf-8')
    for old, new in subs:
        if old not in t:
            raise SystemExit(f'MISSING in {path}:\n{old}')
        t = t.replace(old, new, 1)
    p.write_text(t, encoding='utf-8')
    print('ok', path)

edit('src/core/errors.ts', [
(""" * Represents an error thrown by the interprets layer.""",
 """ * Represents an error thrown by the interprets layer, carrying an
 * {@link InterpretErrorCode} and an optional `context` record."""),
])

edit('src/core/validators.ts', [
# isTemplate remarks gain the expression guard sentence the guide cell carried
(""" * `definition` is validated with reasons' `isDefinition` — a `Template`'s
 * definition is already expressed in terrain reasons vocabulary, so no
 * parallel interprets-owned definition guard exists.""",
 """ * `definition` is validated with reasons' `isDefinition` — a `Template`'s
 * definition is already expressed in terrain reasons vocabulary, so no
 * parallel interprets-owned definition guard exists. Each computation's
 * `expression` is validated with reasons' `isSymbolicExpression`, already
 * recursive through `lazyOf`, so this module mints no expression guard of its
 * own."""),
# isProvenance gains the checked-member remark
(""" * Determines whether a value is an open {@link Provenance} result record.
 *
 * @param value - The value to test
 * @returns True if the published provenance members conform; false otherwise""",
 """ * Determines whether a value is an open {@link Provenance} result record.
 *
 * @remarks
 * `category` is checked against `PROVENANCE_CATEGORIES` and the optional
 * `detail` against `isString`; an unknown member passes, because a foreign
 * engine's return is not this package's to narrow.
 *
 * @param value - The value to test
 * @returns True if the published provenance members conform; false otherwise"""),
# isAmbiguity gains the checked-member remark
(""" * Determines whether a value is an open {@link Ambiguity} result record.
 *
 * @param value - The value to test
 * @returns True if the published ambiguity members conform; false otherwise""",
 """ * Determines whether a value is an open {@link Ambiguity} result record.
 *
 * @remarks
 * `field`, `question`, the string `candidates` list, and `required` are each
 * checked; an unknown member passes.
 *
 * @param value - The value to test
 * @returns True if the published ambiguity members conform; false otherwise"""),
# isStageFailure gains the checked-member remark
(""" * Determines whether a value is an open {@link StageFailure} result record.
 *
 * @param value - The value to test
 * @returns True if the published stage-failure members conform; false otherwise""",
 """ * Determines whether a value is an open {@link StageFailure} result record.
 *
 * @remarks
 * `stage` is checked against `INTERPRET_STAGES`, `code` against
 * `INTERPRET_ERROR_CODES`, and `message` against `isString`; an unknown member
 * passes.
 *
 * @param value - The value to test
 * @returns True if the published stage-failure members conform; false otherwise"""),
])

edit('src/core/factories.ts', [
(""" * Creates an interpretation orchestrator.\n""",
 """ * Creates an interpretation orchestrator, returning an {@link InterpretInterface}\n * seeded from {@link InterpretOptions}.\n"""),
(""" * Creates a text normalizer.\n""",
 """ * Creates a text normalizer, returning a stateless {@link NormalizerInterface}.\n"""),
(""" * Creates a template-agnostic intent classifier and number extractor.\n""",
 """ * Creates a template-agnostic intent classifier and number extractor, returning a\n * stateless {@link ExtractorInterface}.\n"""),
(""" * Creates a clarifier — carry-over, defaults, and computed-field resolution
 * against an assigned entity set.\n""",
 """ * Creates a clarifier — carry-over, defaults, and computed-field resolution
 * against an assigned entity set — returning a stateless {@link ClarifierInterface}.\n"""),
(""" * Creates a prompt formatter.\n""",
 """ * Creates a prompt formatter, returning a stateless {@link FormatterInterface}.\n"""),
(""" * Creates a subject/definition generator.\n""",
 """ * Creates a subject and definition generator, returning a stateless\n * {@link GeneratorInterface}.\n"""),
(""" * Creates a template registry.\n""",
 """ * Creates a template registry, returning a working {@link TemplateManagerInterface}.\n"""),
(""" * Creates a subject registry.\n""",
 """ * Creates a subject registry, returning a working {@link SubjectManagerInterface}.\n"""),
(""" * Creates a definition registry.\n""",
 """ * Creates a definition registry, returning a working\n * {@link DefinitionManagerInterface}.\n"""),
(""" * Creates a cross-turn interpretation context.\n""",
 """ * Creates a cross-turn interpretation context, returning a working\n * {@link InterpretContextInterface}.\n"""),
(""" * Creates a lexicon-driven reverse-direction rendering engine.\n""",
 """ * Creates a lexicon-driven reverse-direction rendering engine, returning a stateless\n * {@link NarratorInterface}.\n"""),
])

edit('src/core/Interpret.ts', [
(""" * Implements the interpretation orchestrator — the sole public entry point of the
 * `interprets` module, mirroring the reasons `Reason` orchestrator shape.""",
 """ * Implements the interpretation orchestrator — the sole public entry point of the
 * `interprets` module, mirroring the reasons `Reason` orchestrator shape: it runs the
 * `[normalize, extract, clarify, format, generate]` pipeline, owns the template
 * registry and the context, and exposes the reverse direction."""),
])

edit('src/core/Narrator.ts', [
(""" * Implements a stateless, TOTAL, lexicon-driven rendering engine for the reverse""",
 """ * Implements a stateless, total, lexicon-driven rendering engine for the reverse"""),
])

edit('src/core/managers/SubjectManager.ts', [
(""" * record-holder that mints its OWN record identity for every {@link Subject}""",
 """ * record-holder that mints its own record identity for every {@link Subject}"""),
])

edit('src/core/helpers.ts', [
(""" * Computes a canonical structural digest of a pure-JSON value — a key-order-
 * stable FNV-1a hash rendered as an 8-hex-digit string.""",
 """ * Computes a canonical structural digest of a pure-JSON value — a
 * key-order-stable FNV-1a hash rendered as an 8-hex-digit string."""),
])
