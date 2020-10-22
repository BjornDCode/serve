<script>
    import { v4 as uuid } from 'uuid'

    import EventBus from '@/menu/EventBus'

    export default {
        props: {
            role: String,
        },

        data() {
            return {
                id: uuid(),
            }
        },

        computed: {
            template() {
                return {
                    id: this.id,
                    role: this.role,
                }
            },
        },

        watch: {
            template: {
                immediate: true,
                handler() {
                    this.$nextTick(() => {
                        EventBus.$emit('update-menuitem', {
                            ...this.template,
                            label:
                                this.$scopedSlots.default()[0].text ||
                                this.template.label,
                            parentId: this.$parent.template.id,
                        })
                    })
                },
            },
        },

        render() {
            return null
        },
    }
</script>
