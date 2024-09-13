import { IconButton } from '@chakra-ui/react'
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from './menu'
import {
  HiMiniEllipsisHorizontal,
  HiMiniEllipsisVertical,
} from 'react-icons/hi2'

export const OverflowMenuRoot = (props) => {
  return (
    <MenuRoot
      {...props}
      positioning={{ placement: 'bottom-end', ...props.positioning }}
    />
  )
}

export const OverflowMenuTrigger = (props) => {
  const { vertical, ...rest } = props
  return (
    <MenuTrigger asChild>
      <IconButton variant='plain' size='sm' {...rest}>
        {vertical ? <HiMiniEllipsisVertical /> : <HiMiniEllipsisHorizontal />}
      </IconButton>
    </MenuTrigger>
  )
}

export const OverflowMenuItem = MenuItem
export const OverflowMenuContent = MenuContent
