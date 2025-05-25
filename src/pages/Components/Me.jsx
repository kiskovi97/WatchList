import styles from './Me.module.css'
import gStyles from '../Grid.module.css'
import pStyles from '../Page.module.css'

import insta from '../../logos/instagram.svg'
import github from '../../logos/github.svg'
import { motion } from "framer-motion";

var Me = () =>
    <div className={gStyles.grid + " " + styles.Me}>
        <div className={styles.titleBlock}>
            <div className={styles.frontTitle}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    >
                    <div className={styles.title}>
                        Watchlist
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    >
                    <a href="https://www.instagram.com/evilexcuse/" className={pStyles.minilogo}><img src={insta} alt="" /></a>
                    <a href="https://github.com/kiskovi97" className={pStyles.minilogo}><img src={github} alt="" /></a>
                </motion.div>
            </div>
        </div>
        <div className={styles.description}>
        </div>
    </div>

export default Me;