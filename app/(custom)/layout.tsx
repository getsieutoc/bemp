import { Box, Container, Flex } from '@/components/chakra';
import type { ReactNode, Locale } from '@/types';

export default async function CustomLayout({
  children,
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  return (
    <Flex direction="column">
      <Container as={Box} maxW="container.sm">
        {children}
      </Container>
    </Flex>
  );
}
