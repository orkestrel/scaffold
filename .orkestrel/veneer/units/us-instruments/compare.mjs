// Compares the gap-family rules of the baseline and the built cascade, and checks the built gap and
// column-gap rules against the pinned inventory.
import { readFileSync } from 'node:fs'
import postcss from 'postcss'
function collect(path) {
  const root = postcss.parse(readFileSync(path, 'utf8'))
  const rules = []
  root.walkRules((rule) => {
    let condition = ''
    for (let node = rule.parent; node && node.type !== 'root'; node = node.parent)
      if (node.type === 'atrule' && node.name === 'media') condition = node.params
    const decls = []
    rule.walkDecls((d) => decls.push(`${d.prop}:${d.value}${d.important ? '!important' : ''}`))
    for (const selector of rule.selectors) rules.push({ selector, condition, decls: decls.join(';') })
  })
  return rules
}
const family = /^\.(g|gx|gy|row-gap|gap|column-gap)(-(sm|md|lg|xl|xxl))?-[0-5]$/
const base = collect('tmp/probe/base/index.css').filter((r) => family.test(r.selector))
const built = collect('dist/src/styles/index.css').filter((r) => family.test(r.selector))
const key = (r) => `${r.condition}|${r.selector}|${r.decls}`
const builtKeys = new Set(built.map(key))
const baseKeys = new Set(base.map(key))
console.log('baseline family rules', base.length, 'built family rules', built.length)
console.log('baseline rules missing or changed in build:', base.filter((r) => !builtKeys.has(key(r))).map(key))
const added = built.filter((r) => !baseKeys.has(key(r)))
console.log('added rules by key:', Object.entries(added.reduce((a, r) => { const k = r.selector.match(family)[1]; a[k] = (a[k] ?? 0) + 1; return a }, {})))
const inv = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const toWidth = (c) => (c.match(/(\d+)px/) ?? [])[1]
for (const component of ['gap', 'column-gap', 'row-gap']) {
  const recorded = inv.components[component].selectors
  const problems = []
  for (const s of recorded) {
    const width = s.condition ? toWidth(s.condition) : undefined
    const match = built.filter((r) => r.selector === s.selector && toWidth(r.condition) === width)
    const prop = component
    if (match.length !== 1) problems.push(`${s.selector} ${s.condition ?? ''} found ${match.length}`)
    else if (match[0].decls !== `${prop}:var(--vn-gap-${s.selector.slice(-1)})!important`) problems.push(`${s.selector} ${match[0].decls}`)
  }
  const extra = built.filter((r) => r.selector.match(family)[1] === component && !recorded.some((s) => s.selector === r.selector))
  console.log(component, 'recorded', recorded.length, 'problems', problems, 'extra', extra.length)
}
