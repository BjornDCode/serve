<template>
    <Component :is="component" :class="classes">
        <slot />
    </Component>
</template>

<script>
    import {
        isValidColor,
        isValidShade,
        isValidWeight,
        isValidFontSize,
    } from '@/config/validators'

    export default {
        props: {
            component: {
                type: String,
                default: 'span',
            },
            size: {
                type: String,
                default: 'base',
                validator: isValidFontSize,
            },
            color: {
                type: String,
                default: 'black',
                validator: isValidColor,
            },
            shade: {
                type: String,
                validator: isValidShade,
            },
            weight: {
                type: String,
                default: 'normal',
                validator: isValidWeight,
            },
        },

        computed: {
            classes() {
                return [
                    `text-${this.size}`,
                    `text-${this.color}${this.shade ? `-${this.shade}` : ''}`,
                    `font-${this.weight}`,
                ]
            },
        },
    }
</script>
