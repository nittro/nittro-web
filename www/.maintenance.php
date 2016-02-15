<?php

header('HTTP/1.1 503 Service Unavailable');
header('Retry-After: 300'); // 5 minutes in seconds

?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="robots" content="noindex">
        <meta name="generator" content="Nette Framework">

        <style>
            html, body { margin: 0; padding: 0; width: 100vw; min-height: 100vh; }
            body { color: rgba(255,255,255,0.55); background: #312450 url('data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwMHB4IiBoZWlnaHQ9IjUwMHB4IiB2aWV3Qm94PSIwIDAgMTAwMCA1MDAiIHpvb21BbmRQYW49ImRpc2FibGUiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbbGluZXtzdHJva2U6cmdiYSgyNTUsMjU1LDI1NSwwLjA1KTtzdHJva2Utd2lkdGg6MXB4O31dXT48L3N0eWxlPjxsaW5lIHgxPSIxMTAwIiB5MT0iNTAwIiB4Mj0iLTEwMDAiIHkyPSIyNTAiIC8+PGxpbmUgeDE9IjExMDAiIHkxPSI1MDAiIHgyPSItMTAwMCIgeTI9Ii0xMDAiIC8+PGxpbmUgeDE9IjExMDAiIHkxPSI1MDAiIHgyPSItMTAwMCIgeTI9Ii01MDAiIC8+PGxpbmUgeDE9IjExMDAiIHkxPSI1MDAiIHgyPSItMjUwIiB5Mj0iLTUwMCIgLz48bGluZSB4MT0iMTEwMCIgeTE9IjUwMCIgeDI9IjMwMCIgeTI9Ii01MDAiIC8+PGxpbmUgeDE9IjExMDAiIHkxPSI1MDAiIHgyPSI3NTAiIHkyPSItNTAwIiAvPjxsaW5lIHgxPSIxNzUwIiB5MT0iMCIgeDI9Ijc1MCIgeTI9IjUwMCIgLz48bGluZSB4MT0iMTUwMCIgeTE9IjAiIHgyPSI1MDAiIHkyPSI1MDAiIC8+PGxpbmUgeDE9IjExNTAiIHkxPSIwIiB4Mj0iMTUwIiB5Mj0iNTAwIiAvPjxsaW5lIHgxPSI3MDAiIHkxPSIwIiB4Mj0iLTMwMCIgeTI9IjUwMCIgLz48bGluZSB4MT0iMTUwIiB5MT0iMCIgeDI9Ii04NTAiIHkyPSI1MDAiIC8+PC9zdmc+') right top / 100% 100% no-repeat fixed; display: -webkit-flex; display: flex; }
            div { margin: auto; }
            h1 { font: bold 47px/1.5 sans-serif; color: #fff; margin: .6em 0 }
            p { font: 21px/1.5 Georgia,serif; margin: 1.5em 0 }
        </style>

        <title>Site is temporarily down for maintenance</title>
    </head>
    <body>
        <div>
            <h1>We're Sorry</h1>
            <p>The site is temporarily down for maintenance.<br />Please try again in a few minutes.</p>
        </div>
    </body>
</html>
<?php

exit;
