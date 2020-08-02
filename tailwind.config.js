module.exports = {
    purge: [],
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
            height: {
                '2px': '2px',
            },
        },
    },
    variants: {
        boxShadow: ['responsive', 'hover', 'focus', 'active', 'focus-visible'],
    },
    plugins: [],
}
