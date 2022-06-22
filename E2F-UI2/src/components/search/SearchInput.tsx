import { Input } from "antd";

const { Search } = Input;
type Props = {
  onSearch: (value: string) => void;
};
const SearchInput = ({ onSearch }: Props) => {
  return (
    <div className="ml-auto mb-4 max-w-full lg:max-w-[250px] ">
      <Search placeholder="input search text" allowClear onSearch={onSearch} />
    </div>
  );
};

export default SearchInput;
