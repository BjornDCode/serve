<template>
    <Component :is="modal" @close="closeModal" :project="project" />
</template>

<script>
    import tinykeys from 'tinykeys'
    import { mapGetters, mapActions } from 'vuex'

    import CommandsModal from '@/components/CommandsModal'
    import ShortcutsModal from '@/components/ShortcutsModal'

    export default {
        components: {
            CommandsModal,
            ShortcutsModal,
        },

        data() {
            return {
                removeKeyBindings: null,
            }
        },

        computed: {
            ...mapGetters({
                modal: 'app/modal',
            }),
            project() {
                if (!this.$route.name.includes('project')) {
                    return
                }

                return this.$store.getters['projects/find'](
                    this.$route.params.id,
                )
            },
        },

        mounted() {
            this.removeKeyBindings = tinykeys(window, {
                Escape: this.closeModal,
            })
        },

        beforeDestroy() {
            this.removeKeyBindings()
        },

        methods: {
            ...mapActions({
                closeModal: 'app/closeModal',
            }),
        },
    }
</script>
