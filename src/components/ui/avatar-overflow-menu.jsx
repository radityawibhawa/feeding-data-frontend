import { Avatar } from './avatar'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from './menu'

export const AvatarOverflowMenu = (props) => {
  const { items, ...rest } = props
  return (
    <MenuRoot {...rest} positioning={{ placement: 'bottom' }}>
      <MenuTrigger rounded='full' focusRing='outside'>
        <Avatar variant='outline' fallback={`+${items.length}`} />
      </MenuTrigger>
      <MenuContent>
        {items.map((item) => (
          <MenuItem key={item.name} value={item.name}>
            <Avatar name={item.name} src={item.src} />
            {item.name}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  )
}
