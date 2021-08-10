import { createCss } from '@stitches/react'

export const { styled, css, global, keyframes, theme, getCssString, config } =
  createCss({
    media: {
      xs: '(min-width: 0px)',
      sm: '(min-width: 576px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 992px)',
      xl: '(min-width: 1200px)',
      xxl: '(min-width: 1400px)',
    },
  })
