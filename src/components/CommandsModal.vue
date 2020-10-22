<template>
    <PaletteModal @close="$emit('close')">
        <Palette width="full" :options="commands" @close="$emit('close')" />
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

        computed: {
            commands() {
                return commands.filter(command => {
                    return command.public
                })
            },
        },
    }
</script>
