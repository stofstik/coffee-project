var _, browserify, coffeeReactify, coffeeify, fs, gulp, gulpTap, jadeify, log, path, vinylSource;

_ = require("lodash");

browserify = require("browserify");

coffeeify = require("coffeeify");

coffeeReactify = require("coffee-reactify");

fs = require("fs");

gulp = require("gulp");

gulpTap = require("gulp-tap");

jadeify = require("jadeify");

path = require("path");

vinylSource = require("vinyl-source-stream");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var enabled, externals, isProduction, options;
  options = coffeeProjectOptions.bundle;
  enabled = options.enabled;
  externals = options.externals || [];
  isProduction = process.env.NODE_ENV === "production";
  gulp.task("bundle:vendor:rm", function(cb) {
    var bundle, bundlePath, target;
    target = options.vendor.target;
    bundle = options.vendor.bundle;
    bundlePath = path.resolve(target + "/" + bundle);
    return fs.exists(bundlePath, function(exists) {
      if (!exists) {
        log.debug("[bundle:vendor:rm] Not there, nothing to remove.");
        return cb();
      }
      return fs.unlink(bundlePath, function(error) {
        log.debug("[bundle:vendor:rm] Removed " + bundlePath);
        return cb(error);
      });
    });
  });
  gulp.task("bundle:vendor", function(cb) {
    var bundle, bundlePath, source, target;
    if (!enabled) {
      log.info("[bundle:compile] Disabled.");
      return cb();
    }
    target = options.vendor.target;
    bundle = options.vendor.bundle;
    source = options.vendor.source;
    bundlePath = target + "/" + bundle;
    fs.exists(bundlePath, function(bundleExists) {
      var bundler;
      if (!isProduction) {
        if (bundleExists) {
          log.info("[bundle:compile] [vendor] Bundle already there. Skipping.");
          return cb();
        }
      }
      log.debug("[bundle:compile] [vendor] Target directory: `" + target + "`.");
      log.debug("[bundle:compile] [vendor] Target bundle:    `" + bundle + "`.");
      log.debug("[bundle:compile] [vendor] Source:           `" + source + "`.");
      bundler = browserify({
        debug: false
      });
      bundler.transform(coffeeify);
      _.each(externals, function(external) {
        if (external.expose) {
          return bundler.require(external.require, {
            expose: external.expose
          });
        } else {
          return bundler.require(external.require);
        }
      });
      return bundler.bundle().pipe(vinylSource(bundle)).pipe(gulpTap(function(file) {
        return log.debug("[bundle:compile] [vendor] Compiled `" + file.path + "`.");
      })).pipe(gulp.dest(target)).on("end", cb);
    });
  });
  return gulp.task("bundle:compile", ["bundle:vendor"], function(cb) {
    var bundle, entry, extensions, paths, target, transforms;
    if (!enabled) {
      log.info("[bundle:compile] Disabled.");
      return cb();
    }
    entry = options.app.entry;
    target = options.app.target;
    bundle = options.app.bundle;
    paths = options.app.paths;
    extensions = options.app.extensions;
    transforms = options.app.transforms;
    log.debug("[bundle:compile] [app] Entry file:       `" + entry + "`.");
    log.debug("[bundle:compile] [app] Target directory: `" + target + "`.");
    log.debug("[bundle:compile] [app] Target bundle:    `" + bundle + "`.");
    log.debug("[bundle:compile] [app] extensions:       `" + ((extensions || []).join(", ")) + "`.");
    log.debug("[bundle:compile] [app] transforms:       `" + ((transforms || []).join(", ")) + "`.");
    fs.exists(entry, function(exists) {
      var bundler, i, len, ref, transform;
      if (!exists) {
        log.info("[bundle:compile] [app] Entry file `" + entry + "` not found.");
        return cb();
      }
      bundler = browserify({
        extensions: extensions,
        paths: paths,
        debug: !isProduction
      });
      _.each(externals, function(external) {
        return bundler.external(external.expose || external.require);
      });
      ref = transforms || [];
      for (i = 0, len = ref.length; i < len; i++) {
        transform = ref[i];
        switch (transform) {
          case "coffee-reactify":
            bundler.transform(coffeeReactify);
            break;
          case "jadeify":
            bundler.transform(jadeify);
        }
      }
      bundler.add(entry);
      return bundler.bundle().pipe(vinylSource(bundle)).pipe(gulpTap(function(file) {
        return log.debug("[bundle:compile] [app] Compiled `" + file.path + "`.");
      })).pipe(gulp.dest(target)).on("end", cb);
    });
  });
};