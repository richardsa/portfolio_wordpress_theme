<?php
/* Template Name: Full-width Template */
    $thumbnail_url = wp_get_attachment_url(get_post_thumbnail_id($post->ID));
    get_header();
?>
 <!-- FEATURE IMAGE
    ================================================== -->

<?php if ( has_post_thumbnail() ) { ?>

    <section class="feature-image feature-image-default text-center" style="background:url('<?php echo $thumbnail_url; ?>') no-repeat; background-size: cover;" data-type="background" data-speed="2">
    	<h1 class="page-title text-center"><?php the_title(); ?></h1>
    </section>
<?php  } else { // fallback image   c?>
  <section class="feature-image feature-image-default text-center" data-type="background" data-speed="2">
    	<h1 class="page-title text-center"><?php the_title(); ?></h1>
    </section>
<?php } ?>

<!-- MAIN CONTENT
	================================================== -->
  <div class="container">
	    <div class="row" id="primary">

		    <div id="content" class="col-sm-12">
		    <section class="main-content">
		        <?php while (have_posts() ) : the_post(); ?>
		        <?php the_content(); ?>
		        <?php endwhile; // end of the loop ?>
		    </section><!-- main-content -->

		    </div><!-- content -->

	    </div><!-- primary -->
    </div><!-- container -->

<?php get_footer(); ?>
