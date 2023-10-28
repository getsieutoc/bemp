import { Box, Text, VStack, TextProps, Center } from '@/components/chakra';
import { NextImage } from '@/components/client';

const Paragraph = (p: TextProps) => <Text as="p" py={1} {...p} />;
const BigText = (p: TextProps) => (
  <Paragraph fontSize="2xl" fontWeight="medium" lineHeight="1.5rem" {...p} />
);

export default async function HomePage() {
  return (
    <Box width="full" padding={10}>
      <VStack spacing={5} align="center">
        <NextImage
          priority
          src="/img/white-logo.jpg"
          alt="Bemp Research logo"
          width={280}
          height={231}
        />

        <Box>
          <Paragraph>
            Bemp Research plans to disrupt the $150 billion dollar battery
            market.
          </Paragraph>

          <Paragraph>
            Bemp’s next generation Lithium-Sulphur batteries were invented in
            conjunction with University of North Texas and independently tested
            by leading battery scientists at University of Wisconsin-Milwaukee.
          </Paragraph>

          <Paragraph>
            The lab-proven data has allowed Bemp to push forward to raise
            capital for the next stage of R&D with a path towards
            commercialization.
          </Paragraph>

          <Paragraph>
            Bemp offers a path to shorten supply chains, dominate the battery
            space and create thousands of high paying jobs.
          </Paragraph>

          <Paragraph>
            The high energy density of the batteries will help electrify cars,
            trucks and is the only viable option for electric commercial flight.
          </Paragraph>
        </Box>

        <Center marginTop={5} flexDirection="column">
          <Text fontWeight="bold">Contact:</Text>
          <BigText>
            <a href="mailto:info@bempresearch.com">info@bempresearch.com</a>
          </BigText>

          <BigText>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/bemp-research-corporation"
            >
              Bemp Research LinkedIn
            </a>
          </BigText>
        </Center>
      </VStack>
    </Box>
  );
}
