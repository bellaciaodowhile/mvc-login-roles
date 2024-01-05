-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-12-2023 a las 03:33:16
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `components`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `tipo` varchar(80) NOT NULL,
  `estado` varchar(80) NOT NULL,
  `idParent` varchar(80) NOT NULL,
  `idProject` varchar(22) NOT NULL,
  `global` varchar(22) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `tipo`, `estado`, `idParent`, `idProject`, `global`) VALUES
(148, 'No global de principito', 'categoria', 'active', 'base', '10', '10'),
(149, 'No global de p 2', 'categoria', 'active', 'base', '10', '10'),
(154, 'Dentro de widget', 'categoria', 'active', 'base', '9', '9'),
(155, 'Widget 2', 'subcategoria', 'active', '154', '9', '9'),
(156, 'widget 3', 'subcategoria', 'active', '155', '9', '9'),
(157, 'Categoría no global de peludito', 'categoria', 'active', 'base', '11', '11'),
(158, 'Perros', 'subcategoria', 'active', '157', '11', '11'),
(159, 'Gatitos', 'subcategoria', 'active', '157', '11', '11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `componentes`
--

CREATE TABLE `componentes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(77) NOT NULL,
  `html` longtext NOT NULL,
  `css` longtext NOT NULL,
  `js` longtext NOT NULL,
  `user` varchar(66) NOT NULL,
  `fecha` varchar(55) NOT NULL DEFAULT current_timestamp(),
  `idProject` varchar(22) NOT NULL,
  `category` varchar(22) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `componentes`
--

INSERT INTO `componentes` (`id`, `nombre`, `html`, `css`, `js`, `user`, `fecha`, `idProject`, `category`, `image`) VALUES
(89, 'Simple Loaders', '<div class=\"page\">\r\n	<header class=\"header\">\r\n		<h1 class=\"header-title\">Simple CSS loaders</h1>\r\n		<p class=\"header-subtitle\">single html element css animation</p>\r\n	</header>\r\n	\r\n	<main class=\"container\">\r\n		<div class=\"item\">\r\n			<i class=\"loader --2\"></i>\r\n		</div>\r\n		<div class=\"item\">\r\n			<i class=\"loader --9\"></i>\r\n		</div>\r\n		<div class=\"item\">\r\n			<i class=\"loader --3\"></i>\r\n		</div>\r\n		\r\n		<div class=\"item\">\r\n			<i class=\"loader --4\"></i>\r\n		</div>\r\n		<div class=\"item\">\r\n			<i class=\"loader --1\"></i>\r\n		</div>\r\n		<div class=\"item\">\r\n			<i class=\"loader --5\"></i>\r\n		</div>\r\n		\r\n		<div class=\"item\">\r\n			<i class=\"loader --6\"></i>\r\n		</div>\r\n		<div class=\"item\">\r\n			<i class=\"loader --8\"></i>\r\n		</div>\r\n		<div class=\"item\">\r\n			<i class=\"loader --7\"></i>\r\n		</div>\r\n	</main>\r\n</div>', '.loader {\r\n	--color: white;\r\n	--size-mid: 6vmin;\r\n	--size-dot: 1.5vmin;\r\n	--size-bar: 0.4vmin;\r\n	--size-square: 3vmin;\r\n	\r\n	display: block;\r\n	position: relative;\r\n	width: 50%;\r\n	display: grid;\r\n	place-items: center;\r\n}\r\n\r\n.loader::before,\r\n.loader::after {\r\n	content: \'\';\r\n	box-sizing: border-box;\r\n	position: absolute;\r\n}\r\n\r\n/**\r\n	loader --1\r\n**/\r\n.loader.--1::before {\r\n	width: var(--size-mid);\r\n	height: var(--size-mid);\r\n	border: 4px solid var(--color);\r\n	border-top-color: transparent;\r\n	border-radius: 50%;\r\n	animation: loader-1 1s linear infinite;\r\n}\r\n\r\n.loader.--1::after {\r\n	width: calc(var(--size-mid) - 2px);\r\n	height: calc(var(--size-mid) - 2px);\r\n	border: 2px solid transparent;\r\n	border-top-color: var(--color);\r\n	border-radius: 50%;\r\n	animation: loader-1 0.6s linear reverse infinite;\r\n}\r\n\r\n@keyframes loader-1 {\r\n	100% {\r\n		transform: rotate(1turn);\r\n	}\r\n}\r\n\r\n/**\r\n	loader --2\r\n**/\r\n.loader.--2::before,\r\n.loader.--2::after {\r\n	width: var(--size-dot);\r\n	height: var(--size-dot);\r\n	background-color: var(--color);\r\n	border-radius: 50%;\r\n	opacity: 0;\r\n	animation: loader-2 0.8s cubic-bezier(0.2, 0.32, 0, 0.87) infinite;\r\n}\r\n\r\n.loader.--2::after {\r\n	animation-delay: 0.3s;\r\n}\r\n\r\n@keyframes loader-2 {\r\n	0%, 80%, 100% {\r\n		opacity: 0;\r\n	}\r\n	\r\n	33% {\r\n		opacity: 1;\r\n	}\r\n	\r\n	0%, 100% {\r\n		transform: translateX(-4vmin);\r\n	}\r\n	\r\n	90% {\r\n		transform: translateX(4vmin);\r\n	}\r\n}\r\n\r\n/**\r\n	loader --3\r\n**/\r\n.loader.--3::before,\r\n.loader.--3::after {\r\n	width: var(--size-dot);\r\n	height: var(--size-dot);\r\n	background-color: var(--color);\r\n	border-radius: 50%;\r\n	animation: loader-3 1.2s ease-in-out infinite;\r\n}\r\n\r\n.loader.--3::before {\r\n	left: calc(50% - 1.6vmin - var(--size-dot));\r\n}\r\n\r\n.loader.--3::after {\r\n	left: calc(50%   1.6vmin);\r\n	animation-delay: -0.4s;\r\n}\r\n\r\n@keyframes loader-3 {\r\n	0%, 100% {\r\n		transform: translateY(-2.6vmin);\r\n	}\r\n	\r\n	44% {\r\n		transform: translateY(2.6vmin);\r\n	}\r\n}\r\n\r\n/**\r\n	loader --4\r\n**/\r\n.loader.--4::before {\r\n	height: var(--size-bar);\r\n	width: 6vmin;\r\n	background-color: var(--color);\r\n	animation: loader-4 0.8s cubic-bezier(0, 0, 0.03, 0.9) infinite;\r\n}\r\n\r\n@keyframes loader-4 {\r\n	0%, 44%, 88.1%, 100% {\r\n		transform-origin: left;\r\n	}\r\n	\r\n	0%, 100%, 88% {\r\n		transform: scaleX(0);\r\n	}\r\n	\r\n	44.1%, 88% {\r\n		transform-origin: right;\r\n	}\r\n	\r\n	33%, 44% {\r\n		transform: scaleX(1);\r\n	}\r\n}\r\n\r\n/**\r\n	loader --5\r\n**/\r\n.loader.--5::before,\r\n.loader.--5::after {\r\n	height: 3vmin;\r\n	width: var(--size-bar);\r\n	background-color: var(--color);\r\n	animation: loader-5 0.6s cubic-bezier(0, 0, 0.03, 0.9) infinite;\r\n}\r\n\r\n.loader.--5::before {\r\n	left: calc(50% - 1vmin);\r\n	top: calc(50% - 3vmin);\r\n}\r\n\r\n.loader.--5::after {\r\n	left: calc(50%   1vmin);\r\n	top: calc(50% - 1vmin);\r\n	animation-delay: 0.2s;\r\n}\r\n\r\n@keyframes loader-5 {\r\n	0%, 88%, 100% {\r\n		opacity: 0;\r\n	}\r\n	\r\n	0% {\r\n		transform: translateY(-6vmin);\r\n	}\r\n	\r\n	33% {\r\n		opacity: 1;\r\n	}\r\n	\r\n	33%, 88% {\r\n		transform: translateY(3vmin);\r\n	}\r\n}\r\n\r\n/**\r\n	loader --6\r\n**/\r\n.loader.--6::before {\r\n	width: var(--size-square);\r\n	height: var(--size-square);\r\n	background-color: var(--color);\r\n	top: calc(50% - var(--size-square));\r\n	left: calc(50% - var(--size-square));\r\n	animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;\r\n}\r\n\r\n@keyframes loader-6 {\r\n	0%, 100% {\r\n		transform: none;\r\n	}\r\n	\r\n	25% {\r\n		transform: translateX(100%);\r\n	}\r\n	\r\n	50% {\r\n		transform: translateX(100%) translateY(100%);\r\n	}\r\n	\r\n	75% {\r\n		transform: translateY(100%);\r\n	}\r\n}\r\n\r\n/**\r\n	loader --7\r\n**/\r\n.loader.--7::before,\r\n.loader.--7::after {\r\n	width: var(--size-square);\r\n	height: var(--size-square);\r\n	background-color: var(--color);\r\n}\r\n\r\n.loader.--7::before {\r\n	top: calc(50% - var(--size-square));\r\n	left: calc(50% - var(--size-square));\r\n	animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;\r\n}\r\n\r\n.loader.--7::after {\r\n	top: 50%;\r\n	left: 50%;\r\n	animation: loader-7 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;\r\n}\r\n\r\n@keyframes loader-7 {\r\n	0%, 100% {\r\n		transform: none;\r\n	}\r\n	\r\n	25% {\r\n		transform: translateX(-100%);\r\n	}\r\n	\r\n	50% {\r\n		transform: translateX(-100%) translateY(-100%);\r\n	}\r\n	\r\n	75% {\r\n		transform: translateY(-100%);\r\n	}\r\n}\r\n\r\n/**\r\n	loader --8\r\n**/\r\n.loader.--8::before,\r\n.loader.--8::after {\r\n	width: var(--size-dot);\r\n	height: var(--size-dot);\r\n	border-radius: 50%;\r\n	background-color: var(--color);\r\n}\r\n\r\n.loader.--8::before {\r\n	top: calc(50%   4vmin);\r\n	animation: loader-8-1 0.8s cubic-bezier(0.06, 0.01, 0.49, 1.18) infinite;\r\n}\r\n\r\n.loader.--8::after {\r\n	opacity: 0;\r\n	top: calc(50% - 2vmin);\r\n	animation: loader-8-2 0.8s cubic-bezier(0.46,-0.1, 0.27, 1.07) 0.2s infinite;\r\n}\r\n\r\n@keyframes loader-8-1 {\r\n	0%, 55%, 100% {\r\n		opacity: 0;\r\n	}\r\n	\r\n	0% {\r\n		transform: scale(0.2);\r\n	}\r\n	\r\n	22% {\r\n		opacity: 1;\r\n	}\r\n	\r\n	33%, 55% {\r\n		transform: scale(1) translateY(-6vmin);\r\n	}\r\n}\r\n\r\n@keyframes loader-8-2 {\r\n	0%, 100% {\r\n		opacity: 0;\r\n	}\r\n	\r\n	33% {\r\n		opacity: 0.3;\r\n	}\r\n	\r\n	0% {\r\n		transform: scale(0);\r\n	}\r\n	\r\n	100% {\r\n		transform: scale(4);\r\n	}\r\n}\r\n\r\n/**\r\n	loader --9\r\n**/\r\n.loader.--9::before,\r\n.loader.--9::after {\r\n	width: var(--size-dot);\r\n	height: var(--size-dot);\r\n	border-radius: 50%;\r\n	background-color: var(--color);\r\n	animation: loader-9 0.42s cubic-bezier(0.39, 0.31, 0, 1.11) infinite;\r\n}\r\n\r\n.loader.--9::before {\r\n	left: calc(50% - var(--size-dot) - 1.6vmin);\r\n}\r\n\r\n.loader.--9::after {\r\n	left: calc(50%   1.6vmin);\r\n	animation-delay: 0.12s;\r\n}\r\n\r\n@keyframes loader-9 {\r\n	0%, 100% {\r\n		opacity: 0;\r\n	}\r\n	\r\n	0% {\r\n		transform: translate(-4vmin, -4vmin);\r\n	}\r\n	\r\n	66% {\r\n		opacity: 1;\r\n	}\r\n	\r\n	66%, 100% {\r\n		transform: none;\r\n	}\r\n}\r\n\r\n/**\r\n	miscs\r\n**/\r\n\r\n.container {\r\n	display: grid;\r\n	grid-template-columns: repeat(3, 18vmin);\r\n	grid-template-rows: repeat(3, 18vmin);\r\n	grid-gap: 1vmin;\r\n}\r\n\r\n.item	{\r\n	background: rgba(255, 255, 255, 0.1);\r\n	display: grid;\r\n	place-items: center;\r\n	border-radius: 4px;\r\n	transition: opacity 0.4s ease;\r\n}\r\n\r\n.container:hover .item {\r\n	opacity: 0.3;\r\n}\r\n\r\n.container:hover .item:hover {\r\n	opacity: 1;\r\n}\r\n\r\n.page {\r\n	margin: auto;\r\n}\r\n\r\n.header {\r\n	margin-bottom: 4vmin;\r\n}\r\n\r\n.header-title {\r\n	font-size: 3.75vmin;\r\n}\r\n\r\n.header-subtitle {\r\n	font-size: 2vmin;\r\n	text-transform: uppercase;\r\n	opacity: 0.6;\r\n}\r\n\r\nhtml, body {\r\n	display: flex;\r\n	width: 100%;\r\n	height: 100%;\r\n	background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);\r\n	font-family: \'Noto Sans\', sans-serif;\r\n	color: white;\r\n	text-align: center;\r\n	letter-spacing: 0.3px;\r\n}', '', '1', '2023-12-28 22:15:13', '11', 'base', 'component__658e2bb1ba5f0'),
(92, 'Nombre del componente', '<!-- html -->', '', '', '1', '2023-12-28 22:29:05', '10', 'base', 'component__658e2ef12bb94');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lenguajes`
--

CREATE TABLE `lenguajes` (
  `id` int(22) NOT NULL,
  `nombre` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lenguajes`
--

INSERT INTO `lenguajes` (`id`, `nombre`) VALUES
(2, 'adonisjs'),
(3, 'aftereffects'),
(4, 'amazonwebservices'),
(5, 'android'),
(6, 'androidstudio'),
(7, 'aarch64'),
(8, 'angularjs'),
(9, 'ansible'),
(10, 'apache'),
(11, 'apachekafka'),
(12, 'appcelerator'),
(13, 'apple'),
(14, 'appwrite'),
(15, 'arduino'),
(16, 'atom'),
(17, 'azure'),
(18, 'babel'),
(19, 'backbonejs'),
(20, 'bamboo'),
(21, 'bash'),
(22, 'behance'),
(23, 'bitbucket'),
(24, 'bootstrap'),
(25, 'bulma'),
(26, 'bower'),
(27, 'c'),
(28, 'cakephp'),
(29, 'canva'),
(30, 'centos'),
(31, 'ceylon'),
(32, 'chrome'),
(33, 'circleci'),
(34, 'clojure'),
(35, 'cmake'),
(36, 'clojurescript'),
(37, 'codecov'),
(38, 'codeigniter'),
(39, 'codepen'),
(40, 'coffeescript'),
(41, 'composer'),
(42, 'confluence'),
(43, 'couchdb'),
(44, 'cplusplus'),
(45, 'csharp'),
(46, 'css3'),
(47, 'cucumber'),
(48, 'crystal'),
(49, 'd3js'),
(50, 'dart'),
(51, 'debian'),
(52, 'denojs'),
(53, 'devicon'),
(54, 'django'),
(55, 'docker'),
(56, 'doctrine'),
(57, 'dot-net'),
(58, 'dotnetcore'),
(59, 'drupal'),
(60, 'digitalocean'),
(61, 'discordjs'),
(62, 'electron'),
(63, 'eleventy'),
(64, 'elixir'),
(65, 'elm'),
(66, 'ember'),
(67, 'embeddedc'),
(68, 'erlang'),
(69, 'eslint'),
(70, 'express'),
(71, 'facebook'),
(72, 'feathersjs'),
(73, 'figma'),
(74, 'filezilla'),
(75, 'firebase'),
(76, 'firefox'),
(77, 'flask'),
(78, 'flutter'),
(79, 'foundation'),
(80, 'fsharp'),
(81, 'gatling'),
(82, 'gatsby'),
(83, 'rect'),
(84, 'gcc'),
(85, 'gentoo'),
(86, 'gimp'),
(87, 'git'),
(88, 'github'),
(89, 'gitlab'),
(90, 'gitter'),
(91, 'go'),
(92, 'google'),
(93, 'googlecloud'),
(94, 'gradle'),
(95, 'grafana'),
(96, 'grails'),
(97, 'graphql'),
(98, 'groovy'),
(99, 'grunt'),
(100, 'gulp'),
(101, 'godot'),
(102, 'haskell'),
(103, 'handlebars'),
(104, 'haxe'),
(105, 'heroku'),
(106, 'html5'),
(107, 'hugo'),
(108, 'ie10'),
(109, 'ifttt'),
(110, 'illustrator'),
(111, 'inkscape'),
(112, 'intellij'),
(113, 'ionic'),
(114, 'jamstack'),
(115, 'jasmine'),
(116, 'java'),
(117, 'javascript'),
(118, 'jeet'),
(119, 'jest'),
(120, 'jenkins'),
(121, 'jetbrains'),
(122, 'jira'),
(123, 'jquery'),
(124, 'julia'),
(125, 'jupyter'),
(126, 'kaggle'),
(127, 'karma'),
(128, 'kotlin'),
(129, 'knockout'),
(130, 'krakenjs'),
(131, 'kubernetes'),
(132, 'labview'),
(133, 'laravel'),
(134, 'latex'),
(135, 'less'),
(136, 'linkedin'),
(137, 'lua'),
(138, 'linux'),
(139, 'materialui'),
(140, 'matlab'),
(141, 'magento'),
(142, 'markdown'),
(143, 'maya'),
(144, 'meteor'),
(145, 'minitab'),
(146, 'mocha'),
(147, 'modx'),
(148, 'mongodb'),
(149, 'moodle'),
(150, 'msdos'),
(151, 'mysql'),
(152, 'neo4j'),
(153, 'nestjs'),
(154, 'networkx'),
(155, 'nextjs'),
(156, 'nginx'),
(157, 'nixos'),
(158, 'nodejs'),
(159, 'nodewebkit'),
(160, 'npm'),
(161, 'nuget'),
(162, 'numpy'),
(163, 'nuxtjs'),
(164, 'objectivec'),
(165, 'opera'),
(166, 'ocaml'),
(167, 'openal'),
(168, 'opengl'),
(169, 'opensuse'),
(170, 'oracle'),
(171, 'pandas'),
(172, 'perl'),
(173, 'phalcon'),
(174, 'photoshop'),
(175, 'php'),
(176, 'phpstorm'),
(177, 'podman'),
(178, 'polygon'),
(179, 'postgresql'),
(180, 'premierepro'),
(181, 'processing'),
(182, 'protractor'),
(183, 'putty'),
(184, 'pycharm'),
(185, 'python'),
(186, 'pytorch'),
(187, 'raspberrypi'),
(188, 'phoenix'),
(189, 'qt'),
(190, 'r'),
(191, 'rails'),
(192, 'react'),
(193, 'redhat'),
(194, 'redis'),
(195, 'redux'),
(196, 'rocksdb'),
(197, 'ruby'),
(198, 'rubymine'),
(199, 'rust'),
(200, 'safari'),
(201, 'salesforce'),
(202, 'sdl'),
(203, 'rstudio'),
(204, 'sass'),
(205, 'scala'),
(206, 'selenium'),
(207, 'sequelize'),
(208, 'shopware'),
(209, 'shotgrid'),
(210, 'sketch'),
(211, 'slack'),
(212, 'socketio'),
(213, 'solidity'),
(214, 'sourcetree'),
(215, 'spring'),
(216, 'spss'),
(217, 'sqlalchemy'),
(218, 'sqlite'),
(219, 'subversion'),
(220, 'microsoftsqlserver'),
(221, 'ssh'),
(222, 'stylus'),
(223, 'svelte'),
(224, 'swift'),
(225, 'symfony'),
(226, 'storybook'),
(227, 'tailwindcss'),
(228, 'tensorflow'),
(229, 'terraform'),
(230, 'threejs'),
(231, 'tomcat'),
(232, 'tortoisegit'),
(233, 'towergit'),
(234, 'travis'),
(235, 'thealgorithms'),
(236, 'trello'),
(237, 'twitter'),
(238, 'typescript'),
(239, 'typo3'),
(240, 'ubuntu'),
(241, 'unity'),
(242, 'unix'),
(243, 'unrealengine'),
(244, 'uwsgi'),
(245, 'vagrant'),
(246, 'vim'),
(247, 'visualstudio'),
(248, 'vuejs'),
(249, 'vuestorefront'),
(250, 'vscode'),
(251, 'webflow'),
(252, 'weblate'),
(253, 'webpack'),
(254, 'webstorm'),
(255, 'windows8'),
(256, 'woocommerce'),
(257, 'wordpress'),
(258, 'xamarin'),
(259, 'xcode'),
(260, 'xd'),
(261, 'yarn'),
(262, 'yii'),
(263, 'yunohost'),
(264, 'zend'),
(265, 'zig'),
(266, 'pytest'),
(267, 'opencv'),
(268, 'fastapi'),
(269, 'k3s'),
(270, 'packer'),
(271, 'anaconda'),
(272, 'rspec'),
(273, 'argocd'),
(274, 'prometheus'),
(275, 'blender'),
(276, 'dropwizard'),
(277, 'vuetify'),
(278, 'fedora');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulos`
--

CREATE TABLE `modulos` (
  `idModulo` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modulos`
--

INSERT INTO `modulos` (`idModulo`, `titulo`, `descripcion`, `status`) VALUES
(1, 'Dashboard', 'Seccion de Dashboard', '1'),
(2, 'Usuarios', 'Usuarios del sistema', '1'),
(3, 'Componentes', 'Componentes del sistema', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `idPermiso` int(11) NOT NULL,
  `rolid` int(22) NOT NULL,
  `moduloid` int(22) NOT NULL,
  `r` int(2) NOT NULL,
  `w` int(2) NOT NULL,
  `u` int(2) NOT NULL,
  `d` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`idPermiso`, `rolid`, `moduloid`, `r`, `w`, `u`, `d`) VALUES
(40, 1, 1, 1, 1, 1, 1),
(41, 1, 2, 1, 1, 1, 1),
(42, 1, 3, 1, 1, 1, 1),
(43, 3, 1, 1, 0, 0, 0),
(44, 3, 2, 0, 0, 1, 0),
(45, 3, 3, 1, 1, 1, 0),
(49, 5, 1, 0, 0, 0, 0),
(50, 5, 2, 0, 0, 0, 0),
(51, 5, 3, 0, 0, 0, 0),
(52, 7, 1, 0, 0, 0, 0),
(53, 7, 2, 0, 0, 0, 0),
(54, 7, 3, 0, 0, 0, 0),
(58, 2, 1, 1, 0, 1, 1),
(59, 2, 2, 0, 0, 0, 0),
(60, 2, 3, 1, 0, 1, 1),
(64, 6, 1, 1, 1, 1, 1),
(65, 6, 2, 0, 0, 0, 0),
(66, 6, 3, 0, 0, 0, 0),
(70, 9, 1, 1, 0, 1, 1),
(71, 9, 2, 0, 0, 0, 0),
(72, 9, 3, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(66) NOT NULL,
  `apellido` varchar(66) NOT NULL,
  `usuario` varchar(66) NOT NULL,
  `contrasena` varchar(66) NOT NULL,
  `status` varchar(66) NOT NULL,
  `tipo` varchar(66) NOT NULL,
  `fecha` varchar(66) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id`, `nombre`, `apellido`, `usuario`, `contrasena`, `status`, `tipo`, `fecha`) VALUES
(1, 'August', 'Díaz', 'audev', 'cdcb7422ca0fe077931b84e6fb7e6dfb7d6678dc7e9ae9c4335e98edc7d5761a', '1', 'SuperAdmin', '2023-11-27 00:26:07'),
(6, 'Leonel', 'Lizardi', 'username', '16f78a7d6317f102bbd95fc9a4f3ff2e3249287690b8bdad6b7810f82b34ace3', '1', 'Administrador', '2023-11-27 18:08:18'),
(16, 'Emma', 'Lizardi', 'emmadev', 'cdcb7422ca0fe077931b84e6fb7e6dfb7d6678dc7e9ae9c4335e98edc7d5761a', '1', 'Motorizado', '2023-12-12 15:01:53'),
(17, 'Jasmine', 'Apeliid', 'usernamea', 'cdcb7422ca0fe077931b84e6fb7e6dfb7d6678dc7e9ae9c4335e98edc7d5761a', '0', 'Motorizado', '2023-12-13 13:56:20'),
(18, 'Comprendo', 'Solo que jasmine', 'TGname', 'cdcb7422ca0fe077931b84e6fb7e6dfb7d6678dc7e9ae9c4335e98edc7d5761a', '1', 'Motorizado', '2023-12-13 13:56:59'),
(19, 'Fresh', 'Contra', 'Agdsa', 'cdcb7422ca0fe077931b84e6fb7e6dfb7d6678dc7e9ae9c4335e98edc7d5761a', '1', 'Motorizado', '2023-12-13 13:57:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id` int(22) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text NOT NULL,
  `miembros` varchar(222) NOT NULL,
  `status` varchar(11) NOT NULL,
  `lenguajes` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id`, `nombre`, `descripcion`, `miembros`, `status`, `lenguajes`) VALUES
(9, 'Widget', 'Simplemente se puede decir que hay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera, ya sea porque se le agregó humor, o palabras aleatorias que no parecen ni un poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro de que no hay nada avergonzante escondido en el medio del texto. Todos los generadores de Lorem Ipsum que se encuentran en Internet tienden a repetir trozos predefinidos cuando sea necesario, haciendo a este el único generador verdadero (válido) en la Internet. Usa un diccionario de mas de 200 palabras provenientes del latín, combinadas con estructuras muy útiles de sentencias, para generar texto de Lorem Ipsum que parezca razonable. Este Lorem Ipsum generado siempre estará libre de repeticiones, humor agregado o palabras no características del lenguaje, etc.', '1', '1', '87'),
(10, 'Principito', 'Aprendí bien pronto a conocer mejor esta flor. Siempre había habido en el planeta del principito flores muy simples adornadas con una sola fila de pétalos que apenas ocupaban sitio y a nadie molestaban. Aparecían entre la hierba una mañana y por la tarde se extinguían. Pero aquella había terminado un día de una semilla llegada de quién sabe dónde, y el principito había vigilado cuidadosamente desde el primer día aquella ramita tan diferente de las que él conocía. Podía ser una nueva especie de Baobab. Pero el arbusto cesó pronto de crecer y comenzó a echar su flor. El principito observó el crecimiento de un enorme capullo y tenía le convencimiento de que habría de salir de allí una aparición milagrosa; pero la flor no acababa de preparar su belleza al abrigo de su envoltura verde.', '1,6,17', '0', '2,4,59'),
(11, 'Gato peludito', 'Con un nueva descripción', '1', '0', '2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL,
  `nombrerol` varchar(50) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `nombrerol`, `descripcion`, `status`) VALUES
(1, 'SuperAdmin', 'Super Administrador', '1'),
(9, 'Motorizado', 'El acaba de pasar', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `componentes`
--
ALTER TABLE `componentes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `lenguajes`
--
ALTER TABLE `lenguajes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `modulos`
--
ALTER TABLE `modulos`
  ADD PRIMARY KEY (`idModulo`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`idPermiso`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT de la tabla `componentes`
--
ALTER TABLE `componentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT de la tabla `lenguajes`
--
ALTER TABLE `lenguajes`
  MODIFY `id` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=279;

--
-- AUTO_INCREMENT de la tabla `modulos`
--
ALTER TABLE `modulos`
  MODIFY `idModulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `idPermiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id` int(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
