import { createGuide } from '@orkestrel/guide'
const mk = (cell) => `# T\n\n> tag\n\n## Surface\n\n### Classes\n\n| API | Kind | Summary |\n| --- | --- | --- |\n| \`MCPServer\` | class | ${cell} |\n`
for (const cell of [
  'Dispatches JSON-RPC 2.0 requests over a live `ToolManagerInterface`, with NO transport coupling.',
  'Dispatches JSON-RPC 2.0 requests over a live `ToolManagerInterface`.',
  'Dispatches JSON-RPC requests over a live `ToolManagerInterface`, with NO transport coupling.',
  'Dispatches JSON-RPC 2.0 requests.',
  'Plain summary text.',
]) {
  const g = createGuide(mk(cell))
  console.log(JSON.stringify(g.surface()), '<<', cell.slice(0,40))
}
