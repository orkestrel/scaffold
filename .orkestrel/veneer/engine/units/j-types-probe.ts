// Type-level probe over the engine contracts; the lines marked BAD must each fail to compile.
import type {
	ButtonEventMap,
	ButtonHooks,
	CollapseEventMap,
	CollapseHooks,
	EventHooks,
	EventWire,
	ModalEventMap,
	PopoverInterface,
	TooltipInterface,
} from 'C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts'

export const good: EventWire<CollapseEventMap> = {
	show: 'show.bs.collapse',
	shown: 'shown.bs.collapse',
	hide: 'hide.bs.collapse',
	hidden: 'hidden.bs.collapse',
}
export const button: EventWire<ButtonEventMap> = { toggle: 'toggle.vn.button' }
export const modal: EventWire<ModalEventMap> = {
	show: 'show.bs.modal',
	shown: 'shown.bs.modal',
	hide: 'hide.bs.modal',
	hidden: 'hidden.bs.modal',
	hidePrevented: 'hidePrevented.bs.modal',
}
export const bad: EventWire<CollapseEventMap> = {
	show: 'shown.bs.collapse', // BAD
	shown: 'shown.bs.collapse',
	hide: 'hide.bs.collapse',
	hidden: 'hidden.bs.collapse',
}
export const hooks: CollapseHooks = { shown: (event) => event.detail }
export const badHooks: CollapseHooks = { opened: () => undefined } // BAD
export function convert(value: ButtonHooks): EventHooks<ButtonEventMap> {
	return value
}
export function back(value: EventHooks<ButtonEventMap>): ButtonHooks {
	return value
}
export function same(value: PopoverInterface): TooltipInterface {
	return value
}
