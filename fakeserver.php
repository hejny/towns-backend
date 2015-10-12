<?php

    header('content-type: application/jsonp');

    if($_GET['callback'])
        $callback=$_GET['callback'];
    else
        $callback='callback';


    echo($callback.'(');
    readfile('objects.json');
    echo(');');
