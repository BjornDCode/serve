const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'Inter',
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Arial',
                    'sans-serif',
                ],
            },
            boxShadow: {
                'inner-lg': 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.16)',
            },
            spacing: {
                '2px': '2px',
                '80': '20rem',
            },
            maxHeight: {
                ...defaultTheme.spacing,
            },
            maxWidth: {
                ...defaultTheme.spacing,
            },
            borderWidth: {
                '1': '1px',
            },
        },
    },
    variants: {
        boxShadow: ['responsive', 'hover', 'focus', 'active', 'focus-visible'],
        borderWidth: ['responsive', 'last'],
    },
    plugins: [],
}
