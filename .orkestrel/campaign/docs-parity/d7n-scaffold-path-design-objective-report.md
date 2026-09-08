## Objective lane

Role: `analyst`. Engine: Sol. Lane: objective correctness and constraint fit.

## Proposed invariant

At the lint diagnostic boundary, `normalizeDiagnosticPath(cwd, filename)` must:

- Treat a `file:` prefix as a file URL and convert it with `fileURLToPath`.
- Treat every other value as a native path and resolve it against the child process `cwd`.
- Relativize the native path from that same `cwd` with `node:path.relative`.
- Apply `normalizePolicyPath` only to the relative result for stable slash comparison.
- Apply the same helper to fixture expectations.
- Propagate malformed file-URL errors.
- Preserve the complete relative path without basename reduction or case folding.

Node documents that `fileURLToPath` restores Windows drive paths, Unicode, spaces, and percent escapes that `URL.pathname` represents incorrectly. The API predates the Node 22.12 floor. `path.relative` supplies the host-native relative form. See [Node URL](https://nodejs.org/api/url.html#urlfileurltopathurl-options) and [Node path](https://nodejs.org/api/path.html#pathrelativefrom-to).

Reserve the `file:` prefix for URLs in this boundary contract. Without a separate discriminator, a POSIX native relative name beginning with that prefix is ambiguous.

## Ownership

The implementation unit must own these source and proof paths:

- `tests/setupPolicy.ts`: add the exported translation helper. Preserve `normalizePolicyPath` unchanged; its documented input remains workspace-relative text at `tests/setupPolicy.ts:271-278`, and its existing callers continue to receive separator normalization only.
- `tests/setup.test.ts`: add direct setup-project coverage for the exported helper and update the file’s scope comment.
- `tests/config.test.ts`: route the real Oxlint diagnostic filename and every expected fixture path through the helper. Preserve the child `cwd` at `tests/config.test.ts:1834-1842`, the diagnostic shape validation at `tests/config.test.ts:1847-1863`, and the strict rule assertions at `tests/config.test.ts:1873-1899`.
- `.claude/rules/portability.md`: add a path directive requiring `fileURLToPath` for URL-to-host-path conversion and refusing `URL.pathname`, manual scheme removal, escape decoding, and drive rewriting.
- `host.json`: regenerate after the canonical vendored bytes change.

Root must regenerate the staged `dist/host` tree before gates. No target copy, manifest dependency, package lock, public library type, or guide surface belongs to this unit.

The helper survives the wrapper test because it composes URL decoding, native resolution, host relativization, and display normalization into a materially narrower diagnostic-boundary contract. Keeping that composition inline would either duplicate it across actual and expected operands or leave the operands under different normalization.

## Required proofs

The setup-project proof must establish these behaviors against fixed logical expectations:

- Native relative input resolves from the supplied child `cwd`.
- Native absolute input under that root returns the same workspace-relative path.
- `pathToFileURL` output from a native path round-trips spaces, literal percent signs, hash characters, and Unicode through `fileURLToPath`.
- A literal `%20` in a native filename remains `%20`; it does not become a space.
- Another file and a file under another root remain distinguishable.
- A malformed `file:` URL throws.

The config-project proof must keep the real installed Oxlint process and its clean fixture. It must fail before the fix on the captured file URL and pass after the fix without weakening any rule-code or filename assertion.

The failed registered probe produced no receipt. The design fragment therefore remains unproved until the native direct proof runs. The Windows observation establishes the producer’s file-URL shape, not the conversion result. Linux remains unmeasured until its CI gate runs.

## Tensions and risks

`fileURLToPath` decodes encoded dot segments. This helper must remain comparison-only; it must not become a containment or filesystem-access guard. An outside-root file must remain visible as an outside path after `relative`, not be accepted as inside.

The `tests/setupPolicy.ts` file has broad logical-path consumers, including scratch containment, glob results, mirror paths, and policy populations. Widening `normalizePolicyPath` would decode or resolve values those callers intend as logical text.

The `ROADMAP.md` file records separate cleanup for policy-sweep names and an undocumented export in `tests/setupPolicy.ts`. The fixed brief excludes that broader cleanup. Record those rows against their existing capability rather than expanding this unit.

## Over-correction to refuse

Over-correction would break logical policy paths by decoding literal percent text, resolving globs against a process directory, or changing scratch-target validation. Basename reduction would merge distinct directories. Case folding would conceal a real filename disagreement. Catching malformed URL conversion would turn an invalid diagnostic into accepted comparison data. Using `URL.pathname` or manual string rewrites would corrupt Windows drives and escaped filenames. Resolving against the parent process directory instead of `scratch.path` would compare in the wrong coordinate system.

## Routing

- Implementation: Codex `implementer`, Sol, in the isolated worktree.
- Cross-engine review: Codex `reviewer`, Opus, against the actual diff and status evidence.
- Required objective audit lane: Codex `analyst`, Sol, in a fresh context; it cannot serve as the sole independent auditor of Sol-authored work.
- Gate evidence after root regeneration: Codex `verifier`, Terra.
