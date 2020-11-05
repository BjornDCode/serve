<script>
    import TextNode from '@/components/TextNode'

    export default {
        props: {
            condition: {
                type: Boolean,
                required: true,
            },
            true: {
                type: String,
                required: true,
            },
            false: {
                type: String,
                required: true,
            },
        },

        computed: {
            text() {
                return this.condition ? this.true : this.false
            },
        },

        render(createElement) {
            return createElement(TextNode, {
                props: {
                    text: this.text,
                },
            })
        },
    }
</script>
