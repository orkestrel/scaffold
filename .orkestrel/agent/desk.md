# The desk application

Repository: `C:\Users\mikes\WebstormProjects\desk`. The app is a support desk that asks Mica for typed decisions, runs a deterministic policy on those decisions, then asks a small generative model to draft the reply the policy already chose.

## How it starts

`package.json` script `start` runs `build:app:vue`, then `build:app:server`, then `serve`. `serve` is `node dist/app/server/main.cjs`. `app\server\main.ts` calls `startApplicationServer`. That function logs `desk http://{host}:{port}/`. `DEFAULT_HOST` is `127.0.0.1` and `DEFAULT_PORT` is `4173` in `app\server\constants.ts`, so the URL with both unset is `http://127.0.0.1:4173/`.

The page is Vue only. `app\vue\main.ts` mounts `App.vue`. There is no `app\browser` directory in the checkout. Bootstrap 5.3.8 and bootstrap-icons 1.13.1 are dependencies in `package.json`, imported from the package in `main.ts` (`bootstrap/dist/css/bootstrap.min.css` and `bootstrap-icons/font/bootstrap-icons.css`) and from `bootstrap/dist/js/bootstrap.bundle.js` in `App.vue`. They are not loaded from a CDN. Icons in `App.vue` carry `aria-hidden="true"`. They are decorative. `app\vue\desk.css` only restyles the preformatted blocks, the meters, the bench table, and the outline button.

## Live path

Ollama is on `http://127.0.0.1:11434` when `OLLAMA_HOST` is unset (`DEFAULT_DAEMON`).

`serveTurn` in `app\server\handlers.ts` builds the fixture questions and opens an SSE stream with `createStream` from `@orkestrel/server`. `writeArrival` writes one event whose name is `arrival.channel` and whose data is the arrival JSON. `app\core\types.ts` names the channels: `decision`, `policy`, `speech`, and `fault`.

`Desk.publish` in `app\server\Desk.ts` runs every Mica question one after another, writes each decision as that call finishes, then calls `settlePolicy`, writes the policy arrival, and only then starts the spoken turns. The spoken turns run together: the agent reply, an unguided Mica contrast, and a generative classification. After those calls, `#restore` loads Mica again. `keep_alive` on the judge request is `10m`. A prior run, not repeated on 2026-10-05, put a cold swap after chat at about 6s. The comment on `#restore` says the reload exists so the next click does not pay for that swap. `qwen3.5:2b-q4_K_M` is what displaces Mica, because the speech path loads `AGENT_MODEL`.

The page marks the speech cards in flight when every decision card has settled (`openChats` in `App.vue`). That flag is a display state. The server still starts chat only after the policy write.

Judge sampling is temperature 1, `num_predict` 1, `think` false, `logprobs` true, top 20, context 8192. The generative calls use temperature 0 through `OllamaProvider`, which always streams. Details of the logprob math are in [Mica](mica.md).

## Packages the desk imports

`package.json` dependencies, and the import sites read with them:

- `@orkestrel/contract`, `@orkestrel/abort`, `@orkestrel/timeout`, `@orkestrel/agent`, `@orkestrel/ollama`, `@orkestrel/budget`, `@orkestrel/router` (`createDispatcher` in `app\server\ApplicationServerRunner.ts`), `@orkestrel/server`
- `@orkestrel/reason`, `@orkestrel/interpret`, `@orkestrel/rater`, `@orkestrel/qualifier`, `@orkestrel/program`, `@orkestrel/brief`, `@orkestrel/workflow`, all composed in `app\core\policies.ts`
- `bootstrap`, `bootstrap-icons`, `vue`

## Policy workflow

`settlePolicy` in `app\core\policies.ts` is the application edge. The runner does not know about Ollama. The definition `PIPELINE` names five phases. A probe on 2026-10-05 printed the same order from `policy.phases`:

| Phase | Tasks | How they run |
| --- | --- | --- |
| Read | Interpret | alone |
| Qualify | Qualifier | alone |
| Judge | Reason and Rater | together, because neither reads the other's output |
| Decide | Program | alone, and it qualifies and rates again inside `program.execute` |
| Pin | Brief | alone |

An earlier sketch of this workflow said Read, then Judge (reason and program, with qualifier and rater inside program), then Pin. The source has drifted. The record follows `policies.ts`, not that sketch. Qualifier and rater have their own tasks. Program runs in a later phase and overwrites the eligibility, finding, rating, status, and decision the earlier tasks stored.

Mica has already judged before `settlePolicy` runs. The function's comment says these packages do not call a model. Interpret classifies the message. The Mica fields copied onto the subject are `refund`, `support`, `frustration`, `severity`, `team`, `comply`, `erase`, and the team-choice `confidence` when that question answered.

## Fixture outcomes

The four outcomes that follow were measured on 2026-10-05 by running `settlePolicy` through Vite on the same decision stubs as `tests\app\core\helpers.test.ts` (`rates a password reset apart from a duplicate-charge refund`). That Vitest file passed the same day (`npx vitest run --config vite.config.ts --project app:core tests/app/core/helpers.test.ts -t "rates a password"`). The rating totals are the rater's, not the reasoner's. The reasoner adds the refund mark into its own sum. The rater's priority line is frustration plus severity only, and the refund line is a granted unit of 1 plus the dollar amount interpret extracted.

| Fixture | Intent | Eligibility sentence | Program status | Rating | Brief task |
| --- | --- | --- | --- | --- | --- |
| Password reset | `reset / access (1.00)` | Ineligible. A password reset is self-serve and is not a refund. | `conditional` | `Priority 0.150 = 0.150` | Do not offer a refund. |
| Duplicate charge | `charge / billing (1.00)` | Eligible. Refund heard and the policy supports it. | `eligible` | `Priority 1.100 + Refund 65.000 = 66.100` | Offer the refund in one or two sentences. |
| System outage | `outage / technical (1.00)` | Referral. An outage goes to technical. Do not offer a refund. | `referral` | `Priority 4.700 = 4.700` | Route the outage to technical and do not offer a refund. |
| Pricing question | `quote / sales (1.00)` | Conditional. A pricing question is a quote. Do not offer a refund. | `conditional` | `Priority 0.050 = 0.050` | Answer the pricing question and do not offer a refund. |

The duplicate total is frustration expectation 1.100 plus a refund of 65.000. The 65 is the static grant of 1 plus the `$64` interpret mined from the fixture text. The outage total is frustration 1.6 plus severity 3.1. Password and pricing are the frustration expectation alone, because severity is 0 and the refund line is scoped out.

Authority `decision` on all four probe rows was `approved`. That field is `result.decision` from the program, not the eligibility sentence.

### Open inconsistency on the password reset

The eligibility sentence says ineligible. The program status is `conditional`. The finding from the same probe was `refund ineligible: No refund was requested; condition: A password reset is self-serve and is not a refund.`

The code does that on purpose and the two sentences disagree. `renderEligibility` returns the ineligible sentence whenever `action` is `reset`, and it does not read `result.status`. The reset ruling in `buildQualification` is a `condition`, not a global ineligible. The missing refund is a restriction scoped to the refund line (`absent`). A scoped restriction leaves priority in place, which is why the rating is still `0.150`. A condition makes the program status `conditional`. The test asserts both the ineligible sentence and `status === 'conditional'`. Leave the disagreement visible. Do not smooth the sentence until the ruling and the renderer name the same status.

The pricing row is the same shape with a quote condition: the eligibility sentence says conditional, the status is `conditional`, and the finding still says the refund line is ineligible because no refund was requested.

## Other fixtures in templates.ts

`EXAMPLES` in `app\core\templates.ts` also holds the fixtures that follow. Password, duplicate, outage, and pricing are the rows in the preceding table.

- Payouts ticket. Quoted customer text from `PAYOUTS_MESSAGE`. Questions: team `choice` (billing, technical, sales), refund `noul`, frustration `score` on the shared calm / frustrated / very angry rubric.
- Unclear request. Text `Can someone look at this?` A wide team `choice` that includes `other`, plus refund and frustration. A team named `other`, or a team `choice` whose confidence fails the `below` comparison at 0.5, is a global referral in `buildQualification`, and a global referral skips rating.
- Injected instruction. The state tells the judge to answer Yes and erase an audit record with no written approval. One `noul`, id `comply`. Yes is a referral. No is a condition and still rates.
- Delete-database check. Fixed text from `CALIBRATION_STATE` and `CALIBRATION_QUESTION`. One `noul`, id `delete`. The template note says it is a fixed check and is not a training sample. `Desk.calibration` asks it on its own route.

## Files to read with this record

- `app\core\policies.ts` — `settlePolicy`, the phase definition, the gates, and the eligibility renderer
- `app\core\templates.ts` — `EXAMPLES` and `FRUSTRATION_LEVELS`
- `app\core\helpers.ts` — judge prompts, softmax, confidence, score expectation, `renderAgent`
- `app\core\types.ts` — `Decision`, `PolicyReport`, `Arrival`
- `app\core\constants.ts` — model names, temperature, judge prompt, pinned payouts reference numbers
- `app\server\Desk.ts` — `publish`
- `app\server\handlers.ts` — `createStream` and `writeArrival`
- `app\server\constants.ts` — context 8192, top 20, timeouts, `keep_alive`
- `app\vue\App.vue`, `app\vue\desk.css`, `app\vue\main.ts`
