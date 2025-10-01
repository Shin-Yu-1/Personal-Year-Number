"use client";

import { useMemo, useState } from "react";

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
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Personal Year Number</h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>
        생년월일과 기준 연도를 입력하면 해당 해의 개인 연도수를 계산합니다.
      </p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
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
      </form>

      {error && <p style={{ color: "#f87171", marginTop: 16 }}>{error}</p>}

      {result !== null && !error && (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 12,
            border: "1px solid #444",
          }}
        >
          <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 8 }}>
            결과
          </div>
          <div style={{ fontSize: 40, fontWeight: 800 }}>{result}</div>
          <p style={{ opacity: 0.8, marginTop: 8 }}>
            개인 연도수는 생월 + 생일 + 연도 합의 자릿수 합을 1~9로 환산한
            값입니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default PersonalYearNumberPage;
