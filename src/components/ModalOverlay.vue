<template>
    <Box
        position="fixed"
        :left="0"
        :right="0"
        :top="0"
        :bottom="0"
        color="indigo"
        shade="900"
        justify="center"
        :backgroundOpacity="25"
        v-bind="$attrs"
        overflow="y-auto"
        @click.self="$emit('close')"
    >
        <slot />
    </Box>
</template>

<script>
    import Box from '@/components/Box'

    export default {
        components: {
            Box,
        },
    }
</script>
