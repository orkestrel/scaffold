# Dependent supported-major correction report

## Status

The supported-major helper and carrier successors are ready for independent review.
No network lookup, target action, installation, gate, Git mutation, authentication
flow, or upload ran. Brief remains at its stopped completed-install state.

## Changed files

The correction owns these scratch files:

- `tmp/pass/read-supported-toolchain.mjs`
- `tmp/pass/prepare-dependent-registry-supported.sh`
- `tmp/pass/resume-dependent-registry-supported.sh`
- `tmp/pass/close-dependent-registry-supported-release.sh`
- `tmp/units/d7n-dependent-supported-major-report.md`

The returned toolchain carriers, stopped receipts, package checkouts, and earlier
reports remain unchanged.

## Supported-major helper

Invoke the helper with this signature:

```text
node tmp/pass/read-supported-toolchain.mjs <dependency> <range>
```

The helper imports `extractRangeMajor` from `../../dist/src/core/index.js` and
`Upstream` from `../../dist/src/server/index.js`, so its module resolution is relative
to the helper rather than the invoking working directory. It rejects an invalid
argument population, an invalid dependency name, and a range with no extractable
major. It passes `^MAJOR` to `Upstream.lookup`, requires a `found` release, checks the
selected exact version against the extracted major, and prints that version alone to
stdout. Stderr receives the complete JSON release observation, including the
registry-tag major when the registry supplies one. The `finally` block destroys the
reader.

## Carrier signatures

Run a fresh preparation with this signature:

```text
bash tmp/pass/prepare-dependent-registry-supported.sh <package> <label>
```

Resume the stopped Brief visit with this exact signature:

```text
bash tmp/pass/resume-dependent-registry-supported.sh d7n-brief-final-registry-visit
```

Run release closure with this signature:

```text
bash tmp/pass/close-dependent-registry-supported-release.sh <package> <expected> <version> <visit> <label>
```

## Delta

The preparation and resume successors retain every guard and stage from their
toolchain predecessors. Their `external-registry-*` step invokes
`read-supported-toolchain.mjs` with the dependency name and the captured
`external-before-*` range. The selected version remains in the existing stdout
receipt, while the structured observation occupies the matching stderr receipt. The
final declaration must still equal the caret of the selected exact version.

The closure successor retains its peer, development, optional metadata, packed
artifact, changed-path, commit, push, local-main, and final-ref checks. It also
requires each supported lookup's structured stderr observation before accepting the
existing registry and final value receipts. No release contract or receipt label
changed.

## Parser checks

These parser commands ran with exit `0`:

```text
node --check tmp/pass/read-supported-toolchain.mjs
C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/prepare-dependent-registry-supported.sh
C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/resume-dependent-registry-supported.sh
C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/close-dependent-registry-supported-release.sh
```

## Limits

Parser checks establish JavaScript and shell syntax only. Root retains ownership of
the network lookup, the stopped Brief recovery, target gates, closure, and receipt
acceptance.
