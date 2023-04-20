const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const mongoString =
  "mongodb+srv://aayushmaan:T0ip4oXPT5EME0hF@cluster0.ifpv3u9.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

// app.set('view engine','ejs')
app.get("/", async (req, res) => {
  res.render("index");
});

// app.post('/login',async(req,res)=>{
//   res.send({message:'newpage'})
// })

// app.get('/account',async(req,res)=>{
//   res.render('account')
// })
app.use("/", routes);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000);
console.log("Server is listening on port 5000");
