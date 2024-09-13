'use client'

import { Select as ChakraSelect, Portal } from '@chakra-ui/react'
import { CloseButton } from './close-button'

export const SelectTrigger = (props) => {
  const { children, ...rest } = props
  return (
    <ChakraSelect.Control {...rest}>
      <ChakraSelect.Trigger>
        {children}
        <ChakraSelect.Indicator />
      </ChakraSelect.Trigger>
    </ChakraSelect.Control>
  )
}

export const SelectClearTrigger = () => (
  <ChakraSelect.ClearTrigger asChild>
    <CloseButton size='sm' variant='ghost' />
  </ChakraSelect.ClearTrigger>
)

export const SelectContent = (props) => {
  const { portalled = true, containerRef, ...rest } = props
  return (
    <Portal disabled={!portalled} container={containerRef}>
      <ChakraSelect.Positioner>
        <ChakraSelect.Content {...rest} />
      </ChakraSelect.Positioner>
    </Portal>
  )
}

export const SelectItem = (props) => {
  const { item, children, ...rest } = props
  return (
    <ChakraSelect.Item key={item.value} item={item} {...rest}>
      {children}
      <ChakraSelect.ItemIndicator />
    </ChakraSelect.Item>
  )
}

export const SelectValueText = (props) => {
  const { children, ...rest } = props
  return (
    <ChakraSelect.ValueText {...rest}>
      <ChakraSelect.Context>
        {(select) => {
          const items = select.selectedItems
          if (items.length === 0) return props.placeholder
          if (children) return children(items)
          if (items.length === 1)
            return select.collection.stringifyItem(items[0])
          return `${items.length} selected`
        }}
      </ChakraSelect.Context>
    </ChakraSelect.ValueText>
  )
}

export const SelectRoot = (props) => {
  return (
    <ChakraSelect.Root
      {...props}
      positioning={{ sameWidth: true, ...props.positioning }}
    />
  )
}

export const SelectLabel = ChakraSelect.Label
export const SelectItemGroup = ChakraSelect.ItemGroup
export const SelectItemText = ChakraSelect.ItemText
export const SelectItemGroupLabel = ChakraSelect.ItemGroupLabel
