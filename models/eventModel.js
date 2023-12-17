const mongoose = require("mongoose")
const validator = require("validator")
const moment = require("moment-timezone")
// const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const currentDate = new Date();
// const dayOfWeek = currentDate.getDay();
// const todayDayName = dayNames[dayOfWeek];
const EventSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        trim:"true",
        required:true
    },
    description:{
      type:String,
      required:true
    },
    eventDate:{
        type:Date,
        // required:true,
    },
    eventTime:{
        type:String,
        validate(value){
            const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!value.match(timePattern)) {
                throw new Error("Enter Valid Time")
            }
        }
    },
    registered:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    leaderboard: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          score: {
            type: Number,
            default: 0,
          },
        },
      ],
      status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
        default: 'Upcoming',
      },
      type: {
        type: String,
        enum: ['expert lecture', 'competition', 'weekly contest', 'saturday activity'],
        required: true,
      },
      image:{
        type:Buffer
      }
},{
  timestamps:{
    currentTime: () => Math.floor(Date.now() + 5.5 * 60 * 60 * 1000)
  }
})

const Event = mongoose.model("Event",EventSchema);

module.exports = Event