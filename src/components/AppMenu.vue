<template>
    <Menu>
        <Submenu label="Tools">
            <MenuItem role="reload">Reload</MenuItem>
        </Submenu>
        <Submenu label="Developer">
            <MenuItem role="toggleDevTools">Toggle Dev Tools</MenuItem>
        </Submenu>
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
