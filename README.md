# A Conspiracy Theory Survival Guide

A single-page HTML/CSS/JavaScript presentation on conspiracy theories, logical fallacies, McCarthyism, and mass hysteria—plus a playful “roll the dice” conspiracy generator. No frameworks or build step.

## Live demo

**[View on GitHub Pages](https://YOUR_USERNAME.github.io/conspiracy-presentation/)**

*(Replace `YOUR_USERNAME` with your GitHub username.)*

---

## What’s in the presentation

- **10 slides:** Title → The Hook → McCarthyism → Mass Hysteria → 10 Proven Conspiracies → The Irony → **Logical Fallacies** (how ad hominem, appeal to emotion, and slippery slope fuel hysteria) → **Survival Guide** (red flags and how to stay skeptical) → Build-A-Con Workshop → Conclusion
- **Build-A-Con:** Roll dice to generate a random conspiracy (Villain, Target, Method, Cover-up). Options are hidden so the result is a surprise; shareable URL for your roll.
- **Design:** Dark theme, orange accents, Poppins + Roboto, Font Awesome 6. Responsive for mobile, tablet, and desktop.
- **Interactivity:** Slide nav (buttons + arrow keys), counter animation, fact-check toggles on conspiracy cards.

## Run locally

```bash
git clone https://github.com/YOUR_USERNAME/conspiracy-presentation.git
cd conspiracy-presentation
npx serve .
```

Then open the URL (e.g. `http://localhost:3000`). Or open `index.html` in a browser (some behavior may differ without a local server).

## Publish to GitHub Pages

1. **Create a new repo** on GitHub named `conspiracy-presentation` (no README, no .gitignore).
2. **Push this project:**
   ```bash
   cd conspiracy-presentation
   git remote add origin https://github.com/YOUR_USERNAME/conspiracy-presentation.git
   git push -u origin main
   ```
3. **Turn on Pages:** Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main**, folder: **/ (root)** → Save.
4. After a minute or two, the site is at `https://YOUR_USERNAME.github.io/conspiracy-presentation/`.

## Credits

- **Icons:** [Font Awesome 6](https://fontawesome.com/)
- **Fonts:** [Google Fonts](https://fonts.google.com/) — Poppins, Roboto
- **Images:** Unsplash (CC0), Wikimedia Commons (e.g. Joseph McCarthy, public domain), Know Your Meme (Pepe Silvia / Charlie Day)
- **Content:** The “10 proven conspiracies” and sources are cited in the presentation footer.

## License

MIT. Image and historical credits remain as stated above and in the presentation.
