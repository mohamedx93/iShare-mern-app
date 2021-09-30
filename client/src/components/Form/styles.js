import { makeStyles } from '@material-ui/core/styles'
import { ORANGE } from '../../constants/themeConstants.js'

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  paper: {
    margin: theme.spacing(2, 0, 2, 0),
    padding: theme.spacing(2)
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  fileInput: {
    width: '97%',
    margin: '10px 0'
  },
  buttonSubmit: {
    marginBottom: 10
  },
  buttonClear: {
    color: ORANGE
  }
}))
