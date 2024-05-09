<?php

namespace Drupal\tutorials_migration\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * Process the blog banner destination file path.
 *
 * @MigrateProcessPlugin(
 *   id = "process_banner_image_url"
 * )
 */
class ProcessBannerImageUrl extends ProcessPluginBase {

  /**
   * Process the banner destination file path.
   *
   * $value will contain the destination URI and the file path.
   *  @code
   *  array {
   *    [0]=> string(21) "public://blog-banner/"
   *    [1]=> string(70) "2023-03-25/banner/0-install-java-se-20-jdk-20-on-windows-11-banner.jpg"
   *  }
   *  @endcode
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if (empty($value)) {
      return $value;
    }

    $path_parts = explode('/', $value[1]);
    // Fetch the year and month.
    preg_match('/(\d+\-\d+)/', $path_parts[0], $matches);
    // $value eg. "public://blog-banner/2023-03/0-install-java-se-20-jdk-20-on-windows-11-banner.jpg".
    $value = $value[0] . $matches[1] . '/' . $path_parts[2];

    return $value;
  }

}
