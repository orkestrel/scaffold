// Tier 4: nesting depth 8 plus Infer and a value in the inferred type.
import type { Infer } from '@orkestrel/contract'
import { integerShape, objectShape, stringShape } from '@orkestrel/contract'

export const nested = objectShape({
	level1: objectShape({
		level2: objectShape({
			level3: objectShape({
				level4: objectShape({
					level5: objectShape({
						level6: objectShape({
							level7: objectShape({
								level8: objectShape({ label: stringShape(), count: integerShape() }),
							}),
						}),
					}),
				}),
			}),
		}),
	}),
})

export type NestedValue = Infer<typeof nested>
export const nestedValue: NestedValue = {
	level1: { level2: { level3: { level4: { level5: { level6: { level7: { level8: { label: 'leaf', count: 8 } } } } } } } },
}
