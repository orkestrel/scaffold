# Audit verdict: the line-view redesign, browser `d921838` and ollama `b45eae7` (2026-10-07)

**Lanes:** the workflow `redesign-falsify` (run `wf_ec521808-cf5`) ran two lanes, both Opus 5.5, because GPT-6 Astra wrote both halves. Both read one claims file, scaffold `tmp/units/redesign-claims.md` (16 claims), in a clean context and blind to each other. Their verdicts are `falsify/falsify-objective.md` and `falsify/falsify-subjective.md`.

- Objective: `FAIL 1, 4, 9, 11; outside F1, F2`.
- Subjective: `FAIL 1, 4, 7, 9, 10, 15; outside F1, F2`.

The Orchestrator reproduced each BROKEN item at its source before ruling:
- `listed.clear()` runs for every action call before the success check (ollama `tests/setupStore.ts:1166-1173`);
- the raw query and the bounding cut (browser `src/core/helpers.ts:787`);
- the hint (`src/core/BrowserToolset.ts:866`) against the measured `call type with e4`;
- the header sniff (`helpers.ts:848`);
- the legacy branch (`setupStore.ts:1132`).

The measured refusal `Element link "Cedar Tea Tray" [ref=e7] takes no text; call click for a link.` matches the package (`BrowserToolset.ts:934`).

## Browser rulings: fix round `redesign-fix`

| Item | Ruling |
| --- | --- |
| Claim 1, refusal subjects | **Fix.** Where a refusal knows the element's role or name, its subject renders through `renderBrowserElement`, as `Element ROLE "NAME" [ref=eN] …`, the form the measured `type` refusal has. `Element [ref=eN]` stays only where only the reference is known: gone, or not in view. **Claim 1 is amended:** format examples in copy (`such as e4`, `such as e12`) show a token, not an element, and stay as measured |
| Claim 4, the best-match bound | **Fix:**<br>• the note quotes the 120-unit abbreviated query, as the miss text does;<br>• a numbered row is never cut: when the sentence and the whole row M do not fit, the reply reads `No line from F on matches "Q"; the best match is line M.`, without the row;<br>• the miss sentence is reserved in the minimum window, so a miss always reports;<br>• a fixture with two equal best scores pins M as the first |
| Claim 7, the click hint | **Fix:** restore the measured `call type with ${element.reference}`. Update its test, and remove the audit script's rewrite of it |
| Claim 9, the guide | **Fix:**<br>• the receipts table rows (`guides/browser.md:2842`, `:2851`, `:2853`, `:2858`) render `ROLE "NAME" [ref=REF]`;<br>• `:2816`'s universal names the refusal subject forms from claim 1;<br>• `:2820` states the claim-4 rule.<br>Add executed assertions in `tests/guides.test.ts` for the row, `type`, and focus receipts. Adopt the approved framing `The browser's first read of the page:` in the quick start (`:84`, `:3382`) and in `src/core/factories.ts:173` |
| Claim 10 | Closed by the fixes for claims 4, 7, and 9, and for subjective F1 |
| Objective F1, `to` ignored | **Fix:** when `to` ends before the page's last line, both miss sentences read `No line from F to T matches "Q"…`. Without `to`, or with `to` at or past the last line, the bytes stay `from F on`, as measured |
| Objective F2, the wrap | **Fix:** a soft wrap never breaks at the whitespace immediately before a reference span; it breaks earlier, inside the name, so a reference stays on its element's line |
| Subjective F1, the header sniff | **Fix:** an explicit boolean parameter, set by the passage and receipt renderers, switches the partial-view line. Header text no longer decides it |
| Subjective A3 | **Fix:** the committed service test stops writing evidence files into `tmp/codex/`; that capture belongs in a probe |
| Subjective A1, A4 | **Recorded, no change.** The `e4` examples and "from the latest result" were measured as they stand |

## Harness rulings: fix round `redesign-harness-fix`

| Item | Ruling |
| --- | --- |
| Claim 11, resets | **Fix:** only a successful action resets the set: `click`, `type`, `press`, `navigate`, `switch`, `dialog`, `wait`, or `replay`. A refused or failed call changes nothing beyond the not-in-view rule. The successful action's returned window starts the new set. Add three cases:<br>• a refused `type`, then a listed reference, is accepted;<br>• a timed-out `wait` on an unchanged page keeps the set;<br>• a successful `wait`'s window starts the set |
| Claim 15, the bytes probe | **Fix:** compare `buildStorePrompt(task.prompt, actual)` with the record's measured user turn, and replace the control that cannot fail with a real one: the `b3083aa` framing asserted unequal |
| Subjective F2, the legacy parser | **Fix:** drop the legacy row branch from `extractReferences`, and migrate the default fixture seed to `1: link "Catalogue" [ref=e1]` |
| Objective A1, page text spoofing `[ref=eN]` | **Recorded, no change.** It needs hostile page text; the toolset still refuses an unknown reference |

## Settled

These claims are settled with no defect:
- claims 2, 3, 5, 6, 12, 13, 14, and 16;
- claim 8, by the fix round's rerun of the store byte equality and the audit script.
