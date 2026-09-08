import pathlib

ROOT = pathlib.Path('/home/user/fleet/rater/src/core')


def edit(name, pairs):
    path = ROOT / name
    text = path.read_text()
    for old, new in pairs:
        assert text.count(old) == 1, (name, text.count(old), old[:90])
        text = text.replace(old, new)
    path.write_text(text)
    print(f'{name} written')


edit('errors.ts', [(
    """ * `DESTROYED` — use of a destroyed entity.""",
    """ * `DESTROYED` — use of a destroyed entity. `context` carries optional
 * structured detail beside the message.""",
)])

edit('Rater.ts', [(
    """ * When no `engine` is injected, `Rater` builds and OWNS its own
 * quantitative-only engine (`bail: false`) — Rater performs NO evaluation
 * arithmetic of its own; it only orchestrates and projects. The
 * array-of-lines `rate` overload is declared FIRST so a plain line list
 * resolves to that form. `destroy()` destroys an OWNED engine, then the
 * emitter LAST; an INJECTED engine is never destroyed. Afterwards every
 * other method throws {@link RaterError} `'DESTROYED'`.""",
    """ * When no `engine` is injected, `Rater` builds and owns its own
 * quantitative-only engine (`bail: false`) — Rater performs no evaluation
 * arithmetic of its own; it only orchestrates and projects. The
 * array-of-lines `rate` overload is declared first so a plain line list
 * resolves to that form. `destroy()` destroys an owned engine, then the
 * emitter last; an injected engine is never destroyed. Afterwards every
 * other method throws {@link RaterError} `'DESTROYED'`.""",
)])

edit('factories.ts', [(
    """ * Creates a rating orchestrator.""",
    """ * Creates a rating orchestrator over the shared quantitative engine, seeded
 * from {@link RaterOptions} and returning a {@link RaterInterface}.""",
)])

edit('helpers.ts', [
    (
        """ * Builds a {@link LineDefinition}.""",
        """ * Builds a fresh {@link LineDefinition} from a line id, a display name, and the
 * line's quantitative rating definition, with `overrides` merged over those
 * defaults.""",
    ),
    (
        """ * Builds a {@link RatingDefinition}.""",
        """ * Builds a fresh {@link RatingDefinition} from a rating id, a display name, and
 * the rating's ordered lines, with `overrides` merged over those defaults.""",
    ),
])

edit('validators.ts', [
    (
        """ * Determines whether a value is a {@link Stage} literal.
 *
 * @param value - The value to test""",
        """ * Determines whether a value is a {@link Stage} literal.
 *
 * @remarks
 * One of the `Stage` literals — `'factor'`, `'group'`, or `'total'` — is
 * accepted and nothing else. A scalar union has no open or exact axis, so this
 * guard leaves nothing unchecked.
 *
 * @param value - The value to test""",
    ),
    (
        """ * Total guard: adversarial input (cycles, hostile prototypes) returns `false`,
 * never throws. The record shape is EXACT — an extra key fails.
 *
 * @param value - The value to test
 * @returns True if `value` is a `LineDefinition`; false otherwise""",
        """ * Every `LineDefinition` member is checked, including its quantitative
 * definition. Total guard: adversarial input (cycles, hostile prototypes)
 * returns `false`, never throws. The record shape is exact — this package owns
 * the authored input record, so an extra key fails and nothing is left
 * unchecked.
 *
 * @param value - The value to test
 * @returns True if `value` is a `LineDefinition`; false otherwise""",
    ),
    (
        """ * Total guard: adversarial input (cycles, hostile prototypes) returns `false`,
 * never throws. The record shape is EXACT — an extra key fails.
 *
 * @param value - The value to test
 * @returns True if `value` is a `RatingDefinition`; false otherwise""",
        """ * Every `RatingDefinition` member is checked, including each nested line
 * definition. Total guard: adversarial input (cycles, hostile prototypes)
 * returns `false`, never throws. The record shape is exact — this package owns
 * the authored input record, so an extra key fails and nothing is left
 * unchecked.
 *
 * @param value - The value to test
 * @returns True if `value` is a `RatingDefinition`; false otherwise""",
    ),
    (
        """ * Unknown members, prototypes, and class instances are admitted. Arrays are
 * refused. `expected` and `actual` are `unknown`, so this guard does not read or
 * check them; either member may also be absent because `objectOf` reads declared
 * members rather than requiring or enumerating own keys.""",
        """ * Optional `field` is checked as a `FieldPath`, `label` as a string,
 * `comparison` as a `Comparison`, and `met` as a boolean, each when defined.
 * Unknown members, prototypes, and class instances are admitted. Arrays are
 * refused. `expected` and `actual` are `unknown`, so this guard does not read or
 * check them and a borrowed result is never narrowed on them; either member may
 * also be absent because `objectOf` reads declared members rather than
 * requiring or enumerating own keys.""",
    ),
    (
        """ * Unknown members, prototypes, and class instances are admitted. Arrays are
 * refused. Optional members may be absent or read as `undefined`.
 *
 * @param value - The value to test
 * @returns True if every published worksheet-factor member conforms; false otherwise""",
        """ * `id`, the optional authored text, `applied`, an optional plain-number
 * `value`, and each `Evidence` entry are checked. Unknown members, prototypes,
 * and class instances are admitted and left unchecked, because a borrowed
 * result implementation may add them. Arrays are refused. Optional members may
 * be absent or read as `undefined`.
 *
 * @param value - The value to test
 * @returns True if every published worksheet-factor member conforms; false otherwise""",
    ),
    (
        """ * Unknown members, prototypes, and class instances are admitted. Arrays are
 * refused. Optional members may be absent or read as `undefined`.
 *
 * @param value - The value to test
 * @returns True if every published worksheet-group member conforms; false otherwise""",
        """ * `id`, the optional authored text, `applied`, a plain-number `value`, and each
 * `WorksheetFactor` entry are checked. Unknown members, prototypes, and class
 * instances are admitted and left unchecked, because a borrowed result
 * implementation may add them. Arrays are refused. Optional members may be
 * absent or read as `undefined`.
 *
 * @param value - The value to test
 * @returns True if every published worksheet-group member conforms; false otherwise""",
    ),
    (
        """ * Unknown members, prototypes, and class instances are admitted. Arrays are
 * refused. Optional members may be absent or read as `undefined`.
 *
 * @param value - The value to test
 * @returns True if every published worksheet-step member conforms; false otherwise""",
        """ * `stage` is checked through `isStage`, `id`, `name`, and `expression` when
 * defined, and `value` as a plain number. Unknown members, prototypes, and
 * class instances are admitted and left unchecked, because a borrowed result
 * implementation may add them. Arrays are refused. Optional members may be
 * absent or read as `undefined`.
 *
 * @param value - The value to test
 * @returns True if every published worksheet-step member conforms; false otherwise""",
    ),
    (
        """ * Unknown members, prototypes, and class instances are admitted. Arrays are
 * refused. Optional members may be absent or read as `undefined`.
 *
 * @param value - The value to test
 * @returns True if every published worksheet member conforms; false otherwise""",
        """ * Identity, `aggregation` through reason's `isAggregation`, an optional
 * plain-number `precision`, a plain-number `value`, the nested groups and steps,
 * `trace`, `errors`, and `success` are checked. Unknown members, prototypes, and
 * class instances are admitted and left unchecked, because a borrowed result
 * implementation may add them. Arrays are refused. Optional members may be
 * absent or read as `undefined`.
 *
 * @param value - The value to test
 * @returns True if every published worksheet member conforms; false otherwise""",
    ),
    (
        """ * Unknown members, prototypes, and class instances are admitted. Arrays are
 * refused. `amount` may be absent or read as `undefined`; when present it stays
 * a plain JavaScript `number` without a finite or range refinement. The line's
 * outcome lives on `worksheet`, so `worksheet.success` carries it.""",
        """ * Identity, an optional plain-number `amount`, and the nested `Worksheet` that
 * carries the line's outcome are checked. Unknown members, prototypes, and
 * class instances are admitted and left unchecked, because a borrowed result
 * implementation may add them, and so is the relationship between `amount` and
 * `worksheet.success`, which the published interface types independently.
 * Arrays are refused. `amount` may be absent or read as `undefined`; when
 * present it stays a plain JavaScript `number` without a finite or range
 * refinement.""",
    ),
    (
        """ * Use this guard for a result returned by a borrowed `RaterInterface`. Unknown
 * members, prototypes, and class instances are admitted. Arrays are refused.
 * `total` may be absent or read as `undefined`; when present it stays a plain
 * JavaScript `number` without a finite or range refinement.""",
        """ * Use this guard for a result returned by a borrowed `RaterInterface`. Every
 * nested `LineResult`, an optional plain-number `total`, and a boolean `success`
 * are checked. Unknown members, prototypes, and class instances are admitted and
 * left unchecked, and so are the relationships among totals, lines, and success,
 * because the borrowed interface publishes only their member types. Arrays are
 * refused. `total` may be absent or read as `undefined`; when present it stays a
 * plain JavaScript `number` without a finite or range refinement.""",
    ),
])
