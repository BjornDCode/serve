<template>
    <Stack component="Box" size="screen" align="stretch">
        <Box
            color="gray"
            shade="200"
            :spaceX="8"
            :spaceY="6"
            justify="between"
            align="center"
            width="full"
        >
            <Stack :space="2">
                <TextLink :to="{ name: 'home' }">
                    <Icon name="cheveron-left" color="gray" shade="400" />
                    <Copy size="xs" color="gray" shade="500">Projects</Copy>
                </TextLink>

                <Headline>
                    {{ name }}
                </Headline>

                <Status :value="status" />
            </Stack>
            <Box>
                <Button :disabled="buttonDisabled" @click="toggle">
                    {{ buttonText }}
                </Button>
            </Box>
        </Box>
        <Box component="nav" :spaceX="8">
            <Tabs>
                <Tab
                    v-for="tab in tabs"
                    :key="tab.route"
                    :to="{ name: tab.route, params: { id: id } }"
                    :active="$route.name === tab.route"
                >
                    {{ tab.name }}
                </Tab>
            </Tabs>
        </Box>
        <Box expand>
            <router-view
                v-bind="{
                    ...{ ...$props, name: 'default', project: name },
                }"
            />
        </Box>
    </Stack>
</template>

<script>
    import Box from '@/components/Box'
    import Tab from '@/components/Tab'
    import Tabs from '@/components/Tabs'
    import Icon from '@/components/Icon'
    import Copy from '@/components/Copy'
    import Stack from '@/components/Stack'
    import Button from '@/components/Button'
    import Status from '@/components/Status'
    import TextLink from '@/components/TextLink'
    import Headline from '@/components/Headline'

    import { isValidStatus } from '@/config/validators'

    export default {
        components: {
            Box,
            Tab,
            Tabs,
            Icon,
            Copy,
            Stack,
            Button,
            Status,
            TextLink,
            Headline,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                required: true,
                validator: isValidStatus,
            },
        },

        computed: {
            buttonText() {
                const lookup = {
                    running: 'Stop',
                    stopped: 'Start',
                    starting: 'Starting...',
                    stopping: 'Stopping...',
                }

                return lookup[this.status]
            },

            buttonDisabled() {
                return ['starting', 'stopping'].includes(this.status)
            },

            tabs() {
                return [
                    {
                        name: 'Overview',
                        route: 'project.overview',
                    },
                    {
                        name: 'Settings',
                        route: 'project.settings',
                    },
                ]
            },
        },

        methods: {
            toggle() {
                this.$emit('toggle')
            },
        },
    }
</script>
