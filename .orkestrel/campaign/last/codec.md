# Last changes: codec

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `8adc908`, merge base with `origin/main` `d4a5d1f`, layer L0, declared version 0.0.1, registry version 0.0.1.

## Commits since origin/main

```text
2250a43 2026-08-28 Update every dependency to the published latest
0881015 2026-08-28 Adopt the catalog and guide mirrors for the wave
dcbeb4c 2026-09-01 Adopt the renamed guide helpers in the parity test
8adc908 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md |  2 +-
 src/core/constants.ts       | 19 ++++++++++++-------
 tests/guides.test.ts        | 24 ++++++++++++------------
 3 files changed, 25 insertions(+), 20 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 0ed8fa5..ca10f24 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -5,11 +5,13 @@
 // policy sweep rejects. Entry `c` of the table is the index of `c` in BASE64_ALPHABET, and the
 // alphabet sweep in tests/src/core/helpers.test.ts fails on any single-entry disagreement.
 
-/** The RFC 4648 §4 alphabet, index-ordered; {@link BASE64_LOOKUP} is transcribed against it. */
+/**
+ * Holds the RFC 4648 §4 alphabet, index-ordered; {@link BASE64_LOOKUP} is transcribed against it.
+ */
 export const BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
 
 /**
- * Base64 character to 6-bit value lookup, transcribed against {@link BASE64_ALPHABET}; the
+ * Maps each Base64 character to its 6-bit value, transcribed against {@link BASE64_ALPHABET}; the
  * alphabet sweep in tests/src/core/helpers.test.ts fails on any single-entry disagreement.
  */
 export const BASE64_LOOKUP: Readonly<Record<string, number>> = Object.freeze({
@@ -88,12 +90,15 @@ export const BASE64_LOOKUP: Readonly<Record<string, number>> = Object.freeze({
 // single-entry disagreement. The table holds no uppercase entry, which is what makes `decodeHex`
 // refuse `'AB'`.
 
-/** The RFC 4648 §8 alphabet, lowercase and index-ordered; {@link HEX_LOOKUP} is transcribed against it. */
+/**
+ * Holds the RFC 4648 §8 alphabet, lowercase and index-ordered; {@link HEX_LOOKUP} is transcribed
+ * against it.
+ */
 export const HEX_ALPHABET = '0123456789abcdef'
 
 /**
- * Hex character to 4-bit value lookup, transcribed against {@link HEX_ALPHABET}; the oracle sweep
- * in tests/src/core/helpers.test.ts fails on any single-entry disagreement.
+ * Maps each hex character to its 4-bit value, transcribed against {@link HEX_ALPHABET}; the oracle
+ * sweep in tests/src/core/helpers.test.ts fails on any single-entry disagreement.
  */
 export const HEX_LOOKUP: Readonly<Record<string, number>> = Object.freeze({
 	'0': 0,
@@ -123,8 +128,8 @@ export const HEX_LOOKUP: Readonly<Record<string, number>> = Object.freeze({
 // sweep in tests/src/core/helpers.test.ts fails on any single-entry disagreement.
 
 /**
- * Windows-1252 high-band byte to code point lookup, keyed by the byte and transcribed from the
- * WHATWG Encoding index for the code page.
+ * Maps a Windows-1252 high-band byte to its code point, transcribed from the WHATWG Encoding
+ * index for the code page.
  *
  * @remarks
  * The table covers 0x80-0x9F alone, because every other byte in the code page is the identity.
```
