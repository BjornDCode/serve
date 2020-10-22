<script>
    import { v4 as uuid } from 'uuid'
    import { Fragment } from 'vue-fragment'

    import EventBus from '@/menu/EventBus'

    export default {
        components: {
            Fragment,
        },

        props: {
            label: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                id: uuid(),
                submenu: {},
            }
        },

        computed: {
            template() {
                return {
                    id: this.id,
                    label: this.label,
                    submenu: Object.values(this.submenu),
                }
            },
        },

        mounted() {
            EventBus.$on('update-menuitem', template => {
                if (template.parentId !== this.id) {
                    return
                }

                this.submenu = {
                    ...this.submenu,
                    [template.id]: template,
                }
            })
        },

        watch: {
            template: {
                immediate: true,
                deep: true,
                handler() {
                    this.$nextTick(() => {
                        EventBus.$emit('update-submenu', this.template)
                    })
                },
            },
        },

        render(createElement) {
            return createElement(Fragment, this.$scopedSlots.default())
        },
    }
</script>
