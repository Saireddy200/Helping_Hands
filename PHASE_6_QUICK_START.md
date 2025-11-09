# 🚀 Quick Start Guide - Phase 6 Features

## How to Use the New Donation Platform

### For Users

#### 1️⃣ View All Campaigns
- Navigate to `/campaigns`
- Browse all active donation campaigns
- Use filters to find campaigns by:
  - **Category**: Medical, Education, Food, Animals, Disaster Relief, Community Development, Other
  - **Status**: Active, Completed, Cancelled
  - **Search**: Find campaigns by title or description

#### 2️⃣ Create a New Campaign
- Click "Start Campaign" button (top right of Campaigns page)
- Or navigate to `/new-post`
- Must be logged in (auto-redirects to login if not)
- Fill in:
  - **Campaign Title** (max 200 chars) - Clear, compelling title
  - **Description** (max 2000 chars) - Detailed explanation of cause
  - **Category** - Choose most relevant category
  - **Goal Amount** (₹) - Target fundraising amount
  - **Campaign Image** - Upload jpg/png (max 5MB)
- Click "Create Campaign" to publish
- Success → Auto-redirects to campaigns page

#### 3️⃣ Donate to a Campaign
- View campaign in Campaigns page
- Click "Donate" button on campaign card
- Redirects to donation page with campaign details
- Choose donation amount:
  - Quick buttons: ₹100, ₹500, ₹1000, ₹5000, ₹10000
  - Or enter custom amount
- Enter donor information:
  - Full name
  - Email address
  - Payment method (UPI, Card, PayPal, Bank Transfer)
  - Optional: Personal message
  - Optional: Make donation anonymous
- Click "Donate ₹[amount]"
- Success confirmation appears
- Thank you modal displays donation confirmation
- Auto-redirects to campaigns page

#### 4️⃣ Like a Campaign
- Click heart icon on campaign card
- Heart fills in red and count increases
- Click again to unlike
- Must be logged in to like

---

## For Developers

### Backend API Endpoints

#### Get All Campaigns
```
GET /api/campaigns?category=Medical&status=active&sortBy=mostFunded
Response: { success: true, count: N, campaigns: [...] }
```

#### Get Single Campaign
```
GET /api/campaigns/[campaignId]
Response: { success: true, campaign: {...} }
```

#### Create Campaign (Protected)
```
POST /api/campaigns
Headers: Authorization: Bearer [token]
Body: FormData {
  title: string,
  description: string,
  category: string,
  amountNeeded: number,
  images: File (optional)
}
Response: { success: true, message: "Campaign created successfully", campaign: {...} }
```

#### Update Campaign (Protected, Owner Only)
```
PUT /api/campaigns/[campaignId]
Headers: Authorization: Bearer [token]
Body: { title?, description?, category?, amountNeeded?, status? }
Response: { success: true, message: "Campaign updated successfully", campaign: {...} }
```

#### Delete Campaign (Protected, Owner Only)
```
DELETE /api/campaigns/[campaignId]
Headers: Authorization: Bearer [token]
Response: { success: true, message: "Campaign deleted successfully" }
```

#### Like Campaign (Protected)
```
POST /api/campaigns/[campaignId]/like
Headers: Authorization: Bearer [token]
Response: { success: true, likes: number, liked: boolean }
```

#### Add Comment (Protected)
```
POST /api/campaigns/[campaignId]/comments
Headers: Authorization: Bearer [token]
Body: { text: string }
Response: { success: true, message: "Comment added successfully", comments: [...] }
```

#### Donate to Campaign (Protected)
```
POST /api/campaigns/[campaignId]/donate
Headers: Authorization: Bearer [token]
Body: { amount: number }
Response: { success: true, message: "Donation successful", campaign: {...}, newTotal: number }
```

#### Get User's Campaigns (Protected)
```
GET /api/campaigns/user/my-campaigns
Headers: Authorization: Bearer [token]
Response: { success: true, count: N, campaigns: [...] }
```

---

## Testing the Features

### Using curl/Postman

1. **Get all campaigns**
   ```bash
   curl http://localhost:5000/api/campaigns
   ```

2. **Create a campaign** (requires auth token)
   ```bash
   curl -X POST http://localhost:5000/api/campaigns \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -F "title=Medical Help" \
     -F "description=Help needed..." \
     -F "category=Medical" \
     -F "amountNeeded=50000"
   ```

3. **Donate to campaign**
   ```bash
   curl -X POST http://localhost:5000/api/campaigns/CAMPAIGN_ID/donate \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"amount": 1000}'
   ```

---

## Frontend Routes

| Route | Component | Auth Required | Purpose |
|-------|-----------|---------------|---------|
| `/campaigns` | CampaignsPage | No | View all campaigns |
| `/new-post` | CreatePostPage | Yes | Create new campaign |
| `/donate/:campaignId` | DonatePage | No* | Donate to campaign |

*User will be redirected to login if not authenticated

---

## Key Features Explained

### Campaign Filtering
- **Real-time**: Filters apply instantly without page reload
- **Combinable**: Search + Category + Status work together
- **Persistent**: Selected filters show results count

### Progress Bars
- Visual representation of funding progress
- Automatic calculation: (amountRaised / amountNeeded) * 100
- Animated on page load
- Updates in real-time after donations

### Animation Effects
- **Hover**: Campaign cards lift up with shadow on hover
- **Like**: Heart icon scales and fills
- **Load**: Cards stagger in with fade-in effect
- **Success**: Modal pops in with bouncy animation

### Responsive Design
- **Mobile** (< 768px): 1 column, full-width cards
- **Tablet** (768px - 1024px): 2 column grid
- **Desktop** (> 1024px): 3 column grid

### Dark Mode
- Toggle with moon/sun icon in navbar
- All new pages support dark mode
- Smooth color transitions
- Persists in localStorage

---

## Data Structure

### Campaign Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String (enum),
  amountNeeded: Number,
  amountRaised: Number (default: 0),
  images: [String],
  createdBy: ObjectId (User reference),
  likes: Number (default: 0),
  likedBy: [ObjectId],
  comments: [{
    userId: ObjectId,
    name: String,
    text: String,
    createdAt: Date
  }],
  status: String (default: "active", enum: active/completed/cancelled),
  createdAt: Date,
  updatedAt: Date,
  
  // Virtual
  progress: Number (calculated percentage)
}
```

---

## Common Issues & Solutions

### Issue: Campaign not showing after creation
**Solution**: Refresh `/campaigns` page or wait a moment for MongoDB sync

### Issue: Donation not updating amount
**Solution**: Check network tab in browser devtools - ensure POST request succeeds

### Issue: Like button not working
**Solution**: Must be logged in. Button redirects to login if not authenticated

### Issue: Form shows "Image size should be less than 5MB"
**Solution**: Reduce image size using online compressor or image editor

### Issue: Donation payment not processing
**Solution**: Real payment integration not yet implemented - it's a mock for now

---

## Customization

### Changing Quick Donate Amounts
Edit `client/src/pages/DonatePage.jsx`:
```javascript
const quickAmounts = [100, 500, 1000, 5000, 10000]; // Change these values
```

### Adding More Categories
1. Update `Campaign.js` model:
   ```javascript
   enum: ['Medical', 'Education', 'Food', 'Animals', 'Disaster Relief', 'Community Development', 'Other', 'NewCategory']
   ```
2. Update both component files to include new category in dropdown

### Changing Colors
Edit Tailwind classes in components:
- `from-blue-500` → `from-purple-500` for brand color
- `bg-slate-100` → `bg-gray-100` for backgrounds
- Dark classes: `dark:bg-slate-800` → `dark:bg-gray-800`

---

## Performance Tips

1. **Reduce Re-renders**: Already optimized with proper state management
2. **Lazy Load Images**: Images load on demand, not all at once
3. **Pagination Ready**: Backend supports filtering/limiting
4. **Database Indexes**: Campaign queries are indexed for speed

---

## Security Notes

- ✅ All create/update/delete operations require authentication
- ✅ Owner-only operations check `createdBy === req.user.id`
- ✅ No sensitive data exposed (passwords not returned)
- ✅ CORS enabled for localhost development
- ⚠️ Production: Add environment-specific CORS, remove console logs

---

## Next: Production Deployment

Before deploying to production:
1. [ ] Setup real payment gateway (Razorpay/Stripe)
2. [ ] Configure email service for confirmations
3. [ ] Setup proper image upload storage (AWS S3/Firebase)
4. [ ] Add rate limiting to API endpoints
5. [ ] Enable HTTPS and secure cookies
6. [ ] Add input sanitization for XSS protection
7. [ ] Setup monitoring and error tracking (Sentry)
8. [ ] Create admin panel for campaign moderation
9. [ ] Implement email verification for donors
10. [ ] Setup donation receipt generation

---

## Support

For issues or questions, check:
- Backend logs: `npm start` output
- Frontend console: Browser DevTools → Console tab
- Network tab: Check API request/response
- MongoDB Atlas: Verify database has campaigns collection
