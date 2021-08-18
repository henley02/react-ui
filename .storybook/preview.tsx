import "../src/styles/index.scss";
import "./infoTable.scss";
import { addDecorator, addParameters } from "@storybook/react";
// @ts-ignore
import { withInfo } from "@storybook/addon-info";
import { CSSProperties } from "react";

const wrapperStyle: CSSProperties = {
  padding: "20px 40px",
};

const storyWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
);

addDecorator(storyWrapper);
addDecorator(withInfo);

addParameters({
  info: { inline: true, header: false },
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
