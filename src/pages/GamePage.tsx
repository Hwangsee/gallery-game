import React, { useState } from 'react';
import { Input, Button, Form, Card, Typography } from 'antd';

const { Title } = Typography;

interface Player {
  name: string;
  score: number;
  cards: number[];
}

const GamePage = () => {
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [cardsPerPlayer, setCardsPerPlayer] = useState<number>(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);

  const handlePlayerCountSubmit = () => {
    const initialPlayers = Array.from({ length: playerCount }, () => ({
      name: '',
      score: 0,
      cards: [],
    }));
    setPlayers(initialPlayers);
    setIsFormVisible(true);
    setWinner(null);
  };

  const handlePlayerChange = (
    index: number,
    field: keyof Player,
    value: string,
  ) => {
    const updatedPlayers = [...players];
    if (field === 'score') {
      updatedPlayers[index][field] = Number(value);
    } else {
      updatedPlayers[index][field] = value;
    }
    setPlayers(updatedPlayers);
  };

  const generateRandomCards = (count: number) => {
    const cards = [];
    for (let i = 0; i < count; i++) {
      const card = Math.floor(Math.random() * 20) + 1;
      cards.push(card);
    }
    return cards;
  };

  const handleGameStart = () => {
    if (players.length === 0) return;

    const playersWithCards = players.map((player) => ({
      ...player,
      cards: generateRandomCards(cardsPerPlayer),
    }));

    setPlayers(playersWithCards);

    let maxTotal = -Infinity;
    let winnerPlayer: Player | null = null;

    playersWithCards.forEach((player) => {
      const total = player.cards.reduce((sum, card) => sum + card, 0);

      if (total > maxTotal) {
        maxTotal = total;
        winnerPlayer = player;
      } else if (total === maxTotal) {
        winnerPlayer = player;
      }
    });

    setWinner(winnerPlayer);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>카드 점수 게임</Title>

      {!isFormVisible && (
        <Form layout="inline" onFinish={handlePlayerCountSubmit}>
          <Form.Item label="플레이어 수">
            <Input
              type="number"
              min="1"
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              확인
            </Button>
          </Form.Item>
        </Form>
      )}

      {isFormVisible && (
        <Form layout="vertical">
          {players.map((player, index) => (
            <Card key={index} style={{ marginBottom: '12px' }}>
              <Form.Item label={`${index + 1}번 플레이어 이름`}>
                <Input
                  placeholder="이름"
                  value={player.name}
                  onChange={(e) =>
                    handlePlayerChange(index, 'name', e.target.value)
                  }
                />
              </Form.Item>
            </Card>
          ))}

          <Form.Item label="플레이어당 카드 수">
            <Input
              type="number"
              min="1"
              value={cardsPerPlayer}
              onChange={(e) => setCardsPerPlayer(Number(e.target.value))}
            />
          </Form.Item>

          <Button type="primary" onClick={handleGameStart}>
            게임 시작
          </Button>
        </Form>
      )}

      {winner && (
        <Card style={{ marginTop: '20px', backgroundColor: '#eaffea' }}>
          <h3>승자: {winner.name}</h3>
          <p>점수 합계: {winner.cards.reduce((sum, card) => sum + card, 0)}</p>
          <p>보유 카드: {winner.cards.join(', ')}</p>
        </Card>
      )}
    </div>
  );
};

export default GamePage;
