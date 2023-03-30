var Opale = Opale || {} /* eslint no-var: "off", no-use-before-define: "off" */

Opale.HistoryTabs = (function () {
  'use strict'

  let instance
  const translations = {
    en: {
      all: 'All',
      notes: 'Notes',
      details: 'Changes'
    },
    ro: {
      all: 'Toate',
      notes: 'Note',
      details: 'Schimbări'
    },
    fr: {
      all: 'Tout',
      notes: 'Remarques',
      details: 'Changements'
    },
    pl: {
      all: 'Wszystko',
      notes: 'Notatki',
      details: 'Zmiany'
    },
    de: {
      all: 'Alles',
      notes: 'Kommentare',
      details: 'Änderungen'
    },
    ja: {
      all: 'すべて',
      notes: '注記',
      details: '変更'
    }
  }

  function HistoryTabs () {
    if (instance) {
      return instance
    }

    instance = this

    this.$tabsContainer = null
    this.$tabs = null
    this.$history = $('#history')
    this.lang = document.documentElement.lang

    if (typeof translations[this.lang] === 'undefined') {
      this.lang = 'en'
    }

    this._ = translations[this.lang]

    if (this.$history.length > 0 && $('#history > h3').length > 0) {
      buildTabs()
      markFirstOfTypes()
    }
  }

  function buildTabs () {
    let html = ''
    const liStart = '<li><a href="javascript:;" class="'
    const liMid = 'history-tab" data-tab="'
    const liEnd = '</a></li>'

    html += '<div class="tabs"><ul>'
    html += liStart + 'selected ' + liMid + 'all">' + instance._.all + liEnd
    html += liStart + liMid + 'notes">' + instance._.notes + liEnd
    html += liStart + liMid + 'details">' + instance._.details + liEnd
    html += '</ul></div>'

    instance.$tabsContainer = $(html)
    $('#history > h3').after(instance.$tabsContainer)

    instance.$tabs = instance.$tabsContainer.find('.history-tab')
    instance.$tabs.on('click', tabClick)
  }

  function markFirstOfTypes () {
    instance.$history.find('.has-notes:first').addClass('first-of-notes')
    instance.$history.find('.has-details:first').addClass('first-of-details')
  }

  const tabClick = function () {
    const $this = $(this)
    const tab = $this.attr('data-tab')

    instance.$tabs.removeClass('selected')
    $this.addClass('selected')

    instance.$history
      .removeClass('hide-details')
      .removeClass('hide-notes')

    if (tab === 'notes') {
      instance.$history.addClass('hide-details')
    } else if (tab === 'details') {
      instance.$history.addClass('hide-notes')
    }
  }

  return HistoryTabs
}())
