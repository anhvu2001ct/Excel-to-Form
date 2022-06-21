import { Input } from "antd";

const { Search } = Input;
type Props = {
  onSearch: (value: string) => void;
};
const SearchInput = ({ onSearch }: Props) => {
  return (
    <div className="ml-auto max-w-[250px] mb-4">
      <Search placeholder="input search text" allowClear onSearch={onSearch} />
    </div>  
  );
};

export default SearchInput;
