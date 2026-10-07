// Keyboard navigation, ported from renuo/renuo-chrome-workflow (app/scripts/redmine/global.ts).
// "%project%" resolves via the body class "project-<identifier>" (plugin pages lack it, so the
// /projects/:id path is the fallback), "%issue%" via the current /issues/:id path.
(function () {
  "use strict";

  var SEQUENCE_TIMEOUT_MS = 1000;

  var HOTKEYS = [
    { keys: "gh", target: "/", name: "Go to home" },
    { keys: "gi", target: "%project%/issues", name: "Go to project issues" },
    { keys: "gw", target: "%project%/wiki", name: "Go to project wiki" },
    { keys: "gr", target: "%project%/roadmap", name: "Go to project roadmap" },
    { keys: "gt", target: "%project%/time_entries", name: "Go to project time entries" },
    { keys: "go", target: "%project%", name: "Go to project overview" },
    { keys: "ga", target: "%project%/activity", name: "Go to project activity" },
    { keys: "gs", target: "%project%/settings", name: "Go to project settings" },
    { keys: "gc", target: "%project%/contacts", name: "Go to project contacts" },
    { keys: "n", target: "%project%/issues/new", name: "Create new issue" },
    { keys: "e", target: "%issue%/edit", name: "Edit issue" },
    { keys: "?", target: null, name: "Show help" }
  ];

  function resolveTarget(target, bodyClass, path) {
    var project = /(?:^|\s)project-([\w-]+)/.exec(bodyClass || "") || /^\/projects\/([\w-]+)/.exec(path || "");
    var issue = /^\/issues\/(\d+)/.exec(path || "");
    if (target.indexOf("%project%") === 0) return project && target.replace("%project%", "/projects/" + project[1]);
    if (target.indexOf("%issue%") === 0) return issue && target.replace("%issue%", "/issues/" + issue[1]);
    return target;
  }

  function matchHotkey(buffer) {
    var exact = null;
    var prefix = false;
    HOTKEYS.forEach(function (hotkey) {
      if (hotkey.keys === buffer) exact = hotkey;
      else if (hotkey.keys.indexOf(buffer) === 0) prefix = true;
    });
    return { exact: exact, prefix: prefix };
  }

  if (typeof module !== "undefined") {
    module.exports = { HOTKEYS: HOTKEYS, resolveTarget: resolveTarget, matchHotkey: matchHotkey };
    return;
  }

  var buffer = "";
  var bufferTimer = null;

  function resetBuffer() {
    buffer = "";
    clearTimeout(bufferTimer);
  }

  function isEditable(target) {
    return target && (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable);
  }

  function helpModal() {
    return document.getElementById("hotkey-modal");
  }

  function hideHelp() {
    var modal = helpModal();
    if (modal) modal.remove();
  }

  function displayHelp() {
    var overlay = document.createElement("div");
    overlay.id = "hotkey-modal";
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) hideHelp();
    });
    var box = document.createElement("div");
    box.className = "hotkey-modal-inner";
    var heading = document.createElement("h3");
    heading.textContent = "Keyboard shortcuts";
    box.appendChild(heading);
    var list = document.createElement("dl");
    HOTKEYS.forEach(function (hotkey) {
      var dt = document.createElement("dt");
      hotkey.keys.split("").forEach(function (key) {
        var kbd = document.createElement("kbd");
        kbd.textContent = key;
        dt.appendChild(kbd);
      });
      var dd = document.createElement("dd");
      dd.textContent = hotkey.name;
      list.appendChild(dt);
      list.appendChild(dd);
    });
    box.appendChild(list);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    if (event.key === "Escape") {
      hideHelp();
      resetBuffer();
      return;
    }

    if (isEditable(event.target)) return;

    if (event.key === "?") {
      event.preventDefault();
      resetBuffer();
      if (helpModal()) hideHelp(); else displayHelp();
      return;
    }

    if (helpModal() || !/^[a-z]$/.test(event.key)) return;

    buffer += event.key;
    var match = matchHotkey(buffer);
    if (match.exact) {
      event.preventDefault();
      resetBuffer();
      var url = resolveTarget(match.exact.target, document.body.className, window.location.pathname);
      if (url) window.location.assign(url);
      return;
    }
    if (!match.prefix) {
      resetBuffer();
      return;
    }
    clearTimeout(bufferTimer);
    bufferTimer = setTimeout(resetBuffer, SEQUENCE_TIMEOUT_MS);
  });
})();
