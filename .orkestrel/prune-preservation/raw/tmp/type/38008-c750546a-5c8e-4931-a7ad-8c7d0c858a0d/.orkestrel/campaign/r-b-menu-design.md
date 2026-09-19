# Reconcile compact-menu settling with the shipped modal boundary

## Subject and decision

Design a narrowly bounded correction to R-B's prescribed compact-menu settle. Read canonical AGENTS.md, .agents/orchestration.md, rules tests/browser/application/typescript/architecture/writing/quality, orkestrel-prove-journey and every required reference, Roughnotes guides/README.md and app/browser/types.ts. Perform directly; spawn nothing; edit no source.

Worktree: `C:/Users/mikes/WebstormProjects/scaffold/tmp/recovery/roughnotes`. Its R-B writer is active: read only the stable openSite/closeSite implementation, App.vue, installed test0.0.18 primitives, guide behavior and named failure log. Do not run tests against its changing tree. You may request a precise independent probe for the Orchestrator if evidence cannot settle a factual question.

The fixed capability is interface-driven opening and closing of the compact menu with truthful settling. No new product behavior, package, private CSS-class observation, DOM identifier shortcut, or bypass of modal reachability is authorized. The original brief prescribes replacing local readMenuSettled with waitForState on the trigger's authored aria-expanded. Resolve this measured incompatibility within the existing primitives if sound; otherwise identify the exact upstream contract change and why it is necessary.

## Evidence

App.vue binds aria-expanded on the masthead Menu trigger and flips it on shown/hidden events. When the menu opens, the trigger is outside the modal dialog. Published test0.0.18 intentionally rejects controls outside a shown aria-modal subtree. In the diagnostic setup host with Vue plugin enabled, `openSite` clicks Menu through the published verb then calls `waitForState('button', COPY.menu, 'expanded')`. The resolver refuses the trigger: `Interactive target "Menu" is not visible and focus-reachable`. The run collected6 cases, with1 failed and5 passed. The writer's log is under `tmp/units/` and the diagnostic config under `tmp/probe/r-b-setup/`.

Read installed declarations and actual implementations for waitForState, resolveAccessible, readStates, readPerception, readPage, waitForAnimations and the core wait helpers before relying on their behavior. Read skill layer/decide references for the difference between acting through the interface and observing its result. Do not infer that retaining an element or reading an unreachable element is permitted without the governing rule.

## Constraints

Keep T4's modal refusal intact. A journey acts through currently visible/reachable controls. No classList-based settle, private app state, direct router/theme act, fixed sleep, or route shortcut. Preserve correct opening/closing transition handling and accessible names. Do not add a public layer capability without a required first consumer and types-first design. Reuse installed semantics exactly where they match.

## Required answer

State your lane's recommended rule and the smallest concrete implementation shape, with source/declaration/skill evidence. Compare viable alternatives only where they change the decision. Name what the user can perceive when the settle resolves, what an assertion proves, and the mutation/control that would disprove it. Report uncertain facts and the exact runnable probe that would resolve them. Do not accept the work or report imaginary test results.

The author of the current R-B code is Sol. Opus is unavailable in this session after its CLI returned the weekly limit. Separate clean-context Sol agents therefore hold the subjective and objective design lanes, blind to each other. Each dispatch names its assigned perspective; do not collapse them or infer the other lane's answer.
