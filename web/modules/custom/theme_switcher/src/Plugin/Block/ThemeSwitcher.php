<?php

declare(strict_types = 1);

namespace Drupal\theme_switcher\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a theme switcher block.
 *
 * @Block(
 *   id = "theme_switcher_theme_switch_block",
 *   admin_label = @Translation("Theme Switcher"),
 *   category = @Translation("Custom"),
 * )
 */
final class ThemeSwitcher extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    $build['content'] = [
      '#theme' => 'dark_theme',
    ];
    return $build;
  }

}
