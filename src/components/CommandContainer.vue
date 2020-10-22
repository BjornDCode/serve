<template>
    <div></div>
</template>

<script>
    import commands from '@/config/commands'

    export default {
        computed: {
            commands() {
                return commands
            },
        },

        mounted() {
            window.ipc.receive('command', event => {
                const command = this.commands.find(
                    command => command.key === event.type,
                )

                if (!command) {
                    return
                }

                command.handler({ value: event.value })
            })
        },
    }
</script>
