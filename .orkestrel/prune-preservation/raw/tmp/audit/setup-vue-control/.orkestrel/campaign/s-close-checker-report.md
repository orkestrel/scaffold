# Fix-round closure — checker report (`checker`, Claude Sonnet, 2026-09-17)

Retained from the returned message by the Orchestrator. Tip `ca09788c`; brief
`.orkestrel/campaign/s-close-checker-brief.md`. Duration 129 s, 31 tool uses.

---

Criterion 11 MET.

Final tally: only criterion 9's classifier-bound sentence clause is unmet.

## Checklist

1. MET — `grep -rn "replaces a code point above" .agents/transports/codex.md` matches nothing (no output); `grep -n "cannot represent" .agents/transports/codex.md` matches one line: `.agents/transports/codex.md:132: code page cannot represent, so when a bench unit must edit a line carrying a code point above` under § Sol route (heading at `:120`).

2. MET — the combined grep over `.agents/skills/orkestrel-prove-journey` returns no matches for any of the named strings, including `CAPTURE=1`.

3. MET — `.agents/skills/orkestrel-prove-journey/references/layer.md:72-80` orders write `tests/setupBrowser.test.ts` → add `npm run test:setup:browser` to `test` → run `scaffold repair`, and `:82-86` names the refusal for the other order (`scaffold repair` run before the chain invocation). `SKILL.md:190-191` carries only the pointer "activate its `setup:browser` project in the order [layer.md](references/layer.md) → Import, never implement states." — no second statement of the order.

4. MET — `references/layer.md:293`: `| A navigation a journey step performs by a router call | The visible link or control that navigates, through clickAccessible or clickAccessibleWithin |` scopes the ban to "a journey step." The cleanup bullet under → Mounting and cleanup, "return the route to its entry" (`:343`), is a cleanup act rather than a journey step, consistent with the scoped ban; the corroboration bullet at `:301-302` ("Never take a router call as corroboration") still excludes it unconditionally.

5. MET — `ROADMAP.md:39` reads: "36. Reopen browser-engine selection when the condition the emitted `configs/browsers.ts` doc block states is met. That doc block is the condition's one home, authored here in `src/core/templates.ts` as the `configs/browsers.ts` template. This item closes when `configs/browsers.ts` adopts an engine-selection design, or when that doc block no longer carries the limit." Comparison against `.orkestrel/campaign/s5-2-report.md` § The exact text landed and its diff confirms only row 36 changed; row 37 is unchanged in the diff context.

6. MET — `grep -n "declared size" src/core/templates.ts .agents/skills/orkestrel-prove-journey/SKILL.md guides/scaffold.md ROADMAP.md` matches `src/core/templates.ts:1143` alone: `* back at its declared size, or when a journey or style divergence is recorded.`

7. MET — `Glob` over `.agents/skills/orkestrel-prove-journey/**/*` returns exactly `SKILL.md`, `agents/openai.yaml`, and the five files under `references/` (`decide.md`, `statechart.md`, `layer.md`, `styles.md`, `captures.md`), every one of which `SKILL.md` names. `.claude/skills/orkestrel-prove-journey/SKILL.md:2-3` carries the `name` and `description` verbatim identical to the canonical file and names `.agents/skills/orkestrel-prove-journey/SKILL.md` at `:8`.

8. MET — three hits for `\b(two|three|four|five|six|both)\b`: `references/layer.md:238` ("carrying both" — names "one sentence" and "another" in the same sentence), `references/statechart.md:232` ("a screen reader and a vision model both read" — members named in the same sentence), `references/styles.md:166` ("An absent token and one declared empty both read as `''`" — members named in the same sentence). Each names its members in the same sentence.

9. UNMET — the "classifier-bound" clause. `guides/scaffold.md` no longer contains the word "classifier" anywhere (`grep -rn "classifier" guides/scaffold.md` and `grep -rn "honour|honor" guides/scaffold.md` both return no matches); `.orkestrel/campaign/s4-report-3.md`'s diff (lines 111-117) shows the sentence "The classifier is deliberately bounded to manifest script text that names `vitest`…" was deleted and replaced by a sentence naming per-check `test:*` name requirements instead. The remaining sub-clauses are met: the chain sentence at `guides/scaffold.md:669-670` ("no chain from `test` reaches `npm run test:journey` through literal `npm run` calls") and the one-question sentence at `:676-677` ("reports one non-blocking `projects` question … It reports the earliest of the facts it finds; settling that fact and re-running surfaces the next.") are present and correctly ordered; the `ScriptInvocations` Summary cell (`:663`) equals `src/bin/types.ts:228` ("Lists the literal Vitest projects, configuration paths, and npm run scripts a shell command names."), and the `scriptToInvocations` Summary cell (`:664`) equals `src/bin/helpers.ts:754` ("Reads the literal Vitest projects, configuration paths, and npm run scripts a shell command names.").

10. MET — `src/bin/helpers.ts:859`: `if (token.value === '--project' || token.value === '--config' || token.value === '-c') {` and `:873`: `if (token.value.startsWith('--project=') || token.value.startsWith('--config=')) {`. `src/bin/CLI.ts:1059`: `if (!name.startsWith('test:') || !isString(script) || !script.includes('vitest')) continue`. The missing-invocation arm at `:1132`: `!chains.get('test')?.has('test:journey')`, testing membership in the transitive `chains` walk built at `:1093-1115` rather than `scripts.test`'s direct invocations. The absent-configuration remedy at `:1071`: `` message: `The manifest at ${target} names a Vitest configuration the plan does not emit and the target does not hold: ${configurations.join(', ')}. Add the configuration, or remove the script that names it and its invocation from the test chain.`, `` names the chain invocation.

11. MET — `tests/setupServer.ts:1532`: "a member-expression call such as `require.resolve` or `import.meta.resolve`." `tests/setupServer.test.ts:664`: `expect(readSpecifiers("import.meta.resolve('pkg')\n", 'member.mts')).toStrictEqual([])`.

**Not-met item, re-dispatchable:** Restore or replace the classifier-scoping sentence in `guides/scaffold.md` (originally at the paragraph before the `ScriptInvocations`/`scriptToInvocations` table, `.orkestrel/campaign/s4-report-3.md` lines 111-117) so the guide once again states, in one sentence, the bound both the absent-project and absent-configuration checks honour — or record, in the unit's report, the deliberate decision to drop that sentence and why the replacement text ("The absent-project and absent-configuration checks read only manifest script text that names `vitest`; the configuration check also requires a `test:*` script name.") satisfies the same obligation.

CHECK: FAIL 9

---

**Orchestrator ruling on criterion 9 (2026-09-17).** The criterion asks that the guide state the
bound both loops honour; it names no word. `guides/scaffold.md:652-654` reads "The absent-project
and absent-configuration checks read only manifest script text that names `vitest`; the
configuration check also requires a `test:*` script name." — the bound, in one sentence, for both
checks, matching `src/bin/CLI.ts:1022` and `:1059`. The checker's UNMET rests on the absent word
"classifier", which the criterion's own text does not require. Criterion 9 is MET; the check
passes on every criterion.
