# Prints the elements layer's button rules, media blocks included, from a built cascade.
import re, sys
css = open(sys.argv[1], encoding='utf-8').read()
out = []
for layer in re.finditer(r'@layer elements\{', css):
    depth, i = 1, layer.end()
    start = i
    while depth:
        if css[i] == '{': depth += 1
        elif css[i] == '}': depth -= 1
        i += 1
    body = css[start:i - 1]
    # Walk top-level items of the layer body.
    j = 0
    while j < len(body):
        k = body.index('{', j)
        head = body[j:k]
        depth, m = 1, k + 1
        while depth:
            if body[m] == '{': depth += 1
            elif body[m] == '}': depth -= 1
            m += 1
        item = body[j:m]
        if re.match(r'(button|\[role=button\]|\[type=button\])', head) or (head.startswith('@media') and re.search(r'[{}]button', item)):
            out.append(item)
        j = m
print('\n'.join(out))
