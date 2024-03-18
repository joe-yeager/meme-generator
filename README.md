# meme-generator

## Requirements

There are a few things that must be set up before you can make use of this meme-generator

- You must have an imgflip username and password
- You must have a meme custom object in the portal you would like to test with. See `memes-custom-object.json` in the root of this project. This can be used using `hs custom-object schema create memes-custom-object.json`
- You must add the secrets that are defined in src/app/app.functions/sample.env to the portal you wish to deploy the generator to.
