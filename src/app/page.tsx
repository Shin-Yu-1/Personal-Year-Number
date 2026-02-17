"use client";

import { usePersonalYear } from "@/features/personal-year/hooks/usePersonalYear";
import PersonalYearResult from "@/features/personal-year/components/PersonalYearResult";
import styles from "./page.module.css";

export default function PersonalYearNumberPage() {
  const { birth, setBirth, error, result, resultInfo, submit } =
    usePersonalYear();

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = Number(e.target.value);
    setBirth((prev) => ({
      ...prev,
      month: selectedMonth,
    }));
  };

  const handleDayChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedDay = Number(e.target.value);
    setBirth((prev) => ({
      ...prev,
      day: selectedDay,
    }));
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header>
          <h1>Personal Year Number</h1>
          <p>
            생일 월/일을 입력하면 올해 기준 Personal Year Number를 계산합니다.
          </p>
        </header>

        <section aria-labelledby="calc-title">
          <form onSubmit={submit}>
            <fieldset>
              <legend className={styles.srOnly}>개인 연도수 계산 입력</legend>

              <div>
                <select
                  id="month"
                  name="month"
                  value={birth.month}
                  onChange={handleMonthChange}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <span>월 </span>
                <select
                  id="day"
                  name="day"
                  value={birth.day}
                  onChange={handleDayChange}
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <span>일</span>
              </div>

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
