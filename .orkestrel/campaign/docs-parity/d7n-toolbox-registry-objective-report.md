# Toolbox registry readiness — objective falsification

Objective lane held. Accepted Toolbox source behavior remained closed. This review used the frozen
visit, prepublish, pack, canonical-state, and carrier evidence. It ran no package command.

## REGISTRY — CONFIRMED

Attack: I looked for a stale fleet range, a local manifest or lockfile resolution, an unsupported
external-major move, changed peer metadata, and an accidental version move past the pending release.

Evidence: The fresh registry receipts name Agent `0.0.21`, Contract `0.0.17`, Database `0.0.14`,
Form `0.0.6`, Relation `0.0.12`, Server `0.0.19`, Terminal `0.0.15`, Tool `0.0.14`, Workflow
`0.0.18`, Workspace `0.0.8`, Guide `0.0.18`, Scaffold `0.0.64`, Test `0.0.14`, and Probe
`0.0.13`. The manifest carries their caret ranges at
`C:/Users/mikes/WebstormProjects/toolbox/package.json:85`. The lock root repeats the same ranges.
`roots.stdout.txt` resolves that graph without an invalid or extraneous root.

The external registry readings retain API Extractor `7.59.1`, Node types `26.5.1`, oxfmt `0.67.0`,
oxlint `1.82.0`, TypeScript `6.0.3`, Vite `8.3.0`, and Vitest `4.1.11` within the supported major
selected for each package. The corresponding final manifest ranges use those registry readings.
The local-resolution search exits `1` with empty output, and direct inspection finds no `file:`,
`link:`, `workspace:`, or lockfile link marker. The peer metadata readings are empty and equal.
The manifest and packed manifest remain `0.0.13` (`package.json:3`), while the fresh package registry
reading is `0.0.12`.

## OVERWRITE — CONFIRMED

Attack: I looked for a surviving retired command or script, a generated rewrite of accepted authored
bytes, an unplanned source change hidden among mirrors, and an Ollama-specific ownership assertion
smuggled into Toolbox acceptance.

Evidence: The supported overwrite and terminal audit receipts exit `0`; audit reports no drift.
`scripts/docs.ts` and `scripts/guides.ts` are absent. The manifest has no `docs` command and routes
`test:guides` directly to `tests/guides.test.ts` at `package.json:73`. The before, after-overwrite,
after-visit, and current SHA-256 values for `guides/toolbox.md` and `tests/guides.test.ts` agree.

The frozen and current diff paths are limited to `package.json`, `package-lock.json`, the declared
dependency guide mirrors, the marker-owned catalog, and deletion of `scripts/docs.ts`. The index is
unstaged and there is no untracked input. No Toolbox path or claim depends on Ollama's held
`scripts/service.sh`; this verdict grants no authority over that target.

## ARTIFACT — CONFIRMED

Attack: I looked for a passing receipt from a different candidate, a pack carrying stale dist,
archive metadata differing from the canonical manifest, missing published entries, unchanged output
that would not justify the pending bump, and an installed Guide or Scaffold build differing from its
accepted release archive.

Evidence: `d7n-toolbox-final-registry-visit-prepublish/action.exit.txt` contains `0`. Its before and
after HEAD, branch, status, diff, index, and manifest readings agree. The packed-state script first
compares the prepublish manifest, full binary diff, and complete index with the state it packs
(`pack-ollama-toolbox-final-verified.sh:56-64`). It then runs `npm pack --ignore-scripts`, compares the
extracted manifest byte-for-byte with canonical `package.json`, and compares the complete extracted
`dist` tree with canonical `dist` (`pack-ollama-toolbox-final-verified.sh:68-87`). Those receipts exit
`0`; `final-dist.diff.txt` is empty. The archive is
`cf60177fb42d036c9747e3e192b0e7429d5105984c0e554cd8d176c207032e78`, and its member record contains
the declared core/server ESM, CommonJS, declarations, source maps, README, license, and manifest.

The post-pack HEAD, branch, status, index, binary diff, and manifest readings equal their pre-pack
values (`pack-ollama-toolbox-final-verified.sh:107-113`). Installed Guide and Scaffold version checks
and full dist comparisons exit `0` against the accepted `0.0.18` and `0.0.64` archives. The fetched
registry baseline is Toolbox `0.0.12`; the non-map comparison exits `1` with material runtime and
declaration differences. Its runtime ranges also precede every current runtime range. These are valid
bump triggers for pending `0.0.13`.

Limit: The receipts and live read agree under root custody. The prose verdict does not
cryptographically bind itself to the candidate, and the gate receipt does not independently hash its
dist. The pack carrier closes that operational gap by binding the complete index, diff, and manifests
to the prepublish state before packing and comparing the extracted dist to the canonical dist. Root's
intervening-writer control remains required until closure starts.

## CLOSE — CONFIRMED

Attack: I traced paths for a wrong package or version, stale source HEAD, substituted archive,
staged or untracked input, an undeclared changed path, lost commit attribution, non-ancestor main,
partial push, dirty terminal checkout, and refs that do not identify the release commit.

Evidence: The closure carrier fixes Toolbox's pending version and declared fleet graph
(`close-ollama-toolbox-registry-supported-release.sh:51-56`). It requires the reconciled passing
verdict, canonical name/version, campaign branch, expected prepared HEAD, packed HEAD, empty staged
state, empty untracked state, successful pack and prepublish receipts, and current manifest/diff/index
equality with the pack (`:63-80`). It rechecks the packed manifest, complete dist, archive digest,
native manifest policy, every fleet range, retired paths, installed Guide/Scaffold versions and dist,
peer metadata, and supported external tool ranges before mutation (`:83-134`).

The carrier fetches origin and requires `origin/main` to be an ancestor (`:137-138`). Its allowlist
admits only release manifests, the catalog, the retired docs path, and mirrors for declared runtime or
development roots; any other changed path refuses (`:139-155`). The commit includes the required
co-author and session trailers (`:159`). It pushes the campaign branch and `HEAD:main`, requires a
clean worktree, fast-forwards or creates local main from `origin/main`, and requires local main,
origin main, local campaign, and origin campaign to equal the release commit (`:162-179`). It then
rechecks installed Guide/Scaffold identity, packed manifest, and packed dist on the terminal checkout
(`:183-190`).

The current canonical target is still on prepared HEAD
`940ca311b458c935880265cefc63f23b7e2f05df`, with exactly the frozen unstaged preparation paths and no
untracked or staged input. The carrier is ready to run. This confirms readiness for clean-main
closure; it does not claim the closure, upload, or registry publication has happened.

No blocker or advisory falls within the stated claims.

VERDICT: PASS
