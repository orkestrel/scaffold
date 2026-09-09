Objective lane: yes, the proposed composition closes the collision counterexample.

Use `findDrift(guide, source)` as the authoritative ordered result. Derive only the example suffix length by walking `guide.fences()` in first-title-occurrence order, resolving counterparts through `collectTitles(guide, source)`, and calling `computeDrift` with the same normalized payloads as `findDrift`:

```ts
`${language ?? ''}\n${code}`
```

Then verify that the derived example disagreements equal the corresponding `findDrift` suffix before assigning categories. If they differ, report an invariant failure instead of guessing.

This preserves these ownership boundaries:

- `findDrift` owns summary and method pairing, total order, and the authoritative drift values.
- `collectTitles` owns source-example pairing.
- `computeDrift` owns comparison semantics.
- The test entry owns only first-title traversal and category reconstruction because installed `Drift` has no category discriminant.

The installed API cannot recover categories without that bounded traversal. No Guide API expansion is needed.

The edge classes do not invalidate this composition:

- Canonical `createGuide` and `createSource` inputs normalize an absent fence language to `undefined`; `findDrift` then normalizes it with `?? ''`. The raw `undefined` versus empty-string disagreement is reachable through custom interface implementations, but not through this command’s parsed inputs.
- `replaceFence` reparses the raw guide, so adopted-AST span loss is not part of this command path. Parsed nested blockquote and list fences retain parser provenance. However, `replaceFence` still publicly permits `undefined`, so it must never serve as the category oracle.

For `--to guide`, an example-category disagreement stays an example even when `replaceFence` returns `undefined`. Report that the titled example lacks a writable location; do not fall through to summary replacement.

Required controls:

- A function-shaped example title that collides with a summary key remains an example in each direction.
- A refused `replaceFence` remains an example failure and never calls summary replacement.
- Duplicate guide titles follow the first-title rule used by `findDrift`.
- The locally derived example disagreements must equal the documented `findDrift` suffix, including keys and values.
- Missing language and explicit parser-normalized absence produce the same comparison payload.
