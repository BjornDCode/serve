<script>
    import { Fragment } from 'vue-fragment'

    import EventBus from '@/menu/EventBus'

    export default {
        components: {
            Fragment,
        },

        data() {
            return {
                system: {
                    platform: '',
                },
                template: {},
            }
        },

        mounted() {
            window.ipc
                .invoke('app', {
                    type: 'platform',
                })
                .then(platform => {
                    this.system.platform = platform
                })

            EventBus.$on('update-submenu', template => {
                this.template = {
                    ...this.template,
                    [template.id]: template,
                }
            })
        },

        provide() {
            return {
                system: this.system,
            }
        },

        methods: {
            isPlatform(platform) {
                return this.system.platform === platform
            },
        },

        watch: {
            template: {
                immediate: true,
                deep: true,
                handler() {
                    window.ipc.send('menu', Object.values(this.template))
                },
            },
        },

        render(createElement) {
            return createElement(
                Fragment,
                this.$scopedSlots.default({
                    platform: this.platform,
                    isPlatform: this.isPlatform,
                }),
            )
        },
    }
</script>
