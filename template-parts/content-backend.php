<?php
$back_end_section_title                = get_field('back_end_section_title');
$back_end_section_certificate_label    = get_field('back_end_section_certificate_label');
$back_end_section_certificate_url     = get_field('back_end_section_certificate_url');

?>


<!-- begin back end section -->
<div id="backEnd">
<a name="backEnd">
  <div class="container">
    <div class="row text-center">
      <h2><?php echo $back_end_section_title  ?></h2>
      <p><a href="<?php echo  $back_end_section_certificate_url ?>"><?php echo $back_end_section_certificate_label ?></a></p>
    </div>
      <!-- begin portfolio row -->
    <div class="row text-center">
      <?php $loop = new WP_Query( array( 'post_type' => 'back_end_projects', 'orderby' => 'post_id', 'order' => 'ASC' ) ); ?>
      <?php while( $loop->have_posts() ) : $loop->the_post(); ?>
          <div class="col-md-4 portfolio-project">
          <a href="<?php the_field('project_url'); ?>"><?php the_post_thumbnail(); ?></a>
          <h3><?php the_title(); ?></h3>
          <p><?php the_content(); ?></p>
        </div>
      <?php endwhile; wp_reset_query(); ?>
    </div>
</div>
</div>
<!-- end back end section -->
