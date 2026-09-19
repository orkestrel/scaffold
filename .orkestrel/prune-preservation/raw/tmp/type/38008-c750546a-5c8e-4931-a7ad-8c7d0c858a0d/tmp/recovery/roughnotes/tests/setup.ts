import type { Plugin, PluginOption, UserConfig } from 'vite'
import { requireValue } from '@orkestrel/test'

/**
 * Builds a named plugin entry, so a proof compares entries by reference rather than by shape.
 *
 * @param name - The name the entry carries.
 * @returns A new entry carrying that name. Every call returns its own entry, so two entries
 * sharing a name stay distinct under a reference comparison.
 */
export function createNamedEntry(name: string): Plugin {
	return { name }
}

/**
 * Reads the entries a configuration carries, and fails loudly when it carries none.
 *
 * @param config - The configuration to read.
 * @returns The entries the configuration declares, in the order it declares them. An empty list
 * when the configuration declares an empty one.
 * @throws An error carrying `The configuration carries no plugins` when the configuration declares
 * no `plugins` field.
 */
export function readPlugins(config: UserConfig): readonly PluginOption[] {
	return requireValue(config.plugins, 'The configuration carries no plugins')
}

/**
 * Selects one entry per `name` a list carries, keyed on the value each entry holds under that
 * key rather than on a string. This is the selection `mergeOverride` departs from, so a proof
 * that reads the merge against it fails when the merge stops departing.
 *
 * @param plugins - The entries to select from, in the order the caller wrote them.
 * @returns One entry per name: the last entry each name carries, at the position that name was
 * first inserted.
 */
export function selectByName(plugins: readonly Plugin[]): readonly Plugin[] {
	const keyed = new Map<unknown, Plugin>()
	for (const plugin of plugins) keyed.set(plugin.name, plugin)
	return [...keyed.values()]
}
