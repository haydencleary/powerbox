import tippy from 'tippy.js';
import type { Props } from 'tippy.js';

interface TooltipOptions extends Partial<Props> {
	content: string;
}

export function tooltip(node: HTMLElement, options: TooltipOptions) {
	const instance = tippy(node, { interactive: true, ...options });

	return {
		destroy: () => {
			instance.destroy();
		}
	};
}
