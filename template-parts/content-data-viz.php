<?php
$data_visualization_section_title               = get_field('data_visualization_section_title');
$data_visualization_section_certificate_label   = get_field('data_visualization_section_certificate_label');
$data_visualization_section_certificate_url     = get_field('data_visualization_section_certificate_url');
$react_section_title                            = get_field('react_section_title');
$d3_section_title                               = get_field('d3_section_title')
?>
<!-- begin data visualization  section -->
<div id="dataVis">
<a href="dataVis">
  <div class="container">
<div class="row text-center">
  <h2><?php echo $data_visualization_section_title; ?></h2>
  <p><a href="<?php echo $data_visualization_section_certificate_url; ?>"><?php echo $data_visualization_section_certificate_label; ?></a></p>
</div>
<!-- begin portfolio row -->
<div class="row text-center">
<a name="react">
    <h2><?php echo $react_section_title; ?></h2>
</div>
<!-- begin portfolio row -->
<div class="row text-center">
<?php $loop = new WP_Query( array( 'post_type' => 'react_projects', 'orderby' => 'post_id', 'order' => 'ASC' ) ); ?>
<?php while( $loop->have_posts() ) : $loop->the_post(); ?>
    <div class="col-md-4 portfolio-project">
    <a href="<?php the_field('project_url'); ?>"><?php the_post_thumbnail(); ?></a>
    <h3><?php the_title(); ?></h3>
    <p><?php the_content(); ?></p>
  </div>
<?php endwhile; wp_reset_query(); ?>
</div>
<!--end portfolio row -->
<hr />
<!-- begin portfolio row -->
<div class="row text-center">
<a name="d3">
    <h2><?php echo $d3_section_title; ?></h2>
</div>
<!-- begin portfolio row -->
<div class="row text-center">
<?php $loop = new WP_Query( array( 'post_type' => 'd3_projects', 'orderby' => 'post_id', 'order' => 'ASC' ) ); ?>
<?php while( $loop->have_posts() ) : $loop->the_post(); ?>
    <div class="col-md-4 portfolio-project">
    <a href="<?php the_field('project_url'); ?>"><?php the_post_thumbnail(); ?></a>
    <h3><?php the_title(); ?></h3>
    <p><?php the_content(); ?></p>
  </div>
<?php endwhile; wp_reset_query(); ?>
</div>
<!--end portfolio row -->

</div></div>
<!--end datavisualization section -->
