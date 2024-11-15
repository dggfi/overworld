# Overworld
Extendible, editable UI for running tabletop games (primarily RPGs).

## Commercial Assets
Official project uses a number of paid font & SVG assets. If you do not have license to these assets or would rather use free subtitutions, build with the `-free` flag.

## Tips to reduce production build size
Copy used font assets within the `src/styles/fonts.scss` 'if' clause to the inside of the 'else' clause.


### Application Global Commands
+ `Ctrl+Shift+E` to exit

### TO DO
+ implement -free flag
+ Hot-loading

### TO WATCH
+ Role of native module support at future date

### Dev notes-to-self
+ Extension resolvers in electron webpack configs appear to be absolutely mandatory... what a headache.