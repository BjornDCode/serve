<template>
    <InfoModal @close="$emit('close')">
        <Stack width="full" align="stretch" :space="8">
            <Headline :level="2">
                Keyboard shortcuts
            </Headline>
            <Stack width="full" align="stretch" :space="8">
                <Stack :space="3" v-for="group in groups" :key="group.key">
                    <Headline :level="4">{{ group.name }}</Headline>

                    <Table>
                        <TableRow
                            v-for="(shortcut, index) in group.shortcuts"
                            :key="index"
                        >
                            <TableCell :spaceY="2" :spaceX="4">
                                <Copy
                                    size="sm"
                                    weight="medium"
                                    color="gray"
                                    shade="500"
                                >
                                    {{ shortcut.label }}
                                </Copy>
                            </TableCell>
                            <TableCell :spaceY="2" :spaceX="4" align="right">
                                <Copy
                                    size="sm"
                                    color="gray"
                                    weight="bold"
                                    shade="900"
                                    class="font-mono"
                                >
                                    {{ shortcut.value }}
                                </Copy>
                            </TableCell>
                        </TableRow>
                    </Table>
                </Stack>
            </Stack>
        </Stack>
    </InfoModal>
</template>

<script>
    import Copy from '@/components/Copy'
    import Stack from '@/components/Stack'
    import Table from '@/components/Table'
    import Headline from '@/components/Headline'
    import TableRow from '@/components/TableRow'
    import TableCell from '@/components/TableCell'
    import InfoModal from '@/components/InfoModal'

    export default {
        components: {
            Copy,
            Stack,
            Table,
            Headline,
            TableRow,
            TableCell,
            InfoModal,
        },

        computed: {
            groups() {
                return [
                    {
                        key: 'file',
                        name: 'File',
                        shortcuts: [
                            {
                                label: 'New project',
                                value: 'cmd + n',
                            },
                            {
                                label: 'Import project',
                                value: 'cmd + i',
                            },
                            {
                                label: 'Switch project',
                                value: 'cmd + p',
                            },
                        ],
                    },
                    {
                        key: 'project',
                        name: 'Project',
                        shortcuts: [
                            {
                                label: 'Previous tab',
                                value: 'cmd + [',
                            },
                            {
                                label: 'Next tab',
                                value: 'cmd + ]',
                            },
                        ],
                    },
                    {
                        key: 'tools',
                        name: 'Tools',
                        shortcuts: [
                            {
                                label: 'Open command palette',
                                value: 'cmd + shift + p',
                            },
                        ],
                    },
                    {
                        key: 'help',
                        name: 'Help',
                        shortcuts: [
                            {
                                label: 'List keyboard shortcuts',
                                value: 'cmd + l',
                            },
                        ],
                    },
                ]
            },
        },
    }
</script>
