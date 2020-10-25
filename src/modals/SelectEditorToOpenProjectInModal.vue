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
    import { mapActions } from 'vuex'

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
            options() {
                return [
                    {
                        key: 'phpstorm',
                        label: 'PhpStorm',
                    },
                    {
                        key: 'sublime',
                        label: 'Sublime',
                    },
                    {
                        key: 'vscode',
                        label: 'VSCode',
                    },
                ]
            },
        },

        methods: {
            ...mapActions({
                launch: 'projects/launch',
            }),

            close() {
                this.$emit('close')
            },

            execute(editor) {
                this.launch({
                    type: editor.key,
                    path: this.project.path,
                })

                this.close()
            },
        },
    }
</script>
