<template>
    <div></div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        computed: {
            commands() {
                return [
                    {
                        key: 'OpenShortcutsModal',
                        category: 'Help',
                        handler: () => this.setModal('ShortcutsModal'),
                    },
                ]
            },
        },

        mounted() {
            window.ipc.receive('command', event => {
                const command = this.commands.find(
                    command => command.key === event.type,
                )

                command.handler(event.value)
            })
        },

        methods: {
            ...mapActions({
                setModal: 'app/setModal',
            }),
        },
    }
</script>
