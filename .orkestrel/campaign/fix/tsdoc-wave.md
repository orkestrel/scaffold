# Fix dossier: TSDoc voice wave (fleet, runs last)

The user ruled: migrate the fleet to the rule's third-person first sentence and the boolean
`@returns` wording, as the final fix wave. These verified findings carry the enumerated lines;
the wave itself sweeps every package, not only the listed lines.

## s13-01 — DRIFT

1. package=all three file=(list following) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: The TSDoc first sentence is imperative rather than third-person with an `-s` verb, which the rule fixes as `Creates`, `Returns`, `Checks whether`.
   repair: Rewrite each listed first sentence into the third person, leaving the rest of the block untouched.
   msg — `errors.ts:31`; `types.ts:411`, `:420`; `parsers.ts:9`; `MSG.ts:127`, `:228`, `:282`; `helpers.ts:8`, `:23`, `:38`, `:48`, `:58`, `:70`, `:84`, `:111`, `:136`, `:151`, `:169`, `:192`, `:209`, `:220`, `:252`, `:289`, `:338`, `:436`, `:455`, `:483`, `:516`, `:526`, `:555`, `:604`, `:644`, `:662`, `:698`; `factories.ts:10`; `validators.ts:5`, `:21`, `:45` (noun phrase, no verb at all); `shapers.ts:38`, `:422`, `:492`.
   process — `core/errors.ts:19`; `core/types.ts:279`, `:297`, `:314`, `:492`, `:513`, `:534`, `:549`, `:757`, `:775`, `:782`, `:789`, `:795`; `server/types.ts:35`, `:42`, `:50`; `server/Process.ts:64`, `:180`; `server/Session.ts:44`; `server/Supervisor.ts:92`; `server/ProcessManager.ts:57`, `:100`, `:139`, `:146`, `:153`, `:165`.
   brief — `errors.ts:36`; `parsers.ts:6`; `helpers.ts:31`, `:50`, `:68`, `:90`, `:110`, `:129`, `:148`, `:171`, `:199`, `:218`, `:242`, `:260`, `:301`, `:401`, `:582`, `:734`, `:766`, `:789`, `:823`, `:860`, `:919`, `:984`, `:1126`, `:1156`, `:1200`, `:1225`, `:1278`, `:1313`; `factories.ts:15`, `:39`, `:58`.
   Note the inconsistency this creates inside one file: `process/src/server/Process.ts:180` is imperative while `:200` and `:215` are third person, and `msg/src/core/helpers.ts:714` (`Infers…`) is third person among thirty imperatives.

## s18-01 — DRIFT

1. package=all ten file=(list follows) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: TSDoc first sentences are written in the imperative rather than the required third-person `-s` verb form, systematically across all ten packages; a second variant states no verb at all. Representative lines: `abort/src/core/helpers.ts:6` ("Validate and normalize…"), `abort/src/core/helpers.ts:83` ("Link an own…"), `abort/src/core/validators.ts:2` ("Determine whether…"), `abort/src/core/factories.ts:5`, `abort/src/core/Abort.ts:36`; `emitter/src/core/helpers.ts:2`, `emitter/src/core/factories.ts:5`; `ndjson/src/core/types.ts:8`, `ndjson/src/core/types.ts:13`, `ndjson/src/core/factories.ts:5`; `timeout/src/core/helpers.ts:7`, `timeout/src/core/validators.ts:5`, `timeout/src/core/validators.ts:21`, `timeout/src/core/factories.ts:5`, `timeout/src/core/types.ts:44`, `timeout/src/core/types.ts:50`; `budget/src/core/helpers.ts:6`, `budget/src/core/helpers.ts:103`, `budget/src/core/validators.ts:5`, `budget/src/core/validators.ts:21`, `budget/src/core/validators.ts:43`, `budget/src/core/validators.ts:59`, `budget/src/core/factories.ts:14`, `budget/src/core/factories.ts:34`, `budget/src/core/factories.ts:99`, `budget/src/core/types.ts:52`, `budget/src/core/types.ts:58`, `budget/src/core/types.ts:65`; `pool/src/core/validators.ts:5`, `pool/src/core/validators.ts:20`, `pool/src/core/errors.ts:25`, `pool/src/core/errors.ts:50`, `pool/src/core/factories.ts:5`, `pool/src/core/types.ts:73`, `pool/src/core/types.ts:80`, `pool/src/core/types.ts:87`; `tool/src/core/validators.ts:5`, `tool/src/core/factories.ts:6`, `tool/src/core/factories.ts:27`, `tool/src/core/types.ts:87`, `tool/src/core/types.ts:135`, `tool/src/core/types.ts:142`, `tool/src/core/types.ts:149`, `tool/src/core/types.ts:156`, `tool/src/core/types.ts:162`, `tool/src/core/types.ts:172`, `tool/src/core/types.ts:179`, `tool/src/core/types.ts:186`, `tool/src/core/types.ts:193`, `tool/src/core/types.ts:200`; `sse/src/core/types.ts:61`, `sse/src/core/types.ts:70`, `sse/src/core/errors.ts:34`, `sse/src/core/factories.ts:5`; `sqlite/src/server/helpers.ts:14`, `sqlite/src/server/helpers.ts:47`, `sqlite/src/server/errors.ts:45`, `sqlite/src/server/factories.ts:5`, `sqlite/src/server/types.ts:127`, `sqlite/src/server/types.ts:134`, `sqlite/src/server/types.ts:136`; `ollama/src/server/errors.ts:38`, `ollama/src/server/factories.ts:6`.
   repair: Rewrite each listed first sentence in the third person — `Validates and normalizes`, `Links`, `Determines whether`, `Creates`, `Extracts`, `Registers`, `Executes`, `Removes`, `Converts`, `Normalizes`, `Checks whether`. This is one finding rather than ten because the repair is one uniform sweep; the per-package line lists make it individually dispatchable.

## s18-02 — DRIFT

2. package=all ten except ndjson and abort's guards file=(list follows) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: A boolean `@returns` is written as "Whether the value is …" rather than the required "True if …; false otherwise" form: `pool/src/core/validators.ts:5`, `pool/src/core/validators.ts:21`, `pool/src/core/errors.ts:53`, `sqlite/src/server/errors.ts:48`, `ollama/src/server/errors.ts:41`, `tool/src/core/types.ts:188`, `tool/src/core/types.ts:196`.
   repair: Rewrite each as `True if …; false otherwise`.

