import {
  Box,
  Center,
  Divider,
  Heading,
  ListItem,
  OrderedList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  type TextProps,
  VStack,
} from '@/components/chakra';
import { NextImage } from '@/components/client';

const Paragraph = (p: TextProps) => <Text as="p" py={1} {...p} />;
const BigText = (p: TextProps) => (
  <Paragraph fontSize="2xl" fontWeight="medium" lineHeight="1.5rem" {...p} />
);

const SATFLOW_URL = process.env.SATFLOW_URL;

const LowCostBatteryBody = () => (
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
        Bemp Research plans to disrupt the $150 billion dollar battery market.
      </Paragraph>

      <Paragraph>
        Bemp’s next generation Lithium-Sulphur batteries were invented in
        conjunction with University of North Texas and independently tested by
        leading battery scientists at University of Wisconsin-Milwaukee.
      </Paragraph>

      <Paragraph>
        The lab-proven data has allowed Bemp to push forward to raise capital
        for the next stage of R&D with a path towards commercialization.
      </Paragraph>

      <Paragraph>
        Bemp offers a path to shorten supply chains, dominate the battery space
        and create thousands of high paying jobs.
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
          rel="noreferrer"
          target="_blank"
          href="https://www.linkedin.com/company/bemp-research-corporation"
        >
          Bemp Research LinkedIn
        </a>
      </BigText>
    </Center>
  </VStack>
);

const HardestAssetBody = () => (
  <VStack spacing={5} align="stretch" textAlign="left">
    <Heading as="h2" size="md" textAlign="center">
      NAH Sovereign Diamond now a Top Rune on Satflow
    </Heading>

    <Box>
      <Paragraph>Max circulating supply: 85.3 trillion NAH 💎</Paragraph>
      <Paragraph>Current price: 0.001 Satoshi per NAH 💎</Paragraph>
      <Paragraph>
        100 billion NAH 💎 = 1 Bemp Research Corporation share
      </Paragraph>
      <Paragraph>Built on ₿TC. Backed by BRC. Nothing As Hard ©️</Paragraph>
    </Box>

    <Divider />

    <Paragraph>
      At Bemp, we don’t just build cost effective battery materials, we also
      created world’s hardest digital asset. After the initial launch on UniSat,
      NAH diamonds are now available on Satflow. Investors can now buy 50
      million NAH for a price of 0.0005 ₿TC (~$38.91 USD). Supply is limited and
      n NAH for a price of 0.0005 ₿TC (~$38.91 USD). Supply is limited and it
      takes time for us to list NAH diamonds for sale. If someone bought before
      you could, please check Satflow again after 1 or 2 days.
    </Paragraph>

    <Box>
      <Text fontWeight="bold" pb={2}>
        How to Buy:
      </Text>
      <OrderedList spacing={2}>
        <ListItem>
          Download Xverse Wallet and make sure to choose manual backup to store
          your seed words completely offline (ie using pen and paper, not saved
          on the cloud, not saved in your phone, not saved in your computer).
        </ListItem>
        <ListItem>
          Click this link:{' '}
          <a target="_blank" rel="noreferrer" href={SATFLOW_URL}>
            Buy NAH•SOVEREIGN•DIAMOND on Satflow
          </a>
        </ListItem>
        <ListItem>Connect Xverse Wallet to buy.</ListItem>
      </OrderedList>
    </Box>
  </VStack>
);

export default async function HomePage() {
  return (
    <Box width="full" padding={10}>
      <Tabs variant="enclosed" align="center" isFitted>
        <TabList>
          <Tab>Low Cost Battery</Tab>
          <Tab>World&apos;s Hardest Asset</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <LowCostBatteryBody />
          </TabPanel>
          <TabPanel px={0}>
            <HardestAssetBody />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
