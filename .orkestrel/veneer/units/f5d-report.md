# Unit F5d PHYSICAL — report

The cascade now writes Bootstrap 5.3.8's physical properties everywhere it wrote a logical one, the
proofs read the physical property, the direction machinery is gone from `tests/setupStyles.ts` and
its proof, and the guide's § Styles sentences and the `img` departure rows say so. The gate chain is
green and the working tree carries owned files only.

Two findings need the Orchestrator's ruling before this lands: the cascade wrote `overflow-inline`,
which neither the terrain's pattern nor acceptance criterion 6 reaches, and stale direction prose
survives in guide sections and a config comment this brief scopes out. Both are recorded under
§ Deviations and findings with exact patches.

## Obligation 0 — the compiled walk

### The measurement's own pattern

The terrain's pattern misses `overflow-inline`, so the walk runs a pattern over every CSS logical
property name and logical value keyword instead, and the terrain's pattern is run beside it. The
broad walk is the population this unit reverted.

```js
const LOGICAL_PROPS = new RegExp(
	'^(?:(?:min-|max-)?(?:inline|block)-size' +
		'|(?:margin|padding|scroll-margin|scroll-padding|inset)-(?:inline|block)(?:-(?:start|end))?' +
		'|border-(?:inline|block)(?:-(?:start|end))?(?:-(?:width|style|color))?' +
		'|border-(?:start|end)-(?:start|end)-radius|overflow-(?:inline|block))$',
	'u',
)
const LOGICAL_VALUES = new Map([
	['text-align', /^(?:start|end)$/u],
	['text-align-last', /^(?:start|end)$/u],
	['float', /^(?:inline-start|inline-end)$/u],
	['clear', /^(?:inline-start|inline-end)$/u],
	['caption-side', /^(?:inline-start|inline-end)$/u],
	['resize', /^(?:inline|block)$/u],
])
```

The walk compiles `src/styles/index.scss` with `sass` at `style: 'expanded'` and
`loadPaths: ['src/styles']`, parses the result with `postcss`, and prints each matching declaration
under its at-rule and selector chain. The before reading was taken against the launch commit's own
source, extracted with `git archive 3ff4e9a src/styles`, so it is the tree this unit started from.

### Before

```text
@layer elements | hr  ::  border-block-start: var(--vn-border-width) solid currentColor
@layer elements | ul  ::  padding-inline-start: calc(var(--vn-space-8) * 2)
@layer elements | ol  ::  padding-inline-start: calc(var(--vn-space-8) * 2)
@layer elements | blockquote  ::  padding-inline-start: var(--vn-space-8)
@layer elements | blockquote  ::  border-inline-start: var(--vn-space-2) solid currentColor
@layer elements | sub  ::  inset-block-end: -0.25em
@layer elements | sup  ::  inset-block-start: -0.5em
@layer elements | var  ::  padding-inline: 0.25em
@layer elements | img  ::  max-inline-size: 100%
@layer elements | img  ::  block-size: auto
@layer elements | caption  ::  padding-block: var(--vn-space-4)
@layer elements | caption  ::  padding-inline: var(--vn-space-6)
@layer elements | caption  ::  text-align: start
@layer elements | td, th  ::  padding-block: var(--vn-space-4)
@layer elements | td, th  ::  padding-inline: var(--vn-space-6)
@layer elements | td, th  ::  border-block-end: var(--vn-border-width) var(--vn-border-style) var(--vn-border-color)
@layer elements | fieldset  ::  min-inline-size: 0
@layer elements | legend  ::  float: inline-start
@layer elements | legend  ::  inline-size: 100%
@layer elements | legend  ::  margin-block-end: var(--vn-space-4)
@layer elements | button  ::  padding-block: var(--vn-space-3)
@layer elements | button  ::  padding-inline: var(--vn-space-6)
@layer elements | button  ::  border-start-start-radius: var(--vn-radius-base)
@layer elements | button  ::  border-start-end-radius: var(--vn-radius-base)
@layer elements | button  ::  border-end-start-radius: var(--vn-radius-base)
@layer elements | button  ::  border-end-end-radius: var(--vn-radius-base)
@layer components | .btn  ::  padding-block: var(--bs-btn-padding-y)
@layer components | .btn  ::  padding-inline: var(--bs-btn-padding-x)
@layer components | .btn  ::  border-start-start-radius: var(--bs-btn-border-radius)
@layer components | .btn  ::  border-start-end-radius: var(--bs-btn-border-radius)
@layer components | .btn  ::  border-end-start-radius: var(--bs-btn-border-radius)
@layer components | .btn  ::  border-end-end-radius: var(--bs-btn-border-radius)
@layer components | .btn-check  ::  inline-size: 1px
@layer components | .btn-check  ::  block-size: 1px
@layer components | .list-unstyled, .list-inline  ::  padding-inline-start: 0
@layer components | .list-inline-item:not(:last-child)  ::  margin-inline-end: var(--vn-space-4)
@layer components | .blockquote  ::  margin-block-end: var(--vn-space-8)
@layer components | .blockquote > :last-child  ::  margin-block-end: 0
@layer components | .blockquote-footer  ::  margin-block-start: calc(var(--vn-space-8) * -1)
@layer components | .blockquote-footer  ::  margin-block-end: var(--vn-space-8)
@layer components | .img-fluid, .img-thumbnail  ::  max-inline-size: 100%
@layer components | .img-fluid, .img-thumbnail  ::  block-size: auto
@layer components | .figure-img  ::  margin-block-end: var(--vn-space-4)
@layer components | .container, .container-fluid, .container-sm, .container-md, .container-lg, .container-xl, .container-xxl  ::  inline-size: 100%
@layer components | .container, .container-fluid, .container-sm, .container-md, .container-lg, .container-xl, .container-xxl  ::  padding-inline: calc(var(--bs-gutter-x) * 0.5)
@layer components | .container, .container-fluid, .container-sm, .container-md, .container-lg, .container-xl, .container-xxl  ::  margin-inline: auto
@layer components | @media (width >= 576px) | .container, .container-sm  ::  max-inline-size: var(--vn-container-sm)
@layer components | @media (width >= 768px) | .container, .container-sm, .container-md  ::  max-inline-size: var(--vn-container-md)
@layer components | @media (width >= 992px) | .container, .container-sm, .container-md, .container-lg  ::  max-inline-size: var(--vn-container-lg)
@layer components | @media (width >= 1200px) | .container, .container-sm, .container-md, .container-lg, .container-xl  ::  max-inline-size: var(--vn-container-xl)
@layer components | @media (width >= 1400px) | .container, .container-sm, .container-md, .container-lg, .container-xl, .container-xxl  ::  max-inline-size: var(--vn-container-xxl)
@layer components | .row  ::  margin-block-start: calc(-1 * var(--bs-gutter-y))
@layer components | .row  ::  margin-inline: calc(-0.5 * var(--bs-gutter-x))
@layer components | .row > *  ::  inline-size: 100%
@layer components | .row > *  ::  max-inline-size: 100%
@layer components | .row > *  ::  padding-inline: calc(var(--bs-gutter-x) * 0.5)
@layer components | .row > *  ::  margin-block-start: var(--bs-gutter-y)
@layer components | .row-cols-auto > *  ::  inline-size: auto
@layer components | .row-cols-1 > *  ::  inline-size: 100%
@layer components | .row-cols-2 > *  ::  inline-size: 50%
@layer components | .row-cols-3 > *  ::  inline-size: 33.33333333%
@layer components | .row-cols-4 > *  ::  inline-size: 25%
@layer components | .row-cols-5 > *  ::  inline-size: 20%
@layer components | .row-cols-6 > *  ::  inline-size: 16.66666667%
@layer components | .col-auto  ::  inline-size: auto
@layer components | .col-1  ::  inline-size: 8.33333333%
@layer components | .col-2  ::  inline-size: 16.66666667%
@layer components | .col-3  ::  inline-size: 25%
@layer components | .col-4  ::  inline-size: 33.33333333%
@layer components | .col-5  ::  inline-size: 41.66666667%
@layer components | .col-6  ::  inline-size: 50%
@layer components | .col-7  ::  inline-size: 58.33333333%
@layer components | .col-8  ::  inline-size: 66.66666667%
@layer components | .col-9  ::  inline-size: 75%
@layer components | .col-10  ::  inline-size: 83.33333333%
@layer components | .col-11  ::  inline-size: 91.66666667%
@layer components | .col-12  ::  inline-size: 100%
@layer components | .offset-1  ::  margin-inline-start: 8.33333333%
@layer components | .offset-2  ::  margin-inline-start: 16.66666667%
@layer components | .offset-3  ::  margin-inline-start: 25%
@layer components | .offset-4  ::  margin-inline-start: 33.33333333%
@layer components | .offset-5  ::  margin-inline-start: 41.66666667%
@layer components | .offset-6  ::  margin-inline-start: 50%
@layer components | .offset-7  ::  margin-inline-start: 58.33333333%
@layer components | .offset-8  ::  margin-inline-start: 66.66666667%
@layer components | .offset-9  ::  margin-inline-start: 75%
@layer components | .offset-10  ::  margin-inline-start: 83.33333333%
@layer components | .offset-11  ::  margin-inline-start: 91.66666667%
@layer components | @media (width >= 576px) | .row-cols-sm-auto > *  ::  inline-size: auto
@layer components | @media (width >= 576px) | .row-cols-sm-1 > *  ::  inline-size: 100%
@layer components | @media (width >= 576px) | .row-cols-sm-2 > *  ::  inline-size: 50%
@layer components | @media (width >= 576px) | .row-cols-sm-3 > *  ::  inline-size: 33.33333333%
@layer components | @media (width >= 576px) | .row-cols-sm-4 > *  ::  inline-size: 25%
@layer components | @media (width >= 576px) | .row-cols-sm-5 > *  ::  inline-size: 20%
@layer components | @media (width >= 576px) | .row-cols-sm-6 > *  ::  inline-size: 16.66666667%
@layer components | @media (width >= 576px) | .col-sm-auto  ::  inline-size: auto
@layer components | @media (width >= 576px) | .col-sm-1  ::  inline-size: 8.33333333%
@layer components | @media (width >= 576px) | .col-sm-2  ::  inline-size: 16.66666667%
@layer components | @media (width >= 576px) | .col-sm-3  ::  inline-size: 25%
@layer components | @media (width >= 576px) | .col-sm-4  ::  inline-size: 33.33333333%
@layer components | @media (width >= 576px) | .col-sm-5  ::  inline-size: 41.66666667%
@layer components | @media (width >= 576px) | .col-sm-6  ::  inline-size: 50%
@layer components | @media (width >= 576px) | .col-sm-7  ::  inline-size: 58.33333333%
@layer components | @media (width >= 576px) | .col-sm-8  ::  inline-size: 66.66666667%
@layer components | @media (width >= 576px) | .col-sm-9  ::  inline-size: 75%
@layer components | @media (width >= 576px) | .col-sm-10  ::  inline-size: 83.33333333%
@layer components | @media (width >= 576px) | .col-sm-11  ::  inline-size: 91.66666667%
@layer components | @media (width >= 576px) | .col-sm-12  ::  inline-size: 100%
@layer components | @media (width >= 576px) | .offset-sm-0  ::  margin-inline-start: 0%
@layer components | @media (width >= 576px) | .offset-sm-1  ::  margin-inline-start: 8.33333333%
@layer components | @media (width >= 576px) | .offset-sm-2  ::  margin-inline-start: 16.66666667%
@layer components | @media (width >= 576px) | .offset-sm-3  ::  margin-inline-start: 25%
@layer components | @media (width >= 576px) | .offset-sm-4  ::  margin-inline-start: 33.33333333%
@layer components | @media (width >= 576px) | .offset-sm-5  ::  margin-inline-start: 41.66666667%
@layer components | @media (width >= 576px) | .offset-sm-6  ::  margin-inline-start: 50%
@layer components | @media (width >= 576px) | .offset-sm-7  ::  margin-inline-start: 58.33333333%
@layer components | @media (width >= 576px) | .offset-sm-8  ::  margin-inline-start: 66.66666667%
@layer components | @media (width >= 576px) | .offset-sm-9  ::  margin-inline-start: 75%
@layer components | @media (width >= 576px) | .offset-sm-10  ::  margin-inline-start: 83.33333333%
@layer components | @media (width >= 576px) | .offset-sm-11  ::  margin-inline-start: 91.66666667%
@layer components | @media (width >= 768px) | .row-cols-md-auto > *  ::  inline-size: auto
@layer components | @media (width >= 768px) | .row-cols-md-1 > *  ::  inline-size: 100%
@layer components | @media (width >= 768px) | .row-cols-md-2 > *  ::  inline-size: 50%
@layer components | @media (width >= 768px) | .row-cols-md-3 > *  ::  inline-size: 33.33333333%
@layer components | @media (width >= 768px) | .row-cols-md-4 > *  ::  inline-size: 25%
@layer components | @media (width >= 768px) | .row-cols-md-5 > *  ::  inline-size: 20%
@layer components | @media (width >= 768px) | .row-cols-md-6 > *  ::  inline-size: 16.66666667%
@layer components | @media (width >= 768px) | .col-md-auto  ::  inline-size: auto
@layer components | @media (width >= 768px) | .col-md-1  ::  inline-size: 8.33333333%
@layer components | @media (width >= 768px) | .col-md-2  ::  inline-size: 16.66666667%
@layer components | @media (width >= 768px) | .col-md-3  ::  inline-size: 25%
@layer components | @media (width >= 768px) | .col-md-4  ::  inline-size: 33.33333333%
@layer components | @media (width >= 768px) | .col-md-5  ::  inline-size: 41.66666667%
@layer components | @media (width >= 768px) | .col-md-6  ::  inline-size: 50%
@layer components | @media (width >= 768px) | .col-md-7  ::  inline-size: 58.33333333%
@layer components | @media (width >= 768px) | .col-md-8  ::  inline-size: 66.66666667%
@layer components | @media (width >= 768px) | .col-md-9  ::  inline-size: 75%
@layer components | @media (width >= 768px) | .col-md-10  ::  inline-size: 83.33333333%
@layer components | @media (width >= 768px) | .col-md-11  ::  inline-size: 91.66666667%
@layer components | @media (width >= 768px) | .col-md-12  ::  inline-size: 100%
@layer components | @media (width >= 768px) | .offset-md-0  ::  margin-inline-start: 0%
@layer components | @media (width >= 768px) | .offset-md-1  ::  margin-inline-start: 8.33333333%
@layer components | @media (width >= 768px) | .offset-md-2  ::  margin-inline-start: 16.66666667%
@layer components | @media (width >= 768px) | .offset-md-3  ::  margin-inline-start: 25%
@layer components | @media (width >= 768px) | .offset-md-4  ::  margin-inline-start: 33.33333333%
@layer components | @media (width >= 768px) | .offset-md-5  ::  margin-inline-start: 41.66666667%
@layer components | @media (width >= 768px) | .offset-md-6  ::  margin-inline-start: 50%
@layer components | @media (width >= 768px) | .offset-md-7  ::  margin-inline-start: 58.33333333%
@layer components | @media (width >= 768px) | .offset-md-8  ::  margin-inline-start: 66.66666667%
@layer components | @media (width >= 768px) | .offset-md-9  ::  margin-inline-start: 75%
@layer components | @media (width >= 768px) | .offset-md-10  ::  margin-inline-start: 83.33333333%
@layer components | @media (width >= 768px) | .offset-md-11  ::  margin-inline-start: 91.66666667%
@layer components | @media (width >= 992px) | .row-cols-lg-auto > *  ::  inline-size: auto
@layer components | @media (width >= 992px) | .row-cols-lg-1 > *  ::  inline-size: 100%
@layer components | @media (width >= 992px) | .row-cols-lg-2 > *  ::  inline-size: 50%
@layer components | @media (width >= 992px) | .row-cols-lg-3 > *  ::  inline-size: 33.33333333%
@layer components | @media (width >= 992px) | .row-cols-lg-4 > *  ::  inline-size: 25%
@layer components | @media (width >= 992px) | .row-cols-lg-5 > *  ::  inline-size: 20%
@layer components | @media (width >= 992px) | .row-cols-lg-6 > *  ::  inline-size: 16.66666667%
@layer components | @media (width >= 992px) | .col-lg-auto  ::  inline-size: auto
@layer components | @media (width >= 992px) | .col-lg-1  ::  inline-size: 8.33333333%
@layer components | @media (width >= 992px) | .col-lg-2  ::  inline-size: 16.66666667%
@layer components | @media (width >= 992px) | .col-lg-3  ::  inline-size: 25%
@layer components | @media (width >= 992px) | .col-lg-4  ::  inline-size: 33.33333333%
@layer components | @media (width >= 992px) | .col-lg-5  ::  inline-size: 41.66666667%
@layer components | @media (width >= 992px) | .col-lg-6  ::  inline-size: 50%
@layer components | @media (width >= 992px) | .col-lg-7  ::  inline-size: 58.33333333%
@layer components | @media (width >= 992px) | .col-lg-8  ::  inline-size: 66.66666667%
@layer components | @media (width >= 992px) | .col-lg-9  ::  inline-size: 75%
@layer components | @media (width >= 992px) | .col-lg-10  ::  inline-size: 83.33333333%
@layer components | @media (width >= 992px) | .col-lg-11  ::  inline-size: 91.66666667%
@layer components | @media (width >= 992px) | .col-lg-12  ::  inline-size: 100%
@layer components | @media (width >= 992px) | .offset-lg-0  ::  margin-inline-start: 0%
@layer components | @media (width >= 992px) | .offset-lg-1  ::  margin-inline-start: 8.33333333%
@layer components | @media (width >= 992px) | .offset-lg-2  ::  margin-inline-start: 16.66666667%
@layer components | @media (width >= 992px) | .offset-lg-3  ::  margin-inline-start: 25%
@layer components | @media (width >= 992px) | .offset-lg-4  ::  margin-inline-start: 33.33333333%
@layer components | @media (width >= 992px) | .offset-lg-5  ::  margin-inline-start: 41.66666667%
@layer components | @media (width >= 992px) | .offset-lg-6  ::  margin-inline-start: 50%
@layer components | @media (width >= 992px) | .offset-lg-7  ::  margin-inline-start: 58.33333333%
@layer components | @media (width >= 992px) | .offset-lg-8  ::  margin-inline-start: 66.66666667%
@layer components | @media (width >= 992px) | .offset-lg-9  ::  margin-inline-start: 75%
@layer components | @media (width >= 992px) | .offset-lg-10  ::  margin-inline-start: 83.33333333%
@layer components | @media (width >= 992px) | .offset-lg-11  ::  margin-inline-start: 91.66666667%
@layer components | @media (width >= 1200px) | .row-cols-xl-auto > *  ::  inline-size: auto
@layer components | @media (width >= 1200px) | .row-cols-xl-1 > *  ::  inline-size: 100%
@layer components | @media (width >= 1200px) | .row-cols-xl-2 > *  ::  inline-size: 50%
@layer components | @media (width >= 1200px) | .row-cols-xl-3 > *  ::  inline-size: 33.33333333%
@layer components | @media (width >= 1200px) | .row-cols-xl-4 > *  ::  inline-size: 25%
@layer components | @media (width >= 1200px) | .row-cols-xl-5 > *  ::  inline-size: 20%
@layer components | @media (width >= 1200px) | .row-cols-xl-6 > *  ::  inline-size: 16.66666667%
@layer components | @media (width >= 1200px) | .col-xl-auto  ::  inline-size: auto
@layer components | @media (width >= 1200px) | .col-xl-1  ::  inline-size: 8.33333333%
@layer components | @media (width >= 1200px) | .col-xl-2  ::  inline-size: 16.66666667%
@layer components | @media (width >= 1200px) | .col-xl-3  ::  inline-size: 25%
@layer components | @media (width >= 1200px) | .col-xl-4  ::  inline-size: 33.33333333%
@layer components | @media (width >= 1200px) | .col-xl-5  ::  inline-size: 41.66666667%
@layer components | @media (width >= 1200px) | .col-xl-6  ::  inline-size: 50%
@layer components | @media (width >= 1200px) | .col-xl-7  ::  inline-size: 58.33333333%
@layer components | @media (width >= 1200px) | .col-xl-8  ::  inline-size: 66.66666667%
@layer components | @media (width >= 1200px) | .col-xl-9  ::  inline-size: 75%
@layer components | @media (width >= 1200px) | .col-xl-10  ::  inline-size: 83.33333333%
@layer components | @media (width >= 1200px) | .col-xl-11  ::  inline-size: 91.66666667%
@layer components | @media (width >= 1200px) | .col-xl-12  ::  inline-size: 100%
@layer components | @media (width >= 1200px) | .offset-xl-0  ::  margin-inline-start: 0%
@layer components | @media (width >= 1200px) | .offset-xl-1  ::  margin-inline-start: 8.33333333%
@layer components | @media (width >= 1200px) | .offset-xl-2  ::  margin-inline-start: 16.66666667%
@layer components | @media (width >= 1200px) | .offset-xl-3  ::  margin-inline-start: 25%
@layer components | @media (width >= 1200px) | .offset-xl-4  ::  margin-inline-start: 33.33333333%
@layer components | @media (width >= 1200px) | .offset-xl-5  ::  margin-inline-start: 41.66666667%
@layer components | @media (width >= 1200px) | .offset-xl-6  ::  margin-inline-start: 50%
@layer components | @media (width >= 1200px) | .offset-xl-7  ::  margin-inline-start: 58.33333333%
@layer components | @media (width >= 1200px) | .offset-xl-8  ::  margin-inline-start: 66.66666667%
@layer components | @media (width >= 1200px) | .offset-xl-9  ::  margin-inline-start: 75%
@layer components | @media (width >= 1200px) | .offset-xl-10  ::  margin-inline-start: 83.33333333%
@layer components | @media (width >= 1200px) | .offset-xl-11  ::  margin-inline-start: 91.66666667%
@layer components | @media (width >= 1400px) | .row-cols-xxl-auto > *  ::  inline-size: auto
@layer components | @media (width >= 1400px) | .row-cols-xxl-1 > *  ::  inline-size: 100%
@layer components | @media (width >= 1400px) | .row-cols-xxl-2 > *  ::  inline-size: 50%
@layer components | @media (width >= 1400px) | .row-cols-xxl-3 > *  ::  inline-size: 33.33333333%
@layer components | @media (width >= 1400px) | .row-cols-xxl-4 > *  ::  inline-size: 25%
@layer components | @media (width >= 1400px) | .row-cols-xxl-5 > *  ::  inline-size: 20%
@layer components | @media (width >= 1400px) | .row-cols-xxl-6 > *  ::  inline-size: 16.66666667%
@layer components | @media (width >= 1400px) | .col-xxl-auto  ::  inline-size: auto
@layer components | @media (width >= 1400px) | .col-xxl-1  ::  inline-size: 8.33333333%
@layer components | @media (width >= 1400px) | .col-xxl-2  ::  inline-size: 16.66666667%
@layer components | @media (width >= 1400px) | .col-xxl-3  ::  inline-size: 25%
@layer components | @media (width >= 1400px) | .col-xxl-4  ::  inline-size: 33.33333333%
@layer components | @media (width >= 1400px) | .col-xxl-5  ::  inline-size: 41.66666667%
@layer components | @media (width >= 1400px) | .col-xxl-6  ::  inline-size: 50%
@layer components | @media (width >= 1400px) | .col-xxl-7  ::  inline-size: 58.33333333%
@layer components | @media (width >= 1400px) | .col-xxl-8  ::  inline-size: 66.66666667%
@layer components | @media (width >= 1400px) | .col-xxl-9  ::  inline-size: 75%
@layer components | @media (width >= 1400px) | .col-xxl-10  ::  inline-size: 83.33333333%
@layer components | @media (width >= 1400px) | .col-xxl-11  ::  inline-size: 91.66666667%
@layer components | @media (width >= 1400px) | .col-xxl-12  ::  inline-size: 100%
@layer components | @media (width >= 1400px) | .offset-xxl-0  ::  margin-inline-start: 0%
@layer components | @media (width >= 1400px) | .offset-xxl-1  ::  margin-inline-start: 8.33333333%
@layer components | @media (width >= 1400px) | .offset-xxl-2  ::  margin-inline-start: 16.66666667%
@layer components | @media (width >= 1400px) | .offset-xxl-3  ::  margin-inline-start: 25%
@layer components | @media (width >= 1400px) | .offset-xxl-4  ::  margin-inline-start: 33.33333333%
@layer components | @media (width >= 1400px) | .offset-xxl-5  ::  margin-inline-start: 41.66666667%
@layer components | @media (width >= 1400px) | .offset-xxl-6  ::  margin-inline-start: 50%
@layer components | @media (width >= 1400px) | .offset-xxl-7  ::  margin-inline-start: 58.33333333%
@layer components | @media (width >= 1400px) | .offset-xxl-8  ::  margin-inline-start: 66.66666667%
@layer components | @media (width >= 1400px) | .offset-xxl-9  ::  margin-inline-start: 75%
@layer components | @media (width >= 1400px) | .offset-xxl-10  ::  margin-inline-start: 83.33333333%
@layer components | @media (width >= 1400px) | .offset-xxl-11  ::  margin-inline-start: 91.66666667%
@layer components | .table  ::  inline-size: 100%
@layer components | .table  ::  margin-block-end: 1rem
@layer components | .table > :not(caption) > * > *  ::  padding-block: 0.5rem
@layer components | .table > :not(caption) > * > *  ::  padding-inline: 0.5rem
@layer components | .table > :not(caption) > * > *  ::  border-block-end-width: var(--bs-border-width)
@layer components | .table-group-divider  ::  border-block-start: calc(var(--bs-border-width) * 2) solid currentcolor
@layer components | .table-sm > :not(caption) > * > *  ::  padding-block: 0.25rem
@layer components | .table-sm > :not(caption) > * > *  ::  padding-inline: 0.25rem
@layer components | .table-bordered > :not(caption) > *  ::  border-block-width: var(--bs-border-width)
@layer components | .table-bordered > :not(caption) > *  ::  border-inline-width: 0
@layer components | .table-bordered > :not(caption) > * > *  ::  border-block-width: 0
@layer components | .table-bordered > :not(caption) > * > *  ::  border-inline-width: var(--bs-border-width)
@layer components | .table-borderless > :not(caption) > * > *  ::  border-block-end-width: 0
@layer components | .table-borderless > :not(:first-child)  ::  border-block-start-width: 0
@layer components | .table-responsive  ::  overflow-inline: auto
@layer components | @media (width < 576px) | .table-responsive-sm  ::  overflow-inline: auto
@layer components | @media (width < 768px) | .table-responsive-md  ::  overflow-inline: auto
@layer components | @media (width < 992px) | .table-responsive-lg  ::  overflow-inline: auto
@layer components | @media (width < 1200px) | .table-responsive-xl  ::  overflow-inline: auto
@layer components | @media (width < 1400px) | .table-responsive-xxl  ::  overflow-inline: auto
@layer components | .icon-link > .bi  ::  inline-size: 1em
@layer components | .icon-link > .bi  ::  block-size: 1em
@layer components | .ratio  ::  inline-size: 100%
@layer components | .ratio::before  ::  padding-block-start: var(--bs-aspect-ratio)
@layer components | .ratio > *  ::  inset-block-start: 0
@layer components | .ratio > *  ::  inset-inline-start: 0
@layer components | .ratio > *  ::  inline-size: 100%
@layer components | .ratio > *  ::  block-size: 100%
@layer components | .vr  ::  inline-size: var(--bs-border-width)
@layer components | .vr  ::  min-block-size: 1em
TOTAL 278
```

The terrain's own pattern over the same compile reported `TOTAL 272`, short by the six
`overflow-inline` rows.

### After

The same walk over the edited source prints one line:

```text
TOTAL 0
```

The terrain's pattern over the same compile also prints `TOTAL 0`.

## Obligation 1 — the source

Every rule the walk listed now carries the physical property. Where the oracle inventory
(`tests/fixtures/oracle/inventory.json`, read per selector) holds the same selector, the inventory's
own declaration form and property order were copied; elsewhere the brief's fallback order applies and
each site is named under § Longhand order chosen.

The compiled result matches the inventory declaration for declaration on every shared selector; the
rules checked by hand after the edit were `.container`, `.row`, `.row > *`, `.btn`,
`.table > :not(caption) > * > *`, `.table-bordered > :not(caption) > *`, `.ratio > *`, `caption`,
and `legend`.

| File                                   | Change                                                                                                                                                                                                                    |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/styles/_mixins.scss`              | `pad-gutters` writes `width` and `padding-right`/`padding-left`; `image-size` writes `max-width`/`height`; `cell-space` writes `padding: var(--vn-space-4) var(--vn-space-6)`; `list-space` writes `padding-left`          |
| `src/styles/elements/_blockquote.scss` | `padding-left`, `border-left`                                                                                                                                                                                             |
| `src/styles/elements/_button.scss`     | `padding: var(--vn-space-3) var(--vn-space-6)`; the four corner radii become `border-top-left-radius`, `border-top-right-radius`, `border-bottom-left-radius`, `border-bottom-right-radius`                               |
| `src/styles/elements/_fieldset.scss`   | `min-width`; `float: left`; `width`; `margin-bottom`                                                                                                                                                                      |
| `src/styles/elements/_hr.scss`         | `border-top`                                                                                                                                                                                                              |
| `src/styles/elements/_html.scss`       | The `interpolate-size` comment names a height or width transition instead of a `block-size` one                                                                                                                          |
| `src/styles/elements/_sub.scss`        | `bottom`                                                                                                                                                                                                                  |
| `src/styles/elements/_sup.scss`        | `top`                                                                                                                                                                                                                     |
| `src/styles/elements/_table.scss`      | `text-align: left`                                                                                                                                                                                                        |
| `src/styles/elements/_tr.scss`         | `border-bottom`                                                                                                                                                                                                           |
| `src/styles/elements/_var.scss`        | `padding-left`, `padding-right`                                                                                                                                                                                           |
| `src/styles/components/_button.scss`   | `.btn` writes `padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x)` and the four physical corner radii; `.btn-check` writes `width`/`height`                                                                          |
| `src/styles/components/_container.scss`| `margin-right`/`margin-left`; `max-width`                                                                                                                                                                                 |
| `src/styles/components/_grid.scss`     | `margin-top`, `margin-right`/`margin-left`, `max-width`, `width`, `margin-left` across the column, row-column, and offset families                                                                                        |
| `src/styles/components/_icon-link.scss`| `width`, `height`                                                                                                                                                                                                         |
| `src/styles/components/_image.scss`    | `margin-bottom`                                                                                                                                                                                                           |
| `src/styles/components/_list.scss`     | `padding-left`; `margin-right`                                                                                                                                                                                            |
| `src/styles/components/_quote.scss`    | `margin-bottom`, `margin-top`                                                                                                                                                                                             |
| `src/styles/components/_ratio.scss`    | `width`; `padding-top`; `top`/`left`/`width`/`height`; the percentage comment names width and height                                                                                                                       |
| `src/styles/components/_table.scss`    | `width`/`margin-bottom`; `padding: 0.5rem 0.5rem` and `padding: 0.25rem 0.25rem`; `border-bottom-width`; `border-top`; `border-width: var(--bs-border-width) 0` and `border-width: 0 var(--bs-border-width)`; `border-top-width`; `overflow-x` |
| `src/styles/components/_vr.scss`       | `width`, `min-height`; the rule comment names the width                                                                                                                                                                   |

No value, token, selector, or layer changed.

## Obligation 2 — the proofs

Every proof that named a logical property now names its physical twin, through this one-to-one map:
`inline-size`/`block-size` and their `min-`/`max-` twins to `width`/`height`; `margin-inline-start`,
`-end`, `margin-block-start`, `-end` to `margin-left`, `-right`, `-top`, `-bottom`; the same for
`padding-*`; `inset-inline-start`, `-end`, `inset-block-start`, `-end` to `left`, `right`, `top`,
`bottom`; `border-inline-start-*`, `-end-*`, `border-block-start-*`, `-end-*` to `border-left-*`,
`-right-*`, `-top-*`, `-bottom-*`; and the four logical corner radii to the four physical ones.

Files touched: `tests/setup.ts`, `tests/setupBrowser.test.ts`, `tests/setupStyles.ts`,
`tests/src/styles/fixtures/mixins.scss`, and the proofs under `tests/src/styles/` for the button,
container, grid, icon-link, image, list, quote, ratio, table, and vertical-rule components and for
the body, button, code, dl, fieldset, img, kbd, pre, table, and tr elements, plus
`tests/src/styles/mixins.test.ts` and `tests/src/styles/index.test.ts`.

The case tables in `tests/setupStyles.ts` took the same map: `TEXT_ADDRESS_CASES`,
`TEXT_BLOCKQUOTE_CASES`, `TEXT_CODE_CASES`, `TEXT_DL_CASES`, `TEXT_HR_CASES`, `TEXT_KBD_CASES`,
`TEXT_OL_CASES`, `TEXT_P_CASES`, `TEXT_PRE_CASES`, `TEXT_SAMP_CASES`, `TEXT_UL_CASES`,
`TEXT_VAR_CASES`, `IMAGE_PAINT_CASES`, and `LIST_CLASS_CASES`. `tests/setup.ts` moves
`CASCADE_KEYS` to `max-width` for `.container` and `border-bottom-color` for `.table`; both are read
only through `readStyle`, so no consumer of that table changed.

`tests/src/styles/fixtures/mixins.scss` keeps the same box: `.vn-fixture-quiet` writes
`padding-top` and `padding-bottom` where it wrote `padding-block`, and the breakpoint fixtures write
`padding-top`.

## Obligation 3 — the direction machinery

Deleted from `tests/setupStyles.ts`, with their cases in `tests/setupStyles.test.ts`, their rows in
that proof's export inventory, and their import lines:

`PHYSICAL_LONGHANDS`, `EDGE_SHORTHANDS`, `RADIUS_SHORTHAND`, `SIDE_KEYWORD_PROPERTIES`,
`matchesEdgeShorthand`, `matchesRadiusShorthand`, `matchesSideKeyword`, `normalizeValueToken`,
`matchesDirectionSensitive`, `filterAsymmetricDeclarations`, `scanPhysicalDeclaration`.

Kept: `splitTopLevelValues`, because `extractShadowLayers` calls it —
`const tokens = splitTopLevelValues(layer)` inside that function. Its own cases stay.
`normalizeValueToken` had no consumer outside the deleted predicates, so it went with them.

`tests/src/styles/index.test.ts` loses the case "declares no physical inline-axis property anywhere
in the shipped cascade" and the `filterAsymmetricDeclarations` import.

Two case titles and two comments in the setup module named the deleted predicates; each was rewritten
to name what remains.

Deleted with the machinery, and reported as a decision rather than a silent edit: the
`tests/setupStyles.test.ts` case "ships an RTL cascade that needs no flipping, over a cascade that
declares treatments". It called `scanPhysicalDeclaration` and its claim was the direction-neutrality
claim D11 revokes; a physical cascade does need flipping for right-to-left and is not flipped. The
sibling case "requires the directional outputs from npm run build:src:styles" stays, so
`dist/src/styles/index.rtl.css` keeps an existence guard until F6 removes the twin under D5.
`configs/src/vite.styles.config.ts` copies `index.css` to `index.rtl.css` byte for byte and applies no
flipping, so the twin is still identical — the plugin never read the logical authoring it cites.

## Obligation 4 — the prose

Owned guide edits, all in § Styles except the last two:

- The `tests/setupStyles.ts` row of the styles file table drops "direction predicates".
- The paragraph describing what the styles proofs load drops "the direction scanners".
- The table-class paragraph reads "Responsive wrappers use physical horizontal overflow".
- The aspect-ratio paragraph reads "whose top padding is a percentage, which resolves against the
  containing block's width".
- The vertical-rule paragraph reads "reads `--bs-border-width` for its width".
- The icon-link departure bullet reads "**The shift's direction is physical.** `translate3d(0.25em,
  0, 0)` moves the icon to the right, and one byte stream serves either writing direction, so the
  icon shifts the same way under each. Bootstrap's own right-to-left sheet flips it." The
  byte-stream sentence is left verbatim for F6 under D5; the sentence about the direction scanner's
  ruled families went with the scanner.
- § Departures from Bootstrap, the `img` row: "Elements' block display, 100% maximum width, and
  automatic height; middle alignment retained".
- § Departures from Bootstrap, the `.img-fluid`, `.img-thumbnail` row: **deleted**. Its whole content
  was the logical-property departure, and Veneer now writes `max-width: 100%` and `height: auto`,
  which is Bootstrap's own `.img-fluid` declaration. No departure remains for the row.

The brief names "the `img` row" and the terrain quotes the `.img-fluid`, `.img-thumbnail` row. Both
rows named the same logical properties, so both were settled: the literal `img` row keeps its real
departure with corrected wording, and the row the terrain quoted is gone. Flag this if the intent was
one row only.

## Longhand order chosen

The inventory supplied the property order wherever it holds the same selector. These sites had no
inventory selector, or an inventory selector that writes nothing on that axis, so the brief's
fallback applies — left then right, top then bottom — with one exception named under § Decisions.

| Site                                                    | Written                                                                 | Why                                                                          |
| ------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `blockquote` (`elements/_blockquote.scss`)              | `padding-left`, `border-left`                                           | Bootstrap's `blockquote` writes `margin: 0 0 1rem` and nothing on either axis |
| `var` (`elements/_var.scss`)                            | `padding-left`, `padding-right`                                         | The inventory has no `var` rule                                               |
| `button` (`elements/_button.scss`)                      | `padding: var(--vn-space-3) var(--vn-space-6)`                          | Veneer addition; see § Decisions                                              |
| `button` corner radii (`elements/_button.scss`)         | top-left, top-right, bottom-left, bottom-right                          | Veneer addition; the brief's corner mapping order                             |
| `caption` and `td, th` through `cell-space`             | `padding: var(--vn-space-4) var(--vn-space-6)`                          | Bootstrap's `caption` writes no inline padding and its bare cells no padding  |
| `.btn-check` (`components/_button.scss`)                | `width: 1px`, `height: 1px`                                             | Bootstrap's `.btn-check` clips instead of sizing                              |
| `td, th` bottom border (`elements/_tr.scss`)            | `border-bottom`                                                         | Bootstrap's bare cells carry zero-width borders                               |
| `.vn-fixture-quiet` (`tests/src/styles/fixtures/`)      | `padding-top`, `padding-bottom`                                         | A test fixture with no Bootstrap counterpart                                  |

## Proof expectations that changed

Each of these is a changed expectation, recorded rather than edited silently.

1. `tests/src/styles/elements/table.test.ts`, the caption case:
   `expect(readStyle(caption, 'text-align')).toBe('start')` became `.toBe('left')`. The cascade now
   writes Bootstrap's own `text-align: left` on `caption`, so the resolved value is `left` rather
   than the logical `start`. This was the only failure the styles project reported after the source
   and proof edits: `Test Files 1 failed | 57 passed`, `Tests 2 failed | 410 passed`, both failures
   the light and dark runs of that one case with `expected 'left' to be 'start'`.

2. `tests/src/styles/elements/tr.test.ts`: the fixture's `<table style="text-align: end">` became
   `text-align: right`, and the cell expectation `.toBe('end')` became `.toBe('right')`. The
   expectation follows the fixture's own input, which changed because acceptance criterion 6's
   pattern reaches `text-align: end` inside `tests/src/styles`. The claim — that `td` and `th`
   inherit the table's alignment — is unchanged.

3. `tests/src/styles/elements/body.test.ts`: the island's `--bs-body-text-align: end` became
   `right`, and `expect(readStyle(consumer, 'text-align')).toBe('end')` became `.toBe('right')`, for
   the same reason. `expect(readStyle(document.body, 'text-align')).toBe('start')` is unchanged and
   still passes, because `src/styles/elements/_body.scss` still writes
   `text-align: var(--bs-body-text-align, start)` — see § Deviations and findings.

4. `tests/src/styles/elements/fieldset.test.ts`:
   `expect(readStyle(legend, 'float')).toBe('inline-start')` became `.toBe('left')`.

5. `tests/src/styles/components/grid.test.ts`, the right-to-left offset case. Its claim died with
   D11: the offset is a physical `margin-left`, so a right-to-left document no longer moves it. The
   case is now "keeps the offset on the left margin whatever direction the document declares" and
   asserts `margin-left` close to 100 and `margin-right` exactly 0, the reverse of what it asserted.
   A logical offset would put the gap on the right and redden it.

6. `tests/src/styles/components/table.test.ts`, the bordered-cell case. Same shape: it read the cell
   edges under `dir="rtl"` and then under `writing-mode: vertical-rl` and expected the pair to move
   to the block axis. The case is now "keeps the bordered cell edges on the same sides in every
   direction and writing mode" and asserts `border-left-width` and `border-right-width` at 1 and
   `border-top-width` at 0 in both modes. A logical `border-inline-width` would put the pair on the
   block axis under `vertical-rl` and redden it.

No other expected value changed: every other read resolves the same pixels through the physical
property, which is what the styles project's `Test Files 58 passed (58)` confirms.

## Decisions taken inside the owned scope

- **A rule that sets both axes writes the physical shorthand; a rule that sets one axis writes that
  axis's two longhands.** `.btn`, the `.table` cell rules, and `.table-bordered` take the
  shorthand because the inventory writes one for those exact selectors
  (`padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x)`, `padding: 0.5rem 0.5rem`,
  `padding: 0.25rem 0.25rem`, `border-width: var(--bs-border-width) 0`,
  `border-width: 0 var(--bs-border-width)`). `cell-space` and the `button` element take it too,
  although the inventory is silent for them, and that departs from the brief's stated fallback. The
  fallback's four longhands made `tests/setupStyles.test.ts` > "carries no shared written declaration
  block across style partials" red: `scanStyleBlocks` reports any two partial blocks sharing at least
  two identical declarations, and `padding-left: var(--vn-space-6)` with
  `padding-right: var(--vn-space-6)` then appeared in both `_mixins.scss` and
  `elements/_button.scss`. The shorthand makes each rule one declaration with its own values, clears
  the gate, and matches Bootstrap's own idiom for both analogues. Recorded rather than escalated
  because the choice sits inside owned files and the brief assigns longhand order to this unit.
- **The four logical corner radii became the four physical corner radii** on `.btn` and on the
  `button` element, per the brief's explicit mapping, rather than collapsing to Bootstrap's own
  `border-radius: var(--bs-btn-border-radius)`. Observation for F5b: `.btn` now carries four corner
  declarations where Bootstrap writes one shorthand, which is a form departure the ledger may want a
  row for. No behavioural difference: the four corners carry one identical value.
- **`overflow-inline: auto` became `overflow-x: auto`** on `.table-responsive` and its five
  breakpoint twins. See § Deviations and findings; the proof at
  `tests/src/styles/components/table.test.ts` already read `overflow-x`, and Bootstrap's inventory
  writes `overflow-x: auto` for each of those selectors.
- **Three source comments were rewritten** where they described the mechanism this unit changed:
  the `interpolate-size` comment in `elements/_html.scss`, the aspect comment in
  `components/_ratio.scss`, and the rule comment in `components/_vr.scss`. Acceptance criterion 6's
  pattern reaches the first of them.

## Deviations and findings

### 1. The terrain's pattern misses `overflow-inline` — changed, ruling requested

**Expected.** The terrain's pattern and acceptance criterion 6 bound the population this unit
reverts.

**Found.** `src/styles/components/_table.scss` wrote `overflow-inline: auto` on `.table-responsive`
and inside each `breakpoint-down` block, which compiles to six declarations. The terrain's pattern
does not reach `overflow-inline`, and neither does acceptance criterion 6's grep. Bootstrap writes
`overflow-x: auto` for every one of those selectors, and
`tests/src/styles/components/table.test.ts` already asserted `readStyle(wrapper, 'overflow-x')`.

**Done.** Changed to `overflow-x: auto`, because the brief's objective sentence — "Every declaration
the cascade writes as a logical property becomes the physical property Bootstrap writes for the same
rule" — reaches it, the file is owned, and leaving it would have left the unit's own stop condition
("a compile that still emits a logical property after the source is physical") true at hand-off.

**Hypothesis.** The terrain's pattern was drawn from the box-model families and never extended to the
overflow family.

### 2. `_body.scss` keeps a logical `start` keyword inside a `var()` fallback — not changed

**Expected.** No logical value keyword survives.

**Found.** `src/styles/elements/_body.scss` writes `text-align: var(--bs-body-text-align, start)`.
The compiled walk does not list it, because the declared value is `var(…)`; acceptance criterion 6's
pattern does not reach it either. Bootstrap writes `text-align: var(--bs-body-text-align)` with no
fallback, and the guide's § Departures from Bootstrap already carries a `--bs-body-text-align` row
recording that fallback as a Veneer departure.

**Not done.** Removing the fallback changes a recorded departure row this brief does not own, and the
resolved reading is `start` either way, because `text-align`'s own initial value is `start` and an
unset custom property makes the declaration invalid at computed-value time.

**Carrier.** F5b ACCOUNTING-LEDGER, which owns the departures table. Name it explicitly there or rule
that the fallback stands.

### 3. Stale direction prose outside the owned guide sections — not changed

Each of these is false after this unit lands. None is gated, so none reddens a run; `npm run
test:guides` exits 0. Patches are in § Shared and off-limits patches.

- `guides/veneer.md` § Departures from Bootstrap, the `table`, `caption` row, which says "logical
  start alignment" against Bootstrap's "left alignment". Veneer now writes `text-align: left` too, so
  no alignment departure remains for the row.
- `guides/veneer.md` § Departures from Bootstrap, the `legend` row, which says "Logical inline-start
  float and inline size" against Bootstrap's "Physical left float and width".
- `guides/veneer.md` § Compatibility, the row, col, and offset selector rows, each saying the family
  "ships with logical sizing and margins", and the `img` selector row, which says the classes are
  "written on the inline and block axes".
- `guides/veneer.md` § Tests, the link text "layer order, position independence, and direction
  neutrality" pointing at `tests/src/styles/index.test.ts`, whose direction case this unit deletes.
- `configs/src/vite.styles.config.ts`, the `veneer-logical-rtl` plugin's comment: "Every declaration
  is authored on the logical axis, which `tests/src/styles/index.test.ts` proves over the shipped
  cascade, so the two directions share one byte stream." Both halves are now false: the declarations
  are physical and the case is gone. The plugin still copies the bytes, so the twin is still
  identical.

**Carriers.** F5b ACCOUNTING-LEDGER for the departures and compatibility rows; F6 FOUNDATION for the
plugin comment, which dies with the plugin under D5 per `ROADMAP.md` § Rulings. The § Tests link text
has no named carrier yet.

### 4. Unverified claims of my own

- I did not drive a real right-to-left or vertical-writing-mode page beyond the two rewritten cases,
  so the claim that no other proof depended on a logical resolution rests on the styles, app,
  journey, and setup projects passing rather than on a targeted sweep.
- The claim that the `.img-fluid`, `.img-thumbnail` departure row carried nothing but the logical
  property rests on reading the row and comparing the compiled rule against the inventory's
  `.img-fluid` and `.img-thumbnail` entries, not on a mechanism that would catch a departure the row
  never recorded.

## Shared and off-limits patches

### `tests/distribution.test.ts` (shared, report-only)

Around the `cascade` script's reading table, currently around line 693. Tabs are literal.

```diff
 for (const [key, id, property] of [
-	['container', 'capped', 'max-inline-size'],
-	['fluid', 'fluid', 'max-inline-size'],
-	['gutter', 'capped', 'padding-inline-start'],
+	['container', 'capped', 'max-width'],
+	['fluid', 'fluid', 'max-width'],
+	['gutter', 'capped', 'padding-left'],
 	['row', 'row', 'display'],
 	['plain', 'plain', 'display'],
 	['table', 'table', 'vertical-align'],
 	['bare', 'bare', 'vertical-align'],
-	['cell', 'cell', 'padding-inline-start'],
-	['bare-cell', 'bare-cell', 'padding-inline-start'],
+	['cell', 'cell', 'padding-left'],
+	['bare-cell', 'bare-cell', 'padding-left'],
 	['link', 'link', 'color'],
 	['danger', 'danger', 'color'],
 ]) {
```

Each reading is a resolved style on the packed cascade, so every expected value is unchanged.

### `tests/app/browser/integration.test.ts` (shared, report-only)

In the case "refuses a covered host, then activates it once the cover is out of the way", currently
around line 289.

```diff
-					style: `position: fixed; inset-block-start: ${String(box.top)}px; inset-inline-start: ${String(box.left)}px; inline-size: ${String(box.width)}px; block-size: ${String(box.height)}px; z-index: 9`,
+					style: `position: fixed; top: ${String(box.top)}px; left: ${String(box.left)}px; width: ${String(box.width)}px; height: ${String(box.height)}px; z-index: 9`,
```

This is the cover element's own inline style, not a cascade read. The same patch is already applied
to the identical string in `tests/setupBrowser.test.ts`, which this unit owns.

### `configs/src/vite.styles.config.ts` (off-limits, report-only)

```diff
 			generateBundle(_options, bundle) {
 				const css = bundle['index.css']
 				if (css?.type !== 'asset') throw new Error('The styles build emitted no index.css')
-				// Every declaration is authored on the logical axis, which `tests/src/styles/index.test.ts`
-				// proves over the shipped cascade, so the two directions share one byte stream.
+				// The twin is the same byte stream: nothing flips the cascade, so a right-to-left
+				// document receives the declarations a left-to-right one receives. F6 removes both.
 				this.emitFile({ type: 'asset', fileName: 'index.rtl.css', source: css.source })
 			},
```

### `guides/veneer.md` § Departures from Bootstrap (off-limits rows, report-only)

Replace the `table`, `caption` row's Veneer cell "Elements' top caption, 8px/12px caption padding,
.875em muted caption, and logical start alignment" with "Elements' top caption, 8px/12px caption
padding, and .875em muted caption", and its Bootstrap cell "Bottom caption, 8px block padding,
body-sized secondary text, and left alignment" with "Bottom caption, 8px block padding, and
body-sized secondary text".

Replace the `legend` row's Veneer cell "Logical inline-start float and inline size; Bootstrap's
responsive font size and 8px end margin retained; the sibling-clear selector is Excluded" with
"Bootstrap's responsive font size and 8px bottom margin retained; the sibling-clear selector is
Excluded", and its Bootstrap cell "Physical left float and width, with sibling clearing" with "The
same left float and width, with sibling clearing".

Re-pad each edited cell so the row keeps the table's column widths.

### `guides/veneer.md` § Compatibility (off-limits rows, report-only)

In every selector row of the row, col, and offset components, replace "ships with logical sizing
and margins" with "ships with physical sizing and margins". In the `img` selector row, replace "written on the inline
and block axes" with "written with `max-width` and `height`". Re-pad each edited cell.

### `guides/veneer.md` § Tests (off-limits, report-only)

```diff
-[layer order, position independence, and direction neutrality](../tests/src/styles/index.test.ts),
+[layer order and position independence](../tests/src/styles/index.test.ts),
```

## Commands and exit codes

Run with npm 11.19.1 on `PATH` (`npm --version` printed `11.19.1`) and Node v22.22.2, from
`/home/user/veneer`.

| Command                                                       | Exit | Reading                                                        |
| ------------------------------------------------------------- | ---- | ---------------------------------------------------------------- |
| `npm run format:check`                                        | 0    | All matched files use the correct format                        |
| `npm run lint:check`                                          | 0    | No output                                                       |
| `npm run check`                                               | 0    | Root, core, browser, styles, and app projects                   |
| `npm run build`                                               | 0    | —                                                               |
| `npm run build:src && npm run test:src:styles`                | 0    | `Test Files 58 passed (58)`                                     |
| `npm run test:setup`                                          | 0    | `Test Files 3 passed (3)`, `Tests 123 passed (123)`             |
| `npm run test:setup:browser`                                  | 0    | `Test Files 1 passed (1)`                                       |
| `npm run test:conformance`                                    | 0    | `Test Files 1 passed (1)`                                       |
| `npm run test:guides`                                         | 0    | `Test Files 1 passed (1)`, `Tests 18 passed (18)`               |
| `npm run test:policy`                                         | 0    | `Test Files 1 passed (1)`                                       |
| `npm run test:config`                                         | 0    | `Test Files 1 passed (1)`                                       |
| `npm run test:src:core`                                       | 0    | `Test Files 2 passed (2)`                                       |
| `npm run test:src:browser`                                    | 0    | `Test Files 6 passed (6)`                                       |
| `npm run test:app`                                            | 0    | `Test Files 10 passed (10)`                                     |
| `npm run test:journey`                                        | 0    | `Test Files 4 passed (4)`                                       |
| `npm test`                                                    | 0    | Every project green                                             |

The gate chain ran in order after the final edit, which was the `guides/veneer.md` departures-row
re-padding: `format:check` → `lint:check` → `check` → `build` → `npm test`, each exit 0.

Acceptance criterion 6's grep, run in both the brief's literal form and the form that reads
`tests/setupStyles.test.ts` in place of the repeated `tests/setupStyles.ts`:

```text
$ grep -rnE '(margin|padding|border|inset)-(inline|block)|\b(inline|block)-size\b|border-(start|end)-(start|end)-radius|text-align:\s*(start|end)' src/styles tests/src/styles tests/setupStyles.ts tests/setupStyles.ts guides/veneer.md
criterion6 exit=1
$ grep -rnE '(margin|padding|border|inset)-(inline|block)|\b(inline|block)-size\b|border-(start|end)-(start|end)-radius|text-align:\s*(start|end)' src/styles tests/src/styles tests/setupStyles.ts tests/setupStyles.test.ts guides/veneer.md
with test file exit=1
```

Neither prints a line; exit 1 is grep's own "no match".

## Observations, not criteria

- `npm test` exits 0 with every project green, including the journey suite.
- The `distribution` project was not run; it is registry-gated and its file is off-limits. Its patch
  is above.

## Tree state

`git status --porcelain` lists modified owned files only — no untracked or staged path, and `tmp/`
carries only `tmp/capture` and `tmp/units`, neither this unit's. Every probe was deleted.

```text
 M guides/veneer.md
 M src/styles/_mixins.scss
 M src/styles/components/_button.scss
 M src/styles/components/_container.scss
 M src/styles/components/_grid.scss
 M src/styles/components/_icon-link.scss
 M src/styles/components/_image.scss
 M src/styles/components/_list.scss
 M src/styles/components/_quote.scss
 M src/styles/components/_ratio.scss
 M src/styles/components/_table.scss
 M src/styles/components/_vr.scss
 M src/styles/elements/_blockquote.scss
 M src/styles/elements/_button.scss
 M src/styles/elements/_fieldset.scss
 M src/styles/elements/_hr.scss
 M src/styles/elements/_html.scss
 M src/styles/elements/_sub.scss
 M src/styles/elements/_sup.scss
 M src/styles/elements/_table.scss
 M src/styles/elements/_tr.scss
 M src/styles/elements/_var.scss
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/components/button.test.ts
 M tests/src/styles/components/container.test.ts
 M tests/src/styles/components/grid.test.ts
 M tests/src/styles/components/icon-link.test.ts
 M tests/src/styles/components/image.test.ts
 M tests/src/styles/components/list.test.ts
 M tests/src/styles/components/quote.test.ts
 M tests/src/styles/components/ratio.test.ts
 M tests/src/styles/components/table.test.ts
 M tests/src/styles/components/vr.test.ts
 M tests/src/styles/elements/body.test.ts
 M tests/src/styles/elements/button.test.ts
 M tests/src/styles/elements/code.test.ts
 M tests/src/styles/elements/dl.test.ts
 M tests/src/styles/elements/fieldset.test.ts
 M tests/src/styles/elements/img.test.ts
 M tests/src/styles/elements/kbd.test.ts
 M tests/src/styles/elements/pre.test.ts
 M tests/src/styles/elements/table.test.ts
 M tests/src/styles/elements/tr.test.ts
 M tests/src/styles/fixtures/mixins.scss
 M tests/src/styles/index.test.ts
 M tests/src/styles/mixins.test.ts
```

```text
$ git diff --stat
 guides/veneer.md                              |  23 +--
 src/styles/_mixins.scss                       |  14 +-
 src/styles/components/_button.scss            |  15 +-
 src/styles/components/_container.scss         |   5 +-
 src/styles/components/_grid.scss              |  19 +-
 src/styles/components/_icon-link.scss         |   4 +-
 src/styles/components/_image.scss             |   2 +-
 src/styles/components/_list.scss              |   4 +-
 src/styles/components/_quote.scss             |   8 +-
 src/styles/components/_ratio.scss             |  17 +-
 src/styles/components/_table.scss             |  28 ++-
 src/styles/components/_vr.scss                |   6 +-
 src/styles/elements/_blockquote.scss          |   4 +-
 src/styles/elements/_button.scss              |  11 +-
 src/styles/elements/_fieldset.scss            |   8 +-
 src/styles/elements/_hr.scss                  |   2 +-
 src/styles/elements/_html.scss                |   2 +-
 src/styles/elements/_sub.scss                 |   2 +-
 src/styles/elements/_sup.scss                 |   2 +-
 src/styles/elements/_table.scss               |   2 +-
 src/styles/elements/_tr.scss                  |   2 +-
 src/styles/elements/_var.scss                 |   3 +-
 tests/setup.ts                                |   4 +-
 tests/setupBrowser.test.ts                    |   4 +-
 tests/setupStyles.test.ts                     | 239 +---------------------
 tests/setupStyles.ts                          | 272 ++++----------------------
 tests/src/styles/components/button.test.ts    |  24 +--
 tests/src/styles/components/container.test.ts |  14 +-
 tests/src/styles/components/grid.test.ts      |   8 +-
 tests/src/styles/components/icon-link.test.ts |   6 +-
 tests/src/styles/components/image.test.ts     |  26 +--
 tests/src/styles/components/list.test.ts      |   4 +-
 tests/src/styles/components/quote.test.ts     |  10 +-
 tests/src/styles/components/ratio.test.ts     |  36 ++--
 tests/src/styles/components/table.test.ts     |  12 +-
 tests/src/styles/components/vr.test.ts        |  22 +--
 tests/src/styles/elements/body.test.ts        |   4 +-
 tests/src/styles/elements/button.test.ts      |   8 +-
 tests/src/styles/elements/code.test.ts        |   2 +-
 tests/src/styles/elements/dl.test.ts          |   2 +-
 tests/src/styles/elements/fieldset.test.ts    |  10 +-
 tests/src/styles/elements/img.test.ts         |   8 +-
 tests/src/styles/elements/kbd.test.ts         |   4 +-
 tests/src/styles/elements/pre.test.ts         |   4 +-
 tests/src/styles/elements/table.test.ts       |   2 +-
 tests/src/styles/elements/tr.test.ts          |  12 +-
 tests/src/styles/fixtures/mixins.scss         |  10 +-
 tests/src/styles/index.test.ts                |  17 +-
 tests/src/styles/mixins.test.ts               |  12 +-
 49 files changed, 251 insertions(+), 708 deletions(-)
```
