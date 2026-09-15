const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const documents = ["README.md", "README.en.md", "README.zh-CN.md"].map(read);
const english = read("README.en.md");

function commandFences(source) {
  return [...source.matchAll(/```(bash|powershell)\n([\s\S]*?)```/g)]
    .map((match) => `${match[1]}\n${match[2].trim()}`);
}

function linkTargets(source) {
  const markdown = [...source.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)].map((match) => match[1]);
  const html = [...source.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  return [...new Set([...markdown, ...html])].sort();
}

test("Japanese remains the default README and the legacy entry points to it", () => {
  assert.match(read("README.md"), /<h1[^>]*>.*日本語版<\/h1>/);
  assert.match(read("README.ja.md"), /\[README\.md\]\(README\.md\)/);
  for (const source of documents) {
    assert.match(source, /href="README\.md">日本語<\/a>/);
    assert.match(source, /href="README\.en\.md">English<\/a>/);
    assert.match(source, /href="README\.zh-CN\.md">简体中文<\/a>/);
  }
});

test("fork README translations keep identical commands and link targets", () => {
  for (const source of documents) {
    assert.deepEqual(commandFences(source), commandFences(english));
    assert.deepEqual(linkTargets(source), linkTargets(english));
  }
});

test("README source instructions use the fork while installers use upstream releases", () => {
  for (const source of documents) {
    assert.match(source, /git clone https:\/\/github\.com\/MatsuiRyusei\/codex-chatgpt-web-jp\.git/);
    assert.match(source, /\ncd codex-chatgpt-web-jp && \\\n/);
    assert.doesNotMatch(source, /git clone https:\/\/github\.com\/miuuyy\/codex-chatgpt-web\.git/);
    assert.match(source, /https:\/\/github\.com\/miuuyy\/codex-chatgpt-web\/releases\/latest\/download\/install-launcher\.sh/);
    assert.match(source, /https:\/\/github\.com\/miuuyy\/codex-chatgpt-web\/releases\/latest\/download\/install-launcher\.ps1/);
    assert.match(source, /https:\/\/github\.com\/MatsuiRyusei\/codex-chatgpt-web-jp\/actions\/workflows\/ci\.yml/);
  }
});

test("all README translations document the manual Zero Risk mode and its connector", () => {
  for (const source of documents) {
    assert.match(source, /\| \*\*Zero Risk\*\* \|/);
    assert.match(source, /`Codex Zero Risk`/);
  }
});
