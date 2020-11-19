<template>
    <ProjectLogs
        :id="id"
        :loading="loading"
        :exists="exists"
        :log="log"
        :path="logs.path"
        :project-path="path"
        @clear="clear"
        @generate="generate"
        @launch="openFile"
    />
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    import Log from '@/helpers/logs/Log'
    import { command } from '@/helpers/commands'

    import ProjectLogs from '@/components/ProjectLogs'

    export default {
        components: {
            ProjectLogs,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            },
            logs: {
                type: Object,
                required: true,
            },
        },

        data() {
            return {
                loading: true,
                exists: false,
                log: null,
            }
        },

        computed: {
            ...mapGetters({
                editor: 'preferences/editor',
            }),

            logPath() {
                return `${this.path}/${this.logs.path}`
            },
        },

        mounted() {
            window.ipc
                .invoke('filesystem', {
                    type: 'exists',
                    path: this.logPath,
                })
                .then(response => {
                    if (!response.value) {
                        this.loading = false
                        return
                    }

                    this.start()
                })

            window.ipc.receive('log', response => {
                if (response.type !== 'change') {
                    return
                }

                this.read()
            })
        },

        beforeDestroy() {
            this.terminate()
        },

        methods: {
            ...mapActions({
                launch: 'projects/launch',
            }),

            generate() {
                window.ipc
                    .invoke('filesystem', {
                        type: 'write',
                        path: this.logPath,
                        value: '',
                    })
                    .then(() => {
                        this.start()
                    })
            },

            start() {
                this.read()

                window.ipc
                    .invoke('filesystem', {
                        type: 'watch',
                        path: this.logPath,
                    })
                    .then(() => {
                        this.loading = false
                        this.exists = true
                    })
            },

            terminate() {
                window.ipc.invoke('filesystem', {
                    type: 'terminateWatch',
                    path: this.logPath,
                })
            },

            read() {
                window.ipc
                    .invoke('filesystem', {
                        type: 'read',
                        path: this.logPath,
                    })
                    .then(response => {
                        this.log = new Log(response.value)
                    })
            },

            clear() {
                command('ClearLogs')
            },

            openFile(path) {
                this.launch({ type: this.editor, path })
            },
        },
    }
</script>
