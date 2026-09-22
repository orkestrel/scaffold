# CL10 audit verdict — round 2, the fix round

Subject: CL10's fix round, written by `sol` on Astra over the authored CL10 tree from `5e011a3`.
Claims: `cl10-audit-2-claims.md`. Report: `units/cl10-report-2.md`.

**Verdict: accept.** Both judgment lanes accept, the checker's refusals were settled first-party, and
the independent gate chain is green on both engines.

## Lanes

| Lane | Role and engine | Outcome |
| --- | --- | --- |
| Objective | `reviewer` on native Opus 5 | accept; every claim confirmed, two non-forcing observations |
| Subjective | `analyst` on gpt-6-astra, journal `tmp/codex/cl10-audit-2-analyst.jsonl`, thread `01a0c779-4bf3-7bf0-b26f-15f12c42f305` | accept; every claim confirmed with a named mutation |
| Mechanical | `checker` on the native cheap tier | rulings on its subset; two UNPROVEN, both settled by the Orchestrator |
| Gates | `verifier` on the native cheap tier | green, `units/cl10-gate-2.log.txt` |

**The lanes swapped back from round 1.** Astra wrote this fix round, so the Opus reviewer held the
objective lane and Astra the subjective one — the reverse of round 1, where Opus wrote the work.
Every required lane ran.

**The verifier ran after the read-only lanes, not beside them.** Round 1 ran it concurrently, which
the writing-concurrency rule forbids while the campaign is uncommitted, because its build rewrites the
cascade those lanes read. This round scheduled it last at no cost to wall-clock.

## The lanes did not contradict each other

Unlike round 1, both lanes reached the same ruling on every claim. Each named a failing mutation
before confirming a claim about a proof, and the subjective lane executed most of its mutations in
memory against the live collector rather than reading the assertions.

The objective lane settled claim 4 **without** the unit's instrument: it searched both built cascades
and the pinned record for any selector matching a prefix followed by a non-ASCII or escaped
character, found none, and concluded the fix moves nothing on either side of the comparison. It also
verified the instrument's own extraction is sound — the admission expression is the first such match
in its file, so the instrument reads the expression it claims to read.

## The checker's refusals, and how they were settled

The checker returned two UNPROVEN and was right to on the evidence it held.

- **Claim 10's digest half.** Its only evidence was the writer's own report, which a read-only lane
  cannot confirm. Settled three ways since: the subjective lane compiled the retained and live
  partials in memory and got identical CSS, the objective lane read the four emitted percentages out
  of the built cascade and matched them to the record, and the independent verifier's own build
  produced `0d8e87332f2184836faff4fe8f09aed307e7fafc0376f6dfbf5556a03ecadec2` for the styles cascade
  and its right-to-left twin alike.
- **Claim 12, which exposed a gap in the Orchestrator's evidence rather than the unit's.** The
  rendered diff runs over the CL9 landing, so it carries round 1's row creation and round 2's
  Notes-cell edit together and cannot isolate what the fix round changed. Settled by diffing the
  current row against round 1's retained patch: the Notes cell moved, and the key, category, proof,
  and status cells did not. The `ratio` selector, `ratio` variable, and `vr` selector rows are
  byte-identical to round 1, and the row count is unchanged. **A fix round needs both renderings — the
  cumulative diff for what the unit ships, and a round-isolating one for what the round changed.**

## What the round closed

Both forcing findings, and the seven carried with them.

- **The selector boundary** is one shared continuation rule applying to every prefix the expression
  names, refusing an ASCII word character, a backslash escape, and every code point from U+0080
  through the astral range, while still admitting the family separator, the end of the selector, and a
  genuine ASCII non-identifier character. `caption-top` keeps its exact-name restriction through a
  negative lookahead, which both lanes ruled equivalent to its former separate branch. The control
  covers each refusal class and each admitted punctuation form, and fails when the ASCII-only boundary
  is restored.
- **The nested reader** is exported as `readParentOffset` with its contract block, the icon-shift case
  calls it, and no function assignment remains in that case body. Its own proof mounts an SVG child —
  the case the reader exists for — and distinguishes three mutations: the subtraction reversed, a
  computed offset substituted for the two client rectangles, and the parent's own translation dropped.
- **The narrow grant held.** `tests/setupBrowser.ts` gained exactly that function; its proof gained
  the import, two cases, and the export-list entry. Nothing else in either file moved, so CL11's
  findings in that module are undisturbed.
- **The freeze narrowing lost nothing.** Container assertions still cover every named table; entry
  assertions now cover only the object-bearing ones. The removed assertions ran over string-literal
  tables, where a frozen check on a primitive is unconditionally true and no mutation could fail it.
- **The carried edits** each landed as scoped: the destructured ratio loop with its list-module
  dependency gone and the cascade byte-identical, the sorted icon-class comparison that still rejects
  an added or removed selector, the Notes-cell-only guide change, the synchronous ratio case, the
  repositioned export entry, and the normalizer regression case now supplying its own typed row while
  still driving the real presence scanner with its negative control intact.
- **The even-child equivalence was left alone**, as the terrain record ruled.

## Non-forcing observations, carried

1. **The surplus-detection population narrowed, correctly.** A selector such as `.ratioé` is now
   refused from the built side and the recorded side alike, so the multiset comparison would not
   report it, where the old expression would have. This is not a lost check: `.ratioé` is a different
   class from `.ratio` under CSS, and the comparison's membership rule is the named class families,
   never an out-of-family surplus. Recorded so a later round does not rediscover it as a regression.
2. **The normalizer regression case's local inventory literal supplies selectors as plain strings**
   where the real oracle supplies objects. It predates this round, which replaced only the rows above
   it. Carried by whichever unit next owns that case — not named here as a condition, and not assigned
   to CL11, CL12, or CL13, none of which owns it.

## A gap in the Orchestrator's own brief

The fix round's brief did not name a standing condition this host carries: the `prove` MCP call is
refused under this sandbox's approval policy. The unit attempted the call, recorded the exact refusal,
issued no receipt, and did not present its Vitest readings as one — which is the honest handling. The
objective lane added that the call was arguably never owed, because the rule requiring it fires on a
question about a TypeScript edit and this round's forcing question was a runtime regular expression.

A condition the brief leaves unnamed comes back as a deviation report about something already known.
Name this one in every bench brief.

## Gate evidence

`units/cl10-gate-2.log.txt`, taken by an independent verifier after both judgment lanes exited. Every
gate exit 0 on managed Chromium, and the three required projects exit 0 on Edge. The digest reading is
recorded there.
