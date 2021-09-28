import { Effect, MediaStream, Player, MediaStreamCapture } from "../../webar/BanubaSDK.js"

class App {
    constructor(options) {
        this._player = null
        this._session = null

        this._banubaSDKOptions = options.banubaSDK
        this._effects = options.effects

        const { openTok } = options

        this._API_KEY = openTok.apiKey
        this._SESSION_ID = openTok.sessionID
        this._TOKEN = openTok.token
    }

    async init() {
        this._player = await Player.create(this._banubaSDKOptions)
        this._session = OT.initSession(this._API_KEY, this._SESSION_ID)
        this._session.connect(this._TOKEN, this._publishLocalStream)

        await this._createEffectControlButtons()

        this._subscribeToRemoteStreams()
    }

    _publishLocalStream = async () => {
        const publisher = await this._initPublisher()

        try {
            this._session.publish(publisher, this._handleError)
        } catch(error) {
            this._handleError(error)
        }
    }

    async _initPublisher() {
        const arVideo = await this._getARVideo()

        return await OT.initPublisher('publisher', {
            insertMode: 'append',
            videoSource: arVideo,
            width: '100%',
            height: '100%',
        }, this._handleError)
    }

    async _getARVideo() {
        const stream = await OT.getUserMedia()

        this._player.use(new MediaStream(stream), { horizontalFlip: true })
        this._player.play()

        return new MediaStreamCapture(this._player).getVideoTracks()[0]
    }

    async _createEffectControlButtons() {
        for (const effectName of this._effects) {
            const effectButton = document.createElement("button")
            effectButton.innerHTML = effectName
            document.querySelector(".effects").append(effectButton)

            const effect = await Effect.preload(`../webar/effects/${effectName}.zip`)

            effectButton.addEventListener('click', () => this._player.applyEffect(effect))
        }

        const clearEffectButton = document.querySelector("#clear")

        clearEffectButton.addEventListener('click', () => this._player.clearEffect())
    }

    _subscribeToRemoteStreams() {
        this._session.on('streamCreated', event => {
            this._session.subscribe(event.stream, 'subscriber', {
                insertMode: 'append',
                width: '100%',
                height: '100%'
            }, this._handleError)
        })
    }

    _handleError(error) {
        if (error)
            console.error(error)
    }
}

export default App