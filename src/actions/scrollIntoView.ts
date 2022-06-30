export function scrollIntoView(node: HTMLElement, options?: ScrollIntoViewOptions) {
	node.scrollIntoView({ behavior: 'smooth', ...options });
}
