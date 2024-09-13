import { Dialog as ChakraDialog, Heading, Portal } from '@chakra-ui/react'
import { CloseButton } from './close-button'
import { forwardRef } from 'react'

export const DialogContent = forwardRef(function DialogContent(props, ref) {
  const {
    children,
    portalled = true,
    containerRef,
    backdrop = true,
    ...rest
  } = props

  return (
    <Portal disabled={!portalled} container={containerRef}>
      {backdrop && <ChakraDialog.Backdrop />}
      <ChakraDialog.Positioner>
        <ChakraDialog.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDialog.Content>
      </ChakraDialog.Positioner>
    </Portal>
  )
})

export const DialogTrigger = (props) => {
  return <ChakraDialog.Trigger {...props} />
}

export const DialogCloseTrigger = (props) => {
  return (
    <ChakraDialog.CloseTrigger {...props} asChild>
      <CloseButton size='sm'>{props.children}</CloseButton>
    </ChakraDialog.CloseTrigger>
  )
}

export const DialogTitle = (props) => {
  return (
    <ChakraDialog.Title {...props} asChild>
      <Heading as='h2' size='lg' lineHeight='1.2'>
        {props.children}
      </Heading>
    </ChakraDialog.Title>
  )
}

export const DialogDescription = (props) => {
  return <ChakraDialog.Description color='fg.subtle' {...props} />
}

export const DialogRoot = ChakraDialog.Root
export const DialogFooter = ChakraDialog.Footer
export const DialogHeader = ChakraDialog.Header
export const DialogBody = ChakraDialog.Body
export const DialogBackdrop = ChakraDialog.Backdrop
