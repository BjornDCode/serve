<template>
    <input
        :type="type"
        v-bind="$attrs"
        v-on="$listeners"
        class="block w-full border-2 border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-indigo-700"
    />
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                required: true,
            },
        },
    }
</script>
