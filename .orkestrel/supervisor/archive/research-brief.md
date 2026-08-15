# R-UX — bounded primary-source research for supervisor's auth and live-list redesign

## Role and engine

`researcher`, engine Sonnet (native), read-only, WebFetch/WebSearch permitted. Ladder record: Grok
probed this session and has no web access ("Web fetch rejected"); Luna is structurally unfit because
bench sandboxes deny network; this unit is the recorded third rung. Perform this directly and spawn
nothing.

## Objective

Distilled, cited UX principles for exactly two surfaces, each principle stated as a concrete
constraint the implementation can be checked against. Not an essay — a checklist with sources.

## Context you must hold while reading

The subject is an authenticated operator tool: Vue 3 + Bootstrap 5.3.8 (Halfmoon skin),
`data-bs-theme` light/dark, bootstrap-icons. Auth is username+password → httpOnly SameSite=Strict
session cookie; session auto-restores on reload via `GET /session`; the API bearer token never
enters the browser and that is a deliberate security property — do not research ways to change the
credential model. A live workflow list will replace a typed-id field; updates will arrive over SSE
(no polling — banned by architecture law). The governing skill (enterprise-bootstrap) already fixes:
five states per data surface, WCAG 2.2 AA contrast bars, validate-on-blur forms, focus management,
`prefers-reduced-motion`, toast/alert/banner/modal channel rules. Do not re-derive what the skill
fixes; research only what it is silent on.

## Questions, bounded

### Login ergonomics (the "less complicated" half)

1. **WCAG 2.2 SC 3.3.8 Accessible Authentication (Minimum)** — from w3.org: what it requires, and
   what it implies for a username+password form (paste must work, autofill must work, no
   transcription puzzles). Cite the SC text.
2. **HTML `autocomplete` tokens for login** — from WHATWG/MDN: the exact tokens for username and
   current-password, and what makes password managers reliably offer to fill (form structure,
   input types, `autocomplete` values). Cite.
3. **Remembering the username** — established practice for prefilling the identifier on a shared
   vs personal device (a non-secret in localStorage vs browser autofill alone): what NN/g or
   equivalent primary sources actually recommend, including the risk notes. Cite.
4. **Focus and error placement on small login forms** — where focus goes on load, after a refusal,
   and what the refusal message says when the server refuses uniformly (which ours does, by
   design). Cite WAI/APG or NN/g.

### Live-updating lists (the workflow feed half)

5. **ARIA for a live-updating list** — from WAI-ARIA APG / MDN: when a list that gains and loses
   rows needs `aria-live` (polite vs off), what role structure fits (list vs feed pattern — read
   the APG **Feed** pattern and say whether it applies to a short operational list or is meant for
   infinite scroll), and how to announce "a new workflow appeared" without spamming a screen
   reader. Cite.
6. **Insertion UX for real-time lists** — primary sources (NN/g on real-time data / activity
   feeds): where new rows enter (top vs bottom vs in-place-sorted), how to avoid yanking content
   out from under a pointer mid-click, whether to highlight-then-fade new arrivals, and what
   `prefers-reduced-motion` implies for that highlight. Cite.
7. **Disappearance** — a run that ends: remove, or mark ended in place? What do sources say about
   rows vanishing under the user vs decaying visibly. Cite what exists; say plainly if primary
   sources are thin here.
8. **Selection continuity** — when the selected row's underlying item ends or the list reorders,
   what should happen to the selection and the detail pane it drives. Cite or reason from APG
   listbox/grid semantics, labelled as which.

## Method

Primary sources only: w3.org (WCAG, APG), whatwg.org/MDN, nngroup.com, getbootstrap.com. One
secondary source is acceptable per question only when no primary exists, labelled as secondary.
Separate verified fact ("the SC text says") from inference ("this implies for us"). If a fetch
fails, say which URL and answer from the next-best source, labelled.

## Output

Per question: 2-5 bullet constraints, each ending with its citation (URL). Then a closing table:
constraint → which redesign surface it binds (login form / live list / both). Write the same
content to `/home/user/scaffold/tmp/redesign/research-report.md`. No process diary.
