import { Button, Flex, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ITextField } from "../../interfaces/ITextField";

interface IProps {
  textFields?: ITextField[];
  executeAction: (action: string, name: string, key: string) => void;
  form: UseFormReturnType<
    {
      path: string;
    },
    (values: { path: string }) => {
      path: string;
    }
  >;
}

function TextFields(props: IProps) {
  const { textFields, executeAction, form } = props;
  return (
    <>
      {textFields?.map((field) => (
        <div key={field.name}>
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
              {...form.getInputProps(field.key)}
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
