<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://github.com/thelearninghouse
 * @since             0.0.1
 * @package           Tlhforms
 *
 * @wordpress-plugin
 * Plugin Name:       TLH Froms
 * Plugin URI:        https://github.com/thelearninghouse/tlhforms
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           0.0.1
 * Author:            David Royer - Learning House
 * Author URI:        https://github.com/thelearninghouse
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       tlhforms
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-tlhforms-activator.php
 */
function activate_tlhforms() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-tlhforms-activator.php';
	Tlhforms_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-tlhforms-deactivator.php
 */
function deactivate_tlhforms() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-tlhforms-deactivator.php';
	Tlhforms_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_tlhforms' );
register_deactivation_hook( __FILE__, 'deactivate_tlhforms' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-tlhforms.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    0.0.1
 */
function run_tlhforms() {

	$plugin = new Tlhforms();
	$plugin->run();

}
run_tlhforms();


require 'plugin-update-checker/plugin-update-checker.php';
$myUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
    'https://github.com/thelearninghouse/tlhforms/',
    __FILE__,
    'tlhforms'
);

//Optional: If you're using a private repository, specify the access token like this:
// $myUpdateChecker->setAuthentication('your-token-here');

//Optional: Set the branch that contains the stable release.
$myUpdateChecker->setBranch('master');
