p = 'guides/relation.md'
s = open(p).read()

subs = [
 # --- all-caps emphasis in the Contract section
 ('1. **DOC ↔ SOURCE bijection.**', '1. **Doc ↔ source bijection.**'),
 ('8. **DOC ↔ SOURCE method bijection.**', '8. **Doc ↔ source method bijection.**'),
 ('routing it to its OWN `error` handler — the `error` option, surfaced as `(error, event)`, NOT a domain event — itself re-entrancy-guarded) strictly AFTER the load resolves / the junction op completes. `load` fires ONCE per relation',
  'routing it to its own `error` handler — the `error` option, surfaced as `(error, event)`, never a domain event — itself re-entrancy-guarded) strictly after the load resolves and after the junction operation completes. `load` fires once per relation'),
 # --- the FK-location table under Patterns
 ('| `belongs`    | `belongsTo`  | THIS table     | single or `undefined` |',
  '| `belongs`    | `belongsTo`  | the owning table  | single or `undefined` |'),
 ('| `many`       | `hasMany`    | RELATED table  | array                 |',
  '| `many`       | `hasMany`    | the related table | array                 |'),
 ('| `one`        | `hasOne`     | RELATED table  | single or `undefined` |',
  '| `one`        | `hasOne`     | the related table | single or `undefined` |'),
 ('| `through`    | `hasThrough` | junction table | array                 |',
  '| `through`    | `hasThrough` | the junction table | array                 |'),
 ('| `morph`      | `hasMorph`   | RELATED table  | array                 |',
  '| `morph`      | `hasMorph`   | the related table | array                 |'),
 # --- the Loading fence comment
 ('// STILL one query across all parents (no N+1), not one per key.',
  '// still one query across all parents (no N+1), not one per key.'),
 # --- Observing prose
 ('**Emitting is observation-only**: every event fires strictly AFTER the load resolves / the junction op completes,',
  '**Emitting is observation-only**: every event fires strictly after the load resolves and after the junction operation completes,'),
 ('`load` fires ONCE per relation an eager-load resolves (`load` / `find`, including each nested relation) — carrying the relation name + the COUNT of related rows attached',
  '`load` fires once per relation an eager-load resolves (`load` / `find`, including each nested relation) — carrying the relation name and the count of related rows attached'),
 ('**Listener isolation.** A listener throw is NEVER allowed to escape into the load: the emitter isolates it and routes it to its OWN `error` handler (the `error` option, surfaced as `(error, event)`), NOT to a domain event —',
  '**Listener isolation.** A listener throw never escapes into the load: the emitter isolates it and routes it to its own `error` handler (the `error` option, surfaced as `(error, event)`), never to a domain event —'),
 ('Because every emit sits after its transition AND is isolated,',
  'Because every emit sits after its transition and is isolated,'),
]
for a, b in subs:
    assert s.count(a) == 1, (s.count(a), a[:60])
    s = s.replace(a, b)

open(p, 'w').write(s)
print('ok')
