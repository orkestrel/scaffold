# D-REDESIGN — one design brief for supervisor's auth ergonomics and live workflow feed

Both adversarial lanes receive exactly this brief, blind to each other. Each returns a **ruled
design**, not a menu of options. The Orchestrator reconciles.

## The ask, in the owner's words

"The authentication is good but complicated, it should be a bit more automated, and especially the
workflow — it makes no sense that we have to put in the workflow id in the UI, that should be
automatic and live if we're logged in; it's cumbersome for humans that would expect to see them as
they come up."

## Subject

`/workspace/supervisor` — Vue 3 + Bootstrap 5.3.8 (Halfmoon skin) + bootstrap-icons, private app
(`app/core`, `app/browser`, `app/server`), one-run operator model. The governing skill is
`enterprise-bootstrap` (`/home/user/scaffold/.agents/skills/enterprise-bootstrap/SKILL.md` and its
references) — its styling ladder, five-states law, contrast bars, feedback channels, and
signature-in-the-chrome discipline bind every UI proposal you make.

## Evidence slices — read all three before designing

1. **Code map**: `/home/user/scaffold/tmp/redesign/absorb-report.md` — the auth wire, the typed-id
   flow, `/roster`, the SSE architecture, the shell.
2. **Pixels**: `/home/user/scaffold/tmp/redesign/capture-report.md` (interaction transcript +
   accessibility snapshots + surprises) and `/home/user/scaffold/tmp/redesign/captures/*.png` —
   40 captures of the real app, 7 states × 2 viewports × 2 themes, real server, real credential
   wire, one really-running seeded workflow. A lane that can read images reads at minimum:
   `01-login-first-load-desktop-light`, `03-login-refused-desktop-light`,
   `04-authenticated-first-paint-mobile-light`, `05-workflow-open-result-real-desktop-light`,
   `06-live-surfaces-mobile-dark`. A lane that cannot read images works from the transcript and
   accessibility snapshots, which carry the same facts as text.
3. **Principles**: `/home/user/scaffold/tmp/redesign/research-report.md` — cited constraints (WCAG
   2.2 SC 3.3.8, WHATWG autocomplete, APG feed-vs-list ruling, NN/g on live insertion). Sourced
   constraints are binding; items it labels "open design decision" are yours to rule on.

## Fixed by the owner — do not relitigate

- The credential model stays: username+password → httpOnly SameSite=Strict session cookie; the API
  bearer token never enters the browser; uniform refusal stays.
- A **new server capability for roster liveness is approved**, built under the repo's laws: types
  first in `app/core/types.ts`, single-word members, no polling anywhere, every consumer updated in
  the same change, no compatibility shims.
- `AGENTS.md`, the rule files, and the skill bind everything.

## Hard constraints from the evidence

- `GET /roster` already returns live authorized `runs`; `Client.roster()` exists;
  `CommandBar.vue:178-181` already fetches it and ignores `runs`.
- SSE today is strictly per-workflow-id: `LiveFrame` is a closed union
  (`observe | transcript | terminal | gap`), `LiveViewer` drops frames for other ids, `/roster` is
  a one-shot GET. "A new workflow appeared" has no transport — that is the capability to design.
- The operator holds exactly one open workflow; stack/feed/selection/SSE all hang off it. A live
  list is a picker into that model, not a second stack.
- Two different "workflow lists" exist: `session.workflows` = grants (often `*`);
  `roster.runs` = this process's live authorized runs; typed `open` can additionally inspect
  **retained ended** runs that `roster.runs` omits.
- Session already auto-restores on reload; the opened workflow does not (`identify` never calls
  `open`; localStorage keeps per-id view state but has no index).
- Captured frictions: refusal marks **both** fields invalid with a message naming neither; the
  authenticated first paint is a blank id box captioned "Authorized for every workflow"; an absent
  id refusal offers no recovery affordance; mobile navbar actions are icon-only.

## Rule on all of these

1. **The live workflow surface.** What replaces the typed-id gate: where it sits in the shell, what
   a row shows, how a row opens into the one-run operator, all five states (ideal, empty, loading,
   partial, error) at both viewports and both themes, insertion behaviour for new arrivals and
   what an ending run does (remove vs decay — research says sources are thin; rule and justify),
   selection continuity when the open run ends, aria-live semantics per the research, reduced
   motion. The absorption locates the natural seat at the `#workflow` gate — confirm or argue.
2. **The roster-liveness capability.** The exact contract: route, event shape, type names for
   `app/core/types.ts` under the naming laws (single-word members, named discriminants, no `kind`),
   how it reaches the browser (new SSE route beside `/workflows/:id/live`? a sibling viewer on
   `LiveBroker`? extending `LiveFrame` — and if so, every consumer that must move), auth/CSRF
   posture, what happens on session expiry mid-stream, backpressure/coalescing. The objective lane
   owns precision here; the subjective lane owns what the UI needs the events to carry.
3. **Login ergonomics.** Apply the sourced constraints (autocomplete tokens, paste, one form,
   focus-on-refusal, role=alert). Rule on: the both-fields-invalid refusal presentation; whether
   the app remembers the username (research default: autofill-only — rule and justify); whether a
   reload lands the returning operator back **inside** their last-open workflow automatically
   (localStorage knows the id; `identify` could chain `open`) or lands them on the live list; the
   help-text copy ("Both are sent once and exchanged for a session…" — keep, cut, or move); what
   "more automated" means beyond these without touching the credential model.
4. **The ended-run door.** Typed-id entry is today the only way into retained ended runs. Keep a
   manual entry as a secondary affordance, list retained ended runs somewhere, or drop the
   capability — rule, with the cost stated.
5. **The signature.** One memorable element, in the chrome, subject-rooted (this is a supervisor of
   agent workflows — the live pulse of the fleet is the obvious candidate; argue it or beat it).
   Bootstrap rungs 1–2 only; anything at rung 4 is proposed to the owner, never taken.
6. **Unit decomposition.** Break your design into implementation units: owned files, serial order,
   acceptance criteria each independently checkable, which units are objective (Sol) vs subjective
   (Opus) vs mechanical (builder), and where the capture-evidence review rounds
   (`orkestrel-polish-surface`) sit. Name what each unit must prove in pixels.

## Output

A ruled design covering all six numbered areas; the strongest argument against your own ruling on
areas 1–4; what you would refuse to build; the single question whose answer would most change your
design. No process diary, no code. Prose and, where layout matters, ASCII sketches.
