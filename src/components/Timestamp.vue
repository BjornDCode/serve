<script>
    import {
        formatDistanceToNowStrict,
        differenceInHours,
        format,
    } from 'date-fns'

    import TextNode from '@/components/TextNode'

    export default {
        props: {
            data: {
                type: String,
                required: true,
            },
        },

        computed: {
            date() {
                return new Date(this.data)
            },

            formatted() {
                if (differenceInHours(new Date(), this.date) < 24) {
                    return `${formatDistanceToNowStrict(this.date)} ago`
                }

                return format(this.date, 'HH:mm:ss d/M/y')
            },
        },

        render(createElement) {
            return createElement(TextNode, { props: { text: this.formatted } })
        },
    }
</script>
