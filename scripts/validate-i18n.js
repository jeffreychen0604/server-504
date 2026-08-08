#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = process.cwd();
const locales = ['en', 'fr', 'es', 'pt', 'ko', 'vi'];
const errors = [];
const error = (message, file = '') => errors.push({ message, file });
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

// Load the browser i18n contract in a small sandbox.
const sandbox = {
  window: {},
  document: { documentElement: { lang: 'en' } },
  localStorage: { getItem: () => null },
  console
};
vm.createContext(sandbox);
try {
  vm.runInContext(read('assets/i18n.js'), sandbox, { filename: 'assets/i18n.js' });
} catch (e) {
  error(`Unable to evaluate i18n contract: ${e.message}`, 'assets/i18n.js');
}

const i18n = sandbox.window.Server504I18N;
if (!i18n) {
  error('window.Server504I18N was not created', 'assets/i18n.js');
} else {
  const actualSupported = Array.from(i18n.supported || []);
  if (JSON.stringify(actualSupported) !== JSON.stringify(locales)) {
    error(`Supported locale list must be exactly: ${locales.join(', ')}`, 'assets/i18n.js');
  }

  const englishKeys = Object.keys(i18n.strings?.en || {}).sort();
  if (!englishKeys.length) error('English UI dictionary is empty', 'assets/i18n.js');

  for (const locale of locales) {
    const dict = i18n.strings?.[locale];
    if (!dict) {
      error(`Missing UI dictionary: ${locale}`, 'assets/i18n.js');
      continue;
    }
    const keys = Object.keys(dict).sort();
    const missing = englishKeys.filter(key => !keys.includes(key));
    const extra = keys.filter(key => !englishKeys.includes(key));
    if (missing.length) error(`${locale} missing UI key(s): ${missing.join(', ')}`, 'assets/i18n.js');
    if (extra.length) error(`${locale} has unexpected UI key(s): ${extra.join(', ')}`, 'assets/i18n.js');
    for (const key of englishKeys) {
      if (!String(dict[key] ?? '').trim()) error(`${locale}.${key} is empty`, 'assets/i18n.js');
    }
  }
}

// Public language selector must expose the same six locales.
const index = read('index.html');
const selectMatch = index.match(/<select[^>]+id=["']languageSelect["'][\s\S]*?<\/select>/i);
if (!selectMatch) {
  error('Language selector is missing', 'index.html');
} else {
  const values = [...selectMatch[0].matchAll(/<option\s+value=["']([^"']+)["']/gi)].map(m => m[1]);
  if (JSON.stringify(values) !== JSON.stringify(locales)) {
    error(`Language selector options must be exactly: ${locales.join(', ')}`, 'index.html');
  }
}

const i18nPos = index.indexOf('./assets/i18n.js');
const appPos = index.indexOf('./assets/app.js');
if (i18nPos < 0) error('i18n runtime is missing from public entrypoint', 'index.html');
if (appPos < 0) error('app runtime is missing from public entrypoint', 'index.html');
if (i18nPos >= 0 && appPos >= 0 && i18nPos > appPos) error('i18n runtime must load before app.js', 'index.html');

// Governance documents are fully localized for all public locales.
for (const locale of locales) {
  for (const file of ['charter.md', 'operational-codex.md']) {
    const rel = `content/${locale}/${file}`;
    if (!fs.existsSync(path.join(root, rel))) {
      error(`Missing localized governance document for ${locale}: ${file}`, rel);
      continue;
    }
    const text = read(rel);
    if (!/^#\s+.+/m.test(text)) error(`Localized document is missing an H1`, rel);
    if (text.length < 1000) error(`Localized document looks unexpectedly short`, rel);
  }
}

// Wiki localization metadata must remain attached to real manifest slugs.
let manifest;
let titles;
try { manifest = JSON.parse(read('content/wiki-manifest.json')); }
catch (e) { error(`Invalid Wiki manifest JSON: ${e.message}`, 'content/wiki-manifest.json'); }
try { titles = JSON.parse(read('content/wiki-titles.json')); }
catch (e) { error(`Invalid Wiki title map JSON: ${e.message}`, 'content/wiki-titles.json'); }

if (manifest && titles) {
  const slugs = new Set((manifest.articles || []).map(article => article.slug));
  const localizedLocales = locales.filter(x => x !== 'en');

  for (const [slug, mapping] of Object.entries(titles.titles || {})) {
    if (!slugs.has(slug)) error(`Localized title references unknown Wiki slug: ${slug}`, 'content/wiki-titles.json');
    for (const locale of localizedLocales) {
      if (!String(mapping?.[locale] || '').trim()) {
        error(`Localized Wiki title ${slug} is missing ${locale}`, 'content/wiki-titles.json');
      }
    }
    for (const locale of Object.keys(mapping || {})) {
      if (!localizedLocales.includes(locale)) error(`Unsupported locale in Wiki title map: ${slug}.${locale}`, 'content/wiki-titles.json');
    }
  }

  const categoryIds = (manifest.categories || []).map(category => category.id);
  for (const locale of locales) {
    const categories = i18n?.categoryStrings?.[locale];
    if (!categories) {
      error(`Missing Wiki category localization for ${locale}`, 'assets/i18n.js');
      continue;
    }
    for (const id of categoryIds) {
      const value = categories[id];
      if (!Array.isArray(value) || value.length !== 2 || !value.every(x => String(x).trim())) {
        error(`Invalid Wiki category localization: ${locale}.${id}`, 'assets/i18n.js');
      }
    }
  }

  const normalizeGroup = raw => {
    const group = String(raw || '').trim().toUpperCase();
    if (group.startsWith('HERO PROFILE')) return 'HERO PROFILE';
    if (group.startsWith('PET AGENT PROFILE')) return 'PET AGENT PROFILE';
    return group;
  };
  const groups = new Set((manifest.articles || []).map(article => normalizeGroup(article.group)));
  for (const locale of locales) {
    const map = i18n?.groupStrings?.[locale] || {};
    for (const group of groups) {
      if (!String(map[group] || '').trim()) error(`Missing Wiki group localization: ${locale}.${group}`, 'assets/i18n.js');
    }
  }
}

if (errors.length) {
  for (const item of errors) {
    const prefix = item.file ? ` file=${item.file}` : '';
    console.error(`::error${prefix}::${item.message}`);
  }
  console.error(`i18n validation failed with ${errors.length} blocking issue(s).`);
  process.exit(1);
}

console.log(`i18n validation passed: ${locales.length} UI locales; Charter/Codex localized for all locales; Wiki taxonomy/title contract valid.`);
