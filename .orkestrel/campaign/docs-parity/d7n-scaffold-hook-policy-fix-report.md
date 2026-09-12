Touched:

- `.claude/skills/enterprise-bootstrap/SKILL.md`
- `.agents/skills/enterprise-bootstrap/SKILL.md`
- `.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md`
- `.agents/skills/enterprise-bootstrap/references/color-modes.md`
- `.agents/skills/enterprise-bootstrap/references/frontend-design.md`
- `.agents/skills/enterprise-bootstrap/references/inspection.md`

Changes:

```diff
- where things should scale together
+ where elements must scale together

- where columns should scale together
+ where columns must scale together

- the one element that should dominate
+ the primary element

- not just `aria-sort`, labels, or a success message.
+ not merely `aria-sort`, labels, or a success message.
```

The Claude bridge frontmatter description now exactly matches the canonical skill description.

`git -C C:/Users/mikes/WebstormProjects/scaffold diff --check -- [owned paths]` exited `0` with no output. Existing dirty edits remained untouched.
