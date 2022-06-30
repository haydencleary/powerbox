<script lang="ts">
	import type { ButtonVariant } from '$types/button';

	export let type: HTMLButtonElement['type'] = 'button';
	export let variant: ButtonVariant = 'primary';

	const variants = {
		primary: 'shadow-sm text-white bg-blue-600 hover:bg-blue-700',
		secondary: 'text-blue-700 bg-blue-100 hover:bg-blue-200'
	};
</script>

<button
	{type}
	class={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${variants[variant]}`}
	on:click
>
	<slot />
</button>
