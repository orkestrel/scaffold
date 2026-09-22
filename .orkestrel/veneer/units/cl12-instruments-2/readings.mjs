import assert from 'node:assert/strict'
import { readFileSync, writeFileSync } from 'node:fs'
import { parse } from 'postcss'
import { createGuide, selectSectionBlocks } from '@orkestrel/guide'
import { createMarkdown } from '@orkestrel/markdown'

const guide = readFileSync('guides/veneer.md', 'utf8')
const css = parse(readFileSync('dist/src/styles/index.css', 'utf8'))
const caps = []
const fluid = []
css.walkRules((rule) => {
  if (rule.selector.includes('.container-fluid')) fluid.push(rule.toString())
  rule.walkDecls('max-inline-size', (declaration) => {
    if (rule.selectors.includes('.container')) caps.push({ media: rule.parent.params, selectors: rule.selectors, value: declaration.value })
  })
})
const names = ['sm', 'md', 'lg', 'xl', 'xxl']
const boundaries = [576, 768, 992, 1200, 1400]
assert.equal(caps.length, names.length)
for (const [index, name] of names.entries()) {
  assert.deepEqual(caps[index], {
    media: '(width>=' + boundaries[index] + 'px)',
    selectors: ['.container', ...names.slice(0, index + 1).map((entry) => '.container-' + entry)],
    value: 'var(--vn-container-' + name + ')',
  })
}
console.log('Container cap rules: ' + JSON.stringify(caps))
console.log('Every rule mentioning .container-fluid: ' + JSON.stringify(fluid))
assert.equal(fluid.length > 0, true)
assert.equal(fluid.some((rule) => /max-(?:inline-size|width):/.test(rule)), false)
assert.equal(caps.some((rule) => rule.selectors.includes('.container-fluid')), false)

const inventory = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const vocabulary = Object.values(inventory.components).flatMap((component) => [...component.selectors.map((entry) => entry.selector), ...Object.keys(component.properties)])
for (const name of ['scroll-padding', 'hint', 'The hint surface and the component-scoped tokens']) {
  assert.equal(vocabulary.includes(name), false)
  console.log('Pinned inventory membership ' + name + ': false')
}
assert.equal(vocabulary.includes('.container'), true)

function project(text) {
  const parsed = createMarkdown(text).document
  const publicGuide = createGuide(text)
  return {
    styles: selectSectionBlocks(parsed, 'Styles'),
    compatibility: selectSectionBlocks(parsed, 'Compatibility'),
    surface: publicGuide.surface(),
    methods: publicGuide.methods(),
    fences: publicGuide.fences(),
  }
}

const baselinePath = 'tmp/cl12-2/guide-before.md'
if (process.argv.includes('--baseline')) {
  writeFileSync(baselinePath, guide)
  console.log('Saved authored round-1 guide baseline')
} else {
  const baseline = readFileSync(baselinePath, 'utf8')
  assert.deepEqual(project(guide), project(baseline))
  assert.notDeepEqual(project(guide.replace('### Deferred selectors', '### Withheld selectors')), project(baseline))
  console.log('Reader projections unchanged; changed Styles heading negative control differs')
  const baselineTables = baseline.split(/\r\n|\n/).filter((line) => line.startsWith('|'))
  const guideTables = guide.split(/\r\n|\n/).filter((line) => line.startsWith('|'))
  assert.deepEqual(guideTables, baselineTables)
  console.log('Every table row byte unchanged from authored round-1 guide')
}
