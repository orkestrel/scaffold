// Reads back each added specimen's serialized markup and element names from Chromium's parser.
import { chromium } from '/home/user/veneer-eic/node_modules/playwright/index.mjs'
const markups = [
	'<a href="#main"><code>answer</code></a>',
	'<pre><code>const answer = 42\nconsole.log(answer)</code></pre>',
	'<kbd><kbd>Ctrl</kbd> + <kbd>S</kbd></kbd>',
]
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
for (const markup of markups) {
	const reading = await page.evaluate((m) => {
		const host = document.createElement('div')
		host.innerHTML = m
		return { same: host.innerHTML === m, names: [...host.querySelectorAll('*')].map((n) => n.localName) }
	}, markup)
	console.log(JSON.stringify({ markup, ...reading }))
}
await browser.close()
