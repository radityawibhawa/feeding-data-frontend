'use client'

import { HStack, IconButton, NumberInput, Text } from '@chakra-ui/react'
import { LuMinus, LuPlus } from 'react-icons/lu'

export const StepperInput = (props) => {
  const { label, ...rest } = props
  return (
    <NumberInput.Root {...rest} unstyled>
      {label && <NumberInput.Label>{label}</NumberInput.Label>}
      <HStack gap='2'>
        <DecrementTrigger />
        <ValueText />
        <IncrementTrigger />
      </HStack>
    </NumberInput.Root>
  )
}

const ValueText = (props) => {
  return (
    <Text
      align='center'
      fontSize='lg'
      minW='3ch'
      fontWeight='medium'
      fontFeatureSettings='pnum'
      fontVariantNumeric='proportional-nums'
      {...props}
    >
      <NumberInput.Context>{(api) => api.value}</NumberInput.Context>
    </Text>
  )
}

const DecrementTrigger = (props) => {
  return (
    <NumberInput.DecrementTrigger {...props} asChild>
      <IconButton variant='outline' size='sm'>
        <LuMinus />
      </IconButton>
    </NumberInput.DecrementTrigger>
  )
}

const IncrementTrigger = (props) => {
  return (
    <NumberInput.IncrementTrigger {...props} asChild>
      <IconButton variant='outline' size='sm'>
        <LuPlus />
      </IconButton>
    </NumberInput.IncrementTrigger>
  )
}
