<script>
    import { v4 as uuid } from 'uuid'

    import EventBus from '@/menu/EventBus'

    export default {
        props: {
            role: String,
            platforms: {
                type: Array,
                default: () => ['linux', 'mac', 'windows'],
            },
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

        inject: ['system'],

        methods: {
            rerender() {
                this.$nextTick(() => {
                    if (!this.platforms.includes(this.system.platform)) {
                        return
                    }

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

        watch: {
            template: {
                immediate: true,
                handler() {
                    this.rerender()
                },
            },
            system: {
                deep: true,
                handler() {
                    this.rerender()
                },
            },
        },

        render() {
            return null
        },
    }
</script>
