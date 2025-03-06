# Introduction

Reimagination of the "The ADHD Analog Brain", from https://adhdanalogbrain.blogspot.com/  Implemented in React Typescript with Tailwind.  
I did my best to make it easy to modify.  

# Design Philosophy
- Accessibility First: Accessibility is a core priority, ensuring the app is usable and inclusive for everyone, regardless of ability or device.
- Content-Friendly: I’ve designed this app with extensibility in mind, making it easy to add or update content without compromising functionality.

# How to
## Managing Card Sets
Just add or modify files in src/cardSets/content

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

```bash
cd analog-brain-tool
npm run deploy
```

Might need to run it in a terminal that allows prompting for ssh key password, such as git bash.
