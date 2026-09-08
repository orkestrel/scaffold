p = 'guides/relation.md'
s = open(p).read()

old = "- [`tests/guides.test.ts`](../tests/guides.test.ts) — the `## Surface` ↔ `src/core` bijection (value + type exports).\n"
new = (
 "- [`tests/guides.test.ts`](../tests/guides.test.ts) — the `## Surface` ↔ `src/core` bijection "
 "(value + type exports), the `ModelInterface` / `RelationManagerInterface` ↔ `Model` / `RelationManager` "
 "method bijections, and the equality gate: every `Summary` cell against its declaration's description "
 "paragraph, the titled `Defining relations` fence against the `@example` block of that title (pinned so "
 "the titled pair cannot be retired silently), and the README pitch against this guide's tagline. It also "
 "runs the guide's value-claiming fences and asserts the values their comments claim.\n"
)
assert s.count(old) == 1
s = s.replace(old, new)

old_fence = """		contacts: { account: belongsTo('accountId', 'accounts') },
	},
})
```

The shorthands cover the common relationships"""
new_fence = """		contacts: { account: belongsTo('accountId', 'accounts') },
	},
})

const acme = await manager.model('accounts').load('acc1', { contacts: true, classification: true })
```

The shorthands cover the common relationships"""
assert s.count(old_fence) == 1
s = s.replace(old_fence, new_fence)

open(p, 'w').write(s)
print('ok')
