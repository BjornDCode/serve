<template>
    <Component :is="component">
        <slot />
    </Component>
</template>

<script>
    export default {
        props: {
            component: {
                type: String,
                default: 'div',
            },
        },
    }
</script>
