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
                    {
                        key: 'OpenDocumentation',
                        category: 'Help',
                        handler: () => {
                            window.ipc.invoke('launch', {
                                type: 'browser',
                                path: 'https://github.com/BjornDCode/serve',
                            })
                        },
                    },
                    {
                        key: 'OpenVersions',
                        category: 'Help',
                        handler: () => {
                            window.ipc.invoke('launch', {
                                type: 'browser',
                                path:
                                    'https://github.com/BjornDCode/serve/releases',
                            })
                        },
                    },
                    {
                        key: 'OpenChangelog',
                        category: 'Help',
                        handler: () => {
                            window.ipc.invoke('launch', {
                                type: 'browser',
                                path:
                                    'https://github.com/BjornDCode/serve/blob/master/CHANGELOG.md',
                            })
                        },
                    },
                    {
                        key: 'OpenGithubIssues',
                        category: 'Help',
                        handler: () => {
                            window.ipc.invoke('launch', {
                                type: 'browser',
                                path:
                                    'https://github.com/BjornDCode/serve/issues',
                            })
                        },
                    },
                ]
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
