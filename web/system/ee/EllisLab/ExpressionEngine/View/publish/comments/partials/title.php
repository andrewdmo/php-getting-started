<?= ellipsize($comment->comment, 50) ?><br>
<span class="meta-info">&mdash; <?= lang('by') ?>: <a
            href="mailto:<?= $comment->email ?>"><?= $comment->name ?></a>, <?= lang('on') ?>
    : <?= $comment->getEntry()->title ?></span>