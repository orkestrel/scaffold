# Guide native-entry policy controls

Root exercised the actual canonical entry. No package copy, worktree, installed
substitute, or altered reader port was used. The authored test-file candidate
remained unchanged during these controls.

The baseline native green at 13e585 ran from canonical Guide:

```text
node --experimental-strip-types tests/guides.test.ts
exit 0
Test Files  1 passed (1)
Tests  37 passed (37)
```

Root changed only the README pitch to the literal control text and ran the same
native command. Run 43fffd exited 1. The actual failure was:

```text
FAIL |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected [ { spec: 'guides/guide.md', ... } ] to deeply equal []
guides/guide.md pitch: README "A mismatched pitch for the native-entry control." guide "A guides-parity toolkit: pure inventory readers and comparisons in core, plus a reusable server command that checks or explicitly rewrites a package's guides.".
```

With that mismatched pitch retained, root changed package.json name from
@orkestrel/guide to @orkestrel/renamed-guide. The same native command at b5c312
exited 1 before test registration:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@orkestrel/guide' imported from C:/Users/mikes/WebstormProjects/guide/tests/guides.test.ts
```

The path spelling in this excerpt is normalized for the retained Windows record.
The control cannot produce false success through an optional pitch report in
the actual self-referencing native entry. It does not establish a general
requirement that the reusable command must select a pitch for arbitrary packages.

Root restored the package name and removed the README pitch. The same native
command at 482293 exited 1 at the required pitch assertion:

```text
FAIL |guides| tests/guides.test.ts > opens the README with the guide tagline
guides/guide.md pitch: README absent guide "A guides-parity toolkit: pure inventory readers and comparisons in core, plus a reusable server command that checks or explicitly rewrites a package's guides.".
```

Root restored the README pitch through apply_patch. The package.json and README
diff was empty at af5c09. Byte checks at 5a69a1 returned the original manifest
SHA256 fe6a798349a39f35a8d5b003cc5972d1727702e6d90798ffefaf7402c3903098.
The README and accepted archive README each returned
afb69c0f616d169794176e54a7546cd9ab4464d399c6e7585a9574ec115184cc.

Root then exercised the actual explicit directions with aligned source:

```text
node --experimental-strip-types tests/guides.test.ts --to guide
run 131777
exit 0
Test Files  1 passed (1)
Tests  37 passed (37)

node --experimental-strip-types tests/guides.test.ts --to source
run fb7db0
exit 0
Test Files  1 passed (1)
Tests  37 passed (37)
```

These direction runs execute the substantive assertion population after no-op
authority requests. They do not claim nonempty rewrite freshness. The accepted
shared command's earlier nonempty controls remain separate evidence.

The probe/prove call for a public context type control returned the legacy
stream-result protocol error during this scope. It produced no receipt. Root
native observations are not described as a substitute prove receipt.
