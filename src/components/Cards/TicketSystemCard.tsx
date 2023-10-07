import { Card, Flex, Text } from "@mantine/core";

interface IProps {
  title: string;
  color?: string;
  border?: string;
}

function BasicCard(props: IProps) {
  const { title, color, border } = props;
  const borderStyle = "1px solid black";
  return (
    <>
      <Card
        shadow="sm"
        radius="md"
        withBorder
        style={{
          backgroundColor: color,
          border: border ?? borderStyle,
        }}
      >
        <Card.Section bg="rgba(0, 0, 0, .1)">
          <Flex
            gap="sm"
            justify="center"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            <Text fw={500}> {title} </Text>
          </Flex>
          <Flex
            gap="sm"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            Tickets for Today BackLog
          </Flex>{" "}
        </Card.Section>
      </Card>
    </>
  );
}

export default BasicCard;
