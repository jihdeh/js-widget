import { h, render } from 'preact';
import App from './components/app';

import loader from './loader';
import { AppConfigurations } from './models';

/**
 * Default configurations that are overridden by
 * parameters in embedded script.
 */
const defaultConfig = AppConfigurations;

// main entry point - calls loader and render Preact app into supplied element
loader(window, defaultConfig, window.document.currentScript, (el, config) =>
  render(h(App, { ...config }), el)
);
