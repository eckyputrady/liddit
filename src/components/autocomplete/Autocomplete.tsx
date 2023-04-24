import { useState } from "react";
import "./Autocomplete.css";

export interface AutocompleteData {
  input: string;
  options: string[];
}

export interface AutocompleteHandler {
  handleOptionSelected: (option: string) => void;
  handleInputChanged: (value: string) => void;
}

export interface AutoCompleteProps {
  data: AutocompleteData;
  handler: AutocompleteHandler;
}

export function Autocomplete({ data, handler }: AutoCompleteProps) {
  return (
    <form className="autocomplete">
      <input
        className="autocomplete--input"
        type="text"
        value={data.input}
        onChange={(e) => handler.handleInputChanged(e.target.value)}
      />
      {data.options.length > 0 && (
        <div className="autocomplete--option-wrapper">
          {data.options.map((opt) => (
            <button
              className="autocomplete--option"
              key={opt}
              onClick={(e) => {
                e.preventDefault();
                handler.handleOptionSelected(opt);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      <p>Test</p>
    </form>
  );
}

export function useAutocomplete(allOptions: string[]): AutoCompleteProps {
  const [input, setInput] = useState("");
  const [justSelected, setJustSelected] = useState(false);

  return {
    data: {
      input,
      options:
        !justSelected && input
          ? allOptions.filter((x) => x.startsWith(input))
          : [],
    },
    handler: {
      handleOptionSelected(option: string) {
        setInput(option);
        setJustSelected(true);
      },
      handleInputChanged(value: string) {
        setInput(value);
        setJustSelected(false);
      },
    },
  };
}
