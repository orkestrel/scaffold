// Orchestrator probe against the contract checkout's BUILT declaration, settling the round-2
// objective lane's claim 2: a subclass that adds only an optional member is assignable-from its
// base (the control compiles) but is not a supertype by the subtype relation, so the false branch
// of `isInstance(value, Tagged)` over `Base | null` keeps `Base | null` rather than dropping to
// `null`. Every line must compile with no diagnostic.
import { isInstance } from '../../../../../../../WebstormProjects/contract/dist/src/core/index.js'

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
type Expect<T extends true> = T

class Base {
	readonly base = true
}
class Tagged extends Base {
	readonly tag?: string
}
declare const value: Base | null

export const assignable: Tagged = new Base() // the control: Base is assignable to Tagged

export function falseBranch(): void {
	if (isInstance(value, Tagged)) {
		type True = Expect<Equal<typeof value, Tagged>>
	} else {
		type False = Expect<Equal<typeof value, Base | null>>
	}
}
