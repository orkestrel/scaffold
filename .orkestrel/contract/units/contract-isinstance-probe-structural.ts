// Orchestrator probe against the contract checkout's BUILT declaration: the false branch of a
// predicate drops each union member assignable to the instance type, so a structurally identical
// subclass narrows its base out (the Astra lane's counterexample), while a subclass that adds a
// member keeps the base; and `Function` admits no primitive, so its false branch keeps `string`.
import { isInstance } from '../../../../../../../WebstormProjects/contract/dist/src/core/index.js'

class Base {
	readonly base = true
}
class Same extends Base {}
class Derived extends Base {
	readonly derived = true
}
declare const value: Base | null
declare const mixed: string | Date

export function sameFalseBranch(): null {
	if (isInstance(value, Same)) return null
	return value // the false branch is `null`: `Base` is assignable to `Same`
}
export function derivedFalseBranch(): Base | null {
	if (isInstance(value, Derived)) return null
	return value // the false branch keeps `Base | null`
}
export function functionFalseBranch(): string | Date {
	if (isInstance(mixed, Function)) return new Date(0)
	return mixed // `string` survives: no primitive is assignable to `Function`
}
export function objectFalseBranch(): never {
	if (isInstance(mixed, Object)) return undefined as never
	return mixed // the false branch is `never`: `string` and `Date` are both assignable to `Object`
}
