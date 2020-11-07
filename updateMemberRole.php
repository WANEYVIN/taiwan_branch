<?php
/**
 * Created by PhpStorm.
 * User: super
 * Date: 2020/7/15
 * Time: 上午 11:24
 * This is to import the staff list to a specific task and wait for approval process
 */
//echo "USE CLASS111<br>";

require_once 'vendor/autoload.php';


$db = new MysqliDb (SERVER, USER, PASSWORD,'test');


// check if duplicated ID number first

                if($_POST) {


                    $update = Array(
//                        'member_sn' => null,
                        'member_name' => $_POST[name],
                        'member_id' => $_POST[id],
                        'member_openid' => $_POST[openid],
                        'member_address' => $_POST[addr],
                        'member_gender' => $_POST[gender],
                        'member_nationality' => $_POST[nationality],
                        'member_birthday' => $_POST[birthday],
                        'member_marrige' => $_POST[marrige],
                        'member_certificate' => $_POST[certificates],
                        'member_registered_addr' => $_POST[home_addr],
                        'member_phone_num' => $_POST[phone_num],
                        'member_role' => $_POST[role],
                        'member_application' => $_POST[application],
                        'member_bank' => $_POST[bank],
                        'member_bank_name' => $_POST[bank_name],
                        'member_bank_branch' => $_POST[bank_branch],
                        'member_ID_expiration' => $_POST[ID_expiration],

                    );


                    $db->where ('member_id', $_POST[id]);
                    if ($db->update ('members', $update)){
                        echo "1";
//                        echo $db->count . ' records were updated';
                    }else{
                        echo "0";
//                        echo 'update failed: ' . $db->getLastError();

                    }



//
//
//                    $id = $db->insert('members', $import);
//
//                    if($id){
////                        echo array($_POST[id],$_POST[name]);
//                        echo $_POST[id];
//                    }else{
//                        echo "problem error number: <br>" .$db->getLastError();
//
//                    }



//                    Duplicate entry '430523197603204314' for key 'member_id'


}

