import * as React from 'react';
import styled from 'src/lib/styled-components';

import downIcon from './down-arrow.svg';

export interface ISortOption {
  label: string;
  value: string;
}

const Select = styled.select`
  padding: 10px 35px 10px 5px;
  margin-left: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  height: 44px;
  appearance: none;
  background: url(${downIcon}) 96% / 15% no-repeat;
  background-color: white;
  &:focus {
    outline: none;
  }
`;

const SelectWrapper = styled.div`
  margin: 20px 0px 10px auto;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: gray;
`;

export default class SortingDrodown extends React.PureComponent<{
  sortOptions: ISortOption[];
  value: string;
  onChange: (value: string) => void;
}> {
  public render() {
    const { sortOptions, value } = this.props;
    return (
      <SelectWrapper>
        <label htmlFor="">Sort By</label>
        <Select onChange={this.handleSortChange} value={value}>
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </SelectWrapper>
    );
  }

  private handleSortChange = (
    event: React.SyntheticEvent<HTMLSelectElement>
  ) => {
    this.props.onChange(event.currentTarget.value);
  };
}
