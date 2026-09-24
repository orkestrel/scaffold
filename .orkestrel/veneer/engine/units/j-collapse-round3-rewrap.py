# Rewraps the guide paragraphs round 3's sentence edits pushed past 100 columns, and nothing else.
import pathlib, textwrap

PATH = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse/guides/veneer.md')
text = PATH.read_text(encoding='utf-8')


def rewrap(first_words, indent=''):
    global text
    start = text.index(first_words)
    end = text.index('\n\n', start) if not indent else text.index('\n- ', start)
    block = text[start:end]
    words = ' '.join(line.strip() for line in block.split('\n'))
    if indent:
        words = words[2:] if words.startswith('- ') else words
        wrapped = textwrap.wrap(words, width=100, initial_indent='- ', subsequent_indent='  ',
                                break_long_words=False, break_on_hyphens=False)
    else:
        wrapped = textwrap.wrap(words, width=100, break_long_words=False, break_on_hyphens=False)
    text = text[:start] + '\n'.join(wrapped) + text[end:]


rewrap('While the delegate owns an engine it observes its root, and at the observer delivery')
rewrap('With a `parent`, showing first hides every open first-level sibling inside the parent')
rewrap('- Destruction abandons a transition in flight, restores the panel', indent='  ')
PATH.write_text(text, encoding='utf-8', newline='\n')
print('ok')
