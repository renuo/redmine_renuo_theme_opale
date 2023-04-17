var Opale = Opale || {} /* eslint no-var: "off", no-use-before-define: "off" */
/* global Raphael: false, revisionGraph: true */

Opale.RevisionGraph = function (holder, commitsHash, graphSpace) {
  'use strict'

  const XSTEP = 20
  const CIRCLE_INROW_OFFSET = 17
  const commitsByScmid = commitsHash
  const commits = $.map(commitsByScmid, function (val) { return val })
  const maxRdmid = commits.length - 1
  const commitTableRows = $('table.changesets tr.changeset')

  // create graph
  if (revisionGraph !== null) {
    revisionGraph.clear()
  } else {
    revisionGraph = new Raphael(holder)
  }

  const top = revisionGraph.set()

  // init dimensions
  const graphXOffset = commitTableRows.first().find('td').first().position().left - $(holder).position().left
  const graphYOffset = $(holder).position().top
  const graphRightSide = graphXOffset + (graphSpace + 1) * XSTEP
  const graphBottom = commitTableRows.last().position().top + commitTableRows.last().height() - graphYOffset

  revisionGraph.setSize(graphRightSide, graphBottom)

  // init colors
  const colors = [
    '#e74c3c',
    '#0b4162',
    '#019851',
    '#ed820c',
    '#4183c4'
  ]

  // get more colors if needed
  if (graphSpace >= colors.length) {
    Raphael.getColor.reset()

    for (let k = 0; k <= graphSpace; k++) {
      colors.push(Raphael.getColor(0.9))
    }
  }

  let parentCommit
  let x, y, parentX, parentY
  let path, title
  let revisionDotOverlay

  $.each(commits, function (index, commit) {
    // eslint-disable-next-line no-prototype-builtins
    if (!commit.hasOwnProperty('space')) {
      commit.space = 0
    }

    y = commitTableRows.eq(maxRdmid - commit.rdmid).position().top - graphYOffset + CIRCLE_INROW_OFFSET
    x = graphXOffset + XSTEP / 2 + XSTEP * commit.space

    revisionGraph
      .circle(x, y, 3.5)
      .attr({
        fill: colors[commit.space],
        stroke: 'none'
      })
      .toFront()

    // paths to parents
    $.each(commit.parent_scmids, function (index, parentScmid) {
      parentCommit = commitsByScmid[parentScmid]

      if (parentCommit) {
        // eslint-disable-next-line no-prototype-builtins
        if (!parentCommit.hasOwnProperty('space')) {
          parentCommit.space = 0
        }

        parentY = commitTableRows.eq(maxRdmid - parentCommit.rdmid).position().top - graphYOffset + CIRCLE_INROW_OFFSET
        parentX = graphXOffset + XSTEP / 2 + XSTEP * parentCommit.space

        if (parentCommit.space === commit.space) {
          // vertical path
          path = revisionGraph.path([
            'M', x, y,
            'V', parentY])
        } else {
          // path to a commit in a different branch (Bezier curve)
          path = revisionGraph.path([
            'M', x, y,
            'C', x, y, x, y + (parentY - y) / 2, x + (parentX - x) / 2, y + (parentY - y) / 2,
            'C', x + (parentX - x) / 2, y + (parentY - y) / 2, parentX, parentY - (parentY - y) / 2, parentX, parentY
          ])
        }
      } else {
        // vertical path ending at the bottom of the revisionGraph
        path = revisionGraph.path([
          'M', x, y,
          'V', graphBottom
        ])
      }

      path
        .attr({
          stroke: colors[commit.space],
          'stroke-width': 1.5
        })
        .toBack()
    })

    revisionDotOverlay = revisionGraph.circle(x, y, 10)
    revisionDotOverlay
      .attr({
        fill: '#000',
        opacity: 0,
        cursor: 'pointer',
        href: commit.href
      })

    if (commit.refs !== null && commit.refs.length > 0) {
      title = document.createElementNS(revisionGraph.canvas.namespaceURI, 'title')
      title.appendChild(document.createTextNode(commit.refs))
      revisionDotOverlay.node.appendChild(title)
    }

    top.push(revisionDotOverlay)
  })

  top.toFront()
}

$(function () {
  'use strict'

  if (window.drawRevisionGraph) {
    // override Redmine's function
    window.drawRevisionGraph = Opale.RevisionGraph
    // make graph redraw itself
    $(window).resize()
  }
})
