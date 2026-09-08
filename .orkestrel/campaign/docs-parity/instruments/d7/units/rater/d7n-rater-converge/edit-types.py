import pathlib

path = pathlib.Path('/home/user/fleet/rater/src/core/types.ts')
text = path.read_text()


def sub(old, new):
    global text
    assert text.count(old) == 1, (text.count(old), old[:90])
    text = text.replace(old, new)


sub(""" * The worksheet also carries the line's outcome: `amount` is present ONLY
 * when `worksheet.success` is `true`.""",
    """ * The worksheet also carries the line's outcome: `amount` is present only
 * when `worksheet.success` is `true`.""")

sub(""" * `engine` — an injected {@link ReasonInterface}; when omitted, `Rater` builds
 * and OWNS its own quantitative-only engine (`bail: false`), destroying it on""",
    """ * `engine` — an injected {@link ReasonInterface}; when omitted, `Rater` builds
 * and owns its own quantitative-only engine (`bail: false`), destroying it on""")

sub(""" * The array-of-lines `rate` overload is declared FIRST so a plain line list
 * resolves to that form. Both overloads rate a SINGLE subject — there is no
 * batch-of-subjects overload.""",
    """ * The array-of-lines `rate` overload is declared first so a plain line list
 * resolves to that form. Each overload rates a single subject — there is no
 * batch-of-subjects overload.""")

sub("""export interface RaterInterface {
	readonly emitter: EmitterInterface<RaterEventMap>
	rate(lines: readonly LineDefinition[], subject: Subject): RatingResult
	rate(definition: RatingDefinition, subject: Subject): RatingResult
	destroy(): void
}""",
    """export interface RaterInterface {
	/** Holds the typed emitter every `rate` call fires its event through. */
	readonly emitter: EmitterInterface<RaterEventMap>
	/**
	 * Rates an array of lines, or a rating definition, against one subject over the
	 * shared quantitative engine.
	 */
	rate(lines: readonly LineDefinition[], subject: Subject): RatingResult
	rate(definition: RatingDefinition, subject: Subject): RatingResult
	/**
	 * Destroys an owned engine and then the emitter, and does nothing on a later
	 * call.
	 */
	destroy(): void
}""")

path.write_text(text)
print('types.ts written')
