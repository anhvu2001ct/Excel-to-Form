import { useState } from "react";

type Props = {
  value: string;
  type: "text" | "email" | "phoneNumber" | "date";
};

export default function useValidation({ value, type }: Props) {
  const [valid, setValid] = useState();
  return { valid, setValid };
}
