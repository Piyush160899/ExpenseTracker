import React, { useState, useEffect } from 'react';
import {TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import {useSpeechContext} from '@speechly/react-client'; 
import formatDate from '../../../utils/formatDate';
import useStyles from './styles';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import CustomizedSnackbar from '../../Snackbar/Snackbar';

const initialState = {
    amount: 0,
    category: incomeCategories[0].type,
    type:'Income',
    date: formatDate(new Date()),
    user_id: ' ',
}

const Form = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);
    const { segment } = useSpeechContext();
    const [open, setOpen ] = useState(false);

    const createTransaction = async () => {
        if(Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
       const transaction = { ...formData, amount: Number(formData.amount), user_id: JSON.parse(localStorage.user).body._id}
       let addedTransaction = await fetch("https://expense-trackapi.herokuapp.com/api/v001/data/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization':"Bearer " + JSON.parse(localStorage.user).token
                },
                body:JSON.stringify(transaction),
        }).then(res => res.json()).then(jsonRes => {
                return jsonRes
        }).catch(error => console.log(error));
        
        if(addedTransaction){
            localStorage.setItem("transactions",JSON.stringify([ ...JSON.parse(localStorage.transaction), addedTransaction ]))
            setOpen(true);
        } else{
            setOpen(false);
        }
        setFormData(initialState);
    }

    useEffect(()=> {
        if(segment){
            if(segment.intent.intent === 'add_expense'){
                setFormData({ ...formData, type:'Expense'});
            }else if( segment.intent.intent === 'add_income'){
                setFormData({ ...formData, type: 'Income'});
            } else if( segment.isFinal && segment.intent.intent === "create_transaction"){
                return createTransaction();
            } else if( segment.isFinal && segment.intent.intent === "cancel_transaction"){
                return setFormData(initialState);
            }
            segment.entities.forEach((e) => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                switch (e.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: e.value});
                        break;
                    case 'category':
                        if(incomeCategories.map((iC) => iC.type).includes(category)){
                            setFormData({ ...formData, type: 'Income', category});
                        }else if(expenseCategories.map((iC) => iC.type).includes(category)){
                            setFormData({ ...formData, type: 'Expense', category});
                        }
                        break;
                    case 'date':
                        setFormData({ ...formData, date: e.value});
                        break;
                    default:
                        break;
                }
            });
            if(segment.isFinal && formData.amount && formData.type && formData.category && formData.date){
                createTransaction();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [segment]);

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    return (
        <div>
            <Grid container spacing={2}>
                <CustomizedSnackbar open={open} setOpen={setOpen}/>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment && segment.words.map((w) => w.value).join(" ")}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value})}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value})}>
                       {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value})}/>
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value)})}/>
            </Grid>
            <Button className={classes.button} variant="outlined"color="primary" fullWidth onClick={createTransaction}>Create</Button>
            </Grid>        
        </div>
    )
}

export default Form
