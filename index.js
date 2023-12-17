const express= require("express")
const app = express()
const UserRouter = require("./routes/userRouter")
const SuggestionRouter = require("./routes/suggestionRouter")
const EventRouter = require("./routes/eventRouter")
const BlogRouter = require("./routes/blogRouter")
const ResumeRouter = require("./routes/resumeRouter")

const PORT = process.env.PORT || 3001 ;
const cors = require("cors")
app.use(cors())
require("./dbconnect")
app.use(express.json())

app.use("/api/blogs",BlogRouter)
app.use("/api/suggestions",SuggestionRouter)
app.use("/api/users",UserRouter)
app.use("/api/events",EventRouter)
app.use("/api/resume",ResumeRouter)




app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
})