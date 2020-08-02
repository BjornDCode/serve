<template>
    <Inline
        component="RouterLink"
        v-bind="$attrs"
        class="focus:outline-none focus-visible:shadow-outline"
    >
        <slot />
    </Inline>
</template>

<script>
    import Inline from '@/components/Inline'

    export default {
        components: {
            Inline,
        },
    }
</script>
