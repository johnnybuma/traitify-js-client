// Generated by CoffeeScript 1.7.1
window.Traitify.ui.slideDeck = function(assessmentId, selector, options) {
  var Builder, selectedObject;
  Builder = Object();
  Builder.nodes = Object();
  Builder.states = Object();
  Builder.states.animating = false;
  Builder.data = Object();
  Builder.data.slideResponses = Object();
  if (selector.indexOf("#") !== -1) {
    selector = selector.replace("#", "");
    Builder.nodes.main = document.getElementById(selector);
  } else {
    selector = selector.replace(".", "");
    selectedObject = document.getElementsByClassName(selector);
    Builder.nodes.main = selectedObject ? selectedObject[0] : null;
  }
  if (!Builder.nodes.main) {
    console.log("YOU MUST HAVE A TAG WITH A SELECTOR FOR THIS TO WORK");
    return false;
  }
  Builder.classes = function() {
    var classes, key;
    classes = Builder.main.className.split(" ");
    for (key in classes) {
      classes[key] = "." + classes[key];
    }
    return classes.join("");
  };
  Builder.data.slidesLeft = function() {
    return Builder.data.slides.length - Builder.data.currentSlide;
  };
  Builder.addSlide = function(id, value) {
    return Traitify.addSlide(assessmentId, id, value, 1000, function() {
      Builder.data.sentSlides += 1;
      if (Builder.data.sentSlides === Builder.data.slidesToPlayLength) {
        console.log("tried the prop ui");
        Builder.nodes.main.innerHTML = "";
        return Traitify.ui.resultsProp(assessmentId, selector, options);
      }
    });
  };
  Builder.partials = Object();
  Builder.partials.make = function(elementType, attributes) {
    var attributeName, element;
    element = document.createElement(elementType);
    for (attributeName in attributes) {
      element.setAttribute(attributeName, attributes[attributeName]);
    }
    return element;
  };
  Builder.partials.div = function(attributes) {
    return this.make("div", attributes);
  };
  Builder.partials.img = function(attributes) {
    return this.make("img", attributes);
  };
  Builder.partials.i = function(attributes) {
    return this.make("i", attributes);
  };
  Builder.data.getProgressBarNumbers = function(initialize) {
    var currentLength, currentPosition, slideLength, value;
    slideLength = Builder.data.totalSlideLength;
    currentLength = Builder.data.slides.length;
    currentPosition = Builder.data.sentSlides;
    if (initialize !== "initializing") {
      currentPosition += 1;
    }
    value = slideLength - currentLength + currentPosition;
    return (value / Builder.data.totalSlideLength) * 100;
  };
  Builder.partials.slideDeckContainer = function() {
    var slidesContainer, slidesLeft;
    slidesContainer = this.div({
      "class": "tf-slide-deck-container"
    });
    slidesLeft = Builder.data.getProgressBarNumbers("initializing");
    slidesContainer.appendChild(Builder.partials.progressBar(slidesLeft));
    slidesContainer.appendChild(this.slides(Builder.data.slides));
    slidesContainer.appendChild(this.meNotMe());
    return slidesContainer;
  };
  Builder.partials.meNotMe = function() {
    var meNotMeContainer;
    meNotMeContainer = this.div({
      "class": "me-not-me-container"
    });
    Builder.nodes.me = this.div({
      "class": "me"
    });
    Builder.nodes.notMe = this.div({
      "class": "not-me"
    });
    Builder.nodes.notMe.innerHTML = "Not Me";
    Builder.nodes.me.innerHTML = "Me";
    meNotMeContainer.appendChild(Builder.nodes.me);
    meNotMeContainer.appendChild(Builder.nodes.notMe);
    Builder.nodes.meNotMeContainer = meNotMeContainer;
    return meNotMeContainer;
  };
  Builder.partials.slides = function(slidesData) {
    var placeHolderSlide, slides;
    slides = this.div({
      "class": "slides"
    });
    placeHolderSlide = Builder.partials.slide(slidesData[0]);
    placeHolderSlide.className += " placeholder";
    slides.appendChild(placeHolderSlide);
    Builder.nodes.slide = Array();
    Builder.nodes.currentSlide = Builder.partials.slide(slidesData[0]);
    Builder.nodes.currentSlide.className += " active";
    slides.appendChild(Builder.nodes.currentSlide);
    if (slidesData[1]) {
      Builder.nodes.nextSlide = Builder.partials.slide(slidesData[1]);
      slides.appendChild(Builder.nodes.nextSlide);
    } else {
      Builder.nodes.nextSlide = false;
    }
    Builder.nodes.slides = slides;
    return slides;
  };
  Builder.partials.slide = function(slideData) {
    var slide, slideCaption, slideImg;
    slideImg = this.img({
      src: slideData.image_desktop
    });
    slide = this.div({
      "class": "slide"
    });
    slideCaption = this.div({
      "class": "caption"
    });
    slideCaption.innerHTML = slideData.caption;
    slide.appendChild(slideCaption);
    slide.appendChild(slideImg);
    return slide;
  };
  Builder.partials.progressBar = function(percentFinished) {
    var progressBar, progressBarInner;
    progressBar = this.div({
      "class": "progress-bar"
    });
    progressBarInner = this.div({
      "class": "progress-bar-inner"
    });
    progressBarInner.style.width = percentFinished + "%";
    progressBar.appendChild(progressBarInner);
    Builder.nodes.progressBar = progressBar;
    Builder.nodes.progressBarInner = progressBarInner;
    return progressBar;
  };
  Builder.partials.loadingAnimation = function() {
    var leftDot, loadingContainer, loadingSymbol, rightDot;
    loadingContainer = this.div({
      "class": "loading"
    });
    leftDot = this.i(Object());
    rightDot = this.i(Object());
    loadingSymbol = this.div({
      "class": "symbol"
    });
    loadingSymbol.appendChild(leftDot);
    loadingSymbol.appendChild(rightDot);
    loadingContainer.appendChild(loadingSymbol);
    return loadingContainer;
  };
  Builder.actions = function() {
    Builder.nodes.me.onclick = function() {
      var currentSlide;
      if (!Builder.states.animating && !Builder.data.slidesLeft() !== 1) {
        if (!Builder.data.slides[Builder.data.currentSlide]) {
          Builder.events.loadingAnimation();
        }
        Builder.events.advanceSlide();
        currentSlide = Builder.data.slides[Builder.data.currentSlide - 1];
        Builder.addSlide(currentSlide.id, true);
        return Builder.data.currentSlide += 1;
      }
    };
    return Builder.nodes.notMe.onclick = function() {
      var currentSlide;
      if (!Builder.states.animating && Builder.nodes.nextSlide) {
        if (!Builder.data.slides[Builder.data.currentSlide]) {
          Builder.events.loadingAnimation();
        }
        Builder.events.advanceSlide();
        currentSlide = Builder.data.slides[Builder.data.currentSlide - 1];
        Builder.addSlide(currentSlide.id, false);
        return Builder.data.currentSlide += 1;
      }
    };
  };
  Builder.events = Object();
  Builder.events.advanceSlide = function() {
    var nextSlideData;
    Builder.nodes.progressBarInner.style.width = Builder.data.getProgressBarNumbers() + "%";
    Builder.states.animating = true;
    if (Builder.nodes.playedSlide) {
      Builder.nodes.slides.removeChild(Builder.nodes.playedSlide);
    }
    Builder.nodes.playedSlide = Builder.nodes.currentSlide;
    Builder.nodes.playedSlide.addEventListener('webkitTransitionEnd', function(event) {
      if (Builder.events.advancedSlide) {
        Builder.events.advancedSlide();
      }
      return Builder.states.animating = false;
    }, false);
    Builder.nodes.currentSlide = Builder.nodes.nextSlide;
    Builder.nodes.playedSlide.className += " played";
    Builder.nodes.currentSlide.className += " active";
    nextSlideData = Builder.data.slides[Builder.data.currentSlide + 1];
    if (nextSlideData) {
      Builder.nodes.nextSlide = Builder.partials.slide(nextSlideData);
      return Builder.nodes.slides.appendChild(Builder.nodes.nextSlide);
    }
  };
  Builder.events.loadingAnimation = function() {
    Builder.nodes.meNotMeContainer.className += " hide";
    Builder.nodes.slides.removeChild(Builder.nodes.currentSlide);
    return Builder.nodes.slides.insertBefore(Builder.partials.loadingAnimation(), Builder.nodes.slides.firstChild);
  };
  Builder.initialize = function() {
    var head, widget;
    widget = Builder.partials.make("script", {
      src: "https://s3.amazonaws.com/traitify-cdn/js/widgets/results/prop/2.0.0.js",
      type: "text/javascript"
    });
    head = document.getElementsByTagName("head")[0];
    head.appendChild(widget);
    return Traitify.getSlides(assessmentId, function(data) {
      var style;
      Builder.data.currentSlide = 1;
      Builder.data.totalSlideLength = data.length;
      Builder.data.sentSlides = 0;
      Builder.data.slides = data.filter(function(slide) {
        return !slide.completed_at;
      });
      Builder.data.slidesToPlayLength = Builder.data.slides.length;
      style = Builder.partials.make("link", {
        href: "https://s3.amazonaws.com/traitify-cdn/assets/stylesheets/slide_deck.css",
        type: 'text/css',
        rel: "stylesheet"
      });
      Builder.nodes.main.innerHTML = "";
      Builder.nodes.main.appendChild(style);
      if (Builder.data.slides.length !== 0) {
        Builder.nodes.main.appendChild(Builder.partials.slideDeckContainer());
        return Builder.actions();
      } else {
        return Builder.results = Traitify.ui.resultsProp(assessmentId, selector, options);
      }
    });
  };
  Builder.initialize();
  return Builder;
};
