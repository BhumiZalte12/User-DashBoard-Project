import React from 'react';
import styles from './StatCard.module.css';


export default function StatCard({ title, value }: { title: string; value: string }) {
return (
<div className={styles.card}>
<div className={styles.title}>{title}</div>
<div className={styles.value}>{value}</div>
</div>
);
}