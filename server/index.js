import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import postRoutes from './routes/posts.js'

const app = express();
app.use('/posts', postRoutes);
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://Maazo:MohZayd1@cluster0.zlyjq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('db connected');
        app.listen(PORT, () => console.log('server running on port:\t',PORT))
    })
    .catch((error) => console.log(error.messages));

mongoose.set('useFindAndModify', false);

