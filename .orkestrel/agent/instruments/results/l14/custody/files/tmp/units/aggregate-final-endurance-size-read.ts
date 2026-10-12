import { resolve } from 'node:path'
import { DEFAULT_LEDGER_LIMIT } from '../../.orkestrel/agent/instruments/harness/.build/vendor/agent-0.0.30-trimmed/index.js'
import { TIMEOUT } from '../../.orkestrel/agent/instruments/harness/.build/bench5/constants.js'
import { readRuntime } from '../../.orkestrel/agent/instruments/harness/.build/bench5/endurance/helpers.js'

const runtime = readRuntime(resolve(process.cwd(), '.orkestrel/agent/instruments/units/aggregates/endurance/runtime/development.json'))
process.stdout.write(`${JSON.stringify({ seedMessages: runtime.seed.length, goals: runtime.goals.length, topics: runtime.topics.length, timeoutMs: TIMEOUT, defaultLedgerLimit: DEFAULT_LEDGER_LIMIT })}\n`)
