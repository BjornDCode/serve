<script>
    export default {
        props: {
            text: {
                type: String,
                required: true,
            },
        },

        render() {
            return this._v(this.text)
        },
    }
</script>
