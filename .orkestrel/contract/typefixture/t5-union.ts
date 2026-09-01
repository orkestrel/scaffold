// Tier 5: a union of 8 tagged object variants plus Infer and a value per variant.
import type { Infer } from '@orkestrel/contract'
import { integerShape, literalShape, objectShape, stringShape, unionShape } from '@orkestrel/contract'

export const events = unionShape(
	objectShape({ via: literalShape(['create']), name: stringShape() }),
	objectShape({ via: literalShape(['rename']), name: stringShape(), previous: stringShape() }),
	objectShape({ via: literalShape(['move']), destination: stringShape() }),
	objectShape({ via: literalShape(['copy']), destination: stringShape(), source: stringShape() }),
	objectShape({ via: literalShape(['remove']), reason: stringShape() }),
	objectShape({ via: literalShape(['archive']), until: integerShape() }),
	objectShape({ via: literalShape(['restore']), from: integerShape() }),
	objectShape({ via: literalShape(['audit']), actor: stringShape(), scope: stringShape() }),
)

export type EventValue = Infer<typeof events>
export const created: EventValue = { via: 'create', name: 'ledger' }
export const moved: EventValue = { via: 'move', destination: 'north' }
export const audited: EventValue = { via: 'audit', actor: 'ada', scope: 'ledger' }
