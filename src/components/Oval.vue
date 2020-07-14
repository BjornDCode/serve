<template>
    <Box class="rounded-full" :color="color" :shade="shade" :class="classes">
        <slot />
    </Box>
</template>

<script>
    import Box from '@/components/Box'

    import {
        isValidColor,
        isValidShade,
        isValidSize,
    } from '@/config/validators'

    export default {
        components: {
            Box,
        },

        props: {
            color: {
                type: String,
                default: 'transparent',
                validator: isValidColor,
            },
            shade: {
                type: String,
                validator: isValidShade,
            },
            size: {
                type: [Number, String],
                validator: isValidSize,
                required: true,
            },
        },

        computed: {
            classes() {
                return [`h-${this.size}`, `w-${this.size}`]
            },
        },
    }
</script>
