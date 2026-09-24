# AP-TYPE round 6 report — the form-check partial sentence

Successor to `ap-type-report-5.md`. The round-5 audit found one partial sentence in § Form check
classes that named the wrong partial. This unit corrects it.

## Edit

In `guides/veneer.md` § Form check classes, the sentence "This partial writes none of either."
now reads "The `_form-check.scss` partial writes none of either." The paragraph needed no rewrap:
the edited line is 99 columns, and every other line of the paragraph is unchanged.

### Before

```
The check key ships whole: the check row and its floated box, the checkbox and radio shapes, the
held, focused, checked, mixed, and disabled states, the reverse and inline layouts, and the switch
with its track, its knob positions, and the reduced-motion twin of the knob transition. The release
records the switch row's own inset only under the umbrella `form` key, and it ships here, because
the switch track needs it. The validation rules that reach a check ship from the
`src/styles/components/_validation.scss` partial. The `.btn-check` rules the release writes in its
own check partial are recorded under the `btn` key, and they ship in Button's own form from the
`src/styles/components/_button.scss` partial. This partial writes none of either.
```

### After

```
The check key ships whole: the check row and its floated box, the checkbox and radio shapes, the
held, focused, checked, mixed, and disabled states, the reverse and inline layouts, and the switch
with its track, its knob positions, and the reduced-motion twin of the knob transition. The release
records the switch row's own inset only under the umbrella `form` key, and it ships here, because
the switch track needs it. The validation rules that reach a check ship from the
`src/styles/components/_validation.scss` partial. The `.btn-check` rules the release writes in its
own check partial are recorded under the `btn` key, and they ship in Button's own form from the
`src/styles/components/_button.scss` partial. The `_form-check.scss` partial writes none of either.
```

## Gates

| Gate | Command | Exit | Log |
| --- | --- | --- | --- |
| Format | `npm run format:check` | 0 | `tmp/units/apt-6-format.log.txt` |
| Guides test | `npm run test:guides` | 0 | `tmp/units/apt-6-test-guides.log.txt` |

## Diff scope

`tmp/units/apt-6.diff` (`git diff 712ae72 -- guides/veneer.md`) carries every round-3-through-6
edit against the Veneer baseline. Diffed directly against the round-5 guide snapshot
(`tmp/units/apt-6-round5-veneer.md.txt`), the only change is the one line named above; no other
word of the guide changed from round 5.
