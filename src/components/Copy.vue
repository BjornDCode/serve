<template>
    <Component :is="component" :class="classes">
        <slot />
    </Component>
</template>

<script>
    import {
        isValidColor,
        isValidShade,
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
        },

        computed: {
            classes() {
                return [
                    `text-${this.size}`,
                    `text-${this.color}${this.shade ? `-${this.shade}` : ''}`,
                ]
            },
        },
    }
</script>
