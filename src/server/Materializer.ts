import type { Guard, Result } from '@orkestrel/contract'
import type { EmitterInterface } from '@orkestrel/emitter'
import type {
	Artifact,
	Audit,
	CatalogEntry,
	Drift,
	Finding,
	HostArtifact,
	HydratedArtifact,
	ManifestRegionSet,
	Mirror,
	Plan,
	ScaffoldErrorCode,
} from '@src/core'
import type {
	Host,
	HostManifest,
	ManifestEntry,
	MaterializeResult,
	MaterializerEventMap,
	MaterializerInterface,
	MaterializerOptions,
	Worktree,
	WritePrecondition,
} from './types.js'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { attempt } from '@orkestrel/contract'
import { Emitter } from '@orkestrel/emitter'
import {
	catalogToLayers,
	CATALOG_AGENT_PATH,
	cloneValue,
	computeBytes,
	contentToHex,
	inferGroup,
	isAudit,
	isDeferredPath,
	isPlan,
	MAX_ARTIFACT_BYTES,
	MAX_MANIFEST_BYTES,
	MAX_TOTAL_ARTIFACT_BYTES,
	matchesDriftReachability,
	planToFindings,
	replaceManifestRanges,
	replaceManifestScripts,
	ScaffoldError,
	WORKSPACE_OWNED_PATHS,
} from '@src/core'
import {
	computeFileDigest,
	computeManifestDigest,
	hexToDigest,
	isPhysicalDirectory,
	isPhysicalFile,
	isVacant,
	listCanonPaths,
	listFiles,
	matchesProtectedPath,
	readFileHex,
	readFileText,
	readHostFloor,
	readHostManifest,
	readSnapshot,
	resolveContainedPath,
	stageBytes,
} from './helpers.js'
import {
	isCatalogEntries,
	isFilesystemPath,
	isHost,
	isManifestRegionSet,
	isMaterializerOptions,
	isMirrors,
	isWorktree,
} from './validators.js'
import { WriteTransaction } from './WriteTransaction.js'

/**
 * The mutation spine: read the vendored host, re-derive the target, stage, swap.
 *
 * @remarks
 * Every verb runs the same steps. It snapshots each caller-supplied value
 * and guards the snapshot, so a property backed by an accessor never reaches a
 * decision. It re-derives what it is about to touch and compares that against
 * the observation the caller handed in, refusing the whole call when anything
 * moved. Only then does it open a {@link WriteTransaction}, which stages every
 * byte in a private sibling directory and swaps them into place.
 *
 * The vendored host is read once, at construction, and cross-checked once. Its
 * manifest authenticates its own membership, which is all a checksum sitting
 * beside the data can do; matching that membership against the files actually
 * stored is this class's job. The comparison is exact text and therefore exact
 * case, so a manifest naming `agents.md` for a stored `AGENTS.md` is refused on
 * a case-insensitive filesystem rather than silently resolved.
 *
 * That host arrives as a directory path or as a whole {@link Host} value, and
 * every verb reads one immutable host either way. A value is owned, verified
 * against its own membership and digests, and read in memory; a write fills it
 * into a private root and copies from there, so the executable declarations the
 * release fixed reach the target from either representation.
 *
 * What a mutation guarantees is exactly what {@link WriteTransaction}
 * guarantees, and no more: a caught failure part way through a commit rolls the
 * whole commit back, no destination ever receives half-written bytes, and a
 * process killed mid-commit leaves a mixed target. This is not a journal and
 * does not claim to be one.
 *
 * Every error is emitted on `error` immediately before it is thrown, so an
 * observer sees a refusal even where the caller catches it.
 *
 * @example
 * ```ts
 * import type { Plan } from '@orkestrel/scaffold'
 * import { Materializer } from '@orkestrel/scaffold/server'
 *
 * declare const plan: Plan
 *
 * const materializer = new Materializer({ host: './dist/host' })
 * materializer.materialize(plan, './packages/router')
 * materializer.destroy()
 * ```
 */
export class Materializer implements MaterializerInterface {
	// The marker pair bounding the package table inside the catalog agent file.
	// It sits here rather than in `constants.ts` because that file is frozen; the
	// artifact that renders the file must read the same pair, so the pair belongs
	// in core as soon as both consumers exist.
	static readonly #opening = '<!-- orkestrel:catalog -->'
	static readonly #closing = '<!-- /orkestrel:catalog -->'

	readonly #emitter: Emitter<MaterializerEventMap>
	readonly #root: string | undefined
	readonly #value: Host | undefined
	readonly #manifest: HostManifest | undefined
	readonly #entries: ReadonlyMap<string, ManifestEntry>
	#destroyed = false

	/**
	 * Construct a materializer over one vendored host root.
	 *
	 * @param options - The vendored host, in either representation, the initial
	 * listeners, and the listener-error handler.
	 * @throws {@link ScaffoldError} coded `INVALID` when `options` is present but
	 * is not an option bag this materializer accepts, and `TARGET` when the host
	 * carries a manifest that cannot be read, does not match what it stores, or
	 * is a value that does not agree with the bytes beside it.
	 *
	 * @remarks
	 * A `host` path defaults to this package's own vendored root, resolved from
	 * this module's own location so it never depends on the caller's working
	 * directory. A root carrying no manifest is read as a raw checkout and every
	 * artifact maps onto it one to one.
	 *
	 * A `host` value is owned before it is read and then held immutable, so the
	 * bytes this check measured are the bytes every later read returns. It is
	 * verified the way a root is, against the same membership law: the manifest
	 * digest must cover the membership beside it, no two entries may claim one
	 * destination, and the fill must carry exactly one hashing byte string per
	 * declared entry.
	 *
	 * The host is read here rather than on first use, so a broken vendored root
	 * fails at construction where the caller can still act on it, and so nothing
	 * has to carry a second flag recording whether the read has happened yet.
	 */
	constructor(options?: MaterializerOptions) {
		if (options !== undefined && !isMaterializerOptions(options)) {
			throw new ScaffoldError(
				'INVALID',
				'The options argument is not the exact shape this materializer accepts.',
				{ field: 'options' },
			)
		}
		this.#emitter = new Emitter<MaterializerEventMap>({
			...(options?.on === undefined ? {} : { on: options.on }),
			...(options?.error === undefined ? {} : { error: options.error }),
		})
		const supplied = options?.host ?? readHostFloor()
		if (supplied !== undefined && !isFilesystemPath(supplied)) {
			const value = this.#own(supplied)
			this.#value = value
			this.#root = undefined
			this.#manifest = value.manifest
			this.#entries = new Map<string, ManifestEntry>(
				value.manifest.entries.map((entry) => [entry.destination, entry]),
			)
			this.#verify(value)
		} else {
			const root = supplied
			this.#value = undefined
			this.#root = root
			const read = attempt(() => readHostManifest(root))
			if (!read.success) {
				throw this.#error('TARGET', 'The vendored host carries a manifest that cannot be read.', {
					host: root,
					error: read.error,
				})
			}
			this.#manifest = read.value
			this.#entries = new Map<string, ManifestEntry>(
				(read.value?.entries ?? []).map((entry) => [entry.destination, entry]),
			)
			if (read.value !== undefined) this.#reconcile(read.value, root)
		}
	}

	/** The materializer's observation channel. */
	get emitter(): EmitterInterface<MaterializerEventMap> {
		return this.#emitter
	}

	/**
	 * Compare a plan with a target through the vendored host that will repair it.
	 *
	 * @param plan - The compiled plan to compare.
	 * @param target - The directory to inspect.
	 * @returns One finding per hydrated planned path, plus the foreign files
	 * beneath owned host roots and inside the instruction canon.
	 * @throws {@link ScaffoldError} coded `INVALID` when an argument is not the
	 * exact shape, `TARGET` when the host or target cannot be read within its
	 * bounds, and `DESTROYED` after teardown.
	 *
	 * @remarks
	 * Host directories expand before the target is read, so this method and
	 * {@link repair} compare the same paths with the same ownership. Foreign
	 * candidates are files beneath those expanded roots and files the target holds
	 * at a `CANON_PATHS` member, each in a group the plan selects; a file outside
	 * both populations never becomes a deletion candidate merely because its group
	 * is selected.
	 *
	 * The canon is staged for reading rather than for a target, so a copy of one of
	 * its paths sitting in a target is a superseded artifact and reports foreign. A
	 * path the plan claims inside the canon — the root instruction pointers and the
	 * catalog agent file — pairs with its artifact and is compared like any other
	 * planned path.
	 */
	audit(plan: Plan, target: string): Audit {
		this.#assertAlive()
		const accepted = this.#accept(plan, isPlan, 'plan')
		const directory = this.#accept(target, isFilesystemPath, 'target')
		return this.#derive(accepted, directory)
	}

	/**
	 * Write a plan into a vacant target.
	 *
	 * @param plan - The compiled plan to write.
	 * @param target - The directory to write into; it must hold nothing the plan would collide with.
	 * @returns The paths written and skipped.
	 * @throws {@link ScaffoldError} coded `INVALID` when an argument is not the
	 * exact shape, `TARGET` when the target is not vacant or the host does not
	 * carry a planned artifact, `WRITE` when the write cannot be staged or
	 * committed, and `DESTROYED` after teardown.
	 *
	 * @remarks
	 * The plan's own bytes are not trusted: every host-origin artifact is re-read
	 * from the vendored root, so what lands is what this package ships rather than
	 * what a caller-built plan claimed it ships. A vendored directory expands into
	 * one artifact per file beneath it, and a vendored directory holding no file
	 * at all is created as an empty directory.
	 */
	materialize(plan: Plan, target: string): MaterializeResult {
		this.#assertAlive()
		const accepted = this.#accept(plan, isPlan, 'plan')
		const directory = this.#accept(target, isFilesystemPath, 'target')
		if (!isVacant(directory)) {
			throw this.#error('TARGET', `The target at ${directory} is not vacant.`, {
				target: directory,
			})
		}
		const empty = this.#empty(accepted)
		const hydrated = this.#hydrate(accepted)
		return this.#apply(directory, hydrated.artifacts, empty, [], [])
	}

	/**
	 * Write a plan into an existing target, guided by an audit of it.
	 *
	 * @param plan - The compiled plan to write.
	 * @param audit - The preview returned by this materializer's `audit` method.
	 * @param target - The directory to write into.
	 * @returns The paths written and skipped, each decided by its artifact's ownership.
	 * @throws {@link ScaffoldError} coded `INVALID` when an argument is not the
	 * exact shape, `TARGET` when the target moved since its audit, `WRITE` when
	 * the write cannot be staged or committed, and `DESTROYED` after teardown.
	 *
	 * @remarks
	 * The audit is a preview, not an instruction. The plan is hydrated and
	 * compared against the target again here, and the verdicts that produces must
	 * match the ones the audit carried for every path the plan owns; anything else
	 * means the target moved, and the whole call is refused. The audit is checked
	 * for agreement rather than for plausibility, so a verdict the comparison could
	 * not have produced — a birth-owned path reported stale, which the `Finding`
	 * shape admits — disagrees with the derived one and is refused. A missing
	 * destination is restored whatever its ownership; a stale one is replaced only
	 * where the artifact claims its bytes, which is what leaves a presence-owned
	 * file a consumer has edited exactly as it is.
	 */
	repair(plan: Plan, audit: Audit, target: string): MaterializeResult {
		this.#assertAlive()
		const accepted = this.#accept(plan, isPlan, 'plan')
		const preview = this.#accept(audit, isAudit, 'audit')
		const directory = this.#accept(target, isFilesystemPath, 'target')
		const hydrated = this.#hydrate(accepted)
		const derived = this.#derive(accepted, directory, hydrated)
		this.#reconfirm(derived.findings, preview.findings, directory)
		const drifted = new Map<string, Drift>(
			derived.findings.map((finding) => [finding.path, finding.drift]),
		)
		const writes: Artifact[] = []
		const skipped: string[] = []
		const preconditions: WritePrecondition[] = []
		for (const artifact of hydrated.artifacts) {
			const drift = drifted.get(artifact.path)
			if (drift !== 'missing' && drift !== 'stale') {
				skipped.push(artifact.path)
				continue
			}
			preconditions.push(this.#bind(directory, artifact.path, drift === 'missing'))
			writes.push(artifact)
		}
		return this.#apply(directory, writes, [], skipped, preconditions)
	}

	/**
	 * Write fetched dependency guides to their local mirrors.
	 *
	 * @param mirrors - The fetched guides; each carries the local bytes its write is held to.
	 * @param target - The directory to write into.
	 * @returns The mirror paths written and skipped; a mirror already current is skipped.
	 * @throws {@link ScaffoldError} coded `INVALID` when an argument is not the
	 * exact shape, `TARGET` when a mirror moved since it was fetched, `WRITE` when
	 * the write cannot be staged or committed, and `DESTROYED` after teardown.
	 *
	 * @remarks
	 * A verdict carrying no bytes carries a cause instead, so it is skipped rather
	 * than written: one unreachable package never costs the caller the rest of the
	 * fetch, and it never empties a mirror it could not replace.
	 */
	mirror(mirrors: readonly Mirror[], target: string): MaterializeResult {
		this.#assertAlive()
		const accepted = this.#accept(mirrors, isMirrors, 'mirrors')
		const directory = this.#accept(target, isFilesystemPath, 'target')
		const writes: Artifact[] = []
		const skipped: string[] = []
		const preconditions: WritePrecondition[] = []
		for (const fetched of accepted) {
			if (fetched.lookup !== 'found' || fetched.observed === contentToHex(fetched.content)) {
				skipped.push(fetched.path)
				continue
			}
			const current = readFileHex(directory, fetched.path)
			if (current !== fetched.observed) {
				throw this.#error('TARGET', `The mirror at ${fetched.path} moved since it was fetched.`, {
					target: directory,
					path: fetched.path,
				})
			}
			preconditions.push(this.#bind(directory, fetched.path, current === undefined))
			writes.push({
				path: fetched.path,
				group: inferGroup(fetched.path),
				ownership: 'content',
				origin: 'computed',
				content: fetched.content,
			})
		}
		return this.#apply(directory, writes, [], skipped, preconditions)
	}

	/**
	 * Rewrite the marker-bounded package table in the target's catalog agent file.
	 *
	 * @param entries - The published packages the table must list.
	 * @param target - The directory to write into.
	 * @returns The catalog path, written when the region's bytes moved and skipped otherwise.
	 * @throws {@link ScaffoldError} coded `INVALID` when an argument is not the
	 * exact shape, `TARGET` when the file is unreadable or carries no marked
	 * region, `WRITE` when the write cannot be staged or committed, and
	 * `DESTROYED` after teardown.
	 *
	 * @remarks
	 * Only the text between the markers is replaced, so every word a consumer
	 * wrote around the table survives the call. A row whose lookup produced no
	 * version prints the cause it carries instead, because dropping the row would
	 * hide a package the organization publishes behind one failed request.
	 */
	catalog(entries: readonly CatalogEntry[], target: string): MaterializeResult {
		this.#assertAlive()
		const accepted = this.#accept(entries, isCatalogEntries, 'entries')
		const directory = this.#accept(target, isFilesystemPath, 'target')
		return this.#rewrite(
			directory,
			CATALOG_AGENT_PATH,
			MAX_ARTIFACT_BYTES,
			this.#recatalog(accepted),
		)
	}

	/**
	 * Rewrite the manifest regions the caller names in the target's manifest.
	 *
	 * @param regions - The dependency ranges and script values the manifest must declare.
	 * @param target - The directory to write into.
	 * @returns The manifest path, written when a named region moved and skipped otherwise.
	 * @throws {@link ScaffoldError} coded `INVALID` when an argument is not the
	 * exact shape or names a package the manifest does not declare, `TARGET` when
	 * the manifest is unreadable, `WRITE` when the write cannot be staged or
	 * committed, and `DESTROYED` after teardown.
	 *
	 * @remarks
	 * No other part of the manifest is read back out or rewritten. The method
	 * never reads or writes `peerDependencies` or `peerDependenciesMeta`. Only a
	 * range already declared in its named writable section is rewritten, so an
	 * undeclared name is refused instead of inserted.
	 *
	 * The regions refuse differently because their targets differ. A range
	 * the manifest does not declare is the caller's mistake and throws. A script
	 * holding a value the region does not accept is the workspace author's own
	 * chain, so the script region is skipped without a byte moving and the range
	 * region is still written. The advisory channel reports what the maintainer
	 * must paste.
	 */
	declare(regions: ManifestRegionSet, target: string): MaterializeResult {
		this.#assertAlive()
		const accepted = this.#accept(regions, isManifestRegionSet, 'regions')
		const directory = this.#accept(target, isFilesystemPath, 'target')
		return this.#rewrite(directory, 'package.json', MAX_MANIFEST_BYTES, this.#redeclare(accepted))
	}

	/**
	 * Re-derive and delete the tracked files the plan does not own.
	 *
	 * @param plan - The compiled plan that decides which paths are foreign.
	 * @param audit - The preview returned by this materializer's `audit` method; it must agree with the candidate set this call re-derives.
	 * @param worktree - The target's git state; only a tracked path is ever deleted.
	 * @param target - The directory to delete from.
	 * @returns The paths removed.
	 * @throws {@link ScaffoldError} coded `INVALID` when an argument is not the
	 * exact shape, `TARGET` when the tree carries uncommitted changes or a
	 * candidate moved since its audit, `WRITE` when the deletion cannot be staged
	 * or committed, and `DESTROYED` after teardown.
	 *
	 * @remarks
	 * The candidate set is re-derived and compared against the audit before
	 * anything moves, and every file is quarantined and re-verified rather than
	 * unlinked, so a failure part way through restores what it already took. The
	 * package's own source and application trees are never candidates, whatever
	 * the audit reports, and neither is anything git does not track: git is the
	 * recovery mechanism, so a path it cannot restore is not one this verb takes.
	 * A tree carrying uncommitted work is refused whole for the same reason.
	 *
	 * One candidate list carries both foreign populations {@link audit} reports, so
	 * a superseded instruction copy the target holds inside the canon is deleted in
	 * the same transaction as a stray beneath an owned root. Membership decides it,
	 * never byte identity: a copy a release behind no longer matches the bytes the
	 * canon now stages, and matching bytes is exactly how such a copy would be
	 * spared. An untracked leftover is left where it sits and stays a finding, which
	 * is the seam a maintainer keeps a git-ignored file in.
	 *
	 * The whole call refuses when the preview disagrees with the re-derivation on
	 * any foreign finding, including one the deletion itself would skip, because a
	 * preview stale anywhere is stale evidence.
	 */
	remove(plan: Plan, audit: Audit, worktree: Worktree, target: string): MaterializeResult {
		this.#assertAlive()
		const accepted = this.#accept(plan, isPlan, 'plan')
		const preview = this.#accept(audit, isAudit, 'audit')
		const state = this.#accept(worktree, isWorktree, 'worktree')
		const directory = this.#accept(target, isFilesystemPath, 'target')
		if (state.dirty.length > 0) {
			throw this.#error('TARGET', `The target at ${directory} carries uncommitted changes.`, {
				target: directory,
				dirty: state.dirty.length,
			})
		}
		const derived = this.#derive(accepted, directory)
		this.#reconfirmCandidates(derived.findings, preview.findings, directory)
		const tracked = new Set(state.tracked)
		const removals: string[] = []
		const skipped: string[] = []
		for (const finding of derived.findings) {
			if (finding.drift !== 'foreign') continue
			if (!tracked.has(finding.path) || matchesProtectedPath(finding.path)) {
				skipped.push(finding.path)
				continue
			}
			removals.push(finding.path)
		}
		const preconditions: WritePrecondition[] = []
		for (const path of removals) preconditions.push(this.#bind(directory, path, false))
		return this.#purge(directory, removals, skipped, preconditions)
	}

	/**
	 * Tear the materializer down. Every later call throws, and teardown is idempotent.
	 *
	 * @returns Nothing.
	 *
	 * @example
	 * ```ts
	 * import { Materializer } from '@orkestrel/scaffold/server'
	 *
	 * const materializer = new Materializer()
	 * materializer.destroy()
	 * materializer.emitter.destroyed // true
	 * ```
	 */
	destroy(): void {
		if (this.#destroyed) return
		this.#destroyed = true
		this.#emitter.emit('destroy')
		this.#emitter.destroy()
	}

	// Own the caller's value before anything reads it, then guard the copy. A host
	// handed in as a value is live until it is copied, so what the verification
	// below measures is what every later read returns.
	#own(host: Host): Host {
		const owned = cloneValue(host)
		if (isHost(owned)) return owned
		throw this.#error(
			'INVALID',
			'The host argument is not the exact shape this materializer accepts.',
			{ field: 'host' },
		)
	}

	// The claim a value cannot make about itself: that the membership its digest
	// covers is the membership beside it, and that the fill carries exactly one
	// hashing byte string per declared entry. This is what `#reconcile` is for a
	// root, measured against the bytes handed in rather than a directory walk.
	#verify(host: Host): void {
		const { entries, roots } = host.manifest
		if (host.manifest.digest !== computeManifestDigest(entries, roots)) {
			throw this.#error(
				'TARGET',
				'The vendored host manifest does not cover the membership beside it.',
			)
		}
		if (this.#entries.size !== entries.length) {
			throw this.#error('TARGET', 'The vendored host manifest maps two files to one destination.')
		}
		if (new Set(entries.map((entry) => entry.storage)).size !== entries.length) {
			throw this.#error('TARGET', 'The vendored host manifest maps two destinations to one file.')
		}
		const held = Object.keys(host.bytes)
		if (held.length !== entries.length) {
			throw this.#error('TARGET', 'The vendored host does not carry what its manifest declares.', {
				held: held.length,
				declared: entries.length,
			})
		}
		for (const entry of entries) {
			const hex = host.bytes[entry.destination]
			if (hex === undefined) {
				throw this.#error(
					'TARGET',
					`The vendored host carries no bytes for ${entry.destination}.`,
					{ destination: entry.destination },
				)
			}
			if (hexToDigest(hex) !== entry.digest) {
				throw this.#error(
					'TARGET',
					`The vendored host carries bytes for ${entry.destination} that miss its digest.`,
					{ destination: entry.destination },
				)
			}
		}
	}

	// The claim a manifest cannot make about itself: that what it declares is what
	// the host actually stores, one to one and spelled the same way. Compared as
	// exact text against a real directory walk, so a case-folded name on a
	// case-insensitive filesystem is a refusal rather than a silent resolution.
	#reconcile(manifest: HostManifest, root: string): void {
		const walked = attempt(() => listFiles(root))
		if (!walked.success) {
			throw this.#error('TARGET', 'The vendored host cannot be inventoried.', {
				host: root,
				error: walked.error,
			})
		}
		const declared = [...manifest.entries.map((entry) => entry.storage), 'manifest.json'].sort()
		const stored = walked.value
		if (
			stored.length !== declared.length ||
			stored.some((name, index) => name !== declared[index])
		) {
			throw this.#error('TARGET', 'The vendored host does not store what its manifest declares.', {
				host: root,
				stored: stored.length,
				declared: declared.length,
			})
		}
		if (this.#entries.size !== manifest.entries.length) {
			throw this.#error('TARGET', 'The vendored host manifest maps two files to one destination.', {
				host: root,
			})
		}
	}

	// Replace every host-origin artifact with what the vendored root actually
	// holds. A directory becomes one artifact per file beneath it; the destinations
	// another verb owns the bytes of stay presence-owned, because a byte claim this
	// verb cannot keep is one the audit beside it would immediately fail.
	#hydrate(plan: Plan): Plan {
		const artifacts: Artifact[] = []
		let remaining = MAX_TOTAL_ARTIFACT_BYTES
		for (const artifact of plan.artifacts) {
			if (artifact.origin !== 'host') {
				remaining -= computeBytes(artifact.content)
				artifacts.push(artifact)
				continue
			}
			const expanded = this.#expand(artifact, remaining)
			for (const one of expanded) remaining -= (one.hex?.length ?? 0) / 2
			artifacts.push(...expanded)
		}
		if (remaining < 0) {
			throw this.#error('TARGET', 'The hydrated plan retains more bytes than one plan may.', {
				host: this.#root,
				limit: MAX_TOTAL_ARTIFACT_BYTES,
			})
		}
		return { blueprint: plan.blueprint, groups: plan.groups, artifacts }
	}

	// Hydrate once, extend the target snapshot beneath the vendored directories
	// this plan expands and across the instruction canon the target holds, then run
	// the core comparison over that one population. Repair may supply the hydrated
	// plan it already needs for writes, while the public audit lets this method own
	// the hydration itself.
	#derive(plan: Plan, target: string, hydrated = this.#hydrate(plan)): Audit {
		const paths = new Set(hydrated.artifacts.map((artifact) => artifact.path))
		for (const root of this.#roots(plan)) {
			const directory = resolveContainedPath(target, root)
			if (directory === undefined) {
				throw this.#error('TARGET', `The owned root at ${root} leaves its target.`, {
					target,
					path: root,
				})
			}
			for (const name of listFiles(directory)) paths.add(`${root}/${name}`)
		}
		for (const path of listCanonPaths(target, plan.groups)) paths.add(path)
		return {
			findings: planToFindings(hydrated, readSnapshot(target, [...paths])),
			questions: [],
		}
	}

	// The target roots scaffold owns completely are exactly the host directories
	// this plan expands. A manifest states the directory shape; a raw host is
	// inspected directly. Files and host roots outside the plan never enter the set.
	#roots(plan: Plan): readonly string[] {
		const roots = new Set<string>()
		for (const artifact of plan.artifacts) {
			if (artifact.origin !== 'host') continue
			const source = artifact.source ?? artifact.path
			if (this.#manifest?.roots.includes(source) === true) {
				roots.add(artifact.path)
				continue
			}
			if (this.#manifest !== undefined) continue
			const root = this.#root
			const directory = root === undefined ? undefined : resolveContainedPath(root, source)
			if (directory !== undefined && isPhysicalDirectory(directory)) roots.add(artifact.path)
		}
		return [...roots]
	}

	// One host artifact against the vendored root, through the manifest when the
	// root carries one and one to one when it does not.
	#expand(artifact: HostArtifact | HydratedArtifact, remaining: number): readonly Artifact[] {
		const manifest = this.#manifest
		const source = artifact.source ?? artifact.path
		if (manifest === undefined) return this.#expandRaw(artifact, source, remaining)
		const matched = manifest.entries.filter(
			(entry) => entry.destination === source || entry.destination.startsWith(`${source}/`),
		)
		const rooted = manifest.roots.some((root) => root === source || root.startsWith(`${source}/`))
		if (matched.length === 0 && !rooted) {
			throw this.#error('TARGET', `The vendored host does not carry ${source}.`, {
				host: this.#root,
				source,
			})
		}
		const expanded: Artifact[] = []
		let budget = remaining
		for (const entry of matched) {
			const path = this.#remap(artifact, entry.destination)
			if (WORKSPACE_OWNED_PATHS.includes(path)) {
				expanded.push(this.#presence(artifact, path, entry.destination))
				continue
			}
			if (isDeferredPath(path)) {
				expanded.push(this.#presence(artifact, path, entry.destination))
				continue
			}
			const hex = this.#read(entry, budget)
			budget -= hex.length / 2
			expanded.push(this.#hydrated(artifact, path, entry.destination, hex))
		}
		return expanded
	}

	// A host root with no manifest is a plain checkout, so a destination maps onto
	// it under the name it is written to and a directory is walked directly. Only a
	// root reaches here: a value host always carries the manifest it was built with.
	#expandRaw(
		artifact: HostArtifact | HydratedArtifact,
		source: string,
		remaining: number,
	): readonly Artifact[] {
		const root = this.#root
		const full = root === undefined ? undefined : resolveContainedPath(root, source)
		if (full === undefined) {
			throw this.#error('TARGET', `The host source at ${source} leaves its root.`, {
				host: this.#root,
				source,
			})
		}
		if (isPhysicalFile(full)) {
			if (WORKSPACE_OWNED_PATHS.includes(artifact.path)) {
				return [this.#presence(artifact, artifact.path, source)]
			}
			if (isDeferredPath(artifact.path)) {
				return [this.#presence(artifact, artifact.path, source)]
			}
			return [this.#hydrated(artifact, artifact.path, source, this.#readRoot(source, remaining))]
		}
		if (!isPhysicalDirectory(full)) {
			throw this.#error('TARGET', `The host source at ${source} is not a readable file.`, {
				host: this.#root,
				source,
			})
		}
		const expanded: Artifact[] = []
		let budget = remaining
		for (const name of listFiles(full)) {
			const path = `${artifact.path}/${name}`
			const destination = `${source}/${name}`
			if (WORKSPACE_OWNED_PATHS.includes(path)) {
				expanded.push(this.#presence(artifact, path, destination))
				continue
			}
			if (isDeferredPath(path)) {
				expanded.push(this.#presence(artifact, path, destination))
				continue
			}
			const hex = this.#readRoot(destination, budget)
			budget -= hex.length / 2
			expanded.push(this.#hydrated(artifact, path, destination, hex))
		}
		return expanded
	}

	// The vendored directories holding no file at all. They are the one thing a
	// file inventory cannot report, which is why the manifest declares them, and a
	// plan covering their parent covers them.
	#empty(plan: Plan): readonly string[] {
		const manifest = this.#manifest
		if (manifest === undefined) return []
		const directories = new Set<string>()
		for (const artifact of plan.artifacts) {
			if (artifact.origin !== 'host') continue
			const source = artifact.source ?? artifact.path
			for (const root of manifest.roots) {
				if (root !== source && !root.startsWith(`${source}/`)) continue
				const filled = manifest.entries.some(
					(entry) => entry.destination === root || entry.destination.startsWith(`${root}/`),
				)
				if (!filled) directories.add(this.#remap(artifact, root))
			}
		}
		return [...directories].sort()
	}

	// Move one manifest destination from the artifact's source prefix onto its
	// target prefix, so a vendored directory expands under the path the plan wrote
	// rather than under the name the host stores it as.
	#remap(artifact: HostArtifact | HydratedArtifact, destination: string): string {
		const source = artifact.source ?? artifact.path
		if (destination === source) return artifact.path
		if (!destination.startsWith(`${source}/`)) {
			throw this.#error('TARGET', `The vendored destination ${destination} is outside ${source}.`, {
				host: this.#root,
				source,
				destination,
			})
		}
		return `${artifact.path}/${destination.slice(source.length + 1)}`
	}

	#presence(
		artifact: HostArtifact | HydratedArtifact,
		path: string,
		destination: string,
	): HostArtifact {
		return {
			path,
			group: artifact.group,
			ownership: 'presence',
			origin: 'host',
			source: destination,
			...(artifact.environment === undefined ? {} : { environment: artifact.environment }),
		}
	}

	#hydrated(
		artifact: HostArtifact | HydratedArtifact,
		path: string,
		destination: string,
		hex: string,
	): HydratedArtifact {
		return {
			path,
			group: artifact.group,
			ownership: 'content',
			origin: 'host',
			source: destination,
			...(artifact.environment === undefined ? {} : { environment: artifact.environment }),
			hex,
		}
	}

	// One declared file's exact bytes, from the value the caller supplied or from
	// the storage name the root holds it under. The ceiling is the same either
	// way, so a value host retains no more of one file than a root does.
	#read(entry: ManifestEntry, budget: number): string {
		const held = this.#value?.bytes[entry.destination]
		if (held === undefined) return this.#readRoot(entry.storage, budget)
		if (held.length / 2 > Math.max(0, Math.min(MAX_ARTIFACT_BYTES, budget))) {
			throw this.#error('TARGET', `The vendored host cannot be read at ${entry.destination}.`, {
				destination: entry.destination,
				limit: MAX_ARTIFACT_BYTES,
			})
		}
		return held
	}

	#readRoot(storage: string, budget: number): string {
		const root = this.#root
		const hex =
			root === undefined
				? undefined
				: readFileHex(root, storage, Math.max(0, Math.min(MAX_ARTIFACT_BYTES, budget)))
		if (hex === undefined) {
			throw this.#error('TARGET', `The vendored host cannot be read at ${storage}.`, {
				host: this.#root,
				storage,
			})
		}
		return hex
	}

	// The audit is a preview of the same comparison this call just made, so they
	// must agree on every path the plan owns. A wider audit may also carry foreign
	// paths, which belong to the deletion verb and say nothing here.
	#reconfirm(derived: readonly Finding[], preview: readonly Finding[], target: string): void {
		const previewed = new Map<string, Finding>(preview.map((finding) => [finding.path, finding]))
		for (const finding of derived) {
			if (finding.drift === 'foreign') continue
			const other = previewed.get(finding.path)
			if (other === undefined) {
				throw this.#error('TARGET', `The path ${finding.path} is not covered by its audit.`, {
					target,
					path: finding.path,
				})
			}
			if (other.drift === finding.drift && other.observed === finding.observed) continue
			if (!matchesDriftReachability(finding.ownership, other)) {
				throw this.#error(
					'TARGET',
					`The path ${finding.path} carries an audit verdict this plan could not produce.`,
					{ target, path: finding.path, ownership: finding.ownership, drift: other.drift },
				)
			}
			throw this.#error('TARGET', `The path ${finding.path} moved since its audit.`, {
				target,
				path: finding.path,
			})
		}
	}

	// Delete only the foreign findings the same plan and target derive. The
	// preview must carry that exact membership and the same bytes, so neither a
	// fabricated candidate nor a path that moved can reach a transaction.
	#reconfirmCandidates(
		derived: readonly Finding[],
		preview: readonly Finding[],
		target: string,
	): void {
		const current = derived.filter((finding) => finding.drift === 'foreign')
		const supplied = preview.filter((finding) => finding.drift === 'foreign')
		const candidates = new Map(current.map((finding) => [finding.path, finding]))
		const previewed = new Map(supplied.map((finding) => [finding.path, finding]))
		if (candidates.size !== current.length || previewed.size !== supplied.length) {
			throw this.#error('TARGET', 'The audit repeats a deletion candidate.', { target })
		}
		for (const finding of supplied) {
			const candidate = candidates.get(finding.path)
			if (candidate === undefined) {
				throw this.#error(
					'TARGET',
					`The path ${finding.path} is not a deletion candidate for this plan.`,
					{ target, path: finding.path },
				)
			}
			if (candidate.group !== finding.group) {
				throw this.#error(
					'TARGET',
					`The path ${finding.path} carries a group this plan does not derive.`,
					{
						target,
						path: finding.path,
					},
				)
			}
			if (candidate.observed !== finding.observed) {
				throw this.#error('TARGET', `The path ${finding.path} moved since its audit.`, {
					target,
					path: finding.path,
				})
			}
		}
		for (const finding of current) {
			if (previewed.has(finding.path)) continue
			throw this.#error('TARGET', `The path ${finding.path} is not covered by its audit.`, {
				target,
				path: finding.path,
			})
		}
	}

	// Bind one destination to what this call just observed at it. The digest is
	// taken directly rather than derived from the observation, because a digest
	// over bytes nobody re-read would only restate what the comparison already
	// proved.
	#bind(target: string, path: string, absent: boolean): WritePrecondition {
		const destination = resolveContainedPath(target, path)
		if (destination === undefined) {
			throw this.#error('INVALID', `The path ${path} is off contract or leaves its target.`, {
				target,
				path,
			})
		}
		if (absent) return { path: destination, shape: 'absent' }
		const digest = computeFileDigest(destination)
		if (digest === undefined) {
			throw this.#error('TARGET', `The path ${path} moved while it was being bound.`, {
				target,
				path,
			})
		}
		return { path: destination, shape: 'file', digest }
	}

	// Read one whole text file, hand it to the rewrite that owns it, and write it
	// back only when its bytes actually moved.
	#rewrite(
		target: string,
		path: string,
		limit: number,
		rewrite: (text: string) => string,
	): MaterializeResult {
		const text = readFileText(target, path, limit)
		if (text === undefined) {
			throw this.#error('TARGET', `The file at ${path} is not readable text.`, { target, path })
		}
		const content = rewrite(text)
		if (content === text) {
			return this.#finish({ target, written: [], skipped: [path], removed: [] })
		}
		return this.#apply(
			target,
			[{ path, group: inferGroup(path), ownership: 'content', origin: 'computed', content }],
			[],
			[],
			[this.#bind(target, path, false)],
		)
	}

	// Stage every write in one transaction and swap them in together, so a target
	// either receives the whole set or is left as it was found. A value host is
	// filled into a private root first and cleared afterwards, so the write path
	// copies real files with the modes the release declares whichever
	// representation supplied them.
	#apply(
		target: string,
		writes: readonly Artifact[],
		directories: readonly string[],
		skipped: readonly string[],
		preconditions: readonly WritePrecondition[],
	): MaterializeResult {
		const paths = [...writes.map((artifact) => artifact.path), ...directories]
		if (paths.length === 0) return this.#finish({ target, written: [], skipped, removed: [] })
		const filled = this.#fill(writes)
		try {
			const transaction = this.#open(target, paths, preconditions)
			const staged = attempt(() => {
				for (const artifact of writes) {
					if (artifact.origin === 'host') this.#copy(transaction, artifact, filled ?? this.#root)
					else transaction.write(artifact.path, artifact.content)
				}
				for (const path of directories) transaction.establish(path)
			})
			const written = this.#close(transaction, staged, target)
			for (const path of written) this.#emitter.emit('write', path)
			return this.#finish({ target, written, skipped, removed: [] })
		} finally {
			if (filled !== undefined) rmSync(filled, { recursive: true, force: true })
		}
	}

	// Fill a private root with exactly the value host's files this write set needs,
	// or answer `undefined` when no value host supplied them. The root is private
	// to one call and removed when that call ends, so nothing outlives the write it
	// was made for.
	#fill(writes: readonly Artifact[]): string | undefined {
		const value = this.#value
		if (value === undefined) return undefined
		const destinations = new Set<string>()
		for (const artifact of writes) {
			if (artifact.origin !== 'host') continue
			destinations.add(artifact.source ?? artifact.path)
		}
		if (destinations.size === 0) return undefined
		const opened = attempt(() => mkdtempSync(join(tmpdir(), 'orkestrel-scaffold-fill-')))
		if (!opened.success) {
			throw this.#error('WRITE', 'The supplied host could not be filled into a private root.', {
				error: opened.error,
			})
		}
		const root = opened.value
		const stored = attempt(() => stageBytes(value, root, [...destinations]))
		if (stored.success) return root
		rmSync(root, { recursive: true, force: true })
		this.#emitter.emit('error', stored.error)
		throw stored.error
	}

	// Quarantine every candidate in one transaction. A deletion that fails part way
	// through puts back what it already took.
	#purge(
		target: string,
		removals: readonly string[],
		skipped: readonly string[],
		preconditions: readonly WritePrecondition[],
	): MaterializeResult {
		if (removals.length === 0) return this.#finish({ target, written: [], skipped, removed: [] })
		const transaction = this.#open(target, removals, preconditions)
		const staged = attempt(() => {
			for (const path of removals) transaction.remove(path)
		})
		const removed = this.#close(transaction, staged, target)
		for (const path of removed) this.#emitter.emit('remove', path)
		return this.#finish({ target, written: [], skipped, removed })
	}

	#open(
		target: string,
		paths: readonly string[],
		preconditions: readonly WritePrecondition[],
	): WriteTransaction {
		const opened = attempt(() => new WriteTransaction(target, paths, preconditions))
		if (opened.success) return opened.value
		this.#emitter.emit('error', opened.error)
		throw opened.error
	}

	// Commit a staged transaction, or discard it and republish whichever failure
	// the caller has to act on. The transaction's own coded reason survives, so a
	// destination that moved is still told apart from a write that could not land.
	#close(transaction: WriteTransaction, staged: Result<void>, target: string): readonly string[] {
		if (!staged.success) {
			const cleared = attempt(() => transaction.discard())
			if (!cleared.success) {
				throw this.#error('WRITE', `The write into ${target} could not be staged or cleared.`, {
					target,
					error: staged.error,
					cleanup: cleared.error,
				})
			}
			this.#emitter.emit('error', staged.error)
			throw staged.error
		}
		const committed = attempt(() => transaction.commit())
		if (committed.success) return committed.value
		this.#emitter.emit('error', committed.error)
		throw committed.error
	}

	// Stage one vendored file, under the storage name the manifest holds it as and
	// with the executable bit that manifest records. The root is the one the caller
	// named or the private one a value host was filled into, and the two are the
	// same shape, so nothing below here reads the representation.
	#copy(
		transaction: WriteTransaction,
		artifact: HostArtifact | HydratedArtifact,
		root: string | undefined,
	): void {
		const destination = artifact.source ?? artifact.path
		const entry = this.#entries.get(destination)
		const storage = entry === undefined ? destination : entry.storage
		const source = root === undefined ? undefined : resolveContainedPath(root, storage)
		if (source === undefined) {
			throw this.#error('TARGET', `The vendored source at ${storage} leaves its root.`, {
				host: root,
				storage,
			})
		}
		transaction.copy(artifact.path, source, entry?.executable === true)
	}

	// The catalog table, rendered between the markers that bound it.
	#recatalog(entries: readonly CatalogEntry[]): (text: string) => string {
		// The layer is computed from the edges in the same call that writes them, so
		// they cannot disagree. A name absent from every layer sits in a cycle and
		// carries no layer cell rather than a guessed one.
		const layers = catalogToLayers(entries)
		const placed = new Map<string, number>()
		for (const [index, layer] of layers.entries()) for (const name of layer) placed.set(name, index)
		const rows: string[][] = entries.map((entry) => {
			if (entry.lookup !== 'found') {
				return [`\`${entry.name}\``, this.#cell(entry.note), '', '']
			}
			const layer = placed.get(entry.name)
			const edges = entry.dependencies
				.map((dependency) => `\`${dependency.name}\` \`${dependency.range}\``)
				.join(', ')
			return [
				`\`${entry.name}\``,
				`\`${entry.version}\``,
				layer === undefined ? '' : `L${String(layer)}`,
				edges,
			]
		})
		const headers = ['Package', 'Version', 'Layer', 'Runtime dependencies']
		const widths = headers.map((header, column) => {
			let width = Math.max(3, header.length)
			for (const row of rows) width = Math.max(width, row[column]?.length ?? 0)
			return width
		})
		const table = [headers, widths.map((width) => '-'.repeat(width)), ...rows]
			.map(
				(row) =>
					`| ${row.map((cell, column) => cell.padEnd(widths[column] ?? cell.length)).join(' | ')} |`,
			)
			.join('\n')
		return (text: string) => {
			const opening = text.indexOf(Materializer.#opening)
			const closing = text.indexOf(Materializer.#closing, opening + Materializer.#opening.length)
			if (opening < 0 || closing < 0) {
				throw this.#error('TARGET', 'The catalog agent file carries no marked region.', {
					path: CATALOG_AGENT_PATH,
				})
			}
			return `${text.slice(0, opening + Materializer.#opening.length)}\n\n${table}\n\n${text.slice(closing)}`
		}
	}

	// One note, flattened into something a table row can hold.
	#cell(note: string): string {
		return note.replaceAll('|', '\\|').replaceAll(/\s+/gu, ' ').trim()
	}

	// Every named region replaced in place. The manifest's text is edited rather
	// than re-serialized, so nothing but the named ranges and script values moves.
	#redeclare(regions: ManifestRegionSet): (text: string) => string {
		return (text: string) => {
			const manifest = replaceManifestRanges(text, regions.pins)
			if (manifest === undefined) {
				const dependencies = [...regions.pins.runtime, ...regions.pins.development]
				const missing = dependencies.find(
					(dependency) => !text.includes(JSON.stringify(dependency.name)),
				)
				throw this.#error(
					'INVALID',
					`The manifest does not declare ${missing?.name ?? 'a requested package'}, so its range cannot be rewritten.`,
					missing === undefined ? undefined : { name: missing.name },
				)
			}
			return replaceManifestScripts(manifest, regions.scripts) ?? manifest
		}
	}

	// Publish the outcome on the observation channel, then hand it back.
	#finish(result: MaterializeResult): MaterializeResult {
		this.#emitter.emit('finish', result)
		return result
	}

	// Snapshot the caller's value, then guard the snapshot. The snapshot is what
	// closes the guard/use race: a property backed by an accessor never reaches the
	// guard, so what the guard measured is what every later read returns.
	#accept<T>(value: unknown, guard: Guard<T>, field: string): T {
		const snapshot = cloneValue(value)
		if (guard(snapshot)) return snapshot
		throw this.#error(
			'INVALID',
			`The ${field} argument is not the exact shape this materializer accepts.`,
			{ field },
		)
	}

	#assertAlive(): void {
		if (this.#destroyed) throw this.#error('DESTROYED', 'This materializer has been destroyed.')
	}

	// Publish the failure on the observation channel, then hand it back to be
	// thrown at the site that decided it.
	#error(code: ScaffoldErrorCode, message: string, context?: unknown): ScaffoldError {
		const error = new ScaffoldError(code, message, context)
		this.#emitter.emit('error', error)
		return error
	}
}
