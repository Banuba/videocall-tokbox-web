# Banuba Web AR SDK and Opentok (Vonage Video) Web SDK integration example

## Requirements

- Banuba [client token](#obtaining-banuba-client-token)
- OpenTok apiKey, sessionId and token
- [Nodejs](https://nodejs.org/en/) installed
- Browser with support of [WebGL 2.0](https://caniuse.com/#feat=webgl2)

### Obtaining Banuba SDK Web AR

The example uses CDN version of the [@banuba/webar](https://www.npmjs.com/package/@banuba/webar) npm package for simplicity.
Please use the npm package mentioned above for real world projects.
Check out the [Integration tutorials](https://docs.banuba.com/face-ar-sdk-v1/web/web_tutorials_integrations) for more ways of consuming [@banuba/webar](https://www.npmjs.com/package/@banuba/webar) package.

### Obtaining Banuba Client token

Banuba Client token is required to get Banuba SDK Web AR working.

Generally it's delivered with Banuba SDK Web AR archive.

To receive a new **trial** client token please fill in the [form on banuba.com](https://www.banuba.com/face-filters-sdk) website, or contact us via [info@banuba.com](mailto:info@banuba.com).

## Environment setup and local run

Insert Banuba [client token](#obtaining-banuba-client-token) into `config.js` file

```js
...
banubaSDK: {
    clientToken: "PUT YOUR CLIENT TOKEN HERE",
    ...
},
```

Insert OpenTok apiKey, sessionId and token into `config.js`

```js
...
openTok: {
    apiKey: "",
    sessionID: "",
    token: ""
},
```

### Test by yourself

Run the live server in the cloned folder

```sh
npx live-server
```

Open [localhost:8080](http://localhost:8080) in two different browser windows.

### Testing with mate

Set up the project on mate's PC.

Run the live server in the cloned folders on both PCs.

```sh
npx live-server
```

Open [localhost:8080](http://localhost:8080) on both PCs.

## Adding a new effect

Zip the effect folder and put it under the `effects/` subfolder

```diff
videocall-tokbox-web/
    src
    effects/
        BackgroundPicture.zip
+       NewEffect.zip
    config.js
    index.html
    index.js
    README.md
```

Add the effect name into `effects` array at `config.js`

```diff
...
effects: [
    "BackgroundPicture",
+   "NewEffect",
]
```
