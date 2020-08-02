<template>
    <ProjectSettings :values="form" :onInput="onInput" :onSave="onSave" />
</template>

<script>
    import ProjectSettings from '@/components/ProjectSettings'

    export default {
        components: {
            ProjectSettings,
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
        },

        data() {
            return {
                form: {
                    project: this.project,
                    path: this.path,
                },
            }
        },

        methods: {
            onInput(key, value) {
                this.form = {
                    ...this.form,
                    [key]: value,
                }
            },

            onSave() {
                console.log(this.form)
            },
        },
    }
</script>
