import { Drawer as ChakraDrawer, Heading, Portal } from '@chakra-ui/react'
import { CloseButton } from './close-button'
import { forwardRef } from 'react'

export const DrawerContent = forwardRef(function DrawerContent(props, ref) {
  const { children, portalled = true, containerRef, offset, ...rest } = props
  return (
    <Portal disabled={!portalled} container={containerRef}>
      <ChakraDrawer.Positioner padding={offset}>
        <ChakraDrawer.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDrawer.Content>
      </ChakraDrawer.Positioner>
    </Portal>
  )
})

export const DrawerCloseTrigger = (props) => {
  return (
    <ChakraDrawer.CloseTrigger {...props} asChild>
      <CloseButton size='sm' />
    </ChakraDrawer.CloseTrigger>
  )
}

export const DrawerTitle = (props) => {
  return (
    <ChakraDrawer.Title {...props} asChild>
      <Heading as='h2' size='lg' lineHeight='1.2'>
        {props.children}
      </Heading>
    </ChakraDrawer.Title>
  )
}

export const DrawerDescription = (props) => {
  return <ChakraDrawer.Description color='fg.muted' {...props} />
}

export const DrawerTrigger = ChakraDrawer.Trigger
export const DrawerRoot = ChakraDrawer.Root
export const DrawerFooter = ChakraDrawer.Footer
export const DrawerHeader = ChakraDrawer.Header
export const DrawerBody = ChakraDrawer.Body
export const DrawerBackdrop = ChakraDrawer.Backdrop
