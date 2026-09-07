import io
p='tests/guides.test.ts'
s=io.open(p,encoding='utf8').read()

old_head = """// The consumer-side guides-parity drop-in: runs @orkestrel/guide's checks against this
// repository's own guides/README.md manifest. The constants below are this package's
// own, and are what a sibling package changes.
"""
new_head = """// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
// this repo's own `guides/README.md` manifest. The constants that follow are this
// package's own, and are the only part a sibling package changes.
"""
assert old_head in s
s = s.replace(old_head, new_head, 1)

old_imp = """	findMissing,
	findMissingSymbols,"""
new_imp = """	findDrift,
	findMissing,
	findMissingSymbols,"""
assert old_imp in s
s = s.replace(old_imp, new_imp, 1)

old_int = """/**
 * Declarations deliberately kept out of the barrel, as `computeSymbolKey` strings.
 *
 * A class that one-class-per-file evicted from its single consumer cannot become a local, so
 * it stays exported without being public. Naming it here is what makes that intentional rather
 * than forgotten — and the internal-membership assertion fails when a name stops being stranded,
 * so the list cannot rot.
 */"""
new_int = """/**
 * Declarations deliberately kept out of the barrel, as `computeSymbolKey` strings.
 *
 * A class that one-class-per-file evicted from its single consumer cannot become a
 * local, so it stays exported without being public. Naming it here is what makes that
 * intentional rather than forgotten — and the assertion that follows it fails when a name
 * here stops being stranded, so the list cannot rot.
 */"""
assert old_int in s
s = s.replace(old_int, new_int, 1)

# GUIDE_SPEC constant beside the other package constants
old_lang = """/** The fence language whose blocks count as worked examples. */
const EXAMPLE_LANGUAGE = 'ts'
"""
new_lang = """/** The fence language whose blocks count as worked examples. */
const EXAMPLE_LANGUAGE = 'ts'
/** The one guide this package sources, whose tagline the README pitch equals. */
const GUIDE_SPEC = 'guides/mcp.md'
"""
assert old_lang in s
s = s.replace(old_lang, new_lang, 1)

io.open(p,'w',encoding='utf8').write(s)
print('ok')
