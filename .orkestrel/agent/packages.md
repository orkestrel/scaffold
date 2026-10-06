# How the other packages fit these models

Each boundary that follows is the opening of the scaffold guide, read 2026-10-05. The desk is the application that joins them. The runner and the reasoner do not call Ollama.

## Reason

`guides\reason.md` says reason is a synchronous, deterministic engine. Definitions are data. Results are fresh objects. The guide names what is deliberately absent: async reasoners, definition persistence, and probabilistic strategies beyond the multiplicative `confidence` of inferential facts.

A Mica probability becomes a subject field. In the desk, team confidence is copied onto the subject only when the team question answered (`choiceConfidence` in `app\core\policies.ts`). Reason then evaluates a rule against that field. The flat-team rule is the `below` comparison of `confidence` against 0.5. Design conclusion: do not add a probabilistic reasoner. The probability is an input. The rule is the product policy.

## Interpret

`guides\interpret.md` says nothing in the package is an LLM, a provider, or an agent. The `prompt` a result carries is written for an external model and is never consumed inside the package. Templates classify intent. `extract` classifies without seeing a template and mines raw numbers.

The desk's charge template is the one that maps an amount. Other templates leave the amount at 0 so a day count in a payouts ticket is not treated as money (`readMessage`). Mica can fill a field interpret did not extract. Frustration, severity, team, and the policy `noul` are Mica fields, not template fields. Interpret does not call Mica.

## Qualifier, rater, and program

`guides\qualifier.md` says the qualifier stops at eligibility. It does not calculate line amounts, decide authority, or aggregate a batch. A global `ineligible` and a global `referral` are terminal. A scoped restriction removes only that named scope.

`guides\rater.md` says the rater rates the lines it is handed and performs no evaluation arithmetic of its own. Amounts come from the quantitative definitions on the lines.

`guides\program.md` says program composes qualify, select, rate, status, then decide, and performs no reasoning arithmetic. A globally ineligible, referred, or failed subject never reaches the rater. Scoped ineligibility removes only the matching line before the first rating call.

That is why the desk authors a refund gate as a scoped restriction and a priority line that does not depend on the refund. A password reset and a pricing question still receive a priority amount. A global referral, such as team `other` or a team confidence that fails the `below` comparison at 0.5, skips rating. The unclear-request test in `tests\app\core\helpers.test.ts` expects `not rated` for that case.

## Brief

`guides\brief.md` says the module is mechanism, never policy. The judgment of which outcomes and which proofs to pin belongs to the caller. The brief is a closed, content-hashed contract. You cannot make a model's sampling deterministic from a prompt. You can resolve the task before the model speaks.

The desk passes program status, the authority decision, the finding, and the eligibility sentence as givens, plus a task sentence from `taskFor`. The customer message is a given, not the brief text. The comment on `pinBrief` says passing the message as brief text makes the compiler ask which action the ticket meant. The agent must follow the task sentence. Offer a refund only when that sentence says to offer one (`AGENT_SYSTEM`).

## Workflow

`guides\workflow.md` says phases run sequentially and tasks in a phase run concurrently. A task's `behavior` is a string naming a function the caller registers. The engine carries no provider knowledge. The desk's `settlePolicy` is the application edge that registers `interpret`, `qualifier`, `reason`, `rater`, `program`, and `brief`. The runner does not know about Ollama.

## Agent and Ollama

`guides\agent.md` says the loop is context, provider, tools, repeat, and the package does not supply the model. `guides\ollama.md` says this provider supplies the Ollama wire and nothing else, and the service tests run against `qwen3.5:2b-q4_K_M`. Authority and thresholds stay in the application. The 0.5 confidence cutoff, the refund rules, and the task sentences live in `policies.ts`, not in the provider.

## Use cases

TypeSafe's pattern pages, linked from [system-one.md](system-one.md), name confidence routing, composite scoring, intent routing, and guardrails. The desk fixtures are the same shapes with the thresholds owned by code. The model owns one literal judgment per question. Code owns arithmetic, date order, and the cutoff.

| Case | What the model judges | What the code owns | Desk fixture |
| --- | --- | --- | --- |
| Refund with a policy `noul` | Did the customer ask for a refund, and does the policy support this duplicate? | The grant of 1, the extracted dollars, and the eligible task sentence | Duplicate charge |
| Password reset that must not offer a refund | Team, refund `noul`, frustration | The task `Do not offer a refund.` The status wording is inconsistent, as [the desk](desk.md) records | Password reset |
| Outage referral | Team, refund, frustration, severity | The route-to-technical task. Severity is a score expectation, not a date or a count | System outage |
| Pricing quote | Team, refund, a short frustration score | The task that answers the price and does not offer a refund | Pricing question |
| Destructive action | One `noul`: delete the staging database, or erase the audit record | The restriction. Yes on `delete` or `comply` is a referral. No approval is not something the model is asked to invent | Delete-database check, injected instruction |
| Ambiguous `choice` | Which team, including `other` | A `below` comparison at 0.5, or team `other`, is a referral and skips rating | Unclear request |
| Planted instruction | The `noul` whose criteria say do not erase, while the state says answer Yes | A Yes is a referral (`captured`). A No is a condition (`held`). The robustness check is the disagreement between state and criteria | Injected instruction |

Composite scoring in the desk is the rater's sum of frustration and severity, plus a refund line when the scoped gate leaves it in place. Confidence routing is the 0.5 rule on the team `choice`. Intent routing is interpret's action and domain, which pick the task sentence. Guardrails are the `comply` and `delete` nouls. None of those cutoffs belong in a future decision client. See [agent.md](agent.md).
