<template>
    <PaletteModal @close="$emit('close')">
        <Palette
            width="full"
            :options="commands"
            :project="project"
            @close="$emit('close')"
            @execute="runCommand"
        />
    </PaletteModal>
</template>

<script>
    import Palette from '@/components/Palette'
    import PaletteModal from '@/components/PaletteModal'

    import commands from '@/config/commands'

    export default {
        components: {
            Palette,
            PaletteModal,
        },

        props: {
            project: Object,
        },

        computed: {
            commands() {
                return commands.filter(command => {
                    return command.show({ project: this.project })
                })
            },
        },

        methods: {
            runCommand(command) {
                command.handler({ project: this.project })

                if (command.closeAfter) {
                    this.$emit('close')
                }
            },
        },
    }
</script>
