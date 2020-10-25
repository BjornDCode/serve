<script>
    import { v4 as uuid } from 'uuid'
    import { Fragment } from 'vue-fragment'

    import EventBus from '@/menu/EventBus'

    export default {
        components: {
            Fragment,
        },

        props: {
            label: String,
            role: {
                type: String,
                validator: role =>
                    [
                        'appMenu',
                        'fileMenu',
                        'editMenu',
                        'viewMenu',
                        'windowMenu',
                    ].includes(role),
            },
            platforms: {
                type: Array,
                default: () => ['linux', 'mac', 'windows'],
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
                if (this.role) {
                    return {
                        id: this.id,
                        role: this.role,
                    }
                }

                return {
                    id: this.id,
                    label: this.label,
                    submenu: Object.values(this.submenu),
                }
            },
        },

        inject: ['system'],

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

        methods: {
            rerender() {
                this.$nextTick(() => {
                    if (!this.platforms.includes(this.system.platform)) {
                        return
                    }

                    EventBus.$emit('update-submenu', this.template)
                })
            },
        },

        watch: {
            template: {
                immediate: true,
                deep: true,
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

        render(createElement) {
            return this.$scopedSlots.default
                ? createElement(Fragment, this.$scopedSlots.default())
                : null
        },
    }
</script>
