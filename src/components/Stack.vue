<template>
    <Box direction="col" :class="classes" v-bind="$attrs">
        <slot />
    </Box>
</template>

<script>
    import { isValidSpace } from '@/config/validators'

    import Box from '@/components/Box'

    export default {
        components: {
            Box,
        },

        props: {
            space: {
                type: Number,
                default: 0,
                validator: isValidSpace,
            },
        },

        computed: {
            classes() {
                return [`space-y-${this.space}`]
            },
        },
    }
</script>
