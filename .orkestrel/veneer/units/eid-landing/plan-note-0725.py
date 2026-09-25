# Replaces plan.md § Intersession state with intersession-0725.md, naming the pushed main head and the merge commit.
# Usage: python3 plan-note-0725.py <main-head> <merge-head>, from /home/user/scaffold/.orkestrel/veneer.
import sys
main_head, merge_head = sys.argv[1], sys.argv[2]
note = open('units/eid-landing/intersession-0725.md').read().replace('MAIN_HEAD', main_head).replace('MERGE_HEAD', merge_head)
t = open('plan.md').read()
start = t.index('## Intersession state')
end = t.index('## Landing procedure')
open('plan.md', 'w').write(t[:start] + note + t[end:])
print('replaced')
