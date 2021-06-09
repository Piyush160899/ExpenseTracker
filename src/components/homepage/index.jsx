/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import { SpeechState, useSpeechContext } from '@speechly/react-client';

import Main from '../Main/Main';
import Details from '../Details/Details';
import useStyles from './styles';
import NavBar from '../navbar';

const Homepage = ({user, setUser}) => {
    const classes = useStyles();
    const { speechState } = useSpeechContext();
    const main = useRef(null);
    const executeScroll = () => main.current.scrollIntoView();
    const [transactions, setTransactions] = useState(localStorage.transactions ?  JSON.parse(localStorage.transactions): null);
    useEffect(() => {
        if(speechState === SpeechState.Recording){
            executeScroll();
        }
    }, [speechState]);

    return (
        <div>
            <NavBar user={user} setUser={setUser}/>
            <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{ height: '100vh' }}>
                <Grid item xs={12} sm={4} className={classes.mobile}>
                    <Details title="Income" transactions/>
                </Grid>
                <Grid ref={main} item xs={12} sm={3} className={classes.main}>
                    <Main transactions={transactions} setTransactions={setTransactions}/> 
                </Grid>
                <Grid item xs={12} sm={4} className={classes.desktop}>
                    <Details title="Income" transactions/>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.last}>
                    <Details title="Expense" transactions/>
                </Grid>
            </Grid>
            <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel />
            </PushToTalkButtonContainer>
        </div>
    )
}

export default Homepage