# Compares the releasePointer doc block in src/browser/helpers.ts and the releasePointer bullet in
# guides/test.md with their round-5 copies, after the Orchestrator withdrew item 2 (F1).
def block(text, start, end):
    a = text.index(start)
    return text[a:text.index(end, a)]
r5 = open('tmp/units/t5-6-helpers-r5.ts.txt').read()
now = open('src/browser/helpers.ts').read()
print('releasePointer doc identical to round 5:', block(r5, ' * Releases a held pointer', 'export async function releasePointer') == block(now, ' * Releases a held pointer', 'export async function releasePointer'))
g5 = open('tmp/units/t5-6-guide-r5.md.txt').read()
gn = open('guides/test.md').read()
print('guide releasePointer bullet identical to round 5:', block(g5, '- **`releasePointer` parks the pointer outside the page.**', '- **`stageMedia`') == block(gn, '- **`releasePointer` parks the pointer outside the page.**', '- **`stageMedia`'))
