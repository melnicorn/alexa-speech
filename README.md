# alexa-speech [![NPM version][npm-image]][npm-url] 
> Utilities to simplify generating Speech Synthesis Markup Language (SSML) for Amazon Alexa interface

## Installation

```sh
$ npm install --save alexa-speech
```

## Usage

```js
var AlexaSpeech = require('./alexa-speech');

var speech = new AlexaSpeech.Speech();

speech.add("Hello, my name is Jenny! ")
      .pause(1)
      .add("You can call me at ")
      .telephone(8675309);

var SSML = speech.render();
```
## License

MIT © [chris melnick](http://chrismelnick.com)

[npm-image]: https://badge.fury.io/js/alexa-speech.svg
[npm-url]: https://npmjs.org/package/alexa-speech