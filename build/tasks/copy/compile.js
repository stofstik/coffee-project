var gulp, gulpTap, log, path;

path = require("path");

gulp = require("gulp");

gulpTap = require("gulp-tap");

log = require("../../lib/log");

module.exports = function(coffeeProjectOptions) {
  var enabled, excluded, options, sourceDirectoryPath, targetDirectoryPath;
  options = coffeeProjectOptions.copy;
  enabled = options.enabled;
  excluded = options.excluded;
  sourceDirectoryPath = options.sourceDirectoryPath;
  targetDirectoryPath = options.targetDirectoryPath;
  return gulp.task("copy:compile", function(cb) {
    var sourceGlob;
    if (enabled !== true) {
      log.info("Skipping copy:compile: Disabled.");
      return cb();
    }
    log.debug("[copy:compile] Source directory path: `" + sourceDirectoryPath + "`.");
    log.debug("[copy:compile] Target directory path: `" + targetDirectoryPath + "`.");
    excluded = (excluded || []).map(function(x) {
      return "!" + x;
    });
    sourceGlob = [sourceDirectoryPath + "/**/*"].concat(excluded);
    gulp.src(sourceGlob).pipe(gulpTap(function(file) {
      log.debug("[copy:compile] Copying `" + file.path + "`.");
    })).pipe(gulp.dest(targetDirectoryPath)).on("end", cb);
  });
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MvY29weS9jb21waWxlLmpzIiwic291cmNlcyI6WyJ0YXNrcy9jb3B5L2NvbXBpbGUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsSUFBQSxHQUFVLE9BQUEsQ0FBUSxNQUFSOztBQUNWLElBQUEsR0FBVSxPQUFBLENBQVEsTUFBUjs7QUFDVixPQUFBLEdBQVUsT0FBQSxDQUFRLFVBQVI7O0FBRVYsR0FBQSxHQUFNLE9BQUEsQ0FBUSxlQUFSOztBQUVOLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsb0JBQUQ7QUFDaEIsTUFBQTtFQUFBLE9BQUEsR0FBc0Isb0JBQW9CLENBQUM7RUFDM0MsT0FBQSxHQUFzQixPQUFPLENBQUM7RUFDOUIsUUFBQSxHQUFzQixPQUFPLENBQUM7RUFDOUIsbUJBQUEsR0FBc0IsT0FBTyxDQUFDO0VBQzlCLG1CQUFBLEdBQXNCLE9BQU8sQ0FBQztTQUU5QixJQUFJLENBQUMsSUFBTCxDQUFVLGNBQVYsRUFBMEIsU0FBQyxFQUFEO0FBQ3pCLFFBQUE7SUFBQSxJQUFPLE9BQUEsS0FBVyxJQUFsQjtNQUNDLEdBQUcsQ0FBQyxJQUFKLENBQVMsa0NBQVQ7QUFDQSxhQUFPLEVBQUEsQ0FBQSxFQUZSOztJQUlBLEdBQUcsQ0FBQyxLQUFKLENBQVUseUNBQUEsR0FBMEMsbUJBQTFDLEdBQThELElBQXhFO0lBQ0EsR0FBRyxDQUFDLEtBQUosQ0FBVSx5Q0FBQSxHQUEwQyxtQkFBMUMsR0FBOEQsSUFBeEU7SUFFQSxRQUFBLEdBQWEsQ0FBQyxRQUFBLElBQVksRUFBYixDQUFnQixDQUFDLEdBQWpCLENBQXFCLFNBQUMsQ0FBRDthQUFPLEdBQUEsR0FBSTtJQUFYLENBQXJCO0lBQ2IsVUFBQSxHQUFhLENBQUssbUJBQUQsR0FBcUIsT0FBekIsQ0FBaUMsQ0FBQyxNQUFsQyxDQUF5QyxRQUF6QztJQUViLElBQUksQ0FBQyxHQUFMLENBQVMsVUFBVCxDQUNDLENBQUMsSUFERixDQUNPLE9BQUEsQ0FBUSxTQUFDLElBQUQ7TUFDYixHQUFHLENBQUMsS0FBSixDQUFVLDBCQUFBLEdBQTJCLElBQUksQ0FBQyxJQUFoQyxHQUFxQyxJQUEvQztJQURhLENBQVIsQ0FEUCxDQUtDLENBQUMsSUFMRixDQUtPLElBQUksQ0FBQyxJQUFMLENBQVUsbUJBQVYsQ0FMUCxDQU1DLENBQUMsRUFORixDQU1LLEtBTkwsRUFNWSxFQU5aO0VBWHlCLENBQTFCO0FBUGdCIiwic291cmNlc0NvbnRlbnQiOlsicGF0aCAgICA9IHJlcXVpcmUgXCJwYXRoXCJcbmd1bHAgICAgPSByZXF1aXJlIFwiZ3VscFwiXG5ndWxwVGFwID0gcmVxdWlyZSBcImd1bHAtdGFwXCJcblxubG9nID0gcmVxdWlyZSBcIi4uLy4uL2xpYi9sb2dcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IChjb2ZmZWVQcm9qZWN0T3B0aW9ucykgLT5cblx0b3B0aW9ucyAgICAgICAgICAgICA9IGNvZmZlZVByb2plY3RPcHRpb25zLmNvcHlcblx0ZW5hYmxlZCAgICAgICAgICAgICA9IG9wdGlvbnMuZW5hYmxlZFxuXHRleGNsdWRlZCAgICAgICAgICAgID0gb3B0aW9ucy5leGNsdWRlZFxuXHRzb3VyY2VEaXJlY3RvcnlQYXRoID0gb3B0aW9ucy5zb3VyY2VEaXJlY3RvcnlQYXRoXG5cdHRhcmdldERpcmVjdG9yeVBhdGggPSBvcHRpb25zLnRhcmdldERpcmVjdG9yeVBhdGhcblxuXHRndWxwLnRhc2sgXCJjb3B5OmNvbXBpbGVcIiwgKGNiKSAtPlxuXHRcdHVubGVzcyBlbmFibGVkIGlzIHRydWVcblx0XHRcdGxvZy5pbmZvIFwiU2tpcHBpbmcgY29weTpjb21waWxlOiBEaXNhYmxlZC5cIlxuXHRcdFx0cmV0dXJuIGNiKClcblxuXHRcdGxvZy5kZWJ1ZyBcIltjb3B5OmNvbXBpbGVdIFNvdXJjZSBkaXJlY3RvcnkgcGF0aDogYCN7c291cmNlRGlyZWN0b3J5UGF0aH1gLlwiXG5cdFx0bG9nLmRlYnVnIFwiW2NvcHk6Y29tcGlsZV0gVGFyZ2V0IGRpcmVjdG9yeSBwYXRoOiBgI3t0YXJnZXREaXJlY3RvcnlQYXRofWAuXCJcblxuXHRcdGV4Y2x1ZGVkICAgPSAoZXhjbHVkZWQgb3IgW10pLm1hcCAoeCkgLT4gXCIhI3t4fVwiXG5cdFx0c291cmNlR2xvYiA9IFsgXCIje3NvdXJjZURpcmVjdG9yeVBhdGh9LyoqLypcIiBdLmNvbmNhdCBleGNsdWRlZFxuXG5cdFx0Z3VscC5zcmMgc291cmNlR2xvYlxuXHRcdFx0LnBpcGUgZ3VscFRhcCAoZmlsZSkgLT5cblx0XHRcdFx0bG9nLmRlYnVnIFwiW2NvcHk6Y29tcGlsZV0gQ29weWluZyBgI3tmaWxlLnBhdGh9YC5cIlxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0LnBpcGUgZ3VscC5kZXN0IHRhcmdldERpcmVjdG9yeVBhdGhcblx0XHRcdC5vbiBcImVuZFwiLCBjYlxuXG5cdFx0cmV0dXJuXG4iXX0=
