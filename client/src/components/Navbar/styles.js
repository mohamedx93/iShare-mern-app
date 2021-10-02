import { makeStyles } from '@material-ui/core/styles'
import { FONTS, PRIMARY } from '../../constants/themeConstants.js'

export default makeStyles((theme) => ({
  appBar: {
    backgroundColor: PRIMARY,
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px'
  },
  toolbar: {
    // display: 'flex',
    // justifyContent: 'space-between',
    // width: '400px',
    // [theme.breakpoints.down('sm')]: {
    //   width: 'auto'
    // }
  },
  navBarRight: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center'
    },
    alignItems: 'center'
  },
  profile: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  logout: {
    marginLeft: '20px'
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: '1.6rem',
    fontFamily: FONTS.SOURCE,
    fontSize: '1.6rem',
    color: 'white'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: '#1D2A34',
    color: theme.palette.getContrastText('#1D2A34')

  }
}))
