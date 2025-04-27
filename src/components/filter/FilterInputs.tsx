import { Input } from 'antd';

interface Props {
  filters: { name: string; age: string; city: string };
  onChange: (field: 'name' | 'age' | 'city', value: string) => void;
}

const FilterInputs: React.FC<Props> = ({ filters, onChange }) => {
  return (
    <tr>
      <th>
        <Input
          placeholder="이름 검색"
          value={filters.name}
          onChange={(e) => onChange('name', e.target.value)}
          size="small"
          style={{ width: '90%', marginBottom: '8px' }}
        />
      </th>
      <th>
        <Input
          placeholder="나이 검색"
          value={filters.age}
          onChange={(e) => onChange('age', e.target.value)}
          size="small"
          style={{ width: '90%', marginBottom: '8px' }}
        />
      </th>
      <th>
        <Input
          placeholder="지역 검색"
          value={filters.city}
          onChange={(e) => onChange('city', e.target.value)}
          size="small"
          style={{ width: '90%', marginBottom: '8px' }}
        />
      </th>
    </tr>
  );
};

export default FilterInputs;
