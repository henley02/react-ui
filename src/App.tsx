import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Alert from "./components/Alert/alert";

function App() {
  const a = 123;

  if (a === 123) {
    console.log(12312);
  }

  return (
    <div className="App">
      <div className="button-example">
        <Button>Nice</Button>
        <Button onClick={() => alert(1123)} autoFocus className="123131">
          1312312
        </Button>
        <Button disabled>1312312</Button>
        <Button btnType={ButtonType.Primary}>1312312</Button>
        <Button btnType={ButtonType.Danger}>1312312</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          1312312
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
          1312312
        </Button>
        <Button btnType={ButtonType.Link} href={"www.baidu.com"}>
          1312312
        </Button>
        <Button btnType={ButtonType.Link} href={"www.baidu.com"} disabled>
          1312312
        </Button>
      </div>
      <div className="alert-component">
        <Alert title={"adfafdasdfas"} closable={true}></Alert>
        <Alert type="primary" title="Test Alert" customClose="关闭" closable>
          Alert
        </Alert>
        <Alert type="success" closable>
          Alert
        </Alert>
        <Alert type="success">Alert</Alert>
      </div>
    </div>
  );
}

export default App;
