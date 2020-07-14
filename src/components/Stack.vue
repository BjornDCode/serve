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
        isValidSpace,
        isValidAlignment,
        isValidJustification,
    } from '@/config/validators'

    export default {
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
        },

        computed: {
            classes() {
                return [
                    `items-${this.align}`,
                    `space-y-${this.space}`,
                    `justify-${this.justify}`,
                ]
            },
        },
    }
</script>
