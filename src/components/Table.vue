<template>
    <table class="border-separate">
        <slot />
    </table>
</template>

<style>
    table {
        border-spacing: 0px;
    }

    table tr:nth-child(2n) td {
        @apply bg-gray-100;
    }

    table td {
        @apply border-gray-200;
    }

    table tr:first-child td {
        @apply border-t;
    }

    table tr:last-child td {
        @apply border-b;
    }

    table tr td:first-child {
        @apply border-l;
    }

    table tr td:last-child {
        @apply border-r;
    }

    table tr:first-child td:first-child {
        @apply rounded-tl;
    }

    table tr:first-child td:last-child {
        @apply rounded-tr;
    }

    table tr:last-child td:first-child {
        @apply rounded-bl;
    }

    table tr:last-child td:last-child {
        @apply rounded-br;
    }
</style>
