const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const authRouter = require(__dirname + '/routes/auth_router');
const bridgeRouter = require(__dirname + '/routes/bridge_router');
const lightRouter = require(__dirname + '/routes/light_router');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hue_db');

app.use('/api', authRouter);
app.use('/api', bridgeRouter);
app.use('/api', lightRouter);

app.use((req, res) => {
  res.status(404).send('Page not found!');
});
module.exports = app.listen(PORT, () => console.log('server up on port:' + PORT));
