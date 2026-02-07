"use client";

import { usePersonalYear } from "@/features/personal-year/hooks/usePersonalYear";
import PersonalYearResult from "@/features/personal-year/components/PersonalYearResult";

export default function PersonalYearNumberPage() {
  const { birth, setBirth, year, setYear, error, result, resultInfo, submit } =
    usePersonalYear();

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" }}>
      <header>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>Personal Year Number</h1>
        <p style={{ opacity: 0.8, marginBottom: 24 }}>
          생년월일과 기준 연도를 입력하면 해당 해의 개인 연도수를 계산합니다.
        </p>
      </header>

      <section aria-labelledby="calc-title">
        <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
          {" "}
          <fieldset
            style={{
              border: 0,
              padding: 0,
              margin: 0,
              display: "grid",
              gap: 16,
            }}
          >
            {" "}
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
              {" "}
              개인 연도수 계산 입력{" "}
            </legend>{" "}
            <label style={{ display: "grid", gap: 8 }}>
              {" "}
              <span>생년월일</span>{" "}
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
              />{" "}
            </label>{" "}
            <label style={{ display: "grid", gap: 8 }}>
              {" "}
              <span>기준 연도</span>{" "}
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
              />{" "}
            </label>{" "}
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
              {" "}
              계산하기{" "}
            </button>{" "}
          </fieldset>{" "}
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
        <PersonalYearResult result={result} info={resultInfo} />
      )}
    </main>
  );
}
