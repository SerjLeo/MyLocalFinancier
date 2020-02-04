import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import TransactionCard from './TransactionCard';
import Info from '../../utils/Info';
import {CustomPaper, PaperRow, CustomLink, MyButton} from '../../Theme/Theming'

const LastTransactions = ({transactions, loading}) => {
    if (loading || transactions === undefined) {
        return <>Loading...</>
    }
    if (transactions.length === 0) {
        return (
            <CustomPaper>
            <PaperRow>
                No transactions yet...
            </PaperRow>
        </CustomPaper>
        )
    }

    return (
        <CustomPaper>
            <PaperRow>
                <span style={{margin:'5px', marginBottom:'20px'}}>Last transactions</span>
                <Info text={'Last transactions'}/>
            </PaperRow>
            {transactions.map((transaction, i) => {
                while(i <3) {
                    return <TransactionCard key={transaction._id} title={transaction.title} id={transaction._id} type={transaction.type} amount={transaction.amount} category={transaction.category} income={transaction.income} date={transaction.date} currency={transaction.currency}/>
                }
                return null
            })}
            <PaperRow style={{justifyContent: 'center'}}>
                
                    <CustomLink to='/transactions'>
                    <MyButton style={{width: '220px'}}>More transactions</MyButton>
                    </CustomLink>
                
            </PaperRow>
        </CustomPaper>
    )
}

LastTransactions.propTypes = {
    transactions: PropTypes.array
}
const mapStateToProps = (state) => ({
    transactions: state.finance.finance.transactions,
    loading: state.finance.loading
})
export default connect(mapStateToProps)(LastTransactions)
