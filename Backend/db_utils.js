// imports
import { MongoClient, ObjectId } from 'mongodb';

export default class db_utils {
    constructor() {
}

// main function - establish a connection with the mongo db
// uri var controls connection to local mongo.
main = async function() {
    const uri ="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
    const client = new MongoClient(uri);
    try {
        await client.connect();
    }
    catch (e) {
        console.error(e);
    }
    finally {
        return client;
    }
}


// function that creates a thread in the db
createThread = async function(client, newThread, newComments) {
    const result = await client.db("ThreadsApp").collection("Threads").insertOne(newThread);
    console.log(`New thread created with the following id: ${result.insertedId}`);
    if (newComments != null)
        await createMultipleComments(client, newComments);
    client.close();
    return result.insertedId;
    }

// function that creates a comment in the db
createComment = async function(client, newComment) {
    const result = await client.db("ThreadsApp").collection("Comments").insertOne(newComment);
    console.log(`New comment created with the following id: ${result.insertedId}`);
    client.close();
    return result.insertedId;
    }
    

// function that edits a single thread by id param
editThread = async function (client, threadId, newValues) {
    var vals = { $set: { Color: newValues.Color, ThreadName: newValues.ThreadName } };
    var o_id = new ObjectId(threadId);
    const result = await client.db("ThreadsApp").collection("Threads").updateOne({ _id: o_id }, vals);
    console.log(result);
    client.close();

    }
    
// function that edits a single comment by id param
editComment = async function (client, commentId, newValues) {
    var vals = { $set: { Color: newValues.Color, CommentText: newValues.CommentText, ThreadId: newValues.ThreadId } };
    var o_id = new ObjectId(commentId);
    const result = await client.db("ThreadsApp").collection("Comments").updateOne({ _id: o_id }, vals);
    console.log(result);
    client.close();
}

// function that create multi comments
createMultipleComments = async function(client, newComments) {
    const result = await client.db("ThreadsApp").collection("Comments").insertMany(newComments);
    console.log(`${result.insertedCount} New comments created with the following ids: `);
    console.log(result.insertedIds)
    client.close()
}

// function that retrieves a single thread by id param
findThreadById = async function (client, threadId) {
    var o_id = new ObjectId(threadId);
    console.log('searching id - ', o_id)
    const result = await client.db("ThreadsApp").collection("Threads").findOne({ _id: o_id });
    console.log("retrived result", result)
    client.close();
    return result;
    }
    
// function that retrieves multiple comments by id param
findCommentsByThreadId = async function (client, threadId) {
    console.log('searching id - ', threadId)
    const cursor = await client.db("ThreadsApp").collection("Comments").find({ ThreadId: threadId });
    const results = await cursor.toArray();
    console.log("retrived result", results)
    client.close();
    return results;
}

// function that retrieves a single thread by title param
findThreadByTitle = async function (client, threadTitle) {
    const result = await client.db("ThreadsApp").collection("Threads").findOne({ ThreadName: threadTitle });
    console.log("retrived result", result)
    client.close();
    return result;
}

// function that retrieves all threads
findAllThreads = async function(client) {
    const cursor = await client.db("ThreadsApp").collection("Threads").find();
    const results = await cursor.toArray();
    console.log("retrived result", results)
    client.close();
    return results;
}
}

