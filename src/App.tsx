import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Alert from "./components/Alert/alert";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Tabs from "./components/Tabs/tabs";
import TabsItem from "./components/Tabs/tabsItem";

function App() {
  const a = 123;

  if (a === 123) {
    console.log(12312);
  }

  return (
    <div className="App">
      <div className="tabs-component">
        <Tabs
          defaultIndex={0}
          onSelect={(selectedIndex) => {
            console.log(selectedIndex);
          }}
        >
          <TabsItem label="card1">this is card one</TabsItem>
          <TabsItem label="card2">this is content two</TabsItem>
          <TabsItem label="disabled" disabled={true}>
            this is content three
          </TabsItem>
        </Tabs>
        <br />
        <Tabs defaultIndex={0} styleType="outline" onSelect={() => {}}>
          <TabsItem label="card1">this is card one</TabsItem>
          <TabsItem label="card2">this is content two</TabsItem>
          <TabsItem label="disabled" disabled={true}>
            this is content three
          </TabsItem>
        </Tabs>
      </div>
      <br />
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
      <div className="menu-component">
        <Menu defaultIndex={"0"} onSelect={(index) => console.log(index)}>
          <MenuItem>123</MenuItem>
          <MenuItem>123</MenuItem>
          <MenuItem>123</MenuItem>
          <MenuItem>123</MenuItem>
          <SubMenu title={"12312"}>
            <MenuItem>123123123123123123123123123123</MenuItem>
            <MenuItem>123</MenuItem>
            <MenuItem>123</MenuItem>
          </SubMenu>
        </Menu>
        <Menu
          defaultIndex={"0"}
          onSelect={(index) => console.log(index)}
          mode={"vertical"}
          defaultOpenSubMenus={["4"]}
        >
          <MenuItem>active</MenuItem>
          <MenuItem disabled>disabled</MenuItem>
          <MenuItem>xyz</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown-1</MenuItem>
            <MenuItem>dropdown-2</MenuItem>
          </SubMenu>
          <SubMenu title="opened">
            <MenuItem>opened1</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
}

export default App;
