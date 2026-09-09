Objective lane held. I reused the accepted `GuideCommand` contract context and did not reopen its design.

### Native ports

- **Codec — survives.** Only native-safe ports load statically; package source and Vitest registration load inside the direct `execute` callback at [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/codec/tests/guides.test.ts:38). Root’s native receipt exited `0`.
- **SSE — not measured.** The source boundary is correct at [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/sse/tests/guides.test.ts:35), but root’s prepublish receipt invoked the existing Vitest `test:guides` script, not the native Node command. The writer-reported native result is not independent evidence. Settle with `node --experimental-strip-types tests/guides.test.ts`.

### Generic parity

- **Codec — falsified.** The adoption retains pitch, titles, fences, drift, function examples, imports, and links at [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/codec/tests/guides.test.ts:78), but it drops the baseline method-parity and method-example mechanisms shown as removals in [diff-before.txt](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-codec-native-root/diff-before.txt:234). A later valid Methods population could keep summaries aligned while an implementing class or method example diverges; the current consumer never asserts `report.methods` or `report.examples.methods`. This is not speculative coverage invented by review: the baseline owned those checks.
- **SSE — survives.** Its consumer asserts the populated method group, `report.methods`, and `report.examples.methods`, with the remaining generic findings at [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/sse/tests/guides.test.ts:84).

### Codec policy — survives

The internal alphabet and lookup exceptions retain their reverse anti-staleness check, while direct, barrel, guide, and hidden surfaces remain constrained at [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/codec/tests/guides.test.ts:108). Exact manifest export keys and the charset, canonical-form, and transcription guards remain active through [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/codec/tests/guides.test.ts:193).

### SSE policy — survives

Surface exceptions and anti-staleness, method populations, real parser/error controls, flagship behavior, presence guards, and exact transcriptions remain at [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/sse/tests/guides.test.ts:84) and [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/sse/tests/guides.test.ts:159). Root’s prepublish receipt exited `0`.

### Generated preparation — survives

Contract’s frozen preparation changes only the catalog agent, dependency-guide mirrors, manifest command surface, and retired docs script, as recorded in [diff-before.txt](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-contract-final-prepublish/diff-before.txt:1). The manifest uses the native command and omits the retired docs key at [package.json](C:/Users/mikes/WebstormProjects/contract/package.json:62). No source or accepted package-specific assertion file changed. The offline overwrite’s catalog refusal remained explicit; its audit and final prepublish receipts exited `0`.

### Release identity — survives

Canonical manifest and lock declare `0.0.17` at [package.json](C:/Users/mikes/WebstormProjects/contract/package.json:3) and [package-lock.json](C:/Users/mikes/WebstormProjects/contract/package-lock.json:3). Their hashes remained stable through prepublish and packing. Packing exited `0`; packed metadata and canonical distribution matched, while retained-baseline distribution comparisons also exited `0`. No authentication or upload evidence appears.

### Receipt status — survives

The carrier captures comparison failure status inside the `else` branch, preserves ordinary differences, and propagates command errors at [pack-foundation-final.sh](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/pack-foundation-final.sh:24). It binds packing to recorded prepublish state at [pack-foundation-final.sh](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/pack-foundation-final.sh:57) and proves source-state preservation after packing at [pack-foundation-final.sh](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/pack-foundation-final.sh:99). Contract’s matched output is corroborated by the retained comparison receipts.

Measurement limit: I ran no fresh verifier or mutation control. SSE native execution remains unmeasured by root evidence; the other runtime conclusions rely on the supplied root receipts.

VERDICT: FAIL Native ports, Generic parity
