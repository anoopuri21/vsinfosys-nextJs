import { initNavigation } from './modules/navigation.js';
import { initScrollExperience } from './modules/scroll.js';
import { initCapabilities } from './modules/capabilities.js';
import { initLifecycle } from './modules/lifecycle.js';
import { initLab } from './modules/lab.js';
import { initInteractions } from './modules/interactions.js';
import { initProjectForm } from './modules/form.js';

const start = () => {
  document.querySelector('[data-year]').textContent = new Date().getFullYear();
  initNavigation();
  initScrollExperience();
  initCapabilities();
  initLifecycle();
  initLab();
  initInteractions();
  initProjectForm();
};

document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
