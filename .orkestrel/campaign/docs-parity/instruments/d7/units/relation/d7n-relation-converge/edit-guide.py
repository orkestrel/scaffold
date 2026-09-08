import re

p = 'guides/relation.md'
s = open(p).read()

TAGLINE = """> A small, declarative ORM layer over the `@orkestrel/database` tables: a table's
> relations named once, then `load` / `find` records with their related rows already
> attached, batched so a direct relation costs one query across the whole record set and
> a `through` relation two."""

OPENING = """The relationships (`belongs` / `many` / `one` / `through` / `morph`) cover the foreign-key shapes; nested includes recurse through the registry; `link` / `unlink` / `links` manage a many-to-many junction without hand-writing join rows. The layer stays thin above the typed store: resolution is define-time — each relation is precomputed once into a flat `ResolvedRelation`, and nothing is inferred while loading — and the loaded relation properties are deliberately loose (`Row | readonly Row[] | undefined`) rather than typed to each exact target row. The typed half is the table reached through `model.table`, and relation loading is the looser convenience on top. No write-cascades, no lazy proxies, no query builder of its own. Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel."""

start = s.index('> A small, declarative ORM layer')
end = s.index('\n\n## Surface\n', start)
s = s[:start] + TAGLINE + '\n\n' + OPENING + s[end:]

# --- Builders header
old = '| API          | Kind     | Builds a relation where…                                                   |'
assert s.count(old) == 1
s = s.replace(old, '| API          | Kind     | Summary                                                   |')

# --- Methods headers
for old, new in (
    ('| Method   | Returns                                      | Behavior                                                  |',
     '| Method   | Returns                                      | Summary                                                  |'),
    ('| Method  | Returns                       | Behavior                                 |',
     '| Method  | Returns                       | Summary                                 |'),
):
    assert s.count(old) == 1, old
    s = s.replace(old, new)

# --- Types table
SHAPES = {
    'Relationship': ("type", "`'belongs' \\| 'many' \\| 'one' \\| 'through' \\| 'morph'`"),
    'RelationDescriptor': ("interface", "`{ relationship?, column?, key?, through?, source?, target?, tag?, label?, model? }`"),
    'Relation': ("type", "`string \\| readonly string[] \\| RelationDescriptor`"),
    'RelationMap': ("type", "`Readonly<Record<string, Relation>>`"),
    'RelationsShape': ("type", "`{ readonly [K in keyof T]?: RelationMap }`"),
    'ResolvedRelation': ("type", "`ResolvedBelongs \\| ResolvedMany \\| ResolvedOne \\| ResolvedThrough \\| ResolvedMorph`"),
    'ResolvedBelongs': ("interface", "`{ relationship, name, model, column }`"),
    'ResolvedMany': ("interface", "`{ relationship, name, model, key }`"),
    'ResolvedOne': ("interface", "`{ relationship, name, model, key }`"),
    'ResolvedThrough': ("interface", "`{ relationship, name, model, through, source, target }`"),
    'ResolvedMorph': ("interface", "`{ relationship, name, model, key, tag, label }`"),
    'RelationErrorCode': ("type", "`'INVALID' \\| 'UNKNOWN_RELATION' \\| 'NOT_THROUGH'`"),
    'Include': ("interface", "`{ [relation] }`"),
    'Loaded': ("type", "`T & Readonly<LoadedMap>`"),
    'LoadedMap': ("type", "`Record<string, Row \\| readonly Row[] \\| undefined>`"),
    'RelationContext': ("interface", "`{ resolved, primary }`"),
    'FindOptions': ("interface", "`{ limit?, offset?, sort?, direction?, signal? }`"),
    'ModelEventMap': ("type", "`{ load, link, unlink }`"),
    'ModelInterface': ("interface", "`{ emitter, name, table, relations } plus load, find, link, unlink, links`"),
    'RelationManagerOptions': ("interface", "`{ database, relations?, model? }`"),
    'RelationManagerInterface': ("interface", "`{ count } plus model, names, has`"),
}
ORDER = list(SHAPES)

CONVENTION = "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\\|`."

lines = ['| Type | Kind | Shape | Summary |', '| --- | --- | --- | --- |']
for name in ORDER:
    kind, shape = SHAPES[name]
    lines.append(f'| `{name}` | {kind} | {shape} |  |')
table = '\n'.join(lines)

head = '### Types\n\n'
i = s.index(head)
j = s.index('\n\n## Methods\n', i)
s = s[:i] + head + CONVENTION + '\n\n' + table + s[j:]

open(p, 'w').write(s)
print('ok')
