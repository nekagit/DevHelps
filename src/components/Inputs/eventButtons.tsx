import { Button, Flex } from "@mantine/core";
import { IEventButton } from "../../interfaces/IEventButton";

interface IProps {
  eventButtons?: IEventButton[];
  executeAction: (action: string, script: string, key: string) => void;
}

function EventButtons(props: IProps) {
  const { eventButtons, executeAction } = props;
  return (
    <>
      <Flex
        gap="sm"
        justify="center"
        align="flex-end"
        direction="row"
        wrap="wrap"
      >
        {eventButtons?.map((button) => (
          <>
            <Button
              key={button.key}
              onClick={(e) => {
                e.preventDefault();
                executeAction(button.action, button.key, button.key);
              }}
            >
              {button.label}
            </Button>
          </>
        ))}
      </Flex>
    </>
  );
}
export default EventButtons;
