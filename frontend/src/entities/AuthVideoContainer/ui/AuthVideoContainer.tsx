'use client';

import React from 'react';
import styles from './AuthVideoContainer.module.css';

const AuthVideoContainer = () => {
  return (
    <div className={styles.container}>
      <video className={styles.video} autoPlay muted loop playsInline>
        <source src="/video/1.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default AuthVideoContainer;
