<script>
    import { v4 as uuid } from 'uuid'

    import EventBus from '@/menu/EventBus'

    export default {
        props: {
            role: {
                type: String,
                validator: role =>
                    [
                        'undo',
                        'redo',
                        'cut',
                        'copy',
                        'paste',
                        'pasteAndMatchStyle',
                        'delete',
                        'selectAll',
                        'reload',
                        'forceReload',
                        'toggleDevTools',
                        'resetZoom',
                        'zoomIn',
                        'zoomOut',
                        'togglefullscreen',
                        'window',
                        'minimize',
                        'close',
                        'help',
                        'about',
                        'services',
                        'hide',
                        'hideOthers',
                        'unhide',
                        'quit',
                        'startSpeaking',
                        'stopSpeaking',
                        'zoom',
                        'front',
                        'appMenu',
                        'fileMenu',
                        'editMenu',
                        'viewMenu',
                        'recentDocuments',
                        'toggleTabBar',
                        'selectNextTab',
                        'selectPreviousTab',
                        'mergeAllWindows',
                        'clearRecentDocuments',
                        'moveTabToNewWindow',
                        'windowMenu',
                    ].includes(role),
            },
            type: {
                type: String,
                default: 'normal',
            },
            label: String,
            sublabel: String,
            toolTip: String,
            accelerator: String,
            visible: {
                type: Boolean,
                default: true,
            },
            enabled: {
                type: Boolean,
                default: true,
            },
            checked: {
                type: Boolean,
                default: false,
            },
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
                    click: this.click,
                    role: this.role,
                    type: this.type,
                    sublabel: this.sublabel,
                    toolTip: this.toolTip,
                    accelerator: this.accelerator,
                    visible: this.visible,
                    enabled: this.enabled,
                    checked: this.checked,
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
                        ...JSON.parse(JSON.stringify(this.template)),
                        label:
                            this.$scopedSlots.default()[0].text ||
                            this.template.label,
                        parentId: this.$parent.template.id,
                    })
                })
            },

            click(menuItem, browserWindow, event) {
                this.$emit('click', { menuItem, browserWindow, event })
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
