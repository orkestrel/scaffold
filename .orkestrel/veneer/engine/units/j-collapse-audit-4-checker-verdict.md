# J-COLLAPSE audit round 4 — the checker's verdict (returned 2026-09-24 by `checker` on Sonnet, native subagent, 34 tool uses, 182 s; retained verbatim from the subagent's return text; the Orchestrator's note follows)

# Verdict — J-COLLAPSE round 4 audit (checker)

**Role:** `checker` on Sonnet, native Claude subagent, `Read`/`Grep`/`Glob` only, mechanical conformance only.

## Checklist

1. **Round-4 delta scope** — met. `src/browser/validators.ts` and `tests/src/browser/parsers.test.ts` hunks in `j-collapse-4.diff` are byte-identical to `j-collapse-3.diff` (compared `j-collapse-4.diff:1247-1263` against `j-collapse-3.diff:1236-1252`, and `j-collapse-4.diff:1843-1859` against `j-collapse-3.diff:1694-1710`: no textual difference beyond line-number offsets). `src/browser/parsers.ts` round-4 delta (`j-collapse-4.diff:1208-1246` vs `j-collapse-3.diff:1198-1235`) differs only in the remark's last sentence; the code line `return Array.from(document.querySelectorAll(value)).find(instanceOf(HTMLElement))` is unchanged in both. `src/browser/Delegate.ts` round-4 delta (`j-collapse-4.diff:1141-1145` vs `j-collapse-3.diff` same region) differs only in the `#activate` comment text (2 old lines → 3 new lines); `#conflicts`, `#routeCollapse`, `#mark` bodies are unchanged code. `src/browser/Collapse.ts` first hunk (`j-collapse-4.diff:699-736` vs `j-collapse-3.diff:698-736`) differs only in the class remark's rewrap/last-sentence text; all later Collapse.ts hunks have matching span lengths (e.g. `148,65+150,112` vs `148,65+151,112`) with only a one-line header shift, indicating no code-line change beyond the wrap.

2. **New case titles** — met. Report lines 32-43 and gate-log evidence show all four new titles and the retitled title verbatim, matching the F1/F2 green-run lines (`j-collapse-report-4.md:39-43`); old title absence confirmed by gate-log grep `next-change-grep exit=1 (1 is the pass)` (`j-collapse-gates-4.log.txt:159,79` per report).

3. **Instrument diff from round-3** — met. `j-collapse-mutations-4.py` differs from `j-collapse-mutations-3.py` only by: header comment (line 1), `ROOT` (line 7), `LOG` (line 9), the four new constants `REMOVAL`/`CLEARING`/`POST_AWAIT`/`CONFLICT` (lines 40-43) and their four mutation rows (lines 143-148, 150-151); no other line differs. The four mutation texts are byte-identical to `j-collapse-probe-r2-r3-single-door.py:21-24,27-31`. The retitled-case row (`#prune runs after the refusals`, line 138) is unchanged text, consistent with the report's claim that the prefix match needed no edit.

4. **Instrument log** — met. `j-collapse-mutations-round-4.log.txt:38-41` carries the four new rows as `EXACT exit=1`; lines 61-65 show `GREEN?` rows at 0 failed for Collapse (35), Delegate (34), validators (10), parsers (3), index (3), matching the report's stated totals; line 67 reads `receipt: restored byte for byte`.

5. **§ Delegation and `#activate` comment** — met. Gate-log lines 155-165 confirm: `old-restoration-grep exit=1 (1 is the pass)`, `grep -n "in the first delegate to hear it" guides/veneer.md` no hit, and the `refused` grep hits at guide line 538 (§ Delegation) matching the required sentence. `j-collapse-4.diff:1114-1117` carries the refusal sentence and `j-collapse-4.diff:1117` the restoration sentence "the first live delegate whose root contains it to reach it"; `j-collapse-4.diff:1143-1145` carries the `#activate` comment naming the refusal.

6. **`parseElement` remark** — met. `j-collapse-4.diff:1232-1233` reads exactly "Where the selector as written is invalid, this reader returns undefined; `getElement` returns null for an empty string and throws for any other selector its escaping leaves invalid."

7. **Wrap and line-length check** — met. Gate-log line 80: `awk 'length < 20 && length > 0' over the takeover paragraph (lines 706-718) → no hit; its lines run 89 to 100 columns`. `j-collapse-4.diff:723-724` (Collapse.ts remark) reads "...call completes to. A call that finds the collapse destroyed..." on one continuous wrapped line — no line ends with the bare fragment "completes to. A" (contrast round-3's defect at `j-collapse-3.diff:723`, which does end that way, now fixed).

8. **Status and gates** — met. `j-collapse-4-status.txt` and `j-collapse-gates-4.log.txt:3-10` both list exactly the same eight files, all `M`, matching the round-2/3 file set the report names; no new or off-limits file. `j-collapse-gates-4.log.txt` shows every named gate exit=0: `check:src:browser`, `oxlint`, `oxfmt`, `test:src:browser` (204 passed on Chromium 153.0.8010.12), `test:guides`, `test:policy`, three builds, `test:conformance`, the brief-4 greps, the patches apply check (`apply-check exit=0`), and the tree-wide `check` (line 272).

9. **Forbidden syntax and banned terms** — met, with one referral. Grepping added lines (`^\+`) in `j-collapse-4.diff` for `any`, ` as `-assertions, non-null `!`, `@ts-`, `eslint-disable`, `public`/`protected`/`private` modifiers, and nested function declarations returned no hits other than prose uses of the English word "as" (for example line 79 "as Bootstrap's data API does") and one existing `(value ?? '').split(' ')` assignment, neither a violation. The report records "I made no `prove` call, because that server isn't available to this subagent" (`j-collapse-report-4.md:3`) — that self-report claim about tool availability is `UNRESOLVED` per the report-only-evidence rule, though the mechanical fact that the report states it is met.

## Referrals

- `j-collapse-4.diff:745` carries the comment "The identity of the **latest** call that started a change," a term `writing.md` § Substitutions bans unconditionally in its default sense. This line is unchanged from round 3 (confirmed identical in `j-collapse-3.diff` at the same content), so it sits outside round 4's delta per item 1, and whether "latest" here names a technical ordering state (a permitted sense) or a banned temporal claim is a judgment call this checker does not decide. Route to the subjective lane or the Orchestrator.
- The report's claim that no `prove` call was made because "that server isn't available to this subagent" rests only on the writer's own statement; record it `UNRESOLVED` per the rule that a report's self-report is not confirming evidence, without failing any item on that basis alone.
- The Orchestrator's replay `j-collapse-mutations-4-orchestrator.log.txt` has not yet run; its clause is `UNRESOLVED` per the brief's own instruction, and this is not ruled against any item.

VERDICT: PASS

---

The Orchestrator's note: the `#change` comment's "the latest call that started a change" names an ordering value (the most recent call), the sense `writing.md` § Substitutions permits for `latest` (the row bans it where it dates a version or a release), so the hit is ruled permitted and recorded here. The `prove` server's unavailability to a subagent is a standing condition every collapse brief states, not a self-report. The replay clause closes in the reconciled verdict.
