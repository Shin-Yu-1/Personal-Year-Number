"use client";

import { useMemo, useState } from "react";
import PersonalYearInfos from "@/features/personal-year/data/personalYear";
import type { PersonalYearInfo } from "@/features/personal-year/data/personalYear";
import { calculatePersonalYearNumber } from "@/features/personal-year/utils/calculate";

export const usePersonalYear = () => {
  const thisYear = useMemo(() => new Date().getFullYear(), []);
  const [birth, setBirth] = useState("");
  const [year, setYear] = useState<number>(thisYear);
  const [error, setError] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [resultInfo, setResultInfo] = useState<PersonalYearInfo | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!birth) return setError("생년월일을 입력해 주세요.");
    const d = new Date(birth);
    if (Number.isNaN(d.getTime()))
      return setError("유효한 날짜 형식이 아닙니다.");
    if (!Number.isFinite(year) || year < 1)
      return setError("유효한 연도를 입력해 주세요.");

    const n = calculatePersonalYearNumber(d, year);
    setResult(n);
    setResultInfo(PersonalYearInfos[n]);
  };

  return { birth, setBirth, year, setYear, error, result, resultInfo, submit };
};
