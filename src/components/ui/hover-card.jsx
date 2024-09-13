import { HoverCard as ChakraHoverCard, Portal } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const HoverCardContent = forwardRef(
  function HoverCardContent(props, ref) {
    const { portalled = true, containerRef, ...rest } = props

    return (
      <Portal disabled={!portalled} container={containerRef}>
        <ChakraHoverCard.Positioner>
          <ChakraHoverCard.Content ref={ref} {...rest} />
        </ChakraHoverCard.Positioner>
      </Portal>
    )
  },
)

export const HoverCardArrow = (props) => {
  return (
    <ChakraHoverCard.Arrow {...props}>
      <ChakraHoverCard.ArrowTip />
    </ChakraHoverCard.Arrow>
  )
}

export const HoverCardTrigger = (props) => {
  return <ChakraHoverCard.Trigger {...props} />
}

export const HoverCardRoot = ChakraHoverCard.Root
