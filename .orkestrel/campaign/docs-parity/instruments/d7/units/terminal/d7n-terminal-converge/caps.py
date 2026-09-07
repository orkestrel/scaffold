import pathlib

GUIDE = [
	("binds as ABSENCE, `required` refuses it", "binds as absence, `required` refuses it"),
	("binds the DECLARED default", "binds the declared default"),
	("answer at THIS keyboard", "answer at this keyboard"),
	("— PARK a live form", "— park a live form"),
	("fills and submits the AUTHORITATIVE form", "fills and submits the authoritative form"),
	("A theme is DATA — a glyph per icon slot", "A theme is data — a glyph per icon slot"),
	("each produces a CANDIDATE value", "each produces a candidate value"),
	("safe to PRINT ([`src/core`]", "safe to print ([`src/core`]"),
	("ask forms of each other BY NAME with", "ask forms of each other by name with"),
	("manager's endpoint CONFIG — config only", "manager's endpoint config — config only"),
	("A refusal that belongs to the FORM —", "A refusal that belongs to the form —"),
	("takes a LIVE form and returns its id", "takes a live form and returns its id"),
	("The parked form is AUTHORITATIVE —", "The parked form is authoritative —"),
	("so a blank line is ABSENCE and `required`", "so a blank line is absence and `required`"),
	("A field WITH a default binds", "A field with a default binds"),
	("the parked form STAYS parked", "the parked form stays parked"),
	("authoritative and RETAINS every prior fill", "authoritative and retains every prior fill"),
	("A parked form settled OUT OF BAND —", "A parked form settled out of band —"),
	("`CANCEL` and LEAVES THE FORM `editing`", "`CANCEL` and leaves the form `editing`"),
	("interrupt the FORM, destroy it", "interrupt the form, destroy it"),
	("through the INJECTED timer", "through the injected timer"),
	("and field NAMES, group references, choice VALUES,", "and field names, group references, choice values,"),
	("and every DEFAULT stay verbatim", "and every default stays verbatim"),
	("that reaches the SCREEN —", "that reaches the screen —"),
	("`#report` sanitizes BOTH", "`#report` sanitizes both"),
	("from each LOCAL rendering form", "from each local rendering form"),
	("pattern SOURCE's length, never its matching TIME", "pattern source's length, never its matching time"),
	("is present ONLY on a `submit` step, and it is a CANDIDATE:", "is present only on a `submit` step, and it is a candidate:"),
	("carries NO `name` with the raw sequence", "carries no `name` with the raw sequence"),
	("An OPEN select is a suggestion list", "An open select is a suggestion list"),
	("the erroring fields the walk can EDIT", "the erroring fields the walk can edit"),
	("but NOT on a rejection", "but not on a rejection"),
	("the start of the wrap's LAST row", "the start of the wrap's last row"),
	("stream, and cursor-COLUMN\ntracking in the redraw", "stream, and cursor-column\ntracking in the redraw"),
	("The SSE-server END of the bridge", "The SSE-server end of the bridge"),
	("Cursor movement WITHIN a line", "Cursor movement within a line"),
	("// the AUTHORITATIVE form's own FieldError list", "// the authoritative form's own FieldError list"),
	("// the LOCAL TerminalInterface each remote form", "// the local TerminalInterface each remote form"),
	("// an IDENTITY: preserved byte for byte", "// an identity: preserved byte for byte"),
	("// DISPLAY: the ANSI run is stripped", "// display: the ANSI run is stripped"),
	("// an ANSWER: preserved byte for byte", "// an answer: preserved byte for byte"),
	("// a MULTI-LINE view with the focused row marked", "// a multi-line view with the focused row marked"),
	("// A theme is DATA: a glyph per icon slot", "// A theme is data: a glyph per icon slot"),
	("// the EMPTY style: unthemed content renders", "// the empty style: unthemed content renders"),
	("or an EMPTY one restored from the store", "or an empty one restored from the store"),
	("the array overload is declared FIRST; true only when all succeed", "the array overload is declared first; it is true only when every name was mounted"),
	("settles the AUTHORITATIVE form; plus a hostile schema", "settles the authoritative form; plus a hostile schema"),
	("a hostile field NAME carrying", "a hostile field name carrying"),
]

README = [
	("A bare return binds ABSENCE, not the empty string", "A bare return binds absence, not the empty string"),
	("// fills and submits the AUTHORITATIVE form", "// fills and submits the authoritative form"),
]

for path, pairs in (('guides/terminal.md', GUIDE), ('README.md', README)):
	p = pathlib.Path(path)
	text = p.read_text()
	for old, new in pairs:
		assert text.count(old) == 1, (path, old, text.count(old))
		text = text.replace(old, new)
	p.write_text(text)
print('caps ok')
