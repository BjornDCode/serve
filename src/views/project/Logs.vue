<template>
    <ProjectLogs
        :id="id"
        :exists="exists"
        :path="logs.path"
        @generate="generate"
    />
</template>

<script>
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
                exists: false,
            }
        },

        computed: {
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
                        console.log('response', response)
                        // Parse log file
                    })
            },
        },
    }
</script>
