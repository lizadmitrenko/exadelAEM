const path = require('path');
const DIR_COMPONENTS = path.join(__dirname, '../src/components/');
const DIR_TEST_PAGES = path.join(__dirname, '../test-pages/pages/');
module.exports.pathsArray = [
    DIR_COMPONENTS + 'MainPage/Post',
    DIR_COMPONENTS + 'MainPage/Header',
    DIR_COMPONENTS + 'MainPage/Footer',
    DIR_TEST_PAGES,
];
