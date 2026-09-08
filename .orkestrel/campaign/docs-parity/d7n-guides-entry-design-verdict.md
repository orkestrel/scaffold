# Guides entry design ruling

Use Guide's existing public pure functions. Add no Guide runtime API or environment
for this change. The native objective lane and the journaled Opus subjective lane
agree that the consumer can compose the existing comparison and replacement contract.
Guide still receives the accepted runtime tarballs and artifact revalidation.

Make test:guides the report, explicit rewrite and test entry. Use a self-contained
Node launcher at scripts/guides.ts, invoked with --experimental-strip-types. Remove
docs and scripts/docs.ts. The launcher validates --to before Vitest starts, reports
or rewrites through the existing Guide leaves, flushes the selected changes, reads
fresh inventory, reports unresolved drift, then runs tests/guides.test.ts through
public createVitest/start/close. Ordinary npm test supplies no direction and writes
nothing. This absorbs the operation into the test command; it does not preserve a
separate writer command under another name.

Select the subjective lane's pre-run composition. Do not add the objective lane's
worker setup module, provided-context declaration or generated setup hook. Root's
public runner probe already proves the launch mechanism. Starting Vitest after the
flush makes the package's existing module-scope inventory fresh without changing
package-authored assertions. Guide's self-dogfooding entry uses its built public
readers; build Guide before its own rewrite command, as the existing seed requires.
This change adds no Guide reader behavior, so it does not authorize stale-reader use
or claim an unbuilt reader edit is tested by the built entry.

Preserve the old writing boundary: guide summaries may be replaced; guide-owned
example fences are reported, not overwritten. Source summaries and titled examples
use the existing locating/replacing helpers. README pitch stays authored by hand.
Shared-file updates use the same mutable text map, with each edit based on its updated
bytes. Recompute reporting after flushing. Do not add the objective lane's ambiguous-
location or concurrent-destination guard work here: the owner retains that seed-guard
decision separately, and this command migration must not silently reopen it.

Reject the subjective lane's test-result-only exit rule. The final status is nonzero
when unresolved reported drift remains or the guides run fails. Reject an empty
module result, unhandled errors and non-passing module states. Preserve a stronger
nonzero process status and close the runner in finally. Usage or missing input exits
2 before a rewrite. Keep config vite.config.ts, guides selection, cache disabled,
watch disabled and the existing dot reporter explicit. The real fixture must prove
that passing assertions cannot conceal reported unresolved drift.

Use GUIDES_ENTRY_PATH for the canonical entry. Preserve the existing host candidate
behavior for workspaces without guides; they gain no test:guides script or guides
project. Do not add the objective lane's unrelated removal of all dormant entry
candidates. Keep package-owned tests/guides.test.ts outside the vendored inventory.

Retire the exact old host path through the supported audit/overwrite mechanism.
Root read Materializer.#derive: its snapshot contains planned paths, files under
selected host directory roots, and instruction canon. An unplanned old file outside
those populations is not discovered merely because its former constant was renamed.
The subjective lane's automatic-foreign claim therefore lacks the necessary path
population. Add exact retired-host metadata for scripts/docs.ts and admit it into
the selected-group snapshot. Keep overwrite's derived-membership, observed-byte,
tracked-file and clean-tree refusals unchanged. Never claim ownership of scripts/ or
delete an unrelated script. A real tracked temporary workspace must prove the old
path is found and safely removed, and untracked or changed destinations are refused.
This is retirement metadata, not an executable compatibility alias.

Root's installed public Materializer probe confirms the omitted population: removing
the old entry from the desired plan leaves an existing scripts/docs.ts absent from
the audit. The retained retirement-probe log exits 0 for that observation. Insert a
permanent regression that expects the retired path before fixing its admission.

The docs manifest key is package-owned. Remove that exact key during the authorized
serial manifest integration; do not broaden replaceManifestScripts into a general
deletion engine. Give test:guides its exact generated predecessor through the existing
accepted-command mechanism. Preserve author-customized commands and unrelated pins.

Keep reason and path reporting and the formatter notice. Retire the old authored
count-summary output and its count-only state. This changes reporting deliberately;
it does not authorize removing contract symbols to silence lint.

Do not accept either lane's unmeasured distributable claims. Renaming a public path
constant moves scaffold's source API as well as its host inventory. The prepared
scaffold bump covers that movement. A target's own runtime and declarations require
comparison before deciding whether its unpublished candidate moves. Ruling 30 still
governs later development-only pins.

## Implementation and acceptance

Run the canonical scaffold change as a bounded native implementer on Sol, in a clean
isolated checkout. Own entry, retired-path metadata/admission, manifest generation,
focused consumer and retirement tests, matching guide/rule text and host inventory.
Primary scaffold's owner dependency edits and staged lock stay outside that writer.
Root owns installs, tree-wide gates, packing and exact serial integration.

Run the actual npm commands in real temporary workspaces, including a path with
spaces. Prove report-only bytes, selected-side writes, preserved shared-file edits,
fresh post-write assertions, unsupported-drift status, invalid/missing-input status,
repeat stability, failure propagation and cleanup. Existing substantive parity cases
remain in scope. Do not replace the end-to-end command proof with a direct helper
call. The existing child-process fixture may wire installed packages locally for
development; final distribution proof installs the real tarball into an empty consumer.

The design ruling fixes the scope; its behavior claims still need implementation
evidence. Independent design-fit review on Opus and mechanical/gate verification
follow the actual diff. Do not rerun historical fleet prose audits absent changed
audited content. Apply the accepted scaffold artifact and Guide adoption through the
layer tarballs, then compare lower-layer material output with preserved artifacts.
