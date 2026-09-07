"""Turns an imperative guide cell into a third-person opener, for review."""
import re, sys

IRREGULAR = {
	'Do': 'Does', 'Go': 'Goes', 'Try': 'Tries', 'Fetch': 'Fetches', 'Push': 'Pushes',
	'Dispatch': 'Dispatches', 'Match': 'Matches', 'Watch': 'Watches', 'Attach': 'Attaches',
	'Detach': 'Detaches', 'Focus': 'Focuses', 'Pass': 'Passes', 'Press': 'Presses',
	'Express': 'Expresses', 'Flush': 'Flushes', 'Finish': 'Finishes', 'Publish': 'Publishes',
	'Search': 'Searches', 'Reach': 'Reaches', 'Apply': 'Applies', 'Copy': 'Copies',
	'Retry': 'Retries', 'Query': 'Queries', 'Empty': 'Empties', 'Identify': 'Identifies',
	'Classify': 'Classifies', 'Verify': 'Verifies', 'Notify': 'Notifies', 'Satisfy': 'Satisfies',
	'Deny': 'Denies', 'Carry': 'Carries', 'Modify': 'Modifies', 'Simplify': 'Simplifies',
}

def third(word):
	if word in IRREGULAR:
		return IRREGULAR[word]
	if re.search(r'(s|x|z|ch|sh)$', word):
		return word + 'es'
	if re.search(r'[^aeiou]y$', word):
		return word[:-1] + 'ies'
	return word + 's'

for raw in sys.stdin:
	key, _, text = raw.rstrip('\n').partition('\t')
	head, _, rest = text.partition(' ')
	print(f'{key}\t{third(head)} {rest}')
