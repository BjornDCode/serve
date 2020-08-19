<template>
    <ProjectOverview v-bind="$props" />
</template>

<script>
    import ProjectOverview from '@/components/ProjectOverview'

    export default {
        components: {
            ProjectOverview,
        },

        props: {
            project: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            },
            php: {
                type: Object,
                required: true,
            },
            node: {
                type: Object,
                required: true,
            },
            redis: {
                type: Object,
                required: true,
            },
            database: {
                type: Object,
                required: true,
            },
            server: {
                type: Object,
                required: true,
            },
        },
    }
</script>
