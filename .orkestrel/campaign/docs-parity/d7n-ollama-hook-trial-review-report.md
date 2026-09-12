The verdicts concern carrier source. The trial has not executed.

1. **CONFIRMED — preflight and local preparation.** Source inspection traced wrong branch/HEAD, unexpected dirty paths, staged or untracked input, archive mismatch, and registry-version mismatch to refusal before target edits. Dependency queries precede pin writes. The preparation commit stages only the named caller, guide, manifest, and lockfile paths. No push follows it. The inspected archive’s SHA-256 matches the accepted digest, and the supplied Scaffold prepublish receipt records exit `0`.

2. **CONFIRMED — archive installation and supported overwrite.** The carrier compares manifest/lock hashes across the no-save install and compares installed `dist` bytes with the extracted archive. Script retirement occurs through supported overwrite. The expected offline refusal is captured without an early errexit, requires the precise skipped-catalog diagnostic, and is followed by an audit that must exit `0`. Source inspection of the CLI confirms that the diagnostic follows local repair, removal, and declaration work. Packed script/settings comparisons resolve storage paths from the host manifest. These checks establish the intended acceptance conditions; they do not establish an executed trial.

3. **BROKEN — failure propagation and final evidence capture.** Source inspection found these counterexamples:

   - At [trial-ollama-hook-final.sh:163](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/trial-ollama-hook-final.sh:163), a failed or timed-out `npm pkg get scripts.docs` skips the conditional body. If subsequent metadata reads succeed, the carrier prints `TRIAL` while the old `docs` command remains. Run the query as a required command, then conditionally delete the key based on its successful output.
   - At line `172`, the carrier captures lockfile hashes, not the required post-overwrite Scaffold lock entry. When overwrite leaves the lockfile unchanged, the captured diff also supplies no entry. Add a bounded read of `packages["node_modules/@orkestrel/scaffold"]` before the terminal status.

   The remaining successor corrections hold by source inspection: the restricted package-field helper receives only supported fields, overwrite exit handling reaches its explicit check, untracked input is refused, and SDK/peer metadata are compared after overwrite. The carrier contains no further install, generated-candidate commit, release acceptance, push, or upload. The recorded npm SDK output’s exact formatting was not located in the supplied evidence; retain that reading beside the plain `0.6.3` comparison.

Linux execution remains a separate prerequisite, not a carrier defect.
