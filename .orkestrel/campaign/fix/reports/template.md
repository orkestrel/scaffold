# Fix report: template

## Dispositions

- **s17-14** applied (src/core/shapers.ts, src/core/helpers.ts, src/core/index.ts, src/core/Template.ts, tests/src/core/shapers.test.ts, tests/src/core/helpers.test.ts, guides/template.md): Applied the shared part of both lane corrections: created src/core/shapers.ts, moved placeholderShape there unchanged (no rename), added `export * from './shapers.js'` to src/core/index.ts, and repointed the Template.ts import. Published surface unchanged. Ancillary decisions: moved the placeholderShape guide row from the Helpers table into a new `### Shapers` subsection under `## Surface` (lane 1 asked for a placement update, lane 2 for none; the row's content is untouched and guide parity stays green), and mirrored the source move by putting the placeholderShape tests in a new tests/src/core/shapers.test.ts, with the guide's Tests list updated for both files.
- **s17-15** applied (src/core/helpers.ts, src/core/types.ts, src/core/Template.ts, tests/src/core/helpers.test.ts, guides/template.md): Lanes proposed two different leaf shapes (a per-match walk yielding text/index versus a per-token resolveToken); applied what they share, which is the narrower resolveToken(record, placeholders, token): TemplateTokenResolution carrying { value, declared, required }. fillTemplate's replace callback and Template#validate's matchAll loop now both call it, so the token rule has one implementation while each keeps its own walk. Added the TemplateTokenResolution interface to types.ts, unit-tested the leaf (undeclared token split, declared path preference, required derivation, fallback left on `declared`, unsafe-path refusal, determinism, and an agreement case pinning resolveToken against fillTemplate and validate), and added the guide Surface row, fence example, and TSDoc example. Behavior is identical to the two former copies; the existing fill/validate suites pass unchanged.
- **s17-16** deferred_breaking: Deferred: renaming the published `TemplateManagerInterface.size` member to `count` renames a public interface property, which the breaking test forbids. Re-verified against the current tree: types.ts still declares `readonly size: number` and TemplateManager.ts still implements the `size` getter, so the finding stands for the work order.
- **s17-17** deferred_breaking: Deferred: changing `template(id)` to return `TemplateInterface | undefined` is a non-additive change to a published return type and removes an observable throw that the guide, the TSDoc, and tests/src/core/TemplateManager.test.ts:78 currently pin as intended. Nothing in the package documents the undefined outcome, so no part stands on its own; the whole finding, including the guide and test updates both lanes named, goes to the work order. Re-verified: the accessor still throws NOTFOUND through #throwNotFound and guides/template.md still labels the row an AGENTS §9.1 singular accessor.
- **s17-18** deferred_breaking: Deferred: dropping the no-argument `remove()` overload removes a published call signature. Re-verified: types.ts still declares `remove(): void` and TemplateManager.ts still implements the remove-all branch. The judge's ruling and the surviving lane correction agree on dropping the overload and leaving clear()'s single `clear` emission alone; that is the shape the work order carries.
- **s17-20** applied (src/core/types.ts, src/core/TemplateManager.ts, src/core/helpers.ts, guides/template.md): Applied as additive named types: declared TemplateRegisterOptions { readonly replace?: boolean } and TemplateFillContext extends TemplateFillOptions { readonly placeholders?: readonly TemplatePlaceholder[] } in types.ts, and referenced them from TemplateManagerInterface#register, TemplateManager#register, and fillTemplate. The structures are identical to the former inline bags, so the call signatures are unchanged for consumers; both types now have guide Surface rows a consumer can reference.
- **s17-22** applied (src/core/Template.ts): Applied the reshaped repair, not the finding's original: the judge and the surviving lane rejected the eight-getter rewrite as churn and named the tier-order break instead, so the three `#` fields (#missing, #locale, #contract) now precede the eight public readonly data fields, matching architecture.md § Class order. Declaration order only — no member, type, or runtime behavior changed.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 1730ms on 44 files. (First run reported issues in guides/template.md and src/core/helpers.ts; converged with `npm run lint` then `npm run format`, then re-ran the non-mutating chain.)
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no diagnostics
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — no diagnostics
- npm run build: pass — 10 modules transformed; dist/src/core/index.js 25.34 kB, dist/src/core/index.cjs 25.91 kB; built in 2.89s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — test:src 5 files/123 tests passed; test:policy 1/111 passed; test:config 1/46 passed; test:setup 1/2 passed; test:guides 1/23 passed

## Diffstat

```text
 guides/template.md             |  27 +++++++++--
 src/core/Template.ts           |  21 ++++-----
 src/core/TemplateManager.ts    |   3 +-
 src/core/helpers.ts            | 103 ++++++++++++++++++++++-------------------
 src/core/index.ts              |   1 +
 src/core/types.ts              |  46 +++++++++++++++++-
 tests/src/core/helpers.test.ts |  71 ++++++++++++++++++++++------
 7 files changed, 194 insertions(+), 78 deletions(-)

Untracked additions git diff --stat does not list (from git status --porcelain):
?? src/core/shapers.ts
?? tests/src/core/shapers.test.ts
```

- dist moves: true
