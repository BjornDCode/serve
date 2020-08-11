<template>
    <Box
        class="flex"
        :class="classes"
        v-bind="$attrs"
        :align="align"
        v-on="$listeners"
    >
        <slot />
    </Box>
</template>

<script>
    import { isValidSpace, isValidAlignment } from '@/config/validators'

    import Box from '@/components/Box'

    export default {
        components: {
            Box,
        },

        props: {
            align: {
                type: String,
                default: 'center',
                validator: isValidAlignment,
            },
            space: {
                type: Number,
                default: 0,
                validator: isValidSpace,
            },
        },

        computed: {
            classes() {
                return [`space-x-${this.space}`]
            },
        },
    }
</script>
