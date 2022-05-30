import { useState } from "react";

type Props = {
  value: string;
  type: "text" | "email" | "phoneNumber" | "date";
};

export default useValidation = ({ value, type }: Props) => {
  const [valid, setValid] = useState();
  return <div></div>;
};
