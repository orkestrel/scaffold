import { Popover, Tooltip } from '../../../src/browser/index.js'
import type { PopoverOptions } from '../../../src/browser/types.js'

const host = document.createElement('button')
export const popover = new Popover(host, { content: 'Body', title: 'Head' })
export const tooltip = new Tooltip(host, { title: 'Head' })
const wide: PopoverOptions = { content: 'Body' }
export const widened = new Tooltip(host, wide)
