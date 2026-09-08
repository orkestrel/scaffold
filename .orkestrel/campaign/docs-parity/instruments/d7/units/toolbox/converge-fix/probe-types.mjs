// Prints the checker's declared type for each exported shape const, truncated to its outer generic head.
import ts from 'typescript'

const program = ts.createProgram(['src/core/shapers.ts'], {
	target: ts.ScriptTarget.ESNext,
	module: ts.ModuleKind.ESNext,
	moduleResolution: ts.ModuleResolutionKind.Bundler,
	strict: true,
	skipLibCheck: true,
})
const checker = program.getTypeChecker()
const source = program.getSourceFile('src/core/shapers.ts')
for (const statement of source.statements) {
	if (!ts.isVariableStatement(statement)) continue
	if (!statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) continue
	for (const declaration of statement.declarationList.declarations) {
		const type = checker.getTypeAtLocation(declaration.name)
		console.log(`${declaration.name.getText(source)}\t${checker.typeToString(type).slice(0, 120)}`)
	}
}
