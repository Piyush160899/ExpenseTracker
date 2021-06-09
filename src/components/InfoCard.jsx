import React from 'react'

const isIncome = Math.round(Math.random());

const infoCard = () => {
    return (
        <div style={{ textAlign: 'center', padding: '0 10%'}}>
            Try saying :<br />
            Add {isIncome ? 'Income ' : 'Expense '} 
            for {'\u20B9'}{isIncome ? '1000 ' : '500 '} 
            in category {isIncome ? 'Business ' : 'House '}
            for {isIncome ? 'Monday' : 'Tuesday'}
        </div>
    )
}

export default infoCard
