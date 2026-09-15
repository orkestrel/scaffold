# Audit A8b — close the U8c fix round (`@orkestrel/tool` emitter)

## Role and lane

One brief, two blind lanes; state which you hold in your first line.

- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE lane and the cross-engine lane
  (GPT-6 Astra wrote U8b and U8c). Attack the fix round's own rulings first: the identity check
  before `add` (is it the one state check that makes the published fact true, or the start of a
  guarded-notify layer?), the final sweep after `emitter.destroy()`, the re-entry prose, and the
  `destroy` summary.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every A8 carrier closed at the
  `file:line` the report names; the captured red and green logs contain every named title with
  the stated counts; scope; the export-name probe.

Each lane performs the audit directly and spawns nothing; blind; no hedging. `CONFIRMED` names
the failed attack; undecidable is `UNRESOLVED`.

## Subject

The `tool` checkout at checkpoint `8f2ad5d` plus U8a (manifest) and the working tree after U8b →
U8c (GPT-6 Astra `sol`; brief `U8c-tool-emitter-fix-brief.md`; report
`.orkestrel/campaign/U8c-tool-emitter-fix-report.md`). The previous round's verdicts:
`A8-audit-reviewer.md` (`FAIL 1, 2, 6, 9, 10; F1`), `A8-audit-analyst.md` (`FAIL 2, 3, 6, 9, 10`),
`A8-audit-checker.md` (`FAIL 9, 10`); the Orchestrator's probe `P8-reentry-probe.md` reproduced
analyst 2 and 3a before the fix. Assume the fix round left one defect.

**Review evidence:** `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/A8b-diff.patch` (`git diff`
against `8f2ad5d` and `git status --porcelain`). The captured runner output:
`.orkestrel/campaign/U8c-red.log.txt`, `U8c-green.log.txt`, `U8c-gates.log.txt`,
`U8c-constructor.log.txt`, `U8c-inference.log.txt`, `U8c-final-state.log.txt`. The Orchestrator's
own gates with `build`: `.orkestrel/campaign/U8c-tool-gates-orchestrator.log.txt`; the
export-name probe with an explicit clean line: `P5c3-collide-after-u8c.log.txt`.

**Law.** `patterns.md` § Stateful emitters; `scaffold/guides/emitter.md`; `names.md`;
`typescript.md`; `tests.md` § Condition; `documentation.md`; `writing.md`; `quality.md`
§ Falsification; `orkestrel-falsify` § Verdict shape.

## What this round decides

Whether the tool emitter is accepted, repacked, and installed into agent, mcp, and ollama, and
whether mcp's `list_changed` push and the bridge's live publish (U4e) build on it.

## Numbered falsifiable claims

1. **Every A8 carrier is closed where the report says.** Constructor `new Emitter<ToolManagerEventMap>(options)`;
   replacement `add` published only when the map holds that exact instance after the `remove`
   emission; the map emptied once more after `emitter.destroy()`; the mid-emit fact stated in
   `destroy`'s remarks and the guide; the `destroy` summary reads `Removes every tool and releases
   the emitter's listeners.` on both sides; F1 stated on `remove` and in the guide and pinned in
   both remove tests. Falsify with `file:line`.
2. **The re-entry vectors are green and were red.** `replacement reentry preserves publication
   consistency`, `destroy finishes with an empty registry`, and `a listener destroying the
   registry mid-emit does not stop its siblings` appear in the red log failing and in the green
   log passing with the counts the report states; the red condition for each is the one the
   report names. Falsify with a title absent from a log or a count that disagrees.
3. **The strengthened tests reject their mutations.** The add-ordering tests read the registry
   inside the `add` listener; the batch-remove test reads `undefined` inside the `remove` listener;
   the populated-clear assertion checks payload identity; the hooks test asserts one shared
   sequence. Name the mutation that would still leave each green, if any.
4. **The identity check is the right size.** It is one comparison in the replacement path and no
   other `emit` acquired a guard; the re-entry bound is stated as a fact about publication, not
   as a promise of consistency under every listener. Falsify with a second guard or a sentence
   that over-promises.
5. **Nothing else moved.** Only owned files beyond the U8a manifest and lockfile; `Tool.ts`,
   `errors.ts`, `helpers.ts`, `validators.ts` untouched; the guide fence transcription unchanged;
   `tmp/probe/` empty; no version bump. Falsify with `file:line`.
6. **Would you ship it as tool 0.0.15?** Name what still blocks, or `CONFIRMED`.

## Output

The `orkestrel-falsify` verdict shape and nothing else, ending in one terminal line.
