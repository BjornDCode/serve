<template>
    <ProjectSettings
        :values="form"
        :onInput="onInput"
        :onSave="onSave"
        :onCancel="onCancel"
    />
</template>

<script>
    import { mapActions } from 'vuex'
    import { renameKey } from '@/helpers/methods'

    import ProjectSettings from '@/components/ProjectSettings'

    export default {
        components: {
            ProjectSettings,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
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
            ...mapActions({
                updateSettings: 'projects/updateSettings',
            }),

            onInput(key, value) {
                this.form = {
                    ...this.form,
                    [key]: value,
                }
            },

            onSave() {
                this.updateSettings({
                    id: this.id,
                    settings: renameKey(this.form, 'project', 'name'),
                })
            },

            onCancel() {
                this.form = {
                    project: this.project,
                    path: this.path,
                }
            },
        },
    }
</script>
