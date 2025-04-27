import React, { useMemo, useState } from 'react';
import { Typography } from 'antd';
import FilterTable from '../components/filter/FilterTable';

const { Title } = Typography;

interface Person {
  name: string;
  age: string;
  city: string;
}

const dummyData: Person[] = [
  { name: 'Alice', age: '25', city: 'Seoul' },
  { name: 'Bob', age: '30', city: 'Busan' },
  { name: 'Charlie', age: '35', city: 'Incheon' },
  { name: 'David', age: '40', city: 'Daegu' },
  { name: 'Eve', age: '28', city: 'Seoul' },
  { name: 'Frank', age: '33', city: 'Gwangju' },
  { name: 'Grace', age: '26', city: 'Daejeon' },
  { name: 'Heidi', age: '29', city: 'Busan' },
  { name: 'Ivan', age: '31', city: 'Incheon' },
  { name: 'Judy', age: '27', city: 'Seoul' },
];

const FilterPage = () => {
  const [filters, setFilters] = useState({
    name: '',
    age: '',
    city: '',
  });

  const handleFilterChange = (field: keyof Person, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredData = useMemo(() => {
    return dummyData.filter((person) =>
      Object.entries(filters).every(([key, value]) =>
        person[key as keyof Person].toLowerCase().includes(value.toLowerCase()),
      ),
    );
  }, [filters]);

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>필터 검색</Title>
      <FilterTable
        data={filteredData}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default FilterPage;
