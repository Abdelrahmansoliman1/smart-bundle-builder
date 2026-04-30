// theme/ThemeProvider.tsx
import { App as AntdApp, ConfigProvider, theme } from "antd";
import { useLayoutEffect } from "react";
import type { ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
  dark: boolean;
};

export default function ThemeProvider({
  children,
  dark,
}: ThemeProviderProps) {
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <ConfigProvider
      theme={{
        algorithm: dark
          ? theme.darkAlgorithm
          : theme.defaultAlgorithm,
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}
