<?php
include 'fxn.php';

if (isset($_POST["Country"])) {
  $temp_cid = $_POST["Country"];
  $result = getThis("SELECT `id`, `name` FROM `states` WHERE `country_id`=$temp_cid ORDER BY `name` ASC");
  echo json_encode($result);
}

$hospitalID = $_SESSION['UID'];
if (isset($_POST["room"])) {
  $temp_rid = $_POST["room"];
  $result = getThis("SELECT `id`, `bedNumber`,`bedUsability`, `equipmentAvailable` FROM `beds` WHERE `roomId`='$temp_rid' AND `hospitalID` = '$hospitalID' AND `enabled` = '0' ");
  // $result = getThis("SELECT `id`, `fullName` FROM `doctors` WHERE `departmentID`='$temp_did'  ");

  for ($i = 0; $i < sizeof($result); $i++) {
    $result[$i]['bedNumber'] = e_d('d', $result[$i]['bedNumber']);
    $result[$i]['bedUsability'] = e_d('d', $result[$i]['bedUsability']);
    $result[$i]['equipmentAvailable'] = e_d('d', $result[$i]['equipmentAvailable']);
  }
  echo json_encode($result);
}


if (isset($_POST["State"])) {
  $temp_sid = $_POST["State"];
  $result = getThis("SELECT `id`, `name` FROM `cities` WHERE `state_id`=$temp_sid ORDER BY `name` ASC");
  echo json_encode($result);
}
?>