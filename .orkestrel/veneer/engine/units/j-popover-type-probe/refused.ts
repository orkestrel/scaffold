import { Tooltip } from '../../../src/browser/index.js'

const host = document.createElement('button')
export const tooltip = new Tooltip(host, { content: 'Body' })
export const typo = new Tooltip(host, { titel: 'Head' })
