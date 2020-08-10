<template>
    <ProjectSettings
        :values="values"
        :dirty="dirty"
        :onInput="onInput"
        :onSave="onSave"
        :onCancel="onCancel"
    />
</template>

<script>
    import { mapActions } from 'vuex'
    import isEqual from 'lodash/isEqual'
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
            phpVersion: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                values: {
                    path: this.path,
                    project: this.project,
                    phpVersion: this.phpVersion,
                },
            }
        },

        computed: {
            dirty() {
                return !isEqual(this.values, this.initialValues)
            },

            initialValues() {
                return {
                    path: this.path,
                    project: this.project,
                    phpVersion: this.phpVersion,
                }
            },
        },

        methods: {
            ...mapActions({
                updateSettings: 'projects/updateSettings',
            }),

            onInput(key, value) {
                this.values = {
                    ...this.values,
                    [key]: value,
                }
            },

            onSave() {
                this.updateSettings({
                    id: this.id,
                    settings: renameKey(this.values, 'project', 'name'),
                    phpVersion: this.phpVersion,
                })
            },

            onCancel() {
                this.values = { ...this.initialValues }
            },
        },
    }
</script>
