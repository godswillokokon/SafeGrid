<?php
require_once dirname(__FILE__) . '/vendor/autoload.php';

use API\Middleware\CORS;
use API\Middleware\Authentication;
 session_start();//Start A Session
// Init application mode
if (empty($_ENV['SLIM_MODE'])) {
    $_ENV['SLIM_MODE'] = (getenv('SLIM_MODE'))
    ? getenv('SLIM_MODE') : 'development';
}

$config = array();

require_once dirname(__FILE__) . '/config/' . $_ENV['SLIM_MODE'] . '.php';

$app = new \Slim\App(['settings' => $config]);

$container = $app->getContainer();
// Init database
$db              = null;
$container['db'] = function ($c) {
    $db  = $c['settings']['db'];
    $pdo = new PDO($db['dsn'], $db['username'], $db['password']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;
};
/*Eloquent Database Service*/
$container['eloquentDBContainer'] = function ($container) {
    $capsule = new \Illuminate\Database\Capsule\Manager;
    $capsule->addConnection($container['settings']['eloquentDB']);
    $capsule->setAsGlobal();
    $capsule->bootEloquent();
    return $capsule;
};
/*Controller Injections Service*/
// $container[API\Controller\TestController::class] = function ($container) {
//     $table = $container->get('eloquentDBContainer')->table('customers');

//     return new API\Controller\TestController($table);
// };
// $container[API\Controller\BranchController::class] = function ($container) {
//     $table = $container->get('eloquentDBContainer')->table('branches');

//     return new API\Controller\BranchController($table);
// };
// $container[API\Controller\CompanyController::class] = function ($container) {
//     $table = $container->get('eloquentDBContainer');

//     return new API\Controller\CompanyController($table);
// };


// $container[API\Controller\TestController::class] = function ($container) {
//     $table = $container->get('eloquentDBContainer')->table('customers');

//     return new API\Controller\TestController($table);
// };
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

// CORS Middleware
$app->add(new CORS());

// Auth Middleware
// $app->add(new API\Middleware\Authentication($db, array('root' => '/api/v1'),$container));
