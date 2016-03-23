var _, browserify, coffeeReactify, fs, gulp, gulpLivereload, gulpTap, jadeify, log, vinylSource, watchify;

_ = require("lodash");

browserify = require("browserify");

coffeeReactify = require("coffee-reactify");

fs = require("fs");

gulp = require("gulp");

gulpLivereload = require("gulp-livereload");

gulpTap = require("gulp-tap");

jadeify = require("jadeify");

vinylSource = require("vinyl-source-stream");

watchify = require("watchify");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var enabled, externals, isProduction, options, sourcemaps, watchEnabled;
  options = coffeeProjectOptions.bundle;
  enabled = options.enabled;
  sourcemaps = options.sourcemaps;
  externals = options.externals || [];
  watchEnabled = coffeeProjectOptions.watch.enabled;
  isProduction = process.env.NODE_ENV === "production";
  return gulp.task("bundle:watch", function(cb) {
    var bundle, entry, extensions, paths, target, transforms;
    if (!(enabled && watchEnabled)) {
      log.info("[bundle:watch] Disabled.");
      return cb();
    }
    entry = options.app.entry;
    target = options.app.target;
    bundle = options.app.bundle;
    paths = options.app.paths;
    extensions = options.app.extensions;
    transforms = options.app.transforms;
    log.debug("[bundle:watch] Entry file:       `" + entry + "`.");
    log.debug("[bundle:watch] Target directory: `" + target + "`.");
    log.debug("[bundle:watch] Target bundle:    `" + bundle + "`.");
    log.debug("[bundle:watch] extensions:       `" + ((extensions || []).join(", ")) + "`.");
    log.debug("[bundle:watch] transforms:       `" + ((transforms || []).join(", ")) + "`.");
    fs.exists(entry, function(exists) {
      var bundler, compile, i, len, ref, transform;
      if (!exists) {
        log.info("[bundle:watch] [app] Entry file `" + entry + "` not found.");
        return cb();
      }
      bundler = watchify(browserify({
        cache: {},
        packageCache: {},
        extensions: extensions,
        paths: paths,
        debug: isProduction ? false : sourcemaps
      }));
      _.each(externals, function(external) {
        if (typeof external === "string") {
          external = {
            require: external
          };
        }
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
      compile = function() {
        var bundlerStream;
        bundlerStream = bundler.bundle();
        bundlerStream.on("error", function(error) {
          return log.error("[bundle:watch]: " + error.message);
        });
        return bundlerStream.pipe(vinylSource(bundle)).pipe(gulpTap(function(file) {
          return log.debug("[bundle:watch] Compiled `" + file.path + "`.");
        })).pipe(gulp.dest(target)).pipe(gulpLivereload({
          auto: false
        }));
      };
      bundler.on("update", compile);
      compile();
    });
  });
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2tzL2J1bmRsZS93YXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBQWlCLE9BQUEsQ0FBUSxRQUFSOztBQUNqQixVQUFBLEdBQWlCLE9BQUEsQ0FBUSxZQUFSOztBQUNqQixjQUFBLEdBQWlCLE9BQUEsQ0FBUSxpQkFBUjs7QUFDakIsRUFBQSxHQUFpQixPQUFBLENBQVEsSUFBUjs7QUFDakIsSUFBQSxHQUFpQixPQUFBLENBQVEsTUFBUjs7QUFDakIsY0FBQSxHQUFpQixPQUFBLENBQVEsaUJBQVI7O0FBQ2pCLE9BQUEsR0FBaUIsT0FBQSxDQUFRLFVBQVI7O0FBQ2pCLE9BQUEsR0FBaUIsT0FBQSxDQUFRLFNBQVI7O0FBQ2pCLFdBQUEsR0FBaUIsT0FBQSxDQUFRLHFCQUFSOztBQUNqQixRQUFBLEdBQWlCLE9BQUEsQ0FBUSxVQUFSOztBQUVqQixHQUFBLEdBQU0sT0FBQSxDQUFRLGVBQVI7O0FBRU4sTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxvQkFBRDtBQUNoQixNQUFBO0VBQUEsT0FBQSxHQUFlLG9CQUFvQixDQUFDO0VBQ3BDLE9BQUEsR0FBZSxPQUFPLENBQUM7RUFDdkIsVUFBQSxHQUFlLE9BQU8sQ0FBQztFQUN2QixTQUFBLEdBQWUsT0FBTyxDQUFDLFNBQVIsSUFBcUI7RUFDcEMsWUFBQSxHQUFlLG9CQUFvQixDQUFDLEtBQUssQ0FBQztFQUMxQyxZQUFBLEdBQWUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFaLEtBQXdCO1NBRXZDLElBQUksQ0FBQyxJQUFMLENBQVUsY0FBVixFQUEwQixTQUFDLEVBQUQ7QUFDekIsUUFBQTtJQUFBLElBQUEsQ0FBQSxDQUFPLE9BQUEsSUFBWSxZQUFuQixDQUFBO01BQ0MsR0FBRyxDQUFDLElBQUosQ0FBUywwQkFBVDtBQUNBLGFBQU8sRUFBQSxDQUFBLEVBRlI7O0lBSUEsS0FBQSxHQUFhLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDekIsTUFB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QWpCO0VBbEJ5QixDQUExQjtBQVJnQiIsImZpbGUiOiJ0YXNrcy9idW5kbGUvd2F0Y2guanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJfICAgICAgICAgICAgICA9IHJlcXVpcmUgXCJsb2Rhc2hcIlxuYnJvd3NlcmlmeSAgICAgPSByZXF1aXJlIFwiYnJvd3NlcmlmeVwiXG5jb2ZmZWVSZWFjdGlmeSA9IHJlcXVpcmUgXCJjb2ZmZWUtcmVhY3RpZnlcIlxuZnMgICAgICAgICAgICAgPSByZXF1aXJlIFwiZnNcIlxuZ3VscCAgICAgICAgICAgPSByZXF1aXJlIFwiZ3VscFwiXG5ndWxwTGl2ZXJlbG9hZCA9IHJlcXVpcmUgXCJndWxwLWxpdmVyZWxvYWRcIlxuZ3VscFRhcCAgICAgICAgPSByZXF1aXJlIFwiZ3VscC10YXBcIlxuamFkZWlmeSAgICAgICAgPSByZXF1aXJlIFwiamFkZWlmeVwiXG52aW55bFNvdXJjZSAgICA9IHJlcXVpcmUgXCJ2aW55bC1zb3VyY2Utc3RyZWFtXCJcbndhdGNoaWZ5ICAgICAgID0gcmVxdWlyZSBcIndhdGNoaWZ5XCJcblxubG9nID0gcmVxdWlyZSBcIi4uLy4uL2xpYi9sb2dcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IChjb2ZmZWVQcm9qZWN0T3B0aW9ucykgLT5cblx0b3B0aW9ucyAgICAgID0gY29mZmVlUHJvamVjdE9wdGlvbnMuYnVuZGxlXG5cdGVuYWJsZWQgICAgICA9IG9wdGlvbnMuZW5hYmxlZFxuXHRzb3VyY2VtYXBzICAgPSBvcHRpb25zLnNvdXJjZW1hcHNcblx0ZXh0ZXJuYWxzICAgID0gb3B0aW9ucy5leHRlcm5hbHMgb3IgW11cblx0d2F0Y2hFbmFibGVkID0gY29mZmVlUHJvamVjdE9wdGlvbnMud2F0Y2guZW5hYmxlZFxuXHRpc1Byb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViBpcyBcInByb2R1Y3Rpb25cIlxuXG5cdGd1bHAudGFzayBcImJ1bmRsZTp3YXRjaFwiLCAoY2IpIC0+XG5cdFx0dW5sZXNzIGVuYWJsZWQgYW5kIHdhdGNoRW5hYmxlZFxuXHRcdFx0bG9nLmluZm8gXCJbYnVuZGxlOndhdGNoXSBEaXNhYmxlZC5cIlxuXHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdGVudHJ5ICAgICAgPSBvcHRpb25zLmFwcC5lbnRyeVxuXHRcdHRhcmdldCAgICAgPSBvcHRpb25zLmFwcC50YXJnZXRcblx0XHRidW5kbGUgICAgID0gb3B0aW9ucy5hcHAuYnVuZGxlXG5cdFx0cGF0aHMgICAgICA9IG9wdGlvbnMuYXBwLnBhdGhzXG5cdFx0ZXh0ZW5zaW9ucyA9IG9wdGlvbnMuYXBwLmV4dGVuc2lvbnNcblx0XHR0cmFuc2Zvcm1zID0gb3B0aW9ucy5hcHAudHJhbnNmb3Jtc1xuXG5cdFx0bG9nLmRlYnVnIFwiW2J1bmRsZTp3YXRjaF0gRW50cnkgZmlsZTogICAgICAgYCN7ZW50cnl9YC5cIlxuXHRcdGxvZy5kZWJ1ZyBcIltidW5kbGU6d2F0Y2hdIFRhcmdldCBkaXJlY3Rvcnk6IGAje3RhcmdldH1gLlwiXG5cdFx0bG9nLmRlYnVnIFwiW2J1bmRsZTp3YXRjaF0gVGFyZ2V0IGJ1bmRsZTogICAgYCN7YnVuZGxlfWAuXCJcblx0XHRsb2cuZGVidWcgXCJbYnVuZGxlOndhdGNoXSBleHRlbnNpb25zOiAgICAgICBgI3soZXh0ZW5zaW9ucyBvciBbXSkuam9pbiBcIiwgXCJ9YC5cIlxuXHRcdGxvZy5kZWJ1ZyBcIltidW5kbGU6d2F0Y2hdIHRyYW5zZm9ybXM6ICAgICAgIGAjeyh0cmFuc2Zvcm1zIG9yIFtdKS5qb2luIFwiLCBcIn1gLlwiXG5cblx0XHRmcy5leGlzdHMgZW50cnksIChleGlzdHMpIC0+XG5cdFx0XHR1bmxlc3MgZXhpc3RzXG5cdFx0XHRcdGxvZy5pbmZvIFwiW2J1bmRsZTp3YXRjaF0gW2FwcF0gRW50cnkgZmlsZSBgI3tlbnRyeX1gIG5vdCBmb3VuZC5cIlxuXHRcdFx0XHRyZXR1cm4gY2IoKVxuXG5cdFx0XHRidW5kbGVyID0gd2F0Y2hpZnkgYnJvd3NlcmlmeVxuXHRcdFx0XHRjYWNoZTogICAgICAgIHt9XG5cdFx0XHRcdHBhY2thZ2VDYWNoZToge31cblx0XHRcdFx0IyBmdWxsUGF0aHM6ICAgIHRydWVcblx0XHRcdFx0ZXh0ZW5zaW9uczogICBleHRlbnNpb25zXG5cdFx0XHRcdHBhdGhzOiAgICAgICAgcGF0aHNcblx0XHRcdFx0ZGVidWc6ICAgICAgICBpZiBpc1Byb2R1Y3Rpb24gdGhlbiBmYWxzZSBlbHNlIHNvdXJjZW1hcHNcblxuXHRcdFx0Xy5lYWNoIGV4dGVybmFscywgKGV4dGVybmFsKSAtPlxuXHRcdFx0XHRleHRlcm5hbCA9IHJlcXVpcmU6IGV4dGVybmFsIGlmIHR5cGVvZiBleHRlcm5hbCBpcyBcInN0cmluZ1wiXG5cdFx0XHRcdGJ1bmRsZXIuZXh0ZXJuYWwgZXh0ZXJuYWwuZXhwb3NlIG9yIGV4dGVybmFsLnJlcXVpcmVcblxuXHRcdFx0Zm9yIHRyYW5zZm9ybSBpbiB0cmFuc2Zvcm1zIG9yIFtdXG5cdFx0XHRcdHN3aXRjaCB0cmFuc2Zvcm1cblx0XHRcdFx0XHR3aGVuIFwiY29mZmVlLXJlYWN0aWZ5XCIgdGhlblx0YnVuZGxlci50cmFuc2Zvcm0gY29mZmVlUmVhY3RpZnlcblx0XHRcdFx0XHR3aGVuIFwiamFkZWlmeVwiICAgICAgICAgdGhlbiBidW5kbGVyLnRyYW5zZm9ybSBqYWRlaWZ5XG5cblx0XHRcdGJ1bmRsZXIuYWRkIGVudHJ5XG5cblx0XHRcdGNvbXBpbGUgPSAtPlxuXHRcdFx0XHRidW5kbGVyU3RyZWFtID0gYnVuZGxlci5idW5kbGUoKVxuXG5cdFx0XHRcdGJ1bmRsZXJTdHJlYW0ub24gXCJlcnJvclwiLCAoZXJyb3IpIC0+IGxvZy5lcnJvciBcIltidW5kbGU6d2F0Y2hdOiAje2Vycm9yLm1lc3NhZ2V9XCJcblxuXHRcdFx0XHRidW5kbGVyU3RyZWFtXG5cdFx0XHRcdFx0LnBpcGUgdmlueWxTb3VyY2UgYnVuZGxlXG5cdFx0XHRcdFx0LnBpcGUgZ3VscFRhcCAoZmlsZSkgLT5cblx0XHRcdFx0XHRcdGxvZy5kZWJ1ZyBcIltidW5kbGU6d2F0Y2hdIENvbXBpbGVkIGAje2ZpbGUucGF0aH1gLlwiXG5cdFx0XHRcdFx0LnBpcGUgZ3VscC5kZXN0IHRhcmdldFxuXHRcdFx0XHRcdC5waXBlIGd1bHBMaXZlcmVsb2FkIGF1dG86IGZhbHNlXG5cblx0XHRcdGJ1bmRsZXIub24gXCJ1cGRhdGVcIiwgY29tcGlsZVxuXG5cdFx0XHRjb21waWxlKClcblxuXHRcdFx0cmV0dXJuXG5cblx0XHRyZXR1cm5cblxuIl19
