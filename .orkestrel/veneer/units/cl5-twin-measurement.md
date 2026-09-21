# The class-versus-tag twin divergences, measured

Taken by the Orchestrator from `research/calibration-content.md` and the shipped partials, to
bound the successor that owns these pairs rather than hand it an open question. CL5's round-1
audit raised the divergences (subjective lane finding C and 13); this is the reading behind the
ruling that successor's brief will carry.

## The mark pair

The record's `### small-mark` section measured Elements' `mark` specimen at rest, identically on
both engines and in both modes:

| Property | Reading |
| --- | --- |
| `padding-top` and `padding-bottom` | `0px` |
| `padding-right` and `padding-left` | `2.625px`, which is `0.1875em` at the specimen's `14px` size |
| `color` | `rgb(0, 0, 0)` |
| `background-color` | `rgb(255, 255, 0)` |
| `--set-mark-color` | `marktext` |
| `--set-mark-background-color` | `mark` |

Elements does not leave its mark unpainted by omission. It sets its own mark tokens to the CSS
system colours `marktext` and `mark`, and those resolve to the user-agent highlight, which is the
black-on-yellow the computed rows show.

**What Veneer ships.** `src/styles/elements/_mark.scss` declares the inline padding and no paint,
so the user-agent rule supplies the same black-on-yellow. The tag therefore reproduces the
record exactly, and CL3's decision is correct.

`src/styles/components/_type.scss` ships `.mark` with all-sides padding and paint from
`--bs-highlight-color` and `--bs-highlight-bg`, retained from Bootstrap's own class line. So a
span carrying the class renders differently from the tag.

**Why that is a defect rather than two correct choices.** Bootstrap builds `.mark` by extending
`mark`, exactly as it builds `.h1` by extending `h1`. The class exists so a non-mark element can
take the mark treatment, not to give a different treatment. CL5's own heading ruling is that a
class twin must not disagree with its tag on the same page, and the subjective lane's finding is
that the same reasoning applies here word for word and was not applied.

**The bounded choice for the successor.** The class cannot simply drop its paint: the user-agent
rule reaches the `mark` element only, so a span carrying an unpainted class gets no highlight at
all and the twin still disagrees. The two ends are:

- **Ruled option.** The class declares the system colours the record measured, `marktext` and
  `mark`, plus the tag's inline padding, so a span carrying it renders as the tag does. This
  satisfies the twin rule, matches the record on both sides, and departs from Bootstrap's
  highlight tokens, which is a departure row for the guide's owner.
- **The alternative.** The tag adopts Bootstrap's highlight tokens and the class keeps them, which
  makes both sides agree with Bootstrap and puts both out of step with the record.

The ruled option is preferred because the record is the campaign's authority for what a tag
renders, and CL3 calibrated the tag against it. The alternative would overturn a landed
calibration to match a library the package deliberately departs from elsewhere.

**Report to the user at the family's acceptance:** Veneer's mark highlight follows the system
colours Elements measured rather than Bootstrap's `--bs-highlight-bg` and `--bs-highlight-color`,
so a consumer retuning those Bootstrap properties moves nothing.

## The figure-caption pair

`src/styles/components/_image.scss` reads `--bs-secondary-color` while `figcaption` reads
`--vn-text-muted` through the caption mixin. Bootstrap's own shipped cascade does style bare
`figcaption` with smaller secondary-coloured text, so the objective lane's correction stands:
Bootstrap does not make the bare tag equivalent to the class here, and this pair is not the same
kind of defect as the mark pair. The successor measures both resolved values and either binds
them to one token or records the difference.

## The figure pair

`src/styles/components/_image.scss` sets `display: inline-block` on `.figure` while
`src/styles/elements/_figure.scss` sets `display: flex` with a column direction and a gap. On a
figure element carrying the class, the class wins the display and leaves the direction and the
gap applying to a box that is no longer flex. It is inert as shipped, and the subjective lane's
point is that a later change giving the class a flex or grid display silently re-arms both. The
successor reads the residual gap in the figure case so such a change names itself.
