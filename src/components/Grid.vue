<template>
    <Box class="grid" :class="classes" v-bind="$attrs">
        <slot />
    </Box>
</template>

<script>
    import Box from '@/components/Box'

    export default {
        components: {
            Box,
        },

        props: {
            columns: {
                type: Number,
                required: true,
            },
            gap: {
                type: Number,
                default: 0,
            },
        },

        computed: {
            classes() {
                return [`grid-cols-${this.columns}`, `gap-${this.gap}`]
            },
        },
    }
</script>
