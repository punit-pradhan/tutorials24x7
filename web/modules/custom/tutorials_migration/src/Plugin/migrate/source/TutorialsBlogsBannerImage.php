<?php

namespace Drupal\tutorials_migration\Plugin\migrate\source;

use Drupal\migrate\Plugin\migrate\source\SqlBase;

/**
 * Blogs banner data data migration source.
 *
 * @MigrateSource(
 *   id = "tutorials_blogs_banner_image",
 *   source_module = "tutorials_migration",
 * )
 */
class TutorialsBlogsBannerImage extends SqlBase {

  /**
   * {@inheritdoc}
   */
  public function query() {
    $query = $this->select('cmg_cms_model_content', 'content');
    $query->join('cmg_core_file', 'file', 'file.id = content.bannerId');

    $query->fields('file', [
      'id',
      'url',
    ]);

    return $query;
  }

  /**
   * {@inheritdoc}
   */
  public function fields() {
    $fields = [
      'id' => $this->t('File ID'),
      'url' => $this->t('URL'),
    ];
    return $fields;
  }

  /**
   * {@inheritdoc}
   */
  public function getIds() {
    return [
      'id' => [
        'type' => 'integer',
        'alias' => 'file',
      ],
    ];
  }

}
