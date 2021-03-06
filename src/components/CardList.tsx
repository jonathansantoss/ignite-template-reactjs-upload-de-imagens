import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [url, setUrl] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards &&
          cards.flat().map(card => {
            return (
              <Card
                key={card.ts}
                data={card}
                viewImage={e => {
                  onOpen();
                  setUrl(e);
                }}
              />
            );
          })}
      </SimpleGrid>

      {ModalViewImage({ isOpen, onClose, imgUrl: url })}
    </>
  );
}
