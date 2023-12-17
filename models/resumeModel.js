const mongoose = require('mongoose');

// Define the schema for the resume
const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  objective:{
    type:String,
    required:true,
    maxLength:300,
    minLength:20
  },
  education: [
    {
      degree: {
        type: String,
        required: true,
      },
      college: { 
        type: String,
        required: true,
      },
      startYear: {
        type: Number,
        required: true,
      },
      endYear: {
        type: Number,
        required: true,
      },
      cgpa: {  
        type: Number,
        min:0,
        max:10
      },
    },
  ],
  experiences: [
    {
      role: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
      description: {
        type: String,
      },
    },
  ],
  projects: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      technologies: {
        type: [String],
        required: true,
      },
    },
  ],
  certifications: [
    {
      title: {
        type: String,
        required: true,
      },
      issuer: {
        type: String,
        required: true,
      },
      dateEarned: {
        type: Date,
      },
    },
  ],
  interests: [String],
  skills: [String]
},{
    timestamps:{
        currentTime: () => Math.floor(Date.now() + 5.5 * 60 * 60 * 1000)
    }
});

// Create the Resume model based on the schema
const Resume = mongoose.model('Resume', resumeSchema);

// Export the model to be used in other parts of the application
module.exports = Resume;
