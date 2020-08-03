<template>
    <input
        :type="type"
        v-bind="$attrs"
        v-on="$listeners"
        class="block w-full border-2 px-3 py-2 rounded focus:outline-none"
        :class="{
            'border-indigo-700': focused,
            'border-gray-300': !focused,
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
        },
    }
</script>
