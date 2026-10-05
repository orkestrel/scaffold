import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { isRecord } from '@orkestrel/contract'

export function readJSON(path: string): Record<string, unknown> {
 const value: unknown = JSON.parse(readFileSync(path, 'utf8'))
 if (isRecord(value)) return value
 throw new Error('Expected object: ' + path)
}
export function readRows(value: unknown): readonly Record<string, unknown>[] {
 if (Array.isArray(value) && value.every(isRecord)) return value
 throw new Error('Expected record array')
}
export function readText(value: unknown): string {
 if (typeof value === 'string') return value
 throw new Error('Expected string: ' + JSON.stringify(value))
}
export function readStrings(value: unknown): readonly string[] {
 if (Array.isArray(value) && value.every(entry => typeof entry === 'string')) return value
 throw new Error('Expected string array')
}
export function expandHex(value: string): string {
 const digits = value.replace(/^#|^%23/, '').toLowerCase()
 return '#' + (digits.length === 3 ? [...digits].map(digit => digit + digit).join('') : digits)
}
export function readChannels(value: string): readonly number[] {
 if (value.startsWith('#')) return [1, 3, 5].map(index => parseInt(expandHex(value).slice(index, index + 2), 16))
 const channels = value.match(/[-+]?\d*\.?\d+(?:e[-+]?\d+)?%?/gi) ?? []
 return channels.map(channel => parseFloat(channel) * (channel.endsWith('%') ? 2.55 : 1))
}
export function encodeHex(channels: readonly number[]): string {
 return '#' + channels.slice(0, 3).map(channel => Math.round(Math.max(0, Math.min(255, channel)) + 1e-10).toString(16).padStart(2, '0')).join('')
}
export function mixColor(first: string, second: string, weight: number): string {
 const back = readChannels(second)
 return encodeHex(readChannels(first).map((channel, index) => channel * weight / 100 + (back[index] ?? 0) * (1 - weight / 100)))
}
export function computeRatio(front: string, back: string, alpha = 1): number {
 const bg = readChannels(back)
 const fg = readChannels(front)
 const luminances = [fg.map((channel, index) => channel * alpha + (bg[index] ?? 0) * (1 - alpha)), bg].map(channels => channels.reduce((sum, channel, index) => {
  const normalized = channel / 255
  return sum + (normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4) * ([0.2126, 0.7152, 0.0722][index] ?? 0)
 }, 0))
 return (Math.max(...luminances) + 0.05) / (Math.min(...luminances) + 0.05)
}
export function computeDigest(value: string): string {
 return createHash('sha256').update(value).digest('hex')
}
export function writeJSON(path: string, value: unknown): void {
 writeFileSync(path, JSON.stringify(value, null, '\t') + '\n')
}
