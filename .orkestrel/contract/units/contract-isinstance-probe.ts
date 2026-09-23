// Orchestrator probe: does `isInstance` as published (0.0.17) narrow to the constructor's instance
// type, and does the candidate signature? Each `refused*` line must produce exactly one diagnostic;
// each `accepted*` line none.
import { isInstance, instanceOf } from '../../../../../../../WebstormProjects/veneer/node_modules/@orkestrel/contract/dist/src/core/index.js'

type AnyConstructor<T = unknown> = new (...args: unknown[]) => T
declare function published<C>(value: unknown, ctor: C): value is InstanceType<C & AnyConstructor<object>>
declare function candidate<C extends abstract new (...args: never) => object>(value: unknown, ctor: C): value is InstanceType<C>

declare const maybe: Element | null
declare const unknownValue: unknown

// The published signature: narrowing to `object`, so the HTMLElement assignment is refused.
export function refusedPublished(): HTMLElement | undefined {
	if (isInstance(maybe, HTMLElement)) return maybe
	return undefined
}
export function refusedLocalPublished(): HTMLElement | undefined {
	if (published(maybe, HTMLElement)) return maybe
	return undefined
}

// The combinator narrows correctly today.
export function acceptedCombinator(): HTMLElement | undefined {
	if (instanceOf(HTMLElement)(maybe)) return maybe
	return undefined
}

// The candidate signature narrows to the instance type, for a concrete class, an abstract class,
// a class with required constructor arguments, and an unknown value.
abstract class Shape {
	abstract area(): number
}
class Point {
	constructor(readonly x: number, readonly y: number) {}
}
export function acceptedCandidate(): HTMLElement | undefined {
	if (candidate(maybe, HTMLElement)) return maybe
	return undefined
}
export function acceptedAbstract(): Shape | undefined {
	if (candidate(unknownValue, Shape)) return unknownValue
	return undefined
}
export function acceptedArguments(): Point | undefined {
	if (candidate(unknownValue, Point)) return unknownValue
	return undefined
}
export function acceptedDate(): Date | undefined {
	if (candidate(unknownValue, Date)) return unknownValue
	return undefined
}
// A non-constructor is refused at the call, as the constraint requires.
export const refusedNotConstructor = candidate(unknownValue, {})
