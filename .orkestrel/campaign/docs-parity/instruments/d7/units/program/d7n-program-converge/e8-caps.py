import io
p = 'guides/program.md'
s = io.open(p, encoding='utf-8').read()
pairs = [
	('The array overload is declared FIRST and performs one aggregate-aware batch',
	 'The array overload is declared first and performs one aggregate-aware batch'),
	('the omitted-rating case, where `unrated` never occurs. Line selection happens BEFORE',
	 'the omitted-rating case, where `unrated` never occurs. Line selection happens before'),
	('2. execution SUCCEEDED — qualification, rating (when it ran), and authority all produced no errors',
	 '2. execution succeeded — qualification, rating (when it ran), and authority all produced no errors'),
	('otherwise `eligible` — NEVER `unrated`',
	 'otherwise `eligible`, never `unrated`'),
	('4. no successful rating (including an AUTHORED rating with zero lines) → `unrated`',
	 '4. no successful rating, an authored rating with zero lines included → `unrated`'),
	('requires every subject execution to succeed AND the batch',
	 'requires every subject execution to succeed and the batch'),
	('  sets the destroyed flag FIRST, so a listener re-entering `destroy()` is a no-op',
	 '  sets the destroyed flag first, so a listener re-entering `destroy()` is a no-op'),
	('reentrancy-safe the same way, the destroyed flag is set FIRST',
	 'reentrancy-safe the same way, the destroyed flag is set first'),
	('when NO rating is authored, ANY scope is an error, because no line exists to match',
	 'when no rating is authored, any scope is an error, because no line exists to match'),
]
for old, new in pairs:
	if s.count(old) != 1:
		raise SystemExit('not unique: %r (%d)' % (old[:60], s.count(old)))
	s = s.replace(old, new)
io.open(p, 'w', encoding='utf-8').write(s)
print('all-caps emphasis corrected')
