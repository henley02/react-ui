import AutoComplete, {
  AutoCompleteProps,
  DataSourceType,
} from "./autoComplete";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

interface lakersWithNumberProps {
  value: string;
  number: number;
}
const simpleComplete = () => {
  // const lakers = [
  //   "bradley",
  //   "pope",
  //   "caruso",
  //   "cook",
  //   "cousins",
  //   "james",
  //   "AD",
  //   "green",
  //   "howard",
  //   "kuzma",
  //   "McGee",
  //   "rando",
  // ];

  const lakersWithNumber = [
    { value: "bradley", number: 11 },
    { value: "pope", number: 1 },
    { value: "caruso", number: 4 },
    { value: "cook", number: 2 },
    { value: "cousins", number: 15 },
    { value: "james", number: 23 },
    { value: "AD", number: 3 },
    { value: "green", number: 14 },
    { value: "howard", number: 39 },
    { value: "kuzma", number: 0 },
  ];
  // const handleFetch = (query: string) => {
  //   return lakers
  //     .filter((name) => name.includes(query))
  //     .map((name) => ({
  //       value: name,
  //     }));
  // };
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((player) => player.value.includes(query));
  };
  const renderOption = (it: DataSourceType) => {
    const item = it as lakersWithNumberProps;
    return (
      <div>
        <h2>{item.value}</h2>
        <p>{item.number}</p>
      </div>
    );
  };

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("选择了")}
      renderOption={renderOption}
    />
  );
};

const fetchAutoComplete = () => {
  const handleFetch = async (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        let res = [];
        if (items) {
          res = items.slice(0, 10).map((item: any) => ({
            value: item.login,
            ...item,
          }));
        }
        return res;
      });
  };
  return <AutoComplete fetchSuggestions={handleFetch} />;
};

storiesOf("AutoComplete Component", module)
  .add("simple AutoComplete component", simpleComplete)
  .add("async fetchSuggestions", fetchAutoComplete);
