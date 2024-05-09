<?php

namespace Drupal\tutorials_migration\Plugin\migrate\source;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\migrate\Plugin\migrate\source\SqlBase;
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate\Row;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Blogs data migration source.
 *
 * @MigrateSource(
 *   id = "tutorials_blogs",
 *   source_module = "tutorials_migration",
 * )
 */
class TutorialsBlogs extends SqlBase {

  /**
   * Entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * {@inheritDoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition, ?MigrationInterface $migration = NULL) {
    $instance = new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $migration,
      $container->get('state')
    );

    $instance->setEntityTypeManager($container->get('entity_type.manager'));
    return $instance;
  }

  /**
   * Setter for entity type manager service.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   Entity type manager.
   */
  public function setEntityTypeManager(EntityTypeManagerInterface $entity_type_manager) {
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public function query() {
    $query = $this->select('cmg_cms_page', 'page');
    $query->join('cmg_cms_model_content', 'content', 'page.id = content.parentId');
    $query->fields('page', [
      'id',
      'name',
      'siteId',
      'createdAt',
      'modifiedAt',
    ]);
    $query->addField('page', 'slug', 'page_slug');
    $query->fields('content', [
      'content',
      'summary',
      'bannerId',
    ]);

    $query->join('cmg_core_site', 'site', 'site.id = page.siteId');
    $query->addField('site', 'slug', 'domain_slug');

    $query->condition('content.parentType', 'blog');
    return $query;
  }

  /**
   * {@inheritdoc}
   */
  public function fields() {
    $fields = [
      'id' => $this->t('id'),
      'name' => $this->t('name'),
      'summary' => $this->t('summary'),
      'content' => $this->t('content'),
      'page_slug' => $this->t('page slug'),
      'domain_slug' => $this->t('domain slug'),
      'createdAt' => $this->t('Created date'),
      'modifiedAt' => $this->t('Modified date'),
      'bannerId' => $this->t('Banner image file ID'),
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
        'alias' => 'page',
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function prepareRow(Row $row) {
    $uid = $this->entityTypeManager->getStorage('user')->loadByProperties(['mail' => 'bhagwat.chouhan@gmail.com']);
    $row->setSourceProperty('user_id', $uid);

    return parent::prepareRow($row);
  }

}
