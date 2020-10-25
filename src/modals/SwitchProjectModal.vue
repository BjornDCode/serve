<template>
    <PaletteModal @close="close">
        <Palette
            width="full"
            :options="options"
            :project="project"
            @close="close"
            @execute="execute"
        />
    </PaletteModal>
</template>

<script>
    import { mapGetters } from 'vuex'

    import Palette from '@/components/Palette'
    import PaletteModal from '@/components/PaletteModal'

    export default {
        components: {
            Palette,
            PaletteModal,
        },

        props: {
            project: Object,
        },

        computed: {
            ...mapGetters({
                projects: 'projects/all',
            }),

            options() {
                return this.projects.map(project => ({
                    ...project,
                    label: project.name,
                }))
            },
        },

        methods: {
            close() {
                this.$emit('close')
            },

            execute(project) {
                this.$router.push({
                    name: 'project.overview',
                    params: { id: project.id },
                })

                this.close()
            },
        },
    }
</script>
