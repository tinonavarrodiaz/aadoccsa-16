<?php
$nombre = $_POST["nombre"];
$telefono = $_POST["telefono"];
$email = $_POST["email"];
$mensaje = $_POST['mensaje'] ;

$mensaje = "Nombre:      ". $_POST['nombre'] . "\n\n";
$mensaje .= "Telefono:    ". $_POST['telefono'] . "\n\n";
$mensaje .= "Email:       ". $_POST['email'] . "\n\n\n";
$mensaje .= "Mensaje:     ". $_POST['mensaje'] . "\n\n";

$cabecera = "From: $nombre <$email> \r\n";
$cabecera .= "Reply-To: $email";

echo $mensaje;
echo $nombre;
echo $telefono;
echo $mail;


// if(mail("tino@sigmaocs.com.mx", "Formuario desde aadoccsa.com.mx", $mensaje, $cabecera)){
// 	echo true;
// 	header ("Location: /");
// }
// else{
// 	echo false;
// 	header ("Location: ../contacto.html");
// }
