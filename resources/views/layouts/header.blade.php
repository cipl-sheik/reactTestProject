 <!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
    <!-- include your stylesheets and scripts here -->
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="csrf-token" content="{{ csrf_token() }}">
      <link href="{{ asset('css/main.css') }}" rel="stylesheet" type="text/css">

</head>
<body>
     <header>
     
         <div class="container"> 
            <div class="row">
               <div class="col-lg-12 col-12 text-center">
                  <img src="{{ asset('images/logo.png') }}" alt="">
               </div>
            </div>
         </div>
          
      </header>
       <section class="bnrsection">
@yield('content')
<section>
@include('layouts/footer')
</body>
</html>
