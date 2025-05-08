'use client';

import { useTranslations } from 'next-intl';
import { LuMessageSquare } from 'react-icons/lu';

import { TranslationKeys } from '@/shared/config/i18n/translations';
import { Button } from '@/shared/ui/button';

import styles from './SupportChatButton.module.css';

export default function SupportChatButton() {
  const t = useTranslations('contacts');

  return (
    <Button className={styles.fluentSubButton} variant="outline">
      <LuMessageSquare className={styles.buttonIcon} />
      {t(TranslationKeys.ChatWithSupport)}
    </Button>
  );
}
