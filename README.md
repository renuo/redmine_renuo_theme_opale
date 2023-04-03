Opale
=====

A Redmine 5.x theme.

[![AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Linters](https://github.com/gagnieray/opale/actions/workflows/lint.yml/badge.svg)](https://github.com/gagnieray/opale/actions/workflows/lint.yml)
[![SCSS](https://img.shields.io/badge/SCSS%20code%20style-Standard-brightgreen.svg)](https://github.com/stylelint-scss/stylelint-config-standard-scss)
[![CSS](https://img.shields.io/badge/CSS%20code%20style-SMACSS-brightgreen.svg)](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss)
[![JS](https://img.shields.io/badge/JS%20code%20style-Standard-brightgreen.svg)](https://github.com/standard/eslint-config-standard)

---

[![Grunt](https://img.shields.io/badge/Grunt-E48632?logo=grunt&logoColor=white)](https://gruntjs.com/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)
[![Normalize.css](https://img.shields.io/badge/Normalize.css-e3695f?logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTIuMjM0IiBoZWlnaHQ9IjMyLjg5MyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPHBhdGggZD0ibTE1LjY5NiAwdjE0Ljc3bC0xNS42OTYgMi4wNTUgMjAuNTg3IDIuNjk1di01LjU4M2wxNS45NSAxOC45NTZ2LTE0Ljc3bDE1LjY5Ny0yLjA1NC0yMC41ODctMi42OTV2NS41OHoiIGZpbGw9IiNmZmYiLz4KPC9zdmc+Cg==)](https://necolas.github.io/normalize.css/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7A11F8?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-538dd7?logo=fontawesome&logoColor=white)](https://fontawesome.com/)
[![ESLint](https://img.shields.io/badge/ESLint-3A33D1?logo=eslint&logoColor=white)](https://eslint.org/)
[![Stylelint](https://img.shields.io/badge/Stylelint-000?logo=stylelint&logoColor=white)](https://stylelint.io/)
[![Husky](https://img.shields.io/badge/Husky-42b983?&logo=git&logoColor=white)](https://typicode.github.io/husky/)

## Main features

* Left collapsible sidebar,
* Colored trackers links,
* Jira-inspired priority icons,
* Customizable with SCSS.

## Install

To install this theme [download the lastest release](https://github.com/gagnieray/opale/archive/master.zip) and decompress the archive to your Redmine's `public/themes` folder.

Then go to `Redmine > Administration > Settings > Display` and select `Opale` from the theme's list and save the settings.

## Customize

If you want to customize Opale to your needs, first, make sure that you have installed [Node.js](https://nodejs.org/) and `npm` is available in your terminal.

Then, from the directory that contains Opale run:

    npm install

Now all the dependencies should be ready to use. Run one more command:

    npm run watch

And now the grunt is watching for changes in files placed in `src/` folder. Just change what you need, and it'll run Sass preprocessor automatically.

Regrettably, optional file include is not possible in Sass, so I would recommend creating a new file, e.g. `src/sass/_custom-variables.scss` and importing it a the beginning of the `application.scss` file. That way all the variables with the `!default` flag could be overridden.

The path `src/sass/_custom-variables.scss` is added to `.gitignore` so it should make upgrading Opale with keeping your changes rather painless, given that the only thing you changed in Opale's source was adding this one line with `@import "custom-variables";`.

## Contributing

[Bug reports](https://github.com/gagnieray/opale/issues) and [Pull requests](https://github.com/gagnieray/opale/pulls) are welcome.
Please [read more about contributing](./CONTRIBUTING.md).

## Authors

[Read more about the authors](./AUTHORS.md).

## Changelog

[Read the Changelog](./CHANGELOG.md).

## Copying

Opale is licensed under the [Affero General Public License version 3](https://www.gnu.org/licenses/agpl-3.0), the text of which can be found in [LICENSE](./LICENSE), or any later version of the AGPL, unless otherwise noted.

Licensing of included components:
* Normalize.css : [MIT License](https://github.com/necolas/normalize.css/blob/master/LICENSE.md),
* Bootstrap Mixins : [MIT License](https://github.com/twbs/bootstrap/blob/main/LICENSE),
* Font-Awesome Fonts: [SIL OFL 1.1 License](https://github.com/FortAwesome/Font-Awesome/blob/6.x/LICENSE.txt#L21),
* Font-Awesome Code: [MIT License](https://github.com/FortAwesome/Font-Awesome/blob/6.x/LICENSE.txt#L121).

All unmodified files from these projects retain their original copyright and license notices: see the relevant individual source files in `src/sass/vendor/`
