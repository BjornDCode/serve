<template>
    <ProjectOverview v-bind="$props" :onQuickAction="onQuickAction" />
</template>

<script>
    import { match } from '@/helpers/methods'

    import ProjectOverview from '@/components/ProjectOverview'

    export default {
        components: {
            ProjectOverview,
        },

        props: {
            project: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            },
            php: {
                type: Object,
                required: true,
            },
            node: {
                type: Object,
                required: true,
            },
            redis: {
                type: Object,
                required: true,
            },
            database: {
                type: Object,
                required: true,
            },
            server: {
                type: Object,
                required: true,
            },
        },

        methods: {
            onQuickAction(action) {
                const executable = match(action, {
                    phpstorm: `phpstorm ${this.path}`,
                    sublime: `subl ${this.path}`,
                    vscode: `code ${this.path}`,
                    github: `github ${this.path}`,
                })

                window.ipc.send('stdin', {
                    executable: executable,
                    path: this.path,
                })
            },
        },
    }
</script>
