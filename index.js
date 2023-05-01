const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;
app.listen(PORT, console.log(`You are listening on port: ${PORT}`));
const routes = express.Router()
const uri = "mongodb+srv://<username>:<pasword>@ckmdb.5oxvqja.mongodb.net/?retryWrites=true&w=majority";






const dataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    console.log("Database connected.");
  } catch (error) {
    console.log(`Database failed to connected: ${error}`);
  }
};

let expressAsyncHandler = require("express-async-handler");
const ticketFormat = new mongoose.Schema({
    type: String,
    subject: String,
    description: String,
    priority: String,
    status: String,
    recipient: String,
    submitter: String,
    assignee_id: [Number],
    follower_ids: [Number],
    tags: [String],
  });
  const createNewTicket = expressAsyncHandler(async (req, res) => {
    try {
      const ticket = await tickets.create({       
        type: req?.body?.type,
        subject: req?.body?.subject,
        description: req?.body?.description,
        priority: req?.body?.priority,
        status: req?.body?.status,
       recipient: req?.body?.recipient,
        submitter: req?.body?.submitter,
       assignee_id: req?.body?.assignee_id,
        follower_ids: req?.body?.follower_ids,  
        tags: req?.body?.tags,  
      }); 
      res.json(ticket); 
    } catch (error) {
       res.json(error);  
    }
  });

  const removeTicket = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;  
    try {  
      var ticket = await tickets.findByIdAndDelete(id);  
      res.json(ticket); 
    }
     catch (error) 
     {
        res.json(error);  
    }
  });

  
  const getAllTickets = expressAsyncHandler(async (req, res) => { 
    try { 
      var ticketstofetch = await tickets.find({});
  
      res.json(ticketstofetch);
    } 
    catch (error)
     {
  
      res.json(error);
  
    } 
  });



  const getSingleTicket = expressAsyncHandler(async (req, res) => 
  {
      var { id } = req.params;
    try 
    {
       const ticket = await tickets.findById(id);
      res.json(ticket);
    } catch (error) { 
      res.json(error); 
    }  

    var xmlString = json2xml(getSingleTicket);

  console.log(xmlString);

  });


  const modifyTicket = expressAsyncHandler(async (req, res) => 
  {  
    const { id } = req.params;
  
    var {
      type = '',
      subject = '',
      description = '',
      priority = '',
      status = '',
      recipient = '',
      submitter = '',
      assignee_id = ''
    } = req.body;
    

    const ticket = await tickets.findByIdAndUpdate(
      id,
      {
      type,
      subject,
      description,
      priority,
      status,
      recipient,
      submitter,
      assignee_id
    });
    var xmlString = json2xml(modifyTicket);

    console.log(xmlString);
  

  });



  routes.put("rest/xml/ticket/:id", modifyTicket) //update
  routes.get("rest/xml/ticket/:id", getSingleTicket) //byid
  routes.get("rest/list", getAllTickets) //list
  routes.delete("rest/ticket/:id", removeTicket) //delete
  routes.post("rest/ticket", createNewTicket) //create