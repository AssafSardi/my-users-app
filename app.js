const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const app = express();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});