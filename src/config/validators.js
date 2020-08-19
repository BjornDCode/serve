import {
    sizes,
    colors,
    shades,
    spaces,
    shadows,
    weights,
    statuses,
    fontSizes,
    positions,
    maxWidths,
    directions,
    alignments,
    decorations,
    lineHeights,
    borderRadii,
    textAlignments,
    justifications,
} from '@/config/values'

export const isValidSize = size => sizes.includes(size)
export const isValidColor = color => colors.includes(color)
export const isValidShade = shade => shades.includes(shade)
export const isValidSpace = space => spaces.includes(space)
export const isValidShadow = shadow => shadows.includes(shadow)
export const isValidWeight = weight => weights.includes(weight)
export const isValidStatus = status => statuses.includes(status)
export const isValidFontSize = fontSize => fontSizes.includes(fontSize)
export const isValidPosition = position => positions.includes(position)
export const isValidDirection = direction => directions.includes(direction)
export const isValidMaxWidth = maxWidth => maxWidths.includes(maxWidth)
export const isValidAlignment = alignment => alignments.includes(alignment)
export const isValidDecoration = decoration => decorations.includes(decoration)
export const isValidLineHeight = lineHeight => lineHeights.includes(lineHeight)
export const isValidBorderRadius = radis => borderRadii.includes(radis)
export const isValidTextAlignment = textAlignment =>
    textAlignments.includes(textAlignment)
export const isValidJustification = justification =>
    justifications.includes(justification)
