import {
    colors,
    shades,
    fontSizes,
    spaces,
    alignments,
    justifications,
} from '@/config/values'

export const isValidColor = color => colors.includes(color)
export const isValidShade = shade => shades.includes(shade)
export const isValidFontSize = fontSize => fontSizes.includes(fontSize)
export const isValidSpace = space => spaces.includes(space)
export const isValidAlignment = alignment => alignments.includes(alignment)
export const isValidJustification = justification =>
    justifications.includes(justification)
