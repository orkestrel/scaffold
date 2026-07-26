import { createContract } from '@orkestrel/contract'
import { materializerOptionsShape, syncOptionsShape } from './shapers.js'

/** The compiled, closed data-only `SyncOptions` contract. */
export const syncOptionsContract = createContract(syncOptionsShape())

/** The compiled, closed data-only `MaterializerOptions` contract. */
export const materializerOptionsContract = createContract(materializerOptionsShape())
