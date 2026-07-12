import styles from './HeroSection.module.css'

export default function HeroSection({ onStart }) {
  return (
    <section className={styles.hero}>
      <div className={styles.badge}>B2B · קפה · מסעדות · קייטרינג</div>
      <h1 className={styles.title}>קטלוג דיגיטלי להזמנות</h1>
      <p className={styles.subtitle}>
        בחרו מוצרים מהקטלוג ושלחו סיכום הזמנה ב-WhatsApp
      </p>
      <button className={styles.cta} onClick={onStart}>
        התחלת הזמנה ⬇
      </button>
    </section>
  )
}
