# Checks the `@returns` line by construction rather than by reading.
#
# It enumerates EVERY allocation of override entries to base positions for the repeated-name case,
# keeps the ones the sentence's clauses permit, and prints the distinct results those allocations
# produce. A sentence that determines the result leaves exactly one result standing; a sentence
# that permits a second implementation leaves more than one.
#
# Control: the same search run against the R2 sentence's clause set, which carried no allocation
# rule. It must report more than one result, so a single result under the R3 set is the sentence
# constraining the search rather than the search being unable to find anything.
#
# Run from the repository root: python tmp/units/r3-returns-construction.py
import itertools

# The case: a base repeating a name, and one override entry sharing it.
BASE = [('declared', 'alpha'), ('repeated', 'alpha')]
OVERRIDE = [('replacement', 'alpha')]
NONE = None


def result(allocation):
	"""The list the clauses produce for one allocation: each position, then the untaken entries."""
	taken = {index for index in allocation if index is not NONE}
	carried = [
		BASE[position][0] if index is NONE else OVERRIDE[index][0]
		for position, index in enumerate(allocation)
	]
	trailing = [name for index, (name, _) in enumerate(OVERRIDE) if index not in taken]
	return tuple(carried + trailing)


def named(entry):
	return entry[1] is not None


def matches(position, index):
	return named(BASE[position]) and OVERRIDE[index][1] == BASE[position][1]


def permitted_r3(allocation):
	"""The R3 clauses: visit the base positions in order, and each named position takes the
	earliest same-named override entry that no earlier position took."""
	for position, index in enumerate(allocation):
		if not named(BASE[position]):
			if index is not NONE:
				return False
			continue
		earlier = {taken for taken in allocation[:position] if taken is not NONE}
		candidates = [
			candidate
			for candidate in range(len(OVERRIDE))
			if matches(position, candidate) and candidate not in earlier
		]
		required = candidates[0] if candidates else NONE
		if index != required:
			return False
	return True


def permitted_r2(allocation):
	"""The R2 clauses: each base position carries its own entry or the override entry that
	replaced it, the entry matches the position's name, and one entry replaces one position at
	most. No clause says WHICH matching position takes the entry."""
	used = [index for index in allocation if index is not NONE]
	if len(used) != len(set(used)):
		return False
	for position, index in enumerate(allocation):
		if index is NONE:
			continue
		if not matches(position, index):
			return False
	return True


def reverse_traversal():
	"""The rival the objective lane built to refute the R2 sentence: the same match rule walked
	from the last base position to the first, so the LAST matching position takes the entry."""
	allocation = [NONE] * len(BASE)
	taken = set()
	for position in reversed(range(len(BASE))):
		if not named(BASE[position]):
			continue
		for candidate in range(len(OVERRIDE)):
			if matches(position, candidate) and candidate not in taken:
				allocation[position] = candidate
				taken.add(candidate)
				break
	return tuple(allocation)


space = list(itertools.product([NONE] + list(range(len(OVERRIDE))), repeat=len(BASE)))
for label, permitted in [('R3 (delivered)', permitted_r3), ('R2 (control)', permitted_r2)]:
	admitted = sorted({result(allocation) for allocation in space if permitted(allocation)})
	print(label, '- allocations searched:', len(space))
	for row in admitted:
		print('   admits:', list(row))
	print('   determines the result:', len(admitted) == 1)

rival = reverse_traversal()
print('reverse traversal returns:', list(result(rival)))
print('   R2 permits it:', permitted_r2(rival))
print('   R3 permits it:', permitted_r3(rival))
