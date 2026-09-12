# Toolbox registry preparation acceptance

Accept Toolbox `0.0.13` for clean-main release closure from prepared HEAD `940ca311b458c935880265cefc63f23b7e2f05df` on `claude/orkestrel-npm-audit-deps-14ibta`. This verdict permits the reviewed closure carrier to run after root records its prepared verdict. It does not claim closure has run or authorize an upload.

Source acceptance remains closed under `d7n-toolbox-ollama-toolbox-source-verdict.md`. This review covers the registry visit, actual archive, and closure readiness.

## REGISTRY — CONFIRMED

Attack: preparation could retain staged local resolutions, move dependency sections, select unsupported external majors, or bump an already pending version.

The canonical runtime manifest matches the visit's successful registry observations: Agent `0.0.21`, Contract `0.0.17`, Database `0.0.14`, Form `0.0.6`, Relation `0.0.12`, Server `0.0.19`, Terminal `0.0.15`, Tool `0.0.14`, Workflow `0.0.18`, and Workspace `0.0.8`. Development ranges remain in their own section and name Guide `0.0.18`, Scaffold `0.0.64`, Test `0.0.14`, and Probe `0.0.13`. Each range is the caret of its recorded registry version. The successful root `npm ls --depth=0` receipt shows those installed roots.

The external before/registry/final receipts retain supported majors: API Extractor `7`, Node declarations `26`, oxfmt `0`, oxlint `1`, TypeScript `6`, Vite `8`, and Vitest `4`. The final ranges match the selected release observations. Toolbox declares no peers or peer metadata; the before/final metadata receipts agree. The retained local-resolution scan exits `1` with no matches, and read-only inspection of the live manifest and lockfile likewise finds no `file:`, `link:`, `workspace:`, or linked-package resolution.

The live and packed manifests remain `0.0.13`. The registry baseline receipt names `0.0.12`; preparation did not bump the pending version again.

Evidence: `tmp/pass/d7n-toolbox-final-registry-visit`, canonical `toolbox/package.json` and `package-lock.json`, and the packed baseline manifest.

## OVERWRITE — CONFIRMED

Attack: a successful dependency install could conceal an incomplete overwrite, retained retired hosts, or edits to the accepted package guide and native entry.

The actual supported overwrite and subsequent audit receipts each exit `0`. Their reports show no planned drift. The canonical checkout has neither `scripts/docs.ts` nor `scripts/guides.ts`; the `docs` command is absent. `test:guides` directly invokes `node --experimental-strip-types tests/guides.test.ts`.

The authored before/after hashes agree with the live files. The Toolbox guide remains `a5a5c4679075ae6ca937d15af49189fc9e0e9e79a5fe7f4227a56be25bdf3910`; the native test remains `15194c8df30dc9a660215048eb850e1cc18a4f5dd15498be5b51a9549766e6a6`.

The remaining diff contains the manifest, lockfile, declared dependency guide mirrors, the catalog agent, and deletion of `scripts/docs.ts`. It contains no production source, package-owned guide, or native-test edit. The live diff agrees with the retained visit diff when read as UTF-8, and the live index agrees with its captured index. The prepared HEAD and branch also agree.

This Toolbox finding makes no preservation claim about Ollama's service script.

## ARTIFACT — CONFIRMED

Attack: a stale source gate or a dry-run pack could be mistaken for proof of the final registry artifact, or installed tooling could still differ from the accepted published output.

`d7n-toolbox-final-registry-visit-prepublish/action.exit.txt` is `0`. The actual command output covers formatting, lint, scoped TypeScript checks, build, source/policy/config/setup tests, native guide parity, and release-mode distribution tests. The output retains toolchain warnings; it does not convert them into failures or claim the suite contains no existing skips.

The visit, prepublish, and pack before/after diff, index, and manifest captures agree by hash. Live manifest hashes agree with those records. The actual pack command is `npm pack --ignore-scripts`, not a dry run, and it exits `0`.

The retained archive is `tmp/pass/packed/d7n-toolbox-final-registry-visit-pack/orkestrel-toolbox-0.0.13.tgz`. Its independently read SHA256 is `cf60177fb42d036c9747e3e192b0e7429d5105984c0e554cd8d176c207032e78`, matching the pack receipt. The extracted manifest equals the live manifest. A read-only recursive path/hash comparison confirms that the complete extracted `dist` equals canonical Toolbox `dist`, including declarations and maps. The archive member inventory contains the package manifest, license, README, and published core/server distribution, not tests or retired scripts.

Recursive path/hash comparisons also confirm that installed Guide and Scaffold `dist` equal the accepted extracted archives in `d7n-guide-registry-native-pack` and `d7n-scaffold-upper-git-final-pack`.

The baseline archive was actually fetched. The recorded comparisons differ after excluding maps and after ignoring whitespace; the inspected differences include published documentation and declaration text. Independently, the final runtime dependency ranges differ from the baseline archive's manifest, which is a release trigger without needing to claim a new runtime algorithm. The pending bump is supported.

Root controls intervening writers. These receipts and archive comparisons bind the observed candidate state; they do not cryptographically bind a prose verdict to a diff or fingerprint the exact distribution produced at gate time. Acceptance relies on root's stated no-intervening-write control between the final gate and packing.

## CLOSE — CONFIRMED

Attack: closure could accept unrelated paths, commit a candidate different from the pack, or leave only the campaign branch updated.

The current `close-ollama-toolbox-registry-supported-release.sh` hash matches the previously reviewed carrier hash: `8e24c60ffe63ac3c805d1af9b9bd796bc4b3ec58060a2f8a61f16d973f547fdc`.

The carrier requires the package identity, pending version, safe labels, prepared verdict, campaign branch, expected/prepared/packed HEAD agreement, successful prepublish and pack receipts, and matching current manifest/diff/index state. It refuses staged or untracked input. Before committing, it compares packed manifest and complete distribution, verifies the archive digest, checks native-host retirement, and repeats installed-tooling, dependency, peer-metadata, and external-range checks.

Its allowlist admits only release preparation paths and declared dependency mirrors. The accepted own Toolbox guide is not a release mirror exception. A fresh fetch precedes the main-ancestry check. The commit retains required identity and session trailers. Non-forced campaign/main pushes, canonical main switching, fast-forward closure, clean-tree checks, ref equality, and final manifest/distribution comparisons remain present. No authentication or publication command appears in the carrier.

These guards support readiness to run closure from the observed state. Their future successful execution is not asserted here.

## Outside findings and bounds

No substantiated outside finding arose. No target mutation, gate, install, build, ref change, authentication, or upload was performed by this review. Runtime gate conclusions come from the inspected root receipts; file and artifact identity conclusions additionally use read-only comparisons against the canonical checkout.

PASS
