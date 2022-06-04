<script lang="ts">
	import type { BadgeVariant } from '$types/badge';
	import { BADGE_VARIANT_TODO } from '$types/badge';

	export let variant: BadgeVariant = BADGE_VARIANT_TODO;

	const variants = {
		done: 'bg-green-100 text-green-800',
		todo: 'bg-blue-100 text-blue-800'
	};
</script>

<span
	class={`inline-flex items-center px-2.5 py-0.5 rounded text-sm font-medium bg-gray-100 text-gray-800 ${variants[variant]}`}
>
	<slot />
</span>
