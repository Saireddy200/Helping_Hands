require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const Donation = require('../models/Donation');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Donation.deleteMany({});

    // Create users
    const users = await User.create([
      {
        name: 'John Donor',
        email: 'donor@example.com',
        password: 'password123',
        role: 'donor'
      },
      {
        name: 'Jane Receiver',
        email: 'receiver@example.com',
        password: 'password123',
        role: 'receiver'
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      },
      {
        name: 'Sara Charity',
        email: 'charity@example.com',
        password: 'password123',
        role: 'receiver'
      },
      {
        name: 'Mike Helper',
        email: 'helper@example.com',
        password: 'password123',
        role: 'donor'
      }
    ]);

    console.log(`${users.length} users created`);

    // Create posts
    const posts = await Post.create([
      {
        title: 'Help for Medical Emergency',
        description: 'My father needs urgent surgery. Please help me raise funds for his treatment.',
        requiredAmount: 5000,
        collectedAmount: 0,
        category: 'medical',
        location: 'New York',
        createdBy: users[1]._id,
        donors: []
      },
      {
        title: 'Education Fund for Underprivileged Children',
        description: 'Helping provide quality education to children from low-income families.',
        requiredAmount: 3000,
        collectedAmount: 0,
        category: 'education',
        location: 'Los Angeles',
        createdBy: users[3]._id,
        donors: []
      },
      {
        title: 'Emergency Relief After Disaster',
        description: 'Communities affected by natural disaster need immediate relief and support.',
        requiredAmount: 10000,
        collectedAmount: 0,
        category: 'emergency',
        location: 'Texas',
        createdBy: users[1]._id,
        donors: []
      },
      {
        title: 'Community Water Well Project',
        description: 'Build a clean water well for a rural community lacking access to safe water.',
        requiredAmount: 2000,
        collectedAmount: 0,
        category: 'community',
        location: 'Ohio',
        createdBy: users[3]._id,
        donors: []
      },
      {
        title: 'School Supplies for Rural School',
        description: 'Help us provide basic school supplies for children in rural areas.',
        requiredAmount: 1500,
        collectedAmount: 0,
        category: 'education',
        location: 'Pennsylvania',
        createdBy: users[1]._id,
        donors: []
      }
    ]);

    console.log(`${posts.length} posts created`);

    // Create donations
    const donations = await Donation.create([
      {
        donorId: users[0]._id,
        postId: posts[0]._id,
        amount: 500
      },
      {
        donorId: users[4]._id,
        postId: posts[0]._id,
        amount: 300
      },
      {
        donorId: users[0]._id,
        postId: posts[1]._id,
        amount: 200
      },
      {
        donorId: users[4]._id,
        postId: posts[3]._id,
        amount: 400
      },
      {
        donorId: users[0]._id,
        postId: posts[4]._id,
        amount: 250
      }
    ]);

    console.log(`${donations.length} donations created`);

    // Update posts with collected amounts and donors
    for (const donation of donations) {
      const post = await Post.findById(donation.postId);
      post.collectedAmount += donation.amount;
      if (!post.donors.includes(donation.donorId)) {
        post.donors.push(donation.donorId);
      }
      await post.save();
    }

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
