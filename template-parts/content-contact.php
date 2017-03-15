<?php
$contact_heading                = get_field('contact_heading');
$contact_email    = get_field('contact_email');
$contact_link    = get_field('contact_link');
?>
<!-- begin contact section -->
<div id="contact" class="contact main-section">
  <div class="container">
    <a name="contact"></a>
    <div class="row">
      <div class="col-md-8">
        <h3><?php echo $contact_heading ?></h3>
        
        <h3>Directly: <?php echo $contact_email ?></h3>
      </div>
      <div class="col-md-4">
        <ul class="list-unstyled contact-section">
          <?php $loop = new WP_Query( array( 'post_type' => 'social_icons', 'orderby' => 'post_id', 'order' => 'ASC' ) ); ?>
           <?php while( $loop->have_posts() ) : $loop->the_post(); ?>
             <li>
               <a href="<?php the_field('account_url'); ?>">
                 <button type="button" class="btn btn-default" aria-label="Left Align">
                   <span class="fa fa-<?php echo strtolower( get_field('social_icon') ) ?>" aria-hidden="true"> <?php the_field('social_icon'); ?></span>
                 </button>
               </a>
             </li>
           <?php endwhile; wp_reset_query(); ?>
        </ul>
      </div>
    </div>
  </div>
</div>
<!-- end contact section -->
