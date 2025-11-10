const mongoose = require('mongoose');
const Campaign = require('../models/Campaign');
const User = require('../models/User');
require('dotenv').config();

// Set NODE_TLS_REJECT_UNAUTHORIZED for Windows MongoDB Atlas issue
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function seedCampaigns() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB');

    // Get a user to associate campaigns with
    let user = await User.findOne();
    
    if (!user) {
      // Create a default user if none exists
      user = await User.create({
        name: 'Admin User',
        email: 'admin@helpinghands.com',
        password: 'test123', // Will be hashed by pre-save hook
        role: 'organizer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
      });
      console.log('✅ Created admin user');
    }

    // Clear existing campaigns
    await Campaign.deleteMany({});
    console.log('🗑️  Cleared existing campaigns');

    // Sample campaign data
    const campaigns = [
      {
        title: 'Emergency Medical Relief for Children',
        description: 'Help us provide emergency medical treatment to underprivileged children. This fund will be used for surgeries, medicines, and basic healthcare.',
        category: 'Medical',
        amountNeeded: 500000,
        amountRaised: 250000,
        images: ['https://images.unsplash.com/photo-1631217314830-4a6edd4008e4?w=500&h=300&fit=crop'],
        createdBy: user._id,
        status: 'active'
      },
      {
        title: 'Build School for Rural Children',
        description: 'We are building a new school in a remote village to provide quality education to 200+ children who have no access to schools.',
        category: 'Education',
        amountNeeded: 1000000,
        amountRaised: 650000,
        images: ['https://images.unsplash.com/photo-1427504494785-cdbb17a3b519?w=500&h=300&fit=crop'],
        createdBy: user._id,
        status: 'active'
      },
      {
        title: 'Feed 1000 Hungry Families',
        description: 'Daily meal support for 1000 families affected by severe drought. Each donation provides nutritious meals for one week.',
        category: 'Food',
        amountNeeded: 300000,
        amountRaised: 180000,
        images: ['https://images.unsplash.com/photo-1593518932035-5fed5ae3c13e?w=500&h=300&fit=crop'],
        createdBy: user._id,
        status: 'active'
      },
      {
        title: 'Rescue & Rehabilitate Stray Animals',
        description: 'Help us rescue injured and abandoned animals, provide medical treatment, and find them loving homes.',
        category: 'Animals',
        amountNeeded: 400000,
        amountRaised: 320000,
        images: ['https://images.unsplash.com/photo-1450747832694-a4e98e6c0f30?w=500&h=300&fit=crop'],
        createdBy: user._id,
        status: 'active'
      },
      {
        title: 'Flood Relief & Rehabilitation',
        description: 'Immediate relief for flood-affected families. We provide shelter, clean water, food, and medical aid to disaster survivors.',
        category: 'Disaster Relief',
        amountNeeded: 750000,
        amountRaised: 420000,
        images: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop'],
        createdBy: user._id,
        status: 'active'
      },
      {
        title: 'Clean Water for Village Communities',
        description: 'Install water purification systems and wells in 10 villages to provide clean drinking water to 5000+ people.',
        category: 'Community Development',
        amountNeeded: 600000,
        amountRaised: 550000,
        images: ['https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=300&fit=crop'],
        createdBy: user._id,
        status: 'active'
      },
      {
        title: 'Elderly Care & Support Program',
        description: 'Monthly support for 200 elderly people living below poverty line. Includes food, medicines, and basic healthcare.',
        category: 'Community Development',
        amountNeeded: 350000,
        amountRaised: 200000,
        images: ['https://images.unsplash.com/photo-1516684938411-52581002a659?w=500&h=300&fit=crop'],
        createdBy: user._id,
        status: 'active'
      },
      {
        title: 'Women Empowerment & Skill Training',
        description: 'Provide vocational training to 500 underprivileged women to help them become financially independent.',
        category: 'Education',
        amountNeeded: 450000,
        amountRaised: 280000,
        images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop'],
        createdBy: user._id,
        status: 'active'
      },
      {
        title: 'COVID-19 Vaccination Drive',
        description: 'Free vaccination camp for 10,000 people in slum areas. Includes vaccines, masks, sanitizers and medical support.',
        category: 'Medical',
        amountNeeded: 200000,
        amountRaised: 199000,
        images: ['https://images.unsplash.com/photo-1579154204601-01d3f2d751a0?w=500&h=300&fit=crop'],
        createdBy: user._id,
        status: 'active'
      },
      {
        title: 'Special Needs Children Education',
        description: 'Provide special education and therapy for 100 children with disabilities to help them integrate into mainstream schools.',
        category: 'Education',
        amountNeeded: 500000,
        amountRaised: 480000,
        images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=300&fit=crop'],
        createdBy: user._id,
        status: 'active'
      }
    ];

    // Insert campaigns
    const createdCampaigns = await Campaign.insertMany(campaigns);
    console.log(`✅ Seeded ${createdCampaigns.length} campaigns`);

    // Add some mock likes
    for (let i = 0; i < createdCampaigns.length; i++) {
      createdCampaigns[i].likes = Math.floor(Math.random() * 500) + 50;
      createdCampaigns[i].likedBy = [];
      await createdCampaigns[i].save();
    }

    console.log('✅ Added mock likes to campaigns');
    console.log('🌟 Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedCampaigns();
