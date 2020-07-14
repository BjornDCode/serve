<template>
    <Zondicon :icon="name" class="fill-current" :class="classes" />
</template>

<script>
    import Zondicon from 'vue-zondicons'

    import {
        isValidSize,
        isValidColor,
        isValidShade,
    } from '@/config/validators'

    export default {
        components: {
            Zondicon,
        },

        props: {
            name: {
                type: String,
                required: true,
            },
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
                type: Number,
                default: 4,
                validator: isValidSize,
            },
        },

        computed: {
            classes() {
                return [
                    `text-${this.color}${this.shade ? `-${this.shade}` : ''}`,
                    `h-${this.size}`,
                    `w-${this.size}`,
                ]
            },
        },
    }
</script>
