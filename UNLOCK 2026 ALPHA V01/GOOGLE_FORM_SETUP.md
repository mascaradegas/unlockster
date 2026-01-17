# Google Form Feedback Setup Guide

This guide explains how to set up a Google Form for user feedback on UNLOCK 2026.

## What's Been Done

✅ **Feedback Section Added**: `/unlock 4/landing.html`
- New "Sua Opinião Importa 💬" section after the Classes section
- Embedded Google Form area ready to be configured
- Professional styling matching the landing page design
- Mobile-responsive iframe implementation

## Setup Steps

### 1. Create a Google Form

1. Go to [forms.google.com](https://forms.google.com)
2. Click **"Create"** or **"+"** to start a new form
3. Title: "UNLOCK 2026 - Feedback & Sugestões"
4. Description: "Ajude-nos a melhorar! Sua opinião é muito importante para o desenvolvimento do UNLOCK 2026."

### 2. Add Questions

Suggested questions for your form:

**Question 1: Overall Interest**
- Type: Multiple choice
- Question: "Qual é seu principal interesse no UNLOCK 2026?"
- Options:
  - [ ] Aprender inglês de forma divertida
  - [ ] Gamificar meu aprendizado
  - [ ] Preparação para testes (TOEFL, IELTS, etc.)
  - [ ] Praticar inglês conversacional
  - [ ] Outro

**Question 2: Current English Level**
- Type: Multiple choice
- Question: "Qual é seu nível atual de inglês?"
- Options:
  - [ ] Iniciante (A1)
  - [ ] Elementar (A2)
  - [ ] Intermediário (B1)
  - [ ] Pré-Avançado (B2)
  - [ ] Avançado (C1+)

**Question 3: Most Interesting Game Mode**
- Type: Multiple choice
- Question: "Qual modo de jogo você acha mais interessante?"
- Options:
  - [ ] Word Drop (palavras caindo)
  - [ ] Word Match (combinação de pares)
  - [ ] Word Stack (ordenação de palavras)
  - [ ] Todos têm o mesmo interesse

**Question 4: Feature Request**
- Type: Short answer
- Question: "Que funcionalidade você gostaria de ver no UNLOCK 2026?"
- Required: No

**Question 5: Contact (Optional)**
- Type: Short answer
- Question: "Quer receber atualizações? Deixe seu email (opcional)"
- Required: No

**Question 6: Additional Comments**
- Type: Long answer
- Question: "Algum outro feedback ou sugestão?"
- Required: No

### 3. Customize Form Appearance

1. Click the **Palette icon** (Design)
2. Choose a theme (or keep default)
3. Set header image: You can add the UNLOCK 2026 banner
4. Choose colors to match your brand (Blues and gold)

### 4. Get the Embed Code

1. Click the **Send** button (top right)
2. Click the **Embed** icon (looks like `</`)
3. Copy the entire iframe code

### 5. Update the Landing Page

1. Open `/unlock 4/landing.html` in your editor
2. Find line 918: `<iframe src="https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform?embedded=true"`
3. Replace `YOUR_FORM_ID_HERE` with your actual form ID

   **To get your Form ID:**
   - In Google Forms, look at the URL: `https://docs.google.com/forms/d/e/**FORM_ID_HERE**/viewform`
   - The FORM_ID is the long string between `/d/e/` and `/viewform`

4. The complete URL should look like:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSdXxxx...xxxxx/viewform?embedded=true
   ```

### 6. Test the Integration

1. Save the file
2. Reload your landing page
3. Scroll to "Sua Opinião Importa 💬" section
4. You should see your Google Form embedded
5. Test submitting a response
6. Check your Google Form responses dashboard

## Form ID Example

**URL in Google Forms:**
```
https://docs.google.com/forms/d/e/1FAIpQLSc3vX9-QxX8vX9vX9vX9vX9vX9vX9vX9vX9vX9/viewform?usp=sf_link
```

**Extract the Form ID:**
```
1FAIpQLSc3vX9-QxX8vX9vX9vX9vX9vX9vX9vX9vX9vX9
```

**Use in iframe:**
```html
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc3vX9-QxX8vX9vX9vX9vX9vX9vX9vX9vX9vX9/viewform?embedded=true"
```

## Viewing Responses

### In Google Forms Dashboard:
1. Go back to your form in [forms.google.com](https://forms.google.com)
2. Click the **"Responses"** tab
3. See all responses, individual answers, and charts

### Export Responses:
1. Click the **3-dot menu** (top right of Responses tab)
2. Click **"Download responses (.csv)"**
3. Open in Excel, Google Sheets, etc.

### Google Sheets Integration:
1. In the Responses tab, click the **Google Sheets icon**
2. Create a new spreadsheet
3. Responses will automatically populate as users submit

## Privacy & Data Handling

- Google Forms is GDPR compliant
- Users can see your privacy policy before submitting
- Consider adding a note in your form about how you'll use the data
- Responses are stored in Google's secure servers
- Only you can see individual responses (unless you share the form)

## Advanced Options

### Make Form Public (Optional)
- Keep form private (default) - only you can access
- Or share the link for direct access
- Embedded forms are typically private to the website

### Pre-fill Form Fields
- You can pre-fill known information like email
- Useful for tracking which page the form was submitted from

### Collect Email Addresses
- Google Forms can automatically collect respondent emails
- Go to **Settings** → Check "Collect email addresses"

## Best Practices

1. **Keep it short** - Users have limited time (2 minutes is good)
2. **Ask specific questions** - Avoid vague open-ended questions
3. **Thank respondents** - Set a confirmation message
4. **Review regularly** - Check responses weekly during beta
5. **Act on feedback** - Let users know their input matters

## Next Steps

1. ✅ Feedback section embedded in landing page
2. Create the Google Form (steps above)
3. Update the Form ID in landing.html
4. Deploy to production
5. Monitor responses in Google Forms dashboard
6. Use feedback to improve UNLOCK 2026

## Troubleshooting

### "Form not loading"
- Check that Form ID is correct
- Verify URL is complete with `/viewform?embedded=true`
- Check form isn't restricted to specific users

### "Form appears broken"
- Clear browser cache
- Try in incognito/private window
- Check responsive design in mobile view

### "Can't see responses"
- Make sure you're logged into the Google account that owns the form
- Check form submissions are enabled in Settings

---

For more info, check [Google Forms Help](https://support.google.com/forms)
