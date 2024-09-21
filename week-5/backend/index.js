const express = require("express");
const cors = require("cors");
const { createCard } = require("./check");
const { card } = require("./mongo");
const app = express();
const port = 3000;
app.use(express.json())
app.use(cors({})) ;

app.post("/card", async (req,res)=>{
    const payload = req.body;
    
    const parsedPayload = createCard.safeParse(payload);
    if(!parsedPayload.success){
        return res.status(411).json({
            msg: "You sent the wrong inputs"
        })
    }



    await card.create({
        name: payload.name,
        description: payload.description,
        interests: payload.interests,
        handles: payload.handles
    })
    return res.json({
        msg: "card created"
    })})

app.get("/cards",async(req,res)=>{
    const cards = await card.find({});
    console.log(cards)
    res.json(
        cards
    )
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })