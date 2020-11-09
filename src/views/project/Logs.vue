<template>
    <ProjectLogs :id="id" :exists="exists" @generate="generate" />
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

                    this.read()
                })
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
                        this.read()
                    })
            },

            read() {
                window.ipc
                    .invoke('filesystem', {
                        type: 'read',
                        path: this.logPath,
                    })
                    .then(response => {
                        this.exists = true
                        console.log('response', response)
                    })
            },
        },
    }
</script>
