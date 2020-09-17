<template>
    <input
        :type="type"
        v-bind="$attrs"
        v-on="$listeners"
        class="block w-full border-2 px-3 py-2 rounded focus:outline-none"
        :class="{
            'border-red-600': status === 'error',
            'border-indigo-700': status === 'focused',
            'border-gray-300': status === 'default',
        }"
    />
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                required: true,
            },
            focused: {
                type: Boolean,
                default: false,
            },
            error: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            status() {
                return this.error
                    ? 'error'
                    : this.focused
                    ? 'focused'
                    : 'default'
            },
        },
    }
</script>
