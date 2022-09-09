/**
 * A model representing all possible configurations
 * that can be done from embedded script. Those settings
 * are passed around in application via Context.
 */
export const AppConfigurations = {
  debug: Boolean,
  serviceBaseUrl: String,
  appId: String,
  minimized: Boolean,
  disableDarkMode: Boolean,
  styles: {
    classNameContainer: String,
  },
  element: null, // HTMLElement
};
