Opale
=====

A Redmine theme written in SCSS.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://standardjs.com/)

---

It's written in [SCSS]. It uses [normalize.css] and benefits from some parts of [Bootstrap][bootstrap-sass] like mixins, structure, and stuff.

## Main features

* Bigger, easier to read fonts,
* Github-like wiki content look,
* Sidebar moved to the left for better ergonomy,
* Coloring trackers links (on lists, issue pages and even in the wiki content),
* Jira-inspired priority icons,
* Toggling sidebar visibility,
* Easy to customize via variables.

## How install it

To install Opale, just download [.zip](https://github.com/gagnieray/opale/archive/master.zip) and unpack it to your Redmine's `public/themes` folder.

Then go to `Redmine > Administration > Settings > Display` and select `Opale` from the list and save the changes.

## How to customize it

If you want to customize Opale to your needs, first, make sure that you have installed [node.js] and `npm` is available in your terminal.

Then, from the directory that contains Opale run:

    npm install

Now all the dependencies should be ready to use. Run one more command:

    npm run watch

And now the grunt is watching for changes in files placed in `src/` folder. Just change what you need, and it'll run Sass preprocessor automatically.

Regrettably, optional file include is not possible in Sass, so I would recommend creating a new file, e.g. `src/sass/_custom-variables.scss` and importing it a the beginning of the `application.scss` file. That way all the variables with the `!default` flag could be overridden.

The path `src/sass/_custom-variables.scss` is added to `.gitignore` so it should make upgrading Opale with keeping your changes rather painless, given that the only thing you changed in Opale's source was adding this one line with `@import "custom-variables";`.

## Changelog

[Changelog](./CHANGELOG.md)

[SCSS]: http://sass-lang.com/
[normalize.css]: https://github.com/necolas/normalize.css
[bootstrap-sass]: https://github.com/twbs/bootstrap-sass
[node.js]: http://nodejs.org/
