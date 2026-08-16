# A10 review evidence (generated)

```
4f67735 A10: the agent lane's deadline, endpoint, and residency become policy
(clean tree; diff below is b6737f7..4f67735)
```

````diff
diff --git a/app/core/constants.ts b/app/core/constants.ts
index 7c32f7c..1e71d19 100644
--- a/app/core/constants.ts
+++ b/app/core/constants.ts
@@ -152,6 +152,12 @@ export const APP_NUMBER_INPUT = 32
 /** Maximum raw environment characters accepted by the application model selector. */
 export const APP_MODEL_INPUT = 255

+/** Maximum raw environment characters accepted by the application agent keep duration. */
+export const APP_AGENT_KEEP_INPUT = 255
+
+/** Maximum raw environment characters accepted by the application agent endpoint. */
+export const APP_AGENT_URL_INPUT = 2_048
+
 /** Maximum raw environment characters accepted by the principal roster. */
 export const APP_PRINCIPALS_INPUT = 65_536

@@ -170,6 +176,23 @@ export const APP_WORKFLOW_LENGTH = 255
 /** Default local inference model used by the application agent executor. */
 export const OLLAMA_MODEL = 'qwen3.5:2b-q4_K_M'

+/** Default model residency requested by the application agent executor. */
+export const OLLAMA_KEEP = '5m'
+
+/**
+ * Default application agent inference deadline, in milliseconds.
+ *
+ * @remarks
+ * Calibration evidence dated 2026-08-15, all through the real built server. An idle-host cold run
+ * (daemon freshly restarted, no model resident) completed in 11,939ms end to end, and a warm run
+ * completes in under one second. Under concurrent four-lane load the same cold path stayed active
+ * past the provider's former fixed 120,000ms cutoff, making that duration a censored lower bound
+ * for the loaded worst case rather than a completed high mark. This 360,000ms policy is three
+ * times that censored bound, so a cold load survives the conditions that actually produced the
+ * failure rather than only the idle case.
+ */
+export const OLLAMA_TIMEOUT = 360_000
+
 /** Fixed public messages for typed inference relay failures. */
 export const INFERENCE_ERROR_MESSAGES: Readonly<Record<InferenceErrorCode, string>> = Object.freeze(
 	{
diff --git a/app/core/parsers.ts b/app/core/parsers.ts
index ed564e4..d9398c9 100644
--- a/app/core/parsers.ts
+++ b/app/core/parsers.ts
@@ -43,6 +43,8 @@ import {
 } from '@src/core'
 import {
 	APP_LEDGER_AGE,
+	APP_AGENT_KEEP_INPUT,
+	APP_AGENT_URL_INPUT,
 	APP_HISTORY_COUNT,
 	APP_HISTORY_INPUT,
 	APP_HISTORY_MAXIMUM,
@@ -51,7 +53,9 @@ import {
 	APP_LIMIT_WINDOW,
 	APP_MODEL_INPUT,
 	APP_NUMBER_INPUT,
+	OLLAMA_KEEP,
 	OLLAMA_MODEL,
+	OLLAMA_TIMEOUT,
 	PROMPT_FORM_CONTRACT,
 	APP_PRINCIPALS_INPUT,
 	APP_SECRET_INPUT,
@@ -445,6 +449,7 @@ export function parseApplicationPolicy(environment: ApplicationEnvironment): App
 			if (!inference.includes(vendor)) inference.push(vendor)
 		}
 	}
+	const endpoint = parseApplicationURL(environment.APP_AGENT_URL)
 	return Object.freeze({
 		principals,
 		users,
@@ -452,7 +457,16 @@ export function parseApplicationPolicy(environment: ApplicationEnvironment): App
 		store,
 		workspace,
 		assets,
-		model: parseApplicationModel(environment.APP_MODEL),
+		agent: Object.freeze({
+			model: parseApplicationModel(environment.APP_AGENT_MODEL),
+			...(endpoint === undefined ? {} : { url: endpoint }),
+			timeout: parseApplicationInteger(
+				environment.APP_AGENT_TIMEOUT,
+				'APP_AGENT_TIMEOUT',
+				OLLAMA_TIMEOUT,
+			),
+			keep: parseApplicationKeep(environment.APP_AGENT_KEEP),
+		}),
 		journal: Object.freeze({
 			entries: parseApplicationInteger(
 				environment.APP_JOURNAL_ENTRIES,
@@ -573,7 +587,7 @@ export function parseInferenceRequest(value: unknown): InferenceRequest {
 /**
  * Parse the application agent model selector.
  *
- * @param value - The optional `APP_MODEL` value
+ * @param value - The optional `APP_AGENT_MODEL` value
  * @returns The configured model or the local default
  * @throws {@link ApplicationError} `CONFIG` for empty, controlled, or oversized input
  */
@@ -585,11 +599,76 @@ export function parseApplicationModel(value: unknown): string {
 		value.trim().length === 0 ||
 		hasApplicationControl(value)
 	) {
-		throw new ApplicationError('APP_MODEL must be a non-empty model name', { code: 'CONFIG' })
+		throw new ApplicationError('APP_AGENT_MODEL must be a non-empty model name', {
+			code: 'CONFIG',
+		})
+	}
+	return value.trim()
+}
+
+/**
+ * Parse the application agent model-residency duration.
+ *
+ * @param value - The optional `APP_AGENT_KEEP` value
+ * @returns The configured duration or the provider default
+ * @throws {@link ApplicationError} `CONFIG` for empty, controlled, or oversized input
+ */
+export function parseApplicationKeep(value: unknown): string {
+	if (value === undefined) return OLLAMA_KEEP
+	if (
+		typeof value !== 'string' ||
+		value.length > APP_AGENT_KEEP_INPUT ||
+		value.trim().length === 0 ||
+		hasApplicationControl(value)
+	) {
+		throw new ApplicationError('APP_AGENT_KEEP must be a non-empty duration', { code: 'CONFIG' })
 	}
 	return value.trim()
 }

+/**
+ * Parse the application agent inference endpoint.
+ *
+ * @param value - The optional `APP_AGENT_URL` value
+ * @returns The configured absolute HTTP endpoint, or `undefined` for the provider default
+ * @throws {@link ApplicationError} `CONFIG` for a non-HTTP, malformed, controlled, or oversized input
+ *
+ * @example
+ * ```ts
+ * parseApplicationURL('http://127.0.0.1:29999') // 'http://127.0.0.1:29999'
+ * parseApplicationURL(undefined) // undefined
+ * ```
+ */
+export function parseApplicationURL(value: unknown): string | undefined {
+	if (value === undefined) return undefined
+	if (
+		typeof value !== 'string' ||
+		value.length > APP_AGENT_URL_INPUT ||
+		value.trim().length === 0 ||
+		hasApplicationControl(value)
+	) {
+		throw new ApplicationError('APP_AGENT_URL must be an absolute http or https URL', {
+			code: 'CONFIG',
+		})
+	}
+	const trimmed = value.trim()
+	let parsed: URL
+	try {
+		parsed = new URL(trimmed)
+	} catch (cause) {
+		throw new ApplicationError('APP_AGENT_URL must be an absolute http or https URL', {
+			code: 'CONFIG',
+			cause,
+		})
+	}
+	if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
+		throw new ApplicationError('APP_AGENT_URL must be an absolute http or https URL', {
+			code: 'CONFIG',
+		})
+	}
+	return trimmed
+}
+
 /**
  * Parse a workflow payload into the prompt broker's exact park request.
  *
diff --git a/app/core/types.ts b/app/core/types.ts
index 0022826..96588d6 100644
--- a/app/core/types.ts
+++ b/app/core/types.ts
@@ -170,7 +170,12 @@ export interface ApplicationPolicy {
 	readonly store: 'memory' | string
 	readonly workspace: string
 	readonly assets: string
-	readonly model: string
+	readonly agent: {
+		readonly model: string
+		readonly url?: string
+		readonly timeout: number
+		readonly keep: string
+	}
 	readonly journal: {
 		readonly entries: number
 		readonly bytes: number
diff --git a/app/server/ApplicationRuntime.ts b/app/server/ApplicationRuntime.ts
index 4aece05..78436f1 100644
--- a/app/server/ApplicationRuntime.ts
+++ b/app/server/ApplicationRuntime.ts
@@ -159,7 +159,14 @@ export class ApplicationRuntime implements ApplicationRuntimeInterface {
 				transcript,
 			}),
 			new AgentExecutor({
-				provider: options.provider ?? createOllama({ model: this.policy.model }),
+				provider:
+					options.provider ??
+					createOllama({
+						model: this.policy.agent.model,
+						...(this.policy.agent.url === undefined ? {} : { url: this.policy.agent.url }),
+						timeout: this.policy.agent.timeout,
+						keepAlive: this.policy.agent.keep,
+					}),
 				note: this.policy.journal.note,
 			}),
 			new HumanExecutor({ prompt: this.prompt, ledger: this.ledger, codec }),
diff --git a/guides/src/supervisor.md b/guides/src/supervisor.md
index 8026ef0..8474416 100644
--- a/guides/src/supervisor.md
+++ b/guides/src/supervisor.md
@@ -894,8 +894,12 @@ layer before exposing this reference composition.
 Backend executable, model, scratch directory, lifecycle bounds, and environment remain trusted
 embedding configuration rather than request fields. The runtime omits the directory for every
 mounted vendor, so the engine creates one per-call temporary scratch directory and removes it after
-that call. It also deliberately omits a model, preserving that CLI's default; `APP_MODEL` configures
-only the local agent executor. Direct backend injection exists for trusted embedding and
+that call. It also deliberately omits a model, preserving that CLI's default. The grouped
+`ApplicationPolicy.agent` policy configures only the local agent executor: `APP_AGENT_MODEL`
+selects its model, `APP_AGENT_URL` aims the lane at an inference endpoint other than the local
+daemon's default, `APP_AGENT_TIMEOUT` bounds inference in milliseconds, and `APP_AGENT_KEEP`
+controls model residency. Absence of a URL is `undefined` and keeps the provider's own default.
+The runtime translates policy `keep` to the Ollama provider's `keepAlive` option at composition. Direct backend injection exists for trusted embedding and
 protocol-fixture composition, never on the HTTP wire.

 The live broker subscribes to observations only after journal admission. It also receives provider
@@ -1150,7 +1154,10 @@ terminal.write('visible to the terminal and the live workflow viewer')
 | `APP_CSRF_SECRET`       | Random per process   | Independent double-submit signing secret; required on the same condition.                                                                                                  |
 | `APP_SESSION_TTL`       | `28,800,000` ms      | Idle session expiry, which the live stream never refreshes.                                                                                                                |
 | `APP_SESSION_LIFETIME`  | `86,400,000` ms      | Absolute session expiry counted from login, regardless of activity.                                                                                                        |
-| `APP_MODEL`             | `qwen3.5:2b-q4_K_M`  | Local model used by the application agent executor unless a provider is injected.                                                                                          |
+| `APP_AGENT_MODEL`       | `qwen3.5:2b-q4_K_M`  | Local model used by the application agent executor unless a provider is injected.                                                                                          |
+| `APP_AGENT_URL`         | Provider default     | Absolute HTTP inference endpoint for the agent lane; absent keeps the local daemon default.                                                                                |
+| `APP_AGENT_TIMEOUT`     | `360,000` ms         | Positive safe-integer inference deadline; three times the A8 cold-path 120,000ms censored lower bound.                                                                     |
+| `APP_AGENT_KEEP`        | `5m`                 | Non-empty Ollama model-residency duration translated to provider `keepAlive`.                                                                                              |
 | `APP_INFERENCE`         | Empty                | Comma-separated Claude, Codex, and Cursor deployment-policy roster.                                                                                                        |
 | `APP_HOST` / `APP_PORT` | `127.0.0.1` / `3000` | Loopback-safe network bind.                                                                                                                                                |

@@ -1193,6 +1200,8 @@ though it is bundled rather than published.
 | `APP_ASSETS_DIRECTORY`            | const     | Default browser-build directory.                                  |
 | `APP_NUMBER_INPUT`                | const     | Numeric environment input bound.                                  |
 | `APP_MODEL_INPUT`                 | const     | Application model input bound.                                    |
+| `APP_AGENT_KEEP_INPUT`            | const     | Application agent keep-duration input bound.                      |
+| `APP_AGENT_URL_INPUT`             | const     | Application agent endpoint input bound.                           |
 | `APP_PRINCIPALS_INPUT`            | const     | Principal-roster input bound.                                     |
 | `APP_USERS_INPUT`                 | const     | Human-user roster input bound.                                    |
 | `APP_SECRET_INPUT`                | const     | Session and CSRF signing-secret input bound.                      |
@@ -1202,6 +1211,8 @@ though it is bundled rather than published.
 | `APP_HISTORY_MAXIMUM`             | const     | Maximum completed runs one history request may ask for: 50.       |
 | `APP_HISTORY_INPUT`               | const     | Maximum encoded characters accepted for one history cursor.       |
 | `OLLAMA_MODEL`                    | const     | Default local inference model.                                    |
+| `OLLAMA_KEEP`                     | const     | Default local model residency.                                    |
+| `OLLAMA_TIMEOUT`                  | const     | Default application agent inference deadline.                     |
 | `INFERENCE_ERROR_MESSAGES`        | const     | Fixed public message for each inference failure code.             |
 | `ApplicationErrorCode`            | type      | Application configuration and boundary failure vocabulary.        |
 | `InferenceVendor`                 | type      | Claude, Codex, or Cursor backend vocabulary.                      |
@@ -1230,7 +1241,7 @@ though it is bundled rather than published.
 | `HistoryRun`                      | interface | One completed run joined with its supervisor release instant.     |
 | `HistoryQuery`                    | interface | One decoded, bounded completed-history request.                   |
 | `HistoryPage`                     | interface | Completed runs and the opaque token that asks for older ones.     |
-| `ApplicationPolicy`               | interface | Fully parsed deployment policy.                                   |
+| `ApplicationPolicy`               | interface | Fully parsed deployment policy with grouped agent settings.       |
 | `ObserveFrame`                    | interface | Journal-admitted observation frame carrying its durable time.     |
 | `ApplicationTail`                 | interface | Durable frames plus persisted terminal status.                    |
 | `TranscriptFrame`                 | interface | Timestamped live-only provider transcript frame.                  |
@@ -1261,6 +1272,8 @@ though it is bundled rather than published.
 | `parseApplicationPolicy`          | function  | Parse and default all deployment policy.                          |
 | `parseInferenceRequest`           | function  | Own and validate one inference wire request.                      |
 | `parseApplicationModel`           | function  | Parse and default the application agent model.                    |
+| `parseApplicationKeep`            | function  | Parse and default the application agent residency duration.       |
+| `parseApplicationURL`             | function  | Parse the optional application agent inference endpoint.          |
 | `parseHistoryCursor`              | function  | Decode one opaque history continuation token, or refuse it.       |
 | `parseHistoryQuery`               | function  | Parse the exact bounded query the history route accepts.          |
 | `parseHumanPrompt`                | function  | Parse a durable terminal park request.                            |
@@ -1515,6 +1528,7 @@ import {
 	matchesPromptValue,
 	parseAgentInstruction,
 	parseApplicationInteger,
+	parseApplicationKeep,
 	parseApplicationModel,
 	parseApplicationPolicy,
 	parseApplicationPrincipals,
@@ -1561,7 +1575,8 @@ isApplicationUser(users[0])
 resolveApplicationUserPrincipal(users, principals, 'operator')
 parseApplicationSecret(undefined, 'APP_SESSION_SECRET', false)
 parseApplicationSessionInput({ name: 'operator', secret: 'winter-harbour-42' })
-parseApplicationPolicy({ APP_PRINCIPALS: 'token:build', APP_USERS: roster })
+const policy = parseApplicationPolicy({ APP_PRINCIPALS: 'token:build', APP_USERS: roster })
+policy.agent
 const inference: InferenceRequest = parseInferenceRequest({
 	messages: [{ role: 'user', content: 'Summarize the build.' }],
 	stream: true,
@@ -1572,6 +1587,7 @@ const inferenceFrame: InferenceFrame = {
 	message: 'Tools are unavailable',
 }
 parseApplicationInteger('60', 'APP_LIMIT', 60)
+parseApplicationKeep('5m')
 parseApplicationModel('qwen3.5:2b-q4_K_M')
 parseApplicationStore('memory')
 parseBearerToken('Bearer token')
diff --git a/tests/app/core/factories.test.ts b/tests/app/core/factories.test.ts
index 8948edd..7508e84 100644
--- a/tests/app/core/factories.test.ts
+++ b/tests/app/core/factories.test.ts
@@ -2,11 +2,14 @@ import {
 	APP_LIMIT_COUNT,
 	APP_LIMIT_WINDOW,
 	APP_INFERENCE_INPUT,
+	APP_AGENT_KEEP_INPUT,
 	APP_MODEL_INPUT,
 	APP_SESSION_AGE,
 	APP_SESSION_IDLE,
 	APP_ASSETS_DIRECTORY,
+	OLLAMA_KEEP,
 	OLLAMA_MODEL,
+	OLLAMA_TIMEOUT,
 	ApplicationError,
 	InferenceError,
 	authorizePrincipal,
@@ -60,7 +63,23 @@ describe('application core composition', () => {
 		const defaults = parseApplicationPolicy(POLICY_ENVIRONMENT)
 		expect(defaults.limit).toBe(APP_LIMIT_COUNT)
 		expect(defaults.window).toBe(APP_LIMIT_WINDOW)
-		expect(defaults.model).toBe(OLLAMA_MODEL)
+		expect(defaults.agent).toEqual({
+			model: OLLAMA_MODEL,
+			timeout: OLLAMA_TIMEOUT,
+			keep: OLLAMA_KEEP,
+		})
+		expect(defaults.agent.url).toBeUndefined()
+		expect(Object.isFrozen(defaults.agent)).toBe(true)
+		const aimed = parseApplicationPolicy({
+			...POLICY_ENVIRONMENT,
+			APP_AGENT_URL: ' http://127.0.0.1:29999 ',
+		})
+		expect(aimed.agent.url).toBe('http://127.0.0.1:29999')
+		for (const refused of ['', '   ', 'not a url', 'ftp://x', 'http:// bad']) {
+			expect(() =>
+				parseApplicationPolicy({ ...POLICY_ENVIRONMENT, APP_AGENT_URL: refused }),
+			).toThrow(ApplicationError)
+		}
 		expect(defaults.inference).toEqual([])
 		expect(defaults.assets).toBe(APP_ASSETS_DIRECTORY)
 		expect(defaults.session).toMatchObject({
@@ -78,7 +97,9 @@ describe('application core composition', () => {
 			APP_LEDGER: '7000',
 			APP_LIMIT: '11',
 			APP_WINDOW: '1200',
-			APP_MODEL: 'custom:model',
+			APP_AGENT_MODEL: 'custom:model',
+			APP_AGENT_TIMEOUT: '900000',
+			APP_AGENT_KEEP: '30m',
 			APP_INFERENCE: 'claude, codex,claude,cursor',
 			APP_ASSETS: 'public/operator',
 			APP_SESSION_TTL: '1234',
@@ -92,7 +113,7 @@ describe('application core composition', () => {
 			ledger: 7000,
 			limit: 11,
 			window: 1200,
-			model: 'custom:model',
+			agent: { model: 'custom:model', timeout: 900_000, keep: '30m' },
 			inference: ['claude', 'codex', 'cursor'],
 			assets: 'public/operator',
 			session: { secret: 'session-key', ttl: 1234, lifetime: 5678 },
@@ -192,21 +213,45 @@ describe('application core composition', () => {
 		).toThrowError(expect.objectContaining({ code: 'CONFIG' }))
 	})

-	it.each(['', '   ', 'line\nbreak'])('rejects malformed APP_MODEL %s', (value) => {
-		expect(() => parseApplicationPolicy({ ...POLICY_ENVIRONMENT, APP_MODEL: value })).toThrowError(
-			expect.objectContaining({ code: 'CONFIG' }),
-		)
+	it.each(['', '   ', 'line\nbreak'])('rejects malformed APP_AGENT_MODEL %s', (value) => {
+		expect(() =>
+			parseApplicationPolicy({ ...POLICY_ENVIRONMENT, APP_AGENT_MODEL: value }),
+		).toThrowError(expect.objectContaining({ code: 'CONFIG' }))
+	})
+
+	it('bounds APP_AGENT_MODEL before retaining it in policy', () => {
+		expect(() =>
+			parseApplicationPolicy({
+				...POLICY_ENVIRONMENT,
+				APP_AGENT_MODEL: 'm'.repeat(APP_MODEL_INPUT + 1),
+			}),
+		).toThrowError(expect.objectContaining({ code: 'CONFIG' }))
+	})
+
+	it.each(['', '   ', 'line\nbreak'])('rejects malformed APP_AGENT_KEEP %s', (value) => {
+		expect(() =>
+			parseApplicationPolicy({ ...POLICY_ENVIRONMENT, APP_AGENT_KEEP: value }),
+		).toThrowError(expect.objectContaining({ code: 'CONFIG' }))
 	})

-	it('bounds APP_MODEL before retaining it in policy', () => {
+	it('bounds APP_AGENT_KEEP before retaining it in policy', () => {
 		expect(() =>
 			parseApplicationPolicy({
 				...POLICY_ENVIRONMENT,
-				APP_MODEL: 'm'.repeat(APP_MODEL_INPUT + 1),
+				APP_AGENT_KEEP: 'm'.repeat(APP_AGENT_KEEP_INPUT + 1),
 			}),
 		).toThrowError(expect.objectContaining({ code: 'CONFIG' }))
 	})

+	it.each(['0', '-1', '1.5', 'NaN', 'Infinity', '', '9007199254740992'])(
+		'rejects malformed APP_AGENT_TIMEOUT %s',
+		(value) => {
+			expect(() =>
+				parseApplicationPolicy({ ...POLICY_ENVIRONMENT, APP_AGENT_TIMEOUT: value }),
+			).toThrowError(expect.objectContaining({ code: 'CONFIG' }))
+		},
+	)
+
 	it.each(['0', '-1', '1.5', 'NaN', 'Infinity', ''])('rejects malformed APP_LIMIT %s', (value) => {
 		expect(() => parseApplicationPolicy({ ...POLICY_ENVIRONMENT, APP_LIMIT: value })).toThrowError(
 			expect.objectContaining({ code: 'CONFIG' }),
diff --git a/tests/app/server/ApplicationRuntime.test.ts b/tests/app/server/ApplicationRuntime.test.ts
index aab9a01..15d161d 100644
--- a/tests/app/server/ApplicationRuntime.test.ts
+++ b/tests/app/server/ApplicationRuntime.test.ts
@@ -1,8 +1,19 @@
 import { createApplicationRuntime } from '@app/server'
+import type { ApplicationProcessInterface } from '../../setupApplicationServer.js'
+import { once } from 'node:events'
 import { existsSync } from 'node:fs'
+import { createServer } from 'node:http'
 import { join } from 'node:path'
 import { describe, expect, it } from 'vitest'
 import { createUnitSnapshot } from '../../setup.js'
+import { waitForDelay } from '@orkestrel/test'
+import {
+	reserveLoopbackPort,
+	startApplicationProcess,
+	stopApplicationProcess,
+	stopNodeServer,
+	waitForApplicationResponse,
+} from '../../setupApplicationServer.js'
 import { createTemporaryDirectory } from '../../setupServer.js'
 import {
 	ClaudeFixtureCLIBackend,
@@ -12,13 +23,13 @@ import {
 } from '../setup.js'

 describe('ApplicationRuntime', () => {
-	it('mounts only configured CLI vendors with per-call scratch and without applying APP_MODEL', async () => {
+	it('mounts only configured CLI vendors with per-call scratch and without applying APP_AGENT_MODEL', async () => {
 		const temporary = await createTemporaryDirectory('supervisor-inference-runtime-')
 		const fixed = join(temporary.path, 'inference', 'claude')
 		const runtime = createApplicationRuntime({
 			environment: {
 				...createInferenceEnvironment(temporary.path),
-				APP_MODEL: 'agent-executor-only',
+				APP_AGENT_MODEL: 'agent-executor-only',
 			},
 			provider: new InertAgentProvider(),
 			backends: [new ClaudeFixtureCLIBackend()],
@@ -40,6 +51,88 @@ describe('ApplicationRuntime', () => {
 			await temporary.destroy()
 		}
 	})
+
+	it('honors APP_AGENT_TIMEOUT through the real built server', async () => {
+		let reached = false
+		let body = ''
+		const tarpit = createServer((request) => {
+			reached = true
+			request.setEncoding('utf8')
+			request.on('data', (chunk: unknown) => {
+				if (typeof chunk === 'string') body += chunk
+			})
+		})
+		let application: ApplicationProcessInterface | undefined
+		const temporary = await createTemporaryDirectory('supervisor-agent-deadline-')
+		try {
+			// The tarpit takes an ephemeral loopback port and the policy's own endpoint knob aims the
+			// agent lane at it, so the proof never touches a real daemon and holds on any host.
+			tarpit.listen(0, '127.0.0.1')
+			await once(tarpit, 'listening')
+			const address = tarpit.address()
+			if (address === null || typeof address === 'string') throw new Error('tarpit has no port')
+			const port = await reserveLoopbackPort()
+			application = startApplicationProcess(port, {
+				APP_AGENT_MODEL: 'deadline-probe',
+				APP_AGENT_URL: `http://127.0.0.1:${String(address.port)}`,
+				APP_AGENT_TIMEOUT: '2000',
+				APP_AGENT_KEEP: '5m',
+				// The proof polls the snapshot every 25ms across the whole deadline window, which is
+				// more requests than the default operator-facing limit admits.
+				APP_LIMIT: '2000',
+				APP_WORKSPACE: temporary.path,
+			})
+			const ready = await waitForApplicationResponse(application, port, '/health')
+			await ready.body?.cancel()
+			const started = Date.now()
+			const accepted = await fetch(`http://127.0.0.1:${String(port)}/workflows`, {
+				method: 'POST',
+				headers: {
+					authorization: 'Bearer allowed',
+					'content-type': 'application/json',
+				},
+				body: JSON.stringify({
+					definition: {
+						id: 'deadline-probe',
+						name: 'Deadline probe',
+						phases: [
+							{
+								id: 'phase',
+								name: 'Phase',
+								tasks: [{ id: 'task', name: 'Task', run: 'agent' }],
+							},
+						],
+					},
+					payload: { phase: { task: { instruction: 'Say one word.' } } },
+				}),
+			})
+			expect(accepted.status).toBe(202)
+			await accepted.body?.cancel()
+			let snapshot = ''
+			const deadline = Date.now() + 5_000
+			while (Date.now() < deadline) {
+				const inspected = await fetch(`http://127.0.0.1:${String(port)}/workflows/deadline-probe`, {
+					headers: { authorization: 'Bearer allowed' },
+				})
+				snapshot = await inspected.text()
+				if (snapshot.includes('"status":"failed"')) break
+				await waitForDelay(25)
+			}
+			const elapsed = Date.now() - started
+			expect(reached).toBe(true)
+			expect(body).toContain('"model":"deadline-probe"')
+			expect(body).toContain('"keep_alive":"5m"')
+			expect(snapshot).toContain('"status":"failed"')
+			expect(snapshot).toContain('This operation was aborted')
+			expect(elapsed).toBeGreaterThanOrEqual(1_750)
+			expect(elapsed).toBeLessThan(5_000)
+		} finally {
+			if (application !== undefined) await stopApplicationProcess(application)
+			tarpit.closeAllConnections()
+			await stopNodeServer(tarpit)
+			await temporary.destroy()
+		}
+	}, 10_000)
 	it('applies configured lease tenure and journal entry retention to the composed runtime', async () => {
 		const runtime = createApplicationRuntime({
 			environment: {
diff --git a/tests/setupBrowser.ts b/tests/setupBrowser.ts
index 896b148..5385e79 100644
--- a/tests/setupBrowser.ts
+++ b/tests/setupBrowser.ts
@@ -492,7 +492,11 @@ export function resolveStates(element: Element): readonly string[] {
 	if (expanded === 'false') states.push('collapsed')
 	// A native disclosure states its expansion on the parent element's own `open` rather than on an
 	// ARIA attribute, so the summary's state is read from the platform's one copy of the fact.
-	if (expanded === null && element.tagName === 'SUMMARY' && element.parentElement instanceof HTMLDetailsElement) {
+	if (
+		expanded === null &&
+		element.tagName === 'SUMMARY' &&
+		element.parentElement instanceof HTMLDetailsElement
+	) {
 		states.push(element.parentElement.open ? 'expanded' : 'collapsed')
 	}
 	const pressed = element.getAttribute('aria-pressed')
````
