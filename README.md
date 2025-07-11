# 🌙 DreamMix — Generate Surreal Dreamscapes with Gemini + Imagen

> This project is part of the [DEV Education Track: Build Apps with Google AI Studio](https://dev.to/deved/build-apps-with-google-ai-studio).

---

## 🎨 What is DreamMix?

**DreamMix** is a calming AI-powered web experience that lets users visualize their ideal dreams before bed by combining surreal AI-generated art with gentle dream narrations.

✨ **How it works:**

- 🧠 **Gemini** generates poetic dream intros like:

  > “Tonight, you’ll float above a crystal orchard beneath a dragonfruit sky, where memories shimmer like fireflies…”

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## 🧭 My Experience

This was one of the most enjoyable creative AI projects I’ve ever worked on. Here's what I discovered:

- 🧩 **Gemini** is incredibly flexible — It was able to merge even unrelated dream elements into poetic prose.
- 🎨 **Imagen** works beautifully with surreal visual prompts, especially when you emphasize mood, lighting, and composition.
- 💡 **Insight**: This challenge helped me realize how AI can also aid mindfulness and imagination — not just productivity.

---

## 🎯 Why This Project Matters

**DreamMix** isn't just about AI for fun — it's about AI for peace.  
In a noisy world, taking a moment to slow down and visualize a beautiful place—real or imagined—can help us fall asleep calmer, happier, and inspired.

---

## 🛠️ Tech Stack

- 🧠 Google AI Studio  
- ✨ Gemini (for narration)  
- 🖼️ Imagen (for visual generation)  
- 💻 HTML/CSS UI  

---

## 👏 Shoutout

Special thanks to:

- [Google AI Studio](https://makersuite.google.com/)
- [The DEV Community](https://dev.to/)
- Everyone pushing boundaries with creative AI 🌍✨

---

## 📩 Contribute or Remix

If you'd like to remix this app or use it for meditation, bedtime stories, or mental health — feel free!  
**PRs are welcome.** 💜


## 📥 Prompt Used (Gemini + Imagen)

```plaintext
You are an AI dream designer. The user provides a short set of dream elements (such as "floating island, dragonfruit sky, childhood home").

Your job is to:
1. Create a calming, poetic dream narration to help the user visualize their dream before sleep.
2. Generate a vivid visual scene that artistically combines these elements in a surreal and imaginative way.

Input: "[floating island, dragonfruit sky, childhood home]"

Output:
- A poetic bedtime narrative (150–200 words) starting with “Tonight, you will dream of…”
- A vivid scene description to be used by an image generator (Imagen), such as: "A floating island with lush greenery under a glowing dragonfruit-colored sky. A small cozy childhood house rests atop the island, surrounded by levitating lanterns and dreamy clouds."

Ensure the tone is dreamy, soothing, and magical. Avoid realism—lean into surrealism and imagination.

