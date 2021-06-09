import React, { useEffect } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';

import useStyles from './styles';

const List = ({setTransactions}) => {
  useEffect(() => {   
    let fetchTransactions = async () => {
      let user_id = JSON.parse(localStorage.user).body._id
      let transactions = await fetch(`https://expense-trackapi.herokuapp.com/api/v001/data/get?user_id=${user_id}`, {
          headers: {
              'Authorization':"Bearer " + JSON.parse(localStorage.user).token
          },
      }).then(res => res.json()).then(jsonRes => {
              return jsonRes
      }).catch(error => console.log(error));
      if(transactions) return transactions;
      return [];
    }
    fetchTransactions().then(res => {
        localStorage.setItem("transactions", JSON.stringify(res))
        setTransactions(res)
        return res;
    });
  });

  const removeTransaction = async (id) => {
    let removededTransaction = await fetch(`https://expense-trackapi.herokuapp.com/api/v001/data/delete?id=${id}`, {
              method: "DELETE",
              headers: {
                  'Authorization':"Bearer " + JSON.parse(localStorage.user).token
              },
      }).then(res => res.json()).then(jsonRes => {
              return jsonRes
      }).catch(error => console.log(error));
      if(removededTransaction.ok) {
        let trans = JSON.parse(localStorage.transactions).filter((t) => t._id !== id);
        localStorage.setItem("transactions", JSON.stringify(trans));
      }
  }
  const classes = useStyles();

  return (
    <MUIList dense={false} className={classes.list}>
      {localStorage.transactions?JSON.parse(localStorage.transactions).map((transaction, index) => (
        <Slide direction="down" in mountOnEnter unmountOnExit key={index}>
          <ListItem > 
            <ListItemAvatar>
              <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={transaction.category} secondary={`\u20B9 ${transaction.amount} - ${transaction.date}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => removeTransaction(transaction._id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
        )) :
        null
      }
    </MUIList>
  );
};

export default List;
