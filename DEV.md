# Creating Card Set JSON Schema

Using npm package typescript-json-schema
My need to install it globally to have access to the command?

```bash
npx typescript-json-schema ./tsconfig.app.json IDeck --required --out .\public\decks\schema.json
```

Weird cache issue...

## Custom local cards

For now, I use a "custom" directory in the public directory. That custom is ignored by the git project. Nothing is loaded automatically there, you have to set the URL in settings. 
`http://localhost:4000/analog-brain/custom/index.json`
For me, this is a junction link to another dir on my computer. 
