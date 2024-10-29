<?php

    if (!function_exists('InstaGraphQLResonse')) {
        function InstaGraphQLResonse($uid) {
            $url = 'https://www.instagram.com/graphql/query/?query_hash=56a7068fea504063273cc2120ffd54f3&variables={"id":"'. $uid .'","first":1,"after":""}';
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36']);
            $c = curl_exec($ch);
            curl_close($ch);
            return $c;
        }
    }

    if(isset($_GET['uid'])) {
        echo(InstaGraphQLResonse($_GET['uid']));
    }

?>