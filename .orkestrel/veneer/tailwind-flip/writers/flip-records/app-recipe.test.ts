import type { RecipeRecord } from '../../../tests/setup.js'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, it } from 'vitest'
import { TAILWIND_CLASSES } from '../../../app/browser/constants.js'
import { CLASS_NAMES } from '../../../src/core/constants.js'
import { collectLeaves, isRecipeRecord } from '../../../tests/setup.js'
import {
	compileRecipe,
	compileUnexcluded,
	readTailwindInventory,
	RECIPE_INPUT,
	TAILWIND_SHEET_PATH,
	WORKSPACE_ROOT,
} from '../../../tests/setupServer.js'

it('writes the app recipe from the live compiler and unchanged candidates', async () => {
	const path = resolve(WORKSPACE_ROOT, 'app/browser/recipe.json')
	const before = readFileSync(path, 'utf8')
	const previous: unknown = JSON.parse(before)
	if (!isRecipeRecord(previous)) throw new Error('The existing recipe is malformed')
	const inventory = readTailwindInventory()
	const candidates = [...new Set([
		...collectLeaves(CLASS_NAMES.bootstrap).map(([, name]) => name),
		...TAILWIND_CLASSES,
	])].sort()
	expect(candidates).toEqual(previous.candidates)
	const record: RecipeRecord = {
		tailwindcss: {
			version: inventory.version,
			integrity: inventory.integrity,
			digest: inventory.digest,
		},
		sheet: createHash('sha256').update(readFileSync(TAILWIND_SHEET_PATH)).digest('hex'),
		candidates,
		recipe: await compileRecipe(RECIPE_INPUT, candidates),
		unexcluded: await compileUnexcluded(candidates),
	}
	const after = JSON.stringify(record, null, '\t') + '\n'
	if (after !== before) writeFileSync(path, after)
	expect(readFileSync(path, 'utf8')).toBe(after)
	console.log(JSON.stringify({
		path,
		before: createHash('sha256').update(before).digest('hex'),
		after: createHash('sha256').update(after).digest('hex'),
		recipe: [previous.recipe.length, record.recipe.length],
		unexcluded: [previous.unexcluded.length, record.unexcluded.length],
		equal: previous.unexcluded === record.unexcluded,
		offset: [...previous.unexcluded].findIndex((value, index) => value !== record.unexcluded[index]),
	}))
})
