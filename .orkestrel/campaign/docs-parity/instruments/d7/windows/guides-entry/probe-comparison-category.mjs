import assert from 'node:assert/strict'
import { collectTitles, computeDrift, createGuide, createSource, findDrift } from '@orkestrel/guide'

function categorize(markdown, sourceText) {
  const files = { 'src/core/index.ts': "export * from './shape.js'\n", 'src/core/shape.ts': sourceText }
  const guide = createGuide(markdown)
  const source = createSource({ files, module: 'src/core' })
  const drifts = findDrift(guide, source)
  const titles = collectTitles(guide, source)
  const seen = new Set()
  let examples = 0
  for (const fence of guide.fences()) {
    if (fence.title === undefined || seen.has(fence.title)) continue
    seen.add(fence.title)
    const example = titles.get(fence.title)
    if (example === undefined) continue
    if (computeDrift(fence.title, `${fence.language ?? ''}\n${fence.code}`, `${example.language ?? ''}\n${example.code}`) !== undefined) examples += 1
  }
  return drifts.map((drift, index) => ({ category: index < drifts.length - examples ? 'summary' : 'example', key: drift.key }))
}

const source = '/**\n * Shapes a widget.\n *\n * @example function shape\n * ```ts\n * shape("source")\n * ```\n */\nexport function shape(value: string): string { return value }\n'
const base = '# Widget\n\n## Surface\n\n| Name | Kind | Summary |\n| --- | --- | --- |\n| `shape` | function | Shapes a widget. |\n\n## Examples\n\n### function shape\n\n```ts\nshape("source")\n```\n'
assert.deepEqual(categorize(base, source), [])
assert.deepEqual(categorize(base.replace('Shapes a widget.', 'Shapes a guide.'), source), [{ category: 'summary', key: 'function shape' }])
assert.deepEqual(categorize(base.replace('shape("source")', 'shape("guide")'), source), [{ category: 'example', key: 'function shape' }])
assert.deepEqual(categorize(base.replace('Shapes a widget.', 'Shapes a guide.').replace('shape("source")', 'shape("guide")'), source), [{ category: 'summary', key: 'function shape' }, { category: 'example', key: 'function shape' }])
assert.deepEqual(categorize(base + '\n### function shape\n\n```ts\nshape("later")\n```\n', source), [])
assert.deepEqual(categorize(base.replace('```ts', '```'), source.replace('```ts', '```')), [])
assert.deepEqual(categorize(base.replaceAll('\n', '\r\n'), source.replaceAll('\n', '\r\n')), [])
assert.deepEqual(categorize(base.replace('```ts\nshape("source")\n```', '> ```ts\n> shape("guide")\n> ```'), source), [{ category: 'example', key: 'function shape' }])
process.stdout.write('comparison category controls passed\n')
