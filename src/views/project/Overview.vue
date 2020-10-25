<template>
    <ProjectOverview
        v-bind="$props"
        :editor="editor"
        :onQuickAction="onQuickAction"
        :updatePreferedEditor="updatePreferedEditor"
    />
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

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
            repository: {
                type: String,
            },
        },

        computed: {
            ...mapGetters({
                editor: 'preferences/editor',
            }),
        },

        methods: {
            ...mapActions({
                updatePreferedEditor: 'preferences/updateEditor',
                launch: 'projects/launch',
            }),

            onQuickAction(type, path) {
                this.launch({ type, path })
            },
        },
    }
</script>
