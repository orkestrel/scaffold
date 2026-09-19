/*
 * This package declares no contract shape.
 *
 * The shape DSL earns its complexity only where one blueprint has to serve
 * validation, JSON-Schema serialization, seeded generation, and the parity
 * between them. This package needs validation alone. Its guards live in
 * `validators.ts`, built from the installed `recordOf`, `unionOf`, and
 * `literalOf`, and its coercers live in `parsers.ts`, each derived from the
 * guard beside it. Nothing in the public surface emits a schema or generates a
 * sample value: the compiler returns a plan, the materializer returns paths, the
 * upstream reader returns verdicts, and the executable prints those values as
 * JSON. The other legs have no consumer.
 *
 * A shape could not carry these contracts faithfully either. `isPath` walks a
 * path's segments and `isSnapshot` applies that law to every key of a record,
 * while a `StringShape` states only length, pattern, and format. Compiling a
 * guard from a shape would produce a second, weaker law beside the one in
 * `validators.ts`, free to disagree with it.
 *
 * The file stays because the kind exists. Add a shape here when a consumer needs
 * the schema or the generator, and route that concept's guard through it in the
 * same change so one law remains.
 */
