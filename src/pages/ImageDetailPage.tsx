import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Switch, Spin } from 'antd';

const ImageDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());

  const [isGrayscale, setIsGrayscale] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [dragType, setDragType] = useState<'scale' | 'rotate' | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const imageUrl = `https://picsum.photos/id/${id}/600/400`;

  useEffect(() => {
    const image = imageRef.current;

    setIsLoading(true);
    setIsImageLoaded(false);

    image.src = imageUrl;

    image.onload = () => {
      setIsImageLoaded(true);
      setIsLoading(false);
      drawImage();
    };
  }, [imageUrl]);

  useEffect(() => {
    if (isImageLoaded) {
      drawImage();
    }
  }, [isGrayscale, scale, rotation, isImageLoaded]);

  const drawImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const image = imageRef.current;

    if (!ctx || !canvas || !image) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.filter = isGrayscale ? 'grayscale(1)' : 'none';

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.restore();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragStart({ x: e.clientX, y: e.clientY });

    if (e.button === 0) setDragType('scale');
    else if (e.button === 2) setDragType('rotate');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStart || !dragType) return;

    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    if (dragType === 'scale') {
      const newScale = Math.max(0.1, scale + dy * 0.005);
      setScale(newScale);
    }

    if (dragType === 'rotate') {
      const newRotation = rotation + dx * 0.5;
      setRotation(newRotation % 360);
    }

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragStart(null);
    setDragType(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      {isLoading ? (
        <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
      ) : (
        <Card>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ marginRight: '8px' }}>흑백 모드</span>
            <Switch
              checked={isGrayscale}
              onChange={(checked) => setIsGrayscale(checked)}
            />
          </div>

          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            style={{ border: '1px solid #ccc', cursor: 'grab' }}
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        </Card>
      )}
    </div>
  );
};

export default ImageDetailPage;
