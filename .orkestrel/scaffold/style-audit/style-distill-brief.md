# Distillation brief: the Google developer documentation style guide (campaign 3)

Three engines run this same brief independently — Cursor Grok, Claude Opus 5, and GPT-5.6 Sol —
each blind to the others. Read everything; return a distillate, not a summary of having read.

## Objective

Distill what the Google developer documentation style guide should change about how THIS project's
agents write **to the developer** — chat replies, reports, guides, TSDoc, commit messages. The
campaign's end product is a set of agent-facing directives (LLM-optimized instruction lines under
this repository's instruction-files law), authored later by the Orchestrator and Opus as final
voice. Your distillate is the evidence they rule from.

Two audiences, never confuse them: the WRITING the rules govern is read by the developer (a
human); the RULES themselves are read by agents (directives: trigger + action, no persuasion).

## Subject

The complete captured corpus:
`/tmp/claude-0/-home-user-scaffold/75034726-f81c-5f56-9643-b4a6748f097d/scratchpad/gstyle/text/`
— 71 pages of https://developers.google.com/style as plain text, one file per page (`pages.txt`
beside it lists the source paths). Go through every page, the word list included. Where a page's
subject is web-publishing mechanics with no analog in this project's output (HTML/CSS markup
rules, image alt-text mechanics, page metadata), record it as out of scope in one line rather
than distilling it.

## The baseline to map against

`AGENTS.md` § Communication → Writing (and § Instruction files) is this project's existing prose
law: plain words, lead with the finding, one idea per sentence, active voice, imperative
instructions, no aphorisms or flourish, tradeoff as option-cost-recommendation, testable
requirements. `.claude/rules/documentation.md` governs guides and parity. Read both first. Your
distillate maps Google's guidance against that baseline:

- **New**: guidance our law does not state that would materially improve writing to the developer.
- **Already ours**: guidance our law already states (name both homes; do not re-propose it).
- **Conflicts**: guidance that contradicts our law or our conventions — state the conflict
  precisely and take a position with reasons.
- **Reject**: guidance that fits Google's publishing context but not agent-to-developer output.

## Output — the distillate, nothing else

1. Numbered candidate directives (the "New" set), each: the proposed rule in one directive
   sentence, the corpus page(s) it distills (by filename), and one line on what it changes in a
   report or reply the developer reads. Rank them by expected effect on report quality.
2. The "Already ours" list, one line each with both homes.
3. The "Conflicts" list with your position per conflict.
4. The "Reject" list, one line each.
5. Word-list verdict: Google's word list is large — name the handful of entries that matter for
   this project's output vocabulary (if any) and say whether adopting any word-level rules is
   worth an instruction line at all.

Keep the distillate under roughly 150 lines. Densest useful form; no process diary.

## Scope

Read-only. No edits, no tree writes. The corpus and this repository's instruction files are the
whole subject; do not research beyond them except to resolve a corpus page that failed to capture
(name it if so).
