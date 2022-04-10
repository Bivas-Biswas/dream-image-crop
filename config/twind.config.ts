import { Configuration } from 'twind'
import * as twindColors from 'twind/colors'

const twindConfig: Configuration = {
  theme: {
    extend: {
      colors: {
        ...twindColors,
        primary: {
          light: '#A3A3FF',
          DEFAULT: '#8080FF',
          dark: '#5050B1',
        },
        secondary: {
          light: '#9290A2',
          DEFAULT: '#6E6B80',
          dark: '#454356',
        },
        accent: {
          DEFAULT: '#FF5226',
        },
        elevation: {
          1: '#030305',
          2: '#0D0D10',
          3: '#16161A',
          4: '#202026',
          5: '#2B2B32',
          6: '#404048',
        },
        content: {
          DEFAULT: '#FFFFFF',
          medium: '#C7C7D1',
          dark: '#A7A7BE',
          muted: '#6E6B80',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: {},
}

export default twindConfig
