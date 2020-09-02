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

        data() {
            return {
                values: {
                    path: this.path,
                    php: this.php,
                    node: this.node,
                    redis: this.redis,
                    database: this.database,
                    server: this.server,
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
                    php: this.php,
                    node: this.node,
                    redis: this.redis,
                    database: this.database,
                    server: this.server,
                }
            },
        },

        methods: {
            ...mapActions({
                addMessage: 'messages/add',
                updateSettings: 'projects/updateSettings',
            }),

            onInput(key, value) {
                this.values = { ...set(cloneDeep(this.values), key, value) }
            },

            onSave() {
                this.updateSettings({
                    id: this.id,
                    settings: this.values,
                })

                this.addMessage({
                    content: 'Saved',
                    expires: 2000,
                    type: 'success',
                })
            },

            onCancel() {
                this.values = { ...this.initialValues }

                this.addMessage({
                    content: 'Cancelled',
                    expires: 2000,
                    type: 'success',
                })
            },
        },
    }
</script>
