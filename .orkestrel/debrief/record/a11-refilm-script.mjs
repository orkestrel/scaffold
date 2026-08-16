import { createRequire } from 'node:module'
import { spawn } from 'node:child_process'
import { createServer } from 'node:http'
import { once } from 'node:events'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const require = createRequire('/workspace/supervisor/package.json')
const { chromium } = require('playwright')

const OUT = '/tmp/claude-0/-home-user/6d2dc0ef-4f55-5fcd-ae2e-97129e7119cf/scratchpad'
const EXECUTABLE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const NAME = 'operator'
const SECRET = 'correct horse battery staple'
// Inside the trusted git tree so the codex CLI's repo check passes; tmp/ is gitignored.
const WORKSPACE = '/workspace/supervisor/tmp/e1r-workspace'

async function reservePort() {
	const probe = createServer()
	probe.listen(0, '127.0.0.1')
	await once(probe, 'listening')
	const { port } = probe.address()
	probe.close()
	await once(probe, 'close')
	return port
}

function launchServer(port, extra) {
	const child = spawn(process.execPath, ['dist/app/server/main.cjs'], {
		cwd: '/workspace/supervisor',
		env: {
			...process.env,
			APP_HOST: '127.0.0.1',
			APP_PORT: String(port),
			APP_ASSETS: 'dist/app/browser',
			APP_STORE: 'memory',
			APP_WORKSPACE: WORKSPACE,
			APP_LIMIT: '2000',
			APP_AGENT_MODEL: 'qwen3.5:2b-q4_K_M',
			ANTHROPIC_MODEL: 'haiku',
			APP_PRINCIPALS: 'capture:*',
			APP_USERS: JSON.stringify([{ name: NAME, secret: SECRET, principal: 'capture' }]),
			APP_SESSION_SECRET: 'capture-session-secret',
			APP_CSRF_SECRET: 'capture-csrf-secret',
			...extra,
		},
		stdio: ['ignore', 'pipe', 'pipe'],
	})
	child.stderr.setEncoding('utf8')
	child.stderr.on('data', (chunk) => process.stderr.write(chunk))
	return child
}

async function waitForServer(origin) {
	for (let attempt = 0; attempt < 100; attempt += 1) {
		try {
			const response = await fetch(`${origin}/health`)
			await response.body?.cancel()
			if (response.ok) return
		} catch {}
		await new Promise((resolve) => setTimeout(resolve, 100))
	}
	throw new Error(`server never answered /health at ${origin}`)
}

async function start(origin, id, name, run, instruction) {
	const response = await fetch(`${origin}/workflows`, {
		method: 'POST',
		headers: { authorization: 'Bearer capture', 'content-type': 'application/json' },
		body: JSON.stringify({
			definition: {
				id,
				name,
				phases: [{ id: 'phase', name: 'Phase', tasks: [{ id: 'task', name: 'Task', run }] }],
			},
			payload: { phase: { task: { instruction } } },
		}),
	})
	const body = await response.text()
	if (response.status !== 202) throw new Error(`start ${id}: ${String(response.status)} ${body}`)
}

async function arrive(page, origin) {
	await page.goto(origin, { waitUntil: 'load' })
	await page.locator('#login-name').fill(NAME)
	await page.locator('#login-secret').fill(SECRET)
	await page.getByRole('button', { name: 'Login with these credentials' }).click()
	await page
		.getByRole('button', { name: 'Logout and clear this view' })
		.waitFor({ state: 'visible' })
}

async function shot(page, name) {
	await page.screenshot({ path: join(OUT, `e1r-${name}.png`) })
	console.log(`captured e1r-${name}.png`)
}

mkdirSync(WORKSPACE, { recursive: true })
const port = await reservePort()
const origin = `http://127.0.0.1:${String(port)}`
const server = launchServer(port, {})
const browser = await chromium.launch({ executablePath: EXECUTABLE })
const context = await browser.newContext({
	viewport: { width: 1440, height: 900 },
	colorScheme: 'light',
})
const page = await context.newPage()

const LANES = [
	{
		lane: 'qwen',
		id: 'qwen-briefing',
		title: 'Qwen briefing',
		run: 'agent',
		instruction:
			'You are the release crew agent. In one short sentence, confirm the smoke checks passed and name one thing you verified.',
		cap: 300000,
	},
	{
		lane: 'haiku',
		id: 'haiku-review',
		title: 'Haiku review',
		run: 'claude',
		instruction:
			'You are reviewing a release. In one short sentence, name the first thing you would check before shipping.',
		cap: 180000,
	},
	{
		lane: 'luna',
		id: 'luna-audit',
		title: 'Luna audit',
		run: 'codex',
		instruction:
			'You are auditing a deployment. In one short sentence, state whether the rollout order matters and why.',
		cap: 180000,
	},
	{
		lane: 'composer',
		id: 'composer-notes',
		title: 'Composer notes',
		run: 'cursor',
		instruction:
			'You are writing release notes. In one short sentence, summarize a bug fix for a login form.',
		cap: 180000,
	},
]

try {
	await waitForServer(origin)
	console.log(`server up at ${origin}`)
	await arrive(page, origin)
	for (const scenario of LANES) {
		console.log(`--- lane ${scenario.lane} (${scenario.run}) ---`)
		await start(origin, scenario.id, scenario.title, scenario.run, scenario.instruction)
		const row = page.getByRole('button', { name: new RegExp(`Open ${scenario.id}`) })
		await row.waitFor({ state: 'visible', timeout: 30000 })
		await row.click()
		await page
			.getByRole('heading', { name: scenario.title })
			.waitFor({ state: 'visible', timeout: 15000 })
		await shot(page, `${scenario.lane}-open`)
		// A6 closed: the OPEN viewer's own badge is now the awaited terminal signal. E1's film had
		// to trust the rail because the header lagged forever; the header is now the honest surface.
		await page
			.getByText('Run finished', { exact: true })
			.waitFor({ state: 'visible', timeout: scenario.cap })
		// A7 closed: the settlement card states the recorded answer. Only lanes whose executor
		// emits a settlement record carry the card — the ollama agent lane records activity
		// only, so the sentence is asserted where the card exists.
		await page.waitForTimeout(1200)
		const settlements = await page.getByRole('log').getByText('settlement', { exact: true }).count()
		if (settlements > 0) {
			await page
				.getByText(/Completed:/)
				.first()
				.waitFor({ state: 'visible', timeout: 15000 })
			console.log(`lane ${scenario.lane}: settlement card states its outcome`)
		} else {
			console.log(`lane ${scenario.lane}: no settlement record on this lane's arc`)
		}
		await shot(page, `${scenario.lane}-finished`)
		// A9 closed (CLI lanes carry a transcript): disclose the first labelled row.
		const fold = page.locator('details > summary').first()
		if (await fold.count()) {
			await fold.click()
			await page.waitForTimeout(400)
			await shot(page, `${scenario.lane}-disclosed`)
			await fold.click()
		}
		console.log(`lane ${scenario.lane} finished on film`)
	}
	await page.getByRole('button', { name: 'History' }).click()
	await page.getByRole('heading', { name: 'Completed history' }).waitFor({ state: 'visible' })
	await page.waitForTimeout(500)
	await shot(page, 'history-all-four')

	// A8 closed: a second server whose agent lane aims at a dead endpoint through the policy's
	// own knob. The launch fails fast, the task is named failed at every tier, and the workflow's
	// completed verdict carries the qualification.
	console.log('--- failure pass (A8) ---')
	const failurePort = await reservePort()
	const failureOrigin = `http://127.0.0.1:${String(failurePort)}`
	const failureServer = launchServer(failurePort, { APP_AGENT_URL: 'http://127.0.0.1:9' })
	try {
		await waitForServer(failureOrigin)
		const failurePage = await context.newPage()
		await arrive(failurePage, failureOrigin)
		await start(
			failureOrigin,
			'doomed-launch',
			'Doomed launch',
			'agent',
			'This launch cannot reach its provider.',
		)
		const doomed = failurePage.getByRole('button', { name: /Open doomed-launch/ })
		await doomed.waitFor({ state: 'visible', timeout: 30000 })
		await doomed.click()
		await failurePage
			.getByRole('heading', { name: 'Doomed launch' })
			.waitFor({ state: 'visible', timeout: 15000 })
		// The workflow completes around the failed task; the verdict-omission sentence renders.
		await failurePage
			.getByText(/failed, and this run continued past it/)
			.waitFor({ state: 'visible', timeout: 60000 })
		await failurePage.waitForTimeout(800)
		await shot(failurePage, 'failed-launch-named')
		await failurePage.close()
		console.log('failure pass filmed')
	} finally {
		failureServer.kill()
	}
} finally {
	await browser.close()
	server.kill()
}
console.log('E1 re-film done')
