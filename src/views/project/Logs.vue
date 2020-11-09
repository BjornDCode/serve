<template>
    <ProjectLogs :id="id" :exists="exists" />
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

        mounted() {
            window.ipc
                .invoke('filesystem', {
                    type: 'exists',
                    path: `${this.path}/${this.logs.path}`,
                })
                .then(response => {
                    if (!response.value) {
                        return
                    }

                    // Read file here
                })
        },
    }
</script>
