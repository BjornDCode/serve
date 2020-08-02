<template>
    <Component
        :is="component"
        class="flex flex-col"
        :class="classes"
        v-bind="$attrs"
    >
        <slot />
    </Component>
</template>

<script>
    import {
        isValidSize,
        isValidSpace,
        isValidAlignment,
        isValidJustification,
    } from '@/config/validators'

    import Box from '@/components/Box'

    export default {
        components: {
            Box,
        },

        props: {
            component: {
                type: String,
                default: 'div',
            },
            align: {
                type: String,
                default: 'start',
                validator: isValidAlignment,
            },
            justify: {
                type: String,
                default: 'start',
                validator: isValidJustification,
            },
            space: {
                type: Number,
                default: 0,
                validator: isValidSpace,
            },
            height: {
                type: [Number, String],
                validator: isValidSize,
            },
            width: {
                type: [Number, String],
                validator: isValidSize,
            },
            expand: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            classes() {
                return [
                    `items-${this.align}`,
                    `space-y-${this.space}`,
                    `justify-${this.justify}`,
                    ...(this.height ? [`h-${this.height}`] : []),
                    ...(this.width ? [`w-${this.width}`] : []),
                    ...(this.expand ? [`flex-1`] : []),
                ]
            },
        },
    }
</script>
