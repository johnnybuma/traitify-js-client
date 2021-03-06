// Generated by CoffeeScript 1.8.0
var ApiClient, SimplePromise, Traitify;

SimplePromise = function(callback) {
  var localPromise;
  localPromise = Object();
  localPromise.then = function(callback) {
    localPromise.thenCallback = callback;
    if (localPromise.resolved) {
      localPromise.thenCallback(localPromise.data);
    }
    return localPromise;
  };
  localPromise.resolved = false;
  localPromise.resolve = function(data) {
    localPromise.data = data;
    if (localPromise.thenCallback) {
      localPromise.thenCallback(data);
    } else {
      localPromise.resolved = true;
    }
    return localPromise;
  };
  localPromise["catch"] = function(callback) {
    if (localPromise.rejected) {
      callback(localPromise.error);
      localPromise;
    } else {
      localPromise.rejectCallback = callback;
    }
    return localPromise;
  };
  localPromise.rejected = false;
  localPromise.reject = function(error) {
    localPromise.error = error;
    if (localPromise.rejectCallback) {
      localPromise.rejectCallback(error);
    } else {
      localPromise.rejected = true;
    }
    return localPromise;
  };
  callback(localPromise.resolve, localPromise.reject);
  return localPromise;
};

ApiClient = (function() {
  function ApiClient() {
    this.host = "https://api.traitify.com";
    this.version = "v1";
    this.beautify = false;
    this.XHR = XMLHttpRequest;
    this;
  }

  ApiClient.prototype.setBeautify = function(mode) {
    this.beautify = mode;
    return this;
  };

  ApiClient.prototype.setHost = function(host) {
    host = host.replace("http://", "").replace("https://", "");
    host = "https://" + host;
    this.host = host;
    return this;
  };

  ApiClient.prototype.setPublicKey = function(key) {
    this.publicKey = key;
    return this;
  };

  ApiClient.prototype.setVersion = function(version) {
    this.version = version;
    return this;
  };

  ApiClient.prototype.ajax = function(method, path, callback, params) {
    var beautify, promise, that, url, xhr;
    beautify = this.beautify;
    url = "" + this.host + "/" + this.version + path;
    xhr = new this.XHR();
    if ("withCredentials" in xhr) {
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest !== "undefined") {
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      return new SimplePromise(function(resolve, reject) {
        return reject("CORS is Not Supported By This Browser");
      });
    }
    xhr;
    if (xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(this.publicKey + ":x"));
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Accept", "application/json");
    }
    that = this;
    promise = new SimplePromise(function(resolve, reject) {
      var error;
      try {
        xhr.onload = function() {
          var data;
          if (xhr.status === 404) {
            return reject(xhr.response);
          } else {
            data = xhr.response;
            if (beautify) {
              data = data.replace(/_([a-z])/g, function(m, w) {
                return w.toUpperCase();
              }).replace(/_/g, "");
            }
            data = JSON.parse(data);
            if (callback) {
              callback(data);
            }
            that.resolve = resolve;
            return that.resolve(data);
          }
        };
        xhr.send(JSON.stringify(params));
        return xhr;
      } catch (_error) {
        error = _error;
        return reject(error);
      }
    });
    return promise;
  };

  ApiClient.prototype.put = function(path, params, callback) {
    return this.ajax("PUT", path, callback, params);
  };

  ApiClient.prototype.get = function(path, callback) {
    return this.ajax("GET", path, callback, "");
  };

  ApiClient.prototype.getDecks = function(callback) {
    return this.get("/decks", callback);
  };

  ApiClient.prototype.getSlides = function(assessmentId, callback) {
    return this.get("/assessments/" + assessmentId + "/slides", callback);
  };

  ApiClient.prototype.addSlide = function(assessmentId, slideId, value, timeTaken, callback) {
    return this.put("/assessments/" + assessmentId + "/slides/" + slideId, {
      "response": value,
      "time_taken": timeTaken
    }, callback);
  };

  ApiClient.prototype.addSlides = function(assessmentId, values, callback) {
    return this.put("/assessments/" + assessmentId + "/slides", values, callback);
  };

  ApiClient.prototype.getPersonalityTypes = function(id, options, callback) {
    var key, params, _i, _len, _ref;
    if (options == null) {
      options = Object();
    }
    if (options.image_pack == null) {
      options.image_pack = "linear";
    }
    params = Array();
    _ref = Object.keys(options);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      params.push("" + key + "=" + options[key]);
    }
    return this.get("/assessments/" + id + "/personality_types?" + (params.join("&")), callback);
  };

  ApiClient.prototype.getPersonalityTraits = function(id, options, callback) {
    return this.get("/assessments/" + id + "/personality_traits/raw", callback);
  };

  return ApiClient;

})();

Traitify = new ApiClient();
