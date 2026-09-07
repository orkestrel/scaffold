import { createGuide } from '@orkestrel/guide'
const table = '### Classes\n\n| API | Kind | Summary |\n| --- | --- | --- |\n| `MCPServer` | class | Row summary. |\n'
const heads = [
  '### Bind an `MCPServer` / `MCPClient` to any duplex transport',
  '### Bind an `MCPClient` / `MCPServer` to any duplex transport',
  '### `MCPServer`',
  '### Compose `MCPServer` with something',
  '### Bind an MCPServer to any duplex transport',
]
for (const h of heads) {
  const g = createGuide('# T\n\n> tag\n\n## Surface\n\n' + h + '\n\nprose\n\n' + table)
  console.log(JSON.stringify(g.surface()), '<<', h)
}
