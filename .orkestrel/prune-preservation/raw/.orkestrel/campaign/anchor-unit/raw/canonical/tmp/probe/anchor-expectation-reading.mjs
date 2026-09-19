import { lstatSync } from 'node:fs'
import { readExpectation } from '../release/scaffold-0.0.75/dist/src/server/index.js'
const observed = readExpectation(process.cwd())
const native = lstatSync(process.cwd(), { bigint: true })
process.stdout.write(`${JSON.stringify({ cwd: process.cwd(), shape: observed?.shape, expectation: { device: typeof observed?.device, inode: typeof observed?.inode }, native: { device: typeof native.dev, inode: typeof native.ino } })}\n`)
