# alexa-speech [![NPM version][npm-image]][npm-url] 
> Utilities to simplify generating Speech Synthesis Markup Language (SSML) for Amazon Alexa interface

## Installation

```sh
$ npm install --save alexa-speech
```

## Usage

The *AlexaSpeech* utility contains multiple functions to make producing SSML more simple and intuitive. The base is a *Speech* object which contains mutliple functions. Each function returns the object itself to allow for a simple append syntax using function chains. When all of your output has been collected, the *render* function assembles the SSML and returns it to the caller.

```js
var AlexaSpeech = require('alexa-speech');

var speech = new AlexaSpeech.Speech();

speech.add("Hello, my name is Jenny! ")
      .pause(1)
      .add("You can call me at ")
      .telephone('8675309');

var SSML = speech.render();

// Output: <speak>Hello, my name is Jenny! <break time="1s"/>You can call me at <say-as interpret-as="telephone">8675309</say-as></speak>
```

## Supported SSML
The list of SSML tags and attributes this library supports is currently incomplete.
### Supported Tags
* speak
* break: *time* attribute supported
* say-as: *spell-out*, *cardinal*, *ordinal*, *digits*, *fraction*, *date* (format not yet supported), *time*, *telephone*, *address* attributes supported 

### Unsupported Tags
* audio
* p
* phoneme
* s
* w

## Commentary
This utility was grown from the desire to generate [SSML](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference) using functions rather than assembling XML within code. It was homegrown for my own use and is therefore limited in this early stage in several aspects, primarily in not guaranteeing safe XML. As you know, SSML is an XML syntax which your Alexa skill returns to be interpreted by a speech-enabled device. This library is simply a collection of convenience functions to produce SSML directly from the input which you give it. Therefore, if you pass data into one of these functions which will result in invalid XML (e.g., tag terminator, invalid characters, etc.), this utility will be more than happy to produce incomplete or invalid XML. There is also no type checking in regard to the type expected by Alexa. For example, this utility is more than happy to dump "Hello World" into a SSML tag that Alexa will try to interpret as a numeral.

With a little common sense applied, however, these functions should help make writing SSML outputs a little bit more intuitive to a JavaScript author.

Enjoy!

## License

MIT © [chris melnick](http://chrismelnick.com)

[npm-image]: https://badge.fury.io/js/alexa-speech.svg
[npm-url]: https://npmjs.org/package/alexa-speech