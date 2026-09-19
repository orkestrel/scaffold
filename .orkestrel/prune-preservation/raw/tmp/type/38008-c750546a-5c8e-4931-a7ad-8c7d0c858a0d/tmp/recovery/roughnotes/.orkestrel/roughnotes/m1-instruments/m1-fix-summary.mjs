import { readFileSync, writeFileSync } from 'node:fs'
const path = 'vite.config.ts'
const raw = readFileSync(path, 'utf8')
const old = ' * Builds the Vitest project that drives every journey at one variant.'
const next = ' * Builds the Vitest project that runs the browser walkthrough suite at one variant.'
if (!raw.includes(old)) throw new Error('summary not found')
writeFileSync(path, raw.replace(old, next))
console.log('rewrote the journey summary')
