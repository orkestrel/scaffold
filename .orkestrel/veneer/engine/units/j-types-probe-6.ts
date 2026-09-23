// J-TYPES round 6, criterion 4: each refusal line below must produce exactly one diagnostic; every
// acceptance line must produce none.
import type {
	CarouselOptions,
	OffcanvasOptions,
	ScrollLockOptions,
	ScrollSpyOptions,
	TooltipOptions,
} from '../../../../../../../WebstormProjects/veneer-types/src/browser/types.ts'

// Refusals.
export const refusedLink: ScrollSpyOptions = { selectors: { link: '.x' } }
export const refusedSelector: TooltipOptions = { selector: '.x' }
export const refusedLockClasses: ScrollLockOptions = { classes: { open: 'x' } }
export const refusedSlide: CarouselOptions = { attributes: { slide: 'data-x' } }

// Acceptances.
export const acceptedParent: ScrollSpyOptions = { selectors: { parent: '.x' } }
export const acceptedDescendants: TooltipOptions = { descendants: '.x' }
export const acceptedFade: OffcanvasOptions = { classes: { fade: 'x' } }
export const acceptedStep: CarouselOptions = { attributes: { step: 'data-x' } }
