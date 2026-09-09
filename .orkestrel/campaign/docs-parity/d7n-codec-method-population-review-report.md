Codec’s generic parity claim is falsified. The adoption removes an existing guard against phantom method tables.

The [frozen diff](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-codec-native-root/diff-before.txt:275) deletes the baseline method-membership assertions. It also deletes the method-example assertion. The adopted [guides test](C:/Users/mikes/WebstormProjects/codec/tests/guides.test.ts:153) asserts neither `report.methods` nor `report.examples.methods`.

I independently ran [the supplied control](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/probe-codec-method-population.mjs). It exited `0` after appending this table to an in-memory copy of Codec’s guide:

```md
## Methods

#### `AbsentInterface`

| Method |
| --- |
| `absentMethod` |
```

The parser retained the group. The baseline comparison returned `absentMethod` as missing. Guide’s method report returned:

```text
guides/codec.md documents no source AbsentInterface.absentMethod.
```

The adopted test does not consume that finding. Drift, fence, import, link, and test-link findings remained empty. The reported surface exceptions were Codec’s retained internal constants.

Restore per-row assertions over `report.methods` and `report.examples.methods`. These replace the deleted baseline obligations without requiring a Methods section or redesigning Guide.

This control proves the lost method-membership guard. It does not independently prove method-example coverage or run the complete authored test against modified inventory. Its empty pitch result is not pitch evidence because the instrument supplies no pitch option.

Contract and SSE findings remain unchanged.

VERDICT: FAIL Generic parity (Codec); outside the claims: none
