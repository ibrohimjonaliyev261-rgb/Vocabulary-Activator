# ⚡ Vocabulary Activator (VocabActivator)

A modern, science-backed web application engineered to bridge the gap between **passive vocabulary recognition** and **active spoken fluency**.

---

## 🌟 Key Features

1. **Passive to Active Vocabulary Activation**
   - Save idioms, collocations, phrases, and words (with custom definitions and personal memory hooks in Russian or your native language).
   - Saved vocabulary transitions from passive knowledge into spontaneous spoken mastery.

2. **The 10-Word Daily Volume Limit**
   - Grounded in cognitive psychology: working memory can deeply assimilate 5–10 chunks per day.
   - Prevents burnout and shallow familiarity. 10 chunks/day = ~300 active phrases/month!

3. **Spaced Retrieval Cycle (2 to 3 Days)**
   - Phrases appear for activation right at the forgetting curve threshold (every 2–3 days), strengthening neural retrieval pathways.

4. **The Anti-Anki Pileup Guarantee**
   - If you miss a day (or several days), words **never pile up** into an overwhelming mountain of 50–100 cards.
   - Sessions are strictly capped at 1 batch of up to 10 words (the skipped day's batch). You only move forward one manageable batch at a time.

5. **Context in Action (Integrated Context Generation)**
   - Every activation card features a rich 2–3 sentence mini-story with contextual clues.
   - Direct integration with **ChatGPT (OpenAI API)** when configured in Settings, plus a high-quality offline smart generator that works out of the box.
   - Completely seamless: AI is never mentioned in the review UI to keep learners fully focused on natural language acquisition.

6. **1 to 5 Activation Rating Scale**
   - `[1] Not Recognized`: Completely forgotten; re-queued soon.
   - `[2] Vaguely Recognized`: Familiar but meaning is unclear without hints.
   - `[3] Known Passively`: Understood when reading, but cannot formulate spontaneously.
   - `[4] Can Use, Want Practice`: Near active; needs one more repetition.
   - `[5] Fully Activated`: Instant, effortless recall.
   - **The 2x Rule**: When rating `5` is given twice across distinct sessions, the chunk permanently graduates to your **Active Vocabulary Bank** and retires from review sessions!

7. **Sound Effects & Haptic Audio**
   - High-fidelity UI sound effects powered by the Web Audio API (mechanical clicks, pops, rating tones, success chimes, and a celebratory fanfare upon session completion).
   - Audio can be muted or unmuted anytime in Settings or via the top navigation toggle.

8. **Multilingual Interface**
   - Full 3-language switch:
     - 🇺🇸 **English**
     - 🇷🇺 **Русский (Russian)**
     - 🇺🇿 **O'zbekcha (Uzbek)**
   - All UI buttons, instructions, metrics, toasts, and explanations are natively translated.

9. **Dark & Light Themes**
   - Crisp modern Light mode and deep elegant Dark mode with smooth transitions.

10. **Dual Statistics**
    - **Daily Statistics**: Words due today, words reviewed today, words added today (X/10), and breakdown of session ratings (Level 5, Levels 2-4, Level 1).
    - **Overall Statistics**: Total practice days/streak, passive count, active count, total vocabulary, and circular mastery percentage ring.

11. **Session Completion Celebration**
    - Multi-tone fanfare chime + dynamic canvas confetti burst on completing your daily batch.

---

## 🚀 How to Run Locally

Because Vocabulary Activator is built with modern, zero-dependency HTML5, CSS3, and ES6 JavaScript:
- Simply double-click `index.html` to open it in **Microsoft Edge**, **Google Chrome**, **Firefox**, or **Safari**.
- No build tools, no Node.js, and no Python required!

---

## 🌐 How to Get a Clean Link Starting with `vocabactivator`

> **Why your previous link contained your email:**
> When using standard GitHub Pages, your URL is structured as `https://<github-username>.github.io/<repo-name>`. If your GitHub username was created using part of your email or name, it automatically showed up in the link.

Here are the best free ways to get a clean URL starting with **`vocabactivator`**:

### Option 1: Vercel (Recommended - 100% Free, 1 Click)
1. Go to [vercel.com](https://vercel.com) and sign up for a free account.
2. Click **"Add New..."** → **"Project"** and upload/select this folder.
3. In Project Settings under **Domains**, set the domain name to:
   **`vocabactivator.vercel.app`**
4. Done! Your website URL will be:
   👉 **`https://vocabactivator.vercel.app`** (no email, no username, free SSL certificate).

### Option 2: Netlify Drop (Instant Drag-and-Drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `Vocabulary Activator` folder into the browser window.
3. Once deployed, click **Site Settings** → **Change site name** and type: `vocabactivator`.
4. Your website will be live at:
   👉 **`https://vocabactivator.netlify.app`**

### Option 3: GitHub Organization
1. On GitHub, create a new free Organization named `vocabactivator`.
2. Inside that organization, create a repository named `vocabactivator.github.io`.
3. Push the files there and enable GitHub Pages in Settings.
4. Your website will be live at:
   👉 **`https://vocabactivator.github.io`**

### Option 4: Custom Domain
- You can buy `vocabactivator.com` on Namecheap or Cloudflare for ~$9/year, and link it directly to Vercel, Netlify, or GitHub Pages.

---

## 📁 Project Structure

```
Vocabulary Activator/
├── index.html            # Main semantic HTML5 markup with responsive views & modals
├── css/
│   └── styles.css        # Modern design system (Light/Dark themes, rating colors, cards)
├── js/
│   ├── app.js            # Main application controller, view routing, event bindings
│   ├── audio.js          # Web Audio API sound synthesizer (clicks, tones, fanfare)
│   ├── ai-context.js     # ChatGPT (OpenAI API) connector + smart local context fallback
│   ├── confetti.js       # Zero-dependency canvas celebration confetti generator
│   ├── storage.js        # Storage manager, anti-pileup logic, daily 10-word limit, stats
│   └── translations.js   # Full 3-language dictionary (English, Russian, Uzbek)
└── README.md             # Documentation and deployment guide
```
