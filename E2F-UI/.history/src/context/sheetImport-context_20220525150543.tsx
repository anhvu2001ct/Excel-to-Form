import { createContext, useContext, useState } from "react";

const SheetsImportContext = createContext(undefined);
function SheetsImportProvider(props) {
  return (
    <SheetsImportContext.Provider {...props}></SheetsImportContext.Provider>
  );
}
function useSheet() {
  const context = useContext(SheetsImportContext);
  return context;
}
