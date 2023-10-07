import {
  Button,
  Card,
  ComboboxData,
  Flex,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { Helpers } from "../helpers/Helpers";
import { IFormCard } from "../interfaces/IFormCard";

function FormCard(props: IFormCard) {
  const [path, setPath] = useState("");
  const handleSelect = (e: string | null) => {
    setPath(e ?? "");
  };

  const { title, color, textFields, eventButtons, form } = props;
  console.log("form.values.path:", form.values.path);

  return (
    <>
      <Card shadow="sm" withBorder>
        <Card.Section bg={color}>
          <Select
            label="path"
            placeholder="Pick value"
            value={path}
            onChange={(e: string | null) => handleSelect(e)}
            data={form.values.path as ComboboxData}
          />
          <Flex
            gap="sm"
            justify="center"
            align="flex-end"
            direction="row"
            wrap="wrap"
          >
            <Text fw={500}> {title} </Text>
          </Flex>
          {eventButtons?.map((button) => (
            <Button
              key={button.key}
              onClick={(e) => {
                e.preventDefault();
                Helpers().executeAction(
                  button.action,
                  button.name,
                  "",
                  path ?? ""
                );
              }}
            >
              {button.label}
            </Button>
          ))}
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
                  width={"100%"}
                  label={field.label}
                  {...form.getInputProps(field.name)}
                  placeholder={field.placeholder}
                />

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    Helpers().executeAction(
                      field.button.action,
                      field.button.name,
                      field.name,
                      path ?? ""
                    );
                  }}
                >
                  {field.button.label}
                </Button>
              </Flex>
            </div>
          ))}
        </Card.Section>
      </Card>
    </>
  );
}

export default FormCard;
