// Orchestrator probe against the contract checkout's BUILT declaration after ISINSTANCE-FIX: every
// consumer narrowing the published signature refused must compile, and the non-constructor line must
// still produce exactly one diagnostic.
import { isInstance, instanceOf } from '../../../../../../../WebstormProjects/contract/dist/src/core/index.js'

declare const maybe: Element | null
declare const unknownValue: unknown
declare const rootValue: string | URL

export function acceptedHost(): HTMLElement | undefined {
	if (isInstance(maybe, HTMLElement)) return maybe
	return undefined
}
export function acceptedFalseBranch(): Element | null {
	if (isInstance(maybe, HTMLElement)) return undefined as unknown as Element | null
	return maybe
}
export function acceptedCombinator(): HTMLElement | undefined {
	if (instanceOf(HTMLElement)(maybe)) return maybe
	return undefined
}
abstract class Shape {
	abstract area(): number
}
class Point {
	constructor(readonly x: number, readonly y: number) {}
}
export function acceptedAbstract(): Shape | undefined {
	if (isInstance(unknownValue, Shape)) return unknownValue
	return undefined
}
export function acceptedArguments(): Point | undefined {
	if (isInstance(unknownValue, Point)) return unknownValue
	return undefined
}
export function acceptedTernary(): string {
	return isInstance(rootValue, URL) ? rootValue.href : rootValue
}
export function acceptedPredicateWrapper(value: unknown): value is Date {
	return isInstance(value, Date)
}
export const refusedNotConstructor = isInstance(unknownValue, {})
