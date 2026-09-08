"""Applies the fix round's edits. Each entry is (path, old, new); every old must match exactly once."""
import pathlib
import sys

EDITS = [
	# --- Item 1: the tagline, identical in the guide and the README.
	(
		'guides/relation.md',
		"> relations named once, then `load` / `find` records with their related rows already\n",
		"> relations named once, then records loaded or found with their related rows already\n",
	),
	(
		'README.md',
		"> relations named once, then `load` / `find` records with their related rows already\n",
		"> relations named once, then records loaded or found with their related rows already\n",
	),
	# --- Item 2: FindOptions' cell and the extended-interface sentence.
	(
		'guides/relation.md',
		"escaped as `\\|`.\n",
		"escaped as `\\|`. An extended interface's name comes before `plus`, with the members it adds after.\n",
	),
	(
		'guides/relation.md',
		"| `FindOptions`              | interface | `{ limit?, offset?, sort?, direction?, signal? }`                                    |",
		"| `FindOptions`              | interface | `OperationOptions plus { limit?, offset?, sort?, direction? }`                       |",
	),
	# --- Item 3: one term for the foreign key.
	(
		'guides/relation.md',
		"belongsTo('classificationId', 'classifications'), // FK on accounts → one classification\n",
		"belongsTo('classificationId', 'classifications'), // foreign key on accounts → one classification\n",
	),
	(
		'guides/relation.md',
		"contacts: hasMany('accountId'), // FK on contacts → many contacts back here\n",
		"contacts: hasMany('accountId'), // foreign key on contacts → many contacts back here\n",
	),
	(
		'guides/relation.md',
		"belongsTo('classificationId', 'classifications'), // FK on accounts\n",
		"belongsTo('classificationId', 'classifications'), // foreign key on accounts\n",
	),
	(
		'guides/relation.md',
		"contacts: hasMany('accountId'), // FK on contacts → accounts\n",
		"contacts: hasMany('accountId'), // foreign key on contacts → accounts\n",
	),
	(
		'guides/relation.md',
		"profile: hasOne('accountId', 'profiles'), // single, FK on profiles\n",
		"profile: hasOne('accountId', 'profiles'), // single, foreign key on profiles\n",
	),
	(
		'guides/relation.md',
		"| Relationship | Builder      | FK location        | Returns               |",
		"| Relationship | Builder      | Foreign key location | Returns               |",
	),
	(
		'README.md',
		"belongsTo('classificationId', 'classifications'), // FK on accounts\n",
		"belongsTo('classificationId', 'classifications'), // foreign key on accounts\n",
	),
	(
		'README.md',
		"contacts: hasMany('accountId'), // FK on contacts → back here\n",
		"contacts: hasMany('accountId'), // foreign key on contacts → back here\n",
	),
	# The titled pair's source side moves with its guide fence.
	(
		'src/core/factories.ts',
		" * 			classification: belongsTo('classificationId', 'classifications'), // FK on accounts\n"
		" * 			contacts: hasMany('accountId'), // FK on contacts → accounts\n"
		" * 			profile: hasOne('accountId', 'profiles'), // single, FK on profiles\n",
		" * 			classification: belongsTo('classificationId', 'classifications'), // foreign key on accounts\n"
		" * 			contacts: hasMany('accountId'), // foreign key on contacts → accounts\n"
		" * 			profile: hasOne('accountId', 'profiles'), // single, foreign key on profiles\n",
	),
	# --- Item 4: the half-swept prose.
	(
		'src/core/types.ts',
		" * `belongs` — a foreign key on THIS table points at the related row (single).\n"
		" * `many` — a foreign key on the RELATED table points back here (array).\n",
		" * `belongs` — a foreign key on the owning table points at the related row (single).\n"
		" * `many` — a foreign key on the related table points back here (array).\n",
	),
	(
		'src/core/types.ts',
		" * `morph` — a foreign key plus a discriminator column on the RELATED table (array, polymorphic).\n",
		" * `morph` — a foreign key plus a discriminator column on the related table (array, polymorphic).\n",
	),
	(
		'src/core/types.ts',
		" * A `string` is a `belongs` (the FK column on this table); a `readonly string[]`\n"
		" * is a `many` (the first element is the FK column on the related table); a\n",
		" * A `string` is a `belongs` (the foreign-key column on this table); a `readonly\n"
		" * string[]` is a `many` (the first element is the foreign-key column on the related\n"
		" * table); a\n",
	),
	(
		'src/core/types.ts',
		" * `through` is the junction table, `source` its foreign-key column pointing at THIS\n"
		" * model, and `target` its foreign-key column pointing at the related model. These are\n",
		" * `through` is the junction table, `source` its foreign-key column pointing at the\n"
		" * owning model, and `target` its foreign-key column pointing at the related model.\n"
		" * These are\n",
	),
	(
		'src/core/types.ts',
		" * it, and `label` the discriminator value identifying THIS model.\n",
		" * it, and `label` the discriminator value identifying the owning model.\n",
	),
	(
		'src/core/types.ts',
		" * `load` fires once per relation that an eager-load resolves, carrying the relation NAME +\n"
		" * the COUNT of related rows attached for the whole record set (it is the batched load\n",
		" * `load` fires once per relation that an eager-load resolves, carrying the relation name +\n"
		" * the count of related rows attached for the whole record set (it is the batched load\n",
	),
	(
		'src/core/types.ts',
		" * option), never onto this map, and sits AFTER the load resolves / the junction op completes\n"
		" * — so a throwing observer can never corrupt the eager-load batching or a junction write.\n",
		" * option), never onto this map, and sits strictly after the load resolves / the junction op\n"
		" * completes — so a throwing observer can never corrupt the eager-load batching or a\n"
		" * junction write.\n",
	),
	(
		'src/core/helpers.ts',
		" * A `string` is a `belongs` (FK column on this table); a `readonly string[]` is a\n"
		" * `many` (FK column on the related table); a {@link RelationDescriptor} uses its\n",
		" * A `string` is a `belongs` (foreign-key column on this table); a `readonly string[]`\n"
		" * is a `many` (foreign-key column on the related table); a {@link RelationDescriptor}\n"
		" * uses its\n",
	),
	(
		'src/core/helpers.ts',
		" * @param column - The FK column on this table\n",
		" * @param column - The foreign-key column on this table\n",
	),
	(
		'src/core/helpers.ts',
		" * @param source - The junction FK column pointing at THIS model\n"
		" * @param target - The junction FK column pointing at the related model\n",
		" * @param source - The junction foreign-key column pointing at the owning model\n"
		" * @param target - The junction foreign-key column pointing at the related model\n",
	),
	(
		'src/core/helpers.ts',
		" * @param label - The discriminator value identifying THIS model\n",
		" * @param label - The discriminator value identifying the owning model\n",
	),
	(
		'src/core/Model.ts',
		"	// The PUSH observation surface — owned, never inherited. The emitter isolates a\n",
		"	// The push observation surface — owned, never inherited. The emitter isolates a\n",
	),
	(
		'src/core/Model.ts',
		"		// Observe the inserted junction row — AFTER the driver write, so a swallowed listener\n"
		"		// throw can't perturb the link (carries the owning key + the relation name).\n",
		"		// Observe the inserted junction row — strictly after the driver write, so a swallowed\n"
		"		// listener throw can't perturb the link (carries the owning key + the relation name).\n",
	),
	(
		'src/core/Model.ts',
		"			// Observe this relation's eager-load — AFTER it resolved + was attached, ONCE per\n"
		"			// relation (not per record — the batched load has no N+1, nor do its events),\n"
		"			// carrying the relation name + the total related rows attached across the set.\n",
		"			// Observe this relation's eager-load — strictly after it resolved + was attached,\n"
		"			// once per relation (not per record — the batched load has no N+1, nor do its\n"
		"			// events), carrying the relation name + the count of rows attached across the set.\n",
	),
	# --- Item 5: the drop-in's header line.
	(
		'tests/guides.test.ts',
		"// package's own, and are the only part a sibling package changes.\n",
		"// package's own, as is the executed section that closes the file.\n",
	),
	# --- Item 6: a lead-in sentence before every fence that sits under a heading.
	(
		'guides/relation.md',
		"### Defining relations\n\n```ts\n",
		"### Defining relations\n\n"
		"Declare every relationship with its builder, then load a record with the chosen relations\nattached:\n\n"
		"```ts\n",
	),
	(
		'README.md',
		"## Install\n\n```sh\n",
		"## Install\n\nInstall the package from npm:\n\n```sh\n",
	),
	(
		'README.md',
		"## Usage\n\n```ts\n",
		"## Usage\n\nBuild a typed database, declare each table's relations, then load a record with\nits related rows attached:\n\n```ts\n",
	),
	# --- Item 7: the Returns chrome.
	(
		'guides/relation.md',
		"| `load`   | `Promise<Loaded<T> \\| undefined>` (or array) |",
		"| `load`   | `Promise<Loaded<T> \\| undefined>`            |",
	),
]

failed = []
for path, old, new in EDITS:
	text = pathlib.Path(path).read_text(encoding='utf-8')
	hits = text.count(old)
	if hits != 1:
		failed.append(f'{path}: {hits} matches for {old[:70]!r}')
		continue
	pathlib.Path(path).write_text(text.replace(old, new), encoding='utf-8')
	print(f'ok {path}: {old[:60]!r}')

if failed:
	print('\nFAILED:')
	for line in failed:
		print(line)
	sys.exit(1)
