<?php

require $_SERVER['DOCUMENT_ROOT'] . '/php/app.php';

if (isset($_POST['email'])) {
    $em = clean($_POST['email'], "lo");
    $em = filter_var($em, FILTER_SANITIZE_EMAIL);

    if (!filter_var($em, FILTER_VALIDATE_EMAIL)) {
        $ms = "No valid email in post";
        goto end;
    } else {
        $ems = spe($em, 'e');
        $eme = enc($ems, 'e');
        $emh = xhash($eme);

        $uex = ckex(
            // check if email from post exists in db
            $sv,
            $un,
            $pw,
            $db, $sel = 'email',
            $tn, $whr = 'email', $val = $ems
        );

        if ($uex) {
            //~ Email in DB -> already existing userv in db -> end

            $jres = "ux";
            goto end;
        } else {
            //~ Email not in DB -> visitor -> create user

            $conn = mysqli_connect($sv, $un, $pw, $db);
            if (mysqli_connect_errno()) {
                $ms = 'ERROR: No conn to db "'
                . $db . '" - ' . mysqli_connect_error();
                goto end;
            }

            // prep user name from post for db entry
            $unm = clean($_POST['unm'], 'fl');
            $unm = spe($unm, 'e');

            // prep pass from post for db entry
            $pass = clean($_POST['pass'], false);
            $pass = spe($pass, 'e');
            $pass = enc($pass, 'e');
            $pass = xhash($pass);

            $sql = "INSERT INTO " . $tn
                . " (user,email,password) VALUES
                    ('" . $unm . "','" . $ems . "','" . $pass . "')";
            if (!mysqli_query($conn, $sql)) {
                $ms = 'ERROR: Usr not created - ' . mysqli_error($conn);
                goto end;
            } else {
                $jres = "uc";
                goto end;
            }
        }
    }
}

end:

if ($ms) {
    lg($lg, $p, $tm, $ms);
}

if (isset($conn->server_info)) {
    mysqli_close($conn);
}

echo $jres;