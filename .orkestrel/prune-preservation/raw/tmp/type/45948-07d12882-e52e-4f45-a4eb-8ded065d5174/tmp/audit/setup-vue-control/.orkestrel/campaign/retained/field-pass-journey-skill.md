# Field pass — the journey skill after its refinement

Method: `.agents/skills/orkestrel-debrief/references/field-testing.md`. Date 2026-09-16, against
`orkestrel-prove-journey` at scaffold commit `94200507`, driven over the `roughnotes` checkout at
`99fcb65`.

Goal-only prompt, identical across tiers, no shape given and no tool named beyond the skill's own
path:

```text
Prove the Rough Notes application is ready to ship to real users.

The application is at C:\Users\mikes\WebstormProjects\roughnotes. Follow the workflow at
<skill path> and the references it requires.

Produce the plan you would run. Do not run it, do not edit any file, and do not start a server.
```

## The scoreboard

| Tier | Model | Walked the surface unaided | Out-of-band reading | Statechart ruling | Named a verb the package does not publish |
| ---- | ----- | -------------------------- | ------------------- | ----------------- | ----------------------------------------- |
| Frontier | Opus 5 | yes | read the application and the record, ruled the record stale | re-taken as a claim against the tip | no |
| Mid | Sonnet | yes | read the application and the record, ruled the record evidence rather than acceptance | re-taken as a claim against the tip | no |
| Acceptance | Haiku | partly | read the record and reproduced its findings as the plan | transcribed from the record | no |

**Neither `pressKeys` nor any other unpublished verb appears in any tier's plan.** The restoration
holds under field conditions.

## The pass is contaminated, and the fault is the dispatch's

`field-testing.md` § The pass discipline requires fresh state per round and bars letting a model
inherit a sibling's residue. The `roughnotes` checkout carries this campaign's own
`journey-readiness-verdict.md`, so a model can copy the answer instead of deriving it. The
acceptance tier did exactly that.

The tightened statechart trigger is therefore **not settled by this pass**. Every tier ruled the
family not owed, and every tier had the ruling available to read. A clean probe over a surface
carrying no prior verdict is what settles it.

## The teaching gap the pass did establish

The mid tier wrote, unprompted: "That prior campaign's own report is evidence, not acceptance —
`.agents/orchestration.md` § Acceptance laws bars trusting a writer's self-assessment." The frontier
tier ruled the verdict stale and re-derived against the tip. The acceptance tier resumed the prior
campaign's finding list as its plan.

Confusion signature: the acceptance tier substituted a retained verdict for its own derivation. The
surface does not state that a retained verdict is evidence to re-verify rather than a plan to
resume, and the tier that needed the statement is the tier the ladder calls acceptance.

## Product findings the pass surfaced, which this campaign never covered

Each carries its evidence site. These are the frontier tier's reconnaissance, quoted from its plan.

- **The readiness verdict is stale.** It records its run against `18234fb`; every fix it ordered
  landed after it, and further work landed through `99fcb65`. Nothing re-read the skill's Accept
  list against the tip.
- **Every route shares one browser title.** `app/browser/index.html:6` declares
  `<title>Rough Notes</title>`, and no `document.title` write exists anywhere under `app/`.
- **The shipped document carries no description, favicon, canonical, or social card.**
- **A thrown render error paints a blank page.** `app/browser/main.ts` is
  `createApp(App).mount('#app')` with no `errorHandler` and no `onErrorCaptured` under `app/`.
- **The miss screens are unreached.** `ProductView.vue:86`, `ArticleView.vue:77`, and
  `ItemView.vue:105` each render `category="miss"`; `tests/app/browser/setup.ts:936-940` maps
  `DETAIL_SLUGS` only to slugs the catalog holds, and the registry registers no miss state.
- **An unknown route lands on home with no notice**, through
  `createNavigator({ fallback: HOME_PATH })`.
- **The gate renders chromium and nothing else.** `vite.config.ts:212` declares
  `{ browser: 'chromium', headless: true }` as the only instance. Raised independently by the mid
  tier.
- **The transport family reads an entity flag.** `tests/app/browser/integration.test.ts:1053,1084,1091`
  read `app.dark.value` rather than what the interface shows.
- **The settle helper reaches Bootstrap's implementation classes.**
  `tests/app/browser/setup.ts:711` resolves `#site-menu` by id and reads `show`, `showing`, `hiding`.
- **The external destinations are never checked.** `app/browser/constants.ts:138-143` and
  `app/core/constants.ts:432-480` name live destinations no test reads.

## Product decisions the pass escalated rather than taking

The frontier tier stopped on these and asked before dispatching. They are the repository owner's,
and two of them are truth-in-product rather than engineering.

- **Forms that record nothing paint acceptance.** `ApplicationController` keeps a subscription, an
  inquiry, and an invoice on the device and sends nothing. `SubscribeView.vue` paints
  `Print and digital delivery is recorded for {name} at {email}` under the heading
  `Send the request`, with `Nothing was sent off this device.` in the continuation. A reader reads
  the confirmation, not the footnote.
- **No privacy statement.** The contact form collects a name, a company, an email, and a phone
  number. No privacy notice exists in the tree.
- **Fixture data under a real brand.** `app/core/constants.ts` carries a sample drawn from the
  public Rough Notes offerings, history, media kits, and shop catalog, which `guides/README.md`
  states is a sample rather than a scrape. Shipping it to real users under that company's name is
  the owner's decision.
