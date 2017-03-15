<!--begin home - jumbotron section -->
<div class="jumbotron text-center home main-section">
  <div class="container">
    <a name="home"></a>
    <p>
      <h1><?php echo  get_bloginfo( 'name' ); ?></h1>
      <hr />
     <?php $loop = new WP_Query( array( 'post_type' => 'social_icons', 'orderby' => 'post_id', 'order' => 'ASC' ) ); ?>
      <?php while( $loop->have_posts() ) : $loop->the_post(); ?>
          <a href="<?php the_field('account_url'); ?>">
            <button type="button" class="btn btn-default social-jumbo" aria-label="Left Align">
              <span class="fa fa-<?php echo strtolower( get_field('social_icon') ) ?>" aria-hidden="true"> <?php the_field('social_icon'); ?></span>
            </button>
          </a>
      <?php endwhile; wp_reset_query(); ?>
    </p>
  </div>
</div>
  <!-- end home - jumbotron section -->
