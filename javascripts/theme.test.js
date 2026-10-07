const test = require("node:test");
const assert = require("node:assert/strict");
const { HOTKEYS, resolveTarget, matchHotkey } = require("./theme.js");

test("resolves %project% from the body class", () => {
  assert.equal(resolveTarget("%project%/issues", "controller-issues action-show project-renuo-redmine", "/issues/42"), "/projects/renuo-redmine/issues");
  assert.equal(resolveTarget("%project%", "project-foo", "/projects/foo"), "/projects/foo");
  assert.equal(resolveTarget("%project%/contacts", "project-foo", "/"), "/projects/foo/contacts");
});

test("falls back to the project identifier in the path", () => {
  assert.equal(resolveTarget("%project%", "controller-contacts action-index", "/projects/foo/contacts"), "/projects/foo");
});

test("does not resolve %project% without a current project", () => {
  assert.equal(resolveTarget("%project%/issues", "controller-projects action-index", "/projects"), null);
  assert.equal(resolveTarget("%project%/issues", "theme-project-ish", "/"), null);
});

test("resolves %issue% from the path only on issue pages", () => {
  assert.equal(resolveTarget("%issue%/edit", "project-foo", "/issues/123"), "/issues/123/edit");
  assert.equal(resolveTarget("%issue%/edit", "project-foo", "/projects/foo/issues"), null);
});

test("passes plain targets through", () => {
  assert.equal(resolveTarget("/", "", "/anything"), "/");
});

test("matches exact sequences and prefixes", () => {
  assert.equal(matchHotkey("g").exact, null);
  assert.equal(matchHotkey("g").prefix, true);
  assert.equal(matchHotkey("gi").exact.target, "%project%/issues");
  assert.equal(matchHotkey("gc").exact.target, "%project%/contacts");
  assert.equal(matchHotkey("x").exact, null);
  assert.equal(matchHotkey("x").prefix, false);
});

test("hotkey sequences are unique", () => {
  const keys = HOTKEYS.map((h) => h.keys);
  assert.equal(new Set(keys).size, keys.length);
});
