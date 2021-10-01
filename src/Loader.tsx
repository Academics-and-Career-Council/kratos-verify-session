import styles from './styles.module.css'
import React from 'react';

export default function loader(){
    return(
        <div className={styles.container}>
            <div className={styles.logo}>
            <img src="/anc-logo.png" width=
        {150} height={150}/>
            </div>

        <div className={styles.loader}>Loading...</div>
        </div>  
    );
}