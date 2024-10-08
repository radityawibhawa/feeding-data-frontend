import { Progress as ChakraProgress, IconButton } from '@chakra-ui/react'
import { ToggleTip } from './toggle-tip'
import { HiOutlineInformationCircle } from 'react-icons/hi'

export const ProgressBar = (props) => {
  return (
    <ChakraProgress.Track {...props}>
      <ChakraProgress.Range />
    </ChakraProgress.Track>
  )
}

export const ProgressRoot = ChakraProgress.Root
export const ProgressValueText = ChakraProgress.ValueText

export const ProgressLabel = (props) => {
  const { children, info, ...rest } = props
  return (
    <ChakraProgress.Label {...rest}>
      {children}
      {info && (
        <ToggleTip content={info}>
          <IconButton variant='ghost' aria-label='info' size='xs' ms='1'>
            <HiOutlineInformationCircle />
          </IconButton>
        </ToggleTip>
      )}
    </ChakraProgress.Label>
  )
}
