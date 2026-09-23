// J-TYPES round 5, criterion 4: each refusal line below must produce exactly one diagnostic; every
// acceptance line must produce none.
import type {
	ButtonOptions,
	CollapseEventMap,
	CollapseOptions,
	DelegateOptions,
	EventWire,
	ModalHooks,
	PopoverOptions,
	TooltipOptions,
} from '../../../../../../../WebstormProjects/veneer-types/src/browser/types.ts'

// Refusals.
export const refusedSuffix: EventWire<CollapseEventMap, 'collapse'> = {
	show: 'show.bs.collapse',
	shown: 'shown.vn.collapse',
	hide: 'hide.vn.collapse',
	hidden: 'hidden.vn.collapse',
}
export const refusedEntity: EventWire<CollapseEventMap, 'collapse'> = {
	show: 'show.vn.modal',
	shown: 'shown.vn.collapse',
	hide: 'hide.vn.collapse',
	hidden: 'hidden.vn.collapse',
}
export const refusedSanitize: TooltipOptions = { sanitize: { enabled: false } }
export const refusedToggle: CollapseOptions = { toggle: false }
export const refusedHidePrevented: ModalHooks = { hidePrevented: () => undefined }

// Acceptances.
export const acceptedWire: EventWire<CollapseEventMap, 'collapse'> = {
	show: 'show.vn.collapse',
	shown: 'shown.vn.collapse',
	hide: 'hide.vn.collapse',
	hidden: 'hidden.vn.collapse',
}
export const acceptedClasses: CollapseOptions = { classes: { shown: 'is-open' } }
export const acceptedDelegate: DelegateOptions = { collapse: { classes: { shown: 'is-open' } } }
export const acceptedPopover: PopoverOptions = { selectors: { content: '.tip-body' } }
export const acceptedSanitizer: TooltipOptions = { sanitizer: { write() {} } }
export const acceptedSignal: ButtonOptions = { signal: new AbortController().signal }
export const acceptedPrevent: ModalHooks = { prevent: () => undefined }
