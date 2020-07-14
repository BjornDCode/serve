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
    import { isValidAlignment, isValidSpace } from '@/config/validators'

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
            space: {
                type: Number,
                default: 0,
                validator: isValidSpace,
            },
        },

        computed: {
            classes() {
                return [`items-${this.align}`, `space-y-${this.space}`]
            },
        },
    }
</script>
