import React, {
  createContext,
  useContext,
  useState,
} from 'react';

interface SearchContextType {
  searchText: string;
  setSearchText:
    React.Dispatch<
      React.SetStateAction<string>
    >;
}

const SearchContext =
  createContext<
    SearchContextType | undefined
  >(undefined);

export const SearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [searchText, setSearchText] =
    useState('');

  return (
    <SearchContext.Provider
      value={{
        searchText,
        setSearchText,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {

  const context =
    useContext(SearchContext);

  if (!context) {
    throw new Error(
      'useSearch phải nằm trong SearchProvider'
    );
  }

  return context;
};