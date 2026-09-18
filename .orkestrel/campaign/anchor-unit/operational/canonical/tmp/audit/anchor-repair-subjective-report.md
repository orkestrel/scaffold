Subjective lane: GPT-5.6 Sol substituting for Opus. Paths refer to the frozen candidate checkout.

1. **CONFIRMED.** Attacked numeric conversion, independent identity mismatches, and consumer drift. `src/server/helpers.ts:1930` requests native bigint metadata and returns its device/inode unchanged at `:1934`. Strict comparison remains at `:1961`. Authoritative readonly bigint fields appear in `src/server/types.ts:190`. The retained green exercises independent device/inode mismatches and untouched identity; the establishment proof compares returned anchors with native metadata at `tests/src/server/WriteTransaction.test.ts:379`.

2. **CONFIRMED.** Attacked replacement-proof vacuity and widened refusal. `tests/src/server/helpers.test.ts:2845` obtains independent native identities, keeps the original allocated under `retired`, verifies the resulting paths, and requires replacement refusal. The retained green executes that test and the missing/file/link controls. The implementation changes the metadata representation without changing its directory/refusal guards. Transaction orchestration remains unchanged.

3. **CONFIRMED.** Attacked dependence on unsafe inode magnitude and compiler-receipt overstatement. Strict equality with native bigint metadata at `tests/src/server/helpers.test.ts:2813` rejects numeric capture even when the numeric value is exact. The retained red reaches that assertion with numeric `782266666` versus bigint `782266666n`; it isn’t a collection or compilation failure. Green and transaction logs identify the candidate and execute the named proofs. Submitted compiler drafts match the candidate source after line-ending normalization. The request explicitly binds runtime execution to the canonical workspace; the receipt proves those drafts on that substrate, not the complete candidate tree.

   The retained compiler closing line is:

   ```text
   receipt probe:b8ff7252ce35242ae141867303041a85:type:typescript@6.0.3:oxlint@1.83.0:vitest@4.1.11:configs/src/tsconfig.server.json@3584c2c4c2bfee6280226ce493a811d9
   ```

4. **BROKEN.** The guide broadens the bigint promise beyond directory anchors. `guides/scaffold.md:1864` says, “The transaction captures native bigint device and inode values without numeric rounding.” The transaction also captures destination snapshots through `readExpectation` at `src/server/WriteTransaction.ts:156`. That helper uses numeric `lstatSync` at `src/server/helpers.ts:1989`; its public device/inode fields remain numeric at `src/server/types.ts:163`.

   Independent read-only execution of the candidate’s existing built `readExpectation(process.cwd())` returned a directory snapshot with `"device":"number","inode":"number"`, while native bigint metadata returned bigint fields. This corroborates the unchanged snapshot implementation; it isn’t fresh packed-artifact proof.

   Smallest fix: replace the guide sentence with **“Directory anchors capture native bigint device and inode values without numeric rounding.”** Regenerate the guide’s inventory digest. Preserve the separate snapshot contract and the lifetime limitation. The anchor-specific TSDoc, example, and declaration-example expectation otherwise fit the repaired capability.

5. **CONFIRMED.** Attacked API expansion, misplaced mechanisms, and stale inventory. The frozen diff retains the existing names, centralized types/helpers, dependency boundary, and transaction consumer. It introduces no helper, wrapper, dependency, or suppression. Independent read-only hashing verified the authored guide digest and aggregate manifest digest; a wrong-byte control disagreed. The retained journey skill and capture reference also match their declared inventory entries. `tests/src/server/helpers.test.ts:2512` compares the complete staged manifest with the committed inventory.

**Findings fitting no claim:** None.

**Attacked and held:** Inode reuse after deletion remains an explicitly documented lifetime limitation (`src/server/helpers.ts:1949`, `guides/scaffold.md:1865`). Exact bigint comparison doesn’t supply lifetime continuity or serialization. Pending release gates, fresh archive proof, and Linux verification remain outside this source verdict.

VERDICT: FAIL 4; outside the claims: none
