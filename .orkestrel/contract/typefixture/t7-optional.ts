// Tier 7: a wide object carrying optionalShape members - the key-remapped branch of
// InferObject (required map + optional map + open-index intersection) no other tier reaches.
import type { Infer } from '@orkestrel/contract'
import { booleanShape, integerShape, objectShape, optionalShape, stringShape } from '@orkestrel/contract'

export const profile = objectShape({
	alpha: stringShape(), bravo: optionalShape(stringShape()), charlie: stringShape(),
	delta: optionalShape(integerShape()), echo: integerShape(), foxtrot: optionalShape(booleanShape()),
	golf: booleanShape(), hotel: optionalShape(stringShape()), india: stringShape(),
	juliett: optionalShape(integerShape()), kilo: integerShape(), lima: optionalShape(booleanShape()),
	mike: booleanShape(), november: optionalShape(stringShape()), oscar: stringShape(),
	papa: optionalShape(integerShape()), quebec: integerShape(), romeo: optionalShape(booleanShape()),
	sierra: booleanShape(), tango: optionalShape(stringShape()),
})

export type ProfileValue = Infer<typeof profile>
export const profileValue: ProfileValue = {
	alpha: 'a', charlie: 'c', echo: 5, golf: true, india: 'i', kilo: 11, mike: false,
	oscar: 'o', quebec: 17, sierra: true,
	bravo: 'b', delta: 4, foxtrot: false,
}
