// imports
import express from "express";
import cors from "cors";
import db_utils from './db_utils.js'

const app = express();
const port = process.env.port || 5000;

// create db var
const db = new db_utils();

app.use(cors());
app.use(express.json());

// server routes:

app.get('/getThreadByName', (req, res) => {
    console.log(req.query)
    const { ThreadName } = req.query;
    console.log("thread title - ", ThreadName);
    db.main()
        .then((client) => { return db.findThreadByTitle(client, ThreadName) })
        .then((Thread) => { res.status(200).send(Thread); })
        .catch((error) => {
        console.log(error); res.sendStatus(500);
    })
});

app.get('/getThreadById', (req, res) => {
    console.log(req.query)
    const { ID } = req.query;
    console.log("thread id - ", ID);
    db.main()
        .then((client) => { return db.findThreadById(client, ID) })
        .then((Thread) => { res.status(200).send(Thread); })
        .catch((error) => {
        console.log(error); res.sendStatus(500);
    })
});

app.get('/getThreads', (req, res) => {
    db.main()
        .then((client) => { return db.findAllThreads(client) })
        .then((Threads) => { res.status(200).send(Threads); })
        .catch((error) => {
        console.log(error); res.sendStatus(500);
    })
});

app.get('/getComments', (req, res) => {
    console.log('got a request to fetch comments');
    console.log(req.query);
    const { threadId } = req.query;
    db.main()
        .then((client) => { return db.findCommentsByThreadId(client, threadId) })
        .then((Threads) => { res.status(200).send(Threads); })
        .catch((error) => {
        console.log(error); res.sendStatus(500);
    })
});

app.put('/editThread', (req, res) => {
    console.log(req.query)
    db.main()
        .then((client) => { return db.editThread(client, req.query.threadId, req.query) })
        .then((Thread) => { res.status(200).send(Thread); })
        .catch((error) => {
        console.log(error); res.sendStatus(500);
    })
});

app.put('/editComment', (req, res) => {
    console.log(req.query)
    db.main()
        .then((client) => { return db.editComment(client, req.query.commentId, req.query) })
        .then((Comment) => { res.status(200).send(Comment); })
        .catch((error) => {
        console.log(error); res.sendStatus(500);
    })
});

app.post('/createThread', (req, res) => {
    db.main()
        .then((client) => { return db.createThread(client, req.query, null) })
        .then((ThreadID) => { res.send(ThreadID); })
        .catch((error) => {
        console.log(error); res.sendStatus(500);
    })
})

app.post('/createComment', (req, res) => {
    db.main()
        .then((client) => { return db.createComment(client, req.query, null) })
        .then((CommentID) => { res.send(CommentID); })
        .catch((error) => {
        console.log(error); res.sendStatus(500);
    })
})

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));


app.listen(port, (err) => {
  if (err) {
    return console.log("error", err);
  }
  console.log(`Server is running on port ${port}`);
});

export default app;
