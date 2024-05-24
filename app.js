const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


const app = express();


app.set('view engine', 'ejs');



mongoose.connect('mongodb+srv://kuljeetpindoria:Stkh%401895@cluster0.vwaptb9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', err => {
    console.log('connection failed');
})

mongoose.connection.on('connected', connected => {
    console.log('connected successfully', connected)

})


const userSchema = new mongoose.Schema({
    username: String,
    password: String
});


const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/login', (req, res) => {
    res.render('login');
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {

        const user = await User.findOne({ username });

        
        if (user && await bcrypt.compare(password, user.password)) {
            res.send('Login successful!');
        } else {
            res.send('Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.send('Username already exists');
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

       
        await User.create({
            username,
            password: hashedPassword
        });

        res.send('Registration successful!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



