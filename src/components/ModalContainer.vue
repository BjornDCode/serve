<template>
    <Component :is="modal" @close="closeModal" />
</template>

<script>
    import tinykeys from 'tinykeys'
    import { mapGetters, mapActions } from 'vuex'

    import ShortcutsModal from '@/components/ShortcutsModal'

    export default {
        components: {
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
