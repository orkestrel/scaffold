# A-REDESIGN — absorb supervisor's auth and workflow-opening flows

## Role and engine

`grok`, engine Cursor Grok (bridge). Read-only absorption. Return distilled evidence with
`file:line` pointers, never raw dumps. Perform this directly and spawn nothing.

## Objective

The owner wants two UX changes in `/workspace/supervisor`:

1. Authentication is "good but complicated" — it should be more automated.
2. Opening a workflow requires typing a workflow id into the UI. It should be automatic and live:
   once logged in, workflows appear as they come up.

Before any design, map what exists. Answer the questions below with evidence.

## Questions

### Auth, end to end

1. Walk the login flow as a human experiences it: every field, click, and state from first page
   load to an authenticated session. `app/browser/components/LoginPanel.vue`,
   `app/browser/services/Client.ts`, and the server side (`app/server/middlewares.ts`,
   `ApplicationSession`-related handlers, `ApplicationHandlers.ts`, `ApplicationRoutes.ts`).
2. What credentials exist (API token? password? both?), where each is validated, and what the
   cookie/session model is (the guide mentions httpOnly SameSite=Strict host-only cookie, login
   regeneration, uniform refusal).
3. What already persists across reloads — does a returning user with a live session skip the form?
   Where is that decided?
4. Which steps are candidates for automation — anything the UI asks that the system already knows.

### Workflow opening and liveness

5. Where exactly the workflow id is typed: `app/browser/components/OpenPanel.vue` and whatever
   consumes it (`controllers/Operator.ts`, `composables/useOperator.ts`). What the id is used for
   once entered.
6. Can the server enumerate workflows? Look for any list/index capability over workflows in
   `app/server` (handlers, routes, `WorkflowTranscript.ts`, stores) and in `src/` (the supervisor
   library itself — `DatabaseSupervisorStore`, `DatabaseBriefStore`, `Run`). What exists vs what
   would have to be added.
7. What live transports exist and what they carry today: `app/browser/services/LiveStream.ts`,
   `app/server/LiveBroker.ts`, `LiveViewer.ts`, `InferenceStream.ts`, SSE usage. Does anything
   already push "a new workflow appeared" or could carry it?
8. How the feed/stack UI consumes live data now: `composables/useFeed.ts`,
   `controllers/FeedManager.ts`, `FeedList.vue` — the pattern a live workflow list would follow.

### UI conventions

9. Bootstrap usage: version, how theme (`data-bs-theme`?) is handled (`useTheme.ts`,
   `ThemeToggle.vue`), any custom SCSS, the component conventions the new UI must match.
10. The app shell: `ApplicationView.vue`, `ContentPane.vue`, `CommandBar.vue` — where a live
    workflow list would sit.

## Scope

Read-only. `/workspace/supervisor` only. Do not read `.env*`, `auth.json`, or any credential file —
describe the auth *mechanism* from code, never print secret values.

## Output

Per question: the answer in 2-6 sentences with `file:line` pointers. Then a closing section: the
three facts most likely to constrain the redesign, and anything surprising. No raw file dumps, no
process diary.
