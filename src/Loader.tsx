import styles from '../styles/loader.module.css'
import Image from 'next/image'

export default function loader(){
    return(
        <div className={styles.container}>
            <div className={styles.logo}>
            <Image src="/anc-logo.png" width=
        {150} height={150}/>
            </div>

        <div className={styles.loader}>Loading...</div>
        </div>  
    );
}