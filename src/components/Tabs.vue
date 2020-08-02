<template>
    <Inline :space="4">
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
