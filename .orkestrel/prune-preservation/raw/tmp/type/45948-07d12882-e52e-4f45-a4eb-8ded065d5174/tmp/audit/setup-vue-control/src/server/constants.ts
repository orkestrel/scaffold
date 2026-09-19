/**
 * Matches the drive prefix a Windows host path may open with.
 *
 * @remarks
 * The one segment allowed to carry a colon. Every other segment is measured by
 * {@link INVALID_SEGMENT_CHARACTER_PATTERN}, which refuses one, so a stream name
 * such as `file.txt:stream` cannot be smuggled through a later segment.
 */
export const DRIVE_PATTERN = /^[A-Za-z]:$/

/**
 * Matches the visible characters no host path segment may carry.
 *
 * @remarks
 * Narrower than the core path law by exactly one character: a backslash is a
 * separator on a Windows host rather than a forbidden character, so it is
 * normalized to `/` before the segments are measured instead of refused here.
 */
export const INVALID_SEGMENT_CHARACTER_PATTERN = /[<>:"|?*]/

/**
 * Matches the Windows device names that stay reserved even when an extension follows.
 *
 * @remarks
 * Refused on every host rather than only on Windows. A generated workspace is
 * checked out on all of them, so a directory this package writes on Linux must
 * still be a name Windows can hold.
 */
export const RESERVED_SEGMENT_PATTERN =
	/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9]|conin\$|conout\$)(?:\..*)?$/i

/**
 * Matches the exact SHA-256 syntax a digest is stated in: sixty-four lowercase hexadecimal digits.
 *
 * @remarks
 * Fixed length, unlike the core byte encoding, because a digest is one value of
 * one algorithm rather than a variable run of bytes. Lowercase only, so separate
 * spellings of one digest can never compare unequal.
 */
export const DIGEST_PATTERN = /^[0-9a-f]{64}$/

/**
 * Matches the Git branch syntax the repository endpoint accepts.
 *
 * @remarks
 * A branch is caller-supplied and reaches a URL path, so it is closed to
 * alphanumerics, dot, underscore, hyphen, and the separator, must open with an
 * alphanumeric, and may carry no `..` anywhere. That last refusal is what stops
 * a branch from walking out of the repository path it addresses.
 */
export const BRANCH_PATTERN = /^(?!.*\.\.)[A-Za-z0-9][A-Za-z0-9._/-]*$/

/**
 * Caps the UTF-8 bytes one host path segment may encode to.
 *
 * @remarks
 * The limit every supported filesystem shares for a single name. It is a byte
 * count rather than a character count, because that is the unit the filesystem
 * imposes it in: eighty-six three-byte characters are already past it.
 */
export const MAX_PATH_SEGMENT_BYTES = 255

/**
 * Caps the segments one host path may carry.
 *
 * @remarks
 * Bounds the work a path decision costs before any filesystem call is made. With
 * {@link MAX_PATH_SEGMENT_BYTES} it is also the real length ceiling of an
 * accepted path, well inside the core character ceiling.
 */
export const MAX_PATH_DEPTH = 64

/**
 * Caps the paths one target's working-tree inventory may report.
 *
 * @remarks
 * Far above the core collection ceiling, and deliberately so. A tracked or dirty
 * path list is the target repository's own fact rather than an argument a caller
 * authored, so measuring it against the ceiling that bounds a public collection
 * would read a legitimately large checkout as hostile and refuse the deletion
 * verb on it.
 */
export const MAX_INVENTORY_PATHS = 100_000

/** Caps the characters one caller-supplied upstream endpoint may carry. */
export const MAX_ENDPOINT_LENGTH = 2_048

/** Caps the characters one repository branch may carry. */
export const MAX_BRANCH_LENGTH = 255

/**
 * Caps the simultaneous upstream requests.
 *
 * @remarks
 * A ceiling rather than a default: the reader picks what it opens by, and this
 * is only what a caller may raise it to.
 */
export const MAX_UPSTREAM_CONCURRENCY = 64

/** Caps the retries one upstream request may be given after a transport fault. */
export const MAX_UPSTREAM_RETRIES = 5

/** Caps the timeout one upstream request may be given, in milliseconds. */
export const MAX_UPSTREAM_TIMEOUT = 300_000

/**
 * Reserves the metadata name a staged vendored host writes at its own root.
 *
 * @remarks
 * The one name a vendored file may never claim, because the staged root holds
 * the manifest under it. The producer refuses a storage name equal to it and the
 * reader looks for exactly this file, so both sides read one constant rather
 * than repeating a literal that only agrees by inspection.
 */
export const MANIFEST_NAME = 'manifest.json'

/** Holds the raw content host a repository read addresses when a caller names none. */
export const DEFAULT_REPOSITORY_BASE = 'https://raw.githubusercontent.com'

/** Holds the registry a version read addresses when a caller names none. */
export const DEFAULT_REGISTRY_BASE = 'https://registry.npmjs.org'

/** Holds the repository branch a raw content read addresses when a caller names none. */
export const DEFAULT_BRANCH = 'main'

/**
 * Sets the timeout one upstream request is given when a caller names none, in milliseconds.
 *
 * @remarks
 * Both endpoints open at this value; a caller raises either one on its own up to
 * {@link MAX_UPSTREAM_TIMEOUT}.
 */
export const DEFAULT_UPSTREAM_TIMEOUT = 10_000

/**
 * Sets the simultaneous upstream requests a reader opens with, under
 * {@link MAX_UPSTREAM_CONCURRENCY}.
 */
export const DEFAULT_UPSTREAM_CONCURRENCY = 6

/**
 * Sets the retries one upstream request is given when a caller names none.
 *
 * @remarks
 * A read is attempted once by default. Retrying is the caller's decision because
 * a repeated request costs the upstream host, not this package.
 */
export const DEFAULT_UPSTREAM_RETRIES = 0

/**
 * Names the npm scope and repository owner the fleet's packages and sources are
 * published under.
 */
export const ORKESTREL_SCOPE = 'orkestrel'

/**
 * Names the repository this package's own vendored files are served from.
 *
 * @remarks
 * This package's bare name, stated rather than derived, because the reader has no
 * manifest to read it out of and one raw content host serves both the fleet's
 * guides and these files.
 */
export const SCAFFOLD_REPOSITORY = 'scaffold'

/** Holds the note a release carries when its packument names no readable latest version. */
export const UNREADABLE_VERSION_NOTE = 'the answer carries no readable latest version'

/**
 * Names the media type that selects the registry's abbreviated packument.
 *
 * @remarks
 * Sent on exactly the reads that want a version, so the registry answers with the
 * smaller document instead of the whole packument.
 */
export const PACKUMENT_MEDIA_TYPE = 'application/vnd.npm.install-v1+json'
