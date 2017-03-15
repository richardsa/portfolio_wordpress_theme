<?php
   /* Template Name: React Projects */
   get_header();
?>
	<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( '/template-parts/content', 'page' ); ?>

				<?php endwhile; // end of the loop. ?>

<?php get_footer('react'); ?>
