import express from 'express';
import { urlencoded } from 'body-parser';


const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));


app.listen(3000, () => {
    console.log('Server running on port 3000');
});

app.get('/', (req, res) => {
    res.send('funcionou')
})

