import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
//import contactRouter from './routes/contactRoutes.js';

const app = express();
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
//app.use('/contacts', contactRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is running")
})