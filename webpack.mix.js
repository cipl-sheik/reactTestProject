const mix = require('laravel-mix');

mix.js('resources/js/index.js', 'public/js')
   .js('resources/js/components/UserDetails.jsx', 'public/js')
   .react()
   .js('resources/js/components/PreviousAddress.jsx', 'public/js')
   .react()
   .sass('resources/scss/main.scss', 'public/css')
   .copy('resources/images', 'public/images');


