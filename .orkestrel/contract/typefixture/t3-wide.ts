// Tier 3: one wide object shape (30 keys) plus Infer and a value in the inferred type.
import type { Infer } from '@orkestrel/contract'
import { booleanShape, integerShape, objectShape, stringShape } from '@orkestrel/contract'

export const wide = objectShape({
	alpha: stringShape(), bravo: stringShape(), charlie: stringShape(), delta: stringShape(),
	echo: stringShape(), foxtrot: stringShape(), golf: stringShape(), hotel: stringShape(),
	india: stringShape(), juliett: stringShape(), kilo: integerShape(), lima: integerShape(),
	mike: integerShape(), november: integerShape(), oscar: integerShape(), papa: integerShape(),
	quebec: booleanShape(), romeo: booleanShape(), sierra: booleanShape(), tango: booleanShape(),
	uniform: stringShape(), victor: stringShape(), whiskey: stringShape(), xray: stringShape(),
	yankee: stringShape(), zulu: stringShape(), aden: integerShape(), basel: integerShape(),
	cairo: booleanShape(), dover: stringShape(),
})

export type WideValue = Infer<typeof wide>
export const wideValue: WideValue = {
	alpha: 'a', bravo: 'b', charlie: 'c', delta: 'd', echo: 'e', foxtrot: 'f', golf: 'g',
	hotel: 'h', india: 'i', juliett: 'j', kilo: 1, lima: 2, mike: 3, november: 4, oscar: 5,
	papa: 6, quebec: true, romeo: false, sierra: true, tango: false, uniform: 'u', victor: 'v',
	whiskey: 'w', xray: 'x', yankee: 'y', zulu: 'z', aden: 7, basel: 8, cairo: true, dover: 'd',
}
