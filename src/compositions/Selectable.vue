<script>
    import tinykeys from 'tinykeys'

    export default {
        props: {
            value: {},
            options: {
                type: Array,
                required: true,
            },
        },

        data() {
            return {
                open: false,
                highlighted: this.value,
                removeKeyBindings: null,
            }
        },

        computed: {
            highlightedIndex() {
                return this.options.findIndex(
                    option => option === this.highlighted
                )
            },
        },

        methods: {
            onSelect(value) {
                this.$emit('select', value)

                this.hide()
            },

            show() {
                this.open = true

                this.resetHighlighted()
                this.$emit('show')
            },

            hide() {
                this.open = false

                this.$emit('hide')
            },

            toggle() {
                this.open = !this.open

                this.resetHighlighted()
            },

            resetHighlighted() {
                this.setHighlighted(this.value)
            },

            setHighlighted(value) {
                this.highlighted = value
            },

            nextHighlighted() {
                const nextIndex =
                    (this.highlightedIndex + 1) % this.options.length

                this.setHighlighted(this.options[nextIndex])
            },

            previousHighlighted() {
                const nextIndex =
                    this.highlightedIndex - 1 < 0
                        ? this.options.length - 1
                        : this.highlightedIndex - 1

                this.setHighlighted(this.options[nextIndex])
            },

            handleEnter() {
                if (!this.open) {
                    return this.show()
                }

                this.onSelect(this.highlighted)
            },

            handleSpace() {
                if (!this.$el.contains(document.activeElement)) {
                    return
                }

                if (!this.open) {
                    return this.show()
                }

                this.onSelect(this.highlighted)
            },

            handleEscape() {
                if (!this.open) {
                    return
                }

                this.hide()
            },

            handleHome(event) {
                if (!this.open) {
                    return
                }

                event.preventDefault()

                this.setHighlighted(this.options[0])
            },

            handleEnd(event) {
                if (!this.open) {
                    return
                }

                event.preventDefault()

                this.setHighlighted(this.options[this.options.length - 1])
            },

            handleArrowDown(event) {
                if (!this.open) {
                    return
                }

                event.preventDefault()

                this.nextHighlighted()
            },

            handleArrowUp(event) {
                if (!this.open) {
                    return
                }

                event.preventDefault()

                this.previousHighlighted()
            },

            handleOutsideClick(event) {
                if (this.$el.contains(event.target)) {
                    return
                }

                if (!this.open) {
                    return
                }

                // Don't call hide() because that will cause the hide event to be emitted
                this.open = false
            },
        },

        mounted() {
            // "tinykeys" returns a function that removes the listeners
            this.removeKeyBindings = tinykeys(window, {
                ArrowDown: this.handleArrowDown,
                ArrowUp: this.handleArrowUp,
                Enter: this.handleEnter,
                Space: this.handleSpace,
                Escape: this.handleEscape,
                Home: this.handleHome,
                End: this.handleEnd,
            })

            window.addEventListener('click', this.handleOutsideClick)
        },

        beforeDestroy() {
            this.removeKeyBindings()

            window.removeEventListener('click', this.handleOutsideClick)
        },

        render() {
            return this.$scopedSlots.default({
                open: this.open,
                highlighted: this.highlighted,

                toggle: this.toggle,
                onSelect: this.onSelect,
            })
        },
    }
</script>
