// Remove the named packages from the unruled set in the conformance ledger. Usage: node remaining.mjs <pkg>...
import { readFileSync, writeFileSync } from 'node:fs'
const path = '/home/user/scaffold/.orkestrel/campaign/conform/ledgers/remaining.json'
const done = new Set(process.argv.slice(2))
const remaining = JSON.parse(readFileSync(path, 'utf8')).filter((entry) => !done.has(entry.name))
writeFileSync(path, JSON.stringify(remaining))
