<!-- codex exec, gpt-6-astra, read-only; journal u1-conform-audit-analyst.jsonl (ephemeral, swept at acceptance); thread 01a0c038-5bc7-7dd2-a70a-ccec4e13bdc8; exit 0; retained 2026-09-20 -->

A fix round is required for claim 4 and additional finding 11. This is a source audit with read-only, in-memory probes. I ran no gates or commands that write.

Paths below are relative to Veneer unless prefixed with `scaffold/`.

| Claim | Ruling | Deciding evidence |
|---|---|---|
| **1 — Placement** | **CONFIRMED** | The live classes and mirrored tests occupy the requested flat paths. Filesystem checks found the named former folders and factory files absent. No TypeScript file remains under a test `fixtures/` folder. The report’s placement rows agree with the applicable class, barrel, and test rules. |
| **2 — Names** | **CONFIRMED** | `src/browser/types.ts:2`, `validators.ts:14`, and `constants.ts:5` carry the requested names and key. The exact old-name sweep over `src`, `app`, `tests`, and `guides` returned no matches. `tests/guides.test.ts:59` retains the acknowledged case title. The installed scaffold implementation returns `undefined` for an absent file; Veneer’s helper propagates the read error, asserted at `tests/setupConformance.test.ts:187`. The fleet-name deviation is justified. |
| **3 — Shell entry** | **CONFIRMED** | `app/browser/main.ts:3` imports the concrete class; line 8 deliberately discards its construction. `app/browser/index.html:6` titles the document `Veneer`. `Showcase.ts:23` initializes its fields and calls `#mount()`, whose body retains the tree construction, listener registration, and appends. |
| **4 — Shell stylesheet** | **REFUTED** | The described output exists, but the writer’s chosen mechanism violates `scaffold/.claude/rules/styles.md:25`: the compilation barrel “loads `tokens`, `theme`, and output partials with `@use`.” [The entry](C:/Users/mikes/WebstormProjects/veneer/app/browser/styles/index.scss:9) instead loads the output partial through `meta.load-css`. The Sass error is real, but it does not authorize this departure. An in-memory `@use` sequence loading an order-only partial before the shell compiled successfully with the order statement preceding the layer block. The system-color override is accurately recorded as a carried bound. |
| **5 — Conformance and distribution** | **UNDECIDABLE** | The relocation is confirmed: `tests/distribution.test.ts:985` obtains `stage.installed`, and the conformance file retains its identity and boundary cases without stale imports. The remaining stylesheet dependency is visible at `tests/setupConformance.ts:14` → `tests/setupStyles.ts:4`. The clean-tree failure and styles-only success appear in the writer’s report at `scaffold/.orkestrel/veneer/units/u1-conform-report.md:416`; I did not independently execute those states. Literal acceptance criterion 3 remains carried, not closed. |
| **6 — Listener control** | **UNDECIDABLE** | The source and selection claims are confirmed: `tests/setupListeners.ts:7` owns the controller; `tests/src/browser/index.test.ts:21` dynamically imports it inside the recording action and aborts it afterward. `vite.config.ts:302` collects test files, and scaffold’s guide at `guides/scaffold.md:611` documents the exact-path selection. The supplied diff leaves `tests/setupBrowser.test.ts` untouched. The audit exit is supported only by the writer’s recorded output, not an independent verifier result available here. |
| **7 — Guide** | **UNDECIDABLE** | The requested rows, construction examples, proof links, and framework-free sentence are present at `guides/veneer.md:16`, `:43`, `:377`, and `:393`. The changed guide prose introduces no identified writing-rule violation. `guides/README.md` is absent from the diff and names no removed export. The claimed green guide gate remains writer-reported evidence. |
| **8 — Law over the diff** | **CONFIRMED** | The added and changed code introduces none of the listed prohibited constructs. The changed interfaces retain readonly properties, and the browser barrels contain only star exports. The supplied patch limits `tests/guides.test.ts` to its import and calls, and `tests/setupBrowser.ts` to its destructure and construction. This ruling covers the diff, not inherited declarations elsewhere in those files. |
| **9 — Scope honesty** | **CONFIRMED** | `scaffold/tmp/audit/u1-conform-status.txt` contains the owned changes, granted changes, added files, and manifest files described by the claim. The rendered manifest diff removes the Tailwind declarations and their lockfile dependency closure. |
| **10 — Gates** | **UNDECIDABLE** | No retained U1-conform verifier result was present in the supplied record population. `units/u1-conform-gate-brief.md` specifies the post-manifest commands; it records no results. The writer’s report explicitly precedes the manifest application. The Orchestrator must rule from the verifier’s actual output. |

The implementation comparison found no changed helper behavior hidden by the renames. After identifier normalization, every renamed helper body and the `ColorMode` implementation matched `d8b0e65`. The requested storage-key change remains the controller’s intentional behavioral change.

**11 — CONFIRMED additional finding: the distribution scanner silently accepts a forbidden literal CommonJS import.**

[The extractor](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:134) accepts only a `Literal` argument for `require`, although it handles a substitution-free template literal for dynamic `import`. [The distribution case](C:/Users/mikes/WebstormProjects/veneer/tests/distribution.test.ts:993) treats an empty extraction as success.

Executing the live helper body with the installed Vite parser produced these results:

| Input | Extracted specifiers | Distribution predicate |
|---|---|---|
| `require("bootstrap")` | `["bootstrap"]` | rejects |
| ``require(`bootstrap`)`` | `[]` | accepts |
| ``import(`bootstrap`)`` | `["bootstrap"]` | rejects |

This proves a scanner gap, not that the present tarball contains that import. It violates `scaffold/.claude/rules/quality.md:72`, which treats a mismatch between an instrument’s claimed coverage and actual matching as a defect. Handle the literal-template `require` form and add a regression assertion that rejects it.

Verdict: fix round with claims 4 and 11.