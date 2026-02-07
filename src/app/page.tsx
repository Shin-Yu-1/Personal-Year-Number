"use client";

import { usePersonalYear } from "@/features/personal-year/hooks/usePersonalYear";
import PersonalYearResult from "@/features/personal-year/components/PersonalYearResult";
import styles from "./page.module.css";

export default function PersonalYearNumberPage() {
  const { birth, setBirth, year, setYear, error, result, resultInfo, submit } =
    usePersonalYear();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header>
          <h1>Personal Year Number</h1>
          <p>
            생년월일과 기준 연도를 입력하면 해당 해의 개인 연도수를 계산합니다.
          </p>
        </header>

        <section aria-labelledby="calc-title">
          <form onSubmit={submit}>
            <fieldset>
              <legend className={styles.srOnly}>개인 연도수 계산 입력</legend>

              <label>
                <span>생년월일</span>
                <input
                  type="date"
                  value={birth}
                  onChange={(e) => setBirth(e.target.value)}
                />
              </label>

              <label>
                <span>기준 연도</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={year}
                  min={1}
                  onChange={(e) => setYear(Number(e.target.value))}
                />
              </label>

              <button type="submit">계산하기</button>
            </fieldset>
          </form>

          {error && (
            <p role="alert" aria-live="polite" className={styles.error}>
              {error}
            </p>
          )}
        </section>

        {result !== null && resultInfo !== null && !error && (
          <PersonalYearResult result={result} info={resultInfo} />
        )}
      </main>

      <footer className={styles.footer}>
        <a
          className={styles.footerLink}
          href="https://github.com/Shin-Yu-1/Personal-Year-Number"
          target="_blank"
          rel="noreferrer"
        >
          Github 바로가기
        </a>
      </footer>
    </div>
  );
}
