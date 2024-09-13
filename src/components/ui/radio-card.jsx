import { RadioCard as ChakraRadioCard } from '@chakra-ui/react'

export const RadioCardItem = (props) => {
  const { children, addon, showIndicator = true, ...rest } = props
  return (
    <ChakraRadioCard.Item {...rest}>
      <ChakraRadioCard.ItemHiddenInput />
      <ChakraRadioCard.ItemControl>
        {children}
        {showIndicator && <ChakraRadioCard.ItemIndicator />}
      </ChakraRadioCard.ItemControl>
      {addon}
    </ChakraRadioCard.Item>
  )
}

export const RadioCardRoot = ChakraRadioCard.Root
export const RadioCardLabel = ChakraRadioCard.Label
export const RadioCardItemText = ChakraRadioCard.ItemText
export const RadioCardItemAddon = ChakraRadioCard.ItemAddon
export const RadioCardItemIndicator = ChakraRadioCard.ItemIndicator
