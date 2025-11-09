/**
 * In-memory mock database for development/testing
 * This allows the app to work without MongoDB connection
 * Data is lost on server restart
 */

let users = [];
let posts = [];
let donations = [];
let messages = [];
let campaigns = [];

// Initialize with some sample campaigns
const initializeSampleCampaigns = () => {
  campaigns = [
    {
      _id: '1',
      title: 'Emergency Medical Relief for Children',
      description: 'Help us provide emergency medical treatment to underprivileged children. This fund will be used for surgeries, medicines, and basic healthcare.',
      category: 'Medical',
      amountNeeded: 500000,
      amountRaised: 250000,
      images: ['https://images.unsplash.com/photo-1631217314830-4a6edd4008e4?w=500&h=300&fit=crop'],
      createdBy: '1',
      likes: 150,
      likedBy: [],
      comments: [],
      status: 'active',
      createdAt: new Date()
    },
    {
      _id: '2',
      title: 'Build School for Rural Children',
      description: 'We are building a new school in a remote village to provide quality education to 200+ children who have no access to schools.',
      category: 'Education',
      amountNeeded: 1000000,
      amountRaised: 650000,
      images: ['https://images.unsplash.com/photo-1427504494785-cdbb17a3b519?w=500&h=300&fit=crop'],
      createdBy: '1',
      likes: 200,
      likedBy: [],
      comments: [],
      status: 'active',
      createdAt: new Date()
    },
    {
      _id: '3',
      title: 'Feed 1000 Hungry Families',
      description: 'Daily meal support for 1000 families affected by severe drought. Each donation provides nutritious meals for one week.',
      category: 'Food',
      amountNeeded: 300000,
      amountRaised: 180000,
      images: ['https://images.unsplash.com/photo-1593518932035-5fed5ae3c13e?w=500&h=300&fit=crop'],
      createdBy: '1',
      likes: 120,
      likedBy: [],
      comments: [],
      status: 'active',
      createdAt: new Date()
    },
    {
      _id: '4',
      title: 'Rescue & Rehabilitate Stray Animals',
      description: 'Help us rescue injured and abandoned animals, provide medical treatment, and find them loving homes.',
      category: 'Animals',
      amountNeeded: 400000,
      amountRaised: 320000,
      images: ['https://images.unsplash.com/photo-1450747832694-a4e98e6c0f30?w=500&h=300&fit=crop'],
      createdBy: '1',
      likes: 180,
      likedBy: [],
      comments: [],
      status: 'active',
      createdAt: new Date()
    },
    {
      _id: '5',
      title: 'Flood Relief & Rehabilitation',
      description: 'Immediate relief for flood-affected families. We provide shelter, clean water, food, and medical aid to disaster survivors.',
      category: 'Disaster Relief',
      amountNeeded: 750000,
      amountRaised: 420000,
      images: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop'],
      createdBy: '1',
      likes: 160,
      likedBy: [],
      comments: [],
      status: 'active',
      createdAt: new Date()
    },
    {
      _id: '6',
      title: 'Clean Water for Village Communities',
      description: 'Install water purification systems and wells in 10 villages to provide clean drinking water to 5000+ people.',
      category: 'Community Development',
      amountNeeded: 600000,
      amountRaised: 550000,
      images: ['https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=300&fit=crop'],
      createdBy: '1',
      likes: 190,
      likedBy: [],
      comments: [],
      status: 'active',
      createdAt: new Date()
    },
    {
      _id: '7',
      title: 'Elderly Care & Support Program',
      description: 'Monthly support for 200 elderly people living below poverty line. Includes food, medicines, and basic healthcare.',
      category: 'Community Development',
      amountNeeded: 350000,
      amountRaised: 200000,
      images: ['https://images.unsplash.com/photo-1516684938411-52581002a659?w=500&h=300&fit=crop'],
      createdBy: '1',
      likes: 130,
      likedBy: [],
      comments: [],
      status: 'active',
      createdAt: new Date()
    },
    {
      _id: '8',
      title: 'Women Empowerment & Skill Training',
      description: 'Provide vocational training to 500 underprivileged women to help them become financially independent.',
      category: 'Education',
      amountNeeded: 450000,
      amountRaised: 280000,
      images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop'],
      createdBy: '1',
      likes: 140,
      likedBy: [],
      comments: [],
      status: 'active',
      createdAt: new Date()
    },
    {
      _id: '9',
      title: 'COVID-19 Vaccination Drive',
      description: 'Free vaccination camp for 10,000 people in slum areas. Includes vaccines, masks, sanitizers and medical support.',
      category: 'Medical',
      amountNeeded: 200000,
      amountRaised: 199000,
      images: ['https://images.unsplash.com/photo-1579154204601-01d3f2d751a0?w=500&h=300&fit=crop'],
      createdBy: '1',
      likes: 170,
      likedBy: [],
      comments: [],
      status: 'active',
      createdAt: new Date()
    },
    {
      _id: '10',
      title: 'Special Needs Children Education',
      description: 'Provide special education and therapy for 100 children with disabilities to help them integrate into mainstream schools.',
      category: 'Education',
      amountNeeded: 500000,
      amountRaised: 480000,
      images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=300&fit=crop'],
      createdBy: '1',
      likes: 155,
      likedBy: [],
      comments: [],
      status: 'active',
      createdAt: new Date()
    }
  ];
};

initializeSampleCampaigns();

// User operations
const UserDB = {
  findOne: async (query) => {
    const [key, value] = Object.entries(query)[0];
    return users.find(u => u[key] === value);
  },

  findById: async (id) => {
    return users.find(u => u._id === id);
  },

  find: async (query = {}) => {
    if (Object.keys(query).length === 0) {
      return users;
    }
    const [key, value] = Object.entries(query)[0];
    return users.filter(u => u[key] === value);
  },

  create: async (data) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const user = {
      _id: id,
      ...data,
      createdAt: new Date(),
      __v: 0
    };
    users.push(user);
    return user;
  },

  updateOne: async (query, update) => {
    const user = await UserDB.findOne(query);
    if (user) {
      Object.assign(user, update.$set || update);
      return { modifiedCount: 1 };
    }
    return { modifiedCount: 0 };
  },

  findByIdAndUpdate: async (id, update) => {
    const user = await UserDB.findById(id);
    if (user) {
      Object.assign(user, update);
      return user;
    }
    return null;
  },

  deleteOne: async (query) => {
    const index = users.findIndex(u => {
      const [key, value] = Object.entries(query)[0];
      return u[key] === value;
    });
    if (index !== -1) {
      users.splice(index, 1);
      return { deletedCount: 1 };
    }
    return { deletedCount: 0 };
  }
};

// Post operations
const PostDB = {
  findOne: async (query) => {
    const [key, value] = Object.entries(query)[0];
    return posts.find(p => p[key] === value);
  },

  findById: async (id) => {
    return posts.find(p => p._id === id);
  },

  find: async (query = {}) => {
    if (Object.keys(query).length === 0) {
      return posts;
    }
    const [key, value] = Object.entries(query)[0];
    return posts.filter(p => p[key] === value);
  },

  create: async (data) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const post = {
      _id: id,
      ...data,
      createdAt: new Date(),
      __v: 0
    };
    posts.push(post);
    return post;
  },

  findByIdAndUpdate: async (id, update) => {
    const post = await PostDB.findById(id);
    if (post) {
      Object.assign(post, update);
      return post;
    }
    return null;
  },

  findByIdAndDelete: async (id) => {
    const index = posts.findIndex(p => p._id === id);
    if (index !== -1) {
      const post = posts[index];
      posts.splice(index, 1);
      return post;
    }
    return null;
  }
};

// Donation operations
const DonationDB = {
  find: async (query = {}) => {
    if (Object.keys(query).length === 0) {
      return donations;
    }
    const [key, value] = Object.entries(query)[0];
    return donations.filter(d => d[key] === value);
  },

  create: async (data) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const donation = {
      _id: id,
      ...data,
      createdAt: new Date(),
      __v: 0
    };
    donations.push(donation);
    return donation;
  }
};

// Message operations
const MessageDB = {
  find: async (query = {}) => {
    if (Object.keys(query).length === 0) {
      return messages;
    }
    const [key, value] = Object.entries(query)[0];
    return messages.filter(m => m[key] === value);
  },

  create: async (data) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const message = {
      _id: id,
      ...data,
      createdAt: new Date(),
      __v: 0
    };
    messages.push(message);
    return message;
  },

  findByIdAndUpdate: async (id, update) => {
    const message = messages.find(m => m._id === id);
    if (message) {
      Object.assign(message, update);
      return message;
    }
    return null;
  }
};

// Campaign operations
const CampaignDB = {
  find: async (query = {}) => {
    let result = campaigns;
    if (Object.keys(query).length === 0) {
      return result;
    }
    const [key, value] = Object.entries(query)[0];
    return result.filter(c => c[key] === value);
  },

  findById: async (id) => {
    return campaigns.find(c => c._id === id);
  },

  findByIdAndUpdate: async (id, update) => {
    const campaign = campaigns.find(c => c._id === id);
    if (campaign) {
      Object.assign(campaign, update.$set || update);
      return campaign;
    }
    return null;
  },

  create: async (data) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const campaign = {
      _id: id,
      ...data,
      likes: 0,
      likedBy: [],
      comments: [],
      amountRaised: 0,
      status: 'active',
      createdAt: new Date(),
      __v: 0
    };
    campaigns.push(campaign);
    return campaign;
  },

  findByIdAndDelete: async (id) => {
    const index = campaigns.findIndex(c => c._id === id);
    if (index > -1) {
      const campaign = campaigns[index];
      campaigns.splice(index, 1);
      return campaign;
    }
    return null;
  },

  countDocuments: async (query = {}) => {
    if (Object.keys(query).length === 0) {
      return campaigns.length;
    }
    const [key, value] = Object.entries(query)[0];
    return campaigns.filter(c => c[key] === value).length;
  }
};

module.exports = {
  UserDB,
  PostDB,
  DonationDB,
  MessageDB,
  CampaignDB,
  // Helper to clear all data
  clearAllData: () => {
    users = [];
    posts = [];
    donations = [];
    messages = [];
    initializeSampleCampaigns();
  },
  // Helper to get stats
  getStats: () => ({
    users: users.length,
    posts: posts.length,
    donations: donations.length,
    messages: messages.length,
    campaigns: campaigns.length
  })
};
