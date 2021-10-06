import { Button, Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }) => {
    const response = await api.get(
      `/api/${pageParam ? `images?after=${pageParam}` : 'images'}`
    );
    return response;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: after => {
      if (after.data.after) {
        return after.data.after;
      }

      return null;
    },
  });

  const formattedData = useMemo(() => {
    if (data) {
      return data.pages.map(page => {
        if (page) {
          return page.data.data;
        }

        return [];
      });
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return isError ? (
    <Error />
  ) : (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {(hasNextPage || isFetchingNextPage) && (
          <Button
            position="relative"
            top="40px"
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
