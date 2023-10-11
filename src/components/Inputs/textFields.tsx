import { Button, Flex, TextInput } from "@mantine/core";
import { ITextField } from "../../interfaces/ITextField";
import FormCardService from "../../service/FormCardService";

interface IProps {
  textFields?: ITextField[];
  executeAction: (action: string, name: string, key: string) => void;
}

function TextFields(props: IProps) {
  const { textFields, executeAction } = props;
  const { form } = FormCardService();
  return (
    <>
      {textFields?.map((field) => (
        <div key={field.key}>
          <hr />
          <Flex
            gap="sm"
            justify="space-around"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            <TextInput
              label={field.label}
              {...form.getInputProps(field.name)}
              placeholder={field.placeholder}
            />

            <Button
              onClick={(e) => {
                e.preventDefault();
                executeAction(
                  field.button.action,
                  field.button.name,
                  field.button.key
                );
              }}
            >
              {field.button.label}
            </Button>
          </Flex>
        </div>
      ))}
    </>
  );
}
export default TextFields;
