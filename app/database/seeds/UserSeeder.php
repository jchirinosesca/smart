<?php
 
class UserSeeder
  extends DatabaseSeeder
{
  public function run()
  {
    $users = [
      [
        "nombres" => "juan carlos",
        "apellidos" => "rojas toralva",
        "dni" => "45531656",
        "direccion" => "lima",
        "numero_telefono" => "964142677",
        "username" => "carlos3434",
        "password" => Hash::make("123456"),
        "genero" => 'M',
        "group_id" => 1,
        "verified" => 1,
        "email"    => "chris@example.com"
      ]
    ];
  
    foreach ($users as $user) {
      User::create($user);
    }
  }
}