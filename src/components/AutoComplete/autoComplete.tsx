import {
  ChangeEvent,
  FC,
  ReactElement,
  useEffect,
  useState,
  KeyboardEvent,
  useRef,
} from "react";
import classnames from "classnames";
import Input, { InputProps } from "../Input/input";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } =
    props;
  const [inputVal, setInputVal] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const debouncedValue = useDebounce(inputVal, 500);
  /**
   * 点击组件外部隐藏下拉菜单
   */
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSuggestions([]);
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setSuggestions(data);
          setLoading(false);
          if (data.length) {
            setShowDropdown(true);
          }
        });
      } else {
        setSuggestions(results);
        setShowDropdown(true);
      }
    } else {
      setShowDropdown(false);
    }
    setHighlightIndex(-1);
  }, [debouncedValue, fetchSuggestions]);

  const handleSelect = (item: DataSourceType) => {
    setInputVal(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };

  /**
   * 下拉菜单如果有自定义的模版
   * @param item
   */
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  /**
   * 下拉菜单的渲染
   */
  const generateDropdown = () => {
    return (
      <Transition
        timeout={300}
        in={showDropdown || loading}
        animation={"zoom-in-top"}
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <ul className="suggestion-list">
          {loading && (
            <div className="suggestion-loading-icon">
              <Icon icon={"spinner"} spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const classes = classnames("suggestion-item", {
              "is-active": index === highlightIndex,
            });
            return (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className={classes}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  /**
   * 输入框改变
   * @param e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputVal(value);
    triggerSearch.current = true;
  };

  /**
   *  设置高亮的行
   * @param index
   */
  const highlight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };

  /**
   * 处理键盘 上、下、回车、esc
   * @param e
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (suggestions[highlightIndex])
          handleSelect(suggestions[highlightIndex]);
        break;
      case "ArrowUp":
        highlight(highlightIndex - 1);
        break;
      case "ArrowDown":
        highlight(highlightIndex + 1);
        break;
      case "Escape":
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="auto-complete-wrapper" ref={componentRef}>
      <Input
        value={inputVal}
        onChange={handleChange}
        {...restProps}
        onKeyDown={handleKeyDown}
      />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
