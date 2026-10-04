| rows/capture | 377.506 | 291.792–472.781 | 3773427–3773427 |
| rows/innerText | 6.472 | 4.857–10.643 | 71968–71968 |
| rows/textContent | 5.539 | 4.828–8.985 | 102151–102151 |
| rows/outline | 941.464 | 872.138–1110.272 | 75924–75924 |
| rows/accessibility | 902.816 | 773.944–982.574 | 3470596–3470596 |
| rows/snapshot | 424.200 | 372.757–466.425 | 7750387–7750974 |
| rows/look | 1002.607 | 845.146–1036.656 | 4066–4066 |
| rows/read | 504.208 | 436.714–669.139 | 4030–4030 |
| rows/raw-capture | 102.528 | 94.369–115.631 | 2307806–2307806 |
| rows/markdown-true-parse | 247.395 | 186.987–285.959 | 2145198–2145198 |
| rows/markdown-true-project | 219.425 | 125.824–272.023 | 88053–88053 |
| rows/markdown-true-slice | 0.023 | 0.007–0.030 | 3982–3982 |
| rows/markdown-false-parse | 205.251 | 181.257–261.396 | 2145198–2145198 |
| rows/markdown-false-project | 61.776 | 48.334–113.810 | 90033–90033 |
| rows/markdown-false-slice | 0.009 | 0.005–0.013 | 3973–3973 |
| rows/text-true-parse | 293.801 | 190.537–348.673 | 2145198–2145198 |
| rows/text-true-project | 158.192 | 112.934–172.586 | 66852–66852 |
| rows/text-true-slice | 0.242 | 0.186–0.304 | 3988–3988 |
| rows/text-false-parse | 230.076 | 180.135–255.332 | 2145198–2145198 |
| rows/text-false-project | 16.141 | 12.669–26.651 | 73691–73691 |
| rows/text-false-slice | 0.330 | 0.226–0.636 | 3990–3990 |
| dom/capture | 16.400 | 13.900–23.400 | 2307806–2307806 |
| dom/read | 235.000 | 193.600–331.700 | 2145198–2145198 |
| dom/markdown | 149.800 | 126.100–200.900 | 88053–88053 |
| dom/text-after-markdown | 6.500 | 5.300–14.600 | 66852–66852 |
| dom/outline | 236.700 | 199.100–290.300 | 79050–79050 |
| look | Shows the page's text and the elements you can act on, each with a reference like e4. Call it first and after the page changes. | what, offset |
| markdown | Reads content as Markdown. Call it for headings, links, and tables. | offset, ref |
| text | Reads content as plain text. Call it for words without Markdown syntax. | offset, ref |
| click | Clicks the element with that reference. | ref |
| type | Types into the text control with that reference; set submit to true to submit its form. | ref, text, submit, secret |
| press | Presses that key or chord, such as Enter or Control+a. | key |
| navigate | Opens that absolute web address in the current tab. | url |
| wait | Waits for text to appear; set absent to true to wait for it to leave. | text, timeout, absent |
| dialog | Accepts or dismisses the open dialog. | accept, text |
| tabs | Lists the open tabs; the current one is marked. | what |
| switch | Switches to a tab from tabs, such as t2. | tab |
| record | Starts recording your next actions as a journey with that name; call save when it is done. | journey |
| save | Stops recording and saves the journey; describe what it achieves in one sentence. | description |
| journeys | Lists the saved journeys with their steps and the parameters each one takes. | what, offset |
| edit | Changes a saved journey: add, remove, or update steps by their ids from journeys, or declare a parameter. | journey, edits |
| replay | Replays a saved journey step by step; give each parameter's value under inputs. | journey, inputs |
| forget | Removes a saved journey and all its runs; the name is free to record again. | journey |
