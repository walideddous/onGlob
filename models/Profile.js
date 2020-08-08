const mongoose = require('mongoose');

// Create Schema
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  handle: {
    type: String,
    max: 40,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: [true, 'Please add a status'],
  },
  skills: {
    type: [String],
    required: [true, 'Please add a skill'],
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: [true, 'Please add a title'],
      },
      company: {
        type: String,
        required: [true, 'Please add a company'],
      },
      location: {
        type: String,
      },
      since: {
        type: Date,
        required: [true, 'Please add since'],
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: [true, 'Please add a school'],
      },
      degree: {
        type: String,
        required: [true, 'Please add a degree'],
      },
      fieldofstudy: {
        type: String,
        required: [true, 'Please add a field of study'],
      },
      since: {
        type: Date,
        required: [true, 'Please add since'],
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
