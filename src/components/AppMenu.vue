<template>
    <Menu>
        <Submenu role="appMenu" />
        <Submenu role="editMenu" />
        <Submenu label="Tools">
            <MenuItem
                accelerator="CmdOrCtrl+Shift+p"
                @click="execute('OpenCommandPalette')"
            >
                Command Palette
            </MenuItem>
        </Submenu>
        <Submenu label="Window">
            <MenuItem role="minimize" />
            <MenuItem role="zoom" />
            <MenuItem type="separator" :platforms="['mac']" />
            <MenuItem role="front" :platforms="['mac']" />
            <MenuItem role="close" :platforms="['linux', 'windows']" />
            <Submenu role="viewMenu" />
        </Submenu>
        <Submenu label="Help">
            <MenuItem
                accelerator="CmdOrCtrl+l"
                @click="execute('OpenShortcutsModal')"
            >
                Keyboard Shortcuts
            </MenuItem>
            <MenuItem @click="execute('OpenDocumentation')">
                Documentation
            </MenuItem>
            <MenuItem @click="execute('OpenVersions')">
                Versions
            </MenuItem>
            <MenuItem @click="execute('OpenChangelog')">
                Changelog
            </MenuItem>
            <MenuItem @click="execute('OpenGithubIssues')">
                Report a bug
            </MenuItem>
        </Submenu>
    </Menu>
</template>

<script>
    import commands from '@/config/commands'

    import Menu from '@/menu/Menu'
    import Submenu from '@/menu/Submenu'
    import MenuItem from '@/menu/MenuItem'
    import EventBus from '@/menu/EventBus'

    export default {
        components: {
            Menu,
            Submenu,
            MenuItem,
        },

        computed: {
            commands() {
                return commands
            },
        },

        mounted() {
            window.ipc.receive('menu', response => {
                EventBus.$emit('clicked', response.id)
            })
        },

        methods: {
            execute(key) {
                const command = this.commands.find(
                    command => command.key === key,
                )

                if (!command) {
                    return
                }

                command.handler()
            },
        },
    }
</script>
