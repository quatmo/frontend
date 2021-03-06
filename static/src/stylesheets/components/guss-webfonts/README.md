# Guss Webfonts

Guardian Webfonts for your prototyping needs.

Read the End User License Agreement before deploying any of these fonts
at a user-facing URL.

These fonts are the property of Commercial Type.

The font files are for internal use exclusively. You may use them for
prototyping purposes but not serve them publicly on your own domain
unless you have a license for it.

For more information, read the [Commercial Type End User License Agreement](./Commercial Type EULA Web-general.pdf).

[Read the docs](http://guardian.github.io/guss-webfonts/docs/) or
[view the demo](http://guardian.github.io/guss-webfonts/demo/)

## Quick start

### Install the Sass helpers

```bash
$ bower install guss-webfonts --save
```

### Add the required fonts files to your project

1. [Manually download the repository](https://github.com/guardian/guss-webfonts/archive/master.zip)
2. Decompress the archive
3. Copy all or part of the `webfonts` directory

### Import the file in Sass

#### 1. Configure and import guss-webfonts

```scss
/**
 * Base URL
 * HTTP path or url where the browser will look for fonts
 * URL can be an absolute HTTP (`//pasteup.guim.co.uk/fonts/`) or relative (`../`)
 */

// if you use an asset domain, you would set it to:
// $guss-webfonts-base-url: '//assets.yourdomain.com/path/to/guss-webfonts';
$guss-webfonts-base-url: '/path/to/guss-webfonts';

/**
 * Charset
 *
 * - ascii: 256 characters only, very small
 * - latin1: latin 1 character set
 * - original: full character set
 */
$guss-webfonts-charset: 'original';

/**
 * Hinting
 *
 * - on: larger file, better rendering in Windows
 * - off: smaller files, render well on HiDPI displays
 */
$guss-webfonts-hinting: 'on';

/**
 * Kerning
 *
 * - on: larger file, better rendering
 * - off: smaller files
 */
$guss-webfonts-kerning: 'on';

/**
 * Version
 *
 * Version of the fonts to use
 */
$guss-webfonts-version: '0.1.0';


@import 'bower_components/guss-webfonts/src/_webfonts';
```

#### 2. Output @font-face rules

```scss
// Outputs @font-face rules for all the fonts licensed
// to the Guardian for the web
@include guss-webfonts();
```

## Curating a selection of web fonts

Font properties are stored in the `$guss-webfonts` map, in `src/_webfonts.config.scss`.

You can curate your own list of @font-face rules like so:

```scss
// Only Guardian Agate Sans 1 Web
@include guss-webfonts('Guardian Agate Sans 1 Web');

// Guardian Agate Sans 1 Web and Guardian Sans Web
@include guss-webfonts('Guardian Agate Sans 1 Web' 'Guardian Sans Web');

// For Guardian Next Gen products, we use this configuration:
@include guss-webfonts(
    (
        'Guardian Agate Sans 1 Web': (
            (weight: 'regular', style: 'normal'),
            (weight: 'bold',    style: 'normal'),
        ),
        'Guardian Text Egyptian Web': (
            (weight: 'regular',  style: 'normal'),
            (weight: 'regular',  style: 'italic'),
            (weight: 'medium',   style: 'normal', use-as: (weight: 'bold', style: 'normal')),
            (weight: 'medium',   style: 'italic', use-as: (weight: 'bold', style: 'italic')),
        ),
        'Guardian Egyptian Web': (
            (weight: 'light',    style: 'normal'),
            (weight: 'regular',  style: 'normal'),
            (weight: 'semibold', style: 'normal', use-as: (weight: 'ultrablack', style: 'normal')),
        ),
        'Guardian Text Sans Web': (
            (weight: 'regular',  style: 'normal'),
            (weight: 'regular',  style: 'italic'),
            (weight: 'medium',   style: 'normal', use-as: (weight: 'bold', style: 'normal')),
            (weight: 'medium',   style: 'italic', use-as: (weight: 'bold', style: 'italic')),
        ),
        'Guardian Sans Web': (
            (weight: 'regular',  style: 'normal'),
        )
    )
);
```

## Uploading fonts

Update the version number in the [Gruntfile](Gruntfile.js#L13). Then

```
$ grunt release:fonts --id=AWS_ACCESS_KEY --secret=AWS_SECRET_KEY
```

## Acknowledgements

Thanks to @HugoGiraudel for his help and the [string functions][sassystrings]
in use in this project.

Thanks to @paulrobertlloyd for his input on the API.

[sassystrings]: https://github.com/HugoGiraudel/SassyStrings
