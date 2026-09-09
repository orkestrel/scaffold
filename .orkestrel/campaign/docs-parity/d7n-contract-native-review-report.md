The bounded adoption claims survive. This is a source comparison backed by root's recorded native and prepublish runs, plus an independent scoped run of the retained controls.

| Claim | Verdict | Evidence |
| --- | --- | --- |
| Native entry | survives | [guides.test.ts](C:/Users/mikes/WebstormProjects/contract/tests/guides.test.ts:5) statically imports the direct native ports. Package runtime imports and Vitest registration occur inside execute. Root's native run exited 0. No local launcher or registration engine appears in the supplied diff. |
| Generic findings | survives | [Report assertions](C:/Users/mikes/WebstormProjects/contract/tests/guides.test.ts:59) retain input and Contract-row population checks. Comparison with installed Guide's inspection methods found the prior fence, method, drift, example, import, link, and test-link obligations represented. The package name selects guides/contract.md for pitch comparison. |
| Package assertions | survives | [Surface checks](C:/Users/mikes/WebstormProjects/contract/tests/guides.test.ts:93) retain INTERNAL, its anti-staleness assertion, direct/barrel membership, and hidden declarations. [Runtime checks](C:/Users/mikes/WebstormProjects/contract/tests/guides.test.ts:173) retain class enumeration, prototype comparisons, and symbol controls. [Flagship assertions](C:/Users/mikes/WebstormProjects/contract/tests/guides.test.ts:239) preserve executable results and transcription bindings. |
| Helper extraction | survives | [readMembers](C:/Users/mikes/WebstormProjects/contract/tests/setup.ts:3669) retains the baseline algorithm. [Direct tests](C:/Users/mikes/WebstormProjects/contract/tests/setup.test.ts:1309) exercise callable, accessor, and data partitioning, constructor exclusion, and the symbol boundary. The scoped control run exited 0. |
| Scope and contract | survives | The supplied status and diff touch only the granted authored test paths. The scope clarification covers setup.test.ts. No source, guide, metadata, configuration, script, or vendored edit appears. Scoped git diff --check exited 0. |

The independent control run used this command from Contract:

```text
node node_modules/vitest/vitest.mjs run tests/guides.test.ts tests/setup.test.ts --config vite.config.ts --no-cache --reporter=verbose --project guides --project setup -t 'partitions callable|carries a documentable|reports a class|cannot see a symbol'
```

The controls detected the undocumented name and exposed the symbol-keyed member through the separate symbol inspection. Tests outside the explicit name filter were unexecuted in this scoped run; root's supplied full prepublish evidence exited 0.

The adjacent limits are retained behavior. readMembers classifies a setter-only descriptor as data, as the baseline did. Generic report collections without prior equivalent assertions do not establish lost coverage. Nonempty rewrite behavior was not independently measured in this review.

The writer report's claim that the old entry constructed Parity remains a prose error. It does not describe the baseline code and does not falsify the adoption.

VERDICT: PASS
