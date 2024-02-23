import {TextField, TextFieldProps} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export const SearchInput = ({
  ...props
}: TextFieldProps) => {
    return (
    <TextField
      id="search"
      type="search"
      aria-label="search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default SearchInput;
