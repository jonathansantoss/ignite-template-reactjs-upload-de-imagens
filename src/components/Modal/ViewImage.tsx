import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent h="600px">
          <ModalBody bgImg={imgUrl} w="900px" />
          <ModalFooter
            bgColor="pGray.800"
            w="900px"
            borderRadius={'0px 0px 6px 6px'}
          >
            <Link href={imgUrl} w={'-webkit-fill-available'} _focus={false}>
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
