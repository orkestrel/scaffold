// Renders each exported shape const in src/core/shapers.ts as its declared type in Ruling 25's form.
// Syntax supplies the member order and the outer generic; the checker supplies optionality and the
// single-literal discriminant, so a member reached through a named shape value is still read right.
import ts from 'typescript'

const file = 'src/core/shapers.ts'
const program = ts.createProgram([file], {
	target: ts.ScriptTarget.ESNext,
	module: ts.ModuleKind.ESNext,
	moduleResolution: ts.ModuleResolutionKind.Bundler,
	strict: true,
	skipLibCheck: true,
})
const checker = program.getTypeChecker()
const source = program.getSourceFile(file)

const NULLARY = new Map([
	['stringShape', 'StringShape'],
	['numberShape', 'NumberShape'],
	['integerShape', 'NumberShape'],
	['booleanShape', 'BooleanShape'],
	['jsonShape', 'JSONShape'],
])

function typeText(node) {
	return checker.typeToString(checker.getTypeAtLocation(node))
}

function isOptional(node) {
	return typeText(node).startsWith('OptionalShape<')
}

function discriminant(node) {
	const match = /^LiteralShape<readonly \["([^"]*)"\]>$/.exec(typeText(node))
	return match === null ? undefined : `'${match[1]}'`
}

function members(objectLiteral) {
	return objectLiteral.properties
		.filter((p) => ts.isPropertyAssignment(p))
		.map((p) => {
			const name = p.name.getText(source)
			const literal = discriminant(p.initializer)
			if (literal !== undefined) return `${name}: ${literal}`
			return `${name}${isOptional(p.initializer) ? '?' : ''}`
		})
		.join(', ')
}

function literals(arrayLiteral) {
	return arrayLiteral.elements.map((e) => e.getText(source).replaceAll('"', "'")).join(' \\| ')
}

function render(node) {
	if (ts.isIdentifier(node)) return node.text
	if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression)) return `?? ${node.getText(source).slice(0, 40)}`
	const callee = node.expression.text
	const args = node.arguments
	if (NULLARY.has(callee)) return NULLARY.get(callee)
	if (callee === 'objectShape') return `ObjectShape<{ ${members(args[0])} }>`
	if (callee === 'recordShape') return `ObjectShape<Record<never, never>, ${render(args[0])}>`
	if (callee === 'literalShape') return `LiteralShape<${literals(args[0])}>`
	if (callee === 'arrayShape') return `ArrayShape<${render(args[0])}>`
	if (callee === 'optionalShape') return `OptionalShape<${render(args[0])}>`
	if (callee === 'unionShape') return `UnionShape<[${args.map(renderArm).join(', ')}]>`
	return `?? ${callee}`
}

function renderArm(node) {
	if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'objectShape') {
		return `{ ${members(node.arguments[0])} }`
	}
	return render(node)
}

for (const statement of source.statements) {
	if (!ts.isVariableStatement(statement)) continue
	if (!statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) continue
	for (const declaration of statement.declarationList.declarations) {
		console.log(`${declaration.name.getText(source)}\t${render(declaration.initializer)}`)
	}
}
