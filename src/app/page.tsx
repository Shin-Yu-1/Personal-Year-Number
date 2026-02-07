"use client";

import { useMemo, useState } from "react";
import PersonalYearInfos, { PersonalYearInfo } from "@/contents/personalYear";

const reduceToSingleDigit = (value: number): number => {
  let n = Math.abs(value);
  while (n > 9) {
    n = n
      .toString()
      .split("")
      .reduce((sum, ch) => sum + Number(ch), 0);
  }
  return n;
};

const sumDigits = (value: number): number => {
  return value
    .toString()
    .split("")
    .reduce((sum, ch) => sum + Number(ch), 0);
};

const calculatePersonalYearNumber = (
  birthDate: Date,
  targetYear: number
): number => {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const universalYear = reduceToSingleDigit(sumDigits(targetYear));

  const total = month + day + universalYear;
  return reduceToSingleDigit(total);
};

const PersonalYearNumberPage = () => {
  const thisYear = useMemo(() => new Date().getFullYear(), []);
  const [birth, setBirth] = useState<string>(""); // YYYY-MM-DD
  const [year, setYear] = useState<number>(thisYear);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [resultInfo, setResultInfo] = useState<PersonalYearInfo | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!birth) {
      setError("생년월일을 입력해 주세요.");
      return;
    }
    const d = new Date(birth);
    if (Number.isNaN(d.getTime())) {
      setError("유효한 날짜 형식이 아닙니다.");
      return;
    }
    if (!Number.isFinite(year) || year < 1) {
      setError("유효한 연도를 입력해 주세요.");
      return;
    }

    const n = calculatePersonalYearNumber(d, year);
    setResult(n);
    console.log(n, PersonalYearInfos[n]);
    setResultInfo(PersonalYearInfos[n]);
  };

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" }}>
      <header>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>Personal Year Number</h1>
        <p style={{ opacity: 0.8, marginBottom: 24 }}>
          생년월일과 기준 연도를 입력하면 해당 해의 개인 연도수를 계산합니다.
        </p>
      </header>

      <section aria-labelledby="calc-title">
        <h2
          id="calc-title"
          style={{ fontSize: 16, margin: 0, marginBottom: 12, opacity: 0.9 }}
        >
          계산하기
        </h2>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
          <fieldset
            style={{
              border: 0,
              padding: 0,
              margin: 0,
              display: "grid",
              gap: 16,
            }}
          >
            <legend
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: "hidden",
                clip: "rect(0,0,0,0)",
                whiteSpace: "nowrap",
                border: 0,
              }}
            >
              개인 연도수 계산 입력
            </legend>

            <label style={{ display: "grid", gap: 8 }}>
              <span>생년월일</span>
              <input
                type="date"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #444",
                  background: "transparent",
                  color: "inherit",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 8 }}>
              <span>기준 연도</span>
              <input
                type="number"
                inputMode="numeric"
                value={year}
                min={1}
                onChange={(e) => setYear(Number(e.target.value))}
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #444",
                  background: "transparent",
                  color: "inherit",
                }}
              />
            </label>

            <button
              type="submit"
              style={{
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid #444",
                background: "#111",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              계산하기
            </button>
          </fieldset>
        </form>

        {error && (
          <p
            role="alert"
            aria-live="polite"
            style={{ color: "#f87171", marginTop: 16 }}
          >
            {error}
          </p>
        )}
      </section>

      {result !== null && resultInfo !== null && !error && (
        <section
          aria-labelledby="result-title"
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 12,
            border: "1px solid #444",
          }}
        >
          <h2
            id="result-title"
            style={{ fontSize: 14, opacity: 0.8, margin: 0, marginBottom: 8 }}
          >
            결과
          </h2>

          <p style={{ opacity: 0.8, marginTop: 8, marginBottom: 12 }}>
            개인 연도수는 생월 + 생일 + 연도 합의 자릿수 합을 1~9로 환산한
            값입니다.
          </p>

          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <output style={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}>
              {result}
            </output>
            <p
              style={{
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: -0.2,
                margin: 0,
              }}
            >
              {resultInfo.title}
            </p>
          </div>

          {/* Keywords */}
          <ul
            aria-label="키워드"
            style={{
              marginTop: 12,
              marginBottom: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {String(resultInfo.keywords)
              .split(/[,#/·•|]/g)
              .map((k) => k.trim())
              .filter(Boolean)
              .map((k) => (
                <li key={k}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "6px 10px",
                      borderRadius: 999,
                      border: "1px solid #333",
                      background: "rgba(255,255,255,0.03)",
                      fontSize: 12,
                      opacity: 0.9,
                    }}
                  >
                    {k}
                  </span>
                </li>
              ))}
          </ul>

          {/* Summary */}
          <blockquote
            style={{
              marginTop: 14,
              marginLeft: 0,
              marginRight: 0,
              padding: 12,
              borderRadius: 12,
              border: "1px solid #333",
              background: "rgba(255,255,255,0.025)",
              lineHeight: 1.6,
              opacity: 0.9,
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0 }}>{resultInfo.summary}</p>
          </blockquote>

          {/* Infos */}
          <section aria-labelledby="tips-title" style={{ marginTop: 14 }}>
            <h3
              id="tips-title"
              style={{ fontSize: 13, opacity: 0.7, margin: 0, marginBottom: 8 }}
            >
              이 시기에 주목할 점
            </h3>
            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                lineHeight: 1.7,
                opacity: 0.9,
              }}
            >
              {resultInfo.infos.map((info, idx) => (
                <li key={idx} style={{ marginTop: 6 }}>
                  {info}
                </li>
              ))}
            </ul>
          </section>
        </section>
      )}
    </main>
  );
};

export default PersonalYearNumberPage;
