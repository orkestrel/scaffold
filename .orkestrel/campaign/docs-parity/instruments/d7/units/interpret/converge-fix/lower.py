from pathlib import Path

EDITS = {
	'src/core/Interpret.ts': [
		(" * `interpret()` is genuinely SYNCHRONOUS — it returns its\n"
		 " * {@link Interpretation} directly, never a `Promise` — and runs the fixed\n"
		 " * pipeline\n"
		 " * `[normalize, extract, clarify, format, generate]` — each producing one\n"
		 " * {@link StageRecord}. Between `extract` and `clarify`",
		 " * `interpret()` is genuinely synchronous — it returns its\n"
		 " * {@link Interpretation} directly, never a `Promise` — each phase producing\n"
		 " * one {@link StageRecord}. Between `extract` and `clarify`"),
		(" * yields an explicit, auditable INCOMPLETE result",
		 " * yields an explicit, auditable incomplete result"),
		(" * template. A stage THROW is caught, marked on its record AND on\n",
		 " * template. A stage throw is caught, marked on its record and on\n"),
		(" * then destroys the emitter LAST; every method afterwards except the",
		 " * then destroys the emitter last; every method afterwards except the"),
		("\t// A stage THROW — mark the failed stage's record, emit `error` with the raw",
		 "\t// A stage throw — mark the failed stage's record, emit `error` with the raw"),
		("\t// incomplete run is still a completed CALL — visibility is the point).",
		 "\t// incomplete run is still a completed call — visibility is the point)."),
	],
	'src/core/Narrator.ts': [
		(" * Every wording decision is DATA — a caller-supplied `Lexicon` merged, per\n"
		 " * sub-record (`phrases` / `labels` / `templates`), OVER `DEFAULT_LEXICON`.",
		 " * Every wording decision is data — a caller-supplied `Lexicon` merged, per\n"
		 " * sub-record (`phrases`, `labels`, and `templates`), over `DEFAULT_LEXICON`."),
	],
	'src/core/managers/SubjectManager.ts': [
		(" * bumps ONLY when the hash changes at a reused id",
		 " * bumps only when the hash changes at a reused id"),
	],
	'src/core/managers/RecordManager.ts': [
		(" * its record's value field. `add` derives `hash` from the value's CONTENT",
		 " * its record's value field. `add` derives `hash` from the value's content"),
		(" * (id-independent) and bumps `version` ONLY when that hash changes at a reused",
		 " * (id-independent) and bumps `version` only when that hash changes at a reused"),
		(" * is ALL-OR-NOTHING — any id absent from the registry leaves the collection",
		 " * is all-or-nothing — any id absent from the registry leaves the collection"),
	],
	'src/core/managers/TemplateManager.ts': [
		(" * the batch `remove(ids)` form stays ALL-OR-NOTHING. This class adds what is",
		 " * the batch `remove(ids)` form stays all-or-nothing. This class adds what is"),
	],
	'src/core/helpers.ts': [
		(" * `prototype`, or `constructor` at ANY segment (checked against",
		 " * `prototype`, or `constructor` at any segment (checked against"),
		(" * Strategy, in order: (1) a SINGLE mapping collects every number (an array",
		 " * Strategy, in order: (1) a single mapping collects every number (an array"),
		(" * Runs ONLY after a template has matched (an orchestrator-owned step, never",
		 " * Runs only after a template has matched (an orchestrator-owned step, never"),
		(" * unclassified intent is visibly absent. Combined confidence (PINNED): both\n"
		 " * fire → their average; exactly one fires → its value times `0.5`; neither →",
		 " * unclassified intent is visibly absent. Combined confidence (pinned): the\n"
		 " * action and the domain both fire → their average; exactly one fires → its\n"
		 " * value times `0.5`; neither →"),
		(" * added template's own `domain` name — a caller MUST list a template's",
		 " * added template's own `domain` name — a caller must list a template's"),
		(" * `ancestors` tracks the objects along the CURRENT recursion path rather than",
		 " * `ancestors` tracks the objects along the current recursion path rather than"),
		(" * THE critical leaf (design-pinned, engine-parity semantics): an absent",
		 " * The critical leaf (design-pinned, engine-parity semantics): an absent"),
		(" * EXPLICIT numeric operand, so the same tree evaluates identically here and",
		 " * explicit numeric operand, so the same tree evaluates identically here and"),
		(" * describes RATERS artifacts); this describes REASONS artifacts. Every field",
		 " * describes raters artifacts); this describes reasons artifacts. Every field"),
	],
	'src/core/stages/Extractor.ts': [
		(" * `extract` never sees a `Template`: numbers → entity ASSIGNMENT is a",
		 " * `extract` never sees a `Template`: numbers → entity assignment is a"),
	],
	'src/core/stages/Normalizer.ts': [
		(" * The caller's `contractions` map is merged OVER `DEFAULT_CONTRACTIONS`;",
		 " * The caller's `contractions` map is merged over `DEFAULT_CONTRACTIONS`;"),
		(" * (one entry per matching map KEY, not per occurrence) is recorded on the",
		 " * (one entry per matching map key, not per occurrence) is recorded on the"),
	],
	'src/core/stages/Generator.ts': [
		(" * by its OWN `name` — the shape `Clarifier` uses for its synthesized",
		 " * by its own `name` — the shape `Clarifier` uses for its synthesized"),
		(" * an empty entity set). A `FieldMapping` is emitted for EVERY field that",
		 " * an empty entity set). A `FieldMapping` is emitted for every field that"),
	],
	'src/core/stages/Clarifier.ts': [
		(" * fills a mapping only from the SAME domain's most recent prior turn (a",
		 " * fills a mapping only from the same domain's most recent prior turn (a"),
		(" * aggregate over a collection of KNOWN length is declarable while a collection",
		 " * aggregate over a collection of known length is declarable while a collection"),
	],
	'src/core/validators.ts': [
		("// Every guard here is a TOTAL function — adversarial input (junk, hostile",
		 "// Every guard here is a total function — adversarial input (junk, hostile"),
		("// Input-record guards are EXACT (`recordOf`): an extra key fails. Foreign\n"
		 "// result guards are OPEN (`objectOf`): unknown members, class instances, and",
		 "// Input-record guards are exact (`recordOf`): an extra key fails. Foreign\n"
		 "// result guards are open (`objectOf`): unknown members, class instances, and"),
		("// barrel's `export *` (TypeScript silently drops BOTH conflicting star",
		 "// barrel's `export *` (TypeScript silently drops both conflicting star"),
	],
	'src/core/constants.ts': [
		("// NEUTRAL and small: domain worldview (insurance verbs, en-US misspelling",
		 "// neutral and small: domain worldview (insurance verbs, en-US misspelling"),
	],
	'src/core/types.ts': [
		("// that owns the interpretation lifecycle. FORWARD: raw text is normalized,",
		 "// that owns the interpretation lifecycle. Forward: raw text is normalized,"),
		("// `Definition` pair ready for `Reason.reason`. REVERSE: `Definition` /",
		 "// `Definition` pair ready for `Reason.reason`. Reverse: `Definition` /"),
		("// provider, or agent — the `prompt` a result carries is FOR an external",
		 "// provider, or agent — the `prompt` a result carries is written for an external"),
		(" * Deliberately NOT named `Stage` — raters already owns that identifier for",
		 " * Deliberately not named `Stage` — raters already owns that identifier for"),
		(" * collection of KNOWN length; a collection whose length varies per turn has no",
		 " * collection of known length; a collection whose length varies per turn has no"),
		(" * Emitted for EVERY field that lands in the generated subject, including",
		 " * Emitted for every field that lands in the generated subject, including"),
		(" * text. `numbers`, not template-named entities; entity ASSIGNMENT is a",
		 " * text. `numbers`, not template-named entities; entity assignment is a"),
		(" * `id` is the manager's OWN minted identity — never `definition.id` — so",
		 " * `id` is the manager's own minted identity — never `definition.id` — so"),
		(" * before whitespace collapse. `contractions` merges OVER",
		 " * before whitespace collapse. `contractions` merges over"),
		(" * `hash` is derived from the held value's CONTENT alone (id-independent), and",
		 " * `hash` is derived from the held value's content alone (id-independent), and"),
		(" * all-or-nothing: any missing id in the list leaves the collection untouched\n"
		 " * and returns `false`. `destroy()` is idempotent and tears the emitter down\n"
		 " * LAST;",
		 " * all-or-nothing: any missing id in the list leaves the collection untouched\n"
		 " * and returns `false`. `destroy()` is idempotent and tears the emitter down\n"
		 " * last;"),
		(" * stage slot is BRING-YOUR-OWN — a supplied implementation is",
		 " * stage slot is bring-your-own — a supplied implementation is"),
		(" * `interpret` is genuinely SYNCHRONOUS — it returns its",
		 " * `interpret` is genuinely synchronous — it returns its"),
		(" * the caller supplied, which outlives this orchestrator — and tears the\n"
		 " * emitter down LAST.",
		 " * the caller supplied, which outlives this orchestrator — and tears the\n"
		 " * emitter down last."),
	],
}

for path, pairs in EDITS.items():
	p = Path(path)
	text = p.read_text()
	for old, new in pairs:
		n = text.count(old)
		assert n == 1, f'{path}: {n} matches for {old[:60]!r}'
		text = text.replace(old, new)
	p.write_text(text)
	print(f'{path}: {len(pairs)} replacements')
