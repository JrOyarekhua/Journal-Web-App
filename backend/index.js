import express from 'express';
const app = express();
import userRouter from './routes/users'
import notesRouter from './routes/notes'

app.use('/api/users',userRouter);
app.use('/api/notes',notesRouter);


app.listen(8000,() => {
    console.log('server is listening on http://localhost:8000/')
}) 