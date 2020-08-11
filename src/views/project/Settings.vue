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
    import set from 'lodash/set'
    import cloneDeep from 'lodash/cloneDeep'
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
        },

        data() {
            return {
                values: {
                    path: this.path,
                    project: this.project,
                    php: this.php,
                    node: this.node,
                    redis: this.redis,
                    database: this.database,
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
                    php: this.php,
                    node: this.node,
                    redis: this.redis,
                    database: this.database,
                }
            },
        },

        methods: {
            ...mapActions({
                updateSettings: 'projects/updateSettings',
            }),

            onInput(key, value) {
                this.values = { ...set(cloneDeep(this.values), key, value) }
            },

            onSave() {
                this.updateSettings({
                    id: this.id,
                    settings: renameKey(this.values, 'project', 'name'),
                })
            },

            onCancel() {
                this.values = { ...this.initialValues }
            },
        },
    }
</script>
