import { useState } from 'react';

type SearchBarStyleVariant = 'default';

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
  variant?: SearchBarStyleVariant;
};

const variantStyles: Record<SearchBarStyleVariant, string> = {
  default: "w-9/10 font-roboto border border-stone-600 rounded-md p-1 my-2 bg-[#202020] focus:border-neutral-400 focus:outline-none",
};

export default function SearchBar({ onSearch, placeholder, variant = 'default'}: SearchBarProps) {
  const [query, setQuery] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {

      e.preventDefault();

      if (query.trim()) {
        onSearch(query.trim());
      }
    }
  };

  return (
    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder ?? 'Search...'} className={`${variantStyles[variant]}`}/>
  );
}
