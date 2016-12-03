var assert = require('assert');
var AlexaSpeech = require('../alexa-speech');

describe('AlexaSpeech#add', function() {

    it('should be empty', function() {
        var speech = new AlexaSpeech.Speech();

        assert.equal('<speak></speak>', speech.render());
    });

    it('should have single phrase', function() {
        var speech = new AlexaSpeech.Speech();

        speech.add('first phrase');

        assert.equal('<speak>first phrase</speak>', speech.render());
    });

    it('should have multiple phrases', function() {
        var speech = new AlexaSpeech.Speech();

        speech.add('first phrase ').add('second phrase');

        assert.equal('<speak>first phrase second phrase</speak>', speech.render());
    });

    it('should also work as "say"', function() {
        var speech = new AlexaSpeech.Speech();

        speech.say('first phrase');

        assert.equal('<speak>first phrase</speak>', speech.render());
    });

});

describe('AlexaSpeech#pause', function() {
    it('should have 10 second pause', function() {
        var speech = new AlexaSpeech.Speech();

        speech.pause(10);

        assert.equal('<speak><break time="10s"/></speak>', speech.render());
    });
});

describe('AlexaSpeech#spell', function() {
    it('should spell out', function() {
        var speech = new AlexaSpeech.Speech();

        speech.spell('elephant');

        assert.equal('<speak><say-as interpret-as="spell-out">elephant</say-as></speak>', speech.render());
    });
});

describe('AlexaSpeech#cardinal', function() {
    it('should say as cardinal', function() {
        var speech = new AlexaSpeech.Speech();

        speech.cardinal(12345);

        assert.equal('<speak><say-as interpret-as="cardinal">12345</say-as></speak>', speech.render());
    });

    it('should also work as "number"', function() {
        var speech = new AlexaSpeech.Speech();

        speech.number(12345);

        assert.equal('<speak><say-as interpret-as="cardinal">12345</say-as></speak>', speech.render());
    });

    it('should handle singular numbers', function() {
        var speech = new AlexaSpeech.Speech();

        speech.number(1,'ninja','ninjas');

        assert.equal('<speak><say-as interpret-as="cardinal">1</say-as> ninja</speak>', speech.render());
    });

    it('should handle plural numbers', function() {
        var speech = new AlexaSpeech.Speech();

        speech.number(2,'ninja','ninjas');

        assert.equal('<speak><say-as interpret-as="cardinal">2</say-as> ninjas</speak>', speech.render());
    });
});

describe('AlexaSpeech#ordinal', function() {
    it('should say as ordinal', function() {
        var speech = new AlexaSpeech.Speech();

        speech.ordinal(12345);

        assert.equal('<speak><say-as interpret-as="ordinal">12345</say-as></speak>', speech.render());
    });
});

describe('AlexaSpeech#digits', function() {
    it('should say as digits', function() {
        var speech = new AlexaSpeech.Speech();

        speech.digits(12345);

        assert.equal('<speak><say-as interpret-as="digits">12345</say-as></speak>', speech.render());
    });
});

describe('AlexaSpeech#approximateFactor', function() {
    it('should not approximate hundreds', function() {
        var speech = new AlexaSpeech.Speech();

        speech.approximateFactor(123);

        assert.equal('<speak><say-as interpret-as="ordinal">123</say-as></speak>', speech.render());
    });

    it('should approximate thousands', function() {
        var speech = new AlexaSpeech.Speech();

        speech.approximateFactor(12345);

        assert.equal('<speak><say-as interpret-as="ordinal">12.3</say-as> thousand</speak>', speech.render());
    });

    it('should approximate millions', function() {
        var speech = new AlexaSpeech.Speech();

        speech.approximateFactor(12345678);

        assert.equal('<speak><say-as interpret-as="ordinal">12.3</say-as> million</speak>', speech.render());
    });

    it('should approximate billions', function() {
        var speech = new AlexaSpeech.Speech();

        speech.approximateFactor(12345678901);

        assert.equal('<speak><say-as interpret-as="ordinal">12.3</say-as> billion</speak>', speech.render());
    });

    it('should approximate trillions', function() {
        var speech = new AlexaSpeech.Speech();

        speech.approximateFactor(12345678901234);

        assert.equal('<speak><say-as interpret-as="ordinal">12.3</say-as> trillion</speak>', speech.render());
    });
});

describe('AlexaSpeech#fraction', function() {
    it('should say as fraction', function() {
        var speech = new AlexaSpeech.Speech();

        speech.fraction('1/8');

        assert.equal('<speak><say-as interpret-as="fraction">1/8</say-as></speak>', speech.render());
    });
});

describe('AlexaSpeech#percent', function() {
    it('should say as percent without precision', function() {
        var speech = new AlexaSpeech.Speech();

        speech.percent(.6515);

        assert.equal('<speak><say-as interpret-as="ordinal">0.6515</say-as> percent</speak>', speech.render());
    });


    it('should say as percent with precision', function() {
        var speech = new AlexaSpeech.Speech();

        speech.percent(.6515, 3);

        assert.equal('<speak><say-as interpret-as="ordinal">0.651</say-as> percent</speak>', speech.render());
    });
});

describe('AlexaSpeech#telephone', function() {
    it('should say as telephone', function() {
        var speech = new AlexaSpeech.Speech();

        speech.telephone('8675309');

        assert.equal('<speak><say-as interpret-as="telephone">8675309</say-as></speak>', speech.render());
    });
});

describe('AlexaSpeech#address', function() {
    it('should say as address', function() {
        var speech = new AlexaSpeech.Speech();

        speech.address('1600 Pennsylvania Ave.');

        assert.equal('<speak><say-as interpret-as="address">1600 Pennsylvania Ave.</say-as></speak>', speech.render());
    });
});

describe('AlexaSpeech#date', function() {
    it('should say as date', function() {
        var speech = new AlexaSpeech.Speech();

        speech.date('20161103');

        assert.equal('<speak><say-as interpret-as="date">20161103</say-as></speak>', speech.render());
    });
});

describe('AlexaSpeech#time', function() {
    it('should say as time', function() {
        var speech = new AlexaSpeech.Speech();

        speech.time("1'15\"");

        assert.equal('<speak><say-as interpret-as="time">1\'15"</say-as></speak>', speech.render());
    });
});

describe('AlexaSpeech#price', function() {
    it('should say as price dollars only', function() {
        var speech = new AlexaSpeech.Speech();

        speech.price(156);

        assert.equal('<speak><say-as interpret-as="cardinal">156</say-as> dollars</speak>', speech.render());
    });

    it('should say as price dollars and cents', function() {
        var speech = new AlexaSpeech.Speech();

        speech.price(156.99);

        assert.equal('<speak><say-as interpret-as="cardinal">156</say-as> dollars and <say-as interpret-as="cardinal">99</say-as> cents</speak>', speech.render());
    });

    it('should work with a singular dollar ammount', function() {
        var speech = new AlexaSpeech.Speech();

        speech.price(1);

        assert.equal('<speak><say-as interpret-as="cardinal">1</say-as> dollar</speak>', speech.render());
    });

    it('should work with a custom singular dollar unit', function() {
        var speech = new AlexaSpeech.Speech();

        speech.price(1, 'pound');

        assert.equal('<speak><say-as interpret-as="cardinal">1</say-as> pound</speak>', speech.render());
    });


    it('should work with a custom plural dollar unit', function() {
        var speech = new AlexaSpeech.Speech();

        speech.price(2, null, 'pounds');

        assert.equal('<speak><say-as interpret-as="cardinal">2</say-as> pounds</speak>', speech.render());
    });

    it('should work with a singular cent amount', function() {
        var speech = new AlexaSpeech.Speech();

        speech.price(0.01);

        assert.equal('<speak><say-as interpret-as="cardinal">1</say-as> cent</speak>', speech.render());
    });

    it('should work with a custom singular cent amount', function() {
        var speech = new AlexaSpeech.Speech();

        speech.price(0.01, null, null, 'penny', null);

        assert.equal('<speak><say-as interpret-as="cardinal">1</say-as> penny</speak>', speech.render());
    });

    it('should work with a custom plural cent amount', function() {
        var speech = new AlexaSpeech.Speech();

        speech.price(0.02, null, null, null, 'pence');

        assert.equal('<speak><say-as interpret-as="cardinal">2</say-as> pence</speak>', speech.render());
    });
});
