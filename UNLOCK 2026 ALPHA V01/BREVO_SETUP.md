# Brevo Integration Setup Guide

This guide explains how to set up Brevo email collection for UNLOCK 2026.

## What's Been Done

✅ **Backend Function Created**: `/unlock 4/api/subscribe.js`
- Vercel/Netlify compatible serverless function
- Securely handles email subscriptions to Brevo
- Handles duplicate emails gracefully
- Includes error handling and validation

✅ **Frontend Updated**: `/unlock 4/landing.html`
- Email form now sends to Brevo via the API function
- Loading states and user feedback
- Analytics event tracking for successful/failed signups
- Error handling for network issues

## Setup Steps

### 1. Create Brevo Account (if you don't have one)
- Go to [brevo.com](https://brevo.com)
- Sign up for a free account
- Verify your email

### 2. Get Your API Key
- Log in to Brevo dashboard
- Go to **Settings → SMTP & API**
- Under **API Keys**, create a new API key
- Copy the key (you'll need it in step 4)

### 3. Create a Contact List (Optional)
- Go to **Contacts → Lists**
- Create a new list called "UNLOCK 2026 Newsletter"
- Note the list ID (default is 2 for "All Contacts")

### 4. Deploy to Vercel or Netlify

#### Option A: Vercel (Recommended)

1. Push your code to GitHub:
```bash
cd /Users/vitorabreu/unlockgames-2
git add .
git commit -m "Add Brevo email integration"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. In the project settings:
   - Go to **Settings → Environment Variables**
   - Add `BREVO_API_KEY` = your API key
   - Add `BREVO_LIST_ID` = list ID (default: 2)
6. Deploy!

#### Option B: Netlify

1. Push your code to GitHub (same as above)

2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select your repository
5. In build settings:
   - Build command: (leave empty for static site)
   - Publish directory: `unlock 4`
6. Go to **Site settings → Build & deploy → Environment**
7. Add environment variables:
   - `BREVO_API_KEY` = your API key
   - `BREVO_LIST_ID` = list ID (optional, default: 2)
8. Deploy!

### 5. Test the Integration

1. Once deployed, visit your landing page
2. Enter your email in the signup form
3. Click "Receber Acesso Beta"
4. You should see a success message
5. Check your Brevo dashboard → Contacts to see the new subscriber

## Environment Variables Reference

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `BREVO_API_KEY` | Your Brevo API key | `xkeysib-1234...` | Yes |
| `BREVO_LIST_ID` | Contact list ID | `2` | No (defaults to 2) |

## Brevo List IDs

- **2**: All Contacts (default)
- Create custom lists in Brevo dashboard for better organization

## What Happens When Someone Signs Up

1. User enters email on landing page
2. Frontend sends email to `/api/subscribe`
3. Vercel/Netlify function receives request
4. Function sends email to Brevo's API
5. Brevo adds contact to your list
6. User gets success message
7. Analytics event is tracked

## Troubleshooting

### "Server configuration error"
- API key not set in environment variables
- Check Vercel/Netlify environment variable settings

### "Invalid email address"
- User didn't enter a valid email
- Frontend validation works

### "Failed to subscribe"
- Brevo API issue
- Check API key is correct
- Check Brevo account is active

### No emails appearing in Brevo
- Check correct list ID is configured
- Verify API key is valid
- Check Brevo account status

## Next Steps

1. ✅ Integration complete and deployed
2. Monitor signups in Brevo dashboard
3. Set up email campaigns in Brevo to send welcome emails
4. Create email templates for launch announcements

## Brevo Features You Can Use

- **Email Campaigns**: Send broadcast emails to subscribers
- **Automation**: Create automated workflows (welcome email, etc.)
- **SMS**: Send SMS messages to opt-in contacts
- **Transactional Emails**: Send game notifications (stretch goal)
- **Analytics**: Track open rates, click rates, etc.

---

For more info, check [Brevo API Documentation](https://developers.brevo.com/reference/getaccount)
