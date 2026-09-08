from pathlib import Path

EDITS = {
'tests/setup.ts': [
("/** The single rule result the counting and stable engines agree on for a first read. */",
 "/** Holds the single rule result the counting and stable engines agree on for a first read. */"),
("/** The refused rule a captured shifting verdict must retain. */",
 "/** Holds the refused rule a captured shifting verdict must retain. */"),
("/** The canonical valid task every fixture builds on. */",
 "/** Returns the canonical valid task every fixture builds on. */"),
("/** A manifest whose four partitions are populated and disjoint. */",
 "/** Returns a manifest whose partitions are each populated and disjoint. */"),
(" * A gate-passing brief: one sentence, a required outcome, a proof, disjoint partitions.",
 " * Returns a gate-passing brief: one sentence, a required outcome, a proof, disjoint partitions."),
("/** A `BriefInput` the gate passes: a task, a disjoint manifest, one outcome, one proof. */",
 "/** Returns a `BriefInput` the gate passes: a task, a disjoint manifest, one outcome, one proof. */"),
(" * A real interpret pipeline driven by an injected extractor.",
 " * Returns a real interpret pipeline driven by an injected extractor."),
(" * An interpret engine whose `interpret` throws, for driving the `interpret` stage's failure.",
 " * Returns an interpret engine whose `interpret` throws, for driving the `interpret` stage's failure."),
(" * An interpret engine whose entity carries whatever value the caller names.",
 " * Returns an interpret engine whose entity carries whatever value the caller names."),
(" * A conforming `Interpretation` carried entirely by prototype getters — the class satisfies",
 " * Implements a conforming `Interpretation` carried entirely by prototype getters — the class satisfies"),
(" * A conforming supplied interpretation whose prototype getters change after their first read.",
 " * Implements a conforming supplied interpretation whose prototype getters change after their first read."),
(" * A conforming engine interpretation with shifting prototype getters and a function-valued",
 " * Implements a conforming engine interpretation with shifting prototype getters and a function-valued"),
("/** A borrowed engine that returns the shifting function-valued interpretation. */",
 "/** Returns a borrowed engine that yields the shifting function-valued interpretation. */"),
(" * A borrowed engine whose `interpret` returns a CONFORMING class-instance",
 " * Returns a borrowed engine whose `interpret` yields a CONFORMING class-instance"),
(" * Read a caught value's `BriefErrorCode` without branching at the assertion site.",
 " * Reads a caught value's `BriefErrorCode` without branching at the assertion site."),
(" * An evaluator that reports every check met.",
 " * Returns an evaluator that reports every check met."),
(" * A reasons engine whose verdict answers differently on every read after the first.",
 " * Returns a reasons engine whose verdict answers differently on every read after the first."),
("/** The static twin of `buildCountingReason` — each member's first answer, as plain data. */",
 "/** Returns the static twin of `buildCountingReason` — each member's first answer, as plain data. */"),
("/** A reasons engine whose uncloneable logical result shifts after its captured answers. */",
 "/** Returns a reasons engine whose uncloneable logical result shifts after its captured answers. */"),
("/** A logical result whose function member forces capture and whose declared getters shift. */",
 "/** Implements a logical result whose function member forces capture and whose declared getters shift. */"),
("/** A reasons engine that refuses through `conclusion` alone and names no failing rule. */",
 "/** Returns a reasons engine that refuses through `conclusion` alone and names no failing rule. */"),
(" * Read a reasoner verdict's conclusion without narrowing at the assertion site.",
 " * Reads a reasoner verdict's conclusion without narrowing at the assertion site."),
("/** Read a caught `BriefError`'s `context`, or `undefined` for any other value. */",
 "/** Reads a caught `BriefError`'s `context`, or `undefined` for any other value. */"),
(" * A `Record` whose prototype carries the mapping, so a lookup that ignores ownership",
 " * Returns a `Record` whose prototype carries the mapping, so a lookup that ignores ownership"),
],
'tests/src/core/helpers.test.ts': [
("\t\t// may open what it must obey. Nothing is banned here — the manifest is just silent.",
 "\t\t// may open what it must obey. Nothing is banned here — the manifest is silent."),
("\t\t// Simply never granted — the case a forbidden-only check could not see.",
 "\t\t// Never granted at all — the case a forbidden-only check could not see."),
],
'src/core/BriefManager.ts': [
("\t\t// returned false for a record it had just removed.",
 "\t\t// returned false for a record it had already removed."),
],
'src/core/constants.ts': [
(" * Every ECMAScript line terminator, not just `\\n`: a renderer that splits on any of them",
 " * Every ECMAScript line terminator, not only `\\n`: a renderer that splits on any of them"),
],
'src/core/types.ts': [
("/** Represents one input to output exemplar — the highest-leverage ambiguity remover. */",
 "/** Represents one input to output exemplar — the ambiguity remover that leaves the least to interpret. */"),
(" * two identical compiles share it and a refused compile has one just as a complete one does.",
 " * two identical compiles share it and a refused compile has one the same way a complete one does."),
],
'src/core/helpers.ts': [
(" * entirely: the brief simply never says the executor may open what it must obey.",
 " * entirely: the brief never says the executor may open what it must obey."),
],
'guides/brief.md': [
("one input-to-output exemplar; the highest-leverage ambiguity remover.",
 "one input-to-output exemplar; the ambiguity remover that leaves the least to interpret."),
("brief simply never says the executor may open what it must obey.",
 "brief never says the executor may open what it must obey."),
("parse-then-trust boundary: shape via the compiled guard, semantics via `validateBrief`,\nreadiness via the gate.",
 "parse-then-trust boundary: shape through the compiled guard, semantics through\n`validateBrief`, readiness through the gate."),
],
}

for name, pairs in EDITS.items():
    path = Path(name)
    text = path.read_text()
    for old, new in pairs:
        if text.count(old) != 1:
            raise SystemExit(f'{name}: before-text found {text.count(old)} times: {old[:70]}')
        text = text.replace(old, new)
    path.write_text(text)
    print('edited', name)
