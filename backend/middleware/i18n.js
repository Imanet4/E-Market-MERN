const i18n = require('i18n');

/**
 * Internationalization middleware
 * Supports English, French, and Arabic for Moroccan market
 */

// Configure i18n
i18n.configure({
  locales: ['en', 'fr', 'ar'],
  directory: __dirname + '/../locales',
  defaultLocale: 'en',
  queryParameter: 'lang',
  autoReload: true,
  syncFiles: true,
  objectNotation: true,
  // Arabic specific configuration
  register: global,
  logWarnFn: function (msg) {
    console.log('i18n WARN: ', msg);
  },
  logErrorFn: function (msg) {
    console.log('i18n ERROR: ', msg);
  }
});

/**
 * Middleware to detect and set language
 * Uses query parameter, then Accept-Language header, then cookie
 */
const detectLanguage = (req, res, next) => {
  // Check query parameter first
  if (req.query.lang && ['en', 'fr', 'ar'].includes(req.query.lang)) {
    i18n.setLocale(req, req.query.lang);
    res.cookie('lang', req.query.lang, { maxAge: 900000, httpOnly: true });
  } 
  // Check cookie next
  else if (req.cookies.lang && ['en', 'fr', 'ar'].includes(req.cookies.lang)) {
    i18n.setLocale(req, req.cookies.lang);
  }
  // Check Accept-Language header
  else if (req.headers['accept-language']) {
    const acceptedLanguages = req.headers['accept-language'].split(',');
    const preferredLang = acceptedLanguages[0].split('-')[0];
    if (['en', 'fr', 'ar'].includes(preferredLang)) {
      i18n.setLocale(req, preferredLang);
    }
  }
  
  // Make i18n available in templates and responses
  res.locals.__ = res.__ = function() {
    return i18n.__.apply(req, arguments);
  };
  
  next();
};

/**
 * Middleware to set language explicitly
 */
const setLanguage = (req, res, next) => {
  const { lang } = req.body;
  
  if (lang && ['en', 'fr', 'ar'].includes(lang)) {
    i18n.setLocale(req, lang);
    res.cookie('lang', lang, { 
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true 
    });
    
    return res.json({
      success: true,
      message: `Language changed to ${lang}`,
      data: { language: lang }
    });
  }
  
  return res.status(400).json({
    success: false,
    message: 'Invalid language code. Supported: en, fr, ar'
  });
};

/**
 * Utility function to get translated field
 * Falls back to default language if translation not available
 */
const getTranslatedField = (obj, field, locale) => {
  const translatedField = `${field}Translations`;
  
  if (obj[translatedField] && obj[translatedField][locale]) {
    return obj[translatedField][locale];
  }
  
  // Fallback to default field
  return obj[field];
};

/**
 * Middleware to add language to response
 */
const addLanguageContext = (req, res, next) => {
  // Add current language to response
  res.set('Content-Language', i18n.getLocale(req));
  next();
};

module.exports = {
  i18nMiddleware: i18n.init,
  detectLanguage,
  setLanguage,
  getTranslatedField,
  addLanguageContext
};