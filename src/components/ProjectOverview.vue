<template>
    <Grid
        :columns="5"
        :gap="8"
        :space="16"
        :spaceX="8"
        :spaceT="6"
        :spaceB="20"
        expand
    >
        <GridItem :span="3">
            <Table>
                <TableRow>
                    <TableCell class="px-4 py-2 w-2/5">
                        <Copy
                            size="sm"
                            weight="medium"
                            color="gray"
                            shade="500"
                        >
                            Name
                        </Copy>
                    </TableCell>
                    <TableCell class="pr-4 py-2">
                        <Copy size="sm" color="gray" shade="800">
                            {{ project }}
                        </Copy>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell class="px-4 py-2 w-2/5">
                        <Copy
                            size="sm"
                            weight="medium"
                            color="gray"
                            shade="500"
                        >
                            Folder
                        </Copy>
                    </TableCell>
                    <TableCell class="pr-4 py-2">
                        <ExternalButton target="filesystem" :path="path">
                            <Copy
                                size="sm"
                                color="gray"
                                shade="800"
                                decoration="underline"
                            >
                                {{ path }}
                            </Copy>
                        </ExternalButton>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell class="px-4 py-2 w-2/5">
                        <Copy
                            size="sm"
                            weight="medium"
                            color="gray"
                            shade="500"
                        >
                            URL
                        </Copy>
                    </TableCell>
                    <TableCell class="pr-4 py-2">
                        <ExternalButton
                            target="browser"
                            :path="`http://localhost:${server.port}`"
                        >
                            <Copy
                                size="sm"
                                color="gray"
                                shade="800"
                                decoration="underline"
                            >
                                {{ `http://localhost:${server.port}` }}
                            </Copy>
                        </ExternalButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell class="px-4 py-2 w-2/5">
                        <Copy
                            size="sm"
                            weight="medium"
                            color="gray"
                            shade="500"
                        >
                            PHP
                        </Copy>
                    </TableCell>
                    <TableCell class="pr-4 py-2">
                        <Copy size="sm" color="gray" shade="800">
                            {{ php.version }}
                        </Copy>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell class="px-4 py-2 w-2/5">
                        <Copy
                            size="sm"
                            weight="medium"
                            color="gray"
                            shade="500"
                        >
                            Node
                        </Copy>
                    </TableCell>
                    <TableCell class="pr-4 py-2">
                        <Copy size="sm" color="gray" shade="800">
                            {{ node.version }}
                        </Copy>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell class="px-4 py-2 w-2/5">
                        <Copy
                            size="sm"
                            weight="medium"
                            color="gray"
                            shade="500"
                        >
                            Redis
                        </Copy>
                    </TableCell>
                    <TableCell class="pr-4 py-2">
                        <Copy size="sm" color="gray" shade="800">
                            {{ redis.version }}
                        </Copy>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell class="px-4 py-2 w-2/5">
                        <Copy
                            size="sm"
                            weight="medium"
                            color="gray"
                            shade="500"
                        >
                            {{ database.type }}
                        </Copy>
                    </TableCell>
                    <TableCell class="pr-4 py-2">
                        <Copy size="sm" color="gray" shade="800">
                            {{ database.version }}
                        </Copy>
                    </TableCell>
                </TableRow>
            </Table>
        </GridItem>
        <GridItem :span="2">
            <Stack :space="4">
                <Headline :level="3">
                    Quick actions
                </Headline>
                <Stack>
                    <MultiOptionButton
                        :options="[
                            { key: 'phpstorm', title: 'PhpStorm' },
                            { key: 'sublime', title: 'Sublime' },
                            { key: 'vscode', title: 'VSCode' },
                        ]"
                        #default="{ option }"
                        @click="onQuickAction"
                    >
                        Open in {{ option.title }}
                    </MultiOptionButton>
                </Stack>
            </Stack>
        </GridItem>
    </Grid>
</template>

<script>
    import Copy from '@/components/Copy'
    import Grid from '@/components/Grid'
    import Table from '@/components/Table'
    import Stack from '@/components/Stack'
    import GridItem from '@/components/GridItem'
    import Headline from '@/components/Headline'
    import TableRow from '@/components/TableRow'
    import TableCell from '@/components/TableCell'
    import ExternalButton from '@/components/ExternalButton'
    import MultiOptionButton from '@/components/MultiOptionButton'

    export default {
        components: {
            Copy,
            Grid,
            Table,
            Stack,
            GridItem,
            Headline,
            TableRow,
            TableCell,
            ExternalButton,
            MultiOptionButton,
        },

        props: {
            onQuickAction: {
                type: Function,
                default: () => {},
            },
            project: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            },
            php: {
                type: Object,
                required: true,
            },
            node: {
                type: Object,
                required: true,
            },
            redis: {
                type: Object,
                required: true,
            },
            database: {
                type: Object,
                required: true,
            },
            server: {
                type: Object,
                required: true,
            },
        },
    }
</script>