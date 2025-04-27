import React from 'react';
import { Table, Input } from 'antd';
import HighlightText from './HighlightText';

interface Person {
  name: string;
  age: string;
  city: string;
}

interface Props {
  data: Person[];
  filters: { name: string; age: string; city: string };
  onFilterChange: (field: keyof Person, value: string) => void;
}

const FilterTable: React.FC<Props> = ({ data, filters, onFilterChange }) => {
  const columns = [
    {
      title: (
        <Input
          placeholder="이름 검색"
          value={filters.name}
          onChange={(e) => onFilterChange('name', e.target.value)}
          size="small"
        />
      ),
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <HighlightText text={text} keyword={filters.name} />
      ),
    },
    {
      title: (
        <Input
          placeholder="나이 검색"
          value={filters.age}
          onChange={(e) => onFilterChange('age', e.target.value)}
          size="small"
        />
      ),
      dataIndex: 'age',
      key: 'age',
      render: (text: string) => (
        <HighlightText text={text} keyword={filters.age} />
      ),
    },
    {
      title: (
        <Input
          placeholder="지역 검색"
          value={filters.city}
          onChange={(e) => onFilterChange('city', e.target.value)}
          size="small"
        />
      ),
      dataIndex: 'city',
      key: 'city',
      render: (text: string) => (
        <HighlightText text={text} keyword={filters.city} />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data.map((item, index) => ({ ...item, key: index }))}
      pagination={false}
      bordered
      size="middle"
    />
  );
};

export default FilterTable;
