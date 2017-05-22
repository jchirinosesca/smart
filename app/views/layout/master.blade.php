<!DOCTYPE html>
<html lang=”en”>
    <head>
        <meta charset="UTF-8" />
        <meta name="token" id="token" value="{{ csrf_token() }}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
        
        @section('autor')
          <meta name="author" content="Sistemas">
        @show
        
        <link rel="shortcut icon" href="favicon.ico">

        @section('descripcion')
          <meta name="description" content="">
        @show
        <title>
          @section('titulo')
            Rest
          @show
        </title>

        @section('includes')
            <!-- {{ HTML::style('lib/bootstrap-3.3.1/css/bootstrap.min.css') }}-->
            <!-- {{ HTML::script('lib/jquery-2.1.3.min.js') }}-->

            <!-- Basic Styles -->
            <link rel="stylesheet" type="text/css" media="screen" href="css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" media="screen" href="css/font-awesome.min.css">

            <!-- SmartAdmin Styles : Caution! DO NOT change the order -->
            <link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-production-plugins.min.css">
            <link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-production.min.css">
            <link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-skins.min.css">

            <!-- SmartAdmin RTL Support  -->
            <link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-rtl.min.css">

            <!-- We recommend you use "your_style.css" to override SmartAdmin
                 specific styles this will also ensure you retrain your customization with each SmartAdmin update.
            <link rel="stylesheet" type="text/css" media="screen" href="css/your_style.css"> -->

            <!-- Demo purpose only: goes with demo.js, you can delete this css when designing your own WebApp -->
            <link rel="stylesheet" type="text/css" media="screen" href="css/demo.min.css">

            <!-- FAVICONS -->
            <link rel="shortcut icon" href="img/favicon/favicon.ico" type="image/x-icon">
            <link rel="icon" href="img/favicon/favicon.ico" type="image/x-icon">

            <!-- GOOGLE FONT -->
            <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700">

            <!-- Specifying a Webpage Icon for Web Clip 
               Ref: https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html -->
            <link rel="apple-touch-icon" href="img/splash/sptouch-icon-iphone.png">
            <link rel="apple-touch-icon" sizes="76x76" href="img/splash/touch-icon-ipad.png">
            <link rel="apple-touch-icon" sizes="120x120" href="img/splash/touch-icon-iphone-retina.png">
            <link rel="apple-touch-icon" sizes="152x152" href="img/splash/touch-icon-ipad-retina.png">
            
            <!-- iOS web-app metas : hides Safari UI Components and Changes Status Bar Appearance -->
            <meta name="apple-mobile-web-app-capable" content="yes">
            <meta name="apple-mobile-web-app-status-bar-style" content="black">
            
            <!-- Startup image for web apps -->
            <link rel="apple-touch-startup-image" href="img/splash/ipad-landscape.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)">
            <link rel="apple-touch-startup-image" href="img/splash/ipad-portrait.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)">
            <link rel="apple-touch-startup-image" href="img/splash/iphone.png" media="screen and (max-device-width: 320px)">
        @show

    </head>
    <!-- 
    <body>
        include("header")
        <div class="content">
            <div class="container">
                yield("content")
            </div>
        </div>
        include("footer")
    </body>-->
    <body class="">
      <!-- HEADER -->
      <header id="header">
          @include("layout.header")

      </header>
      <!-- END HEADER -->

      <!-- Left panel : Navigation area -->
      <!-- Note: This width of the aside area can be adjusted through LESS variables -->
      <aside id="left-panel">
        @include("layout.aside")
      </aside>
      <!-- END NAVIGATION -->

    <!-- MAIN PANEL -->
    <div id="main" role="main">

        @yield('main')

        @stack('formulario')

    </div>
    <!-- END MAIN PANEL -->

    <!-- PAGE FOOTER -->
    <div class="page-footer">
      @include("layout.footer")
      
    </div>
    <!-- END PAGE FOOTER -->

    <!-- SHORTCUT AREA : With large tiles (activated via clicking user name tag)
    Note: These tiles are completely responsive,
    you can add as many as you like
    -->
    @include("layout.flotante")
    
    <!-- END SHORTCUT AREA -->

    <!--================================================== -->

    <!-- PACE LOADER - turn this on if you want ajax loading to show (caution: uses lots of memory on iDevices)-->
    @section('scripts')
        @include('layout.partials.scripts')
    @show
   
  </body>
</html>