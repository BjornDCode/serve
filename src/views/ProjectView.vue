<template>
    <Project v-bind="project" />
</template>

<script>
    import Project from '@/components/Project'

    export default {
        components: {
            Project,
        },

        computed: {
            project() {
                return this.$store.getters['projects/find'](
                    this.$route.params.id
                )
            },
        },
    }
</script>
