<?php
$front_end_section_title               = get_field('front_end_section_title');
$front_end_section_certificate_label   = get_field('front_end_section_certificate_label');
$front_end_section_certificate_url     = get_field('front_end_section_certificate_url');
?>

<div id="frontEnd">
<a name="frontEnd">
  <div class="container">
<div class="row text-center">
  <h1>My Portfolio</h1>
  <h2><?php echo $front_end_section_title  ?></h2>
  <p><a href="<?php echo  $front_end_section_certificate_url ?>"><?php echo $front_end_section_certificate_label ?></a></p>
</div>
<div class="row text-center">
  <?php $loop = new WP_Query( array( 'post_type' => 'front_end_projects', 'orderby' => 'post_id', 'order' => 'ASC' ) ); ?>
  <?php while( $loop->have_posts() ) : $loop->the_post(); ?>
      <div class="col-md-4 portfolio-project">
      <a href="<?php the_field('project_url'); ?>"><?php the_post_thumbnail(); ?></a>
      <h3><?php the_title(); ?></h3>
      <p><?php the_content(); ?></p>
    </div>
  <?php endwhile; wp_reset_query(); ?>
</div>
<!-- end front end -->
</div></div>
