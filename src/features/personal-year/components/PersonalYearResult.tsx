import type { PersonalYearInfo } from "@/features/personal-year/data/personalYear";
import styles from "./PersonalYearResult.module.css";

type Props = {
  result: number;
  info: PersonalYearInfo;
};

const splitKeywords = (keywords: PersonalYearInfo["keywords"]) =>
  String(keywords)
    .split(/[,#/·•|]/g)
    .map((k) => k.trim())
    .filter(Boolean);

export default function PersonalYearResult({ result, info }: Props) {
  const keywords = splitKeywords(info.keywords);

  return (
    <section aria-labelledby="result-title" className={styles.resultCard}>
      <h2 id="result-title" className={styles.resultTitle}>
        결과
      </h2>

      <p className={styles.description}>
        개인 연도수는 생월 + 생일 + 연도 합의 자릿수 합을 1~9로 환산한 값입니다.
      </p>

      <div className={styles.headline}>
        <output className={styles.number}>{result}</output>
        <p className={styles.title}>{info.title}</p>
      </div>

      <ul aria-label="키워드" className={styles.keywordList}>
        {keywords.map((k) => (
          <li key={k}>
            <span className={styles.keywordChip}>{k}</span>
          </li>
        ))}
      </ul>

      <blockquote className={styles.summary}>
        <p>{info.summary}</p>
      </blockquote>

      <section aria-labelledby="tips-title" className={styles.tips}>
        <h3 id="tips-title" className={styles.tipsTitle}>
          이 시기에 주목할 점
        </h3>
        <ul className={styles.tipsList}>
          {info.infos.map((t, idx) => (
            <li key={idx}>{t}</li>
          ))}
        </ul>
      </section>
    </section>
  );
}
