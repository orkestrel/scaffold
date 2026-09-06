// Probe plugin for oxlint jsPlugins: measures what a rule's context exposes.

function describeValue(value: unknown): string {
	try {
		return JSON.stringify(value)
	} catch {
		return String(value)
	}
}

function safe(fn: () => unknown): string {
	try {
		const value = fn()
		return describeValue(value)
	} catch (error) {
		return `threw:${error instanceof Error ? error.message : String(error)}`
	}
}

export const CONTEXT_PROBE_RULE = {
	meta: {
		type: 'problem',
		docs: { description: 'probe' },
		messages: { probe: '{{data}}' },
	},
	create(context: Record<string, unknown>) {
		return {
			Program() {
				const sourceCode = context.sourceCode as
					| {
							text?: string
							getAllComments?: () => ReadonlyArray<{ value: string }>
							ast?: { comments?: ReadonlyArray<unknown> }
							lines?: ReadonlyArray<unknown>
					  }
					| undefined
				const parts = [
					`filename=${safe(() => context.filename)}`,
					`physicalFilename=${safe(() => context.physicalFilename)}`,
					`cwd=${safe(() => context.cwd)}`,
					`getFilename()=${safe(() => (typeof context.getFilename === 'function' ? (context.getFilename as () => unknown)() : 'absent'))}`,
					`contextKeys=${safe(() => Object.keys(context))}`,
					`typeofSourceCode=${typeof context.sourceCode}`,
					`sourceCodeKeys=${safe(() => Object.keys(context.sourceCode ?? {}))}`,
					`sourceCodeTextLength=${safe(() => sourceCode?.text?.length ?? 'absent')}`,
					`allComments=${safe(() => sourceCode?.getAllComments?.()?.map((c) => c.value) ?? 'absent')}`,
					`astCommentsLength=${safe(() => sourceCode?.ast?.comments?.length ?? 'absent')}`,
					`linesLength=${safe(() => sourceCode?.lines?.length ?? 'absent')}`,
				]
				;(context.report as (d: unknown) => void)({
					messageId: 'probe',
					data: { data: `Program: ${parts.join(' | ')}` },
					node: { type: 'Program', range: [0, 0] },
				})
			},
			ExportNamedDeclaration(node: Record<string, unknown>) {
				const sourceCode = context.sourceCode as
					| {
							getText?: (n: unknown) => string
							getJSDocComment?: (n: unknown) => { value: string } | null
							getCommentsBefore?: (n: unknown) => ReadonlyArray<{ value: string }>
					  }
					| undefined
				const declaration = node.declaration as { type?: string } | null | undefined
				const parts = [
					`exportKind=${safe(() => node.exportKind)}`,
					`declarationType=${safe(() => declaration?.type ?? 'absent')}`,
					`range=${safe(() => node.range)}`,
					`locStart=${safe(() => (node.loc as { start?: unknown } | undefined)?.start ?? 'absent')}`,
					`textSlice=${safe(() => sourceCode?.getText?.(node)?.slice(0, 40) ?? 'absent')}`,
					`jsDocComment=${safe(() => sourceCode?.getJSDocComment?.(node)?.value ?? 'absent')}`,
					`commentsBefore=${safe(() => sourceCode?.getCommentsBefore?.(node)?.map((c) => c.value) ?? 'absent')}`,
				]
				;(context.report as (d: unknown) => void)({
					messageId: 'probe',
					data: { data: `ExportNamedDeclaration: ${parts.join(' | ')}` },
					node: { type: 'ExportNamedDeclaration', range: (node.range as [number, number]) ?? [0, 0] },
				})
			},
			TSInterfaceDeclaration(node: Record<string, unknown>) {
				reportNode(context, 'TSInterfaceDeclaration', node)
			},
			TSTypeAliasDeclaration(node: Record<string, unknown>) {
				reportNode(context, 'TSTypeAliasDeclaration', node)
			},
			TSEnumDeclaration(node: Record<string, unknown>) {
				reportNode(context, 'TSEnumDeclaration', node)
			},
			FunctionDeclaration(node: Record<string, unknown>) {
				const params = node.params as ReadonlyArray<{ type?: string }> | undefined
				const returnType = node.returnType as { typeAnnotation?: { type?: string } } | undefined
				const id = node.id as { name?: string } | undefined
				const parts = [
					`type=FunctionDeclaration`,
					`idName=${safe(() => id?.name ?? 'absent')}`,
					`paramTypes=${safe(() => params?.map((p) => p.type) ?? 'absent')}`,
					`returnTypeType=${safe(() => returnType?.typeAnnotation?.type ?? 'absent')}`,
				]
				;(context.report as (d: unknown) => void)({
					messageId: 'probe',
					data: { data: parts.join(' | ') },
					node: { type: 'FunctionDeclaration', range: (node.range as [number, number]) ?? [0, 0] },
				})
			},
		}
	},
}

function reportNode(context: Record<string, unknown>, typeName: string, node: Record<string, unknown>): void {
	const id = node.id as { name?: string } | undefined
	;(context.report as (d: unknown) => void)({
		messageId: 'probe',
		data: { data: `type=${typeName} | idName=${safe(() => id?.name ?? 'absent')}` },
		node: { type: typeName, range: (node.range as [number, number]) ?? [0, 0] },
	})
}

export const PLACEMENT_PROBE_RULE = {
	meta: {
		type: 'problem',
		docs: { description: 'placement probe' },
		messages: { placement: 'placement rule fired for {{data}}' },
	},
	create(context: Record<string, unknown>) {
		return {
			FunctionDeclaration(node: Record<string, unknown>) {
				const filename = context.filename as string | undefined
				if (typeof filename === 'string' && filename.endsWith('types.ts')) {
					;(context.report as (d: unknown) => void)({
						messageId: 'placement',
						data: { data: String(filename) },
						node: { type: 'FunctionDeclaration', range: (node.range as [number, number]) ?? [0, 0] },
					})
				}
			},
		}
	},
}

export default {
	meta: { name: 'probe' },
	rules: {
		'context-probe': CONTEXT_PROBE_RULE,
		'placement-probe': PLACEMENT_PROBE_RULE,
	},
}
