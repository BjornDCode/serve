<template>
    <Zondicon :icon="name" class="fill-current" />
</template>

<script>
    import Zondicon from 'vue-zondicons'

    export default {
        components: {
            Zondicon,
        },

        props: {
            name: {
                type: String,
                required: true,
            },
        },
    }
</script>
