import { writeFileSync } from 'node:fs'

const marker = process.env.ROUGHNOTES_GATES_CONTROL_MARKER

if (typeof marker !== 'string' || marker.length === 0) throw new Error('Control successor marker is unavailable')
writeFileSync(marker, 'control successor executed\n', { flag: 'wx' })
process.stdout.write('roughnotes-gates-control-successor\n')
