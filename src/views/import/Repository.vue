<template>
    <Skeleton>
        <Stack :space="8" width="full">
            <Stack :space="4">
                <Headline :level="2">
                    Clone repository
                </Headline>

                <Paragraph>
                    Provide the url to your repository.
                </Paragraph>
            </Stack>

            <Stack align="stretch" width="full" :space="8">
                <PathField
                    label="Folder"
                    placeholder="/Users/myuser/Documents/Code"
                    v-model="form.path"
                />
                <TextField
                    label="Name"
                    placeholder="serve"
                    v-model="form.name"
                    :error="errors.path"
                />
                <TextField
                    label="Git url"
                    placeholder="git@github.com:BjornDCode/serve.git"
                    v-model="form.url"
                />
            </Stack>
        </Stack>

        <template #footer>
            <ActionBar>
                <template #left>
                    <Button
                        component="router-link"
                        :to="{ name: 'import.laravel.source' }"
                        variant="secondary"
                    >
                        Back
                    </Button>
                </template>
                <template #right>
                    <Button @click="clone" :disabled="disabled">
                        <ConditionalText
                            :condition="cloning"
                            false="Clone"
                            true="Cloning..."
                        />
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
    import PathField from '@/components/PathField'
    import TextField from '@/components/TextField'
    import ConditionalText from '@/components/ConditionalText'

    export default {
        components: {
            Stack,
            Button,
            Headline,
            Skeleton,
            Paragraph,
            ActionBar,
            PathField,
            TextField,
            ConditionalText,
        },

        data() {
            return {
                form: {
                    name: '',
                    url: '',
                    path: '',
                },
                errors: {
                    path: '',
                },
                cloning: false,
            }
        },

        computed: {
            disabled() {
                return (
                    !this.form.url ||
                    !this.form.path ||
                    !this.form.name ||
                    this.errors.path.length > 0 ||
                    this.cloning
                )
            },
        },

        methods: {
            clone() {
                this.cloning = true

                window.ipc
                    .invoke('git', {
                        type: 'clone',
                        path: this.form.path,
                        url: this.form.url,
                        name: this.form.name,
                        error: `The repository couldn't be cloned.`,
                    })
                    .then(response => {
                        this.cloning = false

                        if (response.status !== 'success') {
                            return
                        }

                        this.$emit('input', {
                            key: 'path',
                            value: `${this.form.path}/${this.form.name}`,
                        })
                        this.$router.push({ name: 'import.laravel.server' })
                    })
            },
        },

        watch: {
            'form.name': {
                deep: true,
                handler() {
                    window.ipc
                        .invoke('filesystem', {
                            type: 'exists',
                            path: `${this.form.path}/${this.form.name}`,
                        })
                        .then(response => {
                            // 'response.value' contains a boolean indicating whether the file exists or not
                            if (!response.value) {
                                return (this.errors.path = '')
                            }
                            this.errors.path = 'This folder already exists'
                        })
                },
            },
        },
    }
</script>
