**Per-claim verdicts**

This is a source and instrument audit. Runtime gate results come from `.orkestrel/scaffold/s3-verify-report.md`; mutation scripts were not executed in this read-only session.

| Claim | Verdict | Deciding evidence |
|---|---|---|
| 1 | **CONFIRMED** | `UserConfig` declares `mode` at `node_modules/vite/dist/node/index.d.ts:3517`, without `command`. Vitest supplies the pair at `node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:11365`. The corrected comments match those declarations. |
| 2 | **CONFIRMED** | `vite.config.ts:68` excludes taken indices; line 75 records consumption. The repeated-name case at `tests/src/core/compilers.test.ts:3137` asserts that the later base entry survives by identity. |
| 3 | **CONFIRMED** | `vite.config.ts:50` states the other-key rule. The implementation preserves `mergeConfig`’s result and replaces only root `plugins` at line 81. |
| 4 | **CONFIRMED** | `src/core/templates.ts:377` carries the browser default, Vite default, plugin overwrite, and disabled-option consequence. The contradictory template clause is gone at line 348. Vite documents `4096` at `node_modules/vite/dist/node/index.d.ts:2841`; the plugin overwrite remains the settled ruling in `.orkestrel/scaffold/s1-audit-verdict.md:37`. |
| 5 | **REFUTED** | `tests/src/core/compilers.test.ts:3066` says the repeated-name case takes its base from `srcServer`. That case instead constructs its base directly at line 3137. The control census itself is accurate; the uncontrolled nested, opaque, and command-only inputs retain bare-merge behavior under `mergeConfigRecursively` at `node_modules/vite/dist/node/chunks/node.js:2806`. |
| 6 | **CONFIRMED** | `tests/src/core/compilers.test.ts:3118` asserts `server.plugins?.[0]` is the replacement object. Keeping the factory’s original boundary fails that assertion despite preserving its name. |
| 7 | **CONFIRMED** | The control at `tests/src/core/compilers.test.ts:1687` omits the browser environment. Its wrapper maps cannot satisfy the browser-selection expectations, and its emitted root lacks the browser factory. The comment explicitly excludes the merge pin from this control’s coverage. |
| 8 | **UNSETTLED** | The retained scripts mutate source/configuration rather than tests. Their recorded executions remain writer-reported. Moreover, `s3-red-1-selection.mjs:50` and `s3-red-2-pinning.mjs:43` accept any nonzero—or null—child status as a red. Re-run the retained scripts on the host and retain output proving the named assertions failed, then passed. |
| 9 | **UNSETTLED** | `s3-relocation-control.mjs:16` replaces `html` with `htmm` inside the showcase literal and recaptures through the generator. This is a length-preserving ASCII substitution, but the script logs rather than asserts equal capture lengths. Settle the measured claim with `node .orkestrel/scaffold/s3-instruments/s3-relocation-control.mjs`, retaining its output. |
| 10 | **REFUTED** | [The predicate](C:/Users/mikes/WebstormProjects/scaffold/vite.config.ts:84) checks property presence, not whether `name` is a string. Its `instanceof Promise` exclusion also does not cover structural or foreign-realm promises admitted by the declaration at `node_modules/vite/dist/node/index.d.ts:2337`. `candidates` and `taken` are correctly renamed. |
| 11 | **CONFIRMED** | `tests/src/core/compilers.test.ts:3220` asserts nested arrays, promises, and anonymous objects by identity after asserting the result’s length. Fresh anonymous objects cannot satisfy those assertions. |
| 12 | **CONFIRMED** | Source comparison preserves wrapper behavior: core adds plugins to a plugin-free base; browser/server declaration plugins match no base name; bin adds no plugins. Showcase composition preserves boundary replacement and plugin order. No emitted base repeats a plugin name. The settled single-file overwrite makes the restated asset limit neutral. `s3-effective.mjs` alone proves less: it compares plugin names only. |
| 13 | **UNSETTLED** | Byte agreement is covered by `tests/src/core/compilers.test.ts:1230` and the independent verifier’s green `src:core` result. Historical regeneration is supported only by the writer’s account and an executable adoption script. To establish fresh regeneration evidence, run `node .orkestrel/scaffold/s3-instruments/s3-adopt.mjs`, then `npm run test:src:core -- -t "keeps this repository byte-identical to every configuration it generates"`. |
| 14 | **CONFIRMED** | The observed `git diff --name-only` contains no path from `HOST_PATHS`; the explicit vendored-path diff is empty. `.orkestrel/scaffold/s3-verify-report.md:77` records an empty `host.json` diff after the successful build. |
| 15 | **CONFIRMED** | Inspection of the added TypeScript and emitted templates found no prohibited assertion, explicit `any`, non-null assertion, or suppression. The added-line syntax search returned prose uses of “as” only. The independent verifier also records clean lint and typechecking. |

**Findings**

- **Medium — The named-plugin predicate overstates its narrowing.** At `vite.config.ts:84` and `src/core/templates.ts:145`, `{ name: 7 }` passes despite contradicting `{ name: string }`. That plain object is outside the declared plugin-object contract, but the declaration also admits structural promises whose extra `name` property need not be a string. A promise-shaped object implementing `then`, `catch`, `finally`, and `Symbol.toStringTag`, with `name: 7`, passes this predicate without being a native `Promise` instance. Matching such entries can discard a promised plugin instead of preserving it as opaque. A later string operation relying on the predicate can throw. This is a source/declaration counterexample, not an executed reproduction.

- **Low — The hazard comment misidentifies the repeated-name case’s input.** `tests/src/core/compilers.test.ts:3066` claims factory-derived coverage that the case at line 3137 does not provide. The case correctly tests real boundary objects; it does not test that shape through `srcServer`.

- **Medium — The retained red runners can certify an unrelated failure.** `s3-red-1-selection.mjs:39` and `s3-red-2-pinning.mjs:34` return only the child status. Their callers accept startup failure, collection failure, or process termination as the expected red. A subsequent successful restored run does not establish that the mutation broke the named assertion.

- **Medium — Mutation cleanup does not cover every failure path.** `s3-red-1-selection.mjs:47`, `s3-red-3-identity.mjs:51`, and `s3-effective.mjs:38` write files before entering their restoration `try` blocks. If the later write fails, an earlier mutation remains even without process termination. Forced termination also bypasses `finally`. The unconditional clean-tree statement in `.orkestrel/scaffold/s3-report.md:194` is false.

- **Low — The extracted helper remains hidden contrary to the coding contract.** `vite.config.ts:84` introduces a non-exported module helper. The report’s justification that placement lint does not inspect root configuration files does not create an exemption from `AGENTS.md`’s prohibition on hidden reusable helpers.

**The hazards**

- **Predicate soundness:** Refuted as described in the predicate finding. Ordinary plugin objects require string names under Rolldown’s declaration at `node_modules/rolldown/dist/shared/define-config-DNX0WekP.d.mts:3269`. That does not establish the same requirement for extra properties on the promise branch.

- **Unnamed-base short circuit:** For stable entries, it preserves the result. The former predicate could never match an unnamed base; the new branch pushes that same entry without searching. It also avoids inspecting candidates unnecessarily. Evidence: `vite.config.ts:62`.

- **Taken indices and base order:** Pairing is defensible: successive base occurrences receive successive unused override occurrences with the same name; unmatched base entries survive and unused overrides append. Base order determines placement and can change predicate work because consumed candidates short-circuit earlier. The search remains quadratic in the worst case. Evidence: `vite.config.ts:61–79`.

- **Root configuration drift:** The test at `tests/src/core/compilers.test.ts:1230` compares complete generated configuration text against disk after asserting artifact membership. An independent change to any root-config text therefore fails that comparison. Coordinated template/config edits remain possible; byte agreement does not prove correctness or generation history.

- **Restoration and foreign-file removal:** Termination between mutation and restoration leaves the tree mutated; pre-`try` write failures expose another gap. None of the retained S3 scripts explicitly removes a file or directory. Restoration can nevertheless overwrite an intervening edit because it writes the saved whole-file content.

- **Browser-free pinning control:** It discriminates browser selection, wrapper-map membership, and browser-factory presence. It does not establish sensitivity to arbitrary browser text changes or the common merge implementation. The comment at `tests/src/core/compilers.test.ts:1687` states the merge limitation honestly; that pin depends on the separately retained mutation.

VERDICT: REJECT