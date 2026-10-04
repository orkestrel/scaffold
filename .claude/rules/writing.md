# Writing rules

`AGENTS.md` § Writing governs every reply. This file adds what developer prose, comments, and instruction files decide. Write prose after the code works, and keep it short.

## Voice

- Write `must` for a requirement, `can` for an option, `might` for a possibility, and the imperative for a recommendation. Never `should`, never `We recommend`.
- Address the developer as `you`. Make the software component the subject; it reports, returns, detects, or refuses, and never knows, thinks, wants, or sees. Never `we`, `our`, or `let's` about agent work.
- Use the passive voice only where naming the actor adds nothing.
- Use negative contractions in a reply or a guide, never in an instruction file.

## Order

- Put the condition, goal, or location before the instruction. A report still opens with its finding.
- Put the key point in the first sentence of every paragraph and list item.
- Keep `that`, `then`, `of`, `a`, and `the`. Name the noun after `this`, `these`, or `it` when the referent is unclear.
- State what the reader can do; no double negatives.

## Claims and time

- Claim only what the reader can check. Never `ensure`, `guarantee`, a superlative, or an effort adjective as a claim about behavior; cite the run behind every number.
- Present tense for what exists. Never `currently`, `now`, `new`, `latest`, or `soon`; give a version or a date.
- Recommend one path. Rule on every option you list.

## Tokens, references, links

- Put a code token in backticks and follow it with a noun. Never inflect or pluralize a code token or use it as a verb.
- Point with `preceding`, `following`, `earlier`, or `later`, never `above` or `below`.
- Link text is the destination's title or a descriptive phrase, introduced by `see`. No `here`, no bare URL in prose.
- Paraphrase third-party content and link it. A vendored mirror is fetched bytes and is exempt.

## Structure

- Keep a required fact in the main flow; a note carries only what the reader can skip.
- In a reply or a guide, introduce every list, table, and fence with a sentence. A rule file's list sits bare under its heading. Number a list only where order matters.
- Headings in sentence case: verb first for a task, noun phrase for a concept.

## Examples, numbers, abbreviations

- Build examples from fictional descriptive data; placeholders in `UPPER_SNAKE_CASE`, explained on first use. Never `foo`, `bar`, or `baz`.
- Expand an abbreviation the reader may not know on first use; skip `API`, `CLI`, `JSON`, `URL`, and file formats.
- Numerals for technical quantities, versions, and measurements. Dates as `YYYY-MM-DD`. Serial comma. Mark omitted code with a comment in the sample's language.

## Code comments

- A comment states why, never what the code shows. Delete a comment that restates the line. Do not narrate history, alternatives tried, or a probe's result.
- Write TSDoc only where `.claude/rules/typescript.md` requires it, in its prescribed shape, and no longer than the contract needs.

## Instruction files

`AGENTS.md`, `.claude/rules/*`, `.agents/*`, `.claude/agents/*`, `.codex/agents/*`, `.cursor/rules/*`, and every skill are executed by an agent mid-task.

- Write every line as a directive: what to do, what to check, or what to refuse. Delete a line that does none of those.
- Name the trigger and the action: "When X, do Y".
- State the finding as the rule. Never record how it was found, which session found it, or what was tried first; that belongs in the commit message.
- Cut every clause that persuades, reassures, or explains to a person.
- Give a rule one home. Point at it from elsewhere; never restate it.
- Keep an example only when it disambiguates the rule.
- When an instruction file or a brief governs a quantity, state the property the quantity must serve and leave the figure to the case: never fix a fixture size, a sample count, a percentage, or a threshold, and describe a fixture by its kind and the load it represents. Keep a figure only where it is a contract: a limit a protocol, format, standard, or external tool fixes, an exit code, a measurement with its run, a version, a date, or a limit the user set.
- Keep `AGENTS.md` under 200 lines and the always-loaded set small; move a procedure into a skill and scope a rule with `paths`.

## Substitutions

Replace each term with its replacement. A code identifier and a string inside a fence or a fixture are data and exempt.

| Term                               | Replacement                                  |
| ---------------------------------- | -------------------------------------------- |
| `should`                           | `must`, `can`, `might`, or the imperative    |
| `simply`, `easy`, `just`           | Delete                                       |
| `currently`, `now`                 | Delete, or give the date                     |
| `new`, `latest`                    | Delete, or give the version                  |
| `utilize`, `leverage`              | `use`                                        |
| `via`                              | `through`, `by using`                        |
| `in order to`                      | `to`                                         |
| `e.g.`, `i.e.`                     | `for example`, `that is`                     |
| `etc.`                             | Bound the list, or recast the sentence       |
| `performant`, `robust`             | The measured property                        |
| `allows you to`                    | `lets you`                                   |
| `and/or`                           | `and`, `or`, or `both`                       |
| `since` (causal)                   | `because`                                    |
| `once` (temporal)                  | `after`                                      |
| `above`, `below` (cross-reference) | `preceding`, `following`, `earlier`, `later` |
| `please`                           | Delete                                       |
| `sanity check`                     | `quick check`                                |
| `dummy`                            | `placeholder`                                |
| `blacklist`, `whitelist`           | `denylist`, `allowlist`                      |
| `master`, `slave`                  | `primary`, `replica`                         |

- `policy/no-banned-term` reads comments and the prose sweep in `tests/setupPolicy.ts` reads authored Markdown; each matches the rows banned unconditionally. Rule a hit in `now`, `new`, `latest`, `once`, `since`, `above`, `below`, or `master` yourself by the banned sense.
- Sweep case-insensitively and across inflections. Name the pattern and the paths behind every sweep result.
- Write singular `they` for a person of unstated gender.
- `.claude/rules/names.md` § Fixed lifecycle vocabulary owns `execute`, `abort`, `kill`, `terminate`, and `run`.
