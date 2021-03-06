<template>
    <Menu>
        <Submenu role="appMenu" />
        <Submenu label="File">
            <MenuItem accelerator="CmdOrCtrl+n" @click="execute('NewProject')">
                New project
            </MenuItem>
            <MenuItem
                accelerator="CmdOrCtrl+i"
                @click="execute('ImportProject')"
            >
                Import project
            </MenuItem>
            <MenuItem @click="execute('ListProjects')">
                See all projects
            </MenuItem>
            <MenuItem
                accelerator="CmdOrCtrl+p"
                @click="execute('SwitchProject')"
            >
                Switch project
            </MenuItem>
        </Submenu>
        <Submenu role="editMenu" />
        <Submenu label="Tools">
            <MenuItem
                accelerator="CmdOrCtrl+Shift+p"
                @click="execute('OpenCommandPalette')"
            >
                Command palette...
            </MenuItem>
        </Submenu>
        <Submenu label="Project">
            <MenuItem
                :enabled="inProject && project.status === 'stopped'"
                @click="execute('StartProject')"
            >
                Start project
            </MenuItem>
            <MenuItem
                :enabled="inProject && project.status === 'running'"
                @click="execute('StopProject')"
            >
                Stop project
            </MenuItem>
            <MenuItem type="separator" />
            <MenuItem :enabled="inProject" @click="execute('ShowOverview')">
                Overview
            </MenuItem>
            <MenuItem :enabled="inProject" @click="execute('ShowLogs')">
                Logs
            </MenuItem>
            <MenuItem :enabled="inProject" @click="execute('ShowSettings')">
                Settings
            </MenuItem>
            <MenuItem
                :enabled="inProject"
                :visible="false"
                accelerator="CmdOrCtrl+["
                @click="execute('ShowPreviousTab')"
            >
                Previous tab
            </MenuItem>
            <MenuItem
                :enabled="inProject"
                :visible="false"
                accelerator="CmdOrCtrl+]"
                @click="execute('ShowNextTab')"
            >
                Next tab
            </MenuItem>
            <MenuItem type="separator" />
            <MenuItem :enabled="inProject" @click="execute('OpenInEditor')">
                Open in editor...
            </MenuItem>
            <MenuItem
                :enabled="inProject"
                @click="execute('OpenInGithubDesktop')"
            >
                Open in GitHub Desktop
            </MenuItem>
            <MenuItem :enabled="inProject" @click="execute('OpenInTerminal')">
                Open in terminal
            </MenuItem>
            <MenuItem
                :enabled="inProject && project.status === 'running'"
                @click="execute('OpenDatabase')"
            >
                Open database
            </MenuItem>
            <MenuItem :enabled="inProject" @click="execute('OpenInBrowser')">
                Open in browser
            </MenuItem>
            <MenuItem :enabled="inProject" @click="execute('OpenFolder')">
                Open folder
            </MenuItem>
        </Submenu>
        <Submenu label="Window">
            <MenuItem role="minimize" />
            <MenuItem role="zoom" />
            <MenuItem type="separator" :platforms="['mac']" />
            <MenuItem role="front" :platforms="['mac']" />
            <MenuItem role="close" :platforms="['linux', 'windows']" />
        </Submenu>
        <Submenu label="View">
            <MenuItem role="reload" />
            <MenuItem role="forceReload" />
            <MenuItem role="toggleDevTools" />
            <MenuItem type="separator" />
            <MenuItem role="resetZoom" />
            <MenuItem role="zoomIn" />
            <MenuItem role="zoomOut" />
            <MenuItem type="separator" />
            <MenuItem role="togglefullscreen" />
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
            project() {
                if (!this.$route.name.includes('project')) {
                    return
                }

                return this.$store.getters['projects/find'](
                    this.$route.params.id,
                )
            },

            inProject() {
                return !!this.project
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

                command.handler({ project: this.project })
            },
        },
    }
</script>
