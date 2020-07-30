import React, {useState} from 'react'
import AddDepositForm from '../incomeHelpers/AddDepositForm'
import AddExpenseForm from '../incomeHelpers/AddExpenseForm'
import WithTranslation from '../../../translation/withTranslationHOC'
import {Typography, Box, Tabs, Tab} from '@material-ui/core'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={0}>{children}</Box>}
      </Typography>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
const IncomeTabs = ({exchangeRates, income, categories, strings}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered> 
                <Tab label={strings.depositTab} {...a11yProps(0)} />
                <Tab label={strings.expenseTab} {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <AddDepositForm
                    exchangeRates={exchangeRates}
                    income={income}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AddExpenseForm
                    exchangeRates={exchangeRates}
                    income={income}
                    categories={categories}
                />
            </TabPanel>
        </div>
    )
}



export default WithTranslation(IncomeTabs)