
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        borderRadius: '20px',
        maxWidth: '100%',
        maxHeight: '600px',
        

    },
    imageSection: {
        marginLeft: '20px',
        maxWidth: '50vw',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            maxWidth: '100vw',
        },
        alignSelf: 'center',
    },
    card: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
    },
    section: {
        borderRadius: '20px',
        margin: '10px',
        flex: 1,
    },
    recommendedPosts: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'

    },
    loadingPaper: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
    },
}
))