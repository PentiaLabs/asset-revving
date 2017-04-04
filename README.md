# asset-revving

Will take something like this:

```html
style.css
```

and turn it into something like this:

```html
style---99e8daf2.css
```

(the postfixed hash is of course based on the current contents of the file)

## options

### env
**(required)**

Can be either ```development``` or ```production```. This will decide whether or not we're doing hashing at all.

### mode
**(required)**

Can be one of the following: ```css```, ```requirejs-dev``` or ```requirejs-production```.

#### css

Will create a html file suited to serve CSS-files.

Example:
```html
<link rel="stylesheet" type="text/css" href="file/path/style.css" />
```
### main
**(optional)**

The current file path for the main file for RequireJS scripts in development mode.