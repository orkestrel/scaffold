import type { TestProject } from 'vitest/node'
import { buildGeneratedConsumerTemplates } from './setupBin.js'

declare module 'vitest' {
	export interface ProvidedContext {
		readonly generatedConsumerTemplates: string
	}
}

/**
 * Install generated-consumer templates before parallel integration workers start.
 *
 * @param project - Integration Vitest project receiving the registry path.
 * @returns Cleanup for the shared temporary registry.
 */
export async function setup(project: TestProject): Promise<() => Promise<void>> {
	const registry = await buildGeneratedConsumerTemplates()
	project.provide('generatedConsumerTemplates', registry.path)
	return () => registry.cleanup()
}
