import {
  CheckboxCard as ChakraCheckboxCard,
  CheckboxGroup,
} from '@chakra-ui/react'

export const CheckboxCardControl = (props) => {
  const { children, showIndicator = true, ...rest } = props
  return (
    <ChakraCheckboxCard.Control {...rest}>
      {children}
      <ChakraCheckboxCard.HiddenInput />
      {showIndicator && <ChakraCheckboxCard.Indicator />}
    </ChakraCheckboxCard.Control>
  )
}

export const CheckboxCardAddon = ChakraCheckboxCard.Addon
export const CheckboxCardRoot = ChakraCheckboxCard.Root
export const CheckboxCardIndicator = ChakraCheckboxCard.Indicator
export const CheckboxCardGroup = CheckboxGroup
export const CheckboxCardLabel = ChakraCheckboxCard.Label
