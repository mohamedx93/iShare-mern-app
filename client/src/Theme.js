import { createTheme} from '@material-ui/core'
import { PRIMARY, SECONDARY, FONTS, FONT_FAMILIES } from './constants/themeConstants'

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY
    },
    secondary: {
      main: SECONDARY
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
