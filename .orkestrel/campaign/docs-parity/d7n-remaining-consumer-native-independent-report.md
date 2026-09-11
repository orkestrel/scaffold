Relation, SEA, Server, and Workspace pass the bounded native-source review. The objective lane remained blind.

| Package | ENTRY | PRESERVATION | SCOPE | PROOF | Source verdict |
| --- | --- | --- | --- | --- | --- |
| Relation | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED | PASS |
| SEA | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED | PASS |
| Server | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED | PASS |
| Workspace | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED | PASS |

### ENTRY — attacked and held

I looked for an unresolved static runtime import, indirect launcher, new parser, and package identity that could leave pitch selection unchecked.

Each entry directly supplies `readInventory` and `createVitest` to `GuideCommand`. Package/source/Vitest runtime imports occur inside its anonymous callback. Workspace’s remaining static source import is type-only. `PACKAGE_NAME` supplies the unchanged self-module key, and the parsed manifest name must equal it.

Evidence:

- [Relation entry](/C:/Users/mikes/WebstormProjects/relation/tests/guides.test.ts:29), manifest assertion at line 92.
- [SEA entry](/C:/Users/mikes/WebstormProjects/sea/tests/guides.test.ts:29), manifest assertion at line 96.
- [Server entry](/C:/Users/mikes/WebstormProjects/server/tests/guides.test.ts:29), manifest assertion at line 91.
- [Workspace entry](/C:/Users/mikes/WebstormProjects/workspace/tests/guides.test.ts:30), manifest assertion at line 98.

The installed Guide declarations and command implementation support this composition. No local helper, parser, launcher, or public API was added.

### PRESERVATION — attacked and held

I compared each actual diff with its named predecessor, looking for dropped assertions, changed example tokens, expanded module mappings, and aggregate checks that would reject previously permitted empty encounter populations.

The manifest, title, pitch, fence, drift, and function-example replacements use equivalent report channels. Surface, barrel, internal, hidden, method-group membership, method examples, encountered imports, and relative/test links retain their predecessor traversals and public leaves. `MODULES`, language policy, and `INTERNAL` retain their populations. No prohibited aggregate assertion or finding-text filter appears.

Package-specific checks also hold:

- Relation preserves descriptor resolution, the `INVALID` error assertion, and the real database-backed registry case.
- SEA preserves compression arithmetic, alignment, binary-format checks, signing argv and redaction, asset construction, and platform assertions.
- Server preserves negotiation, token decoding, capped gzip decompression, live listener lifecycle, `finally` destruction, and transcription-presence assertions. The negotiation array’s layout and trailing comma change no input value.
- Workspace preserves immutable content, editing, search/replacement, moves, snapshots, event recording, post-destroy behavior, registry selection, store operations, error narrowing, and README transcription.

These are source-equivalence findings, not newly executed negative controls or compiler Probe receipts.

### SCOPE — attacked and held

I checked whether unrelated live edits had been folded into the author’s scope.

For each package, `tmp/pass/d7n-<package>-upper-native-green/status-before.txt` and `status-after.txt` contain only `tests/guides.test.ts`. The frozen diff agrees. Author edits leave source, public types, guides, manifests, locks, and unrelated tests unchanged.

The later `d7n-<package>-native-policy-repair` receipts separately attribute changes to `package.json`, `tests/config.test.ts`, and `tests/setupPolicy.ts` to root’s supported repair. No dependency addition belongs to this migration.

### PROOF — attacked and held

I checked for baseline movement, stale successful execution evidence, and a current test differing from the frozen successful input.

Each root red receipt records exit `1` before collection from the unresolved `@src/core` or `@src/server` import. Each root green receipt records the same direct native command completing with exit `0`:

```text
node --experimental-strip-types tests/guides.test.ts
```

HEAD, branch, index, manifest hashes, and diff snapshots match before and after each successful run. Current guide-test diffs exactly match those frozen diffs.

| Package | Preserved HEAD | Current guide-test Git blob |
| --- | --- | --- |
| Relation | `d6945c924b7f56df5c8e44e0937ca03fe736d272` | `1413120952ab8501d1881ef222c006f0d5abb0da` |
| SEA | `76cfbe2ce6a212cd5c5afc1831c196a75576c3eb` | `cdfa5f9b1f156e4dad283e1a9e9c476c3cdd4338` |
| Server | `9d35664f09521a754bfa39094fee017aa5125070` | `3a491d3dd13bd48a2c975d6fd5cc0f452c370b70` |
| Workspace | `eb02ec035b7989d7b0b0ec9f38549561bd6edf70` | `5da9ffbf6fd0145f1b3b5fd904bd6a43453c0513` |

No substantiated finding falls outside these claims. The policy-repair exit `1`, including the retained foreign `scripts/docs.ts` finding, remains a final-overwrite concern—not a source-review failure. This verdict makes no final prepublish, registry, or main-closure claim.

VERDICT: PASS
