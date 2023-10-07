import { Button, Card, Flex, Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import CardsJson from "../../assets/CardsJson.json";
import paths from "../../assets/paths.json";
import { Helpers } from "../../helpers/Helpers";
import { IFormCard } from "../../interfaces/IFormCard";

function FormCard(props: IFormCard) {
  const allPaths = Object.values(paths);
  const { title, color, textFields, eventButtons } = props;
  const [path, setPath] = useState("");
  const gitHubCard = CardsJson.AllCards[0];
  const form = useForm({
    initialValues: {
      path: "",
      ...Helpers().getInitialObject(gitHubCard.data.textFields),
    },
  });

  const handleSelect = (e: string | null) => {
    setPath(e ?? "");
  };
  const getFormValue = (fieldName: string) => {
    const formFieldIndex = Object.keys(form.values).findIndex(
      (x) => x == fieldName
    );
    return Object.values(form.values)[formFieldIndex];
  };

  return (
    <>
      <Card shadow="sm" withBorder>
        <Card.Section bg={color}>
          <Select
            label="path"
            placeholder="Pick value"
            value={path}
            onChange={(e: string | null) => handleSelect(e)}
            data={allPaths}
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
                      getFormValue(field.name),
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
