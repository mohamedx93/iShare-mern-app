import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { Grow, Container, Grid, Paper, AppBar, Button, TextField } from '@material-ui/core';
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Pagination from '../Pagination';
import useStyles from './styles';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const [currentId, setCurrentId] = useState(null);
    console.log('home component')

    const searchPost = () => {
        if (search.trim() || tags.length > 0) {
            dispatch(getPostsBySearch({ search, searchTags: tags.join(',') }));
            history.push(
                `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
            );
        } else {
            history.push('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }
    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tag) => setTags(tags.filter((tg) => tg !== tag));


    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid className={classes.mainContainer} container spacing={3} justifyContent="space-between" alignItems="stretch">
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}></Posts>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Memories'
                                fullWidth
                                value={search}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label='Search Tags'
                                variant='outlined' />
                            <Button
                                onClick={searchPost}
                                className={classes.searchButton}
                                color='primary'
                                variant='contained'
                            >
                                Search
                            </Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination  page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>

            </Container>
        </Grow>
    )
}

export default Home
