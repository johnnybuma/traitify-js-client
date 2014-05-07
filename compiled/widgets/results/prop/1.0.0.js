// Generated by CoffeeScript 1.7.1
window.Traitify.ui.resultsProp = function(assessmentId, selector, options) {
  var Actions, div, fetch, forEach, image, link, media, partial, partials, prop, render, style, styles, styling, tag;
  partials = Array();
  prop = Object();
  selector = (selector ? selector : this.selector);
  if (selector.indexOf("#") !== -1) {
    prop.element = document.getElementById(selector.replace("#", ""));
  } else {
    prop.element = document.getElementsByClassName(selector.replace(".", ""))[0];
  }
  prop.retina = window.devicePixelRatio > 1;
  prop.data = function(attr) {
    return prop.element.getAttribute("data-" + attr);
  };
  prop.html = function(setter) {
    if (setter) {
      prop.element.innerHTML = setter;
    }
    return prop.element.innerHTML;
  };
  prop.classes = function() {
    var classes, key;
    classes = prop.element.className.split(" ");
    for (key in classes) {
      if (classes[key]) {
        classes[key] = "." + classes[key];
      } else {
        delete classes[key];
      }
    }
    return classes.join("");
  };
  prop.createCORSRequest = function(method, url) {
    var xhr;
    xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest !== "undefined") {
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      alert("Whoops, there was an error making the request.");
      xhr = null;
    }
    return xhr;
  };
  prop.ajax = function(url, method, callback, params) {
    var xhr;
    xhr = this.createCORSRequest(method, url);
    xhr.open(method, url, true);
    xhr.setRequestHeader("Authorization", "Basic " + btoa(Traitify.publicKey + ":x"));
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function() {
      var data;
      data = JSON.parse(xhr.response);
      callback(data);
    };
    xhr.send(params);
    return xhr;
  };
  prop.put = function(url, params, callback) {
    return prop.ajax(url, "PUT", callback, params);
  };
  prop.get = function(url, callback) {
    return prop.ajax(url, "GET", callback, "");
  };
  tag = function(type, attributes, content) {
    var key, preparedAttributes, value;
    preparedAttributes = Array();
    for (key in attributes) {
      value = attributes[key];
      preparedAttributes.push(key + "=\"" + value + "\"");
    }
    attributes = attributes || Array();
    if (content === false) {
      return "<" + type + " " + preparedAttributes.join(" ") + " />";
    } else {
      return "<" + type + " " + preparedAttributes.join(" ") + ">\n" + content + "\n</" + type + ">";
    }
  };
  div = function(attributes, content) {
    return tag("div", attributes, content);
  };
  image = function(src, attributes) {
    attributes["src"] = src;
    return tag("img", attributes, false);
  };
  link = function(href, attributes, content) {
    attributes["href"] = href;
    return tag("a", attributes, content);
  };
  style = function(content) {
    return tag("style", {}, content);
  };
  styling = function(selector, content) {
    var formattedContent, key;
    formattedContent = Array();
    for (key in content) {
      formattedContent.push(key + ":" + content[key] + ";");
    }
    return prop.classes() + " " + selector + "{\n" + formattedContent.join("\n") + "}";
  };
  media = function(arg, content) {
    var i;
    for (i in arg) {
      arg = i + ":" + arg[i];
    }
    return "@media screen and (" + arg + ")";
  };
  fetch = function(className) {
    return prop.element.getElementsByClassName(className);
  };
  forEach = function(iterator, callBack) {
    var key, _results;
    _results = [];
    for (key in itorator) {
      _results.push(callBack(itorator[key]));
    }
    return _results;
  };

  /*
  Styles
   */
  styles = function() {
    return style([
      styling(".badge", {
        "width": "4em",
        "height": "4em",
        "display": "inline-block",
        "vertical-align": "middle",
        "background-color": "transparent",
        "margin": "-.1em -.5em 0em 0em",
        "padding": "0px",
        "border-radius": "50%",
        "border": ".2em solid #fff",
        "background-size": "4em 4em",
        "display": "inline-block",
        "position": "relative",
        "z-index": "1",
        "vertical-align": "middle",
        "margin": "-1.4em -.8em 0em -.8em",
        "background-position": "center",
        "font-size": "1em"
      }), styling(".positive-bar", {
        "height": "1em",
        "width": "12em",
        "display": "inline-block",
        "background-color": "#e0e0e0",
        "border-radius": "0em .3em .3em 0em",
        "box-shadow": ".1em .1em .2em .01em #ccc inset",
        "overflow": "hidden"
      }), styling(".negative-bar", {
        "height": "1em",
        "width": "12em",
        "display": "inline-block",
        "background-color": "#e0e0e0",
        "border-radius": ".3em 0em 0em .3em",
        "box-shadow": ".1em .1em .2em .01em #ccc inset",
        "overflow": "hidden"
      }), styling(".personality", {
        "padding": ".3em 0em",
        "display": "inline-block"
      }), styling(".prop-results", {
        "width": "29.5em",
        "padding": "1em",
        "margin": "0px auto",
        "display": "inline-block",
        "background-color": "#fff",
        "border-radius": ".5em",
        "font-family": '"Helvetica Neue", Helvetica,Arial, sans-serif'
      }), styling("", {
        "text-align": "center"
      }), styling(".negative-bar .inner", {
        "height": "1em",
        "background-color": "#e54435"
      }), styling(".positive-bar .inner", {
        "height": "1em",
        "background-color": "#0f9bd8"
      }), styling(".labels", {
        "clear": "both"
      }), styling(".not-me-label", {
        "float": "left",
        "margin-left": ".9em"
      }), styling(".me-label", {
        "float": "right",
        "margin-right": ".9em"
      }), styling(".score", {
        "float": "right",
        "margin-top": "-.1em",
        "margin-bottom": "-.5em"
      }), styling(".score.me", {
        "color": "#0f9bd8"
      }), styling(".score.not-me", {
        "color": "#e54435"
      }), styling(".name", {
        "float": "left",
        "margin-top": "-.1em",
        "margin-bottom": "-.5em"
      }), styling(".personality-traits .name", {
        "margin-left": "3em",
        "margin-top": ".5em",
        "margin-bottom": "0em",
        "line-height": "1em"
      }), styling(".personality-traits .score", {
        "margin-right": "3em",
        "margin-top": ".5em",
        "margin-bottom": "0em",
        "line-height": "1em"
      }), styling(".personality-traits .name-and-score", {
        "display": "block"
      }), styling(".personality-traits .bars", {
        "display": "inline-block",
        "position": "relative",
        "top": "-.4em",
        "line-height": ".3em"
      }), styling(".personality-traits .negative-bar", {
        "width": "10em",
        "height": ".3em",
        "line-height": ".3em"
      }), styling(".clear", {
        "clear": "both"
      }), styling(".personality-traits .positive-bar", {
        "width": "10em",
        "height": ".3em",
        "line-height": ".3em"
      }), styling(".personality-traits .positive-bar .inner", {
        "height": ".3em"
      }), styling(".personality-traits .negative-bar .inner", {
        "height": ".3em"
      }), styling(".personality-traits", {
        "overflow": "hidden"
      })
    ].join(""));
  };
  partials = Array();
  partial = function(name, data) {
    return partials[name](data);
  };
  partials["bar"] = function(data) {
    var color, score;
    color = data.score < 0 ? "not-me" : "me";
    score = data.score < 0 ? "(" + (Math.round(data.negativeScore)) + ")" : Math.round(data.positiveScore);
    return [
      div({
        "class": "name"
      }, data.personality_type.name), div({
        "class": "score " + color
      }, score), div({
        style: "clear:both"
      }, ""), div({
        "class": "negative-bar"
      }, div({
        style: "float:right; width:" + data.negativeScore + "%",
        "class": "inner"
      }, "")), div({
        style: "background-image:url('" + data.personality_type.badge.image_medium + "');",
        "class": "badge"
      }, ""), div({
        "class": "positive-bar"
      }, div({
        style: "float:left; width:" + data.positiveScore + "%",
        "class": "inner"
      }, ""))
    ].join("");
  };
  partials["trait-bar"] = function(data) {
    var color, name, negativeScore, positiveScore, score, scoreData;
    color = data.score < 0 ? "not-me" : "me";
    scoreData = data.score < 0 ? "(" + (Math.round(data.negativeScore)) + ")" : Math.round(data.positiveScore);
    negativeScore = div({
      "class": "negative-bar"
    }, div({
      style: "float:right; width:" + data.negativeScore + "%",
      "class": "inner"
    }, ""));
    positiveScore = div({
      "class": "positive-bar"
    }, div({
      style: "float:left; width:" + data.positiveScore + "%",
      "class": "inner"
    }, ""));
    name = div({
      "class": "name"
    }, data.personality_trait.name);
    score = div({
      "class": "score " + color
    }, scoreData);
    return [
      div({
        "class": "name-and-score"
      }, name + score + div({
        "class": "clear"
      }, "")), div({
        "class": "bars"
      }, negativeScore + positiveScore + div({
        "class": "clear"
      }, ""))
    ].join("");
  };
  partials["chart"] = function(data) {
    var badge, key, personality_types;
    personality_types = data.personality_types;
    for (key in personality_types) {
      if (personality_types[key].score > 0) {
        personality_types[key].positiveScore = personality_types[key].score;
        personality_types[key].negativeScore = 0;
      } else {
        personality_types[key].negativeScore = Math.abs(personality_types[key].score);
        personality_types[key].positiveScore = 0;
      }
    }
    for (key in personality_types) {
      badge = personality_types[key].personality_type.badge;
      personality_types[key] = div({
        "class": "personality",
        "data-id": personality_types[key].personality_type.id
      }, [partial("bar", personality_types[key])].join(""));
    }
    return personality_types.join("");
  };
  render = function(data) {
    return prop.html(div({
      "class": "prop-results"
    }, [partial("chart", data), styles()].join("")));
  };
  prop.fetchPersonalityTraitResults = function(id) {
    return this.PersonalityResultsTraits(id);
  };
  Actions = function() {
    var animatePersonalityTraitsDiv, personalityTraitsDiv, personalityType, personalityTypes, _i, _len, _results;
    if (options && options["showTraits"] === true) {
      personalityTypes = fetch("personality");
      animatePersonalityTraitsDiv = function(personalityTraitsDiv) {
        var animateTraitsDiv, height, hidden, scrollHeight;
        hidden = personalityTraitsDiv.style.height === "0px" ? true : false;
        height = 0;
        scrollHeight = personalityTraitsDiv.scrollHeight;
        if (hidden) {
          return animateTraitsDiv = setInterval(function() {
            if (height < scrollHeight) {
              height += 100;
              return personalityTraitsDiv.style.height = height + "px";
            } else {
              clearInterval(animateTraitsDiv);
              return personalityTraitsDiv.style.height = "";
            }
          }, 10);
        } else {
          height = scrollHeight;
          return animateTraitsDiv = setInterval(function() {
            if (height > 0) {
              height -= 100;
              return personalityTraitsDiv.style.height = height + "px";
            } else {
              personalityTraitsDiv.style.height = "0px";
              return clearInterval(animateTraitsDiv);
            }
          }, 10);
        }
      };
      _results = [];
      for (_i = 0, _len = personalityTypes.length; _i < _len; _i++) {
        personalityType = personalityTypes[_i];
        personalityTraitsDiv = Object();
        _results.push(personalityType.onclick = function() {
          var localPersonalityType;
          localPersonalityType = this;
          prop.PersonalityResultsTraits(this.getAttribute("data-id"), function(data) {
            var element, elements, personalityTrait, _j, _k, _len1, _len2, _results1;
            personalityTraitsDiv = String();
            for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
              personalityTrait = data[_j];
              personalityTraitsDiv += partial("trait-bar", personalityTrait);
            }
            localPersonalityType.innerHTML += div({
              "class": "personality-traits"
            }, personalityTraitsDiv);
            personalityTraitsDiv = localPersonalityType.getElementsByClassName("personality-traits")[0];
            personalityTraitsDiv.style.height = "0px";
            animatePersonalityTraitsDiv(personalityTraitsDiv);
            elements = prop.element.getElementsByClassName("personality-traits");
            _results1 = [];
            for (_k = 0, _len2 = elements.length; _k < _len2; _k++) {
              element = elements[_k];
              if (element !== personalityTraitsDiv && element.style.height !== "0px") {
                _results1.push(animatePersonalityTraitsDiv(element));
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          });
          return this.onclick = function() {
            var element, elements, _j, _len1;
            elements = prop.element.getElementsByClassName("personality-traits");
            for (_j = 0, _len1 = elements.length; _j < _len1; _j++) {
              element = elements[_j];
              if (element !== this.getElementsByClassName("personality-traits")[0] && element.style.height !== "0px") {
                animatePersonalityTraitsDiv(element);
              }
            }
            return animatePersonalityTraitsDiv(this.getElementsByClassName("personality-traits")[0]);
          };
        });
      }
      return _results;
    }
  };
  prop.PersonalityResultsTraits = function(personalityTraitId, callBack) {
    return Traitify.getPersonalityTypesTraits(assessmentId, personalityTraitId, function(personalityTraits) {
      var personalityTrait, _i, _len;
      for (_i = 0, _len = personalityTraits.length; _i < _len; _i++) {
        personalityTrait = personalityTraits[_i];
        if (personalityTrait.score < 0) {
          personalityTrait.negativeScore = Math.abs(personalityTrait.score);
          personalityTrait.positiveScore = 0;
        } else {
          personalityTrait.positiveScore = Math.abs(personalityTrait.score);
          personalityTrait.negativeScore = 0;
        }
      }
      return callBack(personalityTraits);
    });
  };
  this.PersonalityResults = function(callBack) {
    return Traitify.getPersonalityTypes(assessmentId, function(data) {
      return callBack(data);
    });
  };
  this.PersonalityResults(function(data) {
    var oldOnResize, orientationEvent, phone, stretchSize, supportsOrientationChange;
    render(data);
    phone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    stretchSize = phone ? 29.5 : 31.2;
    if (prop.element.parentNode.offsetWidth < 568) {
      fetch("prop-results")[0].style.fontSize = prop.element.parentNode.offsetWidth / stretchSize + "px";
    } else {
      fetch("prop-results")[0].style.fontSize = "19px";
    }
    Actions();
    oldOnResize = window.onresize;
    window.onresize = function(event) {
      if (prop.element.parentNode.offsetWidth < 568) {
        return fetch("prop-results")[0].style.fontSize = prop.element.parentNode.offsetWidth / stretchSize + "px";
      } else {
        return fetch("prop-results")[0].style.fontSize = "19px";
      }
    };
    supportsOrientationChange = "onorientationchange" in window;
    orientationEvent = (supportsOrientationChange ? "orientationchange" : "resize");
    return window.addEventListener(orientationEvent, (function() {
      var newWidth;
      if (prop.element.parentNode.offsetWidth < 568) {
        if (oldOnResize) {
          oldOnResize.call(window, event);
        }
        newWidth = prop.element.offsetWidth / 29.5;
        return fetch("prop-results")[0].style.fontSize = newWidth + "px";
      } else {
        return fetch("prop-results")[0].style.fontSize = "19px";
      }
    }), false);
  });
  return prop;
};
