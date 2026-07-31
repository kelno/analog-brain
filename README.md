# Introduction

This tool is designed to overcome your executive dysfunction by asking you questions and leading you to a helpful answer.  
Reimagination of the "The ADHD Analog Brain", from https://adhdanalogbrain.blogspot.com/, as a single page application running in the browser.  
Implemented in React Typescript with Tailwind.  

# Design Philosophy
- Accessibility First: Accessibility is a core priority, ensuring the app is usable and inclusive for everyone, regardless of ability or device.
- Content-Friendly: I’ve designed this app with extensibility in mind, making it easy to add or update content without compromising functionality.


# How to
## Managing Decks
The default decks are located in the `public/decks` directory. You can either edit those or load decks from a different URL. This can be configured in the UI.

### Loading decks with `deck_url`

Use the `deck_url` query parameter to open the app with a specific deck index:

```text
https://your-app.example/#/?deck_url=https%3A%2F%2Fcards.example%2Fdecks%2Findex.json
```

Because the app uses hash-based routing, the parameter must appear after `#/`. URL-encode the value before adding it to the link. For example, the encoded value above represents:

```text
https://cards.example/decks/index.json
```

`deck_url` must point to an index JSON file, not directly to a deck. Its `files` entries are resolved relative to the index file:

```json
{
  "files": [
    "data/my_deck.jsonc",
    "data/my_deck_fr.jsonc"
  ]
}
```

When the index is hosted on another origin, its server must allow cross-origin requests for both the index and its deck files. Opening a `deck_url` link saves that index as the browser's selected deck source; it can be changed or reset from the app settings. Share links include the selected `deck_url` when it differs from the built-in default.

## Add/Remove a language
Available language are automatically computed from the decks.  
You do however need to make sure each language has the needed metadata in `languageInfo.tsx`.

# Development Setup

The react project is found in the analog-brain-tool subdirectory.  

```bash
cd analog-brain-tool
npm install
npm run dev
```

## End-to-end tests

The Playwright suite builds the production app, starts a local preview server, and runs the tests in Chromium. Install the browser once on each development or CI machine:

```bash
cd analog-brain-tool
npx playwright install chromium
```

Run the suite with:

```bash
npm run test:e2e
```

The HTML report is written to `analog-brain-tool/playwright-report`.

# Deploy in GitHub pages

1 - Make sure the base is correct in vite.config.js  
2 - Run:
```bash
cd analog-brain-tool
npm run deploy
```

(You might need to run it in a terminal that allows prompting for ssh key password, such as git bash.)
