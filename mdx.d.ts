import type { MDXProps } from 'mdx/types'
import type { FC } from 'react'

declare module '*.mdx' {
  const MDXComponent: FC<MDXProps>
  export default MDXComponent
}
