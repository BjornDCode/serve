<template>
    <CodeOutput :text="output" :context="context">
        <template #overlay>
            <button
                v-if="showExpandButton"
                class="absolute left-0 bottom-0 flex justify-center items-center w-full pb-5 pt-5 bg-gradient-to-b from-transparent to-gray-900 hover:to-gray-700 focus:outline-none"
                @click="expand"
            >
                <Icon name="add-solid" color="pink" shade="400" />
            </button>
        </template>
    </CodeOutput>
</template>

<script>
    import Icon from '@/components/Icon'
    import CodeOutput from '@/components/CodeOutput'

    export default {
        components: {
            Icon,
            CodeOutput,
        },

        props: {
            text: {
                type: String,
                required: true,
            },
            context: {
                type: String,
            },
        },

        data() {
            return {
                expanded: false,
            }
        },

        computed: {
            showExpandButton() {
                return this.lineCount > 3 && !this.expanded
            },

            lineCount() {
                return this.text.split('\n').length
            },

            output() {
                if (this.expanded) {
                    return this.text
                }

                return this.text
                    .split('\n')
                    .filter((__, index) => index < 3)
                    .join('\n')
            },
        },

        methods: {
            expand() {
                this.expanded = true
            },
        },
    }
</script>
