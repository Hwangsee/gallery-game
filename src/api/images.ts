export interface ImageData {
  id: string;
  author: string;
  download_url: string;
}

export const fetchImages = async (): Promise<ImageData[]> => {
  const response = await fetch('https://picsum.photos/v2/list');
  if (!response.ok) throw new Error('이미지 불러오기 실패');
  return response.json();
};
