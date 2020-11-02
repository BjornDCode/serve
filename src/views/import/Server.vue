<template>
    <Skeleton>
        <Stack :space="8" width="full">
            <Stack :space="4">
                <Headline :level="2">
                    Local server
                </Headline>

                <Paragraph>
                    Choose which port to run the local server on.
                </Paragraph>
            </Stack>

            <Stack align="stretch" width="full" :space="8">
                <TextField
                    label="Port"
                    :value="values.server.port"
                    @input="
                        $emit('input', { key: 'server.port', value: $event })
                    "
                />
            </Stack>
        </Stack>

        <template #footer>
            <ActionBar>
                <template #left>
                    <Button
                        component="router-link"
                        :to="{ name: 'import.laravel.project' }"
                        variant="secondary"
                    >
                        Back
                    </Button>
                </template>
                <template #right>
                    <Button
                        component="router-link"
                        :to="{ name: 'import.laravel.php' }"
                        :disabled="!values.server.port"
                    >
                        Next
                    </Button>
                </template>
            </ActionBar>
        </template>
    </Skeleton>
</template>

<script>
    import Stack from '@/components/Stack'
    import Button from '@/components/Button'
    import Headline from '@/components/Headline'
    import Skeleton from '@/views/import/Skeleton'
    import Paragraph from '@/components/Paragraph'
    import ActionBar from '@/components/ActionBar'
    import TextField from '@/components/TextField'

    export default {
        components: {
            Stack,
            Button,
            Headline,
            Skeleton,
            Paragraph,
            ActionBar,
            TextField,
        },

        props: {
            values: {
                required: true,
            },
        },
    }
</script>
