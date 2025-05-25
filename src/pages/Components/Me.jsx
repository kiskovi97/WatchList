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
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                >
                <h1 hidden={!navigator.language.startsWith("hu")}>"Most már férjhez mehetsz"</h1>
                <h1 hidden={!navigator.language.startsWith("en")}>"You can get married now"</h1>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                >
                <div hidden={!navigator.language.startsWith("hu")}>
                    Van egy olyan mondás miszerint, ha egy étel igazán jól sikerül, akkor azt szokás mondani "most már férjhez mehetsz".
                    Mivel mi is megkaptuk ezt már egy párszor, úgy gondoltuk megosztjuk veletek azokat a recepteket,
                    amelyekkel ti is hasonló sikert érhettek el.
                </div>
                <div hidden={!navigator.language.startsWith("en")}>
                    When you cook a really good meal in Hungary, than you often get the compliment: "You can get married now".
                    We got this a couple of times, so we thaught we should share the recipes that earned this compliment.
                    Please enjoy and feel free to contact us how your experiences went.
                </div>
                <div className={styles.names}>
                    Gergő & Mark
                </div>
            </motion.div>
        </div>
    </div>

export default Me;