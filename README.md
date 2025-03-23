# Introduction

This tool is designed to overcome your executive dysfunction by asking you questions and leading you to a helpful answer.  
Reimagination of the "The ADHD Analog Brain", from https://adhdanalogbrain.blogspot.com/, as a single page application running in the browser.  
Implemented in React Typescript with Tailwind.  

# Design Philosophy
- Accessibility First: Accessibility is a core priority, ensuring the app is usable and inclusive for everyone, regardless of ability or device.
- Content-Friendly: I’ve designed this app with extensibility in mind, making it easy to add or update content without compromising functionality.


# How to
## Managing Card Sets
The default sets are located in `public/sets` directory. This app also supports loading different sets from somewhere else, this can be configured in the UI.  

## Add/Remove a language
Available language are automatically computed from the card sets.  
You do however need to make sure each language has the needed metadata in `languageInfo.tsx`.

# Development Setup

```bash
cd analog-brain-tool
npm install
npm run dev
```

# Deploy in GitHub pages

Make sure the base is correct in vite.config.js  
```bash
cd analog-brain-tool
npm run deploy
```

Might need to run it in a terminal that allows prompting for ssh key password, such as git bash.
