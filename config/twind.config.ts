import { Configuration } from 'twind'
import * as twindColors from 'twind/colors'

const twindConfig: Configuration = {
  theme: {
    extend: {
      colors: {
        ...twindColors,
      },
      animation: {
        'width-suppress': 'width-suppress 0.5s ease-in-out',
      },
      keyframes: {
        'width-suppress': {
          '0%': { width: '100%' },
          '100%': { width: '70%' },
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
