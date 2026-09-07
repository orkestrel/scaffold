import { createGuide } from '@orkestrel/guide'
const base = '# T\n\n> tag\n\n## Surface\n\n### Classes\n\n| API | Kind | Summary |\n| --- | --- | --- |\n| `MCPServer` | class | Row summary. |\n'
const heads = [
  '### Bind an `MCPServer` / `MCPClient` to any duplex transport',
  '### `MCPServer`',
  '### Bind an MCPServer to any duplex transport',
  '### Compose `MCPServer`',
]
for (const h of heads) {
  const g = createGuide(base + '\n' + h + '\n\nprose\n')
  console.log(JSON.stringify(g.surface()), '<<', h)
}
