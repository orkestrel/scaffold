// Probe: drive TypeScript 7.0.2's unstable sync API over scaffold's core project, walk one source file with the
// unstable/ast guards, and read documentation comments and JSDoc tags through the checker's symbols.
import { API } from 'typescript/unstable/sync'
import * as ast from 'typescript/unstable/ast'
const t0 = Date.now()
const CONFIG = '/home/user/scaffold/configs/src/tsconfig.core.json'
const api = new API({ cwd: '/home/user/scaffold' })
const snapshot = api.updateSnapshot({ openProjects: [CONFIG] })
const project = snapshot.getProject(CONFIG) ?? snapshot.getProjects()[0]
console.log('projects:', snapshot.getProjects().length, 'project:', project && project.configFileName, 'rootFiles:', project && project.rootFiles.length, 'ms:', Date.now() - t0)
const program = project.program
console.log('sourceFileNames:', program.getSourceFileNames().length)
const FILE = '/home/user/scaffold/src/core/factories.ts'
const sf = program.getSourceFile(FILE)
console.log('sourceFile keys:', sf ? Object.keys(sf).slice(0, 15).join(',') : 'none', 'statements:', sf?.statements?.length)
const fns = sf.statements.filter((s) => ast.isFunctionDeclaration(s) && s.name).map((s) => s.name.text)
console.log('function declarations:', fns.length, fns.slice(0, 5).join(','))
const st = sf.statements.find((s) => ast.isFunctionDeclaration(s) && s.name?.text === 'createBlueprint')
console.log('node keys:', Object.keys(st).join(','))
console.log('ast.getJSDocTags:', typeof ast.getJSDocTags, 'ast.getJSDocCommentsAndTags:', typeof ast.getJSDocCommentsAndTags, 'ast.getLeadingCommentRanges:', typeof ast.getLeadingCommentRanges)
if (typeof ast.getJSDocTags === 'function') console.log('node tags:', ast.getJSDocTags(st).map((t) => t.tagName?.text).join(','))
if (typeof ast.getJSDocCommentsAndTags === 'function') { const c = ast.getJSDocCommentsAndTags(st); console.log('comments+tags:', c.length, c.map((x) => ast.SyntaxKind[x.kind]).join(',')) }
const checker = project.checker
const sym = checker.getSymbolAtLocation(st.name)
console.log('symbol:', sym ? 'ok' : 'none', 'symbol proto:', sym && Object.getOwnPropertyNames(Object.getPrototypeOf(sym)).join(','))
if (sym) {
  const doc = sym.getDocumentationComment(checker)
  console.log('documentation:', JSON.stringify(doc).slice(0, 220))
  const tags = sym.getJsDocTags(checker)
  console.log('tags:', tags.map((t) => t.name + (t.text ? '=' + JSON.stringify(t.text).slice(0, 60) : '')).join(' | '))
}
console.log('semantic diagnostics (file):', program.getSemanticDiagnostics(FILE).length)
console.log('emitter proto:', Object.getOwnPropertyNames(Object.getPrototypeOf(project.emitter)).join(','))
console.log('total ms:', Date.now() - t0)
snapshot.dispose(); api.close()
