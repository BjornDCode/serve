<template>
    <td :class="classes">
        <slot />
    </td>
</template>

<script>
    import {
        isValidSize,
        isValidSpace,
        isValidTextAlignment,
    } from '@/config/validators'

    export default {
        props: {
            spaceX: {
                type: Number,
                validator: isValidSpace,
            },
            spaceY: {
                type: Number,
                validator: isValidSpace,
            },
            align: {
                type: String,
                default: 'left',
                validator: isValidTextAlignment,
            },
            width: {
                type: [Number, String],
                validator: isValidSize,
            },
        },

        computed: {
            classes() {
                return [
                    `text-${this.align}`,
                    ...(this.spaceX ? [`px-${this.spaceX}`] : []),
                    ...(this.spaceY ? [`py-${this.spaceY}`] : []),
                    ...(this.width ? [`w-${this.width}`] : []),
                ]
            },
        },
    }
</script>
