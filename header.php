<?php
/**
 * The template for displaying the header
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Richie\'s_Portfolio_Theme
 */
 $css_file_name	= get_field('css_file_name');
 $external_css_url = get_field('external_css_url');
 $responsive_page = get_field('responsive_page');

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<?php if( $responsive_page) : ?>
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php else: ?>

<?php endif; ?>



<link rel="profile" href="//gmpg.org/xfn/11">
    <!-- Bootstrap core CSS -->
    <link href="<?php bloginfo('stylesheet_directory'); ?>/assets/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome Icons -->
    <link href="<?php bloginfo('stylesheet_directory'); ?>/assets/css/font-awesome/css/font-awesome.min.css" rel="stylesheet">

    <!-- Google Fonts -->
    <link href='//fonts.googleapis.com/css?family=Raleway:400,700' rel='stylesheet' type='text/css'>

<?php wp_head(); ?>
      <?php if( $external_css_url ) : ?>
			 <link href="<?php echo  $external_css_url ; ?>" rel="stylesheet">
		<?php endif; ?>

       <?php if( $css_file_name) : ?>
			 <link href="<?php bloginfo('template_directory'); ?>/assets/css/<?php echo  $css_file_name; ?>" rel="stylesheet">
		<?php endif; ?>

</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'richies-portfolio-theme' ); ?></a>

	<!-- header -->
	<header class="site-header" role="banner">
		<!-- navbar -->
		<div class="navbar-wrapper">
			<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
					<div class="container-fluid">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						 <a class="navbar-brand" href="<?php bloginfo('url')?>"><?php bloginfo('name')?></a>

					</div><!-- navbar-header -->
					<!-- If the menu (WP admin area) is not set, then the "menu_class" is applied to "container". In other words, it overwrites the "container_class". Ref: http://wordpress.org/support/topic/wp_nav_menu-menu_class-usage-bug?replies=4 -->
          <?php
  						wp_nav_menu( array(

  							'theme_location'	=> 'primary',
                 'depth' => 3,
  'container' => false,
  'menu_class' => 'nav',
  //Process nav menu using our custom nav walker

  							'container'			=> 'nav',
  							'container_class'	=> 'navbar-collapse collapse',
  							'menu_class'		=> 'nav navbar-nav navbar-right',

  					 'walker' => new wp_bootstrap_navwalker()));
  					?>


				</div><!-- container -->


			</div> <!--navbar -->
		</div>  <!-- navbar wrapper -->
	</header>  <!-- end header -->
