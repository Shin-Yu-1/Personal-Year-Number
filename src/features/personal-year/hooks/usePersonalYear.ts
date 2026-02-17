"use client";

import { useMemo, useState } from "react";
import PersonalYearInfos from "@/features/personal-year/data/personalYear";
import type { PersonalYearInfo } from "@/features/personal-year/data/personalYear";
import { calculatePersonalYearNumber } from "@/features/personal-year/utils/calculate";

export type Birth = {
  month: number;
  day: number;
};

export const usePersonalYear = () => {
  const thisYear = useMemo(() => new Date().getFullYear(), []);
  const [birth, setBirth] = useState<Birth>({
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });
  const [year, setYear] = useState<number>(thisYear);
  const [error, setError] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [resultInfo, setResultInfo] = useState<PersonalYearInfo | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!birth?.month || !birth?.day) {
      return setError("생년월일을 입력해 주세요.");
    }

    const n = calculatePersonalYearNumber(birth, year);
    setResult(n);
    setResultInfo(PersonalYearInfos[n]);
  };

  return { birth, setBirth, year, setYear, error, result, resultInfo, submit };
};
