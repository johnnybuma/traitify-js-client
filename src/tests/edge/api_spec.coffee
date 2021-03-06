QUnit.multiStart = (number)->
  QUnit.stackExecutedNumber ?= 0
  QUnit.stackExecutedNumber += 1
  if number == QUnit.stackExecutedNumber
    QUnit.start()

QUnit.module( "Testing API", {setup: ->
  @Traitify = new ApiClient()
  @Traitify.setVersion("v1")
  @Traitify.setHost("api-sandbox.traitify.com")
  @Traitify.setPublicKey("gglvv58easpesg9ajbltavb3gr")
  @Traitify.XHR = MockRequest
  @Traitify.online = ->
    true
})


QUnit.test( "API Client Set Host", (assert)->
  @Traitify.setHost("hi")
  assert.equal( @Traitify.host, "https://hi", "Setting Host Succeeds!" )

  @Traitify.setHost("https://new_hi")
  assert.equal( @Traitify.host, "https://new_hi", "Setting Host with https Succeeds!" )

  @Traitify.setHost("http://new_hi_with_https")
  assert.equal( "http://new_hi_with_https", "http://new_hi_with_https", "Setting Host with http is changed for https Succeeds!" )
)

QUnit.test( "API Client Set Version", (assert)->
  @Traitify.setVersion("v2")
  assert.equal( @Traitify.version, "v2", "Setting Version" )
)


QUnit.test( "API Client Set Public Key", (assert)->
  @Traitify.setPublicKey("here-is-the-key")
  assert.equal( @Traitify.publicKey, "here-is-the-key", "Setting public key Succeeds!" )
)

QUnit.asyncTest("API Client Get Slides", (assert)->
  @Traitify.getSlides(unPlayedAssessment).then((slides)->
    assert.equal( slides.length, 84, "Returns 84 slides" )
    assert.equal( slides[0].caption, "Navigating", "Checking that The Caption of The First Slide Succeeds!" )
    QUnit.start()
  )
)

QUnit.asyncTest("API Client Get Decks", (assert)->
  @Traitify.getDecks((decks)->
    assert.equal( decks[0].name, "Career Deck", "Checking that The First Deck Succeeds!" )
    QUnit.start()
  )
)

QUnit.asyncTest("API Client Add Slide", (assert)->
  @Traitify.addSlide(unPlayedAssessment, 0, true, 1000, (response)->
    assert.equal( response, "", "Checking that The First Deck Succeeds!" )
    QUnit.start()
  )
)

QUnit.asyncTest("API Client Add Slides", (assert)->
  @Traitify.addSlides(unPlayedAssessment, [{id:0, response:true, response_time:1000}], (response)->
    assert.equal( response, "", "Checking that The First Deck Succeeds!" )
    QUnit.start()
  )
)

QUnit.asyncTest("API Client Add Slides", (assert)->
  slides = @Traitify.addSlides(unPlayedAssessment, [{id:0, response:true, response_time:1000}])
  slides.then((response)->
    assert.equal(response, "", "Checking that The First Deck Succeeds!" )
    QUnit.start()
  )
)

QUnit.asyncTest("Get Personality Types", (assert)->
  personalityTypes = @Traitify.getPersonalityTypes(playedAssessment)
  personalityTypes.then((response)->
    assert.equal(JSON.stringify(response), JSON.stringify(apiFactory.build("personality")), "Checking that The First Deck Succeeds!" )
    QUnit.start()
  )
)

QUnit.asyncTest("Test Ajax XDomainRequest", (assert)->
  ieTraitify = new ApiClient()
  ieTraitify.XHR = MockIEXMLRequest
  window.XDomainRequest = MockRequest
  ieTraitify.setVersion("v1")
  ieTraitify.setHost("api-sandbox.traitify.com")
  ieTraitify.setPublicKey("gglvv58easpesg9ajbltavb3gr")
  ieTraitify.online = ->
    true

  personalityTypes = ieTraitify.getPersonalityTypes(playedAssessment)
  personalityTypes.then((response)->
    assert.equal(JSON.stringify(response), JSON.stringify(apiFactory.build("personality")), "Checking that The First Deck Succeedss!" )
    QUnit.start()
  )
)

QUnit.asyncTest("Test NO CORS SUPPORT", (assert)->
  ieTraitify = new ApiClient()
  ieTraitify.XHR = MockIEXMLRequest
  delete window["XDomainRequest"]
  ieTraitify.setVersion("v1")
  ieTraitify.setHost("api-sandbox.traitify.com")
  ieTraitify.setPublicKey("gglvv58easpesg9ajbltavb3gr")
  personalityTypes = ieTraitify.getPersonalityTypes(playedAssessment)
  personalityTypes.catch((response)->
    assert.equal(response, "CORS is Not Supported By This Browser", "Checking that The First Deck Succeedss!" )
    QUnit.start()
  )
)

QUnit.asyncTest("Test Errors", (assert)->
  errorTraitify = new ApiClient()
  errorTraitify.XHR = MockRequestWithError
  errorTraitify.setVersion("v1")
  errorTraitify.setHost("api.traitify.com")
  errorTraitify.setPublicKey("gglvv58easpesg9ajbltavb3gr")
  errorTraitify.online = ->
    true
  personalityTypes = errorTraitify.getPersonalityTypes(playedAssessment)
  personalityTypes.catch((response)->
    assert.equal(response, "Mock Request Error", "Checking that The First Deck Succeedss!" )
    QUnit.start()
  )
)

QUnit.asyncTest("Test Get Personality Traits", (assert)->
  personalityTypes = @Traitify.getPersonalityTraits(playedAssessment)
  personalityTypes.then((response)->
    assert.ok(response[0].personality_trait.definition, "Checking that The First Deck Succeedss!" )
    QUnit.start()
  )
)

QUnit.asyncTest("Test Get Careers", (assert)->
  careers = @Traitify.getCareers(playedAssessment)
  careers.then((response)->
    assert.ok(response[0].career.title, "Computer-Controlled Machine Tool Operators, Metal and Plastic" )
    QUnit.start()
  )
)
