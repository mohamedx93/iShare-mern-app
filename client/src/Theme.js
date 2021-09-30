import { createTheme, Button, Typography } from '@material-ui/core'
import { PRIMARY, SECONDARY, FONTS, FONT_FAMILIES } from './constants/themeConstants'

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY// "#ff8f00" // This is an orange looking color: ;
    },
    secondary: {
      main: SECONDARY // Another orange-ish color
    }
  },
  fontFamily: FONT_FAMILIES,
  typography: {
    button: {
      fontSize: '1.1rem',
      fontWeight: '400',
      fontFamily: FONTS.POPPINS,
      textTransform: 'none'
    }
  }

})

export default theme
