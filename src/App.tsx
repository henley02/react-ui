import React, { useState } from "react";
import Button from "./components/Button/button";
import Alert from "./components/Alert/alert";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Tabs from "./components/Tabs/tabs";
import TabsItem from "./components/Tabs/tabsItem";
import Icon from "./components/Icon/icon";
import Transition from "./components/Transition/transition";
import Input from "./components/Input/input";
function App() {
  const [show, setShow] = useState(false);
  const [inputVal, setInputVal] = useState("");

  return (
    <div className="App">
      <Input disabled />
      <Input
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
        type="tel"
        defaultValue={"123123"}
        value={inputVal}
        icon={"columns"}
      />
      <Input
        onChange={(e) => console.log(e)}
        type="tel"
        size={"lg"}
        placeholder={"13123"}
        icon={"columns"}
      />
      <Input
        style={{ width: "300px" }}
        placeholder="input with icon"
        icon="search"
      />
      <Input
        onChange={(e) => console.log(e)}
        type="tel"
        placeholder={"13123"}
        prepend="https://"
      />
      <Input
        onChange={(e) => console.log(e.target.value)}
        type="tel"
        placeholder={"13123"}
        append=".com"
      />
      <Transition animation={"zoom-in-right"} in={show} timeout={200} wrapper>
        <Button>1231231231</Button>
      </Transition>
      <Button size={"lg"} onClick={() => setShow(!show)}>
        handleClick
      </Button>
      <Icon icon={"coffee"} theme={"primary"} size={"10x"} />
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
        <Button btnType={"primary"}>1312312</Button>
        <Button btnType={"danger"}>1312312</Button>
        <Button btnType={"primary"} size={"lg"}>
          1312312
        </Button>
        <Button btnType={"primary"} size={"sm"}>
          1312312
        </Button>
        <Button btnType={"link"} href={"www.baidu.com"}>
          1312312
        </Button>
        <Button btnType="link" href={"www.baidu.com"} disabled>
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
