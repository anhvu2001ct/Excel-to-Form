import { useEffect, useRef, useState } from "react";

export default function useClickOutSide() {
  const [show, setShow] = useState(false);
  const nodeRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    function handleClickOutSide(e: React.ChangeEvent<HTMLInputElement>): void {
      if (nodeRef.current && !nodeRef.current.contains(e.target)) {
        setShow(false);
      }
    }
    document.addEventListener("click", (event: MouseEvent) =>
      handleClickOutSide(event)
    );
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);
  return {
    show,
    setShow,
    nodeRef,
  };
}
