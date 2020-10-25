<template>
    <table class="border-separate w-full">
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
        @apply border-t-2;
    }

    table tr:last-child td {
        @apply border-b-2;
    }

    table tr td:first-child {
        @apply border-l-2;
    }

    table tr td:last-child {
        @apply border-r-2;
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
