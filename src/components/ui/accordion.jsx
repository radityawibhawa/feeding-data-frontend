import { Accordion as ChakraAccordion, HStack, Icon } from '@chakra-ui/react'
import { LuChevronDown } from 'react-icons/lu'

export const AccordionItemTrigger = (props) => {
  const { children, ...rest } = props
  return (
    <ChakraAccordion.ItemTrigger {...rest}>
      <HStack gap='4' flex='1' textAlign='start' width='full'>
        {children}
      </HStack>
      <ChakraAccordion.ItemIndicator>
        <LuChevronDown />
      </ChakraAccordion.ItemIndicator>
    </ChakraAccordion.ItemTrigger>
  )
}

export const AccordionItemContent = (props) => {
  return (
    <ChakraAccordion.ItemContent>
      <ChakraAccordion.ItemBody {...props} />
    </ChakraAccordion.ItemContent>
  )
}

export const AccordionItemIcon = (props) => {
  return <Icon color='fg.muted' fontSize='lg' {...props} asChild />
}

export const AccordionRoot = ChakraAccordion.Root
export const AccordionItem = ChakraAccordion.Item
