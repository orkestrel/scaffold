# Scaffold units S1, S2, S3 audit — subjective lane report (`analyst`, gpt-6-astra, 2026-09-17)

Retained from `tmp/codex/s-audit-subjective-last.md` by the Orchestrator. Journal `tmp/codex/s-audit-subjective.jsonl` (swept at acceptance), thread `01a0b103-3eb4-7eb3-a4e1-086e2dd88d78`, read-only sandbox, 942 s. Brief: `.orkestrel/campaign/s-audit-subjective-brief.md`; claims: `.orkestrel/campaign/s-audit-claims.md`.

---

1. **BROKEN — removing the journey axis leaves a broken test chain.** Executed the built manifest functions with `{ src: [], app: ['browser'], journey: true }`, then projected the same blueprint with `journey: false`. The root lost `appJourney`, but the manifest retained `test:journey` and its invocation from `test`, still naming the deleted wrapper. The reverse projection adds `test:journey` without adding it to `test`. [blueprintToWritableScripts](/C:/Users/mikes/WebstormProjects/scaffold/src/core/compilers.ts:458) preserves aggregate chains; the CLI’s project check overlooks config-based invocations. Executing `scriptToInvocations` on the journey command returned empty `projects` and `scripts`. Add adoption and removal checks that require the manifest and wrapper to agree, while preserving maintainer-owned chains.

2. **CONFIRMED — exact-case inference held.** On this case-insensitive host, `existsSync('tests/SetupPolicy.test.ts')` returned `true`, while the real `isExactCaseFile` returned `false`; the correctly cased path returned `true`. CLI inference reads directory entries and applies that guard. For a browser proof without its setup module, the selected blueprint emits the missing birth-owned `tests/setupBrowser.ts` seed during a repair that includes tests. A configs-only repair does not promise to create test modules.

3. **CONFIRMED — the emitted setup partition held.** Applied the emitted patterns to `tests/setup.test.ts`, `tests/setupServer.test.ts`, `tests/setupBrowser.test.ts`, and a nested setup proof. The root Node proofs select Node, the browser proof selects browser, and the nested proof selects neither. Generated configuration enables Chromium and names the shared and browser setup modules. Generated scripts place `test:setup` before `test:setup:browser`; unselected browser setup emits no browser script. No browser proof is generated. This confirms emission, not browser execution.

4. **UNRESOLVED — browser delivery of `capture` remains unproved.** The emitted expression and `provide` object are correct, but the retained Node registration probe cannot establish browser injection. Settle in a generated workspace with `{ src: [], app: ['browser'], journey: true, setup: ['browser'] }`, using the emitted root and wrapper. In `tests/app/browser/integration.test.ts`, provide cases named `capture off` and `capture on` asserting strict equality to `false` and `true`, respectively. Run in PowerShell:

   ```powershell
   Remove-Item Env:CAPTURE -ErrorAction SilentlyContinue
   npm.cmd run test:journey -- --testNamePattern 'capture off'
   $env:CAPTURE = '1'
   npm.cmd run test:journey -- --testNamePattern 'capture on'
   ```

   Require actual Chromium execution under each declared variant.

5. **BROKEN — the engine reopening condition has duplicate homes.** [ROADMAP.md:39](/C:/Users/mikes/WebstormProjects/scaffold/ROADMAP.md:39) repeats the condition immediately before instructing readers not to repeat it. [guides/scaffold.md:961](/C:/Users/mikes/WebstormProjects/scaffold/guides/scaffold.md:961) repeats it again. Replace those restatements with pointers to the emitted browser resolver documentation and the skill’s Accept paragraph.

6. **CONFIRMED — the added names match emission.** Compared the changed rule and guide passages with generated configurations and scripts. `appJourney`, `journey:<name>`, `setup:browser`, `test:journey`, `test:setup:browser`, the wrapper path, and the provided fields use the emitted spellings. The lifecycle defects belong to claims 1 and 23.

7. **UNRESOLVED — the controls’ resistance to an untested mutation remains open.** Candidate: change only the emitted `appJourney` factory’s browser `enabled` value to `false`. The core checks inspect other text and type validity; the config control plants its own independent browser-enabled factory. I could not execute the mutation. The scoped baseline command failed before collection because Vite could not write its temporary configuration under `node_modules/.vite-temp`.

   Apply that mutation and run:

   ```powershell
   npm.cmd run test:src:core -- --testNamePattern 'emits journey wiring|advises a journey selection|partitions root setup|typechecks journey variants'
   npm.cmd run test:src:bin -- --testNamePattern 'infers journey and setup runtimes'
   npm.cmd run test:config -- --testNamePattern 'requires and validates every selected target wrapper'
   ```

   Restore the mutation and repeat. A mutation run remaining green would break this claim.

8. **CONFIRMED — the setup expectation migration is consistent.** `tests/setup.test.ts:48` expects `[]`. The built default blueprint returns that value. Searches of source, tests, fixtures, guides, and applicable rules found no surviving boolean declaration or boolean expectation for this blueprint field.

9. **CONFIRMED — the new sweep doors held under execution.** A malformed fence with `@orkestrel/test` only in a comment produced the documented parse refusal; the equivalent malformed fence without that scope produced no violation. `@orkestrel/scaffold/server` accepted `Materializer` and rejected a missing binding. Reading an installed declaration containing a package re-export returned `form: non-relative re-export`. Installed declarations exporting a local name as `default` beside named exports returned `form: default export list`. These are explicit refusals, not silent empty inventories.

10. **CONFIRMED — the reader documents the blind forms exercised.** Executed the exact exported `readSpecifiers` declaration in isolation with its real parser and guards. Static imports, re-exports, dynamic imports, and bare `require` calls were read. A type-position `import()` was omitted; a `createRequire` binding named `load` contributed only its static `node:module` import. Those omissions are stated in `tests/setupServer.ts:1531`. Quoted import text was ignored, and a runtime-computed argument returned `undefined`. The vendored proof remains scoped to Orkestrel package admission.

11. **CONFIRMED — signature attacks found no mismatch.** Compared the skill tables with installed browser and core declarations, including argument order, return types, and the keys of `TextWaitOptions`, `StateOptions`, `StorageOptions`, `HarnessOptions`, and `WaitOptions`. The `waitForText` reader argument, state options, storage controls, harness builder, and capture variant mapping agree with the installed contracts.

12. **BROKEN — the failure-voices table is incomplete and overstates the storage sentence.** [layer.md:141](/C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-prove-journey/references/layer.md:141) omits `<name>: build refused`, although the statechart instructions teach that refusal. Direct execution of the installed runner produced it. The table also omits `Statechart harness mounted no transition`. Its storage row always prints a quoted key, while installed `buildDenial(operation, undefined)` omits that suffix. Add the taught statechart refusals and distinguish keyed from unkeyed storage messages.

13. **CONFIRMED — the declared injection shape matches the emitted provider.** Compared the established compiling fence against generated `appJourney`: `variant` receives `variant.name`, `variants` receives the declared `JourneyVariant` collection, and `capture` receives the boolean expression. No declared key is missing or assigned a differently shaped value. Browser transport of that object remains claim 4.

14. **CONFIRMED — the installed terminal-status path matches the teaching.** The harness’s outer catch writes `failed` and rethrows the original value without wrapping it. It encloses the row loop, so the rule does not depend on the reader’s row position. A refused builder records its row as failed and reaches the terminal failure calculation even on the final row. The retained independently verified browser tests exercise reader `Error` and non-`Error` identity, uncounted reader failures, and continued execution after builder refusal.

15. **CONFIRMED — the worked transition table matches the executed suite.** Compared the skill with the disclosure fixtures and runner case in `C:/Users/mikes/WebstormProjects/test/tests/src/browser/factories.test.ts`. The phases and transitions agree: summary opening, summary closing, button closing, and dismissal while already closed. The unchanged-state outcome is present in the suite covered by the retained independent verification.

16. **BROKEN — the router replacement contradicts the interface rule.** [layer.md:273](/C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-prove-journey/references/layer.md:273) replaces a router call with readers and a wait, which cannot perform navigation. The following instruction permits a router call as corroboration. Thus `router.push('/settings')` followed by a rendered assertion fits that permission while violating the skill’s requirement to change routes through the interface. Restrict corroboration to route-state reads; replace navigation calls with visible link or control activation. The focus replacement itself holds: `traverseAccessible` advances Tab from body focus without requiring `pressKeys` to establish initial focus.

17. **CONFIRMED — the Accept artifacts have producing instructions.** Traced the written variant artifact to `decide.md`, the vocabulary sweep to whole-page perception instructions, disk membership to `captures.md`, and the style, statechart, setup, refusal, transport, and mutation proofs to their sections. The attempted orphan-artifact attack found no Accept requirement without an instructing location.

18. **BROKEN — the title instruction imposes product policy.** [SKILL.md:222](/C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-prove-journey/SKILL.md:222) declares shared screen titles a surface finding. A product guide that intentionally specifies a shared title therefore fails the skill despite supplying the required expected outcome. Remove that universal judgment and compare each screen’s title with its product contract. The journey and refusal mutation prescriptions themselves match D23.

19. **CONFIRMED — the roadmap’s closure and retained-gap attacks held.** The closed clauses have their corresponding implementation or teaching. The emitted core wrapper still repeats `publicDir: false`; the emitted showcase wrapper still lacks the requested replacement comment. The retained guide-parser defect supports its open item, and the roughnotes menu trigger still lacks authored `aria-expanded`. The engine condition remains an exclusion awaiting evidence; its duplicate wording is claim 5.

20. **BROKEN — the Unicode review rule misses partial corruption.** The criterion in [codex.md:131](/C:/Users/mikes/WebstormProjects/scaffold/.agents/transports/codex.md:131) flags a removed line containing non-ASCII only when its replacement contains none. Executed that criterion against a line containing U+96EA and U+00D7 whose replacement loses U+96EA but retains U+00D7: the damage remained unflagged. Compare changed non-ASCII content on touched lines rather than testing whether any survives. Rewrite the explanatory paragraph as directives. The retained incident does not independently prove that the exec’s patch route preserves Unicode; establish that remedy with a controlled Unicode round-trip through the named route.

21. **CONFIRMED — `buildRefusal` is taught accurately.** The installed core runner and browser harness call the same helper. A direct runner probe with a refused builder produced `<name>: build refused` and preserved the supplied cause by identity. The browser harness call uses that helper’s message for its failed-row announcement. The helper is fenced and named in the statechart reference.

22. **BROKEN — the skill still contains explanations, counts, and repeated laws.** Examples include the narrative opening of the worked table at [statechart.md:46](/C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-prove-journey/references/statechart.md:46), the reassurance that a published replacement makes a ban cost nothing at `layer.md:264`, and the repeated instrument aphorisms at `styles.md:111` and `SKILL.md:285`. The worked example also counts mounted disclosures in explanatory commentary. Replace these with required actions or checks, and reference governing laws instead of restating them. Reference existence, unchanged frontmatter description, bridge description equality, and unchanged `agents/openai.yaml` held under direct checks.

23. **BROKEN — a fresh browser workspace cannot follow the stated onboarding sequence.** The earliest contradiction is [SKILL.md:76](/C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-prove-journey/SKILL.md:76): it says the generated workspace fans out the journey suite. Executing generation for `{ src: [], app: ['browser'] }` produced `journey: false`, no journey wrapper, and no `test:journey`. Later instructions tell the reader to edit that absent wrapper and run that absent script. The browser setup seed exists, but its proof and selected setup project do not yet exist. Teach explicit activation: create the wrapper and real setup proof, run the appropriate repair, reconcile gate chains, and verify collection before using the injected values. I would not ship the current workflow.

**Findings fitting no claim**

None.

**Attacked and held**

- Disabling journey at blueprint creation removes the ordinary-browser exclusion, allowing the integration path to remain in its ordinary collection.
- Selecting journey without a browser application emits no journey machinery and returns a nonblocking advisory.
- Selecting browser setup without a browser application still emits the browser setup machinery and seed; it does not generate a vacuous proof.
- Default-export-list refusal rejects the declaration inventory explicitly, even when valid named exports occur beside the refused form.

VERDICT: FAIL 1, 4, 5, 7, 12, 16, 18, 20, 22, 23; outside the claims: none