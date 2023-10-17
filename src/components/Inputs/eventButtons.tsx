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
        justify="space-around"
        align="flex-end"
        direction="row"
        wrap="wrap"
      >
        {eventButtons?.map((button) => (
          <div key={button.key}>
            <Button
              key={button.key}
              onClick={(e) => {
                e.preventDefault();
                executeAction(button.action, button.name, button.key);
              }}
            >
              {button.label}
            </Button>
          </div>
        ))}
        </Flex>
    </>
  );
}
export default EventButtons;
