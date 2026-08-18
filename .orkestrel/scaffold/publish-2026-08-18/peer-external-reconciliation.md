# Reconciliation: a declared peerDependency must never be bundled

Two blind lanes ran on one brief. `planner` (Opus 5, subjective) and `analyst` (GPT-5.6 Sol,
objective, journal `tmp/codex/peer-external-sol.jsonl`). Both engines were live; no substitution.

## The brief's diagnosis was wrong, and both lanes caught it

The brief asserted rolldown could not resolve `vitest/browser`. Sol measured otherwise and Opus
independently filed it as its Risk 1. The Orchestrator then verified it directly:

`/workspace/test/node_modules/vitest/browser/context.js` resolves fine and reads:

```js
// Vitest resolves "vitest/browser" as a virtual module instead
// fake exports for static analysis
export const page = null
export const userEvent = null
throw new Error('vitest/browser can be imported only inside the Browser Mode. …')
```

So the bundler resolved correctly and inlined a deliberate static-analysis stub whose exports
genuinely are `null`; Vitest substitutes a virtual module at test time. The guard `throw` was
tree-shaken out with everything else, which is why the artifact fails silently at
`null.getByRole(...)` rather than with the stub's own message.

The defect is therefore not a resolution failure. It is exactly this: **a declared peerDependency
was bundled, and the on-disk form of a peer is a placeholder meant to be replaced.**

## The ruling: Fork A, extended to every published build face

Sol ruled Fork A (externalize declared peers). Opus ruled Fork B (externalize every bare specifier).
Both produce identical emitted bytes today — the Orchestrator measured that `@orkestrel/test` is the
only package importing any non-`@orkestrel`, non-`node:`, non-`@src` bare specifier from published
source, and both of its imports are the declared peer `vitest`.

**Take Fork A.** Reasons, in order of weight:

1. `AGENTS.md` gates a capability on its first real consumer and forbids speculation. Fork A's
   consumer is measured and singular. Fork B's wider policy — refusing to bundle ordinary
   third-party runtime dependencies — has no consumer in the fleet, and Opus concedes its escape
   hatch would itself be a future `Blueprint` fact built for nobody.
2. Now that the cause is known, Fork A names the exact broken semantic. A peer is consumer-supplied
   by definition, so bundling one contradicts the declaration. Fork B fixes it as a side effect.
3. Fork B changes the vendored `configs/helpers.ts`, which obliges `repair` in all 44 targets rather
   than `overwrite` alone. Opus files that as its own Risk 4: `repair` also restores
   `tests/setupPolicy.ts` and `tests/policy.test.ts` and can turn a green target red for unrelated
   reasons. That is real cost for identical output.

**Adopted from Opus over Sol:** apply the predicate to **four** faces, not three. Sol named core,
browser, and server. Opus additionally named `bin` (`templates.ts:195`), and is right that the hole
is identical there — with a worse artifact, since a bin bundle with a bundled-away peer is a broken
executable rather than a broken helper.

**Adopted from both, converged:** the matcher is `id === peer || id.startsWith(peer + '/')`, so a
peer named `react` cannot capture `react-dom` while `vitest/browser` and scoped subpaths still match.

**Adopted from Sol over Opus:** the peer list is read from the workspace's own `package.json` through
an import attribute, the way the generated config already reads `tsconfig.json` — not compiled into a
`Blueprint` fact. Opus reached the same conclusion in its Fork A fallback: a compiled copy and the
live manifest are two writers of one fact and drift the first time a peer is added by hand.

## Carried as a named successor, not in scope

Opus's U7, the manifest-agreement gate: every bare specifier an emitted `src` chunk imports must
resolve to a package named in `dependencies` or `peerDependencies`. That is what actually closes the
class, and `configs/helpers.ts` already exports every piece it needs (`environmentBoundary`'s
`generateBundle` walk, `packageNameOf`, `readBoundedFile`). Excluded here because adding a plugin
capability inside a defect fix is the scope creep `.claude/rules/quality.md` forbids. Recorded so it
is carried rather than dropped.

## Risks closed by measurement rather than argument

- **Opus Risk 5, the declaration face.** Checked: published and rebuilt
  `dist/src/browser/index.d.ts` are byte-identical and neither mentions `vitest`, so no types/JavaScript
  disagreement exists to reconcile.
- **Opus Risk 2, "behaviour-preserving is an inference."** Measured over source graphs, not manifests:
  only `test` imports a non-Orkestrel bare specifier.

## The acceptance criterion, adopted verbatim from Opus

After the fix, `@orkestrel/test`'s rebuilt `dist` is materially identical to the published
`@orkestrel/test@0.0.6` tarball, and no other package's `dist` moves. It is falsifiable, cheap, and
doubles as the negative control on the whole ruling: a mismatch means the emit changed for a reason
the ruling has not named, and the round re-baselines rather than accepting.
