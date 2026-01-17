# 🚀 UNLOCK 2026 - Quick Start Guide

Get UNLOCK 2026 live in 15 minutes!

## What You Need

1. **Brevo Account** - For email collection
   - Sign up at [brevo.com](https://brevo.com) (free)
   - Get API key from Settings → SMTP & API

2. **Google Analytics** - For traffic tracking
   - Create account at [analytics.google.com](https://analytics.google.com) (free)
   - Get Measurement ID (G-XXXXXXXXXX)

3. **Google Form** - For feedback
   - Create at [forms.google.com](https://forms.google.com) (free)
   - Get Form ID from URL

4. **GitHub Account** - For code hosting
   - Already set up ✅

5. **Vercel or Netlify Account** - For hosting
   - Sign up free at [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com)

## Step-by-Step Deployment (15 mins)

### 1. Get Your API Keys (3 minutes)

**From Brevo:**
- Login to [brevo.com](https://brevo.com)
- Settings → SMTP & API → Create API Key
- Copy the key: `xkeysib-xxxxxx...`

**From Google Analytics:**
- Go to [analytics.google.com](https://analytics.google.com)
- Create new property: "UNLOCK 2026"
- Get Measurement ID: `G-XXXXXXXXXX`
- Update in `/unlock 4/landing.html` lines 1015 and 1020

**From Google Form:**
- Create form at [forms.google.com](https://forms.google.com)
- Add 3-5 questions about your game
- Copy Form ID from URL: `1FAIpQLSc3vX9-QxX8vX9vX9...`
- Update in `/unlock 4/landing.html` line 918

### 2. Update Configuration Files (2 minutes)

**Update Google Form ID in landing.html:**
```html
<!-- Line 918 -->
<iframe src="https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform?embedded=true"
```
Replace `YOUR_FORM_ID_HERE` with your actual Form ID

**Update Google Analytics ID in landing.html:**
```html
<!-- Lines 1015 and 1020 -->
gtag('config', 'G-XXXXXXXXXX', {  <!-- Replace with your ID -->
```

### 3. Push to GitHub (2 minutes)

```bash
cd /Users/vitorabreu/unlockgames-2
git add .
git commit -m "Deploy UNLOCK 2026 with configuration"
git push origin main
```

### 4. Deploy to Vercel (5 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Select your **GitHub repository**
4. In import settings:
   - **Root Directory**: Select `unlock 4`
   - **Build Command**: Leave empty
5. Click **"Import"**
6. Go to **Settings** → **Environment Variables**
7. Add two variables:
   ```
   BREVO_API_KEY = xkeysib-xxxxxx...
   BREVO_LIST_ID = 2
   ```
8. Click **"Deploy"**

Done! Your site is live! 🎉

## Verify It Works (2 minutes)

1. **Landing Page**
   - Go to your Vercel URL
   - Page loads and looks good ✅

2. **Email Signup**
   - Enter your email
   - Click "Receber Acesso Beta"
   - Check Brevo dashboard for new contact ✅

3. **Games**
   - Click "Jogar Agora"
   - Games page loads ✅
   - Click a game to play ✅

4. **Tour**
   - Click "Tour" button on landing
   - Tour shows sections correctly ✅

## What's Ready to Use

✅ Landing page with email capture
✅ 3 game modes (Word Drop, Word Match, Word Stack)
✅ 24 grammar topics
✅ Sound effects
✅ Tour system
✅ Analytics tracking
✅ Feedback form
✅ Responsive design (mobile/tablet/desktop)
✅ All animations and effects

## Configure Later (Optional)

These can be set up after launch:

- **Email Campaigns** - Brevo dashboard
- **Automated Welcome Email** - Brevo automations
- **Analytics Dashboard** - Google Analytics
- **Form Responses** - Google Forms
- **Custom Domain** - Vercel domain settings

## Troubleshooting

**"Form not loading"**
- Check Form ID is correct (no spaces)
- Form must allow embedding

**"Email not saving to Brevo"**
- Check BREVO_API_KEY environment variable is set
- Wait 2-3 minutes for sync
- Check Brevo account is active

**"Page loads slow"**
- First load might take 10-30 seconds
- This is normal for cold starts
- Subsequent loads are faster

**"Sound effects not working"**
- Check audio is unmuted in browser
- Try different browser
- Check console for errors

## Next Steps After Launch

1. **Week 1**
   - Share landing page on social media
   - Test with 10-20 beta users
   - Collect feedback from form

2. **Week 2-4**
   - Analyze user feedback
   - Fix any bugs found
   - Plan first email campaign

3. **Month 2**
   - Launch email welcome sequence
   - Plan premium features
   - Grow user base

## Need Help?

- **Deployment issues**: Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Brevo setup**: Check [BREVO_SETUP.md](./BREVO_SETUP.md)
- **Google Form setup**: Check [GOOGLE_FORM_SETUP.md](./GOOGLE_FORM_SETUP.md)
- **Full documentation**: Check [PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md)

## Success! 🎉

Your UNLOCK 2026 is now live and collecting emails!

**Next recommended actions:**
1. Send yourself a test email (verify it arrives)
2. Play through all 3 games
3. Check Analytics dashboard (wait 24 hours for data)
4. Share with friends for beta feedback

---

**All systems GO! Launch UNLOCK 2026 to the world! 🚀**
