<script>
    export default {
        props: {
            level: {
                type: String,
                required: true,
                validator: level =>
                    [
                        'emergency',
                        'alert',
                        'critical',
                        'error',
                        'warning',
                        'notice',
                        'info',
                        'debug',
                    ].includes(level),
            },
        },
    }
</script>
