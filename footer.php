<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Richie\'s_Portfolio_Theme
 */

$javascript_file_name	= get_field('javascript_file_name');
$external_javascript_url= get_field('external_javascript_url');
?>

</div><!-- #content -->

 <!-- footer  -->
    <footer class="footer">
      <div class="container">
        <div class="col-sm-12">
          <?php
          wp_nav_menu( array(

							'theme_location'	=> 'footer',
							'container'			=> 'nav',
							'menu_class'		=> 'list-unstyled list-inline'
						 ) );
        ?>
          <p><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo('name'); ?> &copy; <?php echo date('Y'); ?></a></p>

        </div> <!-- end col -->



    </footer>

</div><!-- #page -->

<?php wp_footer(); ?>
	  <!--bootstrap and jquery core js -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="<?php bloginfo('template_directory'); ?>/assets/js/jquery-2.1.1.min.js"></script>
    <script src="<?php bloginfo('template_directory'); ?>/assets/js/bootstrap.min.js"></script>
    <script src="https://getbootstrap.com/2.0.4/assets/js/bootstrap-dropdown.js"></script>
    <script src="<?php bloginfo('template_directory'); ?>/assets/js/main.js"></script>


     <?php if( $external_javascript_url) : ?>
			 <script src="<?php echo  $external_javascript_url; ?>"></script>
		<?php endif; ?>
    <?php if( $javascript_file_name) : ?>
			 <script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/assets/js/<?php echo  $javascript_file_name; ?>"></script>
		<?php endif; ?>


    </body>
</html>
