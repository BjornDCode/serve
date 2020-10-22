<script>
    import { Fragment } from 'vue-fragment'

    import { match } from '@/helpers/methods'
    import EventBus from '@/menu/EventBus'

    export default {
        components: {
            Fragment,
        },

        data() {
            return {
                platform: match(process.platform, {
                    darwin: 'mac',
                    linux: 'linux',
                    win32: 'windows',
                }),
                template: {},
            }
        },

        mounted() {
            EventBus.$on('update-submenu', template => {
                this.template = {
                    ...this.template,
                    [template.id]: template,
                }
            })
        },

        methods: {
            isPlatform(platform) {
                return this.platform === platform
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
            return createElement(Fragment, this.$scopedSlots.default())
        },
    }
</script>
