var gulp = require('gulp');
var ts = require('gulp-typescript');
var debug = require('gulp-debug')
var path = require('path')
var gulpTypings = require("gulp-typings");
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('default', ['build'] );

gulp.task('clean', function(){
  return del('dist')
});

gulp.task('build-server', function(){
  var tsProject = ts.createProject(path.join('server','tsconfig.json'))
  var resources = gulp.src([path.join('server', 'views', '*.html'),
                            path.join('server', 'public', 'images', '*'),
                            path.join('server', 'bin', 'www'),
                            path.join('server', 'public','stylesheets', '*.css')],
                            {base: 'server'})
                      .pipe(gulp.dest('dist'));
  
  var js = tsProject.src()
                    .pipe(ts(tsProject))
                    .js
                    .pipe(gulp.dest('dist'))
                      
  return [js, resources]
})

/*
  jsNPMDependencies, sometimes order matters here! so becareful!
*/
var jsNPMDependencies = [
    'es6-shim/es6-shim.min.js',
    'systemjs/dist/system-polyfills.js',
    'angular2/es6/dev/src/testing/shims_for_IE.js',
    'angular2/bundles/angular2-polyfills.js',
    'systemjs/dist/system.src.js',
    'rxjs/bundles/Rx.js',
    'angular2/bundles/angular2.dev.js',
    'angular2/bundles/router.dev.js'
] 

gulp.task('build-libs', function () {
  
  var filesToMove = jsNPMDependencies.map(function(file) {
    return path.resolve('node_modules', file)
  }) 
  
  return gulp
      .src(filesToMove, {base:'node_modules'})
      .pipe(gulp.dest(path.join('dist', 'libs')))
})

gulp.task('build-client', function(){
  var tsProject = ts.createProject('angular2/tsconfig.json');
  
  var destAngularFiles = path.join('dist','public','javascripts','ang')
  
  var templates =gulp.src(path.join('angular2','**','*.html'))
    .pipe(gulp.dest(destAngularFiles))
    
    var components = tsProject.src()
    .pipe(ts(tsProject))
    .js
    .pipe(gulp.dest(destAngularFiles))
    
    return [components, templates]
    
})

gulp.task('build', function(callback){
    runSequence('clean', 'build-server', 'build-libs', 'build-client', callback);
});

gulp.task('watch-client', function(){
  gulp.watch(['angular2/**/*.ts', 'angular2/templates/**/*.html'], ['build-client']);
})

gulp.task('post-install',['typings-install','build'] )

gulp.task('typings-install', function(callback){
  var angularTypes =
  gulp.src(path.join('.','angular2','typings.json'))
        .pipe(gulpTypings()),
  serverTypes =
  gulp.src(path.join('.','server','typings.json'))
        .pipe(gulpTypings());
        
  callback();
        
  return [angularTypes, serverTypes]
})