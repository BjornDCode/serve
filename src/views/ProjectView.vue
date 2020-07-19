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
                    this.$route.params.id
                )
            },
        },

        mounted() {
            window.ipc.receive('docker', response => {
                if (response.status === 'success') {
                    this.moveToNextStatus()
                }
            })
        },

        methods: {
            ...mapActions({
                nextStatus: 'projects/nextStatus',
            }),

            moveToNextStatus() {
                this.nextStatus(this.project)
            },
        },
    }
</script>
