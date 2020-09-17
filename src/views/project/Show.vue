<template>
    <Project v-bind="project" @toggle="moveToNextStatus" />
</template>

<script>
    import { mapActions } from 'vuex'

    import Project from '@/components/Project'

    export default {
        components: {
            Project,
        },

        computed: {
            project() {
                return this.$store.getters['projects/find'](
                    this.$route.params.id,
                )
            },
        },

        methods: {
            ...mapActions({
                toggleProject: 'projects/toggle',
            }),

            moveToNextStatus() {
                this.toggleProject(this.project)
            },
        },
    }
</script>
