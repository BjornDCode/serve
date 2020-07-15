import {
    sizes,
    colors,
    shades,
    spaces,
    weights,
    fontSizes,
    alignments,
    justifications,
} from '@/config/values'

export const isValidSize = size => sizes.includes(size)
export const isValidColor = color => colors.includes(color)
export const isValidShade = shade => shades.includes(shade)
export const isValidSpace = space => spaces.includes(space)
export const isValidWeight = weight => weights.includes(weight)
export const isValidFontSize = fontSize => fontSizes.includes(fontSize)
export const isValidAlignment = alignment => alignments.includes(alignment)
export const isValidJustification = justification =>
    justifications.includes(justification)
