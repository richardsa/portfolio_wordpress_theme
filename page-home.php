<?php
   /* Template Name: Home Page */
   get_header();

?>


<!-- MAIN CONTENT
	================================================== -->

  <!--begin main body -->
<?php get_template_part( 'template-parts/content', 'jumbotron' ); ?>

<?php get_template_part( 'template-parts/content', 'about' ); ?>

  <!-- begin portfolio section -->
  <div class="portfolio main-section">
      <a name="portfolio"></a>
      <?php get_template_part( 'template-parts/content', 'frontend' ); ?>
      <?php get_template_part( 'template-parts/content', 'backend' ); ?>
      <?php get_template_part( 'template-parts/content', 'data-viz' ); ?>
      <!-- end portfolio section -->
  </div>

 <?php/* get_template_part( 'template-parts/content', 'contact' );*/ ?> 

<?php get_footer(); ?>
