var Opale = Opale || {} /* eslint no-var: "off", no-use-before-define: "off" */

Opale.MenuCollapse = (function () {
  'use strict'

  let instance
  const translations = {
    en: {
      topMenuToggler: 'Expand/collapse top menu'
    },
    ro: {
      topMenuToggler: 'Deschide/închide meniul de sus'
    },
    fr: {
      topMenuToggler: 'Développer/réduire le menu principal'
    },
    pl: {
      topMenuToggler: 'Zwiń/rozwiń górne menu'
    },
    de: {
      topMenuToggler: 'Ein-/Ausklappen Hauptmenu'
    },
    ja: {
      topMenuToggler: 'トップメニューの展開/折りたたみ'
    }
  }

  function MenuCollapse () {
    if (instance) {
      return instance
    }

    instance = this

    this.lang = document.documentElement.lang

    if (typeof translations[this.lang] === 'undefined') {
      this.lang = 'en'
    }

    this._ = translations[this.lang]

    this.menus = {
      top: {
        $el: $('#top-menu')
      }
    }

    for (const menu in this.menus) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.menus.hasOwnProperty(menu) && this.menus[menu].$el.length > 0) {
        handleMenu(menu)
      }
    }
  }

  function handleMenu (menu) {
    if (instance.menus[menu].$el.css('maxHeight') === 'none') {
      return false
    }

    instance.menus[menu].collapsed = true

    if (window.localStorage) {
      instance.menus[menu].collapsed =
        localStorage.getItem(getMenuStorageKey(menu)) === null
    }

    buildToggleButton(menu)

    if (instance.isCollapsed(menu) === false) {
      instance.expandMenu(menu)
    }
  }

  function getMenuStorageKey (menu) {
    return 'Opale:' + menu + 'MenuExpanded'
  }

  function buildToggleButton (menu) {
    const togglerClass = menu + '-menu-toggler'
    const togglerLabel = instance._[menu + 'MenuToggler']
    const togglerHtml = '<a href="javascript:;" class="' +
      togglerClass +
      '" title="' +
      togglerLabel +
      '"></a>'
    instance.menus[menu].$toggler = $(togglerHtml)

    instance.menus[menu].$el.prepend(instance.menus[menu].$toggler)
    instance.menus[menu].$toggler.on('click', { menu }, instance.toggleMenu)
  }

  MenuCollapse.prototype.toggleMenu = function (event) {
    const menu = event.data.menu || ''

    if (instance.isCollapsed(menu)) {
      instance.expandMenu(menu)
    } else {
      instance.collapseMenu(menu)
    }
  }

  MenuCollapse.prototype.isCollapsed = function (menu) {
    return this.menus[menu].collapsed
  }

  MenuCollapse.prototype.expandMenu = function (menu) {
    this.menus[menu].$el.addClass('expanded')
    this.menus[menu].$toggler.addClass('expanded')
    this.menus[menu].collapsed = false

    if (window.localStorage) {
      localStorage.setItem(getMenuStorageKey(menu), 'x')
    }
  }

  MenuCollapse.prototype.collapseMenu = function (menu) {
    this.menus[menu].$el.removeClass('expanded')
    this.menus[menu].$toggler.removeClass('expanded')
    this.menus[menu].collapsed = true

    if (window.localStorage) {
      localStorage.removeItem(getMenuStorageKey(menu))
    }
  }

  return MenuCollapse
}())
