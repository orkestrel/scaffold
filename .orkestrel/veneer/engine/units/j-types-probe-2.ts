// J-TYPES round 2 type-level probe; each line marked BAD must fail, every other line must compile.
import type {
	ButtonEventMap,
	ButtonHooks,
	DropdownOptions,
	EventHooks,
	PlacementInput,
	PopoverInterface,
	ScrollSpyInterface,
	TooltipInterface,
	TooltipOptions,
} from 'C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts'

declare const element: HTMLElement
declare const tip: TooltipInterface
declare const pop: PopoverInterface
declare const wide: EventHooks<ButtonEventMap>
declare const narrow: ButtonHooks

export const tipStatic: TooltipOptions = { placement: { static: true } } // BAD
export const menuPosition: DropdownOptions = { placement: { position: 'top' } } // BAD
export const promotedAuto: PlacementInput = { reference: element, element, popover: 'auto' } // BAD
export const fillVoid: TooltipInterface = { ...tip, fill: () => {} } // BAD
export const spyActive: ScrollSpyInterface = { host: element, target: element, active: undefined, refresh() {}, destroy() {} } // BAD

export const menuControl: DropdownOptions = { placement: { offset: [0, 2], static: true } }
export const tipControl: TooltipOptions = { placement: { position: 'top', offset: [0, 6], fallbacks: ['top'] } }
export const promotedHint: PlacementInput = { reference: element, element, popover: 'hint' }
export const promotedManual: PlacementInput = { reference: element, element, popover: 'manual' }
export const spyLink: ScrollSpyInterface = { host: element, target: element, link: undefined, refresh() {}, destroy() {} }
export const hooksFrom: ButtonHooks = wide
export const hooksTo: EventHooks<ButtonEventMap> = narrow
export const fillTip: Promise<boolean> = tip.fill({ '.tooltip-inner': 'Saved' })
export const fillPop: Promise<boolean> = pop.fill({ '.popover-body': 'Saved' })
export const popAsTip: TooltipInterface = pop
