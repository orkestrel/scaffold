"""QF2 and QF5: extend the titled pair equally and add the lead-in (Rulings 14, 21)."""

import pathlib

FENCE = """import { createQualificationDefinition, createQualifier, createRuling } from '@orkestrel/qualifier'
import { createAtom, createLogicalDefinition, createRule } from '@orkestrel/reason'

const gates = createLogicalDefinition('gates', 'Eligibility gates', [
\tcreateRule(
\t\t'licensed',
\t\t[createAtom('licensed', 'equals', false)],
\t\tcreateAtom('blocked', 'equals', true),
\t),
])

const bare = createRuling('license', 'gates', 'licensed', 'restriction')
const messaged = createRuling('license', 'gates', 'licensed', 'restriction', {
\tmessage: 'A license is required',
})

'message' in bare // false — an absent optional key is omitted, never written as undefined
messaged.message // 'A license is required'

const passes = [gates]
const definition = createQualificationDefinition('standard', 'Standard eligibility', passes, {
\trulings: [messaged],
})

'description' in definition // false
definition.passes === passes // false — the factory copies what it is handed

const qualifier = createQualifier()
qualifier.qualify({ id: 'risk-1', licensed: false }, definition)
qualifier.destroy()"""

OLD_FENCE = """import { createQualificationDefinition, createQualifier, createRuling } from '@orkestrel/qualifier'
import { createAtom, createLogicalDefinition, createRule } from '@orkestrel/reason'

const gates = createLogicalDefinition('gates', 'Eligibility gates', [
\tcreateRule(
\t\t'licensed',
\t\t[createAtom('licensed', 'equals', false)],
\t\tcreateAtom('blocked', 'equals', true),
\t),
])

const definition = createQualificationDefinition('standard', 'Standard eligibility', [gates], {
\trulings: [createRuling('license', 'gates', 'licensed', 'restriction')],
})

const qualifier = createQualifier()
qualifier.qualify({ id: 'risk-1', licensed: false }, definition)
qualifier.destroy()"""

LEAD_IN = (
    "This fence adds to the quickstart what the factory family itself contributes: the\n"
    "optional `message` and `rulings` inputs, and the fresh value each factory returns\n"
    "with every absent optional key omitted.\n"
)

guide = pathlib.Path("guides/qualifier.md")
text = guide.read_text(encoding="utf8")
old_block = "#### Create a qualifier\n\n```ts\n" + OLD_FENCE + "\n```\n"
new_block = "#### Create a qualifier\n\n" + LEAD_IN + "\n```ts\n" + FENCE + "\n```\n"
assert text.count(old_block) == 1, text.count(old_block)
guide.write_text(text.replace(old_block, new_block), encoding="utf8")
print("guides/qualifier.md: titled fence extended, lead-in added")

source = pathlib.Path("src/core/factories.ts")
src = source.read_text(encoding="utf8")


def block(body: str) -> str:
    lines = [" * " + line if line else " *" for line in body.split("\n")]
    return " * ```ts\n" + "\n".join(lines) + "\n * ```\n"


old_example = block(OLD_FENCE)
new_example = block(FENCE)
assert src.count(old_example) == 1, src.count(old_example)
source.write_text(src.replace(old_example, new_example), encoding="utf8")
print("src/core/factories.ts: @example extended to match")
