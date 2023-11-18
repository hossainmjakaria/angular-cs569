const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const todosRouter = require('./todos/todos.router')

const app = express();
mongoose.connect(`mongodb://127.0.0.1:27017/TodoAppDB`)
// mongoose.connect(`mongodb+srv://TodoAppUser:nvzlDaGYVHhaAgE0@cluster0.rc3rj10.mongodb.net/TodoAppDB?retryWrites=true&w=majority`)
//     .then(() => console.log('connected to DB - TodoAppDB'))
//     .catch(err => console.log(err))

app.use(cors());
app.use(morgan('dev'));

app.use('/api/todos', todosRouter)

app.use(function (err, req, res, next) {
    res.status(400).json({ success: false, data: err.message })
})

app.listen(3000, () => console.log(`backend server is listening on 3000`))




