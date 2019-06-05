import React from 'react'
import ProductInfo from '../ProductInfo'
import { firstLetterUppercase, getColorsPalette } from '../../Helpers'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

const colorPalette = getColorsPalette()

const ColorItemDisabled = () => (
  <ToggleButton variant="outline-secondary" disabled>
    None
  </ToggleButton>
)
const ColorItem = (color, colorIndex) => (
  <ToggleButton
    key={colorIndex}
    value={colorIndex}
    variant={'outline-' + colorPalette[color]}>
    {firstLetterUppercase(color)}
  </ToggleButton>
)
const ColorsList = ({ productColors, handleColorSelect, activeColorIndex }) => {
  // If the product has color values, return buttons for each.
  // Else, return a disabled button.
  const colors = (productColors || []).length ? (
    productColors.map(ColorItem)
  ) : (
    <ColorItemDisabled />
  )
  return (
    <ProductInfo
      className="m-0"
      label="Color"
      description={
        <ToggleButtonGroup
          value={activeColorIndex}
          name="color"
          onChange={handleColorSelect}
          className="mb-3 flex-column flex-md-row">
          {colors}
        </ToggleButtonGroup>
      }
    />
  )
}

export default ColorsList
