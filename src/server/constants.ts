import { MAX_ARTIFACT_BYTES } from '@src/core'

/**
 * The prune-owned directories. Files outside these roots are never candidates
 * for removal, including project-owned skills under `.agents/skills` and
 * `.claude/skills`.
 *
 * @example
 * ```ts
 * import { PRUNE_DIRECTORIES } from '@orkestrel/scaffold/server'
 *
 * PRUNE_DIRECTORIES // ['.claude/agents', '.codex/agents', 'scripts']
 * ```
 */
export const PRUNE_DIRECTORIES: readonly string[] = Object.freeze([
	'.claude/agents',
	'.codex/agents',
	'scripts',
])

/** Reserved metadata file written at the root of every staged host. */
export const HOST_MANIFEST_PATH = 'manifest.json'

/** Local configuration and credential-like paths that must never enter a vendored host. */
export const SENSITIVE_HOST_PATH_PATTERN =
	/(?:^|\/)(?:(?:\.git|\.ssh|\.aws|\.azure|\.docker|\.kube|\.gnupg|\.env(?:\.[^/]*)?)(?:\/|$)|(?:\.npmrc|\.pypirc|\.netrc|\.git-credentials|settings\.local\.json|auth\.json|credentials(?:\.json)?|application_default_credentials\.json|id_rsa|id_ed25519|kubeconfig)(?:\/|$)|\.config\/(?:gh|gcloud)(?:\/|$)|\.local\/share\/keyrings(?:\/|$)|[^/]*service-account[^/]*\.json$|[^/]*\.(?:jks|key|p12|pem|pfx|pkcs12)$)/i

/** Existing repository metadata that a materialization target must never own. */
export const RESERVED_TARGET_PATH_PATTERN = /(?:^|\/)\.git(?:\/|$)/i

/** Maximum normalized package-catalog description length. */
export const MAX_CATALOG_DESCRIPTION_LENGTH = 500

/** Maximum UTF-8 bytes parsed from one local package guide. */
export const MAX_GUIDE_BYTES = MAX_ARTIFACT_BYTES

/** Maximum filesystem entries accepted by one vendored-host traversal. */
export const MAX_HOST_ENTRIES = 4_096

/** Maximum directory nesting accepted by one vendored-host traversal. */
export const MAX_HOST_DEPTH = 32

/** Maximum caller-controlled filesystem path depth accepted before filesystem work. */
export const MAX_FILESYSTEM_DEPTH = 64

/** Maximum UTF-8 bytes accepted in one portable filesystem path segment. */
export const MAX_PATH_SEGMENT_BYTES = 255

/** Windows device names that remain reserved even when followed by an extension. */
export const RESERVED_PATH_SEGMENT_PATTERN =
	/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9]|conin\$|conout\$)(?:\..*)?$/i

/** Maximum simultaneous upstream requests accepted by `Sync`. */
export const MAX_SYNC_CONCURRENCY = 64

/** Default simultaneous upstream requests used by `Sync`. */
export const DEFAULT_SYNC_CONCURRENCY = 6

/** Maximum retry count accepted by `Sync`. */
export const MAX_SYNC_RETRIES = 5

/** Maximum per-request timeout accepted by `Sync`, in milliseconds. */
export const MAX_SYNC_TIMEOUT = 300_000

/** Default per-request timeout used by `Sync`, in milliseconds. */
export const DEFAULT_SYNC_TIMEOUT = 10_000

/** Maximum response body accepted by `Sync`, in bytes. */
export const MAX_SYNC_LIMIT = MAX_ARTIFACT_BYTES

/** Default per-response byte limit used by `Sync`. */
export const DEFAULT_SYNC_LIMIT = MAX_ARTIFACT_BYTES

/** Default maximum dependencies or catalog entries retained by one Sync operation. */
export const DEFAULT_SYNC_ITEMS = 256

/** Maximum configurable dependencies or catalog entries for one Sync operation. */
export const MAX_SYNC_ITEMS = 1_000

/** Default cumulative response bytes retained by one Sync operation. */
export const DEFAULT_SYNC_BUDGET = 16_777_216

/** Maximum configurable cumulative response bytes retained by one Sync operation. */
export const MAX_SYNC_BUDGET = 104_857_600

/** Maximum caller-supplied endpoint characters inspected before URL allocation. */
export const MAX_SYNC_BASE_LENGTH = 2_048

/** Maximum portable Git branch characters accepted by the guide endpoint. */
export const MAX_SYNC_BRANCH_LENGTH = 255

/** Exact SHA-256 digest accepted by write preconditions. */
export const WRITE_DIGEST_PATTERN = /^[0-9a-f]{64}$/

/** Safe ASCII branch alphabet accepted before Git ref-component validation. */
export const SYNC_BRANCH_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._/-]*$/
