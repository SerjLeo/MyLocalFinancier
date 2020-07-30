const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')

const app = express();
const {CLIENT_ORIGIN} = require('./config/config')
// connect to DB
connectDB(); 

//Init Middleware
app.use(cors({
    origin: CLIENT_ORIGIN
}))

app.use(express.json({
    extended: false
}))

app.use(express.static('./public'))

app.get('/wake', (req,res) => res.json('API running')); 


//Define Routes
app.use('/api/income', require('./routes/api/income'));
app.use('/api/category', require('./routes/api/category'));
app.use('/api/expense', require('./routes/api/expense'));
app.use('/api/deposit', require('./routes/api/deposit'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})