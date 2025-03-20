import _ from 'lodash';
import { LogManager } from 'oltb/src/oltb/js/managers/LogManager.js';
import { StateManager } from 'oltb/src/oltb/js/managers/StateManager.js';
import { TippyManager } from 'oltb/src/oltb/js/managers/TippyManager.js';
import { ConfigManager } from 'oltb/src/oltb/js/managers/ConfigManager.js';
import { LocalStorageKeys } from 'oltb/src/oltb/js/helpers/constants/LocalStorageKeys.js';
import { DefaultTranslation } from 'src/utils/Herramientas/DefaultTranslation';

const FILENAME = 'managers/TranslationManager.js';

const DefaultOptions = Object.freeze({
  url: '../assets/i18n',
});

const DefaultLanguage = Object.freeze({
  text: 'Spanish',
  value: 'es-es',
  translation: DefaultTranslation, // Dejamos la traducción como null inicialmente
});

const LocalStorageNodeName = LocalStorageKeys.translationManager;
const LocalStorageDefaults = Object.freeze({
  activeLanguageValue: DefaultLanguage.value,
});

class TranslationManager {
  static #activeLanguage;
  static #languages;
  static #localStorage;
  static #options;

  static async initAsync(options = {}) {
    this.#options = _.merge(_.cloneDeep(DefaultOptions), options);

    LogManager.logDebug(FILENAME, 'initAsync', 'Initialization started');

    this.#localStorage = StateManager.getAndMergeStateObject(
      LocalStorageNodeName,
      LocalStorageDefaults
    );

    this.#languages = [];

    const languageValues = this.#getLanguageValues();

    return this.#loadLanguagesAsync(languageValues);
  }

  static async #fetchLanguagesAsync(values) {
    const timestamp = Date.now().toString();
    const requests = values.map(async (value) => {
      return fetch(`${this.#options.url}/${value}.json?cache=${timestamp}`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          Accept: 'application/json',
        },
      }).then((result) => {
        return result.json();
      });
    });

    return await Promise.allSettled(requests);
  }

  static async #loadLanguagesAsync(values) {
    return this.#fetchLanguagesAsync(values).then((responses) => {
      responses.forEach((response) => {
        if (response.status === 'rejected') {
          LogManager.logWarning(FILENAME, 'loadLanguagesAsync', {
            info: 'Failed to load language(s)',
            reason: response.reason,
            status: response.status,
          });

          return;
        }

        const loadedValue = response.value.meta.value;

        if (!loadedValue) {
          LogManager.logWarning(FILENAME, 'loadLanguagesAsync', {
            info: 'Failed to find translation information in the meta section',
          });

          return;
        }

        const language = {
          text: loadedValue,
          value: loadedValue,
          translation: response.value,
        };

        if (language.value === DefaultLanguage.value) {
          DefaultLanguage.translation = language.translation;
        }

        this.#languages.push(language);
      });

      if (this.#languages.length <= 0) {
        LogManager.logWarning(FILENAME, 'loadLanguagesAsync', {
          info: 'No languages loaded, fallback to default language instance',
          value: DefaultLanguage.value,
        });

        this.#languages.push(_.cloneDeep(DefaultLanguage));
      }

      const storedLanguageValue = this.#localStorage.activeLanguageValue;
      const storedLanguage = this.#languages.find((language) => {
        return language.value === storedLanguageValue;
      });

      const activeLanguageValue = ConfigManager.getConfig().localization.active;
      const activeLanguage = this.#languages.find((language) => {
        return language.value === activeLanguageValue;
      });

      this.#activeLanguage =
        storedLanguage ?? activeLanguage ?? _.cloneDeep(DefaultLanguage);

      return Promise.resolve({
        filename: FILENAME,
        result: true,
      });
    });
  }

  static #getLanguageValues() {
    const values = [];
    const userValues = ConfigManager.getConfig().localization.languages;

    userValues.forEach((value) => {
      const exists = values.find((item) => {
        return item === value;
      });

      if (exists) {
        LogManager.logWarning(FILENAME, 'getLanguageValues', {
          info: 'Language already added to be loaded',
          value: value,
        });

        return;
      }

      values.push(value);
    });

    return values;
  }

  // -------------------------------------------------------------------
  // # Section: Changing Languages
  // -------------------------------------------------------------------

  static #applyLanguage() {
    const i18nKey = 'data-oltb-i18n';
    const elements = document.querySelectorAll(`[${i18nKey}]`);

    elements.forEach((element) => {
      const path = element.getAttribute(i18nKey);
      const value = this.get(path);

      // Note:
      // Tippy instances mus be handle first
      // This targets tool-buttons in the toolbar
      const tippyKey = 'data-tippy-content';
      if (element.hasAttribute(tippyKey)) {
        // Check if element should have pre or post content added
        const preValue = element.getAttribute('data-tippy-content-pre') || '';
        const postValue = element.getAttribute('data-tippy-content-post') || '';

        const concatedValue = `${preValue} ${value} ${postValue}`.trim();
        element.setAttribute(tippyKey, concatedValue);

        return;
      }

      // Note:
      // Tippy instances mus be handle first
      // This targets all runtime delegates where the title attribute holds the tippy
      const tippyClass = 'oltb-tippy';
      if (element.classList.contains(tippyClass)) {
        element.setAttribute('title', value);

        return;
      }

      // Note:
      // Input-fields with a placeholder value
      const placeholderKey = 'placeholder';
      if (element.hasAttribute(placeholderKey)) {
        element.setAttribute(placeholderKey, value);

        return;
      }

      // Note:
      // Default is to replace the innerHTML for normal elements
      element.innerHTML = value;
    });

    // Note:
    // The Tippy instances needs to be re-created
    TippyManager.applyLanguage();
  }

  // -------------------------------------------------------------------
  // # Section: Public API
  // -------------------------------------------------------------------

  static getDefaultLanguage() {
    return _.cloneDeep(DefaultLanguage);
  }

  static getLanguages() {
    return this.#languages;
  }

  static getActiveLanguage() {
    return this.#activeLanguage || _.cloneDeep(DefaultLanguage);
  }

  static setActiveLanguage(toLanguage) {
    if (this.#activeLanguage.value === toLanguage.value) {
      LogManager.logWarning(FILENAME, 'setActiveLanguage', {
        info: 'Aborting language change, selected language is already active',
        to: toLanguage.value,
        active: this.#activeLanguage.value,
      });

      return;
    }

    const language = this.#languages.find((language) => {
      return language.value === toLanguage.value;
    });

    if (!language || !_.has(language, ['translation'])) {
      LogManager.logWarning(FILENAME, 'setActiveLanguage', {
        info: 'Selected language not found',
        language: toLanguage,
      });

      return;
    }

    this.#activeLanguage = language;
    this.#localStorage.activeLanguageValue = language.value;

    // Note:
    // The apply method will do the actuall replacing of values in the UI
    this.#applyLanguage();

    // Note:
    // To remember the current chosen language after a reload/reopen of the browser
    StateManager.setStateObject(LocalStorageNodeName, this.#localStorage);
  }

  static get(path) {
    const keys = path.split('.');
    const language = this.getActiveLanguage();
    const result = _.get(language.translation, keys, path);

    // Note:
    // Check if the path is the same as result
    // If so then we failed to find a translation
    // Not all missing translations are found by this comparison
    // An object with many translations can be returned and the view/controller might try and access one
    // using the wrong name, this will cause 'empty'/undefined to be displayed in view
    if (result === path) {
      LogManager.logWarning(FILENAME, 'get', {
        info: 'No translation found',
        keys: keys,
        path: path,
      });
    }

    return result;
  }
}

export { TranslationManager };
