import { useEffect, useState } from 'react';
import { Table, Typography, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchImages, ImageData } from '../api/images';

const { Title } = Typography;

const ImageListPage = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchImages();
        setImages(data);
      } catch (err) {
        setError('이미지를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const columns = [
    {
      title: '썸네일',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (_: any, record: ImageData) => (
        <img
          src={record.download_url}
          alt={record.author}
          width={100}
          height={70}
        />
      ),
    },
    {
      title: '작가',
      dataIndex: 'author',
      key: 'author',
    },
  ];

  if (loading)
    return (
      <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
    );
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>갤러리</Title>
      <Table
        dataSource={images.map((img) => ({ ...img, key: img.id }))}
        columns={columns}
        onRow={(record) => ({
          onClick: () => navigate(`/images/${record.id}`),
          style: { cursor: 'pointer' },
        })}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ImageListPage;
