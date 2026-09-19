import { readFileSync, writeFileSync } from 'node:fs'

const tokens = readFileSync('app/browser/styles/_tokens.scss', 'utf8')
const variables = [...tokens.matchAll(/^\$([\w-]+):/gm)].map(match => match[1])
writeFileSync('app/browser/styles/index.scss', `@use 'tokens';\n@use 'bootstrap/scss/bootstrap' with (\n${variables.map(name => `\t$${name}: tokens.$${name},`).join('\n')}\n\t$box-shadow-sm: var(--rn-shadow),\n\t$box-shadow: var(--rn-shadow-md),\n\t$box-shadow-lg: var(--rn-shadow-lg),\n\t$card-box-shadow: var(--rn-shadow),\n\t$offcanvas-box-shadow: var(--rn-shadow-md),\n\t$utilities: (\n\t\t'figures': (\n\t\t\tproperty: font-variant-numeric,\n\t\t\tclass: figures,\n\t\t\tvalues: (tabular: tabular-nums),\n\t\t),\n\t),\n);\n@use 'theme';\n@use 'signature';\n`)
