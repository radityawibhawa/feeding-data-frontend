function _nullishCoalesce(lhs, rhsFn) {
  if (lhs != null) {
    return lhs
  } else {
    return rhsFn()
  }
}
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

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
})

const defaultMeta = {
  closable: true,
}

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster
        toaster={toaster}
        insetInline={{ mdDown: '1rem' }}
        width={{ md: '356px' }}
      >
        {(toast) => {
          const meta = Object.assign(
            defaultMeta,
            _nullishCoalesce(toast.meta, () => ({})),
          )
          return (
            <Toast.Root>
              {toast.type === 'loading' ? (
                <Spinner size='sm' color='blue.solid' />
              ) : (
                <Toast.Indicator />
              )}
              <Stack gap='1' flex='1' maxWidth='100%'>
                {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                {toast.description && (
                  <Toast.Description>{toast.description}</Toast.Description>
                )}
              </Stack>
              {_optionalChain([meta, 'optionalAccess', (_) => _.action]) && (
                <Toast.ActionTrigger onClick={meta.action}>
                  {meta.actionLabel}
                </Toast.ActionTrigger>
              )}
              {_optionalChain([
                meta,
                'optionalAccess',
                (_2) => _2.closable,
              ]) && <Toast.CloseTrigger />}
            </Toast.Root>
          )
        }}
      </ChakraToaster>
    </Portal>
  )
}
