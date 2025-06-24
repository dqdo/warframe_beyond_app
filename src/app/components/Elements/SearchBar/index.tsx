import { useState } from 'react';

type SearchBarStyleVariant = 'default' | 'buildSelect';

type SearchBarStyle = {
  wrapper: string;
  input: string;
};

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
  variant?: SearchBarStyleVariant;
};

const variantStyles: Record<SearchBarStyleVariant, SearchBarStyle> = {
  default: {
    wrapper: 'relative inline-block w-[90%]',
    input: 'font-roboto border border-stone-600 rounded-md p-1 my-2 bg-[#202020] focus:border-neutral-400 focus:outline-none w-full',
  },
  buildSelect: {
    wrapper: 'relative inline-block w-[80%]',
    input: 'font-roboto border border-stone-600 rounded-md p-1 my-2 bg-[#202020] focus:border-neutral-400 focus:outline-none w-full pr-10',
  },
};

export default function SearchBar({ onSearch, placeholder, variant = 'default',}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={variantStyles[variant].wrapper}>
      <input type="text" value={query} onChange={handleChange} placeholder={placeholder ?? 'Search...'} className={variantStyles[variant].input}/>
      {query && (
        <button onClick={handleClear} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white text-lg cursor-pointer">
          &times;
        </button>
      )}
    </div>
  );
}