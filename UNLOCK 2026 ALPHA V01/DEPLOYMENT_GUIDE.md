# UNLOCK 2026 - Deployment Guide

Complete guide to deploying UNLOCK 2026 to production.

## Current Status

✅ **All features implemented:**
- Landing page with email capture (Brevo integration)
- 3 game modes (Word Drop, Word Match, Word Stack)
- Interactive tour system (multi-page)
- Analytics tracking (Google Analytics)
- Feedback form (Google Forms)
- Sound effects and UI
- Responsive design

## Pre-Deployment Checklist

Before deploying, complete these tasks:

### 1. Configure Brevo Integration
- [ ] Create Brevo account at [brevo.com](https://brevo.com)
- [ ] Get API key from Settings → SMTP & API
- [ ] (Optional) Create contact list for "UNLOCK Newsletter"
- [ ] Note list ID (default: 2)

### 2. Configure Google Form
- [ ] Create feedback form at [forms.google.com](https://forms.google.com)
- [ ] Add at least 3-5 questions
- [ ] Customize appearance
- [ ] Extract Form ID from URL
- [ ] Update Form ID in `/unlock 4/landing.html` (line 918)

### 3. Configure Google Analytics
- [ ] Create Google Analytics account at [analytics.google.com](https://analytics.google.com)
- [ ] Create new property for UNLOCK 2026
- [ ] Get your Measurement ID (G-XXXXXXXXXX)
- [ ] Update Measurement ID in `/unlock 4/landing.html` (lines 1015 and 1020)

### 4. Update Content (Optional)
- [ ] Verify all game content is correct
- [ ] Check all links work properly
- [ ] Test tour system end-to-end
- [ ] Test email signup
- [ ] Test feedback form
- [ ] Test sound effects

### 5. Code Review
- [ ] No console errors when opening pages
- [ ] All buttons work and lead to correct places
- [ ] Responsive design works on mobile (test at 320px, 768px, 1024px)
- [ ] Tour works on all pages

## Deployment Options

### Option A: Vercel (Recommended) ⭐

**Why Vercel:**
- Free tier with generous limits
- Automatic deployments from GitHub
- Built-in serverless functions (for Brevo API)
- Fast CDN worldwide
- Easy environment variable management

#### Step 1: Prepare Repository

```bash
cd /Users/vitorabreu/unlockgames-2

# Ensure you have a clean git status
git status

# Add all files
git add .

# Commit with a meaningful message
git commit -m "Deploy UNLOCK 2026 to production

- Landing page with Brevo email integration
- 3 game modes (Word Drop, Word Match, Word Stack)
- Multi-page tour system
- Google Analytics tracking
- Feedback form integration
- Sound effects and responsive design"

# Push to GitHub
git push origin main
```

#### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in/sign up
2. Click **"Add New"** → **"Project"**
3. Select **"Import Git Repository"**
4. Find and select your GitHub repository
5. Click **"Import"**

#### Step 3: Configure Project

In the import dialog:

- **Framework Preset**: Select **"Other"** (it's a static site)
- **Root Directory**: Select **"unlock 4"**
- **Build Command**: Leave empty (no build step needed)
- **Output Directory**: Leave empty

#### Step 4: Add Environment Variables

After project is created:

1. Go to **Settings** → **Environment Variables**
2. Add these variables:

| Name | Value |
|------|-------|
| `BREVO_API_KEY` | `xkeysib-1234...` (your actual API key) |
| `BREVO_LIST_ID` | `2` (or your custom list ID) |

3. Click **"Deploy"** (it will redeploy with variables)

#### Step 5: Deploy!

The deployment starts automatically. You'll see a progress indicator.

Once complete:
- You'll get a deployment URL (usually `https://unlock-2026.vercel.app`)
- Environment variables are now available to `/api/subscribe.js`

### Option B: Netlify

**Why Netlify:**
- Free tier with generous limits
- Git-based deployments
- Built-in form handling (alternative to Brevo)
- Simple setup

#### Step 1: Prepare Repository

Same as Vercel (see Step 1 above)

#### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **"GitHub"** and authorize Netlify
4. Select your repository
5. Click **"Deploy site"**

#### Step 3: Configure

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Add environment variables:
   - `BREVO_API_KEY` = your API key
   - `BREVO_LIST_ID` = 2 (or your list ID)
3. Trigger new deployment: Go back to **Deploys** and click **"Deploy site"**

#### Step 4: Done!

Your site is now live with a Netlify URL (usually `https://unlock2026.netlify.app`)

### Option C: GitHub Pages (Free but Limited)

**Pros:**
- Completely free
- No need for external services
- Simple setup

**Cons:**
- Can't use serverless functions (Brevo API won't work)
- Less flexibility
- Slower than Vercel/Netlify

**If you choose GitHub Pages:**
1. Create email fallback system (optional)
2. Use Netlify Forms instead of Brevo API
3. Follow GitHub Pages deployment guide

## Post-Deployment Checklist

After deployment, test everything:

### 1. Basic Functionality
- [ ] Landing page loads and looks correct
- [ ] All text renders properly
- [ ] Images/emojis display correctly
- [ ] No console errors (open DevTools → Console)

### 2. Navigation
- [ ] "Jogar Agora" button goes to games page
- [ ] Tour buttons work correctly
- [ ] All links in header/footer work
- [ ] Games are accessible

### 3. Email Signup
- [ ] Form submits successfully
- [ ] Success message appears
- [ ] Email appears in Brevo dashboard (wait 2-3 minutes)
- [ ] Multiple signups don't cause errors

### 4. Analytics
- [ ] Google Analytics shows traffic
- [ ] Events are being tracked
- [ ] Page views are recorded

### 5. Feedback Form
- [ ] Form loads in embedded view
- [ ] Form submissions are recorded
- [ ] Responses appear in Google Forms dashboard

### 6. Games
- [ ] Game pages load correctly
- [ ] Sound effects work (if unmuted)
- [ ] Tour works on each game page
- [ ] Stats tracking works

### 7. Mobile Responsiveness
- [ ] Test on iPhone (375px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1024px+ width)
- [ ] All elements are readable and clickable

## Environment Variables Reference

For serverless functions to work, these variables must be set:

```
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxx
BREVO_LIST_ID=2
```

**Getting these values:**

1. **BREVO_API_KEY**:
   - Login to Brevo dashboard
   - Settings → SMTP & API → API Keys → Create new
   - Copy the key

2. **BREVO_LIST_ID**:
   - Contacts → Lists
   - Find your list
   - Click the gear icon
   - List ID shown in URL or settings

## DNS Configuration (Optional)

If you want a custom domain like `unlock2026.com`:

### Vercel:
1. Buy domain (Godaddy, Namecheap, Cloudflare, etc.)
2. In Vercel: Settings → Domains
3. Add your domain
4. Follow instructions to update DNS records
5. Wait 24-48 hours for propagation

### Netlify:
1. Buy domain
2. In Netlify: Settings → Domain management
3. Add custom domain
4. Update nameservers to Netlify's
5. Wait for propagation

### Cost:
- Domain: $10-15/year typically
- Hosting: Free (Vercel/Netlify free tier)

## Monitoring & Maintenance

After deployment:

### Weekly:
- [ ] Check Google Analytics for traffic
- [ ] Review user feedback in Google Forms
- [ ] Check for errors in browser console
- [ ] Test email signup still works

### Monthly:
- [ ] Review all signups in Brevo
- [ ] Plan email campaigns for subscribers
- [ ] Update game content if needed
- [ ] Monitor performance metrics

## Troubleshooting

### "Brevo API not working"
- Check environment variables are set correctly
- Verify API key is valid (not expired)
- Check Brevo account is active
- Check BREVO_LIST_ID is correct

### "Form not loading"
- Clear browser cache
- Check Form ID in landing.html
- Verify form sharing settings allow embedding
- Try in incognito window

### "Slow page load"
- Check Vercel/Netlify analytics for bottlenecks
- Optimize images if using any
- Check for large JavaScript files
- Use browser DevTools Performance tab

### "Sound effects not working"
- Check audio is unmuted in browser
- Verify audioManager is loaded
- Check browser console for errors
- Test in different browser

## Next Steps After Launch

1. **Email Campaigns**
   - Set up welcome email in Brevo
   - Plan beta launch announcement
   - Schedule weekly newsletters

2. **Marketing**
   - Share landing page on social media
   - Reach out to English learners
   - Get feedback from beta users

3. **Updates**
   - Monitor game difficulty
   - Add new classes/topics based on feedback
   - Fix bugs as reported

4. **Monetization** (Future)
   - Premium features
   - Ad-supported version
   - Sponsorships

## Support

- Vercel support: [vercel.com/support](https://vercel.com/support)
- Netlify support: [netlify.com/support](https://netlify.com/support)
- Brevo support: [brevo.com/support](https://brevo.com/support)
- Google Analytics: [support.google.com/analytics](https://support.google.com/analytics)

## Summary

Your UNLOCK 2026 is ready to go live! 🚀

1. Choose Vercel or Netlify (Vercel recommended)
2. Push code to GitHub
3. Connect repository to deployment platform
4. Set environment variables
5. Deploy!

The whole process takes 5-10 minutes.

Once live, you'll have:
- Professional hosting (60-70+ Lighthouse score)
- Email collection working
- Analytics tracking
- Feedback collection
- All games functional

Good luck with your launch! 💪

---

**Questions?** Check the specific setup guides:
- [BREVO_SETUP.md](./BREVO_SETUP.md) - Email integration
- [GOOGLE_FORM_SETUP.md](./GOOGLE_FORM_SETUP.md) - Feedback form
