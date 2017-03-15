<?php
$about_section_image    = get_field('about_section_image');
$about_section_title    = get_field('about_section_title');
$about_section_body     = get_field('about_section_body');
?>

<!-- begin about section -->
<a name="about"></a>
<div class="about main-section">
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <h1><?php echo $about_section_title  ?></h1>
        <br />
        <?php echo $about_section_body  ?>
      </div>
      <div class="col-md-4">
        <img src="<?php echo $about_section_image ['url']; ?>" class="center-block img-circle" />
      </div>

    </div>
  </div>

</div>
<!-- end about section -->
