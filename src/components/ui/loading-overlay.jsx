function _optionalChain(ops) {
  let lastAccessLHS = undefined
  let value = ops[0]
  let i = 1
  while (i < ops.length) {
    const op = ops[i]
    const fn = ops[i + 1]
    i += 2
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      return undefined
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value
      value = fn(value)
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => value.call(lastAccessLHS, ...args))
      lastAccessLHS = undefined
    }
  }
  return value
}
;('use client')

import { AbsoluteCenter, Box, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'

export const LoadingOverlay = (props) => {
  const { loading, containerRef, children, ...rest } = props

  useEffect(() => {
    if (!_optionalChain([containerRef, 'optionalAccess', (_) => _.current]))
      return
    if (loading) {
      containerRef.current.setAttribute('aria-busy', 'true')
    } else {
      containerRef.current.removeAttribute('aria-busy')
    }
  }, [loading])

  if (!loading) return null

  return (
    <AbsoluteCenter>
      <Box inset='0' pos='absolute' {...rest} />
      <Spinner size='lg' />
      {children}
    </AbsoluteCenter>
  )
}
