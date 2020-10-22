<template>
    <Menu>
        <Submenu label="Tools">
            <MenuItem role="reload">Reload</MenuItem>
        </Submenu>
        <Submenu label="Developer">
            <MenuItem role="toggleDevTools">
                Toggle Dev Tools
            </MenuItem>
            <MenuItem
                :enabled="true"
                sublabel="Test"
                toolTip="This is a tooltip"
                accelerator="CmdOrCtrl+Shift+p"
                type="checkbox"
                :checked="true"
            >
                Yolololo
            </MenuItem>
        </Submenu>
        <Submenu role="windowMenu" />
    </Menu>
</template>

<script>
    import Menu from '@/menu/Menu'
    import Submenu from '@/menu/Submenu'
    import MenuItem from '@/menu/MenuItem'

    export default {
        components: {
            Menu,
            Submenu,
            MenuItem,
        },
    }
</script>
