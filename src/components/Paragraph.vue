<template>
    <Copy component="p" color="gray" shade="700">
        <slot />
    </Copy>
</template>

<script>
    import Copy from '@/components/Copy'

    export default {
        components: {
            Copy,
        },
    }
</script>
