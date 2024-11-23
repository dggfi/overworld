# Overworld
Extendible, editable UI for running tabletop games (primarily RPGs).

## Commercial Assets
Official project uses a number of paid font & SVG assets. If you do not have license to these assets or would rather use free subtitutions, build with the `-free` flag.

## Tips to reduce production build size/load times
+ Copy used font assets within the `src/styles/fonts.scss` 'if' clause to the inside of the 'else' clause.
+ If you use Fontawesome, import each SVG individually

### Application Global Commands
+ `Ctrl+Shift+E` to exit
+ Tap `CTRL` to access an element's controls

### TO DO
+ implement -free flag

### TO WATCH
+ Role of native module support at future date

### Dev notes
+ Extension resolvers in electron webpack configs are mandatory
+ `// ::HACK` comments signal stopgaps and workarounds,
+ `// ::REVISIT` signal issues that need to be resolved eventually
+ Use `local:\\` protocol inside the render process when fetching/loading resources during development