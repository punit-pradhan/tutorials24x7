<?php

declare(strict_types=1);

namespace Innoraft\QualityChecker\Trufflehog;

use GrumPHP\Runner\TaskResult;
use GrumPHP\Runner\TaskResultInterface;
use GrumPHP\Task\AbstractExternalTask;
use GrumPHP\Task\Context\ContextInterface;
use GrumPHP\Task\Context\GitPreCommitContext;
use GrumPHP\Task\Context\RunContext;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * A custom grumphp task to integrate trufflehog.
 */
class SecurityLeaks extends AbstractExternalTask {

  /**
   * {@inheritdoc}
   */
  public static function getConfigurableOptions(): OptionsResolver {
    $resolver = new OptionsResolver();
    $resolver->setDefaults([
      'command' => '',
    ]);

    $resolver->addAllowedTypes('command', ['string']);

    return $resolver;
  }

  /**
   * {@inheritdoc}
   */
  public function canRunInContext(ContextInterface $context): bool {
    return $context instanceof GitPreCommitContext || $context instanceof RunContext;
  }

  /**
   * {@inheritdoc}
   */
  public function run(ContextInterface $context): TaskResultInterface {
    $config = $this->getConfig()->getOptions();
    $files = $context->getFiles();

    if (0 === \count($files)) {
      return TaskResult::createSkipped($this, $context);
    }

    $arguments = $this->processBuilder->createArgumentsForCommand('bash');
    $arguments->addOptionalArgumentWithSeparatedValue('-c', $config['command']);

    if ($context instanceof GitPreCommitContext) {
      $arguments->addFiles($files);
    }

    $process = $this->processBuilder->buildProcess($arguments);

    $process->run();

    if (!$process->isSuccessful()) {
      return TaskResult::createFailed($this, $context, $this->formatter->format($process));
    }

    return TaskResult::createPassed($this, $context);
  }

}
